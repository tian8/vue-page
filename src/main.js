// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
//components
import App from './components/App'
//views
import Category from './views/Category'
import Face from './views/Face'
import Story from './views/Story'
import News from './views/News'
import Video from './views/Video'
import Movies from './views/Movies'
import Photo from './views/Photo'
import Music from './views/Music'

Vue.use(Router);
Vue.use(Resource);

var router = new Router({
    routes:[
      {path:'/',component:Category},
      {path:'/story',component:Story},
      {path:'/music',component:Music},
      {path:'/news',component:News},
      {path:'/movies',component:Movies},
      {path:'/video',component:Video},
      {path:'/face',component:Face},
      {path:'/category',component:Category},
      {path:'/photo',component:Photo},
    ]
});
new Vue({
  router,
  ...App,
}).$mount("#app");
