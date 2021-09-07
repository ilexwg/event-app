<template>
  <div>
    <h1>{{ comment | reply('bro') | shout | exclaim }}</h1>
    <form @submit.prevent="submit">
      <input
        type="email"
        v-model.trim="email"
        placeholder="What's your email"
        @blur="$v.email.$touch()"
        :class="{ error: $v.email.$error }"
      />
      <div v-if="$v.email.$error">
        <p v-if="!$v.email.email" class="errorMessage">
          Please enter a valid email address.
        </p>
        <p v-if="!$v.email.required" class="errorMessage">Email is required</p>
      </div>
      <button type="submit" :disabled="$v.$invalid">Submit</button>
      <p v-if="$v.$anyError" class="errorMessage">
        Please fill out the required field(s).
      </p>
    </form>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import { exampleMixin } from '@/mixins/exampleMixin.js';

export default {
  name: 'Example',

  mixins: [exampleMixin],

  data() {
    return {
      email: null,
      message: 'I take priority',
      comment: 'no one cares',
    };
  },

  validations: {
    email: {
      required,
      email,
    },
  },

  filters: {
    shout(comment) {
      return comment.toUpperCase();
    },
    exclaim(comment) {
      return comment + '!!!';
    },
    reply(comment, name) {
      return comment + ', ' + name;
    },
  },

  created() {
    console.log('Hey from the component', '👀');
  },

  methods: {
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        console.log('Form Submission: ', this.email);
      }
    },
    logMessage() {
      console.log('Log from component', '👀');
    },
  },
};
</script>
