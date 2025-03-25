<script setup>
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue'
import VerticalNavLayout from '@layouts/components/VerticalNavLayout.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'
import { useTheme } from 'vuetify'

// Components
import Footer from '@/layouts/components/Footer.vue'
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

const hasRole = role => {
  return userStore.roles?.includes(role) ?? false
}


const vuetifyTheme = useTheme()
</script>

<template>
  <VerticalNavLayout>
    <!-- 👉 Navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <!-- 👉 Toggle Menu (Mobile) -->
        <IconBtn class="ms-n3 d-lg-none" @click="toggleVerticalOverlayNavActive(true)">
          <VIcon icon="bx-menu" />
        </IconBtn>

        <!-- 👉 Search -->
        <div class="d-flex align-center cursor-pointer" style="user-select: none;">
          <IconBtn>
            <VIcon icon="bx-search" />
          </IconBtn>
          <span class="d-none d-md-flex align-center">
            <span class="me-3">Tìm kiếm</span>
          </span>
        </div>

        <VSpacer />

        <!-- 👉 Notifications -->
        <IconBtn class="me-2">
          <VIcon icon="bx-bell" />
        </IconBtn>

        <NavbarThemeSwitcher class="me-2" />
        <UserProfile />
      </div>
    </template>

    <!-- 👉 Sidebar Menu -->
    <template #vertical-nav-content>
      <!-- 🏠 Dashboard -->
      <VerticalNavLink :item="{ title: 'Dashboard', icon: 'bx-home', to: '/admin/dashboard' }" />

      <!-- 📌 Quản lý Sản phẩm -->
      <VerticalNavSectionTitle v-if="hasRole('admin') || hasRole('manager') || hasRole('sale')"
        :item="{ heading: 'Quản lý Sản phẩm' }" />
      <VerticalNavLink v-if="hasRole('admin') || hasRole('manager') || hasRole('sale')"
        :item="{ title: 'Danh mục', icon: 'bx-list-ul', to: '/admin/category' }" />
      <VerticalNavLink v-if="hasRole('admin') || hasRole('manager') || hasRole('sale')"
        :item="{ title: 'Sản phẩm', icon: 'bx-box', to: '/admin/product' }" />

      <!-- 📌 Quản lý Bán hàng -->
      <VerticalNavSectionTitle v-if="hasRole('admin') || hasRole('sale') || hasRole('manager')"
        :item="{ heading: 'Quản lý Bán hàng' }" />
      <VerticalNavLink v-if="hasRole('admin') || hasRole('sale') || hasRole('manager')"
        :item="{ title: 'Đơn hàng', icon: 'bx-cart', to: '/admin/order' }" />
      <VerticalNavLink v-if="hasRole('admin') || hasRole('manager')"
        :item="{ title: 'Khuyến mãi', icon: 'bx-gift', to: '/admin/discount' }" />
      <VerticalNavLink v-if="hasRole('admin') || hasRole('manager')"
        :item="{ title: 'Doanh Thu', icon: 'bx-package', to: '/admin/revenue' }" />

      <!-- 📌 Quản lý Kho & nhà cung cấp -->
      <VerticalNavSectionTitle v-if="hasRole('admin') || hasRole('warehouseworker') || hasRole('manager')"
        :item="{ heading: 'Quản lý Kho & nhà cung cấp' }" />
      <VerticalNavLink v-if="hasRole('admin') || hasRole('warehouseworker') || hasRole('manager')"
        :item="{ title: 'Nhà cung cấp', icon: 'bx-package', to: '/admin/supplier' }" />
      <VerticalNavLink v-if="hasRole('admin') || hasRole('warehouseworker') || hasRole('manager')"
        :item="{ title: 'Kho hàng', icon: 'bx-package', to: '/admin/inventory' }" />

      <!-- 🔥 Chỉ admin mới thấy Nhân viên -->
      <VerticalNavLink v-if="hasRole('admin') || hasRole('manager')"
        :item="{ title: 'Nhân viên', icon: 'bx-user', to: '/admin/employee' }" />

      <!-- 📌 Khác -->
      <VerticalNavSectionTitle v-if="hasRole('admin') || hasRole('manager')" :item="{ heading: 'Khác' }" />
      <VerticalNavLink v-if="hasRole('admin') || hasRole('manager')"
        :item="{ title: 'Đánh giá', icon: 'bx-star', to: '/admin/review' }" />
    </template>


    <!-- 👉 Main Content -->
    <slot />

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>
  </VerticalNavLayout>
</template>
