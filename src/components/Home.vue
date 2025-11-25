<template>
  <div class="home-container">
    <div class="home-card">

      <!-- Cabeçalho com info do usuário -->
      <div class="user-info">
        <p>Logado como: <strong>{{ userEmail }}</strong></p>
        <button class="logout-btn" @click="logout">Sair</button>
      </div>

      <h1 class="home-title">SÚMULA DIGITAL</h1>
      <p class="home-subtitle">VÔLEI DE PRAIA</p>

      <div class="buttons-wrapper">

        <button class="home-button secondary" @click="goToTutorial">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z"/>
          </svg>
          TUTORIAL
        </button>

        <button class="home-button secondary" @click="goToHistory">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 3v5h5"></path>
            <path d="M3.05 13A9 9 0 1 0 5 5.27L3 8"></path>
            <path d="M12 7v5l3 3"></path>
          </svg>
          HISTÓRICO DE PARTIDAS
        </button>

        <button class="home-button secondary" @click="$router.push('/game-config')">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.06A1.65 1.65 0 0 0 11 3.09V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.06a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.06A1.65 1.65 0 0 0 21 11.91H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
          CONFIGURAR PARTIDA
        </button>

        <button class="home-button primary" @click="goToNewMatch">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          INICIAR NOVA PARTIDA
        </button>

        <p class="hint-text">Escolha uma opção para começar</p>

      </div>
    </div>
  </div>
</template>

<script>
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/config";

export default {
  name: "HomePage",

  data() {
    return {
      userEmail: "",
    };
  },

  created() {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        this.$router.push("/login");
      } else {
        this.userEmail = user.email;
      }
    });
  },

  methods: {
    logout() {
      signOut(auth).then(() => {
        this.$router.push("/login");
      });
    },

    goToNewMatch() {
      this.$router.push("/new-match");
    },
    goToHistory() {
      this.$router.push("/history");
    },
    goToTutorial() {
      this.$router.push("/tutorial");
    }
  }
};
</script>

<style scoped>
.user-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  color: white;
}

.logout-btn {
  background: rgba(255, 80, 80, 0.8);
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  font-weight: 600;
}
.logout-btn:hover {
  background: rgba(255, 60, 60, 0.95);
}

.home-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: linear-gradient(135deg, #1a2a6c 0%, #2b5876 50%, #4e79a6 100%);
}

.home-card {
  text-align: center;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  padding: 3.5rem 3rem;
  border-radius: 20px;
  max-width: 520px;
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
}

.home-title {
  color: white;
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.home-subtitle {
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2.5rem;
  font-size: 1.1rem;
}

.buttons-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.home-button {
  width: 100%;
  padding: 1rem 1.25rem;
  font-size: 1.05rem;
  border-radius: 12px;
  border: 1px solid transparent;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  letter-spacing: 0.3px;
  cursor: pointer;
  transition: 0.3s ease;
}

.home-button svg {
  color: white;
}

.primary {
  background: linear-gradient(90deg, #139428, #0fa03f);
  color: white;
  box-shadow: 0 4px 14px rgba(59, 130, 246, 0.4);
}

.primary:hover {
  transform: translateY(-2px);
}

.secondary {
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: rgba(255, 255, 255, 0.9);
}

.secondary:hover {
  background: rgba(255, 255, 255, 0.18);
}

.hint-text {
  margin-top: 1rem;
  color: rgba(255, 255, 255, 0.7);
}
</style>
