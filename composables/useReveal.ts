export function useReveal(opts?: { threshold?: number; rootMargin?: string }) {
  const el = ref<Element | null>(null)
  const isVisible = ref(false)

  watch(el, (newEl, _, onCleanup) => {
    if (!newEl) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          observer.disconnect()
        }
      },
      {
        threshold: opts?.threshold ?? 0.12,
        rootMargin: opts?.rootMargin ?? '0px 0px -48px 0px',
      }
    )
    observer.observe(newEl)
    onCleanup(() => observer.disconnect())
  }, { immediate: true })

  return { el, isVisible }
}
