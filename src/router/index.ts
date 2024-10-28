// src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const MainComponent = () => import('../components/MainComponent.vue')
const BookingForm = () => import('../components/forms/BookingForm.vue')

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: MainComponent
    },
    {
        path: '/booking',
        name: 'Booking',
        component: BookingForm
    },
    // Добавьте другие маршруты по необходимости
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
