<template>
  <div class="login-container">
    <div class="login-card">
      <h1 class="login-title">Login</h1>

      <form @submit.prevent="handleLogin" class="login-form">

        <div class="input-group">
          <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M16 12a4 4 0 0 1-8 0"></path>
            <rect x="2" y="4" width="20" height="16" rx="2"></rect>
          </svg>

          <input
            v-model="email"
            type="email"
            placeholder="Email"
            class="input-field"
            required
          />
        </div>

        <div class="input-group">
          <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>

          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="input-field"
            required
          />
        </div>

        <label class="remember-me">
          <input v-model="rememberMe" type="checkbox" class="checkbox" />
          <span>Remember me</span>
        </label>

        <!-- Exibe mensagem de erro -->
        <p v-if="errorMessage" style="color: #ffbaba; text-align:center; margin-top:5px;">
          {{ errorMessage }}
        </p>

        <button type="submit" class="login-button">
          LOGIN
        </button>

      </form>

      <div class="signup-link">
        New here?
        <router-link to="/register" class="signup-text">Sign Up</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

export default {
  name: "LoginPage",

  data() {
    return {
      email: "",
      password: "",
      rememberMe: false,
      errorMessage: ""
    };
  },

  methods: {
    async handleLogin() {
      this.errorMessage = "";

      try {
        await signInWithEmailAndPassword(auth, this.email, this.password);

        // Redireciona ao logar para home
        this.$router.push("/home");
      } catch (error) {
        console.error(error);
        this.errorMessage = "E-mail ou senha incorretos.";
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a2a6c 0%, #2b5876 50%, #4e79a6 100%);
  padding: 1rem;
}

.login-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem 2.5rem;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.login-title {
  color: white;
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 2rem;
  letter-spacing: 0.5px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.input-group {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 1rem;
  color: rgba(255, 255, 255, 0.6);
  pointer-events: none;
  z-index: 1;
}

.input-field {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 3rem;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  color: white;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.input-field::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.input-field:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.5);
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  cursor: pointer;
  user-select: none;
}

.checkbox {
  width: 1rem;
  height: 1rem;
  cursor: pointer;
  accent-color: #4a90e2;
}

.login-button {
  width: 100%;
  padding: 0.875rem;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
}

.login-button:hover {
  background: #357abd;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.4);
}

.login-button:active {
  transform: translateY(0);
}

.signup-link {
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.signup-text {
  color: white;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.3s ease;
}

.signup-text:hover {
  opacity: 0.8;
}

@media (max-width: 480px) {
  .login-card {
    padding: 2rem 1.5rem;
  }
  
  .login-title {
    font-size: 1.75rem;
  }
}
</style>