<template>
  <div class="">
    <h1>Create an Event</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect
        v-model="event.category"
        label="Select a category"
        :options="categories"
      />

      <h3>Names & describe your event</h3>
      <BaseInput
        v-model="event.title"
        type="text"
        label="Title"
        placeholder="Add an event title"
        class="field"
      />

      <BaseInput
        v-model="event.description"
        type="text"
        label="Description"
        placeholder="Add a description"
        class="field"
      />

      <h3>Where is your event?</h3>
      <BaseInput
        v-model="event.location"
        type="text"
        label="Location"
        placeholder="Add a Location"
        class="field"
      />

      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <Datepicker v-model="event.date" placeholder="Select a date" />
      </div>

      <BaseSelect
        v-model="event.time"
        :options="times"
        label="Select a time"
        class="field"
      />
      <input type="submit" class="button -fill-gradient" value="Submit" />
    </form>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import { mapState } from 'vuex';
import NProgress from 'nprogress';

export default {
  name: 'EventCreate',

  components: {
    Datepicker,
  },

  data() {
    const times = [];
    for (let i = 0; i <= 24; i++) {
      times.push(i + ':00');
    }
    return {
      event: this.createFreshEvent(),
      times,
      category: this.$store.state.categories,
    };
  },

  computed: {
    ...mapState(['categories', 'todos']),
  },

  methods: {
    createFreshEvent() {
      const user = this.$store.state.user.user;
      const id = Math.floor(Math.random() * 10000000);
      return {
        id,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: [],
      };
    },
    createEvent() {
      NProgress.start();
      this.$store
        .dispatch('event/createEvent', this.event)
        .then(() => {
          this.$router.push({
            name: 'event-show',
            params: { id: this.event.id },
          });
          this.event = this.createFreshEvent();
        })
        .catch(() => {
          NProgress.done();
        });
    },
  },
};
</script>

<style lang="less" scoped>
.field {
  margin-bottom: 24px;
}
</style>
