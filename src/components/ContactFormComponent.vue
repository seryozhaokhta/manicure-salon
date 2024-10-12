<!-- src/components/ContactFormComponent.vue -->
<template>
    <div class="contact-form">
        <h2>{{ $t('contact.title') }}</h2>
        <form @submit.prevent="submitForm">
            <div>
                <label for="name">{{ $t('contact.name') }}</label>
                <input type="text" id="name" v-model="form.name" required />
            </div>
            <div>
                <label for="email">{{ $t('contact.email') }}</label>
                <input type="email" id="email" v-model="form.email" required />
            </div>
            <button type="submit">{{ $t('contact.submit') }}</button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
    name: '',
    email: ''
})

function submitForm() {
    // Здесь можно добавить логику отправки формы
    console.log('Form submitted:', form.value)
    alert('Спасибо за ваше сообщение!')
    form.value.name = ''
    form.value.email = ''
}
</script>

<style scoped>
.contact-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    max-width: 400px;
    margin: 0 auto;
    padding: 2rem;
    background-color: var(--background-color);
    color: var(--text-color);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.contact-form form div {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.contact-form input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    background-color: #fff;
    color: #000;
}

.contact-form button {
    align-self: center;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    background-color: var(--button-color);
    color: var(--text-color);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
}

.contact-form button:hover {
    background-color: var(--button-hover-color);
    color: #fff;
}
</style>
