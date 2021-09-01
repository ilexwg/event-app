import Vue from 'vue';
import Router from 'vue-router';
import EventList from '@/views/EventList.vue';
import EventShow from '@/views/EventShow.vue';
import EventCreate from '@/views/EventCreate.vue';
import NotFound from '@/views/NotFound.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventList,
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
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFound,
    },
  ],
});
