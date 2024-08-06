<template>
  <div class="container mx-auto px-4 py-2">
    <div class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <div class="flex justify-between">
        <div class="flex-grow text-center">
          <h1 class="text-2xl font-bold">Listado de Hoteles</h1>
        </div>
        <button @click="fetchHotels" 
                class="bg-[#155D76] text-white text-xs py-1 px-1 rounded-md hover:bg-gray-600 font-semibold">
                Actualizar lista
        </button>
      </div>
      <table class="min-w-full mt-4 divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th class="px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">Habitaciones</th>
              <th class="px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="hotel in hotels" :key="hotel.id" class="mb-2 p-4">
              <td class="px-6 py-4 text-center text-sm font-medium">
                <router-link :to="'/hotels/' + hotel.id" class="text-blue-500 hover:underline">
                  {{ hotel.name }}
                </router-link>
              </td>
              <td class="px-6 py-4 text-center text-sm font-medium">
                {{ hotel.number_of_rooms }}
              </td>
              <td class="px-6 py-4 text-center text-sm font-medium">
                <router-link :to="'/room-types/create/' + hotel.id">
                  <button type="submit" 
                          class="bg-[#155D76] text-white text-sm py-1 px-1 rounded-md hover:bg-gray-600 font-medium">
                          Asignar habitaciones
                  </button>
                </router-link>
              </td>
            </tr>
            <tr v-for="roomType in roomTypes" :key="roomType.id">
              <td class="px-6 py-4 text-center text-sm font-medium text-gray-900">{{ roomType.type }}</td>
              <td class="px-6 py-4 text-center text-sm text-gray-500">{{ roomType.accommodation }}</td>
              <td class="px-6 py-4 text-center text-sm text-gray-500">{{ roomType.quantity }}</td>
            </tr>
          </tbody>
        </table>
      <ul class="mt-4">
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      hotels: [],
    };
  },
  methods: {
    async fetchHotels() {
      try {
        const response = await axios.get('http://localhost:8000/api/hotels');
        this.hotels = response.data;
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    },
  },
  created() {
    this.fetchHotels();
  },
};
</script>

<style scoped>
/* Agrega estilos adicionales si es necesario */
</style>