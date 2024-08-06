import { createRouter, createWebHistory } from 'vue-router';
import CreateHotel from '../components/CreateHotel.vue';
import HotelList from '../components/HotelList.vue';
import HotelDetails from '../components/HotelDetails.vue';
import RoomTypeList from '../components/RoomTypeList.vue';
import CreateRoomType from '../components/CreateRoomType.vue';

const routes = [
    { path: '/', component: CreateHotel },
    { path: '/hotels', component: HotelList },
    { path: '/hotels/:id', component: HotelDetails },
    { path: '/room-types', component: RoomTypeList },
    { path: '/room-types/create/:hotelId', component: CreateRoomType },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
