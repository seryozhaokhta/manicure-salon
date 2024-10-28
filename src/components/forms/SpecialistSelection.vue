<!-- src/components/forms/SpecialistSelection.vue -->

<template>
    <div class="specialist-selection">
        <label>{{ $t('contact.specialist') }}</label>
        <div class="specialists">
            <div v-for="specialist in availableSpecialists" :key="specialist.id" class="specialist-item"
                :class="{ selected: selectedSpecialist === specialist.id }" @click="selectSpecialist(specialist.id)">
                <img :src="specialist.avatar" :alt="specialist.name" class="avatar" />
                <span>{{ specialist.name }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, defineEmits } from 'vue'
import { useI18n } from 'vue-i18n'
import type { MessageSchema } from '../../i18n'

interface Specialist {
    id: string
    name: string
    avatar: string
}

const emits = defineEmits(['update-specialist'])

const { t, messages, locale } = useI18n()

// Пропсы
const props = defineProps({
    selectedServices: {
        type: Array as () => string[],
        default: () => []
    }
})

// Получаем сообщения для текущей локали
const currentMessages = computed<MessageSchema>(() => {
    return messages.value[locale.value] as unknown as MessageSchema
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
function getAvatarById(id: string): string {
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

// Логика фильтрации специалистов на основе выбранных услуг
const availableSpecialists = computed<Specialist[]>(() => {
    if (props.selectedServices.length === 0) return specialistsList.value
    // Здесь можно добавить логику фильтрации специалистов по выбранным услугам
    // Например, если у специалиста есть определенные навыки
    return specialistsList.value
})

const selectedSpecialist = ref<string>('')

const selectSpecialist = (id: string) => {
    selectedSpecialist.value = id
    emits('update-specialist', id)
}
</script>

<style scoped>
.specialist-selection {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.specialist-selection label {
    font-weight: 500;
    font-size: 1em;
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

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #fff;
}
</style>
