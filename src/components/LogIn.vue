<template >
  <div>
    <form  id="image">
    <div id="loginForm">
        <h1>{{$t('login')}}</h1>
        <label><b>{{$t('username')}}</b></label>
        <p v-if="displayError==true" class="error">{{$t('loginError')}}</p>
        <br>
        <input type="text" id="firstname" class="names" placeholder="username..." v-model="username" @keypress="clearStatus" @focus="clearStatus">
        <p v-if="displayUsernameError==true" class="error">{{$t('usernameError1')}}</p>
        <br>
        <label><b>{{$t('password')}}</b></label>
        <br>
        <input type="password" name="lastname" class="names" placeholder="your password..." v-model="password" @keypress="clearStatus" @focus="clearStatus">
        <p v-if="displayPasswordError==true" class="error">{{$t('passwordError')}}</p>
        <br>
        <button  class="submit signUpButton"  name="submit" @click.prevent="validate">{{$t('submit')}}</button>
        <div>
        <p>{{$t('donthaveAccount') }}<router-link to="SignUp">{{$t('signup')}}</router-link></p>
        <br>
        <router-link to="ForgotPassword">{{$t('forgotPass')}}</router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'login',
  data(){
    return{
      username:'',
      password:'',
      matched:false,
      displayUsernameError:false,
      displayPasswordError:false,
      displayError:false,
      error:false
    }
  },

  methods:{
    ...mapActions([
        'handleRequest'
    ]),    
    validate:function(){

      if(this.username.length==0){
          this.displayUsernameError=true;
          this.error=true;
      }
      if(this.password.length==0){
        this.displayPasswordError=true;
        this.error=true;
      }
      if(this.error==false){
        this.sendRequest();
      
      }
      
      
    },
    clearStatus:function(){
      if(this.error==true){
        this.username='';
        this.password='';
        this.error=false;
        this.displayUsernameError=false;
        this.displayPasswordError=false;
        this.displayError=false;
      }
    },
    sendRequest:function(){
      let formData=new FormData();
      formData.append('password',this.password);
      formData.append('username',this.username);
      console.log(formData);
      this.handleRequest({
        name:'users/user_login/',
        action:'create',
        data:formData,
      }).then(()=>{
        this.$router.push({ name: 'Home' })
      }).catch(()=>{
        this.displayError=true;
      })
      
      
    },   
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
  margin-top: auto;
  margin-right: auto;
  margin-top:150px;
  background-color: white;
  opacity: 0.75;
}
input{
  border:1px solid #DADADA;
  margin-top:10px;

  width:300px;
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
.names{
  background-image:url("../assets/person.png");
  background-repeat:no-repeat;
  background-position:305px;
  background-size: contain;
  padding-right:35px;
}
.password{
  background-image:url("../assets/password.png");
  background-repeat:no-repeat;
  background-position:355px;
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

.submit{
  margin-left:135px;
}
.or{
    margin-left:170px;
}
.buttons{
  width: 300px;
  height:30px;
  padding:5px 25px;
  border-radius:5px;
  text-shadow:1px 1px 1px #949494;
  border:none;

}
#loginForm{
  margin-left: 60px;
}
.error{
  color: #d33c40;
  margin-bottom:0px;
}

</style>
