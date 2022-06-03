import axios from 'axios'
export default {
      
    actions: {
        
        async auth(stx){ 
             try{
                var sanctum = await axios.get('/api/auth/sanctum');
                if (sanctum.status==200) {
                    stx.commit('status',true); 
                }              
             }catch(error){
                stx.commit('status',null);   
             }                                       
            },
    },
    mutations: {
        status(state,data){
               state.data = data
         },             
    },
    state:{
        data:[],        
    },
    getters:{
        getAuth(state){  
             return state.data; 
        },
    },

}; 


