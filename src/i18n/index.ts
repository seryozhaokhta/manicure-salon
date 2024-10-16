// src/i18n/index.ts
import { createI18n } from 'vue-i18n'

// Определяем и экспортируем интерфейс MessageSchema
export interface MessageSchema {
    header: {
        home: string
        services: string
        contact: string
    }
    footer: {
        copyright: string
    }
    main: {
        welcomeTitle: string
        description: string
    }
    contact: {
        title: string
        name: string
        email: string
        service: string
        specialist: string
        date: string
        time: string
        select_service: string
        select_specialist: string
        select_time: string
        submit: string
        alteg_title: string
        services: {
            [categoryKey: string]: {
                title: string
                items: {
                    [serviceKey: string]: {
                        name: string
                        duration: string
                        price: string
                    }
                }
            }
        }
        specialists: {
            [id: string]: string
        }
        messages: {
            success: string
            error: string
        }
    }
}

import en from './en.json'
import ru from './ru.json'
import ge from './ge.json'

// Создаем объект messages без приведения типов
const messages = {
    en,
    ru,
    ge
}

// Создаем экземпляр i18n без явных типов
const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages,
    globalInjection: true
})

export default i18n
