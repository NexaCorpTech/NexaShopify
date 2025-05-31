// import { createRouter, createWebHistory } from "vue-router";
// import HomeView from "@/views/HomeView.vue";
// import LoginView from "@/views/LoginView.vue";
// import SignupView from "@/views/SignupView.vue";
// import InitialView from "@/views/InitialView.vue";
// import BuyerHome from "@/views/BuyerHome.vue";

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     { path: "/", name: "default", component: InitialView },
//     { path: "/home", name: "home", component: HomeView },
//     { path: "/login", name: "login", component: LoginView },
//     { path: "/register", name: "register", component: SignupView },
//     { path: "/buyer", name: "buyerhome", component: BuyerHome }
//   ],
// });

// export default router;
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import InitialView from "@/views/InitialView.vue";
import BuyerHome from "@/views/BuyerHome.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "default", component: InitialView },
    { path: "/home", name: "home", component: HomeView },
    { path: "/buyer", name: "buyerhome", component: BuyerHome }
  ],
});

// Ajoutez ces gestionnaires de navigation
router.beforeEach((to, from, next) => {
  // Afficher le spinner au début de chaque navigation
  const spinner = document.getElementById('nb-global-spinner');
  if (spinner) spinner.style.display = 'flex';
  
  next();
});

router.afterEach(() => {
  // Cacher le spinner après un court délai
  setTimeout(() => {
    const spinner = document.getElementById('nb-global-spinner');
    if (spinner) spinner.style.display = 'none';
  }, 300);
});

router.onError((error) => {
  // Cacher le spinner en cas d'erreur
  const spinner = document.getElementById('nb-global-spinner');
  if (spinner) spinner.style.display = 'none';
  console.error("Erreur de navigation :", error);
});

export default router;