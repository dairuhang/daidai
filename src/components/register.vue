<template>
    <div class="register">
        <div class="container">
            <form id="register">
                <h1>新用户注册<small>哈哈哈</small></h1>
                <label class="avatarbox">
                    <div class="avatar">
                        <input type="file" @change="upload($event)">
                        <img :src="baseData.src" width="100" height="100">
                        <input type="hidden" v-model="baseData.src">
                    </div>
                </label>
                <label for="">
                    <input type="text" v-model="info.name" name="username" id="username" placeholder="请输入您的帐号">
                </label>
                <label for="">
                    <input type="password" v-model="info.password" name="password" id="password" placeholder="请输入您的密码">
                </label>
                <label for="" class="success"></label>
                <label for="">
                    <button type="button" @click='register'>新用户注册</button>
                </label>
            </form>
        </div>
    </div>
</template>

<script>

import qs from 'qs'

export default {
    name: 'register',
    data(){
        return{
            info:{
                name:"",
                password:""
            },
            baseData:{
                src:""   //require("../assets/logo.png")
            }
        }
    },
    methods:{   
        upload(e){
            var that = this;
                console.log(that,this)
            var file = e.target.files[0];
                console.log(file)
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(){
               that.baseData.base = e.target.result;
               that.baseData.src = reader.result;
            //    alert(that.baseData.src)
           }
       },
        register(){
            let userData = {
                userAvatar:this.baseData.src,
                username:this.info.name,
                password:this.info.password,
                send:1
            }
            let uD = qs.stringify(userData);
            this.axios.post('http://dairuhang.gz01.bdysite.com/api/registerSave.php',uD)
                .then((res) =>{ console.log(res.data.message),this.$router.push("/Login")})
                .catch(function (error){console.log(error)})  
        },
        // created(){
        //     this.register();
        // },
    }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    *{
    margin:0;
    padding:0;
    /*transition: all 600ms;*/
}
a{
    text-decoration: none;
    color:#333;
}
a:focus,
a:hover{
   color:#0c8b21;
} 

body{
    background: #f1f1f1;
    font-family: "寰蒋闆呴粦",Arial, Helvetica, sans-serif;
}
ul,ol{
    list-style: none;
}

#app{
    height: 100vh;
    width:100%;
    font-size:.5625rem;
}

header,footer{
    position: fixed;
    z-index: 9999;
    left:0;
    right:0;
    width:100vw;
}

header{
    top:0;
    background: #0c8b21;
    height:3.125rem;
    line-height: 3.125rem;
}

header ul{
    display: flex;
    width:96%;
    margin:0 auto;
    justify-content: space-between;
}
header ul .logo a{
    font-size:1rem;
    color:#fff;
}

header ul li .icon-search{
    font-size: 6vw;
    color:#fff;
}

.chatList{
    height:auto;
    padding:3.125rem 0;
}

.chatList ul{
    width:100%;
    margin:0 auto;
    display: flex;
    flex-flow:column;
    justify-content: space-between;
}
.chatList ul li{
   display: flex;
   justify-content: space-between;
   height:auto;
   min-height: 8vh;
   overflow: hidden;
   padding:.46875rem .3125rem;
   border-bottom:1px solid #d7d7d7;
}

.chatList ul li .firstName{
    width:12vw;
    height:100%;
    min-height: 2.5rem;
    background: #222;
    color:#fff;
    line-height:2.5rem;
    text-align: center;
    font-size:1.5rem;
    border-radius: .3125rem;
    margin-right:.46875rem;
}

.chatList ul li h4{
    width:80vw;
   font-size: .85rem;
   line-height: .875rem;
   position: relative;
}
.chatList ul li h4 .createDate{
   position: absolute;
   right:0;
   top:0;
   font-size: 70%;
   color:rgb(201, 201, 201);
   font-weight: normal;
}
.chatList ul li h4 small{
   display: block;
   color:#666;
   margin-top:0.4rem;
   font-weight: normal;
   font-size: 70%;
}


footer{
    height:3.125rem;
    background: #d7d7d7;
    bottom:0;
    border-top:1px solid #ddd;
}

footer ul{
    display:flex;
    justify-content: space-between;
}

footer ul li{
    width:50%;
    padding:.3125rem 0;
    text-align:center;
}



footer ul li a{
    display: block;
}
footer ul li a i,
footer ul li a span{
    display: block;
}
footer ul li a i {
    margin-bottom:.46875rem;
    font-size: 1rem;
}

footer ul li a span{
    font-size: 0.85rem;
}

footer ul .active a{
    color:#0c8b21;
}


/* 鐧婚檰椤甸潰 login */
.container{
   width:100%;
   margin-top:20vh;
}

.container form{
    width:70%;
    margin: 0 auto;
}
.container form h1{
    font-size: 1.2rem;
    margin-bottom:.625rem;
}
.container form h1 small{
    font-weight: normal;
    padding:0 .46875rem;
    color:#666;
    font-size: 75%;
}
.container form label{
   display: block;
   margin-bottom:.5rem;
}

.container form label input{
    height:2.5rem;
    width:100%;
    border-radius: .15625rem;
    border:none;
    text-indent: 1em;
    outline: none;
}

.container form label button{
    background: #0c8b21;
    width:50%;
    height:2.5rem;
    border:none;
    border-radius: .15625rem;
    margin:.8rem auto;
    display: block;
    color:#fff;
    font-size: 1rem;
}

.container form label#success{
   height:.15625rem;
   font-size: 0.75rem;
   text-align: center;
   padding:.3125rem 0;
}


#register {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    width:70%;
    margin:15% auto 0;
 }
 
 #register h1{
     font-size: 1.3rem;
     margin-bottom:1rem
 }
 #register h1 small{
     font-weight: normal;
     font-size: 55%;
 }
 
 #register label{
     width:80%;
 }
 
 #register label input{
     margin:.5rem 0;
     width:100%;
     height:2.03125rem;
     padding:0 .46875rem;
     border:none;
     outline: none;
     border-radius: .15625rem;
     background: #fff;
 }
 
 #register label button{
     border-radius: .15625rem;
     background: #0c8b21;
     padding:.7rem 1.2rem;
     border:none;
     color: #fff;
     display: block;
     margin:0 auto;
 }
 
 #register  .success{
     color:red;
     text-align: center;
     padding:.125rem;
 }
</style>