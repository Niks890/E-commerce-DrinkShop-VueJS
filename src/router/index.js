import Cookies from 'js-cookie';
import { createRouter, createWebHistory } from 'vue-router';
import api from '../configs/axios.js';
import { useUserStore } from '../stores/userStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // history: createWebHistory(),
  routes: [
    { path: '/admin-login', redirect: '/login' },

    {
      path: '/admin',
      component: () => import('../layouts/default.vue'),
      children: [
        {
          path: 'dashboard',
          name: 'admin-dashboard',
          component: () => import('../pages/dashboard.vue'),
          meta: { requiresAuth: true, role: 'admin,manager,warehouseworker,sale' },
        },
        {
          path: 'account-settings',
          name: 'admin-account-settings',
          component: () => import('../pages/account-settings.vue'),
          meta: { requiresAuth: true, role: 'admin,manager,warehouseworker,sale' },
        },
        {
          path: 'category',
          name: 'admin-category',
          component: () => import('../pages/categories/index.vue'),
          meta: { requiresAuth: true, role: 'admin,manager,sale' },
        },
        {
          path: 'product',
          name: 'admin-product',
          component: () => import('../pages/products/index.vue'),
          meta: { requiresAuth: true, role: 'admin,manager,sale' },
        },
        {
          path: 'order',
          name: 'admin-order',
          component: () => import('../pages/orders/index.vue'),
          meta: { requiresAuth: true, role: 'admin,manager,sale' },
        },
        {
          path: 'discount',
          name: 'admin-discount',
          component: () => import('../pages/discounts/index.vue'),
          meta: { requiresAuth: true, role: 'admin,manager' },
        },
        {
          path: 'employee',
          name: 'admin-employee',
          component: () => import('../pages/employees/index.vue'),
          meta: { requiresAuth: true, role: 'admin,manager' },
        },
        {
          path: 'inventory',
          name: 'admin-inventory',
          component: () => import('../pages/inventories/index.vue'),
          meta: { requiresAuth: true, role: 'admin,manager,warehouseworker' },
        },
        {
          path: 'revenue',
          name: 'admin-revenue',
          component: () => import('../pages/revenues/index.vue'),
          meta: { requiresAuth: true, role: 'admin,manager' },
        },

        {
          path: 'review',
          name: 'admin-review',
          component: () => import('../pages/reviews/index.vue'),
          meta: { requiresAuth: true, role: 'admin,manager' },
        },
        {
          path: 'supplier',
          name: 'admin-supplier',
          component: () => import('../pages/suppliers/index.vue'),
          meta: { requiresAuth: true, role: 'admin,manager,warehouseworker' },
        },
      ],
    },
    {
      path: '/login',
      component: () => import('../pages/login.vue'),
    },

    // Route 404 (Not Found)
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../pages/[...all].vue'),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const token = Cookies.get('access_token');
  const userStore = useUserStore();

  // Nếu không có token mà route yêu cầu đăng nhập
  if (to.meta.requiresAuth && !token) {
    alert('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!');
    return next('/login');
  }

  // Nếu đã có token nhưng chưa có role -> Gọi API để lấy role
  if (token && (!userStore.roles || userStore.roles.length === 0)) { // 👈 Fix: kiểm tra roles rỗng
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

  // Kiểm tra quyền truy cập
  if (to.meta.role) {
    const allowedRoles = to.meta.role.split(','); // Danh sách role cần có
    const userRoles = userStore.roles || []; // Lấy role từ Pinia
    // kiểm tra role có đúng
    const hasPermission = userRoles.some(role => allowedRoles.includes(role));
    if (!hasPermission) {
      alert('Bạn không có quyền truy cập trang này!');
      return next('/403');
    }
  }

  return next();
});

export default router;
