<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ElasticController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/auth/sanctum', [HomeController::class, 'checkLogin'] );



Route::post('login', [LoginController::class, 'authenticatesUsers']);
Route::post('register', [RegisterController::class, 'register']);
Route::post('logout', [HomeController::class, 'logout'])->middleware('auth:sanctum');

Route::group(['prefix' => 'home', 'middleware' => 'auth:sanctum'], function () {   

       Route::get('/', [HomeController::class, 'index'])->name('home');
});

Route::group(['prefix'=>'elastic','middleware' => 'auth:sanctum'],function (){
    Route::post("search",[ElasticController::class,'index']);
    Route::post('data/products',[ElasticController::class,'ElasticCreate']);
    Route::post('get/product',[ElasticController::class,'getProduct']);
});

Route::get("getdata",function (){
          
    $data = [
         [
             "name" => "jon",
             "surname" => "josiv",
             "age" =>  56
         ],
         [
             "name" => "Tom",
             "surname" => "Tomvich",
             "age" =>  78
         ],
         [
             "name" => "Rok",
             "surname" => "Rokivich",
             "age" =>  12
         ],

     ];

   return response()->json($data,200);
});