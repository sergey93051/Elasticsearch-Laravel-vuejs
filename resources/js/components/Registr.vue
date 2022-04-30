<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="alert alert-danger" role="alert" v-if="error">
                    {{ error }}
                </div>                 
                <div class="card card-default">
                    <div class="card-header">Register</div>                    
                    <div class="card-body">
                        <Form @submit="RegistrSubmit">                             
                            <div class="form-group row">
                                <label for="nameRules" class="col-sm-4 col-form-label text-md-right">Name</label>
                                <div class="col-md-6 p-2">
                                   <Field  name="nameRules" id="name" type="text" class="form-control" v-model="name" :rules="nameRules"  />                                    
                                </div> 
                                <div class="col-12"> 
                                      <ErrorMessage name="nameRules"  class="alert alert-danger p-2 w-100" role="alert"/>
                                </div>                                
                            </div>
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
                                        Register
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
            Registrerror:false,
            name: "",
            email: "",
            password: "" ,
            rulesHasError:false         
        }
    },
    components: {
       Field,
       Form,
       ErrorMessage, 
    },
    computed:{
    
    },
    methods: {
        nameRules(value){
              const regex = /^[A-Z]\w{4,}$/i;
              if (!value) {            
                   return 'This nams is required';
               }else if(!regex.test(value)) {         
                    return 'This nams is not valid';
               }           
               return true;
        },
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
        RegistrSubmit(e) {             
                axios.get('/sanctum/csrf-cookie').then(response => {
                    axios.post('api/register', {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        error:false
                    }).then(response => {                       
              
                         if (response.statusText == "Created") {
                              this.$router.go({ name: "login" });                                                   
                            } else {
                                this.error = response.data.message
                            }
                        }).catch(error => {
                            console.error(error)
                                 if (error.response.status === 422) {
                                    
                                     console.log( error.response.messages)  
                                        
                                 }
                                   
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