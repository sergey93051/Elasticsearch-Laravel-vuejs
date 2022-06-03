<template>
  <div class="container">
    <div class="row  mt-5 d-flex justify-content-center">
        <h2 class="text-center m-2 p-2">Create new Product</h2>
        <div class="col-md-12">
           {{ this.getStatus() }}
         </div>
      <div class="col-md-8 p-3" style="border: 1px solid grey">
        <Form @submit="submitProduct">
          <div class="form-group col-md-6">
            <label for="name">name</label>
            <Field
              name="nameRulses"
              type="text"
              class="form-control"
              id="name"
              placeholder="name"
              v-model="name"
              :rules="nameRulses"
            />
            <div class="col-12 p-2">
              <ErrorMessage
                name="nameRulses"
                class="alert alert-danger p-2 w-100"
                role="alert"
              />
            </div>
          </div>
          <div class="form-group col-md-6">
            <label for="model">model</label>
            <Field
              name="modelRulses"
              type="text"
              class="form-control"
              id="model"
              placeholder="model"
              v-model="model"
              :rules="modelRulses"
            />
             <div class="col-12 p-2">
              <ErrorMessage
                name="modelRulses"
                class="alert alert-danger p-2 w-100"
                role="alert"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="Price">Price</label>
            <input
              type="number"
              class="form-control"
              id="Price"
              placeholder="Price"
              v-model="price"
            />
          </div>
          <div class="form-group">
            <label for="discount">discount</label>
            <select
              class="form-select form-select-sm"
              name="discount"
              id="discount"
              v-model="discount"
            >
              <option value="">not</option>
              <option value="5">5 %</option>
              <option value="7">7 %</option>
              <option value="10">10 %</option>
            </select>
          </div>
          <div class="form-group">
            <input type="file" @change="onFileUpload"  multiple/>
          </div>
          <button type="submit" class="btn btn-primary">create</button>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { Field, Form, ErrorMessage } from "vee-validate";
import { mapGetters, mapActions,mapMutations } from "vuex";


export default {
  data() {
    return {
      name: null,
      model: null,
      price: null,
      discount: null,
      FILE: null,
      bese64: [],
      statusShow: null,
      validMess:"",
    };
  },
  computed:{ 
  },
  components: {
    Field,
    Form,
    ErrorMessage,
  },  
  methods: {
     ...mapActions(["createProducts","setvalidName","setvalidModel"]), 
     ...mapGetters(["getStatus","messageValid"]),
   nameRulses(event) {
         this.setvalidName(event);
         return this.messageValid();  
       
    },
    modelRulses(event){
         this.setvalidModel(event);
         return this.messageValid(); 
    },
  async onFileUpload(event) {

       const files = [...event.target.files].map(file => {
           const reader = new FileReader();      
             return new Promise(resolve => {
                reader.onload = () => resolve(btoa(reader.result));
                reader.readAsDataURL(file);
             });
        });

      const newfiles = await Promise.all(files);
      this.bese64.push(newfiles);   
    },
    submitProduct() {      
      this.createProducts({
         image: this.bese64,
         name: this.name,
         model: this.model,
         price: this.price,
         discount: this.discount,
      });
    },
  },
};
</script>

<style scoped>
</style>