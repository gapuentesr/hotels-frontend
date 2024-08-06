<template>
  <div id="app" class="flex flex-col min-h-screen">
    <AppNavbar />
    <main class="p-4 flex-grow">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppNavbar from './components/partials/AppNavbar.vue';
import AppFooter from './components/partials/AppFooter.vue';

export default {
  name: 'App',
  components: {
    AppNavbar,
    AppFooter
  },
  mounted() {
    document.title = 'Hoteles Decameron';
  }
}
</script>

<style>

</style>
