<template>
  <div class="create-shop-view">
    <div class="marketplace-signup">
      <!-- Left Panel - Form -->
      <div class="signup-panel">
        <div class="signup-header">
          <div class="logo">
            <i class="pi pi-shopping-cart"></i>
            <span>NexaMarket</span>
            <span class="seller-badge">Vendeur</span>
          </div>
          <h1 id="step-title">{{ stepTitles[currentStep - 1] }}</h1>
          <p class="subtitle">Rejoignez plus de 2M+ de vendeurs dans le monde</p>
        </div>
        
        <!-- Progress Indicator -->
        <div class="progress-container">
          <div class="progress-line">
            <div class="progress-fill" id="progress-bar" :style="{ width: progressWidth }"></div>
          </div>
          <div class="progress-steps">
            <div v-for="(step, index) in totalSteps" :key="index" 
                 :class="['step-item', 
                         { 'active': currentStep === index+1, 
                           'completed': currentStep > index+1 }]">
              <div class="step-circle">{{ index+1 }}</div>
              <span>{{ stepLabels[index] }}</span>
            </div>
          </div>
        </div>
        
        <!-- Form Steps -->
        <div class="form-container">
          <!-- Step 1: Account Information -->
          <div class="form-step" v-show="currentStep === 1">
            <div class="form-section">
              <h3>Informations personnelles</h3>
              
              <div class="form-grid">
                <div class="form-group">
                  <label for="firstName">Prénom</label>
                  <input type="text" id="firstName" class="input-control" 
                         v-model="formData.firstName" placeholder="Votre prénom">
                  <span class="error-msg" id="firstName-error"></span>
                </div>
                
                <div class="form-group">
                  <label for="lastName">Nom</label>
                  <input type="text" id="lastName" class="input-control" 
                         v-model="formData.lastName" placeholder="Votre nom">
                  <span class="error-msg" id="lastName-error"></span>
                </div>
              </div>

              <div class="form-group">
                <label for="email">Adresse email</label>
                <input type="email" id="email" class="input-control" 
                       v-model="formData.email" placeholder="exemple@email.com">
                <span class="error-msg" id="email-error"></span>
              </div>

              <div class="form-group">
                <label for="phone">Numéro de téléphone</label>
                <div class="phone-input">
                  <select class="input-control country-code" v-model="formData.countryCode">
                    <option>+227 (Niger)</option>
                    <option>+33 (France)</option>
                    <option>+32 (Belgique)</option>
                    <option>+41 (Suisse)</option>
                  </select>
                  <input type="tel" id="phone" class="input-control" 
                         v-model="formData.phone" placeholder="612345678">
                </div>
                <span class="error-msg" id="phone-error"></span>
              </div>

              <div class="form-grid">
                <div class="form-group">
                  <label for="password">Mot de passe</label>
                  <div class="input-group">
                    <input type="password" id="password" class="input-control" 
                           v-model="formData.password" placeholder="Créez un mot de passe">
                    <div class="password-strength" style="display: flex; gap: 4px; margin-top: 8px;">
                      <div v-for="(bar, index) in passwordStrengthBars" :key="index" 
                           class="strength-bar" :style="{
                             flex: '1', 
                             height: '4px', 
                             borderRadius: '2px',
                             backgroundColor: bar.color
                           }"></div>
                    </div>
                  </div>
                  <span class="error-msg" id="password-error"></span>
                </div>

                <div class="form-group">
                  <label for="confirmPassword">Confirmer le mot de passe</label>
                  <input type="password" id="confirmPassword" class="input-control" 
                         v-model="formData.confirmPassword" placeholder="Confirmez votre mot de passe">
                  <span class="error-msg" id="confirmPassword-error"></span>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 2: Business Information -->
          <div class="form-step" v-show="currentStep === 2">
            <div class="form-section">
              <h3>Informations de la boutique</h3>

                <!--Added After : Adda 08/08/2025-->

                <!-- <div class="form-group">
                <label for="businessType">Type d'entreprise</label>
                <select id="businessType" class="input-control" v-model="formData.businessType">
                  <option value="">Sélectionnez un type</option>
                  <option>Entreprise individuelle</option>
                  <option>Auto-entrepreneur</option>
                  <option>SARL/EURL</option>
                  <option>SAS/SASU</option>
                </select>
                <span class="error-msg" id="businessType-error"></span>
              </div> -->

              <div class="form-group">
                <label for="businessName">Nom de l'entreprise/boutique</label>
                <input type="text" id="businessName" class="input-control" 
                       v-model="formData.businessName" placeholder="Le nom de votre boutique">
                <span class="error-msg" id="businessName-error"></span>
              </div>

              <div class="form-grid">
                <div class="form-group">
                  <label for="category">Catégorie principale</label>
                  <select id="category" class="input-control" v-model="formData.category">
                    <option value="">Sélectionnez une catégorie</option>
                    <option>Électronique & High-Tech</option>
                    <option>Mode & Accessoires</option>
                    <option>Maison & Jardin</option>
                    <option>Beauté & Santé</option>
                    <option>Sports & Loisirs</option>
                  </select>
                  <span class="error-msg" id="category-error"></span>
                </div>
              </div>

              <div class="form-group">
                <label for="description">Description de votre activité</label>
                <textarea id="description" class="input-control" rows="4" 
                          v-model="formData.description" 
                          placeholder="Décrivez les produits que vous vendez, votre expérience..."></textarea>
                <div class="char-count">{{ formData.description.length }}/500</div>
                <span class="error-msg" id="description-error"></span>
              </div>

              <div class="form-group">
                <h3>Adresse de la boutique</h3>
                
                <!-- Champ Pays toujours en premier -->
                <div class="form-group">
                  <label for="country">Pays</label>
                  <select id="country" class="input-control" v-model="formData.country">
                    <option value="" disabled>Sélectionnez un pays</option>
                    <option>France</option>
                    <option>Belgique</option>
                    <option>Suisse</option>
                    <option>Canada</option>
                    <option>Niger</option>
                  </select>
                </div>

                <!-- Condition pour afficher les champs spécifiques au Niger -->
                <div v-if="formData.country === 'Niger'">
                  <div class="form-group">
                    <label for="region">Région</label>
                    <select id="region" class="input-control" v-model="formData.region">
                      <option value="" disabled>Sélectionnez votre région</option>
                      <option value="agadez">Agadez</option>
                      <option value="diffa">Diffa</option>
                      <option value="dosso">Dosso</option>
                      <option value="maradi">Maradi</option>
                      <option value="niamey">Niamey</option>
                      <option value="tahoua">Tahoua</option>
                      <option value="tillaberi">Tillabéri</option>
                      <option value="zinder">Zinder</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label for="commune">Commune/Arrondissement *</label>
                    <input type="text" id="commune" class="input-control" 
                          v-model="formData.commune" placeholder="Ex: Niamey I, Maradi I, Zinder IV">
                  </div>

                  <div class="form-group">
                    <label for="neighborhood">Quartier/Secteur *</label>
                    <input type="text" id="neighborhood" class="input-control" 
                          v-model="formData.neighborhood" placeholder="Ex: Plateau, Yantala, Koira Kano">
                  </div>

                  <div class="form-group">
                    <label for="landmarks">Points de repère</label>
                    <input type="text" id="landmarks" class="input-control" 
                          v-model="formData.landmarks" placeholder="Ex: Près du marché Katako, derrière la mosquée">
                  </div>
                </div>
                
                <!-- Adresse standard pour les autres pays -->
                <div v-else-if="formData.country">
                  <div class="address-grid">
                    <input type="text" class="input-control" v-model="formData.street" placeholder="Rue et numéro">
                    <input type="text" class="input-control" v-model="formData.city" placeholder="Ville">
                    <input type="text" class="input-control" v-model="formData.postalCode" placeholder="Code postal">
                  </div>
                </div>
                
                <span class="error-msg" id="address-error"></span>
              </div>
            </div>
          </div>

          <!-- Step 3: Verification -->
          <div class="form-step" v-show="currentStep === 3">
            <div class="form-section">
              <h3>Vérification et documents</h3>
              <p class="info-text" style="color: #666; margin-bottom: 1.5rem;">Pour la sécurité de notre marketplace, nous devons vérifier votre identité.</p>
              
              <div class="document-upload">
                <div class="upload-item">
                  <div class="upload-header">
                    <i class="pi pi-id-card"></i>
                    <div>
                      <h4>Pièce d'identité *</h4>
                      <p>Carte d'identité, permis de conduire ou passeport</p>
                    </div>
                  </div>
                  <button class="input-control" style="text-align: left; cursor: pointer;"
                          @click.prevent="triggerFileUpload('id')">
                    Choisir un fichier
                  </button>
                  <div class="file-info" v-if="formData.idDocument">
                    <i class="pi pi-check-circle"></i>
                    <span>{{ formData.idDocument }}</span>
                  </div>
                </div>

                <div class="upload-item">
                  <div class="upload-header">
                    <i class="pi pi-building"></i>
                    <div>
                      <h4>Justificatif d'entreprise</h4>
                      <p>KBIS, certificat d'inscription, ou statut auto-entrepreneur</p>
                    </div>
                  </div>
                  <button class="input-control" style="text-align: left; cursor: pointer;"
                          @click.prevent="triggerFileUpload('business')">
                    Choisir un fichier
                  </button>
                  <div class="file-info" v-if="formData.businessDocument">
                    <i class="pi pi-check-circle"></i>
                    <span>{{ formData.businessDocument }}</span>
                  </div>
                </div>
              </div>

              <div class="verification-info">
                <div class="info-card">
                  <i class="pi pi-shield"></i>
                  <div>
                    <h4>Sécurité garantie</h4>
                    <p>Vos documents sont traités de manière confidentielle et sécurisée</p>
                  </div>
                </div>
                <div class="info-card">
                  <i class="pi pi-clock"></i>
                  <div>
                    <h4>Vérification rapide</h4>
                    <p>Processus automatisé, validation sous 24-48h ouvrées</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 4: Success -->
          <div class="form-step success-step" v-show="currentStep === 4">
            <div class="success-content">
              <div class="success-icon">
                <i class="pi pi-check-circle"></i>
              </div>
              <h2>Félicitations !</h2>
              <p>Votre compte vendeur a été créé avec succès.</p>
              
              <div class="next-steps">
                <h3>Prochaines étapes :</h3>
                <div class="steps-list">
                  <div class="step-item">
                    <i class="pi pi-clock"></i>
                    <div>
                      <strong>Vérification en cours</strong>
                      <p>Nous vérifions vos documents (24-48h)</p>
                    </div>
                  </div>
                  <div class="step-item">
                    <i class="pi pi-envelope"></i>
                    <div>
                      <strong>Email de confirmation</strong>
                      <p>Vérifiez votre boîte mail et confirmez votre adresse</p>
                    </div>
                  </div>
                  <div class="step-item">
                    <i class="pi pi-upload"></i>
                    <div>
                      <strong>Ajoutez vos produits</strong>
                      <p>Commencez à créer votre catalogue</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="benefits-grid">
                <div class="benefit-item">
                  <i class="pi pi-users"></i>
                  <h4>2M+ clients</h4>
                  <p>Accès à notre base d'acheteurs</p>
                </div>
                <div class="benefit-item">
                  <i class="pi pi-credit-card"></i>
                  <h4>Paiements sécurisés</h4>
                  <p>Transactions protégées</p>
                </div>
                <div class="benefit-item">
                  <i class="pi pi-chart-line"></i>
                  <h4>Outils analytiques</h4>
                  <p>Suivi de vos performances</p>
                </div>
                <div class="benefit-item">
                  <i class="pi pi-headset"></i>
                  <h4>Support 24/7</h4>
                  <p>Assistance dédiée vendeurs</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="form-actions">
            <button class="btn-back" id="btn-back" 
                    v-show="currentStep > 1 && currentStep < 4"
                    @click="previousStep">
              <i class="pi pi-arrow-left"></i>
              Précédent
            </button>
            
            <button class="btn-next" id="btn-next" 
                    v-show="currentStep < 3" 
                    @click="nextStep">
              <span>Continuer</span>
              <i class="pi pi-arrow-right"></i>
            </button>
            
            <button class="btn-submit" id="btn-submit" 
                    v-show="currentStep === 3" 
                    @click="submitRegistration"
                    :disabled="isSubmitting">
              <span v-if="!isSubmitting">Créer mon compte</span>
              <span v-if="isSubmitting">Création en cours...</span>
              <i class="pi pi-check" v-if="!isSubmitting"></i>
              <i class="pi pi-spin pi-spinner" v-if="isSubmitting"></i>
            </button>
            
            <button class="btn-dashboard" id="btn-dashboard" 
                    v-show="currentStep === 4" 
                    @click="goToDashboard">
              <span>Accéder à mon espace vendeur</span>
              <i class="pi pi-external-link"></i>
            </button>
          </div>

          <!-- Terms and Social Login -->
          <div class="form-footer" id="form-footer" v-show="currentStep < 4">
            <div class="terms-section">
              <input type="checkbox" id="terms" v-model="formData.acceptedTerms">
              <label for="terms">
                J'accepte les <a href="#" target="_blank">Conditions générales de vente</a> et la 
                <a href="#" target="_blank">Politique de confidentialité</a>
              </label>
            </div>

            <div class="divider">
              <span>ou</span>
            </div>

            <div class="social-login">
              <button class="social-btn" @click="loginWithGoogle">
                <i class="pi pi-google"></i>
                <span>Continuer avec Google</span>
              </button>
            </div>

            <div class="login-link">
              <p>Vous avez déjà un compte ? <a href="#" id="login-link">Se connecter</a></p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Panel - Info -->
      <div class="info-panel">
        <div class="info-content">
          <h2>Pourquoi vendre sur NexaMarket ?</h2>
          
          <div class="features">
            <div class="feature-item">
              <div class="feature-icon">
                <i class="pi pi-globe"></i>
              </div>
              <div class="feature-content">
                <h3>Portée internationale</h3>
                <p>Vendez à des millions de clients dans le monde entier</p>
              </div>
            </div>

            <div class="feature-item">
              <div class="feature-icon">
                <i class="pi pi-shield"></i>
              </div>
              <div class="feature-content">
                <h3>Transactions sécurisées</h3>
                <p>Protection A-Z pour tous vos paiements</p>
              </div>
            </div>

            <div class="feature-item">
              <div class="feature-icon">
                <i class="pi pi-truck"></i>
              </div>
              <div class="feature-content">
                <h3>Logistique intégrée</h3>
                <p>Solutions d'expédition et de stockage</p>
              </div>
            </div>

            <div class="feature-item">
              <div class="feature-icon">
                <i class="pi pi-chart-bar"></i>
              </div>
              <div class="feature-content">
                <h3>Outils marketing</h3>
                <p>Publicités et promotions pour booster vos ventes</p>
              </div>
            </div>
          </div>

          <div class="stats">
            <div class="stat-item">
              <h3>2M+</h3>
              <p>Vendeurs actifs</p>
            </div>
            <div class="stat-item">
              <h3>50M+</h3>
              <p>Clients dans le monde</p>
            </div>
            <div class="stat-item">
              <h3>€2.5B</h3>
              <p>Volume d'affaires annuel</p>
            </div>
          </div>

          <div class="testimonial">
            <div class="testimonial-content">
              <p>"Grâce à NexaMarket, j'ai pu développer mon entreprise à l'international. Le support et les outils proposés sont exceptionnels."</p>
              <div class="testimonial-author">
                <div class="author-info">
                  <strong>Sarah Dubois</strong>
                  <span>Créatrice de bijoux - 150k€ CA/an</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateShopView',
  data() {
    return {
      currentStep: 1,
      totalSteps: 4,
      stepTitles: [
        "Créer votre compte vendeur",
        "Informations de votre boutique",
        "Vérification et documents",
        "Bienvenue sur NexaMarket"
      ],
      stepLabels: ["Compte", "Boutique", "Vérification", "Finalisation"],
      isSubmitting: false,
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        countryCode: '+227 (Niger)',
        phone: '',
        password: '',
        confirmPassword: '',
        businessType: '',
        businessName: '',
        category: '',
        subcategory: '',
        description: '',
        street: '',
        city: '',
        postalCode: '',
        country: '',
        region: '',
        commune: '',
        neighborhood: '',
        landmarks: '',
        idDocument: null,
        businessDocument: null,
        acceptedTerms: false
      },
      passwordStrengthBars: [
        { color: '#e9ecef' },
        { color: '#e9ecef' },
        { color: '#e9ecef' },
        { color: '#e9ecef' }
      ]
    };
  },
  computed: {
    progressWidth() {
      return (this.currentStep / this.totalSteps) * 100 + '%';
    }
  },
  watch: {
    'formData.password': function(newPassword) {
      this.updatePasswordStrength(newPassword);
    }
  },
  methods: {
    nextStep() {
      if (this.currentStep < this.totalSteps) {
        this.currentStep++;
      }
    },
    previousStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    },
    submitRegistration() {
      this.isSubmitting = true;
      
      // Simulate API call
      setTimeout(() => {
        this.isSubmitting = false;
        this.currentStep++;
      }, 2000);
    },
    goToDashboard() {
      this.$router.push('/seller-dashboard');
    },
    loginWithGoogle() {
      console.log('Connexion avec Google');
    },
    triggerFileUpload(type) {
      const fileNames = {
        'id': 'id_document.pdf',
        'business': 'business_document.pdf'
      };
      
      if (type === 'id') {
        this.formData.idDocument = fileNames[type];
      } else if (type === 'business') {
        this.formData.businessDocument = fileNames[type];
      }
    },
    updatePasswordStrength(password) {
      let strength = 0;
      
      if (password.length >= 6) strength = 1;
      if (password.length >= 8) strength = 2;
      if (/[A-Z]/.test(password) && /[0-9]/.test(password)) strength = 3;
      if (/[^A-Za-z0-9]/.test(password)) strength = 4;
      
      this.passwordStrengthBars.forEach((bar, index) => {
        if (index < strength) {
          bar.color = ['#ff6b6b', '#ffd166', '#06d6a0', '#118ab2'][index];
        } else {
          bar.color = '#e9ecef';
        }
      });
    }
  }
};
</script>

<style scoped>
/* Variables locales pour éviter les conflits */
.create-shop-view {
  --primary: #ff9900;
  --primary-dark: #e68a00;
  --secondary: #232f3e;
  --accent: #146eb4;
  --light: #f5f5f5;
  --success: #00a65a;
  --danger: #dd4b39;
  --gray: #6c757d;
  --border: #e1e8ed;
  
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.create-shop-view .marketplace-signup {
  display: flex;
  height: 100%;
  min-height: 0;
}

/* Left Panel - Form */
.create-shop-view .signup-panel {
  flex: 1;
  max-width: 900px; /* by default 700px  */
  background: white;
  padding: 2.5rem;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.08);
  z-index: 2;
  height: 100%;
}

.create-shop-view .signup-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.create-shop-view .logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--secondary);
}

.create-shop-view .logo i {
  color: var(--primary);
  font-size: 1.8rem;
}

.create-shop-view .seller-badge {
  background: var(--primary);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.create-shop-view .signup-header h1 {
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
  color: var(--secondary);
  font-weight: 500;
}

.create-shop-view .subtitle {
  color: var(--gray);
  font-size: 1rem;
}

/* Progress */
.create-shop-view .progress-container {
  margin-bottom: 1.5rem;
}

.create-shop-view .progress-line {
  height: 6px;
  background: var(--border);
  border-radius: 3px;
  margin-bottom: 1.5rem;
  overflow: hidden;
}

.create-shop-view .progress-fill {
  height: 100%;
  background: var(--primary);
  transition: width 0.5s ease;
}

.create-shop-view .progress-steps {
  display: flex;
  justify-content: space-between;
}

.create-shop-view .step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: var(--gray);
  position: relative;
  flex: 1;
}

.create-shop-view .step-item:not(:last-child):after {
  content: '';
  position: absolute;
  top: 16px;
  left: calc(50% + 16px);
  width: calc(100% - 32px);
  height: 2px;
  background: var(--border);
  z-index: 0;
}

.create-shop-view .step-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
}

.create-shop-view .step-item.active .step-circle {
  background: var(--primary);
  color: white;
  box-shadow: 0 0 0 4px rgba(255, 153, 0, 0.2);
}

.create-shop-view .step-item.completed .step-circle {
  background: var(--success);
  color: white;
}

.create-shop-view .step-item.active span,
.create-shop-view .step-item.completed span {
  color: var(--secondary);
  font-weight: 500;
}

/* Form */
.create-shop-view .form-container {
  flex: 1;
}

.create-shop-view .form-step {
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.create-shop-view .form-section {
  margin-bottom: 1.5rem;
}

.create-shop-view .form-section h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: var(--secondary);
  position: relative;
  padding-bottom: 0.75rem;
}

.create-shop-view .form-section h3:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 3px;
  background: var(--primary);
  border-radius: 2px;
}

.create-shop-view .form-group {
  margin-bottom: 1rem;
}

.create-shop-view .form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--secondary);
}

.create-shop-view .form-group label:after {
  content: ' *';
  color: var(--danger);
}

.create-shop-view .form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.create-shop-view .phone-input {
  display: flex;
  gap: 0.75rem;
}

.create-shop-view .country-code {
  flex: 0 0 150px;
}

.create-shop-view .input-control {
  width: 100%;
  padding: 0.875rem;
  border: 2px solid var(--border);
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.create-shop-view .input-control:focus {
  border-color: var(--primary);
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 153, 0, 0.2);
}

.create-shop-view .input-control.error {
  border-color: var(--danger);
}

.create-shop-view .error-msg {
  display: block;
  margin-top: 0.5rem;
  color: var(--danger);
  font-size: 0.85rem;
}

.create-shop-view .char-count {
  text-align: right;
  font-size: 0.85rem;
  color: var(--gray);
  margin-top: 0.25rem;
}

.create-shop-view .address-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.create-shop-view .address-grid > *:first-child {
  grid-column: 1 / span 2;
}

/* Document Upload */
.create-shop-view .document-upload {
  margin: 1.5rem 0;
}

.create-shop-view .upload-item {
  background: #f9fafb;
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1rem;
}

.create-shop-view .upload-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.create-shop-view .upload-header i {
  font-size: 1.5rem;
  color: var(--accent);
}

.create-shop-view .upload-header h4 {
  font-size: 1.1rem;
  color: var(--secondary);
  margin-bottom: 0.25rem;
}

.create-shop-view .upload-header p {
  color: var(--gray);
  font-size: 0.9rem;
}

.create-shop-view .file-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--success);
  margin-top: 0.75rem;
  font-weight: 500;
}

.create-shop-view .verification-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1.5rem;
}

.create-shop-view .info-card {
  background: #f1f8ff;
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.create-shop-view .info-card i {
  font-size: 1.5rem;
  color: var(--accent);
  margin-top: 0.25rem;
}

.create-shop-view .info-card h4 {
  font-size: 1rem;
  margin-bottom: 0.25rem;
  color: var(--secondary);
}

.create-shop-view .info-card p {
  font-size: 0.9rem;
  color: var(--gray);
}

/* Success Step */
.create-shop-view .success-step {
  text-align: center;
  padding: 1.5rem 0;
}

.create-shop-view .success-content {
  max-width: 600px;
  margin: 0 auto;
}

.create-shop-view .success-icon {
  width: 80px;
  height: 80px;
  background: #e8faf3;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  animation: pulse 2s infinite;
}

.create-shop-view .success-icon i {
  font-size: 2.5rem;
  color: var(--success);
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(0, 166, 90, 0.4); }
  70% { box-shadow: 0 0 0 15px rgba(0, 166, 90, 0); }
  100% { box-shadow: 0 0 0 0 rgba(0, 166, 90, 0); }
}

.create-shop-view .success-step h2 {
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
  color: var(--secondary);
}

.create-shop-view .success-step p {
  color: var(--gray);
  font-size: 1rem;
  margin-bottom: 1.5rem;
}

.create-shop-view .next-steps {
  background: #f9fafb;
  border-radius: 12px;
  padding: 1.25rem;
  margin: 1.5rem 0;
  text-align: left;
}

.create-shop-view .next-steps h3 {
  text-align: center;
  margin-bottom: 1rem;
  color: var(--secondary);
  font-size: 1.1rem;
}

.create-shop-view .steps-list .step-item {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: flex-start;
  text-align: left;
}

.create-shop-view .steps-list .step-item:last-child {
  margin-bottom: 0;
}

.create-shop-view .steps-list .step-item i {
  font-size: 1.25rem;
  color: var(--primary);
  background: #fff8e6;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 0.25rem;
}

.create-shop-view .steps-list .step-item strong {
  display: block;
  margin-bottom: 0.25rem;
  color: var(--secondary);
  font-size: 0.95rem;
}

.create-shop-view .steps-list .step-item p {
  font-size: 0.85rem;
}

.create-shop-view .benefits-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1.5rem;
}

.create-shop-view .benefit-item {
  background: white;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1.25rem;
  text-align: center;
  transition: all 0.3s ease;
}

.create-shop-view .benefit-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border-color: var(--primary);
}

.create-shop-view .benefit-item i {
  font-size: 1.75rem;
  color: var(--primary);
  margin-bottom: 0.75rem;
}

.create-shop-view .benefit-item h4 {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: var(--secondary);
}

.create-shop-view .benefit-item p {
  color: var(--gray);
  font-size: 0.85rem;
}

/* Form Actions */
.create-shop-view .form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border);
}

.create-shop-view .btn-back, 
.create-shop-view .btn-next, 
.create-shop-view .btn-submit, 
.create-shop-view .btn-dashboard {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.create-shop-view .btn-back {
  background: #f8f9fa;
  color: var(--secondary);
  border: 1px solid var(--border);
}

.create-shop-view .btn-back:hover {
  background: #e9ecef;
}

.create-shop-view .btn-next, 
.create-shop-view .btn-submit, 
.create-shop-view .btn-dashboard {
  background: var(--primary);
  color: white;
}

.create-shop-view .btn-next:hover, 
.create-shop-view .btn-submit:hover, 
.create-shop-view .btn-dashboard:hover {
  background: var(--primary-dark);
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(255, 153, 0, 0.3);
}

.create-shop-view .btn-next:disabled, 
.create-shop-view .btn-submit:disabled {
  background: #e9ecef;
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}

.create-shop-view .btn-dashboard {
  width: 100%;
  justify-content: center;
  margin-top: 0.75rem;
}

/* Form Footer */
.create-shop-view .form-footer {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border);
}

.create-shop-view .terms-section {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.create-shop-view .terms-section label {
  color: var(--gray);
  font-size: 0.85rem;
}

.create-shop-view .terms-section a {
  color: var(--accent);
  text-decoration: none;
}

.create-shop-view .terms-section a:hover {
  text-decoration: underline;
}

.create-shop-view .divider {
  position: relative;
  text-align: center;
  margin: 1rem 0;
}

.create-shop-view .divider span {
  display: inline-block;
  padding: 0 1rem;
  background: white;
  position: relative;
  z-index: 1;
  color: var(--gray);
  font-size: 0.85rem;
}

.create-shop-view .divider:before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--border);
  z-index: 0;
}

.create-shop-view .social-login {
  display: flex;
  justify-content: center;
}

.create-shop-view .social-btn {
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  font-weight: 500;
  background: white;
  color: var(--secondary);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.create-shop-view .social-btn:hover {
  background: #f8f9fa;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.create-shop-view .login-link {
  text-align: center;
  margin-top: 1rem;
  font-size: 0.85rem;
  color: var(--gray);
}

.create-shop-view .login-link a {
  color: var(--accent);
  text-decoration: none;
  font-weight: 500;
}

.create-shop-view .login-link a:hover {
  text-decoration: underline;
}

/* Right Panel - Info */
.create-shop-view .info-panel {
  flex: 1;
  background: linear-gradient(135deg, var(--secondary) 0%, #1a2530 100%);
  color: white;
  padding: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.create-shop-view .info-content {
  max-width: 600px;
}

.create-shop-view .info-content h2 {
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  font-weight: 500;
  text-align: center;
}

.create-shop-view .features {
  margin-bottom: 2rem;
}

.create-shop-view .feature-item {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.25rem;
  align-items: flex-start;
}

.create-shop-view .feature-icon {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.create-shop-view .feature-icon i {
  font-size: 1.25rem;
  color: var(--primary);
}

.create-shop-view .feature-content h3 {
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
  font-weight: 500;
}

.create-shop-view .feature-content p {
  color: #c2cbd4;
  font-size: 0.9rem;
}

.create-shop-view .stats {
  display: flex;
  justify-content: space-between;
  text-align: center;
  margin: 2rem 0;
}

.create-shop-view .stat-item {
  flex: 1;
}

.create-shop-view .stat-item h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--primary);
}

.create-shop-view .stat-item p {
  font-size: 0.85rem;
  color: #c2cbd4;
}

.create-shop-view .testimonial {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 1.5rem;
  margin-top: 1.5rem;
}

.create-shop-view .testimonial-content p {
  font-style: italic;
  margin-bottom: 1rem;
  font-size: 0.95rem;
  line-height: 1.6;
}

.create-shop-view .testimonial-author {
  display: flex;
  align-items: center;
}

.create-shop-view .author-info {
  flex: 1;
}

.create-shop-view .author-info strong {
  display: block;
  font-weight: 500;
  margin-bottom: 0.25rem;
  font-size: 0.95rem;
}

.create-shop-view .author-info span {
  font-size: 0.85rem;
  color: #c2cbd4;
}

/* Responsive */
@media (max-width: 992px) {
  .create-shop-view .info-panel {
    display: none;
  }
  
  .create-shop-view .signup-panel {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .create-shop-view .signup-panel {
    padding: 1.25rem;
  }
  
  .create-shop-view .form-grid, 
  .create-shop-view .address-grid, 
  .create-shop-view .benefits-grid, 
  .create-shop-view .verification-info {
    grid-template-columns: 1fr;
  }
  
  .create-shop-view .steps-list .step-item, 
  .create-shop-view .feature-item {
    margin-bottom: 1rem;
  }
  
  .create-shop-view .form-actions {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .create-shop-view .btn-back {
    order: 2;
  }
  
  .create-shop-view .btn-next, 
  .create-shop-view .btn-submit {
    order: 1;
  }
}

@media (max-height: 700px) {
  .create-shop-view .signup-panel {
    padding: 1.25rem;
  }
  
  .create-shop-view .logo {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
  }
  
  .create-shop-view .signup-header h1 {
    font-size: 1.5rem;
    margin-bottom: 0.25rem;
  }
  
  .create-shop-view .subtitle {
    font-size: 0.9rem;
  }
  
  .create-shop-view .form-section h3 {
    font-size: 1.1rem;
    margin-bottom: 0.75rem;
  }
  
  .create-shop-view .input-control {
    padding: 0.65rem;
  }
}
</style>