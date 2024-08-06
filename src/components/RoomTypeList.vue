<template>
  <div>
    <h1>Room Types</h1>
    <button @click="fetchRoomTypes">Refresh</button>
    <ul>
      <li v-for="roomType in roomTypes" :key="roomType.id">
        <router-link :to="'/room-types/' + roomType.id">{{ roomType.type }} - {{ roomType.accommodation }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;

export default {
  data() {
    return {
      roomTypes: [],
    };
  },
  methods: {
    async fetchRoomTypes() {
      try {
        const response = await axios.get(`${API_BASE_URL}/room-types`);
        this.roomTypes = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.fetchRoomTypes();
  },
};
</script>