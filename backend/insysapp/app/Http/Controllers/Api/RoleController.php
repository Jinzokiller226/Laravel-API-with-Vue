<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Roles;
use Illuminate\Http\Request;
use App\Http\Resources\RoleResource;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)

    {   
        $search = trim((string) $request->query('search'),'');

       $role = Roles::query()
        ->when($search !== '', function ($query) use ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('role_name', 'like', "%{$search}%")
                  ->orWhere('role_description', 'like', "%{$search}%");

                // allow searching by the status labels shown in the table
                $term = strtolower($search);
                if (str_contains('online', $term)) {
                    $q->orWhere('role_data', 'active');
                }
                if (str_contains('inactive', $term)) {
                    $q->orWhere('role_data', '!=', 'active');
                }
            });
        })
        ->latest()
        ->paginate(10)
        ->withQueryString();

        return response()->json($role);

        // return RoleResource::collection(Roles::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = $request->validate([
            'role_name' => 'required|string|max:255',
            'role_description' => 'nullable|string',
            'role_data' => 'nullable|string',
        ]);

        $role = Roles::create($validate);

        return new RoleResource($role);

    }

    /**
     * Display the specified resource.
     */
    public function show(Roles $role)
    {
        return new RoleResource($role);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Roles $role)
    {
        $validate = $request->validate([
            
            'role_name' => 'required|string|max:255',
            'role_description' => 'nullable|string',
            'role_data' => 'nullable|string',
        ]);

        $role->update($validate);
        return new RoleResource($role);


    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Roles $role)
    {
        $role->delete();
        return response()->json(null, 204);

    }
}
