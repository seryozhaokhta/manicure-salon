<!-- src/components/MainComponent.vue -->
<template>
    <main>
        <section>
            <h1>{{ $t('main.welcomeTitle') }}</h1>
            <p>{{ $t('main.description') }}</p>
        </section>
        <HeroGalleryComponent />
    </main>
</template>

<script setup lang="ts">
import HeroGalleryComponent from './HeroGalleryComponent.vue'
</script>

<style scoped>
main {
    padding: 20px;
    flex: 1;
}

section {
    margin-bottom: 30px;
}
</style>
