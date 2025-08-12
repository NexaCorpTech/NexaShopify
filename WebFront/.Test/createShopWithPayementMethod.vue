<template>
  <div class="onboarding-page">
    <!-- Header -->
    <div class="onboarding-header">
      <div class="logo">
        <i class="pi pi-shopping-bag"></i>
        <span>NexaShop</span>
      </div>
      <div class="header-content">
        <h1>Créez votre boutique en ligne</h1>
        <p>Rejoignez notre communauté de plus de 700 000 commerçants</p>
      </div>
      <Button 
        label="Déjà un compte ? Se connecter" 
        class="login-btn p-button-text"
        @click="goToLogin"
      />
    </div>

    <!-- Main Content -->
    <div class="onboarding-container">
      <!-- Left Panel: Form Steps -->
      <div class="form-steps">
        <div class="step-indicator">
          <div 
            v-for="(stepData, index) in steps" 
            :key="index"
            class="step"
            :class="{
              'active': currentStep === index,
              'completed': currentStep > index
            }"
            @click="setStep(index)"
          >
            <div class="step-number">
              <span v-if="currentStep <= index">{{ index + 1 }}</span>
              <i v-else class="pi pi-check"></i>
            </div>
            <div class="step-info">
              <div class="step-title">{{ stepData.title }}</div>
              <div class="step-subtitle">{{ stepData.subtitle }}</div>
            </div>
          </div>
        </div>

        <!-- Dynamic Step Content -->
        <div class="step-content">
          <!-- Step 1: Personal Info -->
          <div v-if="currentStep === 0">
            <h2 class="step-header">Informations personnelles</h2>
            <div class="form-grid">
              <div class="form-group">
                <label>Nom complet</label>
                <InputText v-model="user.fullname" placeholder="Votre nom complet" />
              </div>
              
              <div class="form-group">
                <label>Email</label>
                <InputText v-model="user.email" placeholder="exemple@email.com" />
              </div>
              
              <div class="form-group">
                <label>Téléphone</label>
                <InputText v-model="user.phone" placeholder="+33 6 12 34 56 78" />
              </div>
              
              <div class="form-group">
                <label>Mot de passe</label>
                <Password 
                  v-model="user.password" 
                  :feedback="false" 
                  toggleMask
                  placeholder="Créez un mot de passe"
                />
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
                <label>Confirmez le mot de passe</label>
                <Password 
                  v-model="user.confirmPassword" 
                  :feedback="false" 
                  toggleMask
                  placeholder="Confirmez votre mot de passe"
                />
              </div>
            </div>
          </div>

          <!-- Step 2: Shop Info -->
          <div v-if="currentStep === 1">
            <h2 class="step-header">Votre boutique</h2>
            <div class="form-grid">
              <div class="form-group">
                <label>Nom de la boutique</label>
                <InputText v-model="shop.name" placeholder="Le nom de votre boutique" />
              </div>
              
              <div class="form-group">
                <label>Catégorie</label>
                <Dropdown 
                  v-model="shop.category" 
                  :options="shopCategories"
                  optionLabel="name"
                  placeholder="Sélectionnez une catégorie"
                />
              </div>
              
              <div class="form-group">
                <label>Description</label>
                <Textarea 
                  v-model="shop.description" 
                  rows="4"
                  placeholder="Décrivez votre boutique en quelques mots..."
                />
              </div>
              
              <div class="form-group">
                <label>Logo de la boutique</label>
                <div class="logo-upload">
                  <div class="upload-area" @click="$refs.fileInput.click()">
                    <i class="pi pi-cloud-upload" v-if="!shop.logo"></i>
                    <img v-else :src="shop.logo" alt="Logo boutique" />
                    <input 
                      type="file" 
                      ref="fileInput" 
                      @change="handleLogoUpload" 
                      accept="image/*" 
                      hidden
                    />
                  </div>
                  <Button 
                    label="Choisir un fichier" 
                    class="p-button-outlined"
                    @click="$refs.fileInput.click()"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Step 3: Payment -->
          <div v-if="currentStep === 2">
            <h2 class="step-header">Moyen de paiement</h2>
            <div class="payment-options">
              <div 
                v-for="method in paymentMethods" 
                :key="method.id"
                class="payment-card"
                :class="{selected: paymentMethod === method.id}"
                @click="paymentMethod = method.id"
              >
                <div class="payment-icon">
                  <i :class="method.icon"></i>
                </div>
                <div class="payment-info">
                  <h4>{{ method.name }}</h4>
                  <p>{{ method.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 4: Confirmation -->
          <div v-if="currentStep === 3">
            <div class="confirmation">
              <div class="success-icon">
                <i class="pi pi-check-circle"></i>
              </div>
              <h2 class="step-header">Votre boutique est prête !</h2>
              <p class="confirmation-message">
                Félicitations <strong>{{ user.fullname }}</strong> ! Votre boutique 
                <strong>{{ shop.name }}</strong> a été créée avec succès.
              </p>
              
              <div class="shop-preview">
                <div class="preview-card">
                  <div class="preview-header">
                    <img v-if="shop.logo" :src="shop.logo" alt="Logo boutique" />
                    <div class="shop-info">
                      <h3>{{ shop.name }}</h3>
                      <div class="shop-category">
                        <i class="pi pi-tag"></i>
                        <span>{{ getCategoryName(shop.category) }}</span>
                      </div>
                    </div>
                  </div>
                  <p class="shop-description">{{ shop.description }}</p>
                </div>
              </div>
              
              <div class="benefits">
                <h3>Ce que vous obtenez :</h3>
                <ul>
                  <li><i class="pi pi-check"></i> 14 jours d'essai gratuit</li>
                  <li><i class="pi pi-check"></i> Support technique 24/7</li>
                  <li><i class="pi pi-check"></i> Outils marketing avancés</li>
                  <li><i class="pi pi-check"></i> Analyse de performance en temps réel</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="step-navigation">
          <Button 
            v-if="currentStep > 0"
            label="Précédent"
            icon="pi pi-arrow-left"
            class="p-button-text"
            @click="previousStep"
          />
          
          <Button 
            v-if="currentStep < 3"
            :label="currentStep === 2 ? 'Terminer et créer' : 'Continuer'"
            icon="pi pi-arrow-right"
            iconPos="right"
            :class="{'p-button-success': currentStep === 2}"
            @click="nextStep"
            :disabled="!canProceed"
          />
          
          <Button 
            v-if="currentStep === 3"
            label="Accéder à ma boutique"
            icon="pi pi-store"
            iconPos="right"
            class="p-button-success"
            @click="goToDashboard"
          />
        </div>
      </div>

      <!-- Right Panel: Benefits -->
      <div class="benefits-panel">
        <h2>Transformez votre passion en entreprise</h2>
        
        <div class="benefit-card">
          <div class="benefit-icon">
            <i class="pi pi-rocket"></i>
          </div>
          <div class="benefit-content">
            <h3>Lancez-vous en quelques minutes</h3>
            <p>Notre processus simplifié vous permet de démarrer votre boutique en ligne en un temps record.</p>
          </div>
        </div>
        
        <div class="benefit-card">
          <div class="benefit-icon">
            <i class="pi pi-chart-line"></i>
          </div>
          <div class="benefit-content">
            <h3>Gestion complète</h3>
            <p>Suivi des stocks, gestion des commandes et analyses de performance intégrés.</p>
          </div>
        </div>
        
        <div class="benefit-card">
          <div class="benefit-icon">
            <i class="pi pi-shield"></i>
          </div>
          <div class="benefit-content">
            <h3>Paiements sécurisés</h3>
            <p>Transactions cryptées et protection contre les fraudes pour vous et vos clients.</p>
          </div>
        </div>
        
        <div class="testimonial">
          <Avatar icon="pi pi-user" size="xlarge" shape="circle" />
          <div class="testimonial-content">
            <p class="quote">"NexaShop a transformé mon petit projet en une entreprise florissante !"</p>
            <div class="author">
              <span class="name">Marie Dubois</span>
              <span class="role">Créatrice de bijoux</span>
            </div>
          </div>
        </div>
        
        <div class="partner-logos">
          <div class="logo-item">
            <i class="pi pi-paypal"></i>
            <span>PayPal</span>
          </div>
          <div class="logo-item">
            <i class="pi pi-credit-card"></i>
            <span>Stripe</span>
          </div>
          <div class="logo-item">
            <i class="pi pi-apple"></i>
            <span>Apple Pay</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Dropdown from 'primevue/dropdown';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import Avatar from 'primevue/avatar';

const router = useRouter();
const currentStep = ref(0);
const paymentMethod = ref(null);

const user = ref({
  fullname: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: ''
});

const shop = ref({
  name: '',
  category: null,
  description: '',
  logo: null
});

const steps = [
  { title: 'Informations personnelles', subtitle: 'Vos coordonnées' },
  { title: 'Votre boutique', subtitle: 'Nom et description' },
  { title: 'Paiement', subtitle: 'Moyen de paiement' },
  { title: 'Confirmation', subtitle: 'Récapitulatif' }
];

const shopCategories = [
  { name: 'Mode & Accessoires', code: 'fashion' },
  { name: 'Électronique', code: 'electronics' },
  { name: 'Maison & Jardin', code: 'home' },
  { name: 'Beauté & Cosmétiques', code: 'beauty' },
  { name: 'Alimentation', code: 'food' },
  { name: 'Art & Artisanat', code: 'art' },
  { name: 'Sports & Loisirs', code: 'sports' },
  { name: 'Autre', code: 'other' }
];

const paymentMethods = [
  { id: 'card', name: 'Carte bancaire', icon: 'pi pi-credit-card', description: 'Paiement sécurisé par carte' },
  { id: 'paypal', name: 'PayPal', icon: 'pi pi-paypal', description: 'Paiement via votre compte PayPal' },
  { id: 'transfer', name: 'Virement bancaire', icon: 'pi pi-building', description: 'Virement SEPA' }
];

const passwordStrength = computed(() => {
  if (!user.value.password) return 0;
  if (user.value.password.length < 6) return 1;
  if (user.value.password.length < 8) return 2;
  if (/[A-Z]/.test(user.value.password) && /[0-9]/.test(user.value.password)) return 4;
  return 3;
});

const canProceed = computed(() => {
  if (currentStep.value === 0) {
    return (
      user.value.fullname.length > 3 &&
      user.value.email.includes('@') &&
      user.value.password.length >= 8 &&
      user.value.password === user.value.confirmPassword
    );
  } else if (currentStep.value === 1) {
    return shop.value.name.length > 2 && shop.value.category !== null;
  } else if (currentStep.value === 2) {
    return paymentMethod.value !== null;
  }
  return true;
});

const nextStep = () => {
  if (currentStep.value < 3) {
    currentStep.value++;
  }
};

const previousStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--;
  }
};

const setStep = (stepIndex) => {
  if (stepIndex < currentStep.value) {
    currentStep.value = stepIndex;
  }
};

const handleLogoUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      shop.value.logo = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const getCategoryName = (code) => {
  const category = shopCategories.find(cat => cat.code === code);
  return category ? category.name : '';
};

const goToDashboard = () => {
  router.push('/dashboard');
};

const goToLogin = () => {
  router.push('/login');
};
</script>

<style scoped>
.onboarding-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f8fafc;
  font-family: 'Inter', sans-serif;
}

.onboarding-header {
  display: flex;
  align-items: center;
  padding: 1.5rem 2rem;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.75rem;
  font-weight: 700;
  color: #7c3aed;
  font-family: 'Montserrat', sans-serif;
}

.logo i {
  color: #f97316;
}

.header-content {
  flex: 1;
  margin-left: 2rem;
}

.header-content h1 {
  font-size: 1.5rem;
  color: #1e293b;
  margin-bottom: 0.25rem;
}

.header-content p {
  color: #64748b;
  font-size: 1rem;
}

.login-btn {
  margin-left: auto;
  color: #7c3aed !important;
}

.onboarding-container {
  display: flex;
  flex: 1;
  max-width: 1400px;
  margin: 2rem auto;
  padding: 0 2rem;
  gap: 2rem;
}

.form-steps {
  flex: 1;
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
}

.step-indicator {
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 1.5rem;
  margin-bottom: 2rem;
}

.step {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 0.5rem;
}

.step:last-child {
  margin-bottom: 0;
}

.step:hover:not(.active, .completed) {
  background: #f8fafc;
}

.step.active {
  background: #ede9fe;
  border-left: 4px solid #7c3aed;
}

.step.completed {
  background: #f0fdf4;
  border-left: 4px solid #10b981;
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: #f1f5f9;
  color: #64748b;
  font-weight: 600;
  margin-right: 1rem;
  flex-shrink: 0;
}

.step.active .step-number {
  background: #7c3aed;
  color: white;
}

.step.completed .step-number {
  background: #10b981;
  color: white;
}

.step-title {
  font-weight: 600;
  color: #1e293b;
}

.step-subtitle {
  font-size: 0.875rem;
  color: #64748b;
}

.step.active .step-title {
  color: #7c3aed;
}

.step.completed .step-title {
  color: #10b981;
}

.step-header {
  font-size: 1.75rem;
  color: #1e293b;
  margin-bottom: 2rem;
  position: relative;
  padding-bottom: 1rem;
}

.step-header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 4rem;
  height: 0.25rem;
  background: linear-gradient(to right, #7c3aed, #f97316);
  border-radius: 0.25rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #334155;
}

:deep(.p-inputtext) {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.75rem;
  transition: all 0.3s;
}

:deep(.p-inputtext:focus) {
  border-color: #7c3aed;
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.15);
}

.password-strength {
  display: flex;
  gap: 0.25rem;
  margin-top: 0.5rem;
}

.strength-bar {
  flex: 1;
  height: 0.25rem;
  background: #e2e8f0;
  border-radius: 0.25rem;
}

.strength-bar.filled {
  background: #10b981;
}

.strength-bar:nth-child(1).filled { background: #ef4444; }
.strength-bar:nth-child(2).filled { background: #f59e0b; }
.strength-bar:nth-child(3).filled { background: #10b981; }
.strength-bar:nth-child(4).filled { background: #3b82f6; }

.logo-upload {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.upload-area {
  width: 6rem;
  height: 6rem;
  border: 2px dashed #cbd5e1;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  background: #f8fafc;
}

.upload-area i {
  font-size: 2rem;
  color: #94a3b8;
}

.upload-area img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.payment-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
}

.payment-card {
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s;
}

.payment-card:hover {
  border-color: #a78bfa;
}

.payment-card.selected {
  border-color: #7c3aed;
  background: #f5f3ff;
  box-shadow: 0 5px 15px rgba(124, 58, 237, 0.1);
}

.payment-icon {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 0.75rem;
  background: #ede9fe;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.payment-icon i {
  font-size: 1.75rem;
  color: #7c3aed;
}

.payment-card.selected .payment-icon {
  background: #7c3aed;
}

.payment-card.selected .payment-icon i {
  color: white;
}

.payment-info h4 {
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
  color: #1e293b;
}

.payment-info p {
  color: #64748b;
  font-size: 0.875rem;
}

.confirmation {
  text-align: center;
  padding: 2rem 0;
}

.success-icon {
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  background: #d1fae5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
}

.success-icon i {
  font-size: 3rem;
  color: #10b981;
}

.confirmation-message {
  font-size: 1.125rem;
  max-width: 600px;
  margin: 0 auto 2rem;
  color: #334155;
  line-height: 1.6;
}

.shop-preview {
  max-width: 500px;
  margin: 0 auto 3rem;
}

.preview-card {
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  padding: 1.5rem;
  text-align: left;
}

.preview-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.preview-header img {
  width: 4rem;
  height: 4rem;
  border-radius: 0.75rem;
  object-fit: cover;
}

.shop-info h3 {
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
}

.shop-category {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
}

.shop-category i {
  color: #7c3aed;
}

.shop-description {
  color: #475569;
  line-height: 1.6;
}

.benefits {
  text-align: left;
  max-width: 500px;
  margin: 0 auto;
}

.benefits h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #1e293b;
}

.benefits ul {
  list-style: none;
  padding: 0;
}

.benefits li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e2e8f0;
}

.benefits li:last-child {
  border-bottom: none;
}

.benefits li i {
  color: #10b981;
  font-weight: bold;
}

.step-navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
}

:deep(.p-button) {
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 500;
  transition: all 0.3s;
}

:deep(.p-button-success) {
  background: #10b981;
  border-color: #10b981;
}

:deep(.p-button-success:hover) {
  background: #059669;
  border-color: #059669;
}

.benefits-panel {
  width: 350px;
  background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%);
  border-radius: 1rem;
  padding: 2rem;
  color: white;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.benefits-panel h2 {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  position: relative;
  padding-bottom: 1rem;
}

.benefits-panel h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 3rem;
  height: 0.25rem;
  background: #f97316;
  border-radius: 0.25rem;
}

.benefit-card {
  display: flex;
  gap: 1rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.benefit-card:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.benefit-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.benefit-icon i {
  font-size: 1.5rem;
  color: #f0abfc;
}

.benefit-content h3 {
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
}

.benefit-content p {
  color: #e0e7ff;
  font-size: 0.95rem;
  line-height: 1.6;
}

.testimonial {
  display: flex;
  gap: 1rem;
  padding: 2rem 0;
  margin: 2rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

:deep(.p-avatar) {
  background: rgba(255, 255, 255, 0.1);
  color: #f0abfc;
}

.quote {
  font-style: italic;
  margin-bottom: 0.75rem;
  line-height: 1.6;
}

.author {
  display: flex;
  flex-direction: column;
}

.name {
  font-weight: 600;
}

.role {
  font-size: 0.875rem;
  opacity: 0.8;
}

.partner-logos {
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
}

.logo-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.logo-item i {
  font-size: 1.75rem;
  color: #f0abfc;
}

.logo-item span {
  font-size: 0.875rem;
}

/* Responsive */
@media (max-width: 992px) {
  .onboarding-container {
    flex-direction: column;
  }
  
  .benefits-panel {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .payment-options {
    grid-template-columns: 1fr;
  }
  
  .onboarding-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .header-content {
    margin-left: 0;
  }
  
  .login-btn {
    margin-left: 0;
  }
}
</style>