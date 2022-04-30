import Vuex from 'vuex'
import index from "./modules/index"
import elasicProduct from "./modules/elasicProduct"
import validation from "./modules/validation"
import products from  "./modules/product"
import cart from "./modules/cart"

export default new Vuex.Store({

     modules:{       
        index,
        elasicProduct,
        validation,
        products,
        cart
     }
})