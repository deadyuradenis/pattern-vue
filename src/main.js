import 'virtual:svg-icons-register'

import { createApp } from 'vue'

import App from '@/App.vue'
import router from '@router/router.js';
import store from '@store';

import '@theme';

import UiComponents from '@components/ui-components/components';
import UiTransitionsComponents from '@components/ui-components/transitions';

const app = createApp(App)

UiComponents.forEach(UiComponent => {
    app.component(UiComponent.name, UiComponent)
})

UiTransitionsComponents.forEach(UiTransitionsComponent => {
    app.component(UiTransitionsComponent.name, UiTransitionsComponent)
})

app
    .use(router)
    .use(store)
    .mount('#app');
