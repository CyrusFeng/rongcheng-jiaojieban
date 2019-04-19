<template>
    <div class="wrap" v-if="visible">
        <img src="../assets/zanwushuju.png" alt="">
        <p>Code:{{code}}{{msg}}</p>
        <p>接口名称:{{name}}</p>
    </div>
</template>

<script>
  export default {
    name: "error",
    props:{
      msg:{
        type:String,
        default:'暂无相关数据'
      },
      visible:{
        type:Boolean,
        default:true
      },
      code:{
        type:Number,
        default:0
      },
      name:{
        type:String,
        default:''
      }
    }
  }
</script>

<style scoped>
    .wrap{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background:#f2f6f9;
    }
img{
    width: 2rem;
    height: 2.28rem;
}
    p{
        font-size:0.12rem;
        color:#999999;
    }
</style>