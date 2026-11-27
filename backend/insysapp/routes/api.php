<?php
use App\Models\User;
use App\Models\Roles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\RoleController;


Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/users',function (Request $request) {
    return User::all();

});

// Route::get('/roles',function (Request $request) {
//     return Roles::all();

// });

//Route Roles
    // Public 
        Route::apiResource('roles', RoleController::class)->only(['show']);
        Route::middleware('auth:sanctum')->get('/roles', [RoleController::class, 'index']);
    // Protected
       Route::middleware('auth:sanctum')->group(function () {
            Route::apiResource('roles', RoleController::class)->only(['store', 'update', 'destroy']);
       });

// Route Branches

    