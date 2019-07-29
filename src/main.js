import Vue from 'vue';
import vuetify from './plugins/vuetify';
import createFilters from './components/filter/filters';


import router from './router';
import store from './store';
import App from './App.vue';

createFilters(Vue);

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
