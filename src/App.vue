<!-- src/App.vue -->
<template>
  <div id="app">
    <HeaderComponent />
    <MainComponent />
    <FooterComponent />
  </div>
</template>

<script setup lang="ts">
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
import MainComponent from './components/MainComponent.vue'
</script>

<style>
/* Уберите Scoped, если хотите применять стили глобально */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
