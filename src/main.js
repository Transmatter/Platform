import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'
import 'nprogress/nprogress.css'

// import tts from 'vue-text-to-speech'
createApp(App).use(router).use(store).mount('#app')
