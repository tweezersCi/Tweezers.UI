import Vue from 'vue';
import './plugins/vuetify';
import vueHeadful from 'vue-headful';
import App from './App.vue';
import router from './router';

Vue.component('vue-headful', vueHeadful);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
