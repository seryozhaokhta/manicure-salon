<!-- src/components/HeaderComponent.vue -->
<template>
    <header>
        <nav class="navbar">
            <!-- Логотип слева -->
            <div class="logo">
                <img src="@/assets/logo-3.svg" alt="Glover Logo" />
            </div>

            <!-- Навигационные ссылки по центру -->
            <ul class="nav-links">
                <li><router-link to="/">{{ $t('header.home') }}</router-link></li>
                <li><router-link to="/services">{{ $t('header.services') }}</router-link></li>
                <li><router-link to="/contact">{{ $t('header.contact') }}</router-link></li>
            </ul>

            <!-- Кнопки переключения языка и темы справа -->
            <div class="controls">
                <div class="language-switcher">
                    <button @click="changeLanguage('en')">EN</button>
                    <button @click="changeLanguage('ru')">RU</button>
                    <button @click="changeLanguage('ge')">KA</button>
                </div>
                <div class="theme-switcher">
                    <button @click="toggleTheme" aria-label="Toggle Theme">
                        <DarkModeIcon v-if="isDark" />
                        <LightModeIcon v-else />
                    </button>
                </div>
            </div>
        </nav>
    </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import LightModeIcon from './icons/LightModeIcon.vue'
import DarkModeIcon from './icons/DarkModeIcon.vue'

const { locale } = useI18n()

const isDark = ref(false)

function changeLanguage(lang: string) {
    locale.value = lang
    localStorage.setItem('locale', lang)
}

function toggleTheme() {
    isDark.value = !isDark.value
    if (isDark.value) {
        document.documentElement.setAttribute('data-theme', 'dark')
        localStorage.setItem('theme', 'dark')
    } else {
        document.documentElement.removeAttribute('data-theme') // Возвращаемся к светлой теме
        localStorage.setItem('theme', 'light')
    }
}

// Устанавливаем начальную тему и язык на основе сохранённых предпочтений
onMounted(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
        isDark.value = true
        document.documentElement.setAttribute('data-theme', 'dark')
    } else {
        isDark.value = false
        document.documentElement.removeAttribute('data-theme') // Светлая тема по умолчанию
    }

    const savedLocale = localStorage.getItem('locale')
    if (savedLocale) {
        locale.value = savedLocale
    }
})
</script>

<style scoped>
.navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    background-color: var(--background-color);
    color: var(--text-color);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo img {
    height: 50px;
    width: 50px;
    transition: transform 0.3s;
}

.logo img:hover {
    transform: scale(1.1);
}

.nav-links {
    display: flex;
    list-style: none;
    gap: 1.5rem;
}

.nav-links li a {
    text-decoration: none;
    color: var(--link-color);
    font-weight: 500;
    transition: color 0.3s;
}

.nav-links li a:hover {
    color: var(--link-hover-color);
}

.controls {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.language-switcher button,
.theme-switcher button {
    background-color: var(--button-color);
    color: var(--button-text-color);
    border: none;
    padding: 0.5rem 1.2rem;
    margin-left: 10px;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
}

.language-switcher button:hover,
.theme-switcher button:hover {
    background-color: var(--button-hover-color);
    color: var(--button-hover-text-color);
}
</style>
