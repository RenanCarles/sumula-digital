import { createRouter, createWebHistory } from "vue-router";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

const routes = [
  { path: "/", component: () => import("../components/LandingPage.vue") },
  { path: "/login", component: () => import("../components/Login.vue") },
  { path: "/register", component: () => import("../components/Register.vue") },

  // ROTAS PROTEGIDAS
  { 
    path: "/home", 
    name: "Home",
    component: () => import("../components/Home.vue"), 
    meta: { requiresAuth: true } 
  },
  { 
    path: "/game-config", 
    name: "GameConfig",
    component: () => import("../components/GameConfig.vue"), 
    meta: { requiresAuth: true } 
  },
  { 
    path: "/game-scoreboard", 
    name: "GameScoreboard",
    component: () => import("../components/ScoreboardGame.vue"), 
    meta: { requiresAuth: true } 
  },
  { 
    path: "/history", 
    name: "History",
    component: () => import("../components/History.vue"), 
    meta: { requiresAuth: true } 
  },
  { 
    path: "/match/:id", 
    name: "MatchDetail",
    component: () => import("../components/MatchDetail.vue"), 
    meta: { requiresAuth: true } 
  },
  { 
    path: "/tutorial", 
    name: "Tutorial",
    component: () => import("../components/Tutorial.vue"), 
    meta: { requiresAuth: true } 
  }
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
