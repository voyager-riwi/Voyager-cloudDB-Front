<script setup>
import { RouterLink, RouterView } from 'vue-router'
import AppNavbar from '@/components/common/AppNavbar.vue'
import Home from './views/HomeView.vue'
</script>
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>
