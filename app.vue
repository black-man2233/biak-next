<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <YouthFx />
</template>

<script setup lang="ts">
const { initTheme } = useTheme()
onMounted(initTheme)
</script>
