<template>
  <div class="min-h-screen flex flex-col bg-warm">
    <TheNavbar />
    <main class="flex-1">
      <slot />
    </main>
    <TheFooter />
  </div>
</template>
