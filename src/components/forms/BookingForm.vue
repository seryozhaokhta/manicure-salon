<!-- src/components/forms/BookingForm.vue -->

<template>
    <div class="booking-form">
        <h2>{{ $t('contact.title') }}</h2>

        <form @submit.prevent="submitBooking">
            <div class="form-section">
                <ServiceSelection @update-services="updateServices" />
            </div>

            <div class="form-section">
                <SpecialistSelection :selectedServices="selectedServices" @update-specialist="updateSpecialist" />
            </div>

            <div class="form-section">
                <DateSelection :selectedSpecialist="selectedSpecialist" @update-date="updateDate"
                    @update-time="updateTime" :availableTimes="availableTimes" />
            </div>

            <div class="form-section">
                <div class="form-group">
                    <label for="name">{{ $t('contact.name') }}</label>
                    <input type="text" id="name" v-model="booking.name" required />
                </div>

                <div class="form-group">
                    <label for="email">{{ $t('contact.email') }}</label>
                    <input type="email" id="email" v-model="booking.email" required />
                </div>
            </div>

            <button type="submit">{{ $t('contact.submit') }}</button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { getAvailableTimes, createBooking } from '../../services/api'
import ServiceSelection from './ServiceSelection.vue'
import SpecialistSelection from './SpecialistSelection.vue'
import DateSelection from './DateSelection.vue'

const { t, messages, locale } = useI18n()

// Данные формы записи
const booking = ref<{
    name: string
    email: string
    service: string[]
    specialist: string
    date: string
    time: string
}>({
    name: '',
    email: '',
    service: [],
    specialist: '',
    date: '',
    time: ''
})

// Вычисляемые свойства для передачи в дочерние компоненты
const selectedServices = computed(() => booking.value.service)
const selectedSpecialist = computed(() => booking.value.specialist)

// Обработчики событий от подкомпонентов
const updateServices = (selectedServicesValue: string[]) => {
    booking.value.service = selectedServicesValue
    booking.value.specialist = ''
    booking.value.date = ''
    booking.value.time = ''
    availableTimes.value = []
}

const updateSpecialist = (selectedSpecialistValue: string) => {
    booking.value.specialist = selectedSpecialistValue
    booking.value.date = ''
    booking.value.time = ''
    fetchAvailableTimes()
}

const updateDate = (selectedDate: string) => {
    booking.value.date = selectedDate
    booking.value.time = ''
    fetchAvailableTimes()
}

const updateTime = (selectedTimeValue: string) => {
    booking.value.time = selectedTimeValue
}

// Список доступного времени
const availableTimes = ref<string[]>([])

// Функция для получения доступного времени
const fetchAvailableTimes = () => {
    if (!booking.value.date || !booking.value.specialist) {
        availableTimes.value = []
        return
    }

    getAvailableTimes(booking.value.specialist, booking.value.date, booking.value.service)
        .then(response => {
            availableTimes.value = response.data.times
        })
        .catch(error => {
            console.error('Ошибка при получении доступного времени:', error)
        })
}

// Функция для отправки записи
const submitBooking = () => {
    if (booking.value.service.length === 0) {
        alert('Пожалуйста, выберите хотя бы одну услугу.')
        return
    }

    createBooking({
        name: booking.value.name,
        email: booking.value.email,
        services: booking.value.service,
        specialist: booking.value.specialist,
        date: booking.value.date,
        time: booking.value.time
    })
        .then(response => {
            console.log('Запись успешно создана:', response.data)
            alert(t('contact.messages.success'))
            resetForm()
        })
        .catch(error => {
            console.error('Ошибка при создании записи:', error)
            alert(t('contact.messages.error'))
        })
}

// Функция для сброса формы
const resetForm = () => {
    booking.value = {
        name: '',
        email: '',
        service: [],
        specialist: '',
        date: '',
        time: ''
    }
    availableTimes.value = []
}
</script>

<style scoped>
.booking-form {
    display: flex;
    flex-direction: column;
    gap: 30px;
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    background-color: var(--background-color);
    color: var(--text-color);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    transition: background-color 0.3s, color 0.3s;
}

.booking-form h2 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 2em;
}

.form-section {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

button[type="submit"] {
    align-self: center;
    padding: 0.8em 2.4em;
    font-size: 1em;
    font-weight: 600;
    background-color: var(--button-color);
    color: var(--button-text-color);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
}

button[type="submit"]:hover {
    background-color: var(--button-hover-color);
    color: var(--button-hover-text-color);
}

/* Адаптивные стили */
@media (max-width: 768px) {
    .booking-form {
        padding: 1.5rem;
    }
}

@media (max-width: 480px) {
    .booking-form {
        padding: 1rem;
    }
}
</style>
