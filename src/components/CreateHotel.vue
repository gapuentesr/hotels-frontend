<template>
  <div class="container mx-auto px-4 py-2">
    <div class="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-xl">
      <h1 class="text-2xl font-bold mb-4 text-center">Agregar Hotel</h1>

      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Nombre</label>
          <input v-model="hotel.name" id="name" type="text" required 
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
        </div>

        <div class="mb-4">
          <label for="address" class="block text-sm font-medium text-gray-700">Dirección</label>
          <input v-model="hotel.address" id="address" type="text" required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          <p v-if="errors.address" class="text-red-500 text-sm mt-1">{{ errors.address }}</p>
        </div>

        <div class="mb-4">
          <label for="city" class="block text-sm font-medium text-gray-700">Ciudad</label>
          <input v-model="hotel.city" id="city" type="text" required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          <p v-if="errors.city" class="text-red-500 text-sm mt-1">{{ errors.city }}</p>
        </div>

        <div class="mb-4">
          <label for="nit" class="block text-sm font-medium text-gray-700">NIT</label>
          <input v-model="hotel.nit" id="nit" type="text" required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          <p v-if="errors.nit" class="text-red-500 text-sm mt-1">{{ errors.nit }}</p>
        </div>

        <div class="mb-4">
          <label for="number_of_rooms" class="block text-sm font-medium text-gray-700">Número de Habitaciones</label>
          <input v-model="hotel.number_of_rooms" id="number_of_rooms" type="number" min="1" required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          <p v-if="errors.number_of_rooms" class="text-red-500 text-sm mt-1">{{ errors.number_of_rooms }}</p>
        </div>

        <button type="submit" 
                class="w-full bg-[#155D76] text-white py-2 px-4 rounded-md hover:bg-gray-600 font-semibold">
          Crear Hotel
        </button>
      </form>

      <div v-if="success" class="my-2 text-green-500 text-center">{{ success }}</div>
      <div v-if="error" class="my-2 text-red-500 text-center">{{ error }}</div>
    
    </div>
  </div>
</template>

<script>
import axios from 'axios';
const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;

export default {
  data() {
    return {
      hotel: {
        name: '',
        address: '',
        city: '',
        nit: '',
        number_of_rooms: ''
      },
      errors: {},
      success: null,
      error: null
    };
  },
  methods: {
    validate() {
      this.errors = {};
      if (!this.hotel.name) this.errors.name = 'El nombre es requerido';
      if (!this.hotel.address) this.errors.address = 'La dirección es requerida';
      if (!this.hotel.city) this.errors.city = 'La ciudad es requerida';
      if (!this.hotel.nit) this.errors.nit = 'El NIT es requerido';
      if (!this.hotel.number_of_rooms) this.errors.number_of_rooms = 'El número de habitaciones es requerido';
      if (this.hotel.number_of_rooms < 1) this.errors.number_of_rooms = 'El número de habitaciones debe ser al menos 1';
      return Object.keys(this.errors).length === 0;
    },
    async submitForm() {
      if (!this.validate()) return;

      try {
        const response = await axios.post(`${API_BASE_URL}/hotels`, this.hotel);
        if (response.status === 201) {
          this.success = '¡Hotel creado con éxito!';
          this.error = null;
          const hotelId = response.data.id;
          this.hotel = {
            name: '',
            address: '',
            city: '',
            nit: '',
            number_of_rooms: ''
          };

          // Redirige a la página de creación de tipos de habitación
          setTimeout(() => {
            this.$router.push(`/room-types/create/${hotelId}`);
          }, 1000);
        } else {
          throw new Error('¡Error al crear el hotel!');
        }
      } catch (err) {
        this.error = 'No se pudo crear el hotel. Por favor, inténtelo de nuevo.';
        this.success = null;
      }
    }
  }
};
</script>

<style scoped>

</style>
