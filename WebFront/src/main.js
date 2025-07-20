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







// import { createApp } from 'vue'
// import App from './App.vue'
// //import router from './router'
// import router from "./router/pagesRouter";
// const app = createApp(App)
// app.use(router)
// app.mount('#app')


















import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from "./router/pagesRouter";

// PrimeVue imports
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import Tooltip from 'primevue/tooltip'; // Added for v-tooltip directive
import ToastService from 'primevue/toastservice'
import Chart from 'primevue/chart'

// Styles PrimeVue
// import 'primevue/resources/themes/lara-light-indigo/theme.css'
// import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

import ConfirmationService from 'primevue/confirmationservice' 
import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import fr from './locales/fr.json';

// PrimeVue components
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Sidebar from 'primevue/sidebar';
import Card from 'primevue/card';
import ProgressBar from 'primevue/progressbar';
import Badge from 'primevue/badge';
import Menu from 'primevue/menu';
import Avatar from 'primevue/avatar';
import Chip from 'primevue/chip';
import Textarea from 'primevue/textarea';
import Dialog from 'primevue/dialog'; // Added for Products.vue
import DataTable from 'primevue/datatable'; // Added for Products.vue
import Column from 'primevue/column'; // Added for Products.vue
import Dropdown from 'primevue/dropdown'; // Added for Products.vue
import Checkbox from 'primevue/checkbox'; // Added for Products.vue

// Import views
// import Dashboard from './views/Dashboard.vue';
// import Orders from './views/Orders.vue';
// import Products from './views/Products.vue';
// import Customers from './views/Customers.vue';
// import Analytics from './views/Analytics.vue';
// import Marketing from './views/Marketing.vue';
// import Discounts from './views/Discounts.vue';
// import Settings from './views/Settings.vue';

// Import PrimeIcons and CSS
import 'primeicons/primeicons.css';
// import '@primeuix/themes/aura/theme.css'; // Ensure theme CSS is imported
// import 'primevue/resources/primevue.min.css'; // PrimeVue core CSS
// import 'primevue/resources/primevue.min.css'; // PrimeVue core CSS
import './assets/main.css'; // Custom styles (if any)

// Router configuration
// const routes = [
//   { path: '/', name: 'Dashboard', component: Dashboard },
//   { path: '/orders', name: 'Orders', component: Orders },
//   { path: '/products', name: 'Products', component: Products },
//   { path: '/customers', name: 'Customers', component: Customers },
//   { path: '/analytics', name: 'Analytics', component: Analytics },
//   { path: '/marketing', name: 'Marketing', component: Marketing },
//   { path: '/discounts', name: 'Discounts', component: Discounts },
//   { path: '/settings', name: 'Settings', component: Settings },
//   { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('./views/NotFound.vue') } // 404 route
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
//   scrollBehavior(to, from, savedPosition) {
//     if (savedPosition) {
//       return savedPosition;
//     }
//     return { top: 0 };
//   }
// });

const pinia = createPinia();

// Error handling middleware for router
router.beforeEach((to, from, next) => {
  console.log(`Navigating from ${from.path} to ${to.path} at ${new Date().toLocaleString('fr-FR', { timeZone: 'CET' })}`);
  next();
});

router.onError((error) => {
  console.error('Router error:', error);
});



const i18n = createI18n({
  locale: 'fr', // Default locale
  fallbackLocale: 'en',
  messages: { en, fr },
});



const app = createApp(App);

// Configure PrimeVue
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: '.dark',
      cssLayer: false
    }
  }
});

// Register directives
app.directive('tooltip', Tooltip);

// Use plugins
app.use(router);
app.use(pinia);


// Register global components
app.component('Button', Button);
app.component('InputText', InputText);
app.component('Sidebar', Sidebar);
app.component('Card', Card);
app.component('ProgressBar', ProgressBar);
app.component('Badge', Badge);
app.component('Menu', Menu);
app.component('Avatar', Avatar);
app.component('Chip', Chip);
app.component('Textarea', Textarea);
app.component('Dialog', Dialog);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Dropdown', Dropdown);
app.component('Checkbox', Checkbox);

// Performance optimization: Lazy load images and enable production tip
app.config.performance = process.env.NODE_ENV === 'development';
app.config.errorHandler = (err, vm, info) => {
  console.error(`Error: ${err.toString()}`, info);
};

app.use(PrimeVue);
app.use(ToastService)
app.use(ConfirmationService)
app.use(pinia);
app.use(i18n);
app.component('Chart', Chart)
// Mount the app
app.mount('#app');



