import Vue from 'vue';
import Router from 'vue-router';
import EventList from '@/views/EventList.vue';
import EventShow from '@/views/EventShow.vue';
import EventCreate from '@/views/EventCreate.vue';
import NotFound from '@/views/NotFound.vue';
import NProgress from 'nprogress';
import store from '@/store/store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventList,
      props: true,
      beforeEnter(to, from, next) {
        const currentPage = parseInt(to.query.page || 1);
        store
          .dispatch('event/fetchEvents', {
            page: currentPage,
          })
          .then(() => {
            to.params.page = currentPage;
            next();
          });
      },
    },
    {
      path: '/event/create',
      name: 'event-create',
      component: EventCreate,
    },
    {
      path: '/event/:id',
      name: 'event-show',
      component: EventShow,
      props: true,
      beforeEnter(to, from, next) {
        store.dispatch('event/fetchEvent', to.params.id).then(event => {
          to.params.event = event;
          next();
        });
      },
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFound,
    },
  ],
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
