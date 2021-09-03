<template>
  <div class="">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
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
import { mapState } from 'vuex';

export default {
  name: 'EventList',

  components: {
    EventCard,
  },

  computed: {
    ...mapState(['events', 'eventsTotal']),
    page() {
      return parseInt(this.$route.query.page) || 1;
    },
    hasNextPage() {
      return this.eventsTotal > this.page * this.perPage;
    },
  },

  created() {
    this.perPage = 3;

    this.$store.dispatch('fetchEvents', {
      perPage: this.perPage,
      page: this.page,
    });
  },
};
</script>

<style lang="less" scoped>
</style>
