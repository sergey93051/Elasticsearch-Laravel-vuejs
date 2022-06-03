<template>
 <div class="container">
    <div class="text-center" style="margin: 20px 0px 20px 0px">
      <span class="text-secondary"></span>
    </div>
      <Navbar :isLogged="sessionAuth"  />
    <br />     
  </div> 

</template>

<script>
import Navbar from "./components/Navbar.vue"
export default {

 data(){
   return {
        sessionAuth:false
   }
 },
 components:{
       Navbar
 },
 created() {
     this.sessionAuth = JSON.parse(sessionStorage.getItem('isAuth'))
 },
 
};
</script>