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

export default {
  data() {
    return {
      roomTypes: [],
    };
  },
  methods: {
    async fetchRoomTypes() {
      try {
        const response = await axios.get('http://localhost:8000/api/room-types');
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