import Cookies from 'js-cookie';
import { createRouter, createWebHistory } from 'vue-router';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/login' },

    {
      path: '/',
      component: () => import('../layouts/default.vue'),
      children: [
        {
          path: 'dashboard',
          name: 'admin-dashboard',
          component: () => import('../pages/dashboard.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'account-settings',
          name: 'admin-account-settings',
          component: () => import('../pages/account-settings.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'category',
          name: 'admin-category',
          component: () => import('../pages/categories/index.vue'),
          meta: { requiresAuth: true },
        }
      ],
    },
    {
      path: '/',
      component: () => import('../layouts/blank.vue'),
      children: [
        {
          path: 'login',
          component: () => import('../pages/login.vue'),
        },
        {
          path: '/:pathMatch(.*)*',
          component: () => import('../pages/[...all].vue'),
        },
      ],
    },
  ],
});

// // Middleware kiểm tra token trước khi chuyển trang
router.beforeEach((to, from, next) => {

  const token = Cookies.get('access_token');
  const role = Cookies.get('role');
  // console.log('token', token);
  // console.log('role', role);

  //   // Nếu đang ở trang đăng nhập mà đã có token, chuyển về dashboard
  //   // if (to.path === '/login' && token) {
  //   //   return next('/dashboard');
  //   // }

  // Nếu route yêu cầu đăng nhập và không có token
  if (to.meta.requiresAuth && !token) {
    alert('Phiên đăng nhập đã hết hạn hoặc chưa đăng nhập. Vui lòng đăng nhập lại.');
    next('/login');
  } else {
    next();
  }
});
export default router;
