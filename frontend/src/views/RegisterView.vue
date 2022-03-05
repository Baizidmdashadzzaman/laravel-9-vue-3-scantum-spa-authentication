<template>
  <div class="about">
    <div class="" style="background-color:#effff1;width:100%;padding:50px">
      <div class="card">
        <div class="card-body">
<p>Register now</p>
<form>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Name</label>
    <input type="text" v-model="form.name" class="form-control" >
    <div class="form-text text-danger" v-if="errors.name" >{{ errors.name[0] }}</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email"  v-model="form.email" class="form-control" >
    <div class="form-text text-danger" v-if="errors.email" >{{ errors.email[0] }}</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password"  v-model="form.password" class="form-control" >
    <div class="form-text text-danger" v-if="errors.password" >{{ errors.password[0] }}</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password confirmation</label>
    <input type="password"  v-model="form.password_confirmation" class="form-control" >
    <div class="form-text text-danger" v-if="errors.password_confirmation" >{{ errors.password_confirmation[0] }}</div>
  </div>
  <br/>
  <button type="submit" @click.prevent="registeruser" class="btn btn-success btn-block">
    {{ processing ? "Please wait" : "Register" }}
  </button>
</form>

         </div>
      </div>
    </div>

  </div>
</template>

<script>
import User from "../apis/User"
export default ({
  data() {
    return {
      form:{
        name:'',
        email:'',
        password:'',
        password_confirmation:''
      },
      errors: [],
      processing: false
    }
  },
  methods:{
    registeruser(){
         this.processing = true;
             
             User.register(this.form)
             .then(() => {
               this.processing = false;
               Swal.fire({
                 title: 'Registerd',
                 text: 'Registration sucessfully done,please login.',
                 icon: 'success',
                 confirmButtonText: 'Ok'
                })
                 this.$router.push({ name: "login" });
              })
             .catch(error => {
               if (error.response.status === 422) {
                 this.processing = false;
                 this.errors = error.response.data.errors;
                }
             });
         
         
         
    }

  }
})
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
