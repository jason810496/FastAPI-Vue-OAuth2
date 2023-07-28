<script setup>
import NavBar from "./components/NavBar.vue";
</script>

<template>
  <div id="app">
    <NavBar />
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
    components: {
      NavBar
    },
}
</script>

<style scoped>

</style>
