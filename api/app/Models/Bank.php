<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Bank extends Model
{
    use HasFactory;

    protected $table = 'banks';
    protected $primaryKey = 'idBank';

    protected $fillable = [
        'name',
        'codeCOMPE',
    ];

    public function bankAccounts()
    {
        return $this->hasMany(BankAccount::class, 'idBank');
    }

    public function userCards()
    {
        return $this->hasMany(UserCard::class, 'idBank');
    }
}
