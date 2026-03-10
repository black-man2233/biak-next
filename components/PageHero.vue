<template>
  <section
    class="relative min-h-[62vh] flex items-center overflow-hidden pt-20 pb-20"
    style="background: linear-gradient(135deg, var(--hero-from) 0%, var(--hero-to) 100%)"
  >
    <!-- Animated orbs -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div class="absolute w-[480px] h-[480px] rounded-full opacity-20 top-[-80px] right-[-80px]"
        style="background: radial-gradient(circle, var(--primary) 0%, transparent 70%); animation: orb-drift-1 14s ease-in-out infinite" />
      <div class="absolute w-[320px] h-[320px] rounded-full opacity-15 bottom-[-60px] left-[8%]"
        style="background: radial-gradient(circle, var(--accent) 0%, transparent 70%); animation: orb-drift-2 18s ease-in-out infinite" />
      <div class="absolute w-[200px] h-[200px] rounded-full opacity-10 top-[35%] left-[45%]"
        style="background: radial-gradient(circle, var(--accent-light) 0%, transparent 70%); animation: orb-drift-3 11s ease-in-out infinite" />
    </div>

    <!-- Top accent line -->
    <div class="absolute top-0 left-0 right-0 h-px"
      style="background: linear-gradient(90deg, transparent, var(--accent), transparent); opacity: 0.3" />

    <!-- Decorative cross -->
    <div class="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none hidden xl:block" aria-hidden>
      <svg width="260" height="420" viewBox="0 0 260 420" fill="none">
        <rect x="112" y="0" width="36" height="420" fill="white" rx="6" />
        <rect x="0" y="140" width="260" height="36" fill="white" rx="6" />
      </svg>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
      <!-- Badge -->
      <span
        class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
        style="background: var(--bg-secondary); border: 1px solid var(--accent); color: var(--accent); animation: fadeIn 0.5s ease both; opacity: 0.9"
      >
        <span class="w-1.5 h-1.5 rounded-full animate-pulse" style="background: var(--accent)" />
        {{ label }}
      </span>

      <!-- Title -->
      <h1
        class="font-serif font-bold text-white leading-[1.08] mt-3"
        style="font-size: clamp(2.2rem, 6vw, 4.5rem); animation: fadeUp 0.7s 0.1s ease both"
      >
        {{ title }}<template v-if="titleAccent"><br />
          <span style="
            background: linear-gradient(135deg, var(--accent-light), var(--accent), var(--primary-dark), var(--accent));
            background-size: 300% 300%;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: gradient-pan 4s ease infinite;
          ">{{ titleAccent }}</span>
        </template>
      </h1>

      <!-- Description -->
      <p
        v-if="desc"
        class="text-white/60 text-base sm:text-lg mt-5 max-w-xl leading-relaxed"
        style="animation: fadeUp 0.7s 0.25s ease both"
      >
        {{ desc }}
      </p>

      <!-- Optional CTA slot -->
      <div v-if="$slots.default" class="mt-8" style="animation: fadeUp 0.7s 0.38s ease both">
        <slot />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  title: string
  titleAccent?: string
  desc?: string
}>()
</script>
