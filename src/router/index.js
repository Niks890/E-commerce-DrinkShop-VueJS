import Cookies from 'js-cookie';
import { createRouter, createWebHistory } from 'vue-router';
import api from '../configs/axios.js';
import { useUserStore } from '../stores/userStore';
import adminRoutes from './admin.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [...adminRoutes], // Sử dụng routes từ admin.js
});

router.beforeEach(async (to, from, next) => {
  const token = Cookies.get('access_token');
  const userStore = useUserStore();

  if (to.meta.requiresAuth && !token) {
    alert('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!');
    return next('/login');
  }

  if (token && (!userStore.roles || userStore.roles.length === 0)) {
    try {
      const response = await api.post('/me', null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const roles = response.data.roles ? response.data.roles.split(',') : [];
      userStore.setUser(response.data.name, roles);
    } catch (error) {
      return next('/login');
    }
  }

  if (to.meta.role) {
    const allowedRoles = to.meta.role.split(',');
    const userRoles = userStore.roles || [];
    const hasPermission = userRoles.some(role => allowedRoles.includes(role));

    if (!hasPermission) {
      alert('Bạn không có quyền truy cập trang này!');
      return next('/403');
    }
  }

  return next();
});

export default router;
