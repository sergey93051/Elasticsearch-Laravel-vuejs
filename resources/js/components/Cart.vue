<style scoped>
.hidden-cart-remove {
  animation: rotate 0.6s reverse;
}
.rotate-enter-active {
  animation: rotate 0.6s;
}
</style>
<template>
  <div class="continer-fluit">
    <div class="px-4 px-lg-0">
      <div class="pb-5">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
              <!-- Shopping cart table -->
              <div class="table-responsive">
                <h3>Cart</h3>
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col" class="border-0 bg-light">
                        <div class="p-2 px-3 text-uppercase">Product</div>
                      </th>
                      <th scope="col" class="border-0 bg-light">
                        <div class="py-2 text-uppercase">Price</div>
                      </th>
                      <th scope="col" class="border-0 bg-light">
                        <div class="py-2 text-uppercase">Quantity</div>
                      </th>
                      <th scope="col" class="border-0 bg-light">
                        <div class="py-2 text-uppercase">Remove</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody v-for="(carts, i) in mapCart" :key="carts.id">
                    <transition name="hidden-cart-remove">
                      <tr>
                        <td scope="row" class="border-0">
                          <div class="p-2">
                            <img
                              :src="carts.img"
                              alt=""
                              width="70"
                              class="m-2 img-fluid rounded shadow-sm"
                            />
                            <div class="ml-3 d-inline-block align-middle">
                              <h5 class="mb-0">
                                <router-link
                                  :to="{ path: '/show/product/' + carts.id }"
                                  class="text-dark d-inline-block align-middle"
                                >
                                  {{ carts.name }}
                                </router-link>
                              </h5>
                              <span
                                class="
                                  text-muted
                                  font-weight-normal font-italic
                                  d-block
                                "
                                >{{ carts.model }}</span
                              >
                            </div>
                          </div>
                        </td>
                        <td class="border-0 align-middle">
                          <strong>{{ carts.price }}</strong>
                        </td>
                        <td class="border-0 align-middle">
                          <span class="m-1 p-1"
                            ><button
                              class="btn"
                              v-on:click="
                                quantityMin(carts.id),
                                  carts.count > 1
                                    ? carts.count--
                                    : (carts.count = 1)
                              "
                            >
                              -
                            </button></span
                          >
                          <span
                            ><strong> {{ carts.count }} </strong></span
                          >
                          <span class="m-1 p-1"
                            ><button
                              class="btn"
                              @click="
                                quantityMax(carts.id),
                                  carts.count < 15
                                    ? carts.count++
                                    : (carts.count = 15)
                              "
                            >
                              +
                            </button></span
                          >
                        </td>
                        <td class="border-0 align-middle">
                          <button
                            @click="removeItem(carts.id)"
                            class="text-dark"
                          >
                            <i class="fa fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    </transition>
                  </tbody>
                </table>
              </div>
              <!-- End -->
            </div>
          </div>

          <div class="row py-5 p-4 bg-white rounded shadow-sm">
            <div class="col-lg-6">
              <div
                class="
                  bg-light
                  rounded-pill
                  px-4
                  py-3
                  text-uppercase
                  font-weight-bold
                "
              >
                Coupon code
              </div>
              <div class="p-4">
                <p class="font-italic mb-4">
                  If you have a coupon code, please enter it in the box below
                </p>
                <div class="input-group mb-4 border rounded-pill p-2">
                  <input
                    type="text"
                    placeholder="Apply coupon"
                    aria-describedby="button-addon3"
                    class="form-control border-0"
                  />
                  <div class="input-group-append border-0">
                    <button
                      id="button-addon3"
                      type="button"
                      class="btn btn-dark px-4 rounded-pill"
                    >
                      <i class="fa fa-gift mr-2"></i>Apply coupon
                    </button>
                  </div>
                </div>
              </div>
              <div
                class="
                  bg-light
                  rounded-pill
                  px-4
                  py-3
                  text-uppercase
                  font-weight-bold
                "
              >
                Instructions for seller
              </div>
              <div class="p-4">
                <p class="font-italic mb-4">
                  If you have some information for the seller you can leave them
                  in the box below
                </p>
                <textarea
                  name=""
                  cols="30"
                  rows="2"
                  class="form-control"
                ></textarea>
              </div>
            </div>
            <div class="col-lg-6">
              <div
                class="
                  bg-light
                  rounded-pill
                  px-4
                  py-3
                  text-uppercase
                  font-weight-bold
                "
              >
                Order summary
              </div>
              <div class="p-4">
                <p class="font-italic mb-4">
                  Shipping and additional costs are calculated based on values
                  you have entered.
                </p>
                <ul class="list-unstyled mb-4">
                  <li class="d-flex justify-content-between py-3 border-bottom">
                    <strong class="text-muted">Order Subtotal</strong
                    ><strong>$390.00</strong>
                  </li>
                  <li class="d-flex justify-content-between py-3 border-bottom">
                    <strong class="text-muted">Shipping and handling</strong
                    ><strong>$10.00</strong>
                  </li>
                  <li class="d-flex justify-content-between py-3 border-bottom">
                    <strong class="text-muted">Tax</strong
                    ><strong>$0.00</strong>
                  </li>
                  <li class="d-flex justify-content-between py-3 border-bottom">
                    <strong class="text-muted">Total</strong>
                    <h5 class="font-weight-bold">$400.00</h5>
                  </li>
                </ul>
                <a href="#" class="btn btn-dark rounded-pill py-2 btn-block"
                  >Procceed to checkout</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      mapCart: [],
    };
  },
  methods: {
    ...mapActions(["removeCartItem", "cartCountChnage"]),
    removeItem(item_id) {;
      this.removeCartItem({
        item_id: item_id,
        getCart: this.mapCart,
      });
      this.$emit("hope", this.$store.getters.getCartsCount);
    },
    quantityMin(id) {
      this.cartCountChnage({
        id: id,
        mapCart: this.mapCart,
        do: "min",
      });

      //  arg.getCart.splice(arg.getCart.findIndex(item => item.id === arg.item_id), 1)
      // console.log(this.mapCart)
    },
    quantityMax(id) {
      this.cartCountChnage({
        id: id,
        mapCart: this.mapCart,
        do: "max",
      });
    },
  },
  computed: {
    // ...mapGetters(['getCart']),
    //     this.mapCart = this.getCart
    //     return this.mapCart;
    // }
  },
  created() {
    this.mapCart = this.$store.getters.getCart;
  },
};
</script>