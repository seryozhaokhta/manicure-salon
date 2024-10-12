// src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MainComponent from '../components/MainComponent.vue'
import ContactFormComponent from '../components/ContactFormComponent.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: MainComponent
    },
    {
        path: '/contact',
        name: 'Contact',
        component: ContactFormComponent
    },
    // Добавьте другие маршруты по необходимости
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
