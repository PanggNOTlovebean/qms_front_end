<template>
 <div class="main">
  <div class="bg">
    </div>
    <div class="wrapper">
        <div class="l1">
          试题库管理系统
        </div>
        <hr>

        <div class="username-wrapper">
           <Icon type="md-person" size="24"/>
          <Input v-model="username" placeholder="Enter your username..." size="large" clearable style="width: 220px " />
        </div>

        <div>
          <Icon type="ios-unlock" size="24"/>
          <Input v-model="password" type="password" placeholder="Enter your password..." size="large" clearable style="width: 220px" />
        </div>
      
        <a class="forget">Forgot your password?</a>

        <div class="bt-container">
          <button class="bt-login" @click="loginCheck()">登陆</button>
        </div> 

    </div>
 </div>
</template>

<script type="text/ecmascript-6">
 export default {
   data () {
     return {
      username:"",
      password:""
     }
   },
   components: {

   },
   methods:{
     loginCheck(){
       
      // console.log(this.username);
      // console.log(this.password);
      //登陆验证
      this.$router.push("Manager")
     }
   }
 }
</script>

<style scoped>
    .main{
      text-align: center
    }
    .username-wrapper{
      margin-top: 30px;
      margin-bottom: 30px
    }

    .bg{
      width:100%;
      height:100%;
      position: absolute;
      left: 0px;
      top:0px;
      background:url("library.jpg");
      background-size:cover;
      filter: blur(5px);
      z-index: -1;
    }
    .wrapper{
      display:inline-block;
      border-radius: 5px;
      padding:20px;
      margin-top: 12%;
      background-color: white;
      color: black;
    }
    .l1{
      text-align: left;
      font-size: 25px;
    }
    hr{
      margin-top: 10px;
      margin-bottom: 10px;
    }
    input{
      display: block;
      margin-top: 30px;
      width:280px;
      height: 50px;
      font-size:20px;
    }
    .forget{
      display: block;
      text-align: left;
      color: #2196F3;
    }
    a:hover{
      cursor: pointer;
    }
    .bt-container{
      margin:20px -20px -20px -20px;
      height:50px;
      cursor: pointer;
    }
    .bt-login{
      border:0px;
      width: 100%;
      height: 100%;
      background-color: lightblue;
      cursor: pointer;
    }

</style>
