<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
         return response(200);
    }

    public function checkLogin(){
         if (Auth::check()) {
              return  response(true);
         }else{
              return  response(false);
         }
    }

    public function logout(){

        Auth::guard('web')->logout();
      
        return response(200);

    }
}
