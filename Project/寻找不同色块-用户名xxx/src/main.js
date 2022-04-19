import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

import './less/index.less';

createApp(App).use(ElementPlus).mount('#app')

