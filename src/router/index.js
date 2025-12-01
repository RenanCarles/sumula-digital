import { createRouter, createWebHistory } from "vue-router";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: () => import("../components/Login.vue") },
  { path: "/register", component: () => import("../components/Register.vue") },

  // ROTAS PROTEGIDAS
  { path: "/home", component: () => import("../components/Home.vue"), meta: { requiresAuth: true } },
  { path: "/game-config", component: () => import("../components/GameConfig.vue"), meta: { requiresAuth: true } },
  { path: "/scoreboard", component: () => import("../components/Scoreboard.vue"), meta: { requiresAuth: true } },
  { path: "/game-scoreboard", component: () => import("../components/GameScoreboard.vue"), meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// --- GUARD GLOBAL ---
let authChecked = false;

router.beforeEach((to, from, next) => {
  if (!authChecked) {
    authChecked = true;

    onAuthStateChanged(auth, (user) => {
      if (to.meta.requiresAuth && !user) {
        return next("/login");
      }
      return next();
    });
  } else {
    const user = auth.currentUser;

    if (to.meta.requiresAuth && !user) {
      return next("/login");
    }

    next();
  }
});

export default router;
