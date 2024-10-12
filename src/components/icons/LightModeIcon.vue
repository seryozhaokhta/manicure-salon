<!-- src/components/icons/LightModeIcon.vue -->
<template>
    <img src="@/assets/light_mode_24dp_000000_FILL0_wght200_GRAD0_opsz24.svg" alt="Light Mode" />
</template>

<script setup lang="ts">
// Нет дополнительной логики
</script>

<style scoped>
img {
    width: 24px;
    height: 24px;
    transition: transform 0.3s;
}

img:hover {
    transform: scale(1.1);
}
</style>
