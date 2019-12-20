import Vue from 'vue';
import vuetify from './plugins/vuetify';
import createFilters from './components/filter/filters';


import router from './router';
import store from './store';
import App from './App.vue';
import i18n from './i18n'

createFilters(Vue);

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
