<script setup>
import avatar1 from '@images/avatars/avatar-1.png';
import { message, Modal } from 'ant-design-vue';
import Cookies from 'js-cookie';
import { useRouter } from 'vue-router';
import api from '../../configs/axios.js';
import { useUserStore } from '../../stores/userStore';

const router = useRouter();
const userStore = useUserStore();

import { getInfoUser, userName } from '../../composables/userAuth.js';
getInfoUser();
// console.log('userEmail:', userEmail);
// console.log('userName:', userName);
async function logout() {
  try {
    await api.post('/logout');
    // reset state
    userStore.resetUser();
    // Xóa token khỏi header axios
    // delete api.defaults.headers.common['Authorization'];

    api.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('access_token')}`;
    // Xóa cookie
    Cookies.remove('access_token');
    message.success({
      content: 'Đăng xuất thành công!',
      duration: 3,
    });
    router.push('/admin-login');
  } catch (error) {
    console.error('Lỗi khi đăng xuất:', error);
  }
}


async function confirmLogout() {
  Modal.confirm({
    title: 'Xác nhận đăng xuất',
    content: 'Bạn có chắc chắn muốn đăng xuất?',
    zIndex: 2000,
    async onOk() {
      await logout(); // Đợi logout hoàn thành trước khi đóng modal
    },
  });
}

</script>

<template>
  <VBadge dot location="bottom right" offset-x="3" offset-y="3" color="success" bordered>
    <VAvatar class="cursor-pointer" color="primary" variant="tonal">
      <VImg :src="avatar1" />

      <!-- SECTION Menu -->
      <VMenu activator="parent" width="230" location="bottom end" offset="14px">
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge dot location="bottom right" offset-x="3" offset-y="3" color="success">
                  <VAvatar color="primary" variant="tonal">
                    <VImg :src="avatar1" />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold">
              {{ userName }}
            </VListItemTitle>
            <!-- <VListItemSubtitle>{{ userEmail }}</VListItemSubtitle> -->
          </VListItem>
          <VDivider class="my-2" />

          <!-- 👉 Profile -->
          <VListItem to="/profile">
            <template #prepend>
              <VIcon class="me-2" icon="bx-user" size="22" />
            </template>

            <VListItemTitle>Profile</VListItemTitle>
          </VListItem>

          <!-- 👉 Settings -->
          <VListItem to="/account-settings">
            <template #prepend>
              <VIcon class="me-2" icon="bx-cog" size="22" />
            </template>

            <VListItemTitle>Settings</VListItemTitle>
          </VListItem>
          <!-- Divider -->
          <VDivider class="my-2" />

          <!-- 👉 Logout -->
          <VListItem @click="confirmLogout">
            <template #prepend>
              <VIcon class="me-2" icon="bx-log-out" size="22" />
            </template>

            <VListItemTitle>Logout</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>
