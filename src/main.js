import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import VueLazyLoad from 'vue-lazyload';
import infiniteScroll from 'vue-infinite-scroll';
import './registerServiceWorker'
import './assets/icon/iconfont.css'
import '../public/reset.css'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueLazyLoad,{
    error:require('./assets/logo.jpg'),//图片加载失败时候显示的图片
    loading:require('./assets/imgs/loading.gif')//图片还未加载完成时候的loading图片
});
Vue.use(infiniteScroll);
Vue.filter('currency',function(value){
  if(typeof value =="number"){
    var number=value.toFixed(2);
    return '￥'+number;
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
