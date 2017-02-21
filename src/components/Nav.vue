<template>
    <div  class="nav-view">
      <img :src='avator' class="nav-avator">
      <span class="nav-name" >zhangxin</span>
        <ul  class="menus">
              <li v-for="menu in menus">
                <router-link :to="{path: menu.name}" >
                <i :class="menu.icon" class="iconfont "></i>
                <span>{{menu.text}}</span>
                </router-link>
              </li>

        </ul>

    </div>
</template>

<script>
  import state from '../vuex/states'
export default {
    data(){
          return{

          }
    },
  computed:{
      avator(){
          return state.avator;
      },
      menus () {
          return state.menus;
      },
    },
  methods:{
  },
}
</script>
<style >
  .nav-view{
    width:250px;
    height:100%;
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #202020;
    z-index: 1000;
  }
  .nav-avator{
      width:120px;
      height:120px;
      border-radius: 60px;
      margin-top:80px ;
      /*transform: rotate(360);*/
  }
  .nav-avator:hover{
      transition: transform 6s ease-out;
      -webkit-transform: rotate3d(0, 0, 1, 360deg);
      transform: rotate3d(0, 0, 1, 360deg);
  }
  .nav-name{
    margin: 20px;
    font-size: 24px;
    color:white;
  }
  .menus {
    margin: 0;
    padding: 0;}
  li{
    position: relative;
    display: block;
    width: 250px;
    height: 45px;
    line-height: 45px;
    font-size: 24px;
    overflow: hidden;
  }
  li i {
    display: inline-block;
    font-size: 24px;
    width: 25px;
    text-align: center;
    margin-right: 18px;
  }
  li a{
    display: block;
    padding-left:50px;
    color: #999;
    text-decoration: none;
  }
   a:hover{
    color: rgba(255,255,255,0.8);
  }
</style>
