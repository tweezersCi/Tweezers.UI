import Vue from 'vue';
import './plugins/vuetify';
import vueHeadful from 'vue-headful';
import SvgIcon from 'vue-svgicon';
import App from './App.vue';
import router from './router';
import TweezIcon from './infra/TweezIcon';

Vue.component('vue-headful', vueHeadful);
Vue.use(SvgIcon, {
  tagName: 'svg-icon',
});
Vue.config.productionTip = false;

TweezIcon.ImportIcon();

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
