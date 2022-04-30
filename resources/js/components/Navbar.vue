<template>
  <div class="continer">
    <nav
      class="
        navbar navbar-expand-lg navbar-scroll
        fixed-top
        shadow-0
        border-bottom border-dark
      "
    >
      <div class="container">
        <!-- <a class="navbar-brand" href="#!"><i class="fab fa-mdb fa-4x"></i></a> -->
        <ul class="navbar-nav" v-if="!isLoggedIn">
          <li class="nav-item">
            <router-link to="/login" class="nav-link">login</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link">Registr</router-link>
          </li>
        </ul>
        <!-- <button
          class="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="fas fa-bars"></i>
        </button> -->

        <div
          v-if="isLoggedIn"
          class="collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link to="/home" class="btn btn-dark ms-3"
                >Get Started</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/new/product" class="nav-link"
                >Create Product</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/cart" class="nav-link">
                <i class="bi-cart-fill me-1"></i>
                 Cart ({{ thisCartsCount }})
              </router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#!">Support</a>
            </li>
            <!-- <li class="nav-item">
              <a class="nav-link" href="#!">Sign In</a>
            </li> -->
            <button
              type="button"
              class="btn btn-outline-danger"
              @click="logout"
            >
              Logout
            </button>
          </ul>
        </div>
      </div>
    </nav>
    <!-- Navbar -->
    <div class="mt-4"  >     
        <transition :name="transitionName"  mode="out-in">
          <router-view @hope="onhope" />
        </transition>  
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["name"],
  emits: ["click:modelValue"],
  data() {
    return {
      isLoggedIn: false,
      thisCartsCount: 0,
      transitionName: null
    };
  },
  watch: {
  '$route'(to, from){
      if(to.name=='product' || to.name=="animation"){
          this.transitionName = null;  
       }else{
          this.transitionName = "scale";  
       }   
   }
  }, 
  created() {
    if (window.Laravel.isLoggedin) {
      this.isLoggedIn = true;
    }
    this.thisCartsCount = this.$store.getters.getCartsCount;
  },
  computed: {
    ...mapGetters(["getCartsCount"]),
  },
  methods: {
    onhope(val) {
      this.thisCartsCount = val;
    },
    logout(e) {
      e.preventDefault();
      this.$axios.get("/sanctum/csrf-cookie").then((response) => {
        this.$axios
          .post("/api/logout")
          .then((response) => {
            if (response.data == 200) {
              this.$router.go({ name: "login" });
            } else {
              console.log(response);
            }
          })
          .catch(function (error) {
            console.error(error);
          });
      });
    },
  },
};
</script>
<style scope>

.scale-enter-active,
.scale-leave-active {
  transition: all 0.9s ease;
}


.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
/* Color of the links BEFORE scroll */
.navbar-scroll .nav-link,
.navbar-scroll .navbar-toggler-icon,
.navbar-scroll .navbar-brand {
  color: #262626;
}

/* Color of the navbar BEFORE scroll */
.navbar-scroll {
  background-color: #ffc017;
}

/* Color of the links AFTER scroll */
.navbar-scrolled .nav-link,
.navbar-scrolled .navbar-toggler-icon,
.navbar-scroll .navbar-brand {
  color: #262626;
}

/* Color of the navbar AFTER scroll */
.navbar-scrolled {
  background-color: #fff;
}

/* An optional height of the navbar AFTER scroll */
.navbar.navbar-scroll.navbar-scrolled {
  padding-top: auto;
  padding-bottom: auto;
}
.navbar-brand {
  font-size: unset;
  height: 3.5rem;
}
</style>