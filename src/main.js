// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
import axios from 'axios'


axios.defaults.withCredentials = true
axios.defaults.crossDomain = false

Vue.prototype.$axios = axios; 
Vue.prototype.$host='http://127.0.0.1:8080/pet-adoption/'; 
Vue.config.productionTip = false
Vue.use(ViewUI)
Vue.prototype.formatDate = function (date) {
  function padDate(value){
      return value<10? '0'+value:value;
  }
  if(date === null){
    date = new Date();
  }
  var year = date.getFullYear();
  var month = padDate(date.getMonth() + 1);
  var hours = padDate(date.getHours());
  var minutes = padDate(date.getMinutes());
  var seconds = padDate(date.getSeconds());
  return year + '-' + month + '-' +date.getDate()+' '+ hours + ':' + minutes + ':' + seconds;
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
