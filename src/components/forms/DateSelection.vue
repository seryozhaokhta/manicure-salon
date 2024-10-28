<!-- src/components/forms/DateSelection.vue -->

<template>
    <div class="date-selection">
        <div class="form-group">
            <label for="date">{{ $t('contact.date') }}</label>
            <input type="date" id="date" v-model="selectedDate" @change="handleDateChange" required />
        </div>

        <div class="form-group" v-if="availableTimes.length">
            <label for="time">{{ $t('contact.time') }}</label>
            <select id="time" v-model="selectedTime" required>
                <option disabled value="">{{ $t('contact.select_time') }}</option>
                <option v-for="time in availableTimes" :key="time" :value="time">
                    {{ time }}
                </option>
            </select>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, defineEmits } from 'vue'
import { useI18n } from 'vue-i18n'
import type { MessageSchema } from '../../i18n'

const emits = defineEmits(['update-date', 'update-time'])

const { t } = useI18n()

// Пропсы
const props = defineProps({
    selectedSpecialist: {
        type: String,
        required: true
    },
    availableTimes: {
        type: Array as () => string[],
        default: () => []
    }
})

const selectedDate = ref<string>('')
const selectedTime = ref<string>('')

const handleDateChange = () => {
    emits('update-date', selectedDate.value)
}

watch(selectedTime, (newTime) => {
    emits('update-time', newTime)
})
</script>

<style scoped>
.date-selection {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
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
</style>
