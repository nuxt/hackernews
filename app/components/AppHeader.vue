<script setup lang="ts">
import { feedsInfo } from '~~/utils/api'

import { ref } from 'vue'

const isDarkMode = ref(false)

function toggleSwitch() {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('dark-mode', isDarkMode.value)
}
</script>

<template>
  <header class="header">
    <nav
      class="inner"
      role="navigation"
    >
      <NuxtLink
        to="/"
        aria-label="Go to homepage"
      >
        <svg
          class="logo"
          viewBox="0 0 900 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M504.908 750H839.476C850.103 750.001 860.542 747.229 869.745 741.963C878.948 736.696 886.589 729.121 891.9 719.999C897.211 710.876 900.005 700.529 900 689.997C899.995 679.465 897.193 669.12 891.873 660.002L667.187 274.289C661.876 265.169 654.237 257.595 645.036 252.329C635.835 247.064 625.398 244.291 614.773 244.291C604.149 244.291 593.711 247.064 584.511 252.329C575.31 257.595 567.67 265.169 562.36 274.289L504.908 372.979L392.581 179.993C387.266 170.874 379.623 163.301 370.42 158.036C361.216 152.772 350.777 150 340.151 150C329.525 150 319.086 152.772 309.883 158.036C300.679 163.301 293.036 170.874 287.721 179.993L8.12649 660.002C2.80743 669.12 0.00462935 679.465 5.72978e-06 689.997C-0.00461789 700.529 2.78909 710.876 8.10015 719.999C13.4112 729.121 21.0523 736.696 30.255 741.963C39.4576 747.229 49.8973 750.001 60.524 750H270.538C353.748 750 415.112 713.775 457.336 643.101L559.849 467.145L614.757 372.979L779.547 655.834H559.849L504.908 750ZM267.114 655.737L120.551 655.704L340.249 278.586L449.87 467.145L376.474 593.175C348.433 639.03 316.577 655.737 267.114 655.737Z"
            fill="#00DC82"
          />
        </svg>
      </NuxtLink>
      <NuxtLink
        v-for="(list, key) in feedsInfo"
        :key="key"
        :to="`/${key}`"
        :class="{ active: $route.path.startsWith(`/${key}`) }"
      >
        {{ list.title }}
      </NuxtLink>
      <span class="github" style="margin-right: 10px;">
        <a
          href="https://github.com/nuxt/hackernews"
          target="_blank"
          rel="noopener banner"
        >
          Open on GitHub
        </a>
      </span>

      <span @click="toggleSwitch" style="cursor: pointer;">
        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8V16Z" fill="#FFFFFF"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4V8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16V20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z" fill="#FFFFFF"/>
        </svg>
      </span>
      
    </nav>
  </header>
</template>
