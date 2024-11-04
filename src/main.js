import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store/store'

const app = createApp(App)

app.use(router).use(store).use(vuetify)

app.mount('#app')
