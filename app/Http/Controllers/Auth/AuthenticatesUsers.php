<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Support\Facades\Auth;

trait AuthenticatesUsers{


    public function attemptAuth($request){

        $credentials = [
        'email' => $request->email,
        'password' => $request->password,
       ];

    if (Auth::attempt($credentials)) {
       
        $request->session()->regenerate();  
        $success = true;
        $message = 'User login successfully';
       
    } else {
        $success = false;
        $message = 'Unauthorised';
    }

    // response
   $response = [
        'success' => $success,
        'message' => $message,
    ];   
    
    return $response;
}

} 