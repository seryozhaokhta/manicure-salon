<!-- src/components/MainComponent.vue -->
<template>
    <main>
        <section>
            <h1>{{ $t('main.welcomeTitle') }}</h1>
            <p>{{ $t('main.description') }}</p>
        </section>
        <HeroGalleryComponent />
        <BookingForm />
    </main>
</template>

<script setup lang="ts">
import HeroGalleryComponent from './gallery/HeroGalleryComponent.vue'
import BookingForm from './forms/BookingForm.vue'
</script>

<style scoped>
main {
    padding: 20px;
    flex: 1;
}

section {
    margin-bottom: 30px;
}

h1 {
    font-size: 2.5em;
    /* Уменьшенный размер на больших экранах */
}

p {
    font-size: 1.1em;
}

/* Responsive Styles */
@media (max-width: 768px) {
    main {
        padding: 15px;
    }

    section {
        margin-bottom: 20px;
    }

    h1 {
        font-size: 2em;
    }

    p {
        font-size: 1em;
    }
}

@media (max-width: 480px) {
    main {
        padding: 10px;
    }

    h1 {
        font-size: 1.8em;
    }

    p {
        font-size: 0.95em;
    }
}
</style>
