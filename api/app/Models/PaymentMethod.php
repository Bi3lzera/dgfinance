<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentMethod extends Model
{
    use HasFactory;

    protected $table = 'payment_methods';
    protected $primaryKey = 'idPayMethod';

    protected $fillable = [
        'title',
        'idUser',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'idUser');
    }
}
