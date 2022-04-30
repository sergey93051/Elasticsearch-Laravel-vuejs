
<template>
  <section>
    <Loadertwo :style="loadder" />
    <div class="continer">
      <div class="row">
        <section class="py-5">
          <!-- {{getProduct}} -->
          <div class="container px-4 px-lg-5 my-5">
            <div class="row gx-4 gx-lg-5 align-items-center">
              <div class="col-md-6">
                <carousel :items-to-show="1.0">
                  <slide v-for="image in getProduct.img" :key="image">
                    <img :src="getImgUrl(image)" alt="" />
                  </slide>
                  -
                  <template #addons>
                    <navigation />
                    <pagination />
                  </template>
                </carousel>
              </div>
              <div class="col-md-6">
                <div class="mb-1">
                  <strong class="p-2">{{ getProduct.model }}</strong>
                </div>
                <h1 class="display-5 fw-bolder">{{ getProduct.name }}</h1>
                <div class="fs-5 mb-5">
                  <span class="p-2">{{prices(getProduct.price)}}</span>
                  <span class="text-decoration-line-through"></span>
                  <p class="m-1">{{ getProduct.discount }}&ensp;%</p>
                </div>
                <p class="lead">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Praesentium at dolorem quidem modi. Nam sequi consequatur
                  obcaecati excepturi alias magni, accusamus eius blanditiis
                  delectus ipsam minima ea iste laborum vero?
                </p>
                <div class="d-flex">
                  <!-- <input
                    class="form-control text-center me-3"
                    id="inputQuantity"
                    type="num"
                    value="1"
                    style="max-width: 3rem"
                  /> -->
                  <!-- <button
                    class="btn btn-outline-dark flex-shrink-0"
                    type="button"
                    @click="addCart"
                  >
                    <i class="bi-cart-fill me-1"></i>
                    Add to cart
                  </button> -->
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>
<script>
import "vue3-carousel/dist/carousel.css";
import { mapGetters, mapActions, mapMutations } from "vuex";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import Loader from "./Loader";
import Loadertwo from "./Loadertwo";
import "vue-inner-image-zoom/lib/vue-inner-image-zoom.css";


export default {
  data() {
    return {
      loadder: "",
      _id: this.$route.params.id,
      setInt: null,
      priceProduct: [],
      myprice:0
      // getProduct:[]
    };
  },
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
    Loader,
    Loadertwo,

  },
  methods: {
   
    //  ...mapActions(['showProduct']),
    getImgUrl(img) {
      return window.atob(img);
    },
    addCart(event) {
        
    }, 
    prices(price){
      console.log(price++)
      return price
    }
     // numberAnim(arg) {
    
      //   this.$store.dispatch('intervalNum',arg)
         //var inter = setInterval(() => {                
          //            this.number++;
          //            if (this.number > arg) {
          //              clearInterval(inter)
          //              console.log(inter)
          //              return;
          //            }                   
          // }, 1000);
        //  return  this.number;

      // var inter;
      // if (this.number < arg) { 
      //         inter = setInterval(() => {                
      //                this.number++;       
      //        }, 200);
      //  } else{
      //     clearInterval(inter)
      //  }
        // return  this.number;
   
  //  },
  },
  computed: {
    ...mapGetters(["getProduct"]),     
  },
  beforeCreate() {
    
  },
  created() {     
     this.$store.dispatch("showProduct", this._id);
  },
  beforeMount() {
    
  },
  mounted() {  
     
    // this.setInt = setInterval(() => {                
    //                  this.number++; 
    //                  if (this.number>10) {
    //                        clearInterval(this.setInt)
    //                   }
                     
    //                  console.log(this.number) 
                                                    
    //       }, 1000);

          
          
  },
  unmounted() {
    this.$store.getters.removeCache;
  },
  updated() {
    this.loadder = "display:none";
 
  
  },
  beforeRouteEnter(to, from, next) {
    if (!window.Laravel.isLoggedin) {
      this.$router.go({ name: "login" });
    }
    next();
  },
};
</script>
