<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\User;



class Roles extends Model
{
     protected $fillable = [
        'role_name',
        'role_description',
        'role_data',
        

    ];



   
    
}

