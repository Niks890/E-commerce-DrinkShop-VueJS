<script setup>
import ErrorHeader from '@/components/ErrorHeader.vue';
import misc404 from '@images/pages/404.png';
</script>

<template>
  <div class="misc-wrapper">
    <ErrorHeader error-code="404" error-title="Page Not Found ⚠️"
      error-description="We couldn't find the page you are looking for." />

    <!-- 👉 Image -->
    <div class="misc-avatar w-100 text-center">
      <VImg :src="misc404" alt="Coming Soon" :max-width="800" class="mx-auto" />
      <VBtn to="/admin/dashboard" class="mt-10">
        Về trang chủ
      </VBtn>
    </div>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/misc.scss";
</style>
