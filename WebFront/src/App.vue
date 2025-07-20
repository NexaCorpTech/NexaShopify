<script setup>
import { RouterView } from "vue-router";
// import AppLayout from './components/layout/AppLayout.vue';

import AppLayout from './components/layout/AppLayout.vue'
import EmptyLayout from './components/layout/EmptyLayout.vue'
import { useRoute } from 'vue-router'

// Map des layouts possibles
const layouts = {
  default: EmptyLayout,
  empty: EmptyLayout,
  layoutseller: AppLayout
}
// Utilisation de useRoute pour obtenir la route actuelle
const route = useRoute();
</script>

<template>
  <component :is="layouts[route.meta.layout || 'default']">
    <RouterView />
  </component>
</template>


<style scoped>
/* Styles globaux */
/* * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Open Sans', sans-serif;
  background-color: #f8f9fa;
  color: #333;
  line-height: 1.6;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
} */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background-color: #f8fafc;
}

.nexashop-layout {
  min-height: 100vh;
  display: flex;
}

/* Responsive utilities */
.mobile-only {
  display: block;
}

.desktop-only {
  display: none;
}

@media (min-width: 1024px) {
  .mobile-only {
    display: none;
  }
  
  .desktop-only {
    display: block;
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
