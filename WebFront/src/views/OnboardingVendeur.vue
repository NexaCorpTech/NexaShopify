<template>
    <div class="signup-page">
      <div class="signup-container">
        <div class="signup-header">
          <div class="logo">
            <i class="fas fa-store"></i>
            <span>NexaShop</span>
          </div>
          <h1>Créez votre boutique en ligne</h1>
          <p>Rejoignez notre communauté de plus de 700 000 commerçants</p>
        </div>
        
        <div class="signup-progress">
          <div class="progress-bar">
            <div class="progress-fill" :style="{width: progress + '%'}"></div>
          </div>
          <div class="progress-steps">
            <span :class="{active: step >= 1}">1. Informations</span>
            <span :class="{active: step >= 2}">2. Boutique</span>
            <span :class="{active: step >= 3}">3. Finalisation</span>
          </div>
        </div>
        
        <div class="signup-form">
          <!-- Étape 1: Informations personnelles -->
          <div v-if="step === 1" class="form-step">
            <h2>Informations personnelles</h2>
            <div class="form-group">
              <label for="fullname">Nom complet</label>
              <input 
                type="text" 
                id="fullname" 
                v-model="user.fullname" 
                placeholder="Votre nom complet"
                @focus="animateInput($event)"
              >
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="user.email" 
                  placeholder="exemple@email.com"
                  @focus="animateInput($event)"
                >
              </div>
              <div class="form-group">
                <label for="phone">Téléphone</label>
                <input 
                  type="tel" 
                  id="phone" 
                  v-model="user.phone" 
                  placeholder="+33 6 12 34 56 78"
                  @focus="animateInput($event)"
                >
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="password">Mot de passe</label>
                <div class="password-input">
                  <input 
                    :type="showPassword ? 'text' : 'password'" 
                    id="password" 
                    v-model="user.password" 
                    placeholder="Créez un mot de passe"
                    @focus="animateInput($event)"
                  >
                  <button class="toggle-password" @click="showPassword = !showPassword">
                    <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                  </button>
                </div>
                <div class="password-strength">
                  <div 
                    v-for="i in 4" 
                    :key="i" 
                    class="strength-bar"
                    :class="{filled: passwordStrength >= i}"
                  ></div>
                </div>
              </div>
              <div class="form-group">
                <label for="confirmPassword">Confirmation</label>
                <input 
                  :type="showPassword ? 'text' : 'password'" 
                  id="confirmPassword" 
                  v-model="user.confirmPassword" 
                  placeholder="Confirmez votre mot de passe"
                  @focus="animateInput($event)"
                >
              </div>
            </div>
          </div>
          
          <!-- Étape 2: Informations boutique -->
          <div v-if="step === 2" class="form-step">
            <h2>Votre boutique</h2>
            <div class="form-group">
              <label for="shopName">Nom de la boutique</label>
              <input 
                type="text" 
                id="shopName" 
                v-model="shop.name" 
                placeholder="Le nom de votre boutique"
                @focus="animateInput($event)"
              >
            </div>
            
            <div class="form-group">
              <label for="shopCategory">Catégorie</label>
              <select id="shopCategory" v-model="shop.category" @focus="animateInput($event)">
                <option value="" disabled selected>Sélectionnez une catégorie</option>
                <option value="fashion">Mode & Accessoires</option>
                <option value="electronics">Électronique</option>
                <option value="home">Maison & Jardin</option>
                <option value="beauty">Beauté & Cosmétiques</option>
                <option value="food">Alimentation</option>
                <option value="other">Autre</option>
              </select>
            </div>
            
            <div class="form-group">
              <label>Description de votre boutique</label>
              <textarea 
                v-model="shop.description" 
                placeholder="Décrivez votre boutique en quelques mots..."
                @focus="animateInput($event)"
              ></textarea>
            </div>
            
            <div class="form-group">
              <label>Logo de la boutique</label>
              <div class="logo-upload">
                <div class="upload-preview" @click="triggerFileUpload">
                  <img v-if="shop.logo" :src="shop.logo" alt="Logo boutique">
                  <i v-else class="fas fa-cloud-upload-alt"></i>
                </div>
                <input 
                  type="file" 
                  ref="fileInput" 
                  accept="image/*" 
                  @change="handleLogoUpload"
                  style="display: none"
                >
                <button class="upload-btn" @click="triggerFileUpload">Choisir un fichier</button>
              </div>
            </div>
          </div>
          
          <!-- Étape 3: Finalisation -->
          <div v-if="step === 3" class="form-step final-step">
            <div class="success-animation">
              <div class="checkmark">✓</div>
            </div>
            <h2>Votre boutique est presque prête!</h2>
            <p class="success-message">
              Félicitations <strong>{{ user.fullname }}</strong>! Votre boutique 
              <strong>{{ shop.name }}</strong> a été créée avec succès.
            </p>
            
            <div class="benefits">
              <div class="benefit-card">
                <i class="fas fa-gift"></i>
                <h3>14 jours d'essai gratuit</h3>
                <p>Profitez de toutes les fonctionnalités sans engagement</p>
              </div>
              <div class="benefit-card">
                <i class="fas fa-headset"></i>
                <h3>Support 24/7</h3>
                <p>Notre équipe est à votre disposition à tout moment</p>
              </div>
              <div class="benefit-card">
                <i class="fas fa-chart-line"></i>
                <h3>Analyses avancées</h3>
                <p>Suivez vos performances en temps réel</p>
              </div>
            </div>
          </div>
          
          <div class="form-actions">
            <button 
              v-if="step > 1" 
              class="btn-back" 
              @click="previousStep"
            >
              <i class="fas fa-arrow-left"></i> Retour
            </button>
            
            <button 
              v-if="step < 3" 
              class="btn-next" 
              @click="nextStep"
              :disabled="!canProceed"
            >
              Continuer <i class="fas fa-arrow-right"></i>
            </button>
            
            <button 
              v-if="step === 3" 
              class="btn-complete" 
              @click="completeSignup"
            >
              Accéder à ma boutique <i class="fas fa-store"></i>
            </button>
          </div>
          
          <div class="social-signup">
            <p>Ou inscrivez-vous avec</p>
            <div class="social-buttons">
              <button class="social-btn google">
                <i class="fab fa-google"></i> Google
              </button>
              <button class="social-btn facebook">
                <i class="fab fa-facebook-f"></i> Facebook
              </button>
              <button class="social-btn apple">
                <i class="fab fa-apple"></i> Apple
              </button>
            </div>
          </div>
        </div>
        
        <div class="signup-footer">
          <p>En vous inscrivant, vous acceptez nos <a href="#">Conditions d'utilisation</a> et notre <a href="#">Politique de confidentialité</a>.</p>
          <p>Déjà un compte? <a href="#" @click.prevent="goToLogin">Connectez-vous</a></p>
        </div>
      </div>
      
      <div class="signup-hero">
        <div class="hero-content">
          <h2>Transformez votre passion en entreprise</h2>
          <div class="features-list">
            <div class="feature">
              <i class="fas fa-check-circle"></i>
              <p>Créez votre boutique en quelques minutes</p>
            </div>
            <div class="feature">
              <i class="fas fa-check-circle"></i>
              <p>Gestion complète des stocks et commandes</p>
            </div>
            <div class="feature">
              <i class="fas fa-check-circle"></i>
              <p>Paiements sécurisés intégrés</p>
            </div>
            <div class="feature">
              <i class="fas fa-check-circle"></i>
              <p>Outils marketing pour booster vos ventes</p>
            </div>
          </div>
          
          <div class="testimonials">
            <div class="testimonial">
              <div class="avatar"></div>
              <div class="quote">
                <p>"NexaShop a transformé mon petit projet en une entreprise florissante!"</p>
                <span>- Marie, créatrice de bijoux</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SignupPage',
    data() {
      return {
        step: 1,
        progress: 33,
        showPassword: false,
        user: {
          fullname: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: ''
        },
        shop: {
          name: '',
          category: '',
          description: '',
          logo: null
        }
      };
    },
    computed: {
      canProceed() {
        if (this.step === 1) {
          return (
            this.user.fullname.length > 3 &&
            this.validateEmail(this.user.email) &&
            this.user.password.length >= 8 &&
            this.user.password === this.user.confirmPassword
          );
        } else if (this.step === 2) {
          return (
            this.shop.name.length > 2 &&
            this.shop.category !== ''
          );
        }
        return true;
      },
      passwordStrength() {
        if (!this.user.password) return 0;
        if (this.user.password.length < 6) return 1;
        if (this.user.password.length < 8) return 2;
        if (/[A-Z]/.test(this.user.password) && /[0-9]/.test(this.user.password)) return 4;
        return 3;
      }
    },
    methods: {
      nextStep() {
        if (this.step < 3) {
          this.step++;
          this.progress = this.step * 33;
          
          // Animation de transition
          document.querySelector('.form-step').classList.add('fade-out');
          setTimeout(() => {
            document.querySelector('.form-step').classList.remove('fade-out');
          }, 300);
        }
      },
      previousStep() {
        if (this.step > 1) {
          this.step--;
          this.progress = this.step * 33;
          
          // Animation de transition
          document.querySelector('.form-step').classList.add('fade-out');
          setTimeout(() => {
            document.querySelector('.form-step').classList.remove('fade-out');
          }, 300);
        }
      },
      completeSignup() {
        // Simulation d'inscription réussie
        setTimeout(() => {
          this.$router.push('/dashboard');
        }, 1500);
      },
      validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      },
      triggerFileUpload() {
        this.$refs.fileInput.click();
      },
      handleLogoUpload(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.shop.logo = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      },
      animateInput(event) {
        const input = event.target;
        const label = input.previousElementSibling;
        
        label.classList.add('active');
        input.addEventListener('blur', () => {
          if (!input.value) {
            label.classList.remove('active');
          }
        }, { once: true });
      },
      goToLogin() {
        this.$router.push('/login');
      }
    }
  };
  </script>
  
  <style scoped>
  .signup-page {
    display: flex;
    min-height: 100vh;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    font-family: 'Open Sans', sans-serif;
  }
  
  .signup-container {
    flex: 1;
    max-width: 700px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    background: white;
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.08);
    z-index: 1;
    overflow-y: auto;
  }
  
  .signup-hero {
    flex: 1;
    background: linear-gradient(135deg, #0468ff 0%, #00c6ff 100%);
    color: white;
    padding: 80px 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .hero-content {
    max-width: 600px;
  }
  
  .signup-header {
    text-align: center;
    margin-bottom: 40px;
  }
  
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 28px;
    font-weight: 700;
    color: #0468ff;
    font-family: 'Montserrat', sans-serif;
    margin-bottom: 20px;
  }
  
  .logo i {
    color: #ff7a00;
  }
  
  .signup-header h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    color: #1a1a1a;
  }
  
  .signup-header p {
    color: #666;
    font-size: 1.1rem;
  }
  
  .signup-progress {
    margin-bottom: 30px;
  }
  
  .progress-bar {
    height: 8px;
    background: #e9ecef;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 10px;
  }
  
  .progress-fill {
    height: 100%;
    background: linear-gradient(to right, #0468ff, #00c6ff);
    border-radius: 4px;
    transition: width 0.5s ease;
  }
  
  .progress-steps {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
    color: #666;
  }
  
  .progress-steps span {
    position: relative;
    padding-top: 25px;
  }
  
  .progress-steps span:before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #e9ecef;
    z-index: 1;
  }
  
  .progress-steps span.active:before {
    background: #0468ff;
    box-shadow: 0 0 0 4px rgba(4, 104, 255, 0.2);
  }
  
  .progress-steps span.active {
    color: #0468ff;
    font-weight: 600;
  }
  
  .signup-form {
    flex: 1;
  }
  
  .form-step {
    animation: fadeIn 0.5s ease;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .fade-out {
    animation: fadeOut 0.3s ease forwards;
  }
  
  @keyframes fadeOut {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(-20px); }
  }
  
  .form-step h2 {
    font-size: 1.8rem;
    margin-bottom: 30px;
    color: #1a1a1a;
    position: relative;
    padding-bottom: 15px;
  }
  
  .form-step h2:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 4px;
    background: linear-gradient(to right, #0468ff, #00c6ff);
    border-radius: 2px;
  }
  
  .form-group {
    margin-bottom: 25px;
    position: relative;
  }
  
  .form-row {
    display: flex;
    gap: 20px;
    margin-bottom: 25px;
  }
  
  .form-row .form-group {
    flex: 1;
    margin-bottom: 0;
  }
  
  label {
    display: block;
    margin-bottom: 8px;
    color: #555;
    font-weight: 500;
    position: absolute;
    top: 12px;
    left: 15px;
    transition: all 0.3s ease;
    pointer-events: none;
    background: white;
    padding: 0 5px;
  }
  
  label.active {
    top: -10px;
    left: 10px;
    font-size: 0.85rem;
    color: #0468ff;
  }
  
  input, select, textarea {
    width: 100%;
    padding: 15px;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s ease;
  }
  
  input:focus, select:focus, textarea:focus {
    border-color: #0468ff;
    outline: none;
    box-shadow: 0 0 0 3px rgba(4, 104, 255, 0.2);
  }
  
  .password-input {
    position: relative;
  }
  
  .toggle-password {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #666;
    cursor: pointer;
    font-size: 1.1rem;
  }
  
  .password-strength {
    display: flex;
    gap: 5px;
    margin-top: 8px;
  }
  
  .strength-bar {
    flex: 1;
    height: 4px;
    background: #e9ecef;
    border-radius: 2px;
  }
  
  .strength-bar.filled {
    background: #20c997;
  }
  
  .strength-bar:nth-child(1).filled { background: #ff6b6b; }
  .strength-bar:nth-child(2).filled { background: #ffd166; }
  .strength-bar:nth-child(3).filled { background: #06d6a0; }
  .strength-bar:nth-child(4).filled { background: #118ab2; }
  
  .logo-upload {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  
  .upload-preview {
    width: 100px;
    height: 100px;
    border: 2px dashed #e9ecef;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    overflow: hidden;
  }
  
  .upload-preview i {
    font-size: 2rem;
    color: #666;
  }
  
  .upload-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .upload-btn {
    padding: 10px 20px;
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .upload-btn:hover {
    background: #e9ecef;
  }
  
  .form-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
  }
  
  .btn-back, .btn-next, .btn-complete {
    padding: 15px 30px;
    border: none;
    border-radius: 50px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: all 0.3s ease;
  }
  
  .btn-back {
    background: #f8f9fa;
    color: #666;
  }
  
  .btn-back:hover {
    background: #e9ecef;
  }
  
  .btn-next {
    background: #0468ff;
    color: white;
    box-shadow: 0 5px 15px rgba(4, 104, 255, 0.4);
  }
  
  .btn-next:disabled {
    background: #e9ecef;
    cursor: not-allowed;
    box-shadow: none;
  }
  
  .btn-next:not(:disabled):hover {
    background: #0353d9;
    transform: translateY(-3px);
  }
  
  .btn-complete {
    background: #20c997;
    color: white;
    box-shadow: 0 5px 15px rgba(32, 201, 151, 0.4);
    width: 100%;
    justify-content: center;
  }
  
  .btn-complete:hover {
    background: #1aa179;
    transform: translateY(-3px);
  }
  
  .social-signup {
    text-align: center;
    margin-top: 40px;
    padding-top: 30px;
    border-top: 1px solid #e9ecef;
  }
  
  .social-signup p {
    margin-bottom: 20px;
    color: #666;
  }
  
  .social-buttons {
    display: flex;
    gap: 15px;
    justify-content: center;
  }
  
  .social-btn {
    padding: 12px 25px;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    background: white;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .social-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  }
  
  .social-btn.google {
    color: #DB4437;
  }
  
  .social-btn.facebook {
    color: #1877F2;
  }
  
  .social-btn.apple {
    color: #000;
  }
  
  .signup-footer {
    text-align: center;
    margin-top: 40px;
    color: #666;
    font-size: 0.9rem;
  }
  
  .signup-footer a {
    color: #0468ff;
    text-decoration: none;
  }
  
  .signup-footer a:hover {
    text-decoration: underline;
  }
  
  /* Hero section */
  .hero-content h2 {
    font-size: 2.5rem;
    margin-bottom: 30px;
    line-height: 1.3;
  }
  
  .features-list {
    margin-bottom: 50px;
  }
  
  .feature {
    display: flex;
    align-items: flex-start;
    gap: 15px;
    margin-bottom: 20px;
  }
  
  .feature i {
    color: #00ffaa;
    font-size: 1.5rem;
    margin-top: 3px;
  }
  
  .feature p {
    font-size: 1.1rem;
    line-height: 1.6;
  }
  
  .testimonials {
    background: rgba(255, 255, 255, 0.1);
    padding: 25px;
    border-radius: 12px;
    backdrop-filter: blur(10px);
  }
  
  .testimonial {
    display: flex;
    gap: 20px;
  }
  
  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(45deg, #00c6ff, #00ffaa);
    flex-shrink: 0;
  }
  
  .quote p {
    font-style: italic;
    margin-bottom: 10px;
    line-height: 1.5;
  }
  
  .quote span {
    font-weight: 500;
  }
  
  /* Final step styles */
  .final-step {
    text-align: center;
  }
  
  .success-animation {
    width: 120px;
    height: 120px;
    background: #e8faf3;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 30px;
    animation: pulse 2s infinite;
  }
  
  .checkmark {
    font-size: 4rem;
    color: #20c997;
    font-weight: bold;
  }
  
  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(32, 201, 151, 0.4); }
    70% { box-shadow: 0 0 0 20px rgba(32, 201, 151, 0); }
    100% { box-shadow: 0 0 0 0 rgba(32, 201, 151, 0); }
  }
  
  .success-message {
    font-size: 1.2rem;
    margin-bottom: 40px;
    line-height: 1.6;
  }
  
  .benefits {
    display: flex;
    gap: 20px;
    margin-bottom: 40px;
  }
  
  .benefit-card {
    flex: 1;
    background: #f8f9fa;
    border-radius: 12px;
    padding: 25px;
    text-align: center;
    transition: all 0.3s;
  }
  
  .benefit-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  }
  
  .benefit-card i {
    font-size: 2.5rem;
    color: #0468ff;
    margin-bottom: 15px;
  }
  
  .benefit-card h3 {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }
  
  /* Responsive */
  @media (max-width: 992px) {
    .signup-hero {
      display: none;
    }
    
    .signup-container {
      max-width: 100%;
    }
  }
  
  @media (max-width: 768px) {
    .signup-container {
      padding: 20px;
    }
    
    .form-row {
      flex-direction: column;
      gap: 15px;
    }
    
    .signup-header h1 {
      font-size: 2rem;
    }
    
    .benefits {
      flex-direction: column;
    }
    
    .social-buttons {
      flex-direction: column;
    }
    
    .form-actions {
      flex-direction: column;
      gap: 15px;
    }
    
    .btn-back {
      order: 2;
    }
    
    .btn-next {
      order: 1;
    }
  }
  </style>