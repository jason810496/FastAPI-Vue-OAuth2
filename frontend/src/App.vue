<script setup>
import NavBar from "./components/NavBar.vue";
import Dialog from "./components/Dialog.vue";
import Loading from "./components/Loading.vue";

</script>

<template>
  <div id="app">
    <NavBar />
    <router-view />
    <Loading />
    <Dialog />
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    NavBar,
  },
}
</script>

<style scoped>

</style>
