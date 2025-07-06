// import { createApp } from "vue";
// import App from "./App.vue";
// import router from "./router/pagesRouter";
// import '@fortawesome/fontawesome-free/css/all.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import "./scripts/imports";
// import PrimeVue from 'primevue/config';
// import Aura from '@primeuix/themes/aura';
// import { createPinia } from 'pinia'

// // Import des icônes Font Awesome
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faStore, faSearch, faUser, faHeart, faShoppingCart, faMobileAlt, faTshirt, faHome, faHeart as faSolidHeart, faDumbbell, faBook, faUtensils, faGamepad, faPlus, faArrowRight } from '@fortawesome/free-solid-svg-icons'
// import { faFacebookF, faTwitter, faInstagram, faPinterest } from '@fortawesome/free-brands-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// // Ajout des icônes à la bibliothèque
// library.add(
//     faStore, faSearch, faUser, faHeart, faShoppingCart, 
//     faMobileAlt, faTshirt, faHome, faSolidHeart, 
//     faDumbbell, faBook, faUtensils, faGamepad, faPlus, faArrowRight,
//     faFacebookF, faTwitter, faInstagram, faPinterest
//   )

// const app = createApp(App);

// app.use(router);
// app.use(PrimeVue, {
//     theme: {
//         preset: Aura
//     }
// });
// app.use(createPinia())
// app.component('font-awesome-icon', FontAwesomeIcon)
//  app.mount("#app");
// Monter l'application et émettre l'événement
// app.mount('#app').then(() => {
//     // Émettre l'événement quand l'app est montée
//     window.dispatchEvent(new Event('vue-mounted'))
//   })


import { createApp } from 'vue'
import App from './App.vue'
//import router from './router'
import router from "./router/pagesRouter";
import { createPinia } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import Toast from "vue-toastification";
// Import the CSS of vue-toastification
import "vue-toastification/dist/index.css";


const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(Toast)

app.mount('#app')

// Initialisation du token (important)
const auth = useAuthStore()
auth.initialize()