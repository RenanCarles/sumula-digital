<template>
  <div class="login-container">
    <div class="login-card">
      <h1 class="login-title">Faça seu Login</h1>

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
            placeholder="Senha"
            class="input-field"
            required
          />
        </div>

        <label class="remember-me">
          <input v-model="rememberMe" type="checkbox" class="checkbox" />
          <span>Lembrar de mim</span>
        </label>

        <!-- Exibe mensagem de erro -->
        <p v-if="errorMessage" style="color: #ffbaba; text-align:center; margin-top:5px;">
          {{ errorMessage }}
        </p>

        <button type="submit" class="login-button">
          LOGIN
        </button>

      </form>

      <div class="divider">
        <span class="divider-text">OU</span>
      </div>

      <button @click="handleGoogleLogin" type="button" class="google-button">
        <svg class="google-icon" width="20" height="20" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Continuar com Google
      </button>

      <div class="signup-link">
        Não tem uma conta?
        <router-link to="/register" class="signup-text">Inscrever-se</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
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
    validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },

    async handleGoogleLogin() {
      this.errorMessage = "";
      
      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        
        console.log("Email do usuário logado com Google:", result.user.email);
        
        this.$router.push("/home");
      } catch (error) {
        console.error("Google login error:", error);
        this.errorMessage = "Erro ao fazer login com Google. Tente novamente.";
      }
    },

    async handleLogin() {
      this.errorMessage = "";

      // Verificar campos vazios
      if (!this.email || !this.password) {
        this.errorMessage = "Todos os campos devem ser preenchidos.";
        return;
      }

      // Verificar email válido
      if (!this.validateEmail(this.email)) {
        this.errorMessage = "Por favor, insira um e-mail válido.";
        return;
      }

      // Verificar senha mínima de 8 dígitos
      if (this.password.length < 8) {
        this.errorMessage = "A senha deve ter no mínimo 8 caracteres.";
        return;
      }

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

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 1.5rem 0;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

.divider-text {
  padding: 0 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
  font-weight: 500;
}

.google-button {
  width: 100%;
  padding: 0.875rem;
  background: white;
  color: #333;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.google-button:hover {
  background: #f8f9fa;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.google-button:active {
  transform: translateY(0);
}

.google-icon {
  width: 20px;
  height: 20px;
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