<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Testing\Fluent\Concerns\Has;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    protected $table = 'users';
    protected $primaryKey = 'idUser';

    protected $fillable = [
        'name',
        'email',
        'cpf',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class, 'idUser');
    }

    public function bankAccounts()
    {
        return $this->hasMany(BankAccount::class, 'idUser');
    }

    public function paymentMethods()
    {
        return $this->hasMany(PaymentMethod::class, 'idUser');
    }

    public function userCards()
    {
        return $this->hasMany(UserCard::class, 'idUser');
    }

    public function categories()
    {
        return $this->hasMany(Category::class, 'idUser');
    }

    public function movements()
    {
        return $this->hasMany(Movement::class, 'idUser');
    }
}
