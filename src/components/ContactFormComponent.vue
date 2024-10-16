<!-- src/components/ContactFormComponent.vue -->

<template>
    <div class="contact-form">
        <h2>{{ $t('contact.title') }}</h2>

        <!-- Форма записи -->
        <form @submit.prevent="submitBooking">
            <!-- Имя -->
            <div class="form-group">
                <label for="name">{{ $t('contact.name') }}</label>
                <input type="text" id="name" v-model="booking.name" required />
            </div>

            <!-- Электронная почта -->
            <div class="form-group">
                <label for="email">{{ $t('contact.email') }}</label>
                <input type="email" id="email" v-model="booking.email" required />
            </div>

            <!-- Выбор услуги -->
            <div class="form-group">
                <label>{{ $t('contact.service') }}</label>
                <div class="services">
                    <div v-for="(category, categoryKey) in services" :key="categoryKey" class="service-category">
                        <h3>{{ category.title }}</h3>
                        <div class="service-items">
                            <div v-for="(service, serviceKey) in category.items" :key="serviceKey" class="service-item"
                                :class="{ selected: booking.service === serviceKey }"
                                @click="() => selectService(serviceKey.toString())">
                                <h4>{{ service.name }}</h4>
                                <p>{{ service.duration }}</p>
                                <p>{{ service.price }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Выбор специалиста -->
            <div class="form-group">
                <label>{{ $t('contact.specialist') }}</label>
                <div class="specialists">
                    <div v-for="specialist in availableSpecialists" :key="specialist.id" class="specialist-item"
                        :class="{ selected: booking.specialist === specialist.id }"
                        @click="selectSpecialist(specialist.id)">
                        <img :src="specialist.avatar" :alt="specialist.name" class="avatar" />
                        <span>{{ specialist.name }}</span>
                    </div>
                </div>
            </div>

            <!-- Выбор даты -->
            <div class="form-group">
                <label for="date">{{ $t('contact.date') }}</label>
                <input type="date" id="date" v-model="booking.date" @change="fetchAvailableTimes" required />
            </div>

            <!-- Выбор времени -->
            <div class="form-group" v-if="availableTimes.length">
                <label for="time">{{ $t('contact.time') }}</label>
                <select id="time" v-model="booking.time" required>
                    <option disabled value="">{{ $t('contact.select_time') }}</option>
                    <option v-for="time in availableTimes" :key="time" :value="time">
                        {{ time }}
                    </option>
                </select>
            </div>

            <!-- Кнопка отправки -->
            <button type="submit">{{ $t('contact.submit') }}</button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import axios from 'axios'
import type { MessageSchema } from '../i18n' // Используем import type

const { t, messages, locale } = useI18n()

// Получаем сообщения для текущей локали
const currentMessages = computed<MessageSchema>(() => {
    return messages.value[locale.value] as unknown as MessageSchema
})

// Данные формы записи
const booking = ref<{
    name: string
    email: string
    service: string
    specialist: string
    date: string
    time: string
}>({
    name: '',
    email: '',
    service: '',
    specialist: '',
    date: '',
    time: ''
})

// Интерфейсы
interface ServiceItem {
    name: string
    duration: string
    price: string
}

interface ServiceCategory {
    title: string
    items: {
        [key: string]: ServiceItem
    }
}

interface Services {
    [category: string]: ServiceCategory
}

interface Specialist {
    id: string
    name: string
    avatar: string
}

// Услуги из сообщений i18n
const services = computed<Services>(() => {
    return currentMessages.value.contact.services || {}
})

// Специалисты из сообщений i18n
const specialists = computed<{ [id: string]: string }>(() => {
    return currentMessages.value.contact.specialists || {}
})

// Преобразуем специалистов в массив объектов для отображения
const specialistsList = computed<Specialist[]>(() => {
    return Object.entries(specialists.value).map(([id, name]) => ({
        id,
        name: name as string,
        avatar: getAvatarById(id)
    }))
})

// Функция для получения аватара специалиста по id
function getAvatarById(id: string) {
    switch (id) {
        case '1':
            return new URL('@/assets/manicure/1-picture.jpg', import.meta.url).href
        case '2':
            return new URL('@/assets/manicure/2-picture.jpg', import.meta.url).href
        case '3':
            return new URL('@/assets/manicure/3-picture.jpg', import.meta.url).href
        default:
            return ''
    }
}

// Список доступных специалистов на основе выбранной услуги
const availableSpecialists = computed<Specialist[]>(() => {
    if (!booking.value.service) return specialistsList.value
    // Здесь можно добавить фильтрацию специалистов по услуге, если требуется
    return specialistsList.value
})

// Список доступного времени
const availableTimes = ref<string[]>([])

function fetchAvailableTimes() {
    if (!booking.value.date || !booking.value.specialist) {
        availableTimes.value = []
        return
    }

    // Пример получения доступного времени с API Alteг
    axios.get('https://api.alteg.com/available-times', {
        params: {
            specialist_id: booking.value.specialist,
            date: booking.value.date,
            service: booking.value.service
        }
    })
        .then(response => {
            availableTimes.value = response.data.times
        })
        .catch(error => {
            console.error('Ошибка при получении доступного времени:', error)
        })
}

function submitBooking() {
    axios.post('https://api.alteg.com/bookings', {
        name: booking.value.name,
        email: booking.value.email,
        service: booking.value.service,
        specialist: booking.value.specialist,
        date: booking.value.date,
        time: booking.value.time
    })
        .then(response => {
            console.log('Запись успешно создана:', response.data)
            alert(t('contact.messages.success'))
            booking.value = {
                name: '',
                email: '',
                service: '',
                specialist: '',
                date: '',
                time: ''
            }
            availableTimes.value = []
        })
        .catch(error => {
            console.error('Ошибка при создании записи:', error)
            alert(t('contact.messages.error'))
        })
}

function selectService(serviceKey: string) {
    booking.value.service = serviceKey
    booking.value.specialist = ''
    booking.value.time = ''
    availableTimes.value = []
}

function selectSpecialist(specialistId: string) {
    booking.value.specialist = specialistId
    booking.value.time = ''
    fetchAvailableTimes()
}
</script>

<style scoped>
.contact-form {
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

.contact-form h2 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 2em;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.form-group label {
    font-weight: 500;
    font-size: 1em;
}

.form-group input,
.form-group select {
    padding: 0.8rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
    background-color: #fff;
    color: #000;
    transition: border-color 0.3s;
}

.form-group input:focus,
.form-group select:focus {
    border-color: var(--link-color);
    outline: none;
}

.services {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.service-category h3 {
    margin-bottom: 10px;
    font-size: 1.2em;
    color: var(--link-color);
}

.service-items {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
}

.service-item {
    flex: 1 1 calc(50% - 15px);
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s;
    background-color: #f9f9f9;
}

.service-item.selected {
    background-color: var(--link-color);
    color: #fff;
    border-color: var(--link-color);
}

.service-item:hover {
    background-color: var(--link-hover-color);
    color: #fff;
    border-color: var(--link-hover-color);
}

.service-item h4 {
    margin: 0 0 5px 0;
    font-size: 1.1em;
}

.service-item p {
    margin: 2px 0;
    font-size: 0.95em;
}

.specialists {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
}

.specialist-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s;
    background-color: #f9f9f9;
}

.specialist-item.selected {
    background-color: var(--link-color);
    color: #fff;
    border-color: var(--link-color);
}

.specialist-item:hover {
    background-color: var(--link-hover-color);
    color: #fff;
    border-color: var(--link-hover-color);
}

.specialist-item .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #fff;
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

/* Responsive Styles */
@media (max-width: 768px) {
    .contact-form {
        padding: 1.5rem;
    }

    .service-item {
        flex: 1 1 100%;
    }

    .specialist-item {
        flex: 1 1 45%;
    }
}

@media (max-width: 480px) {
    .contact-form {
        padding: 1rem;
    }

    .service-item {
        flex: 1 1 100%;
    }

    .specialist-item {
        flex: 1 1 100%;
    }
}
</style>
