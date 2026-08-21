<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VirtualUserCard extends Model
{
    use HasFactory;

    protected $table = 'virtual_user_cards';
    protected $primaryKey = 'idVirtualCard';
    public $timestamps = false;

    protected $fillable = [
        'idMainCard',
        'finalCardNumber',
        'description',
    ];

    public function mainCard()
    {
        return $this->belongsTo(UserCard::class, 'idMainCard');
    }
}
