
<template>
      <div class="container">
    <div class="text-center" style="margin: 20px 0px 20px 0px">
      <span class="text-secondary"></span>
    </div>

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse">
        <div class="navbar-nav" v-if="isLoggedIn">
          <router-link to="/home" class="nav-item nav-link">Home</router-link>
          <router-link to="/new/product" class="nav-item nav-link">Create Product</router-link>
           
            <div class="collapse navbar-collapse">
               <router-link to="/new/product" class="btn btn-outline-dark flex-shrink-2" >
                 <i class="bi-cart-fill me-1"></i>
                  Add to cart
              </router-link>
              <a class="nav-item nav-link p-1" style="cursor: pointer" @click="logout">Logout</a>   
            </div> 
        </div>
        <div class="navbar-nav" v-else>
            <router-link to="/register" class="nav-item nav-link">Registr</router-link>
            <router-link to="/login" class="nav-item nav-link">login</router-link>
        </div>
      </div>
    </nav>
    <br />
    <router-view />
  </div>
</template>




