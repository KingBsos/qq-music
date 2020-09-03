import Vue from 'vue'
import App from './App.vue'
import router from './router.js';
import store from './store.js';
import './mock.js';

//Vue.config.productionTip = false
Vue.config.errorHandler = function (err, vm, txt) {
  console.log(err);
  console.log(vm);
  console.log(txt);
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
