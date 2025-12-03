<template>
  <div class="landing-container">
    <div class="landing-content">
      <!-- NAV -->
      <header class="landing-header">
        <div class="logo-section">
          <div class="logo-icon">
            <span class="logo-text">SD</span>
          </div>
          <div class="logo-description">
            <span>Súmula digital para vôlei de praia</span>
          </div>
        </div>

        <nav class="nav-links">
          <a href="#features">Funcionalidades</a>
          <a href="#como-funciona">Como funciona</a>
        </nav>

        <div class="nav-buttons">
          <button class="btn-secondary" @click="$router.push('/login')">
            Entrar
          </button>
          <button class="btn-primary" @click="$router.push('/register')">
            Começar grátis
          </button>
        </div>
      </header>

      <!-- HERO -->
      <main class="hero-section">
        <section class="hero-content">
          <div class="hero-text">
            <span class="badge">
              <span class="badge-dot"></span>
              Otimizado para quadras de areia
            </span>

            <h1 class="hero-title">
              Súmula digital em tempo real para vôlei de praia.
            </h1>

            <p class="hero-description">
              Controle sets, pontos, trocas de lado e cartões em uma única
              tela. Pensado para árbitros, organizadores e ligas de vôlei de
              praia que precisam de precisão sem perder agilidade.
            </p>
          </div>

          <dl class="stats-grid">
            <div class="stat-card">
              <dt>Torneios geridos</dt>
              <dd>120+</dd>
            </div>
            <div class="stat-card">
              <dt>Partidas registradas</dt>
              <dd>6.500+</dd>
            </div>
          </dl>
        </section>

        <!-- HERO PREVIEW -->
        <section class="hero-preview">
          <ScoreboardPreview />
        </section>
      </main>

      <!-- FEATURES -->
      <section id="features" class="features-section">
        <div class="features-header">
          <h2>Pensado para o ritmo da areia.</h2>
          <p>
            Configure o formato da partida em segundos, mantenha o foco na
            quadra e deixe que o sistema cuide da súmula, estatísticas e
            histórico.
          </p>
        </div>

        <div class="features-grid">
          <article class="feature-card">
            <div class="feature-icon sky">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            </div>
            <h3>Placar ao vivo</h3>
            <p>
              Atualize pontos com um toque, veja automaticamente lado de
              saque, rotação e trocas de lado configuradas para vôlei de
              praia.
            </p>
          </article>

          <article class="feature-card">
            <div class="feature-icon emerald">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
            <h3>Súmula automática</h3>
            <p>
              Gere o resumo completo da partida com sets, cartões, tempos e
              observações sem preencher campos manualmente após o jogo.
            </p>
          </article>

          <article class="feature-card">
            <div class="feature-icon amber">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
            </div>
            <h3>Multi-dispositivo</h3>
            <p>
              Use tablets ou notebooks na mesa de arbitragem, sempre com a mesma interface.
            </p>
          </article>
        </div>
      </section>

      <!-- COMO FUNCIONA -->
      <section id="como-funciona" class="how-it-works-section">
        <div class="how-it-works-content">
          <h2>Como funciona em uma etapa de torneio</h2>
          <ol class="steps-list">
            <li>
              <span class="step-number">1. Configure</span>
              • Defina melhor de 1, 3 ou 5 sets, pontos de cada set e
              regras de troca de lado (7/7/5, 5/5/3 ou personalizado).
            </li>
            <li>
              <span class="step-number">2. Registre</span>
              • Marque pontos, tempos, cartões e correções em tempo
              real, enquanto o sistema calcula tudo para a súmula.
            </li>
            <li>
              <span class="step-number">3. Compartilhe</span>
              • Finalize a partida e envie a súmula em PDF ou link para
              comissão técnica, atletas e organização.
            </li>
          </ol>
        </div>

        <div class="how-it-works-highlight">
          <div class="highlight-header">
            <p>Perto da quadra, não do papel.</p>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          </div>
          <p>
            Elimine rabiscos na areia, súmulas molhadas e confusão em finais
            ponto a ponto. Tudo fica salvo, organizado e pronto para consulta
            a qualquer momento.
          </p>
        </div>
      </section>

      <!-- CTA FINAL -->
      <section class="cta-section">
        <div class="cta-content">
          <h2>Pronto para testar na próxima etapa de vôlei de praia?</h2>
          <p>
            Crie sua conta em poucos minutos, cadastre quadras, categorias e
            partidas, e leve a súmula digital para a areia já na próxima
            rodada.
          </p>
          <button class="cta-button" @click="$router.push('/register')">
            Criar conta gratuita
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
        </div>
      </section>

      <!-- FOOTER -->
      <footer class="landing-footer">
        <span>© 2025 • Súmula digital para vôlei de praia</span>
        <div class="footer-links">
          <a href="#termos">Termos</a>
          <a href="#privacidade">Privacidade</a>
          <a href="#contato">Contato</a>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import ScoreboardPreview from './ScoreboardPreview.vue'

export default {
  name: 'LandingPage',
  components: {
    ScoreboardPreview
  }
}
</script>

<style scoped>
.landing-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a2a6c 0%, #2b5876 50%, #4e79a6 100%);
  color: white;
}

.landing-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

/* HEADER */
.landing-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #60a5fa, #34d399, #fbbf24);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px rgba(96, 165, 250, 0.4);
}

.logo-text {
  font-size: 0.875rem;
  font-weight: 700;
  color: #1a2a6c;
}

.logo-description {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
}

.nav-links {
  display: none;
  gap: 1.5rem;
}

.nav-links a {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: #60a5fa;
}

.nav-buttons {
  display: flex;
  gap: 0.75rem;
}

.btn-secondary {
  display: none;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
}

.btn-primary {
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #34d399, #60a5fa);
  border: none;
  color: #1a2a6c;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 14px rgba(52, 211, 153, 0.4);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(52, 211, 153, 0.6);
}

/* HERO */
.hero-section {
  display: grid;
  gap: 3rem;
}

.hero-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.hero-text {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;
  padding: 0.5rem 1rem;
  background: rgba(96, 165, 250, 0.15);
  border: 1px solid rgba(96, 165, 250, 0.3);
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #93c5fd;
}

.badge-dot {
  width: 6px;
  height: 6px;
  background: #34d399;
  border-radius: 50%;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  color: white;
}

.hero-description {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.7;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  padding: 1rem 1.25rem;
  backdrop-filter: blur(10px);
}

.stat-card dt {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.5rem;
}

.stat-card dd {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin: 0;
}

.hero-preview {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* FEATURES */
.features-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.features-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.features-header h2 {
  font-size: 2rem;
  font-weight: 700;
  color: white;
}

.features-header p {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
}

.features-grid {
  display: grid;
  gap: 1.5rem;
}

.feature-card {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all 0.3s ease;
}

.feature-card:hover {
  background: rgba(255, 255, 255, 0.12);
  transform: translateY(-4px);
}

.feature-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
}

.feature-icon.sky {
  background: #60a5fa;
  color: #1a2a6c;
}

.feature-icon.emerald {
  background: #34d399;
  color: #1a2a6c;
}

.feature-icon.amber {
  background: #fbbf24;
  color: #1a2a6c;
}

.feature-card h3 {
  font-size: 1.125rem;
  font-weight: 700;
  color: white;
  margin: 0;
}

.feature-card p {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin: 0;
}

/* HOW IT WORKS */
.how-it-works-section {
  display: grid;
  gap: 2rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  padding: 2rem;
}

.how-it-works-content h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
}

.steps-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.steps-list li {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.7;
}

.step-number {
  font-weight: 700;
  color: white;
}

.how-it-works-highlight {
  background: linear-gradient(135deg, rgba(14, 116, 144, 0.3), rgba(30, 58, 138, 0.3), rgba(6, 78, 59, 0.3));
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.highlight-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.highlight-header p {
  font-size: 1rem;
  font-weight: 700;
  color: white;
  margin: 0;
}

.highlight-header svg {
  color: #fbbf24;
}

.how-it-works-highlight > p {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.7;
  margin: 0;
}

/* CTA */
.cta-section {
  margin-bottom: 2rem;
}

.cta-content {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  padding: 2.5rem 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.cta-content h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: white;
  margin: 0;
}

.cta-content p {
  max-width: 600px;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.7;
  margin: 0;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  background: linear-gradient(135deg, #34d399, #60a5fa);
  border: none;
  color: #1a2a6c;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(52, 211, 153, 0.4);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(52, 211, 153, 0.6);
}

/* FOOTER */
.landing-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 0.75rem;
  color: white;
}

.footer-links {
  display: flex;
  gap: 1.5rem;
}

.footer-links a {
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: rgba(255, 255, 255, 0.7);
}

/* RESPONSIVE */
@media (min-width: 768px) {
  .nav-links {
    display: flex;
  }

  .btn-secondary {
    display: inline-flex;
  }

  .hero-section {
    grid-template-columns: 1.2fr 1fr;
  }

  .features-header {
    flex-direction: row;
    align-items: flex-end;
  }

  .features-header p {
    max-width: 500px;
    margin-left: auto;
  }

  .features-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .how-it-works-section {
    grid-template-columns: 1.1fr 1fr;
  }

  .landing-footer {
    flex-direction: row;
    justify-content: space-between;
  }
}

@media (min-width: 1024px) {
  .hero-title {
    font-size: 3rem;
  }
}
</style>
