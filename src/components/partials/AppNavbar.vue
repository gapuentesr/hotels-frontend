<template>
  <nav class="bg-[#155D76] text-white p-4">
    <div class="container mx-auto flex justify-between items-center">
      <div class="text-lg font-bold">
        <router-link to="/" class="hover:text-gray-400">
          <img src="logo.png" alt="Logo Decameron" class="object-cover h-11" />
        </router-link>
      </div>
      <div class="flex space-x-4">
        <p> | </p>
        <router-link to="/" class="hover:text-gray-400 font-semibold">Agregar Hotel</router-link>
        <p> | </p>
        <router-link to="/hotels" class="hover:text-gray-400 font-semibold">Listado de Hoteles</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppNavbar'
}
</script>

<style scoped>
/* Agrega estilos adicionales si es necesario */
</style>
