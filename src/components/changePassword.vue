<template>
<div >
  <form id="image">
      <div id="changepass">
      <h1>{{$t('changepassword')}}</h1>
      <p v-if="displayError==true" class="error">{{$t('passwordConfirmError')}}</p>
      <label><b>{{$t('newpassword')}}</b></label>
      <br>
      <input type="password" id="newPass" class="password"  v-model="password">
      <br>
      <label><b>{{$t('confirmpassword')}}</b></label>
      <br>
      <input type="password" name="confirmedPass" class="password" v-model="confirmedPass">
      <br>
      <button  class="submit signUpButton"  name="submit" @click.prevent="validate">{{$t('submit')}}</button>
    </div>
  </form>
</div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'changepass',
  data(){
   return{
     password:'',
     confirmedPass:'',
     displayError:false,
     token:'',
   }
  },
  methods:{
    ...mapActions([
        'handleRequest'
    ]),

    validate:function(){
      if(this.confirmedPass==this.password && this.password.length!=0 && this.confirmedPass.length!=0){
        this.sendRequest(this.email,this.password);
      }else{
        this.displayError=true;
      }
    },

    sendRequest:function(){
      this.token=this.$route.query.token;
      let formData=new FormData();
      formData.append('password',this.password);
      formData.append('token',this.token);
      this.handleRequest({
        name:'password-reset/confirm/',
        action:'create',
        data:formData,
      }).then(()=>{
        this.$router.push({ name: 'Home' })
      }).catch(()=>{
          this.displayError=true;
      })
    }
  }
}
</script>

<style scoped>
 #image{
    background-image: url("../assets/puppy1.jpg");
    background-size:contain;
    background-position:bottom left;
    background-repeat:no-repeat;
 }
form{
  width: 600px;
  padding: 10px;
  border: 5px solid #98BF64;
  margin-left: auto;
  margin-right: auto;
  margin-top:150px;
  background-color: white;
  opacity: 0.75;
}
input{
  border:1px solid #DADADA;
  margin-top:10px;

  width:350px;
  height:20px;

}
textarea{
  border:1px solid #DADADA;
  width:200px;
  margin-top:5px;
}
Button{
  margin-top:10px;
}
.password{
  background-image:url("../assets/password.png");
  background-repeat:no-repeat;
  background-position:360px;
  background-size: contain;
  padding-right:35px;
}
.signUpButton{
  background-color:#607D3B;
  border-radius:5px;
  border:none;
  padding:10px 25px;
  color:#FFF;
  text-shadow:1px 1px 1px #949494;

}
.error{
  color: #d33c40;
  margin-bottom:0px;
}
#changepass{
  margin-left:50px;
}
</style>
