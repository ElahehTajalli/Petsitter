<template>
  <div>
    <form id="image" >
      <section id="section1" v-if="signupStep == 1" >
        <h1>{{$t('signup')}}</h1>

        <label><b>{{$t('firstname')}}</b></label>
        <br>
        <input type="text" id="firstname" class="names" placeholder="your firstname" v-model="firstname" @keypress="clearStatus" @focus="clearStatus">
        <p v-if="displayFirstnameError==true" class="error">{{$t('firstnameError')}}</p>
        <br>
        <label><b>{{$t('lastname')}}</b></label>
        <br>
        <input type="text" name="lastname" class="names" placeholder="your lastname" v-model="lastname" @keypress="clearStatus" @focus="clearStatus">
        <p v-if="displayLastnameError==true" class="error">{{$t('lastnameError')}}</p>
        <br>
        <label><b>{{$t('username')}}</b></label>
        <br>
        <input type="text" name="username" class="names" placeholder="your username" v-model="username" @keypress="clearStatus" @focus="clearStatus">
        <p v-if="displayUsernameError1==true" class="error">{{$t('usernameError1')}}</p>
        <p v-if="displayUsernameError2==true" class="error">{{$t('usernameError2')}}</p>
        <br>
        <label><b>{{$t('email')}}</b></label>
        <br>
        <input type="email" name="email" class="email" placeholder="your email" v-model="email" @keypress="clearStatus" @focus="clearStatus">
        <p v-if="displayEmailError1==true" class="error">{{$t('emailError1')}}</p>
        <p v-if="displayEmailError2==true" class="error">{{$t('emailError2')}}</p>
        <br>
        <label><b>{{$t('password')}}</b></label>
        <br>
        <input type="password" class="password" name="password" placeholder="your password" v-model="password" @keypress="clearStatus" @focus="clearStatus">
        <p v-if="displayPasswordError==true" class="error">{{$t('passwordError')}}</p>
        <br>
        <button  class="submit signUpButton"  name="submit" @click.prevent="validate">{{$t('submit')}}</button>
        
        <div>
        <p>{{$t('alreadyHaveAnAccout') }}<router-link to="LogIn"><b>{{$t('login')}}</b></router-link></p>
        </div>
        </section>
        <section v-if="signupStep == 2" id="section2">
        <h1>{{$t('Whatareyoulookingfor')}}</h1>
        <br>
        <button type="button" class="optionButtons buttons" ><b>{{$t('petsitterjob')}}</b></button>
        <br>
        <button type="button" class="optionButtons buttons" ><b>{{$t('petsitter')}}</b></button>
        <br>
        <button type="button" class="nextButton buttons" @click.prevent="nextSignUpStep"><b>{{$t('submit')}}</b></button>
      </section>
      <section v-if="signupStep == 3"  id="section3">
        <h1>{{$t('howtocantactyou')}}</h1>
        <label><b>{{$t('phone')}}</b></label>
        <br>
        <textarea placeholder="phone number..."></textarea>
        <br>
        <label><b>{{$t('address')}}</b></label>
        <br>
        <textarea placeholder="address..."></textarea>
        <br>
        <router-link to="Home"><button type="button" class="nextButton buttons" ><b>{{$t('submit')}}</b></button></router-link>
      </section>
    </form>
  </div>
</template>

<script>
 // import axios from 'axios'
  import {mapActions} from 'vuex'
  export default {
    name: 'signup',
    data(){
      return{
        firstname:'',
        lastname : '',
        username:'',
        email:'',
        password:'',
        signupStep:1,
        error:false,
        emailIsUsed:false,
        usernameIsUsed:false,
        displayEmailError1:false,
        displayUsernameError1:false,
        displayEmailError2:false,
        displayUsernameError2:false,
        displayPasswordError:false,
        displayFirstnameError:false,
        displayLastnameError:false,
        response:''
      }
    },
    methods:{
      ...mapActions([
        'handleRequest'
      ]),
      nextSignUpStep:function(){
          this.signupStep++;
      },
      validate:function(){

        if(this.firstname.length==0) {this.displayFirstnameError=true;this.error=true;}
        if(this.lastname.length==0) {this.displayLastnameError=true;this.error=true;}
        if(this.password.length==0) {this.displayPasswordError=true;this.error=true;}
        if(this.ValidateEmail(this.email)==false || this.email.length==0) {this.displayEmailError1=true;this.error=true;}
        if(this.username.length==0) {this.displayUsernameError1=true;this.error=true;}
        if(this.error!=true){
          this.response=this.sendRequest();
        }
      },

      clearStatus:function(){
        if(this.error==true){
          this.firstname='';
          this.lastname = '';
          this.username='';
          this.email='';
          this.password='';
          this.error=false;
          this.displayEmailError1=false;
          this.displayEmailError2=false;
          this.displayUsernameError1=false;
          this.displayUsernameError2=false;
          this.displayFirstnameError=false;
          this.displayLastnameError=false;
          this.displayPasswordError=false;
        }
      },
      sendRequest:function(){
        let formData=new FormData();
        formData.append('first-name',this.firstname);
        formData.append('last-name',this.lastname);
        formData.append('email',this.email);
        formData.append('password',this.password);
        formData.append('username',this.username);
        this.handleRequest({
          name:'users/register/',
          action:'create',
          data:formData,
        }).then(()=>{
           this.nextSignUpStep();
        }).catch((response)=>{

            
            if(response.response.data.message=="not registered"){ 
              
            if(response.response.data.user_errors.username[0]=="A user with that username already exists."){
              this.displayUsernameError2=true;
              this.error=true;
            }
            if(response.response.data.user_errors.email[0]=="User with this Email address already exists.") {
              this.displayEmailError2=true;
              this.error=true;
            }
          }
        })
      },


      ValidateEmail:function(email)  {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
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
  body{
    background-image: url("../assets/doggy.jpg");
    background-size: auto;
    background-repeat:no-repeat;
  }
  form{
    width: 700px;
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

.email{
  background-image:url("../assets/email.png");
  background-repeat:no-repeat;
  background-position:305px;
  background-size: contain;
  padding-right:35px;
}

.password{
  background-image:url("../assets/password.png");
  background-repeat:no-repeat;
  background-position:310px;
  background-size: contain;
  padding-right:35px;
}
.signUpButton{
  background-color:#607D3B;
  border-radius:5px;
  border:none;
  padding:10px 25px;
  color:#FFF;
  text-shadow:1px 1px 1px #B2D3C2;

}

.submit{
  margin-left:135px;
}
.login{
  margin-left:140px;
}
.or{
    margin-left:170px;
}
.buttons{
  width: 300px;
  height:30px;
  padding:5px 25px;
  border-radius:5px;
  text-shadow:1px 1px 1px #B2D3C2;
  border:none;

}
.optionButtons{
  margin-top: 10px;
}
.nextButton{
  margin-top: 30px;
  background-color: grey;
}
#section1{
    margin-left: 50px;
}
#section2,#section3{
    margin-left: 90px;
}

.loginForm{
  margin-left: 50px;
}
.error{
  color: #d33c40;
  margin-bottom:0px;
}

</style>
