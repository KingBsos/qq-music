import Vue from 'vue'
import PortalVue from 'portal-vue';
import App from './App.vue'
import router from './router.js';
import store from './store.js';
import './mock.js';

Vue.use(PortalVue);
//Vue.config.productionTip = false
Vue.config.errorHandler = function (err, vm, txt) {
  console.log(err);
  console.log(vm);
  console.log(txt);
}
Vue.component('CustomTransition', {
  functional: true,
  render(h, context) {
    return h(
      "transition",
      {
        props: {name: "sidebar", mode: 'out-in'}
      },
      context.children
    );
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
