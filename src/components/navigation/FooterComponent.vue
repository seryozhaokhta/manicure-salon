<!-- src/components/navigation/FooterComponent.vue -->

<template>
    <footer>
        <p>{{ $t('footer.copyright') }}</p>
    </footer>
</template>

<script setup lang="ts">
// Нет логики скрипта для футера
</script>

<style scoped>
footer {
    text-align: center;
    padding: 20px;
    background-color: var(--background-color);
    color: var(--text-color);
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}

p {
    font-size: 1em;
}

/* Responsive Styles */
@media (max-width: 768px) {
    footer {
        padding: 15px;
    }

    p {
        font-size: 0.95em;
    }
}

@media (max-width: 480px) {
    footer {
        padding: 10px;
    }

    p {
        font-size: 0.9em;
    }
}
</style>
