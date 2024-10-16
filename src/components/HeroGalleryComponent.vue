<!-- src/components/HeroGalleryComponent.vue -->

<template>
    <div class="hero-gallery">
        <div class="slides-container" ref="slidesContainer">
            <div v-for="(image, index) in images" :key="index" class="slide" :class="{ active: currentIndex === index }"
                ref="slides">
                <img :src="image.src" :alt="image.alt" />
            </div>
        </div>

        <!-- Навигационные кнопки -->
        <button class="prev-button" @click="prevSlide">‹</button>
        <button class="next-button" @click="nextSlide">›</button>

        <!-- Индикаторы -->
        <div class="indicators">
            <span v-for="(image, index) in images" :key="index" :class="{ active: currentIndex === index }"
                @click="goToSlide(index)"></span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import gsap from 'gsap'

interface Image {
    src: string
    alt: string
}

const images = ref<Image[]>([
    { src: new URL('@/assets/manicure/1-picture.jpg', import.meta.url).href, alt: 'Manicure example 1' },
    { src: new URL('@/assets/manicure/2-picture.jpg', import.meta.url).href, alt: 'Pedicure example 2' },
    { src: new URL('@/assets/manicure/3-picture.jpg', import.meta.url).href, alt: 'Pedicure example 3' },
])

const currentIndex = ref(0)
const slidesContainer = ref<HTMLElement | null>(null)
const slides = ref<HTMLElement[]>([])

// Функция для перехода к следующему слайду
function nextSlide() {
    currentIndex.value = (currentIndex.value + 1) % images.value.length
}

// Функция для перехода к предыдущему слайду
function prevSlide() {
    currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length
}

// Функция для перехода к конкретному слайду
function goToSlide(index: number) {
    currentIndex.value = index
}

// Автоматическое переключение слайдов каждые 5 секунд
let autoSlideInterval: number | undefined
function startAutoSlide() {
    autoSlideInterval = window.setInterval(() => {
        nextSlide()
    }, 5000)
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval)
    }
}

onMounted(() => {
    // Инициализация слайдов
    slides.value = Array.from(slidesContainer.value?.children || []) as HTMLElement[]

    // Установка начальной позиции слайдов
    gsap.set(slides.value, { x: '100%', opacity: 0 })
    gsap.set(slides.value[currentIndex.value], { x: '0%', opacity: 1 })

    // Запуск автоматического переключения слайдов
    startAutoSlide()
})

// Наблюдаем за изменением currentIndex для анимации перехода
watch(currentIndex, (newIndex, oldIndex) => {
    if (slides.value.length === 0) return

    // Анимация старого слайда
    gsap.to(slides.value[oldIndex], {
        x: '-100%',
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
    })

    // Анимация нового слайда
    gsap.fromTo(
        slides.value[newIndex],
        { x: '100%', opacity: 0 },
        { x: '0%', opacity: 1, duration: 0.5, ease: 'power2.inOut' }
    )
})

// Остановка автопрокрутки при наведении мыши
function handleMouseEnter() {
    stopAutoSlide()
}

function handleMouseLeave() {
    startAutoSlide()
}
</script>

<style scoped>
.hero-gallery {
    position: relative;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    overflow: hidden;
}

.slides-container {
    position: relative;
    height: 400px;
}

.slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.prev-button,
.next-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    border: none;
    color: #fff;
    font-size: 2rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 50%;
    z-index: 10;
    transition: background-color 0.3s;
}

.prev-button:hover,
.next-button:hover {
    background-color: rgba(0, 0, 0, 0.8);
}

.prev-button {
    left: 10px;
}

.next-button {
    right: 10px;
}

.indicators {
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
}

.indicators span {
    width: 12px;
    height: 12px;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s;
}

.indicators span.active,
.indicators span:hover {
    background-color: rgba(255, 255, 255, 1);
}

/* Responsive Styles */
@media (max-width: 768px) {
    .slides-container {
        height: 300px;
    }
}

@media (max-width: 480px) {
    .slides-container {
        height: 200px;
    }

    .prev-button,
    .next-button {
        font-size: 1.5rem;
        padding: 0.3rem 0.6rem;
    }

    .indicators span {
        width: 10px;
        height: 10px;
    }
}
</style>
