const adminRoutes = [
    {
        path: '/admin-login',
        component: () => import('../pages/login.vue'), // Đưa login ra ngoài layout admin
    },
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
    {
        path: '/:pathMatch(.*)*',
        component: () => import('../pages/[...all].vue'),
    },
];

export default adminRoutes;
