import Vue from 'vue'
import PortalVue from 'portal-vue';
import App from './App.vue'
import router from './router';
import store from './store';
import './mockData';
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';

Vue.use(PortalVue);
Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
