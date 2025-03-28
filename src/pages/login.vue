<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard class="auth-card pa-4 pt-7" max-width="448">
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <img :src="logo" alt="sneat" height="32" class="rounded" />
          </div>
        </template>

        <VCardTitle class="text-2xl font-weight-bold">
          T-DrinkShop
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 mb-1 text-center">
          Welcome to T-DrinkShop!
        </h5>
      </VCardText>

      <VCardText v-if="errorMessage" class="text-danger text-center">{{ errorMessage }}</VCardText>

      <VCardText>
        <VForm @submit.prevent="handleLogin">
          <VRow>
            <!-- Email -->
            <VCol cols="12">
              <VTextField v-model="email" label="Email" placeholder="johndoe@email.com" type="email"
                :error-messages="errors.email" autofocus />
            </VCol>

            <!-- Password -->
            <VCol cols="12">
              <VTextField v-model="password" label="Password" placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible" :error-messages="errors.password" />
              <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
                <VCheckbox v-model="remember" label="Remember me" />

                <RouterLink class="text-primary ms-2 mb-1" to="javascript:void(0)">
                  Forgot Password?
                </RouterLink>
              </div>

              <!-- Login button -->
              <VBtn block type="submit">
                Login
              </VBtn>
            </VCol>

            <!-- Create account -->
            <VCol cols="12" class="text-center text-base">
              <RouterLink class="text-primary ms-2 text-decoration-underline" to="/client">
                Về trang chủ
              </RouterLink>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>

<script setup>
import logo from '@images/logo.webp';
import { message } from 'ant-design-vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../configs/axios.js';

// Import VeeValidate và Yup
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

const router = useRouter();
const { value: remember } = useField('remember');
const isPasswordVisible = ref(false);
const errorMessage = ref('');

// Khai báo schema cho form với Yup
const schema = yup.object({
  email: yup.string().required('Email không được bỏ trống').email('Email không hợp lệ'),
  password: yup.string().required('Mật khẩu không được bỏ trống').min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  remember: yup.boolean(),
});


// Khởi tạo form
const { handleSubmit, errors } = useForm({
  validationSchema: schema,
});

// Khởi tạo các field
const { value: email } = useField('email');
const { value: password } = useField('password');

// Xử lý login
const handleLogin = handleSubmit(async (values) => {
  try {
    const response = await api.post('/auth/login', {
      email: values.email,
      password: values.password,
    }, { withCredentials: true });
    message.success({
      content: `Đăng nhập thành công!`,
      duration: 3,
    });
    router.push({ name: 'admin-dashboard' });
  } catch (error) {
    // Xử lý lỗi chi tiết từ API
    if (error.response?.status === 401) {
      message.error({
        content: `Email hoặc mật khẩu không đúng!`,
        duration: 3,
      });

    } else if (error.response?.data?.errors) {
      // Lỗi từ việc validate trên server
      const errorData = error.response.data.errors;
      errorMessage.value = Object.values(errorData).flat().join(', ');
    } else {
      message.error({
        content: `Đăng nhập thất bại! Vui lòng thử lại.`,
        duration: 3,
      });
    }
    console.error('Lỗi đăng nhập:', error.response?.data);
  }
});


</script>
