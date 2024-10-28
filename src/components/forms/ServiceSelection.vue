<!-- src/components/forms/ServiceSelection.vue -->

<template>
    <div class="service-selection">
        <label>{{ $t('contact.service') }}</label>
        <div class="services">
            <div v-for="(category, categoryKey) in services" :key="categoryKey" class="service-category">
                <h3>{{ category.title }}</h3>
                <div class="service-items">
                    <div v-for="(service, serviceKey) in category.items" :key="serviceKey" class="service-item"
                        :class="{ selected: selectedServices.includes(serviceKey.toString()) }"
                        @click="toggleService(serviceKey.toString())">
                        <h4>{{ service.name }}</h4>
                        <p>{{ service.duration }}</p>
                        <p>{{ service.price }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, defineEmits } from 'vue'
import { useI18n } from 'vue-i18n'
import type { MessageSchema } from '../../i18n'

const emits = defineEmits(['update-services'])

const { t, messages, locale } = useI18n()

// Данные формы записи
const selectedServices = ref<string[]>([])

// Получаем сообщения для текущей локали
const currentMessages = computed<MessageSchema>(() => {
    return messages.value[locale.value] as unknown as MessageSchema
})

// Услуги из сообщений i18n
const services = computed(() => {
    return currentMessages.value.contact.services || {}
})

// Функция для переключения услуги
const toggleService = (serviceKey: string) => {
    const index = selectedServices.value.indexOf(serviceKey)
    if (index > -1) {
        // Услуга уже выбрана, удаляем её
        selectedServices.value.splice(index, 1)
    } else {
        // Услуга не выбрана, добавляем её
        selectedServices.value.push(serviceKey)
    }
    // Эмитируем обновление выбранных услуг
    emits('update-services', selectedServices.value)
}
</script>

<style scoped>
.service-selection {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.service-selection label {
    font-weight: 500;
    font-size: 1em;
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

/* Адаптивные стили */
@media (max-width: 768px) {
    .service-item {
        flex: 1 1 100%;
    }
}

@media (max-width: 480px) {
    .service-item {
        flex: 1 1 100%;
    }
}
</style>
