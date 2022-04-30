
import axios from 'axios'
export default {
      
    actions: {
        
        async createProducts(stx,argument){ 
         var sanctum = await axios.get('/sanctum/csrf-cookie').catch(function (error) {
                           console.error(error);
            });
          
           if (sanctum.status==204) {
            var product = await axios.post('/api/elastic/data/products',argument).catch(function (error) {
                       console.error(error);
             });
                           
              if (product.status == 201) {                                                   
                        stx.commit('productcommit',"success");
               }      
                   
            }           
                 
         }
    },
    mutations: {
          productcommit(state,statuscode){
               state.statuscode = statuscode
          },
    },
    state:{
        statuscode:""
    },
    getters:{
        getStatus:function(state){    
           return state.statuscode       

        } 
    },

}; 