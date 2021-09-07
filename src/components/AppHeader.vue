<template>
  <div class="">
    <button v-if="loggedIn">Logout</button>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',

  data() {
    return {
      loggedIn: false,
    };
  },
};
</script>
