<template>
  <div class="">
    <h1>404 Not Found</h1>
    <router-link :to="{ name: 'event-list' }">Back to Home page</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>

<style lang="less" scoped>
</style>
