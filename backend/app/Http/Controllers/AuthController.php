<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => ['required'],
            'password' => ['required'],
        ]);
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){ 
            $auth = Auth::user(); 
            return response()->json($auth, 200);
   
        } 
        
        throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.']
        ]);
       
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => ['required'],
            'email' => ['required','email','unique:users'],
            'password' => ['required','min:8','required_with:password_confirmation','same:password_confirmation'],
            'password_confirmation' => ['required','min:8'],
        ]);
   
        $user=User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        return response()->json([
            'user' => $user
        ]);
    }

    public function logout()
    {
        Auth::logout();
        // $userinfo =  auth()->user();
        // return $this->handleResponse($userinfo, 'Successfully logged out.');
    }
}
