<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="alert alert-danger" role="alert" v-if="error !== null">
                    {{ error }}
                </div>
                <div class="card card-default">
                    <div class="card-header">Login</div>
                    <div class="card-body">
                        <Form @submit="loginSubmit" >
                            <div class="form-group row">
                                <label for="email" class="col-sm-4 col-form-label text-md-right">E-Mail Address</label>
                                <div class="col-md-6 p-2">
                                    <Field name="emailRulses" id="email" type="email" class="form-control" v-model="email" :rules="emailRulses" />
                                </div>
                                 <div class="col-12"> 
                                      <ErrorMessage name="emailRulses" class="alert alert-danger p-2 w-100" role="alert" />
                                </div>
                            </div>

                         <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
                                <div class="col-md-6 p-2">
                                    <Field name="passwordRulses" id="password" type="password" class="form-control" v-model="password" :rules="passwordRulses"  />
                                </div>
                                 <div class="col-12"> 
                                      <ErrorMessage name="passwordRulses" class="alert alert-danger p-2 w-100" role="alert" />
                                </div>
                           </div>
                            <div class="form-group row mb-0">
                                <div class="col-md-8 offset-md-4">
                                    <button  class="btn btn-primary">
                                        Login
                                    </button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Field, Form, ErrorMessage } from 'vee-validate';

export default {
    
    data() {
        return {
            email: "",
            password: "",
            error: null,
         
        }
    },
   
    components: {
       Field,
       Form,
       ErrorMessage, 
    },
    methods: {
         emailRulses(value){
               const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
              if (!value) {            
                   return 'This email is required';
               }else if(!regex.test(value)) {         
                    return 'This email is not valid';
               }           
               return true;
        },
        passwordRulses(value){
              const regex = /^[A-Za-z0-9?$]{6,}$/i;
              if (!value) {            
                   return 'This password is required';
               }else if(!regex.test(value)) {         
                    return 'This password is not valid';
               }           
               return true;
        },
        loginSubmit(e) {           
                this.$axios.get('/sanctum/csrf-cookie').then(response => {
                    this.$axios.post('api/login', {
                        email: this.email,
                        password: this.password
                    }).then(response => {                                             
                            if (response.data == 200) {       
                                   this.$router.go({ name: "home" });                               
                            } else {
                                    this.error = response.data.message
                            }
                        })
                        .catch(function (error) {
                            console.error(error);
                        });
                });            
        }
    },
    beforeRouteEnter(to, from, next) {
        if (window.Laravel.isLoggedin) {
            return next('home');
        }
        next();
    }
}
</script>