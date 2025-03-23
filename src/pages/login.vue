<script setup>
import logo from '@images/logo.webp';

const form = ref({
  email: '',
  password: '',
  remember: false,
})

const isPasswordVisible = ref(false)
</script>

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
          Welcome to T-DrinkShop !
        </h5>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="$router.push('/')">
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField v-model="form.email" autofocus placeholder="johndoe@email.com" label="Email" type="email" />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField v-model="form.password" label="Password" placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible" />

              <!-- remember me checkbox -->
              <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
                <VCheckbox v-model="form.remember" label="Remember me" />

                <RouterLink class="text-primary ms-2 mb-1" to="javascript:void(0)">
                  Forgot Password?
                </RouterLink>
              </div>

              <!-- login button -->
              <VBtn block type="submit">
                Login
              </VBtn>
            </VCol>

            <!-- create account -->
            <VCol cols="12" class="text-center text-base">
              <RouterLink class="text-primary ms-2 text-decoration-underline" to="/">
                Về trang chủ
              </RouterLink>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>
