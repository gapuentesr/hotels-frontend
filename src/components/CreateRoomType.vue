<template>
  <div class="container mx-auto px-4 py-2">
    <div class="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-xl">
      <div class="my-4 text-center" v-if="hotel">
        <h1 class="text-2xl font-bold">Hotel: {{ hotel.name }}</h1>
        <p class="text-lg text-gray-600">{{ hotel.number_of_rooms }} Habitaciones</p>
        <hr class="border-t border-gray-300 my-4">
      </div>
      <h2 class="text-xl mb-4 font-semibold">Asignar habitaciones</h2>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="type" class="block text-sm font-medium text-gray-700">Tipo</label>
          <select v-model="roomType.type" id="type" required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="">Seleccionar Tipo</option>
            <option v-for="(types, key) in accommodationOptions" :key="key" :value="key">{{ key }}</option>
          </select>
          <p v-if="errors.type" class="text-red-500 text-sm mt-1">{{ errors.type }}</p>
        </div>

        <div class="mb-4">
          <label for="accommodation" class="block text-sm font-medium text-gray-700">Acomodación</label>
          <select v-model="roomType.accommodation" id="accommodation" required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="">Seleccionar Acomodación</option>
            <option v-for="option in accommodationOptions[roomType.type] || []" :key="option" :value="option">{{ option }}</option>
          </select>
          <p v-if="errors.accommodation" class="text-red-500 text-sm mt-1">{{ errors.accommodation }}</p>
        </div>

        <div class="mb-4">
          <label for="quantity" class="block text-sm font-medium text-gray-700">Cantidad</label>
          <input v-model.number="roomType.quantity" id="quantity" type="number" min="1" required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          <p v-if="errors.quantity" class="text-red-500 text-sm mt-1">{{ errors.quantity }}</p>
        </div>

        <button type="submit" 
                class="w-full bg-[#155D76] text-white py-2 px-4 rounded-md hover:bg-gray-600 font-semibold">
          Asignar tipo de habitación
        </button>
      </form>

      <div v-if="success" class="my-4 text-green-500 text-center">{{ success }}</div>
      <div v-if="error" class="my-4 text-red-500 text-center">{{ error }}</div>

      <div v-if="roomTypes.length" class="mt-6">
        <hr class="border-t border-gray-300 my-4">
        <h2 class="text-xl font-semibold mb-4">Tipos de Habitación</h2>
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
              <th class="px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">Acomodación</th>
              <th class="px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
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
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;

export default {
  data() {
    return {
      roomType: {
        type: '',
        accommodation: '',
        quantity: 1,
        hotel_id: this.$route.params.hotelId
      },
      errors: {},
      success: null,
      error: null,
      roomTypes: [],
      hotel: null,
      accommodationOptions: {
        'Estándar': ['Sencilla', 'Doble'],
        'Junior': ['Triple', 'Cuádruple'],
        'Suite': ['Sencilla', 'Doble', 'Triple']
      }
    };
  },
  methods: {
    async fetchHotel() {
      try {
        const response = await axios.get(`${API_BASE_URL}/hotels/${this.$route.params.hotelId}`);
        this.hotel = response.data;
      } catch (error) {
        console.error('Error fetching hotel data:', error);
      }
    },
    async fetchRoomTypes() {
      try {
        const response = await axios.get(`${API_BASE_URL}/hotels/${this.$route.params.hotelId}/room-types`);
        this.roomTypes = response.data;
      } catch (error) {
        console.error('Error fetching room types:', error);
      }
    },
    validate() {
      this.errors = {};
      if (!this.roomType.type) this.errors.type = 'El tipo es requerido';
      if (!this.roomType.accommodation) this.errors.accommodation = 'La acomodación es requerida';
      if (!this.roomType.quantity || this.roomType.quantity < 1) this.errors.quantity = 'La cantidad debe ser al menos 1';
      return Object.keys(this.errors).length === 0;
    },
    async submitForm() {
      if (!this.validate()) return;

      try {
        await axios.post(`${API_BASE_URL}/room-types`, this.roomType);
        this.success = '¡Tipo de habitación creado con éxito!';
        this.error = null;
        this.roomType = {
          type: '',
          accommodation: '',
          quantity: 1,
          hotel_id: this.$route.params.hotelId
        };
        this.fetchRoomTypes();
        setTimeout(() => this.success = null, 2000);
      } catch (err) {
        this.error = err.response?.data?.error || 'No se pudo crear el tipo de habitación. Por favor, inténtelo de nuevo.';
        this.success = null;
      }
    }
  },
  mounted() {
    this.fetchHotel();
    this.fetchRoomTypes();
  }
};
</script>

<style scoped>
.error {
  color: red;
}
.success {
  color: green;
}
</style>