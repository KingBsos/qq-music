import Vue from 'vue'
import PortalVue from 'portal-vue';
import App from './App.vue'
import router from './router';
import store from './store';
import './mock.js';

Vue.use(PortalVue);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
