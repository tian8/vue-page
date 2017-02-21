<template>
  <div class="content-more">
  <NavBar></NavBar>
    <div class="interduce-box">
      <img  src="http://img.dwstatic.com/lol/1512/315331952203/1451378412625.jpg">
      <div class="interduce-box-text">
      <p>菜根谭</p>
      <p>待小人，不难于严，而难于不恶; 待君子，不难于恭，而难于有礼。</p>
      <p>施恩者，内不见己，外不见人，则斗粟可当万钟之惠; 利物者，计己之施，责人之报，虽百镒难成一文之功。</p>
      <p>不责人之小过，不发人阴私，不念人旧恶。三者可以养德，亦可以远害。</p>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from '../components/Nav'
  export default {
    data () {
      return {

      }
    },
    computed: {
    },
    methods: {
    },
    components: {
      NavBar
    }
  }

</script>
<style>

  .content-more{
    position: fixed;
    top:0;
    width:100%;
    height:100%;
    background-image: url("http://ofyaji162.bkt.clouddn.com/bg2.jpg");
    background-position: 50%;
    background-size: cover;
  }
  .interduce-box{
    position:absolute;
    left: 50%;
    top:50%;
    width:620px;
    height:540px;
    margin-top:-280px;
    margin-left:-250px;
    background-color:rgb(255,255,255) ;
    border-radius: 10px;
    animation: mBox 0.5s ease-out 1 ;
  }
  .interduce-box img{
    width:620px;
    height:300px;
    border-radius: 10px;
  }
  .interduce-box-text{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding:0 20px ;

  }
  @keyframes mBox {
    0% {
      opacity: 0;
      transform: translate3d(-10px, 0, 0);
    }
    25% {
      transform: translate3d(10px, 0, 0);
    }
    50% {
      transform: translate3d(-10px, 0, 0);
    }
    75% {
      transform: translate3d(10px, 0, 0);
    }
    100% {
      opacity: 1;
    }
  }
</style>
