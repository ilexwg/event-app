<template>
  <div class="">
    <h1>Events for {{ user.user.name }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <template v-if="page !== 1">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
      >
        Prev Page
      </router-link>
      <template v-if="hasNextPage"> | </template>
    </template>
    <router-link
      v-if="hasNextPage"
      :to="{ name: 'event-list', query: { page: page + 1 } }"
      rel="next"
    >
      Next Page
    </router-link>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'EventList',

  components: {
    EventCard,
  },

  computed: {
    ...mapState(['user', 'event']),
    page() {
      return parseInt(this.$route.query.page) || 1;
    },
    hasNextPage() {
      return this.event.eventsTotal > this.page * this.perPage;
    },
  },

  created() {
    this.perPage = 3;

    this.fetchEvents({
      perPage: this.perPage,
      page: this.page,
    });
  },

  methods: {
    ...mapActions('event', ['fetchEvents']),
  },
};
</script>

<style lang="less" scoped>
</style>
