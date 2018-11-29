import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/landing',
      name: 'landing-page',
      component: require('@/components/LandingPage').default,
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: require('@/components/welcome').default,
    },
    {
      path: '/home',
      name: 'home',
      component: require('@/components/home').default,
    },
    {
      path: '*',
      redirect: '/home',
    },
  ],
});
