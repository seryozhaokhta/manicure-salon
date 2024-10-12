// src/i18n/index.ts
import { createI18n } from 'vue-i18n'
import en from './en.json'
import ru from './ru.json'
import ge from './ge.json'

const messages = {
    en,
    ru,
    ge
}

const i18n = createI18n({
    legacy: false, // Отключаем legacy mode для использования Composition API
    locale: 'en',
    fallbackLocale: 'en',
    messages,
    globalInjection: true // Добавляем глобальную инъекцию
})

export default i18n
