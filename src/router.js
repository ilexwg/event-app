import Vue from 'vue';
import Router from 'vue-router';
import EventList from '@/views/EventList.vue';
import EventShow from '@/views/EventShow.vue';
import EventCreate from '@/views/EventCreate.vue';
import NotFound from '@/views/NotFound.vue';
import NetworkIssue from '@/views/NetworkIssue.vue';
import NProgress from 'nprogress';
import store from '@/store/store';
import Example from '@/views/Example.vue';

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
        store
          .dispatch('event/fetchEvent', to.params.id)
          .then(event => {
            to.params.event = event;
            next();
          })
          .catch(error => {
            if (error.response && error.response.status === 404) {
              next({
                name: '404',
                params: { resource: 'event' },
              });
            } else {
              next({
                name: 'network-issue',
              });
            }
          });
      },
    },
    {
      path: '/example',
      name: 'example',
      component: Example,
    },
    {
      path: '/404',
      name: '404',
      component: NotFound,
      props: true,
    },
    {
      path: '/network-issue',
      name: 'network-issue',
      component: NetworkIssue,
    },
    {
      path: '*',
      redirect: { name: '404', params: { resource: 'page' } },
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
