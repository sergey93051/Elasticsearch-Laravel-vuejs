<template>
 <div class="container">
    <div class="text-center" style="margin: 20px 0px 20px 0px">
      <span class="text-secondary"></span>
    </div>
      <Navbar :name="cartCount"  />
    <br />     
  </div> 

</template>

<script>
import Navbar from "./components/Navbar.vue"
export default {

 data(){
   return {
        cartCount:1
   }
 },
 components:{
       Navbar
 },
 mounted() {
    
 },
 
};
</script>