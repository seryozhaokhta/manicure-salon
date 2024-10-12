<!-- src/components/HeroGalleryComponent.vue -->

<template>
    <div class="hero-gallery">
        <div v-for="(image, index) in images" :key="index" class="gallery-image">
            <img :src="image.src" :alt="image.alt" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const images = ref([
    { src: new URL('@/assets/manicure/1-picture.jpg', import.meta.url).href, alt: 'Manicure example 1' },
    { src: new URL('@/assets/manicure/2-picture.jpg', import.meta.url).href, alt: 'Pedicure example 2' },
    { src: new URL('@/assets/manicure/3-picture.jpg', import.meta.url).href, alt: 'Pedicure example 3' },
])
</script>

<style scoped>
.hero-gallery {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
}

.gallery-image img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s;
}

.gallery-image img:hover {
    transform: scale(1.05);
}

/* Responsive Styles */
@media (max-width: 768px) {
    .gallery-image img {
        width: 150px;
        height: 150px;
    }
}

@media (max-width: 480px) {
    .gallery-image img {
        width: 120px;
        height: 120px;
    }
}
</style>
