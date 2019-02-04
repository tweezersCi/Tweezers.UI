import Vue from 'vue';
import Router from 'vue-router';

import MultipleItemsView from './components/multiple-item/MultipleItemsView.vue';
import LandingSubView from './components/main-menu/LandingSubView.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'app',
      component: LandingSubView,
    },
    {
      path: '/:item_name',
      name: 'single_item',
      component: MultipleItemsView,
      props: true,
    },
  ],
});

export default router;
