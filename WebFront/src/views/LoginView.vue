<template>
  <div class="login-container">
    <div class="login-hero">
      <div class="hero-content">
        <div class="logo">
          <i class="fas fa-store"></i>
          <span>NexaShop</span>
        </div>
        <h1 class="hero-title">Reconnectez-vous à votre univers d'achat</h1>
        <p class="hero-subtitle">Accédez à votre compte pour gérer vos boutiques, suivre vos commandes et découvrir des offres exclusives.</p>
        
        <div class="hero-features">
          <div class="feature">
            <i class="fas fa-shield-alt"></i>
            <span>Sécurité et confidentialité garanties</span>
          </div>
          <div class="feature">
            <i class="fas fa-bolt"></i>
            <span>Accès instantané à votre espace personnel</span>
          </div>
          <div class="feature">
            <i class="fas fa-sync-alt"></i>
            <span>Synchronisation sur tous vos appareils</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="login-form-container">
      <div class="form-header">
        <h2 class="form-title">Connexion</h2>
        <p class="form-subtitle">Entrez vos identifiants pour accéder à votre compte</p>
      </div>
      
      <div class="form-group">
        <i class="fas fa-user input-icon"></i>
        <input 
          type="text" 
          class="form-input" 
          placeholder="Email ou nom d'utilisateur" 
          required 
          v-model="credentials.email"
        >
      </div>
      
      <div class="form-group">
        <i class="fas fa-lock input-icon"></i>
        <input 
          :type="showPassword ? 'text' : 'password'" 
          class="form-input" 
          id="password" 
          placeholder="Mot de passe" 
          required 
          v-model="credentials.password"
        >
        <i 
          :class="showPassword ? 'fas fa-eye-slash password-toggle' : 'fas fa-eye password-toggle'" 
          @click="togglePasswordVisibility"
        ></i>
      </div>
      
      <div class="form-options">
        <div class="remember-me" @click="toggleRemember">
          <div class="remember-checkbox" :class="{ checked: rememberMe }">
            <i class="fas fa-check"></i>
          </div>
          <span>Se souvenir de moi</span>
        </div>
        <a href="#" class="forgot-password">Mot de passe oublié ?</a>
      </div>
      
      <button 
        class="login-button" 
        @click="login" 
        :disabled="isLoggingIn"
      >
        <i :class="isLoggingIn ? 'fas fa-spinner fa-spin' : 'fas fa-sign-in-alt'"></i> 
        {{ loginButtonText }}
      </button>
      
      <div class="divider">
        <div class="divider-line"></div>
        <span class="divider-text">ou</span>
        <div class="divider-line"></div>
      </div>
      
      <div class="social-login">
        <div class="social-button google" @click="loginWithGoogle">
          <i class="fab fa-google"></i>
          <span>Google</span>
        </div>
        <div class="social-button facebook" @click="loginWithFacebook">
          <i class="fab fa-facebook-f"></i>
          <span>Facebook</span>
        </div>
      </div>
      
      <p class="register-link">
        Nouveau sur NexaShop ? <a href="#">Créer un compte</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      credentials: {
        email: '',
        password: ''
      },
      showPassword: false,
      rememberMe: false,
      isLoggingIn: false,
      loginButtonText: 'Se connecter'
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    toggleRemember() {
      this.rememberMe = !this.rememberMe;
    },
    login() {
      if (!this.credentials.email || !this.credentials.password) {
        alert('Veuillez remplir tous les champs');
        return;
      }
      
      this.isLoggingIn = true;
      this.loginButtonText = 'Connexion en cours...';
      
      // Simulation de connexion
      setTimeout(() => {
        this.isLoggingIn = false;
        this.loginButtonText = 'Connexion réussie !';
        
        // Changement de style pour indiquer la réussite
        const button = document.querySelector('.login-button');
        button.style.background = 'var(--secondary)';
        button.style.cursor = 'default';
        
        // Redirection après 1 seconde
        setTimeout(() => {
          alert(`Bienvenue ${this.credentials.email}! Vous êtes maintenant connecté.`);
          // En situation réelle: this.$router.push('/dashboard');
        }, 1000);
      }, 1500);
    },
    loginWithGoogle() {
      alert('Connexion avec Google sélectionnée');
    },
    loginWithFacebook() {
      alert('Connexion avec Facebook sélectionnée');
    }
  }
}
</script>

<style scoped>
:root {
  --primary: #8b5cf6;
  --primary-dark: #7c3aed;
  --seller-accent: #f97316;
  --seller-accent-dark: #ea580c;
  --secondary: #10b981;
  --secondary-dark: #059669;
  --dark: #1e293b;
  --darker: #0f172a;
  --light: #f8fafc;
}

.login-container {
  width: 100%;
  max-width: 1200px;
  display: flex;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: containerAppear 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  margin: 0 auto;
}

@keyframes containerAppear {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-hero {
  flex: 1;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.login-hero::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="transparent"/><path d="M0 50 L100 50 M50 0 L50 100" stroke="rgba(255,255,255,0.1)" stroke-width="1"/></svg>');
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 2;
  color: white;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 40px;
}

.logo i {
  color: var(--seller-accent);
  animation: bounce 1.5s infinite alternate;
}

@keyframes bounce {
  from { transform: translateY(0); }
  to { transform: translateY(-10px); }
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 20px;
  letter-spacing: -1px;
}

.hero-subtitle {
  font-size: 1.5rem;
  opacity: 0.9;
  margin-bottom: 40px;
  max-width: 500px;
  line-height: 1.6;
}

.hero-features {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 50px;
}

.feature {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 1.1rem;
  font-weight: 500;
}

.feature i {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.login-form-container {
  flex: 0 0 500px;
  background: white;
  padding: 60px 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.form-header {
  text-align: center;
  margin-bottom: 40px;
}

.form-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 10px;
  color: var(--dark);
  position: relative;
  display: inline-block;
}

.form-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: var(--primary);
  border-radius: 2px;
}

.form-subtitle {
  font-size: 1.1rem;
  color: #64748b;
  margin-top: 20px;
}

.form-group {
  margin-bottom: 25px;
  position: relative;
  animation: formAppear 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
}

@keyframes formAppear {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.input-icon {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  font-size: 1.1rem;
}

.form-input {
  width: 100%;
  padding: 18px 20px 18px 55px;
  font-size: 1.1rem;
  font-family: 'Montserrat', sans-serif;
  border: 3px solid #000;
  border-radius: 12px;
  transition: all 0.3s;
  box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.2);
  background: #f8fafc;
}

.form-input:focus {
  outline: none;
  box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.2);
  transform: translate(-3px, -3px);
  border-color: var(--primary);
  background: white;
}

.password-toggle {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #94a3b8;
  font-size: 1.1rem;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  animation: formAppear 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
  animation-delay: 0.1s;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.remember-checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid #000;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.remember-checkbox.checked {
  background: var(--primary);
  border-color: var(--primary);
}

.remember-checkbox.checked i {
  color: white;
  font-size: 0.8rem;
}

.forgot-password {
  color: var(--primary);
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
  position: relative;
}

.forgot-password::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--primary);
  transition: width 0.3s;
}

.forgot-password:hover::after {
  width: 100%;
}

.login-button {
  width: 100%;
  padding: 18px;
  background: var(--primary);
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
  border: 3px solid #000;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.2);
  font-family: 'Montserrat', sans-serif;
  letter-spacing: 0.5px;
  margin-bottom: 25px;
  animation: pulse 2s infinite ease-in-out;
}

@keyframes pulse {
  0% { transform: translate(-4px, -4px); box-shadow: 6px 6px 0 rgba(0,0,0,0.2); }
  50% { transform: translate(-4px, -4px); box-shadow: 10px 10px 0 rgba(0,0,0,0.3); }
  100% { transform: translate(-4px, -4px); box-shadow: 6px 6px 0 rgba(0,0,0,0.2); }
}

.login-button:hover {
  background: var(--primary-dark);
  transform: translate(-4px, -4px);
  box-shadow: 9px 9px 0 rgba(0, 0, 0, 0.2);
}

.login-button:active {
  transform: translate(1px, 1px);
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.2);
}

.login-button:disabled {
  animation: none;
  cursor: not-allowed;
  opacity: 0.8;
}

.divider {
  display: flex;
  align-items: center;
  margin: 25px 0;
  animation: formAppear 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
  animation-delay: 0.2s;
}

.divider-line {
  flex: 1;
  height: 2px;
  background: #e2e8f0;
}

.divider-text {
  padding: 0 15px;
  color: #64748b;
  font-weight: 500;
}

.social-login {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  animation: formAppear 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
  animation-delay: 0.25s;
}

.social-button {
  flex: 1;
  padding: 12px;
  border: 3px solid #000;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  background: white;
  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.1);
}

.social-button:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.1);
}

.social-button.google {
  color: #db4437;
}

.social-button.facebook {
  color: #4267B2;
}

.register-link {
  text-align: center;
  font-size: 1.1rem;
  margin-top: 20px;
  animation: formAppear 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
  animation-delay: 0.3s;
}

.register-link a {
  color: var(--primary);
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s;
  position: relative;
}

.register-link a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--primary);
  transition: width 0.3s;
}

.register-link a:hover::after {
  width: 100%;
}

/* Responsive design */
@media (max-width: 992px) {
  .login-container {
    flex-direction: column;
  }
  
  .login-hero {
    padding: 40px;
  }
  
  .hero-title {
    font-size: 2.8rem;
  }
  
  .login-form-container {
    flex: 1;
    padding: 40px 30px;
  }
}

@media (max-width: 768px) {
  .login-container {
    border-radius: 16px;
  }
  
  .hero-title {
    font-size: 2.4rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
  }
  
  .form-title {
    font-size: 2rem;
  }
  
  .social-login {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .login-hero {
    padding: 30px 20px;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .form-input {
    padding: 16px 16px 16px 50px;
  }
  
  .form-options {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
}
</style>