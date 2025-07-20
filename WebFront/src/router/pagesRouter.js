import { createRouter, createWebHistory } from "vue-router";
import HowItWorks from '@/views/HowItWorks.vue'
const routes = [
  { 
    path: "/", 
    name: "home", 
    component: () => import("@/views/InitialView.vue"),
    meta: { title: "Accueil - NexaShop" }
  },
  { 
    path: "/products", 
    name: "products", 
    component: () => import("@/views/ProductsView.vue"), // applying Lazy Loading 
    meta: { title: "Produits - NexaShop" }
  },
  // { 
  //   path: "/buyer", 
  //   name: "buyerhome", 
  //   component: () => import("@/views/BuyerHome.vue"),
  //   meta: { title: "Espace acheteur - NexaShop" }
  // },
  { 
    path: "/seller", 
    name: "seller-dashboard", 
    component: () => import("@/views/SellerDashboard.vue"),
    meta: { title: "Tableau de bord vendeur - NexaShop" }
  },
  { 
    path: "/create-shop", 
    name: "create-shop", 
    component: () => import("@/views/CreateShopView.vue"),
    meta: { title: "Créer votre boutique - NexaShop" }
  },
  { 
    path: "/login", 
    name: "login", 
    component: () => import("@/views/LoginView.vue"),
    meta: { title: "Connexion - NexaShop" }
  },
  { 
    path: "/register", 
    name: "register", 
    component: () => import("@/views/SignupView.vue"),
    meta: { title: "Inscription - NexaShop" }
  },
  {
    path: '/how-it-works',
    name: 'HowItWorks',
    component: HowItWorks,
    meta: { title: 'Comment ça marche' }
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import("@/views/AdminDashboard.vue"),
    meta: { title: "Tableau de bord Admin - NexaShop" }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// Gestion du titre
router.beforeEach((to) => {
  document.title = to.meta.title || 'NexaShop';
});

// Gestion du spinner - version corrigée
router.beforeEach(() => {
  const spinner = document.getElementById('nb-global-spinner');
  if (spinner) {
    spinner.style.display = 'flex';
    spinner.style.opacity = '1';
  }
});

router.afterEach(() => {
  setTimeout(() => {
    const spinner = document.getElementById('nb-global-spinner');
    if (spinner) {
      spinner.style.opacity = '0';
      setTimeout(() => {
        spinner.style.display = 'none';
      }, 500);
    }
  }, 300);
});

router.onError((error) => {
  const spinner = document.getElementById('nb-global-spinner');
  if (spinner) spinner.style.display = 'none';
  console.error("Erreur de navigation :", error);
});

export default router;