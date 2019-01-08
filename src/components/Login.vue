<template>
    <div class="Login">
        <div class="container">
            <form>
                  <h1>用户登陆<small></small></h1>
                  <label for="" class="srk">
                      <input type="text" v-model="info.name" name="username" placeholder="请输入您的帐号">
                  </label>
                  <label for="" class="srk">
                      <input type="password" v-model="info.password" name="password" placeholder="请输入您的密码">
                  </label>
                  <label for="" id="success"></label>
                  <label for="" class="u">
                      <button type="button" @click="login">登陆</button>
                      <button @click="register">注册</button>
                  </label>
            </form>
        </div>
    </div>
</template>

<script>

import qs from 'qs'
import { getCookie, setCookie } from 'tiny-cookie'

export default {
  name: 'Login',
  data(){
      return{
          info:{
                name:"",
                password:"",
                userId:""
            }
      }
  },
  created(){
   
  },
  methods:{
        register(){
            this.$router.push("/register")
        },
        login(){
            let userData = {
                username:this.info.name,
                password:this.info.password,
                send:1
            }
            let uD = qs.stringify(userData); 
            this.axios.post('http://dairuhang.gz01.bdysite.com/api/loginSave.php',uD).then((res)=>{
                console.log(res.data)
                if(res.data.valid){
                     this.$router.push({path:"/"})
                }else{
                    alert("错误")
                }
            })
            
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
    margin: auto;
    color:  blueviolet; 
}
.container>form>h1{
    text-align: center;
    margin-top: 50px;
}
.container>form{
    text-align: center;
    line-height: 30px;
}
.container>form>label{
    margin: auto;
    display: block;
}
.srk>input{
    width: 600px;
    height: 60px;
    margin-top: 30px;
    border-radius: 5px; 
}
.u>button{
    margin-top: 30px;
    width: 110px;
    height: 50px;
    border-radius: 5px; 
    border: 1px solid #fff;
}
</style>