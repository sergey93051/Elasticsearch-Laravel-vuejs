

export default {

    actions:{

        setvalidName(stx, event) {
            const regex = /^[A-Z]\w{4,}$/i;
            if (!event) {      
                stx.commit("messageValid",'This nams is required');
            } else if (!regex.test(event)) {             
                stx.commit("messageValid",'This nams is not valid');
            }else{
                stx.commit("messageValid",true);
            }         
        },
        setvalidModel(stx, event){
            const regex = /^[A-Z]\w{4,}$/i;
            if (!event) {      
                stx.commit("messageValid",'This model is required');
            } else if (!regex.test(event)) {             
                stx.commit("messageValid",'This model is not valid');
            }else{
                stx.commit("messageValid",true);
            } 
        },
        setvalidEmail(stx,event){
            const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
            if (!event) { 
                stx.commit("messageValid",'This email is required');          
           
             }else if(!regex.test(event)) {         
                stx.commit("messageValid",'This email is not valid');    
             }else{
                stx.commit("messageValid",true);
            }         
             
        },
        passwordRulses(event){
            const regex = /^[A-Za-z0-9?$]{6,}$/i;
            if (!event) {  
                    stx.commit("messageValid",'This password is required');  
             }else if(!regex.test(event)) {     
                stx.commit("messageValid",'This password is not valid');                 
             }else{
                stx.commit("messageValid",true);      
             }           
             
        },
    },
    mutations: {
        messageValid(state,result){
             state.messageResult = result;
        }
        
    },
    state: {
        messageResult: ""
    },
    getters:{
        messageValid:function(state){    
           return state.messageResult       

        } 
    },

}