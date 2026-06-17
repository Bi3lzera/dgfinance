<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\TransactionService;
use App\Services\AuthenticationService;
use App\Http\Requests\CreateTransactionRequest;
use App\Http\Requests\CreateOperacaoRequest;
use App\Http\Requests\CreateTransactionNOperacaoRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use App\Models\Movement;
use App\Models\Installment;
use App\Models\Transaction;
use Symfony\Component\HttpFoundation\Response;

class TransactionController extends Controller
{
    public function __construct(
        public TransactionService $service,
        public AuthenticationService $authService
    ) {
    }

    //
    // Get data
    //
    public function movementIndex(Request $request): JsonResponse
    {
        $initialDate = $request->input('initialDate');
        $finalDate = $request->input('finalDate');
        return response()->json($this->service->getAllMovements($initialDate, $finalDate), Response::HTTP_OK);
    }

    public function installmentIndex(Request $request): JsonResponse
    {
        return response()->json($this->service->getAllInstallments($request->query('movementId')), Response::HTTP_OK);
    }

    public function transactionIndex(Request $request): JsonResponse
    {
        return response()->json($this->service->getAllTransactions($request->query('movementId')), Response::HTTP_OK);
    }
    public function transferIndex(Request $request): JsonResponse
    {
        return response()->json($this->service->getAllTransfers(), Response::HTTP_OK);
    }

    public function extratoIndex(Request $request): JsonResponse
    {
        $initialDate = $request->input('initialDate');
        $finalDate = $request->input('finalDate');
        return response()->json($this->service->getExtrato($initialDate, $finalDate), Response::HTTP_OK);
    }

    public function transactionDetails(Request $request): JsonResponse
    {
        return response()->json($this->service->getTransactionDetails($request->query('id')), Response::HTTP_OK);
    }

    //
    // Find data by parameters
    //
    public function findMovement(Request $request): JsonResponse
    {
        return response()->json($this->service->findMovement($request->query('id')), Response::HTTP_OK);
    }

    public function findInstallment(Request $request): JsonResponse
    {
        return response()->json($this->service->findInstallment($request->query('id')), Response::HTTP_OK);
    }

    public function findTransaction(Request $request): JsonResponse
    {
        return response()->json($this->service->findTransaction($request->query('id')), Response::HTTP_OK);
    }

    public function findTransfer(Request $request): JsonResponse
    {
        return response()->json($this->service->findTransfer($request->query('id')), Response::HTTP_OK);
    }

    //
    // Delete data
    //
    public function deleteMovement(Request $request): JsonResponse
    {
        return response()->json($this->service->deleteMovement($request->query('id')), Response::HTTP_OK);
    }

    public function deleteInstallment(Request $request): JsonResponse
    {
        return response()->json($this->service->deleteInstallment($request->query('id')), Response::HTTP_OK);
    }

    public function deleteTransaction(Request $request): JsonResponse
    {
        return response()->json($this->service->deleteTransaction($request->query('id')), Response::HTTP_OK);
    }

    public function deleteTransfer(Request $request): JsonResponse
    {
        return response()->json($this->service->deleteTransfer($request->query('id')), Response::HTTP_OK);
    }

    //
    // Update data
    //
    public function updateMovement(Request $request): JsonResponse
    {
        return response()->json($this->service->updateMovement($request->query('idMovement'), $request->all()), Response::HTTP_OK);
    }

    public function updateInstallment(Request $request): JsonResponse
    {
        return response()->json($this->service->updateInstallment($request->query('idInstallment'), $request->all()), Response::HTTP_OK);
    }

    public function updateTransaction(Request $request): JsonResponse
    {
        return response()->json($this->service->updateTransaction($request->query('idTransaction'), $request->all()), Response::HTTP_OK);
    }

    public function updateTransfer(Request $request): JsonResponse
    {
        return response()->json($this->service->updateTransfer($request->query('idTransfer'), $request->all()), Response::HTTP_OK);
    }

    //
    // Create data
    //
    public function createMovement(Request $request): JsonResponse
    {
        return response()->json($this->service->createMovement($request->all()), Response::HTTP_CREATED);
    }

    public function createInstallment(Request $request): JsonResponse
    {
        return response()->json($this->service->createInstallment($request->all()), Response::HTTP_CREATED);
    }

    public function createTransaction(Request $request): JsonResponse
    {
        return response()->json($this->service->createTransaction($request->all()), Response::HTTP_CREATED);
    }

    public function createTransfer(Request $request): JsonResponse
    {
        return response()->json($this->service->createTransfer($request->all()), Response::HTTP_CREATED);
    }

    public function createMovementWithInstallments(Request $request): JsonResponse
    {
        //
        // **TODO**
        // Precisa ajustar esse controller para passar as funções de consulta e criação no BD para o service, 
        // aqui deve somente decidir o que fazer com os dados e o que criar usando o service.
        //
        $user = $this->authService->getAuthenticatedUser();

        $movementData = $request->input('movement');
        $movementData['idUser'] = $user['idUser'];
        $installmentsData = $request->input('installments', []);

        return response()->json(
            DB::transaction(function () use ($movementData, $installmentsData, $user) {
                // 1. Cria a movimentação
                $movement = Movement::create($movementData);

                // 2. Cria cada parcela vinculada à movimentação
                foreach ($installmentsData as $installment) {
                    $installment['idMovement'] = $movement->idMovement;
                    $createdInstallment = Installment::create($installment);

                    if(isset($movementData['paymentRecurrencyMethod']) && $movementData['paymentRecurrencyMethod'] == 'P') {
                        Transaction::create([
                            'idInstallment' => $createdInstallment->idInstallment,
                            'transactionDescription' => isset($movementData['transactionDescription']) && $movementData['transactionDescription'] != '' ? $movementData['transactionDescription'] : $movement->title . ' - Parcela ' . $createdInstallment->installmentNumber,
                            'value' => $createdInstallment->expectedValue,
                            'date' => $createdInstallment->plannedDate,
                            'type' => $movement->type,
                            'idBankAccount' => $movementData['idBankAccount'] ?? null,
                            'idPaymentMethod' => $movementData['idPaymentMethod'] ?? null,
                            'idUser' => $user['idUser'],
                        ]);
                    }
                }

                return [
                    'message' => 'Movimentação com parcelas criada com sucesso.',
                    'idMovement' => $movement->idMovement,
                ];
            }),
            Response::HTTP_CREATED
        );
    }

    //
    // Create complete transaction
    //
    public function createCompleteTransaction(Request $request): JsonResponse
    {
        return response()->json($this->service->createCompleteTransaction($request->all()), Response::HTTP_CREATED);
    }
    public function updateCompleteTransaction(Request $request): JsonResponse
    {
        return response()->json($this->service->updateCompleteTransaction($request->all()), Response::HTTP_OK);
    }
}