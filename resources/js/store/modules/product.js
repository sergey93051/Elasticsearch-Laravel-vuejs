import axios from 'axios'
export default {
      
    actions: {
        
        async showProduct(stx,id){ 
              
            var sanctum = await axios.get('/sanctum/csrf-cookie').catch(function (error) {
                              console.error(error);
               });
             
              if (sanctum.status==204) {
               var product = await axios.post('/api/elastic/get/product',{
                   "id":id
               }).catch(function (error) {
                     console.error(error);
                });              
                 if (product.status == 200) {               
                        stx.commit('productData',JSON.parse(product.data));
                  }                     
               }                   
            },
    },
    mutations: {
         productData(state,data){
               state.data = data
         },
             
    },
    state:{
        data: [],
        newdata:[]
    },
    getters:{
        getProduct(state){  
             return state.data; 
        },
        removeCache(state){
            return state.data = [];
        }
    },

}; 


