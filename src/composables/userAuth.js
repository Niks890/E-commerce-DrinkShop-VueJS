import Cookies from 'js-cookie'
import { ref } from 'vue'
import api from '../configs/axios.js'

// Biến lưu trữ thông tin người dùng
const userName = ref('')
const userRole = ref('')

export async function getInfoUser() {
    try {
        const response = await api.post('/me', null, {
            headers: {
                Authorization: `Bearer ${Cookies.get('access_token')}`
            }
        })
        userName.value = response.data.name
        userRole.value = response.data.roles
        return response.data
    } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error)
        return null
    }
}

export { userName, userRole }

