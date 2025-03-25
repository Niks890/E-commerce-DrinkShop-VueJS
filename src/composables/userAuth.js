import { useUserStore } from '@/stores/userStore';
import Cookies from 'js-cookie';
import { computed } from 'vue';
import api from '../configs/axios.js';

// Lấy store user
const userStore = useUserStore();
// Thêm biến computed để export
export const userName = computed(() => userStore.name);
export const userRole = computed(() => userStore.roles);
// export const userEmail = computed(() => userStore.email);
// console.log('userStore.email:', userStore.email);

export async function getInfoUser() {
    if (userStore.roles.length) return { name: userStore.name, roles: userStore.roles, email: userStore.email };

    try {
        const response = await api.post('/me', null, {
            headers: { Authorization: `Bearer ${Cookies.get('access_token')}` },
        });
        // console.log('Dữ liệu từ API:', response.data.email);
        const roles = response.data.roles ? response.data.roles.split(',') : [];
        // userStore.setUser(response.data.name, roles, response.data.email);
        userStore.setUser(response.data.name, roles);
        return response.data;
    } catch (error) {
        return null;
    }
}
