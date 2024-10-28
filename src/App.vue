<!-- src/App.vue -->
<template>
  <div id="app">
    <HeaderComponent />
    <router-view />
    <FooterComponent />
  </div>
</template>

<script setup lang="ts">
import HeaderComponent from './components/navigation/HeaderComponent.vue'
import FooterComponent from './components/navigation/FooterComponent.vue'
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
