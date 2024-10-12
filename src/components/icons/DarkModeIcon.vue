<!-- src/components/icons/DarkModeIcon.vue -->
<template>
    <img src="@/assets/dark_mode_24dp_FFFFFF_FILL0_wght200_GRAD0_opsz20.svg" alt="Dark Mode" />
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
