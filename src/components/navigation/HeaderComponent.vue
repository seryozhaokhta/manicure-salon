<!-- src/components/navigation/HeaderComponent.vue -->

<template>
    <header>
        <nav class="navbar">
            <!-- Логотип слева -->
            <div class="logo">
                <img src="@/assets/logo-3.svg" alt="Glover Logo" />
            </div>

            <!-- Навигационные ссылки по центру (скрыты на мобильных) -->
            <ul class="nav-links">
                <li><router-link to="/">{{ $t('header.home') }}</router-link></li>
                <li><router-link to="/services">{{ $t('header.services') }}</router-link></li>
                <li><router-link to="/booking">{{ $t('header.contact') }}</router-link></li>
            </ul>

            <!-- Кнопки переключения языка и темы справа (скрыты на мобильных) -->
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

            <!-- Бургер-меню (видно на мобильных) -->
            <button class="burger-menu" @click="toggleMenu" aria-label="Toggle Navigation" :aria-expanded="isMenuOpen"
                aria-controls="navigation-drawer">
                <span :class="['line', { 'line1': isMenuOpen }]" />
                <span :class="['line', { 'line2': isMenuOpen }]" />
                <span :class="['line', { 'line3': isMenuOpen }]" />
            </button>
        </nav>

        <!-- Overlay для закрытия меню при клике вне -->
        <div v-if="isMenuOpen" class="overlay" @click="closeMenu"></div>

        <!-- Боковая панель (Drawer) -->
        <div :class="['drawer', { 'drawer-open': isMenuOpen }]" id="navigation-drawer" role="navigation">
            <ul class="drawer-links">
                <li><router-link to="/" @click="closeMenu">{{ $t('header.home') }}</router-link></li>
                <li><router-link to="/services" @click="closeMenu">{{ $t('header.services') }}</router-link></li>
                <li><router-link to="/booking" @click="closeMenu">{{ $t('header.contact') }}</router-link></li>
            </ul>
            <div class="drawer-controls">
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
        </div>
    </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import LightModeIcon from '../icons/LightModeIcon.vue'
import DarkModeIcon from '../icons/DarkModeIcon.vue'

const { locale } = useI18n()

const isDark = ref(false)
const isMenuOpen = ref(false)

const changeLanguage = (lang: string) => {
    locale.value = lang
    localStorage.setItem('locale', lang)
    closeMenu()
}

const toggleTheme = () => {
    isDark.value = !isDark.value
    if (isDark.value) {
        document.documentElement.setAttribute('data-theme', 'dark')
        localStorage.setItem('theme', 'dark')
    } else {
        document.documentElement.removeAttribute('data-theme') // Возвращаемся к светлой теме
        localStorage.setItem('theme', 'light')
    }
}

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
    isMenuOpen.value = false
}

// Закрываем меню при изменении размера окна на десктопный
const handleResize = () => {
    if (window.innerWidth > 768 && isMenuOpen.value) {
        closeMenu()
    }
}

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

    window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
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
    position: relative;
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

/* Burger menu styles */
.burger-menu {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: 25px;
    height: 20px;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    z-index: 1001;
    /* Ensure it's above the overlay */
}

.burger-menu .line {
    width: 100%;
    height: 3px;
    background-color: var(--text-color);
    transition: all 0.3s ease;
}

.burger-menu .line1 {
    transform: rotate(45deg) translate(5px, 5px);
}

.burger-menu .line2 {
    opacity: 0;
}

.burger-menu .line3 {
    transform: rotate(-45deg) translate(5px, -5px);
}

.burger-menu:focus {
    outline: none;
}

/* Drawer styles */
.drawer {
    position: fixed;
    top: 0;
    right: 0;
    width: 80%;
    max-width: 300px;
    height: 100%;
    background-color: var(--background-color);
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.3);
    padding: 2rem 1rem;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.drawer-open {
    transform: translateX(0);
}

.drawer-links {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.drawer-links li a {
    text-decoration: none;
    color: var(--link-color);
    font-weight: 500;
    transition: color 0.3s;
}

.drawer-links li a:hover {
    color: var(--link-hover-color);
}

.drawer-controls {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 999;
    opacity: 1;
    transition: opacity 0.3s ease;
}

/* Hide Drawer on desktop */
@media (min-width: 769px) {
    .drawer {
        display: none;
    }
}

/* Responsive Styles */
@media (max-width: 768px) {
    .nav-links {
        display: none;
    }

    .controls {
        display: none;
    }

    .burger-menu {
        display: flex;
    }
}

@media (max-width: 480px) {
    .drawer {
        width: 90%;
    }
}
</style>
