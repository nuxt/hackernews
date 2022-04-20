<script setup lang="ts">
defineProps<{
  show: boolean
}>()
</script>

<template>
  <transition>
    <svg
      v-show="show"
      :class="{ show: show }"
      class="spinner"
      width="44px"
      height="44px"
      viewBox="0 0 44 44"
    >
      <circle
        class="path"
        fill="none"
        stroke-width="4"
        stroke-linecap="round"
        cx="22"
        cy="22"
        r="20"
      />
    </svg>
  </transition>
</template>

<style lang="postcss">
.spinner {
  transition: opacity 0.15s ease;
  animation: rotator 1.4s linear infinite;
  animation-play-state: paused;

  &.show {
    animation-play-state: running;
  }

  &.v-enter, &.v-leave-active {
    opacity: 0;
  }

  &.v-enter-active, &.v-leave {
    opacity: 1;
  }
}

@keyframes rotator {
  0% {
    transform: scale(0.5) rotate(0deg);
  }

  100% {
    transform: scale(0.5) rotate(270deg);
  }
}

.spinner .path {
  stroke: #ff6600;
  stroke-dasharray: 126;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation: dash 1.4s ease-in-out infinite;
}

@keyframes dash {
  0% {
    stroke-dashoffset: 126;
  }

  50% {
    stroke-dashoffset: (126 / 2);
    transform: rotate(135deg);
  }

  100% {
    stroke-dashoffset: 126;
    transform: rotate(450deg);
  }
}
</style>
