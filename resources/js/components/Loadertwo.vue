<template>
    <div class="mainloadder ">
            <div class="loadder d-flex justify-content-center">
                <img :src="randomSrc(srcAll)" alt="">                
            </div>
            
    </div>
</template>
<script>
export default {
     data() {
         return {
             srcAll:[
                'https://c.tenor.com/7K4cTi4-U5QAAAAM/snoopdogg-loading.gif',
                 'https://cdn.dribbble.com/users/961752/screenshots/8461416/media/77029d5c0a1b7182e1638ce2e2e11a3f.gif',
                 'https://icon-library.com/images/spinner-icon-gif/spinner-icon-gif-25.jpg',
                                
             ]
         }
     },
     methods:{
         randomSrc(arg){
             var item = arg[Math.floor(Math.random()*arg.length)];
             return item;
         }
     }
}
</script>
<style scoped>
   .mainloadder{
         position: absolute;
         background: white;
        border:1px  solid white;
        left: 0px;
        top: 0px;
         width: 100%;
         height: 100%;
        z-index: 999998;
   }
  .loadder{
     position: relative;
     top: 24%;  
     z-index: 999999; 
  }
</style>