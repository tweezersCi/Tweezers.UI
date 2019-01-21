import Vue from 'vue';
import Router from 'vue-router';

import TweezersMultipleItems from './components/multiple-item/TweezersMultipleItems.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'app',
      component: null,
    },
    {
      path: '/:item_name',
      name: 'single_item',
      component: TweezersMultipleItems,
      props: true,
    },
  ],
});

export default router;
