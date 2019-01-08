<template>
  <header class="top">
      <div class="wrap">
            <div class="logo"><img v-bind:src="message.logo" :alt="message.title" :title="message.title">
                <h1>{{message.title}}</h1>
            </div>
            <div class="nav">
                <ul>
                    <li>
                        <router-link to="/">首页</router-link>
                    </li>
                    <li>
                        <router-link to="/newPost">发布新闻</router-link>
                    </li>
                </ul>
            </div>
      </div>
  </header>
</template>
<script>
    export default {
        name: 'top',
        //父亲组件index.vue 传到Top.vue
        props:{
            message:Object
        }
    }

</script>

<style scoped>
    .top{ 
        background: #000;
        height: 50px;
        width: 100%;
        color:#fff;
        position: fixed;
        top: 0;
        z-index: 3;
    }
    .top>.wrap{
        width: 100%;
        display: flex;
        justify-content:space-between;
        margin:0 auto;
        height: 50px;
    }
    .logo{
        width: 25%;
        position: relative;
    }
    .logo h1{
        position: absolute;
        left:60px;
        top:0;
        line-height: 50px;
        font-size:18px
    }
    .logo img{
        position: absolute;
        left:0;top:5px;
        height:40px;
    }
    .nav{
        width: 75%;
    }
    .nav ul{
        display: flex;
        justify-content: flex-end;
    }
    .nav ul li{
        line-height: 50px;
        font-size:15px;
        margin-left:15px;
    }
    .nav ul li a{
        color:#fff;
        display:inline-block;
        padding:0 15px;
        text-align: center;
    } 
</style>