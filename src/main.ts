import { createApp } from 'vue';
import components from './components/UI/index.ts';
import App1 from './App1.vue';

const app = createApp(App1)


components.forEach(component => {
    app.component(component.name, component)
})




app.mount('#app')
