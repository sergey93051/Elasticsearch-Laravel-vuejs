<template>
  <div class="continer">
    <div class="row">
      <div class="col-12">
        User <strong>{{ this.name }}</strong>
      </div>
    </div>
    <div class="row mt-4 d-flex justify-content-center">
      <div class="col-8">
        <h1 class="text-center p-4">Elastic Search</h1>
      </div>
      <div class="col-8">
        <div class="input-group rounded">
          <input
            v-model="elValue"
            type="search"
            class="form-control rounded"
            placeholder="Elastic Search"
            aria-label="Search"
            aria-describedby="search-addon"
          />
          <span
            @click="elasticBtn"
            class="input-group-text border-0"
            id="search-addon"
          >
            <i class="fas fa-search"></i>
          </span>
        </div>
      </div>
    </div>
    <div class="row m-3" v-if="searchResult">
      <div
        class="col-md-8 col-lg-6 col-xl-4"
        v-for="(item, index) in searchResult"
        :key="item.id"
      >
        <div class="card m-md-2" style="border-radius: 15px">
          <div
            class="
              m-2
              bg-image
              hover-overlay
              ripple ripple-surface ripple-surface-light
              text-center
            "
            data-mdb-ripple-color="light"
          >
            <img
              v-bind:src="item.img"
              style="
                border-top-left-radius: 15px;
                border-top-right-radius: 15px;
              "
              class="img-fluid text-center"
              alt="Laptop"
            />
            <a href="#!">
              <div class="mask"></div>
            </a>
          </div>
          <div class="card-body pb-0">
            <div class="d-flex justify-content-between">
              <div>
                <p>
                  <strong class="text-dark">{{ item.name }}</strong>
                </p>
                <p class="small text-muted">{{ item.model }}</p>
              </div>
              <div>
                <div
                  class="
                    d-flex
                    flex-row
                    justify-content-end
                    mt-1
                    mb-4
                    text-danger
                  "
                >
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                </div>
                <p class="small text-muted">Rated 4.0/5</p>
              </div>
            </div>
          </div>
          <hr class="my-0" />
          <div class="card-body pb-0">
            <div class="d-flex justify-content-between">
              <p>
                <strong href="#!" class="text-dark">{{ item.price }}</strong> $
              </p>
              <p class="text-dark">#### 8787</p>
            </div>
            <p class="small text-muted">VISA Platinum</p>
          </div>
          <hr class="my-0" />
          <div class="card-body">
            <div
              class="
                d-flex
                justify-content-between
                align-items-center
                pb-2
                mb-1
              "
            >
              <div>
                <router-link
                  :to="{ path: '/show/product/' + item.id }"
                  ref="test"
                  type="button"
                  class="btn btn-primary m-1"
                >
                  show
                </router-link>
                <button
                  type="button"
                  class="btn btn-danger m-1"
                  @click="addCart(item.id, $event),item.countCard++"
                >
                  <i class="bi-cart-fill me-1"></i>
                  add to Cart ( {{  item.countCard }} )
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="row"  v-else>
           <div class="col-12 text-center" v-if="!searchResult">
                     <p class="text-danger">Empty</p>
           </div>
    </div> -->
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex"; 
export default {
  emits: ["hope"],
  data() {
    return {
      name: "",
      value: "",
      elValue: "",
      image:null,
      searchResult:[],
      countCartProd:0
    };
  },
  mounted() {
  
  },
  created() {
    if (window.Laravel.user) {
      this.name = window.Laravel.user.name;
    }
  },
  beforeRouteEnter(to, from, next) {
    if (!window.Laravel.isLoggedin) {
           this.$router.go({ name: "login" });
    }
    next();
  },
  methods: {
       ...mapActions(['setToCart']),    
       addCart(id,event){         
        this.setToCart({
             "searchResult":this.searchResult,
             "id":id
            });         

        this.$emit("hope", this.$store.getters.getCartsCount);       
    },
    elasticBtn() {
      this.$axios.get("/sanctum/csrf-cookie").then((response) => {
        this.$axios
          .post("api/elastic/search", {
            search: this.elValue,
          })
          .then((response) => {  
             this.searchResult = [];
             var cart;      
             JSON.parse(response.data).forEach(element => {  
                     if (Array.isArray(element._source.img)) {
                          this.image = element._source.img[0];    
                      }else{
                          this.image = element._source.img;
                      }                       
                   cart = this.$store.getters.getCart.filter((obj)=>obj.id === element._id ).map(obj => obj.count);
                 
                  this.searchResult.push({
                     "countCard":cart[0]?cart[0]:0,
                     "id":element._id,
                     "name":element._source.name,
                     'model':element._source.model,
                     "price":element._source.price,
                     "discount":element._source.discount,
                     "img":window.atob(this.image)
                }); 
                                    
             }); 
          }).catch(function (error) {
              console.error(error);
          });
      });  
    },
  }, 
};
</script>
