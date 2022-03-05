<template>
  <div class="about">
    <div class="" style="background-color:#effff1;width:100%;padding:50px">
      <div class="card"  >
          <button type="button" class="btn btn-success " @click="logoutuser"
           style="float:right">{{ processing ? "Please wait" : "Logout" }}</button>
           <br><br>
        <div class="card-body" v-if="user">
<p>Welcome to dashboard</p>
 <br/>  <br/> 
<h4>Name: <b>{{user.name}}</b></h4>
<h4>Email: <b>{{user.email}}</b></h4>
<h4>Signup at: <b>{{user.created_at}}</b></h4>
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
      errors: [],
      processing: false,
      user: null
    }
  },
  mounted() {
    User.auth().then(response => {
      this.user = response.data;
    });
  },
  methods:{
    logoutuser(){
         this.processing = true;
             
             User.logout()
             .then(() => {
               this.processing = false;
               
               Swal.fire({
                 title: 'Loggedout',
                 text: 'Logged out sucessfully.',
                 icon: 'success',
                 confirmButtonText: 'Ok'
                })

                 this.$router.push({ name: "login" });
                 localStorage.removeItem("auth");
              })
   
    }

  },

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
