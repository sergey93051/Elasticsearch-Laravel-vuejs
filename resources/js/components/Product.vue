
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
                <div class="anim-step6-left">
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
              </div>
              <div class="col-md-6">
                <div class="mb-1">
                  <h5 class="p-2 anim-step2-right">{{ getProduct.model }}</h5>
                </div>
                <h1 class="display-5 fw-bolder anim-step1-right">
                  {{ getProduct.name }}
                </h1>
                <div class="fs-5 mb-5">
                  <p class="p-2 anim-step3-right">
                    <!-- {{ prices(getProduct.price) }}&ensp;$  -->
                      {{ tweened.toFixed(0) }}&ensp;$ 
                  </p>
                  <span class="text-decoration-line-through"></span>
                  <p class="m-1 anim-step4-right">
                    {{ getProduct.discount }}&ensp;%
                  </p>
                </div>
                <p class="lead anim-step5-right">
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
import gsap from "gsap";

export default {
  data() {
    return {
      loadder: "",
      _id: this.$route.params.id,
      setInt: null,
      priceProduct: [],
      myprice: 0,
       tweened: 0,
       number:750
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
    addCart(event) {},
    prices(price) {
         return price;
     },
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
  beforeCreate() {},
  created() {
    this.$store.dispatch("showProduct", this._id);
  },
  beforeMount() {},
  mounted() {
    const animStep1 = ".anim-step1-right";
    const animStep2 = ".anim-step2-right";
    const animStep3 = ".anim-step3-right";
    const animStep4 = ".anim-step4-right";
    const animStep5 = ".anim-step5-right";
    const animStep6 = ".anim-step6-left";

    let tl = gsap.timeline();
    tl.to(animStep6, { startAt: { x: -350, opacity: 0 } });
  
    tl.from(
      animStep1,
      { opacity: 0.2, x: 820, duration: 2.5, scale: 0.5 },
      "right"
    );
    tl.to(animStep1, { opacity: 1, duration: 1 });
    tl.from(
      animStep2,
      { opacity: 0.2, x: 620, duration: 2.5, scale: 0.5 },
      "right"
    );
    tl.to(animStep2, { opacity: 1, duration: 1 });
    tl.to(this, { duration: 2, tweened: this.number || 0 });
   
    tl.from(
      animStep3,
      { opacity: 0.2, x: 820, duration: 2.5, scale: 0.5 },
      "right"
    );


    tl.from(animStep4, { opacity: 0.2, x: 620, duration: 2.5 }, "right");

    tl.set(animStep5, { opacity: 0, duration: 1 });
    tl.from(
      animStep5,
      { opacity: 0.2, x: 820, duration: 2.5, scale: 0.5 },
      "right"
    );
    tl.to(animStep5, { opacity: 1, duration: 1 });

    tl.to(animStep6, { opacity: 1, x: 0, duration: 1.5 }, "right"); 
         
    



  },
  unmounted() {
    this.$store.getters.removeCache;
  },
  updated() {
    this.loadder = "display:none";
  },
};
</script>
<style  scoped>
/* .anim-step1-right{
      position: relative;
  
  } */
</style>
