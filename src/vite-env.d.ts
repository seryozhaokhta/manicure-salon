// C:\Users\panca\Desktop\manicure-salon\src\vite-env.d.ts

/// <reference types="vite/client" />

declare module '*.vue' {
    import { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}
