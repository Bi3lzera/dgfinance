<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Installment extends Model
{
    use HasFactory;

    protected $table = 'installments';
    protected $primaryKey = 'idInstallment';

    protected $fillable = [
        'idMovement',
        'plannedDate',
        'expectedValue',
        'installmentNumber',
        'status',
    ];

    public function movement()
    {
        return $this->belongsTo(Movement::class, 'idMovement');
    }
}
