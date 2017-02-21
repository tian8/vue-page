<template>
  <div class="movies-box">
    <NavBar></NavBar>
    <div class="movies-bar">
      <p>豆瓣电影TOP50</p>
    </div>
    <div class="movies-grid">
      <div class="movie-item" v-for="movie in lists" :data-postid="movie.id" @click="introduceMovie(movie,movie.id)">
        <div class="movie-title "><p>{{movie.title}}</p></div>
        <img :src="movie.images.large" class="movie-image">
        <div class="movie-message">
          <p>评分:<span>{{movie.rating.average}}</span></p>
          <p>导演:<span v-for="person in movie.directors">{{person.name}}</span></p>
          <p>演员:<span v-for="person in movie.casts">{{person.name}}</span></p>
          <p>原名:<span>{{movie.original_title}}</span></p>
          <p>类型:<span v-for="genre in movie.genres">{{genre}}</span></p>
          <p>年代:<span>{{movie.year}}</span></p>
        </div>
      </div>
    </div>
    <button
      class="add-more btn"
      @click="goNext()"
      v-if="loading">
      <i>点击加载更多....</i>
    </button>
    <button class="add-more btn disabled" v-else>加载中<i class="iconfont icon-loading i-loading"></i></button>

    <div class="movie-background" v-if="introduce" @click="closeMovie">
      <div class="movie-introduce">
        <div class="movie-top">
          <p>电影详情</p>
        </div>
        <p class="movie-center"><span>{{movie.title}}({{movie.original_title}})</span></p>
        <div>
          <div class="movie-left">
            <img :src="movie.images.large">
          </div>
          <div class="movie-right">
            <p>评分:<span>{{movie.rating.average}}</span></p>
            <p>导演:<span v-for="person in movie.directors">{{person.name}}</span></p>
            <p>演员:<span v-for="person in movie.casts">{{person.name}}</span></p>
            <p>原名:<span>{{movie.original_title}}</span></p>
            <p>类型:<span v-for="genre in movie.genres">{{genre}}</span></p>
            <p>年代:<span>{{movie.year}}</span></p>
            <p>简介:<span>{{movie.summary}}</span></p>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import NavBar from '../components/Nav'
  export default {
    data () {
      return {
        lists: [],
        loading: false,
        movie: {},
        introduce: false,
      }
    },
    computed: {},
    methods: {
      introduceMovie(movie, id){
        this.$http.jsonp('https://api.douban.com/v2/movie/subject/' + id).then((res) => {
          this.movie = JSON.parse(res.bodyText);
          this.introduce = true;
        });

      },
      closeMovie(event){
        if (event.target.className == 'movie-background') {
          this.introduce = false;
        }
      },
      goNext(event){
        let local = window.localStorage.getItem('movies');
        let length = JSON.parse(local).subjects.length;
        this.getMovie(length);
      },
      getMovie(count){


        console.log(count);
        this.$http.jsonp('https://api.douban.com/v2/movie/top250?start= ' + count).then((res) => {
          let local = window.localStorage.getItem('movies');
          let moviesData;
          if (local) {
            moviesData = JSON.parse(local);
            moviesData.subjects = moviesData.subjects.concat(JSON.parse(res.bodyText).subjects);
            moviesData = JSON.stringify(moviesData);
            window.localStorage.setItem('movies', moviesData);
            this.lists = JSON.parse(moviesData).subjects;
            this.loading = true;
          } else {
            moviesData = res.bodyText;
            window.localStorage.setItem('movies', moviesData)
            this.lists = JSON.parse(moviesData).subjects;
            this.loading = true;
          }
        });
      }
    },
    components: {
      NavBar
    },
    mounted(){
      let me = this;
      let local = window.localStorage.getItem('movies');
      if (local) {
        this.lists = JSON.parse(local).subjects;
        this.loading = true;
      } else {
        this.getMovie();
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .btn {
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    padding: 9px 15px;
    font-size: 14px;
    border-radius: 4px;
    color: #fff;
    background-color: #50bfff;
    border-color: #50bfff;
    &:hover {
      opacity: 0.8
    }
    i.i-loading {
      position: absolute;
      padding: -2px;
      -webkit-animation: loading 2s linear infinite;
      animation: loading 2s linear infinite;
    }
    @keyframes loading {
      0% {
        transform: rotateZ(0)
      }

      100% {
        transform: rotateZ(360deg)
      }
    }
  }

  .movies-box {
    position: fixed;
    top: 0;
    left: 250px;
    width: 100%;
    height: 100%;
    overflow: auto
  }

  .movies-bar {
    width: 85%;
    height: 100px;
    background-color: #e3ebec;
    border-radius: 50px;
    border: 1px solid gray;
    margin-top: 20px;
  }

  .movies-bar p {
    color: #37a;
    font-size: 36px;
    font-weight: bold;
    text-align: center;
  }

  .movies-grid {
    width: 86%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 20px;
    margin-left: 20px;

  }

  .movie-item {
    position: relative;
    display: inline-block;
    width: 300px;
    height: 430px;
    margin: 20px;
    /*border: 1px solid darkgray;*/
    border-radius: 5px;
    overflow: hidden;

    .movie-title {
      position: absolute;
      top: 0;
      width: 100%;
      height: 50px;
      background: rgba(0, 0, 0, 0.4);

    }
    .movie-title p {
      font-size: 24px;
      font-weight: 600;
      color: white;
      text-align: center;
    }
    .movie-image {
      width: 100%;
      height: 100%;
    }
    .movie-message {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      background: rgba(0, 0, 0, 0.8);
      transition: 0.3s all ease-out;
      transform: translate(0, 100px);
      opacity: 0.8;
    }
    .movie-message p {
      font-size: 14px;
      color: white;
    }
    &:hover {
      box-shadow: 10px 10px 5px #888888;;
      cursor: pointer;
      transition: 0.5s all ease-out;

      .movie-message {

        transform: translate(0, 0);

      }
    }
  }

  .movie-background {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);

    .movie-introduce {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 800px;
      height: 700px;
      margin-top: -320px;
      margin-left: -500px;
      background-color: white;
      border-radius: 5px;
      animation: introduce 0.5s ease-out 1;

      @keyframes introduce {
        0% {
          transform: scale(0, 0);
        }
        25% {
          transform: scale(0.25, 0.25)
        }
        50% {
          transform: scale(0.5, 0.5)
        }
        75% {
          transform: scale(0.75, 0.75)
        }
        100% {
          transform: scale(1, 1)
        }

      }

      .movie-top {
        position: absolute;
        top: 0;
        width: 100%;
        height: 40px;
        border-bottom: 1px solid gray;
        p {
          text-align: center;
        }
      }
      .movie-center {
        font-size: 24px;
        text-align: center;
        line-height: 60px;
      }
      .movie-left {
        position: absolute;
        top: 100px;
        left: 0;
        width: 200px;
        height: 500px;
        img {
          width: 180px;
          height: 260px;
          margin: 20px;
        }
      }
      .movie-right {
        position: absolute;
        top: 100px;
        left: 240px;
        width: 540px;
        height: 600px;
        padding-right: 20px;
        padding-bottom: 30px;
        p {
          font-size: 18px;
        }
      }

    }

  }

  .add-more {
    display: block;
    margin: 10px auto 50px;
    width: 200px;
    cursor: pointer;
  }


</style>
