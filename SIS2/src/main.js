import { createApp } from 'vue'
import App from './App.vue'
import BaseButton from './components/BaseButton.vue'
import BaseCard from './components/BaseCard.vue'

const app = createApp(App)
// Global components: available in every template without importing
app.component('BaseButton', BaseButton)
app.component('BaseCard', BaseCard)
app.mount('#app')
