<template>
    <div class="continer">
         <div class="row">
               <form class="form-group" @submit.prevent="onSubmit">
                   <input type="text" class="form-control" v-model="title"> 
                   <input type="text" class="form-control" v-model="body">
                   <button type="submit" class="btn btn-info">ok</button>         
               </form>          
         </div>
    </div>
</template>
<script>
import {mapGetters} from "vuex";
export default {

     data() {
         return {
               title:"",            
               body:""
         }
     }, 
     methods: {
           ...mapGetters(['newstate']),
           onSubmit(e){                 
                   this.createPost({
                        title:this.title,
                        body:this.body,
                        id:Date.now()
                   })                
           }
     },
}
</script>