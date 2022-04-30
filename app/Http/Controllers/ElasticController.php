<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use  Elasticsearch\Client;
use Elasticsearch\ClientBuilder;

class ElasticController extends Controller
{    
    public $cli;
    public $index;
   
    public function __construct()
    {
        $this->cli = ClientBuilder::create()->build();
        $this->index = "product_index";
    }

    public function index(Request $request){  
       
           $elasticSearch = $this->elasticSerch($request);
       
           return  response()->json($elasticSearch,200);
     }

    public function ElasticCreate(Request $request){   

        $params = ['body' => []];

        $params['body'][] = [
            'index' => [
                '_index' =>  $this->index,
            ]
        ];

        $params['body'][] = [
            'name'     => $request->name,
            'model' => $request->model,
            "price" => $request->price,
            "img" => $request->image[0],
            "discount"  => $request->discount
        ];
       
       $response = $this->cli->bulk($params);

       if(isset($response[0]['errors'])){
             return response(400);
       }
        return  response()->json("success",201);
    }

    public function getProduct(Request $request){

        $params = [
            'index' => $this->index,       
            'body'  => [
                'query' => [
                    'terms' => [
                        "_id"=>[ $request->id??""]
                    ]                  
                ]
            ]            
        ]; 
        
        // Create the index
        $response =  $this->cli->search($params); 
        $dateResponse = $response['hits']["hits"][0];    

        $filterData = [
           "id" => $dateResponse['_id'],
           "name" => $dateResponse['_source']['name'],
           "model" => $dateResponse['_source']['model'],
           "price" => $dateResponse["_source"]['price'],
           "discount" => $dateResponse['_source']['discount'],
           "img" => is_array($dateResponse['_source']['img'])?$dateResponse['_source']['img']:[$dateResponse['_source']['img']], 
        ];
      
        $filterData = json_encode($filterData);
        return response()->json($filterData,200);
        
    }

    public function elasticSerch($request){
          
    //  return response(200);

        // $params = [
        //     'index' => $this->index
        // ];
        // $params = [
        //     'index' => 'my_index',
        //     'body'  => [
        //         'query' => [
        //             'bool' => [
        //                 'filter' => [
        //                     'match' => [ 'name' => $request->search ]
        //                 ]
        //             ]
        //         ]
        //     ]
        // ];
       
        if (is_numeric($request->search)) {
            $match = [
                "filter" => [
                    "match" => ["price" => (int)$request->search]                      
                   
                 ],
            ];
        }else{

            $match = [
                "filter" => [
                    "match" =>["name" => $request->search??""]                      
                   
                 ],
            ];
             
        }
                
        $params = [
            'index' => $this->index,       
            'body'  => [
                'query' => [
                    'bool' => $match                    
                ]
            ]            
        ]; 
        
        // Create the index
        $response =  $this->cli->search($params);  
      
        $response = json_encode($response['hits']["hits"]);

        return  $response;
    
         
   
    }
}
