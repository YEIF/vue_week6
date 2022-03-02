import { createApp } from 'vue'
import 'bootstrap'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate'
import AllRules from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import ZhTw from './zh_TW.js'

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})

configure({
  generateMessage: localize({ zh_TW: ZhTw }),
  validateOnInput: true
})
setLocale('zh_TW')

/* ray start */
// import { localize, setLocale } from '@vee-validate/i18n'
// import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
// Object.keys(AllRules).forEach((rule) => {
//   defineRule(rule, AllRules[rule])
// })

// configure({
//   generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
//   validateOnInput: true // 當輸入任何內容直接進行驗證
// })
// // 設定預設語系
// setLocale('zh_TW')
/* ray end */

const app = createApp(App)
app.use(router)
app.use(VueAxios, axios)
app.component('VForm', Form)
app.component('VField', Field)
app.component('ErrorMessage', ErrorMessage)
app.mount('#app')
