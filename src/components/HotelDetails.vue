<template>
  <div class="container mx-auto px-4 py-2">
    <div class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-xl">
      <div v-if="hotel">
        <h1 class="text-2xl font-bold mb-4 text-center">{{ hotel.name }}</h1>
        <p class="text-xl font-bold mb-4 text-center"> </p>
        <h2 class="text-sm font-bold my-6 text-left uppercase">Información general</h2>
        <div class="flex justify-center">
          <table class="">
            <tbody class="bg-white divide-y divide-gray-200">
              <tr>
                <td class="w-36 px-6 py-4 text-sm font-medium text-gray-900">Dirección:</td>
                <td class="px-6 py-4 text-left text-sm text-gray-500">{{ hotel.address }}</td>
              </tr>
              <tr>
                <td class="w-36 px-6 py-4 text-sm font-medium text-gray-900">Ciudad:</td>
                <td class="px-6 py-4 text-left text-sm text-gray-500">{{ hotel.city }}</td>
              </tr>
              <tr>
                <td class="w-36 px-6 py-4 text-sm font-medium text-gray-900">NIT:</td>
                <td class="px-6 py-4 text-left text-sm text-gray-500">{{ hotel.nit }}</td>
              </tr>
              <tr>
                <td class="w-36 px-6 py-4 text-sm font-medium text-gray-900">Habitaciones:</td>
                <td class="px-6 py-4 text-left text-sm text-gray-500">{{ hotel.number_of_rooms }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 class="text-sm font-bold my-6 text-left uppercase">Tipos de habitaciones</h2>

        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
              <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Acomodación</th>
              <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="roomType in roomTypes" :key="roomType.id">
              <td class="px-6 py-4 text-center text-sm font-medium text-gray-900">{{ roomType.type }}</td>
              <td class="px-6 py-4 text-center text-sm text-gray-500">{{ roomType.accommodation }}</td>
              <td class="px-6 py-4 text-center text-sm text-gray-500">{{ roomType.quantity }}</td>
            </tr>
          </tbody>
        </table>
        <hr class="border-t border-gray-200 my-4">
        <div class="text-center">
            <router-link :to="'/room-types/create/' + hotel.id">
              <button type="submit" 
                      class="bg-[#155D76] text-white text-sm py-2 px-2 rounded-md hover:bg-gray-600 font-medium">
                      Asignar habitaciones
              </button>
            </router-link>
          </div>
      </div>
    </div>
  </div>

  <div>
    
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      hotel: null,
      roomTypes: [],
    };
  },
  methods: {
    async fetchHotel() {
      try {
        const response = await axios.get(`http://localhost:8000/api/hotels/${this.$route.params.id}`);
        this.hotel = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchRoomTypes() {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/hotels/${this.$route.params.id}/room-types`);
        this.roomTypes = response.data;
      } catch (error) {
        console.error('Error fetching room types:', error);
      }
    },
    async deleteHotel() {
      try {
        await axios.delete(`http://localhost:8000/api/hotels/${this.$route.params.id}`);
        this.$router.push('/hotels');
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.fetchHotel();
  },
  mounted() {
    this.fetchRoomTypes();
  },
};
</script>