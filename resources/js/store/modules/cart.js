export default {
      
    actions: { 
                 
         setToCart(stx,arg){    
                 
            var item = arg.searchResult.find(({ id }) => id === arg.id);  
            var storgeItem;      
            if(!localStorage.getItem("cart")) {                 
                    item.count = 1;             
                    localStorage.setItem("cart", JSON.stringify([item]));
             }else{               
                storgeItem = JSON.parse(localStorage.getItem("cart"));  
                var storeUpdate = [];         
              
                if (storgeItem.find(({id})=>id === item.id )) {
                    storgeItem.forEach(function(element){
                       if(item.id==element.id){                       
                            element.count++;               
                       }
                        storeUpdate.push(element);
                   }); 
                   localStorage.setItem("cart", JSON.stringify(storeUpdate));
                } else {
                      storgeItem = JSON.parse(localStorage.getItem("cart"));
                      item.count = 1;   
                      storgeItem.push(item);
                      localStorage.setItem("cart", JSON.stringify(storgeItem));
                  }           
              } 
               // console.log(JSON.parse(localStorage.getItem("cart")))             
        },
        removeCartItem(stx,arg){
            arg.getCart.splice(arg.getCart.findIndex(item => item.id === arg.item_id), 1)
            var cartItems = JSON.parse(localStorage.getItem("cart"));
            const index = cartItems.findIndex(({ id }) => id === arg.itemId);
            cartItems.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cartItems)); 
        },
        cartCountChnage(stx,arg){

            // var objIndex;
            // objIndex = arg.mapCart.findIndex((obj => obj.id == arg.id));

            var cartItems = JSON.parse(localStorage.getItem("cart"));
            var index = cartItems.findIndex(( obj  => obj.id == arg.id));  

             if (arg.do == "min") {                  
                  if (cartItems[index].count<=1) {    
                      cartItems[index].count = 1;
                  }else{    
                      cartItems[index].count--;
                  }                
                  localStorage.setItem("cart", JSON.stringify(cartItems));              

            }else if(arg.do == "max"){
                if ( cartItems[index].count >= 15) {
                    // arg.mapCart[objIndex].count = 15
                    cartItems[index].count = 15
                }else{
                    //  arg.mapCart[objIndex].count++;
                     cartItems[index].count++;
                }  
               
                localStorage.setItem("cart", JSON.stringify(cartItems)); 
            }
            
        
        }       
    },
    mutations: {
        //  CartData(state){
        //        state.cart = JSON.parse(localStorage.getItem("cart"))
        //  },
    },
    state:{
         cart:[],
         cartCount:0, 
    },
    getters:{
       getCart(state){  
             return JSON.parse(localStorage.getItem("cart"))    
        },
        getCartsCount(state){
              return JSON.parse(localStorage.getItem("cart")).length;
        },
      
    },

}; 