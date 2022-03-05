<template>
  <div class="about">
    <div class="" style="background-color:#effff1;width:100%;padding:50px">
      <div class="card">
        <div class="card-body">
<p>Login now</p>
<form>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email"  v-model="form.email" class="form-control" >
    <div class="form-text text-danger" v-if="errors.email" >{{ errors.email[0] }}</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" v-model="form.password" class="form-control" >
    <div class="form-text text-danger" v-if="errors.password" >{{ errors.password[0] }}</div>
  </div>
  <br/>
  <button type="submit" @click.prevent="loginuser" class="btn btn-success btn-block">
    {{ processing ? "Please wait" : "Login" }}
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
        email:'',
        password:''
      },
      errors: [],
      processing: false
    }
  },
  methods:{
    loginuser(){
         this.processing = true;
             
             User.login(this.form)
             .then(() => {
               this.processing = false;
               localStorage.setItem("auth", 1);
                
               Swal.fire({
                 title: 'Loggedin',
                 text: 'Loggedin sucessfully.',
                 icon: 'success',
                 confirmButtonText: 'Ok'
                })
                 this.$router.push({ name: "dashboard" });
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
