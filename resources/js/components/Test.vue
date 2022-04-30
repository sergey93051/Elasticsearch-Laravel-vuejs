<template>
  <div class="container mt-6">
    <div class="row">
      <div class="col mt-5">
        <h1>Vue Transition Animation</h1>
        <button @click="open = !open">Toggle Animation</button>
        <transition name="rotate">
          <p v-if="open" class="example-div"><img src="https://www.vectorlogo.zone/logos/vuejs/vuejs-ar21.png" width="" alt="" srcset=""></p>
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped>

@keyframes rotate {
    0% { opacity: 0; transform: scale(0) rotate(-180deg); }
    100% { opacity: 1; transform: scale(1) rotate(0deg); }
}

.rotate-enter-active {
    animation: rotate 0.5s;
}

.rotate-leave-active {
    animation: rotate 0.5s reverse;
}


</style>
<script>
import { Field, Form, ErrorMessage } from "vee-validate";

import { mapGetters, mapActions } from "vuex";

import PostForm from "./TestForm";


export default {

  data() {
    return {
      input: "",
      isRed: "",
      vuexv: "",
      open:true,
    };
  },
  async mounted() {
    this.fetchPosts(2);
  },
  components: {
    Field,
    Form,
    ErrorMessage,
    PostForm,
  },
  //   computed:{
  //       isFun(){

  //              this.input!=undefined ? this.input:""

  //              this.isRed = "hello world" + this.input

  //              return this.isRed
  //      },
  //      allPosts(){
  //         return this.$store.getters.allPosts;
  //      }
  //   },
  computed: mapGetters(["allPosts"]),
  methods: mapActions(["fetchPosts"]),
  //   methods: {
  //      //async
  //         onSubmit(values) {
  //             //  var a = this.$store.dispatch('increment');
  //             //   console.log(this.allPosts);
  //         },
  //       //   isRequired(value) {
  //       //         const regex = /^[A-Z]\w{4,}$/i;
  //       //         if (!value) {
  //       //              return 'This nams is required';
  //       //          }else if (!regex.test(value)) {
  //       //               return 'This nams is not valid';
  //       //          }
  //       //          return true;
  //       //       },
  //   }
};
</script>