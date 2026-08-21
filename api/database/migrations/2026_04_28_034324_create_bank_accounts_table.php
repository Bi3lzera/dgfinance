<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users_bank_accounts', function (Blueprint $table) {
            $table->id('idAccount');
            $table->unsignedBigInteger('idUser');
            $table->unsignedBigInteger('idBank');
            $table->string('agencyNumber')->nullable();
            $table->string('accountNumber')->nullable();
            $table->string('accountAlias')->nullable();
            $table->string('accountType')->nullable();
            $table->decimal('initialValue', 10, 2)->nullable();
            $table->string('isOpenFinance');
            $table->string('openFinanceItemId');
            $table->string('institutionUrl');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users_bank_accounts');
    }
};
