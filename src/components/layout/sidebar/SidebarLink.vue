<template>
  <RouterLink :to="to" v-slot="{ isActive }">
    <span :class="linkClass(isActive)">
      <slot/>
    </span>
  </RouterLink>
</template>

<script setup>
import {computed} from 'vue'

const props = defineProps({
  to: {
    type: [String, Object],
    required: true,
  },
})

const baseClass = 'nav-link'
const activeClass = 'bg-gray-200 dark:bg-gray-700 text-primary-600 dark:text-white font-semibold'
const inactiveClass = 'text-gray-700 dark:text-gray-300'

/**
 * Returns computed classes based on active state.
 * @param {boolean} isActive
 */
const linkClass = (isActive) => {
  return [baseClass, isActive ? activeClass : inactiveClass].join(' ')
}
</script>

<style scoped>
.nav-link {
  @apply block py-2 px-3 rounded transition-colors;
}
</style>
