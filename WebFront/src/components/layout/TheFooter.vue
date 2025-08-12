<template>
  <footer class="footer-container">
    <!-- Section principale du footer -->
    <div class="footer-main">
      <div class="container">
        <div class="footer-grid">
          <!-- Section Brand et Newsletter -->
          <div class="footer-brand">
            <div class="brand-info">
              <div class="logo">
                <i class="pi pi-shopping-bag"></i>
                <span>NexaShop</span>
              </div>
              <p class="brand-description">
                La plateforme e-commerce pour acheteurs et vendeurs. 
                Trouvez tout ce dont vous avez besoin à des prix imbattables.
              </p>
            
              <!-- Newsletter -->
              <div class="newsletter">
                <h4 class="newsletter-title">Abonnez-vous à notre newsletter</h4>
                <form @submit.prevent="handleSubmit" class="newsletter-form">
                  <input 
                    v-model="email" 
                    placeholder="Votre adresse email" 
                    type="email"
                    class="newsletter-input"
                    :class="{ 'error': hasError }"
                    required
                  />
                  <button 
                    class="newsletter-button" 
                    type="submit"
                    :disabled="!email || isLoading"
                  >
                    <i class="pi pi-send"></i>
                  </button>
                </form>
                <p v-if="message" class="newsletter-message" :class="messageType">
                  {{ message }}
                </p>
              </div>
            </div>
          </div>
          
          <!-- Section Acheteur -->
          <div class="footer-section">
            <h4 class="section-title">Acheteur</h4>
            <ul class="section-links">
              <li v-for="link in buyerLinks" :key="link.label">
                <a :href="link.href" class="section-link">
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </div>
          
          <!-- Section Vendeur -->
          <div class="footer-section">
            <h4 class="section-title">Vendeur</h4>
            <ul class="section-links">
              <li v-for="link in sellerLinks" :key="link.label">
                <a :href="link.href" class="section-link">
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </div>
          
          <!-- Section Contact -->
          <div class="footer-contact">
            <h4 class="contact-title">Contact</h4>
            
            <!-- Informations de contact -->
            <ul class="contact-info">
              <li v-for="contact in contactInfo" :key="contact.type">
                <i :class="contact.icon"></i>
                <span>{{ contact.text }}</span>
              </li>
            </ul>
            
            <!-- Réseaux sociaux -->
            <div class="social-links">
              <button 
                v-for="social in socialNetworks" 
                :key="social.name"
                :class="['social-button', social.icon]"
                @click="openSocialLink(social.url)"
                :aria-label="`Suivez-nous sur ${social.name}`"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Section du bas avec liens légaux et moyens de paiement -->
    <div class="footer-bottom">
      <div class="container">
        <div class="footer-bottom-content">
          <!-- Liens légaux -->
          <nav class="legal-links" aria-label="Liens légaux">
            <a v-for="link in legalLinks" :key="link.label" :href="link.href">
              {{ link.label }}
            </a>
          </nav>
          
          <!-- Moyens de paiement -->
          <div class="payment-methods" aria-label="Moyens de paiement acceptés">
            <i 
              v-for="payment in paymentMethods" 
              :key="payment.name"
              :class="payment.icon"
              class="payment-icon"
              :title="payment.name"
            ></i>
          </div>
          
          <!-- Copyright -->
          <p class="copyright">
            &copy; {{ currentYear }} NexaShop. Tous droits réservés.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed } from 'vue';

// Données pour les liens acheteur
const buyerLinks = [
  { label: 'Comment acheter', href: '#' },
  { label: 'Paiements sécurisés', href: '#' },
  { label: 'Suivi de commande', href: '#' },
  { label: 'Retours et remboursements', href: '#' },
  { label: 'Questions fréquentes', href: '#' }
];

// Données pour les liens vendeur
const sellerLinks = [
  { label: 'Devenir vendeur', href: '#' },
  { label: 'Gestion de boutique', href: '#' },
  { label: 'Frais de vente', href: '#' },
  { label: 'Ressources pour vendeurs', href: '#' },
  { label: 'Programme de fidélité', href: '#' }
];

// Données de contact
const contactInfo = [
  { type: 'address', icon: 'pi pi-map-marker', text: '123 Rue du Commerce, Paris' },
  { type: 'phone', icon: 'pi pi-phone', text: '+33 1 23 45 67 89' },
  { type: 'email', icon: 'pi pi-envelope', text: 'contact@nexashop.fr' },
  { type: 'support', icon: 'pi pi-reddit', text: 'Support 24/7' }
];

// Réseaux sociaux
const socialNetworks = [
  { name: 'Facebook', icon: 'pi pi-facebook', url: 'https://facebook.com' },
  { name: 'Twitter', icon: 'pi pi-twitter', url: 'https://twitter.com' },
  { name: 'Instagram', icon: 'pi pi-instagram', url: 'https://instagram.com' },
  { name: 'YouTube', icon: 'pi pi-youtube', url: 'https://youtube.com' },
  { name: 'LinkedIn', icon: 'pi pi-linkedin', url: 'https://linkedin.com' }
];

// Liens légaux
const legalLinks = [
  { label: 'À propos', href: '#' },
  { label: 'Conditions d\'utilisation', href: '#' },
  { label: 'Politique de confidentialité', href: '#' },
  { label: 'FAQ', href: '#' },
  { label: 'Support', href: '#' }
];

// Moyens de paiement
const paymentMethods = [
  { name: 'Carte bancaire', icon: 'pi pi-credit-card' },
  { name: 'PayPal', icon: 'pi pi-paypal' },
  { name: 'Apple Pay', icon: 'pi pi-apple' },
  { name: 'Google Pay', icon: 'pi pi-google' }
];

// Newsletter
const email = ref('');
const isLoading = ref(false);
const hasError = ref(false);
const message = ref('');
const messageType = ref('');

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const handleSubmit = async () => {
  hasError.value = false;
  message.value = '';
  
  if (!validateEmail(email.value)) {
    hasError.value = true;
    message.value = 'Veuillez entrer une adresse email valide';
    messageType.value = 'error';
    return;
  }
  
  isLoading.value = true;
  
  try {
    // Simulation d'un appel API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    message.value = 'Merci pour votre abonnement !';
    messageType.value = 'success';
    email.value = '';
  } catch (error) {
    message.value = 'Une erreur est survenue. Veuillez réessayer.';
    messageType.value = 'error';
  } finally {
    isLoading.value = false;
  }
};

// Ouvrir les liens sociaux
const openSocialLink = (url) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};

// Année actuelle pour le copyright
const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
/* Styles globaux du footer */
.footer-container {
  background-color: #1e293b;
  color: #cbd5e1;
  font-family: 'Poppins', sans-serif;
  margin-top: 80px;
  animation: footerAppear 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes footerAppear {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Styles de la section principale */
.footer-main {
  padding: 60px 0 40px;
  border-bottom: 1px solid #334155;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
}

/* Styles de la marque */
.footer-brand {
  padding: 0 15px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 28px;
  font-weight: 700;
  color: #8b5cf6;
  margin-bottom: 20px;
}

.logo i {
  color: #f97316;
}

.brand-description {
  margin-bottom: 30px;
  line-height: 1.7;
  font-size: 1.05rem;
  color: #cbd5e1;
}

/* Styles des sections */
.footer-section {
  padding: 0 15px;
}

.section-title {
  font-size: 1.3rem;
  margin-bottom: 25px;
  color: white;
  position: relative;
  padding-bottom: 12px;
  font-family: 'Montserrat', sans-serif;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 3px;
  background: #8b5cf6;
  border-radius: 2px;
}

.section-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.section-links li {
  margin-bottom: 15px;
}

.section-link {
  color: #cbd5e1;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  font-size: 1.05rem;
}

.section-link:hover {
  color: white;
  padding-left: 8px;
}

.section-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: #8b5cf6;
  transition: width 0.3s ease;
}

.section-link:hover::after {
  width: 100%;
}

/* Styles de contact */
.footer-contact {
  padding: 0 15px;
}

.contact-title {
  font-size: 1.3rem;
  margin-bottom: 25px;
  color: white;
  position: relative;
  padding-bottom: 12px;
  font-family: 'Montserrat', sans-serif;
}

.contact-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 3px;
  background: #8b5cf6;
  border-radius: 2px;
}

.contact-info {
  list-style: none;
  padding: 0;
  margin: 0 0 25px 0;
}

.contact-info li {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  margin-bottom: 18px;
  line-height: 1.6;
  color: #cbd5e1;
}

.contact-info i {
  color: #8b5cf6;
  font-size: 1.2rem;
  margin-top: 3px;
  flex-shrink: 0;
}

/* Newsletter */
.newsletter {
  margin-top: 30px;
}

.newsletter-title {
  font-size: 1.1rem;
  margin-bottom: 15px;
  color: white;
  font-weight: 600;
}

.newsletter-form {
  display: flex;
  gap: 10px;
}

.newsletter-input {
  flex: 1;
  padding: 15px 20px;
  border-radius: 8px;
  border: 1px solid #334155;
  background: #1e293b;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.newsletter-input:focus {
  border-color: #8b5cf6;
  outline: none;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
}

.newsletter-input.error {
  border-color: #ef4444;
}

.newsletter-button {
  background: #8b5cf6;
  border: none;
  width: 55px;
  height: 55px;
  border-radius: 8px;
  transition: all 0.3s ease;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.newsletter-button:hover:not(:disabled) {
  background: #7c3aed;
  transform: translateY(-3px);
}

.newsletter-button:disabled {
  opacity: 0.6;
  transform: none;
  cursor: not-allowed;
}

.newsletter-message {
  margin-top: 10px;
  font-size: 0.9rem;
}

.newsletter-message.success {
  color: #22c55e;
}

.newsletter-message.error {
  color: #ef4444;
}

/* Réseaux sociaux */
.social-links {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.social-button {
  background: #334155;
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.social-button:hover {
  background: #8b5cf6;
  transform: translateY(-3px);
}

/* Section bas du footer */
.footer-bottom {
  padding: 30px 0;
}

.footer-bottom-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
}

.legal-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
}

.legal-links a {
  color: #cbd5e1;
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 0.95rem;
}

.legal-links a:hover {
  color: #8b5cf6;
}

.copyright {
  color: #94a3b8;
  font-size: 0.95rem;
  text-align: center;
  margin: 0;
}

/* Moyens de paiement */
.payment-methods {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

.payment-icon {
  font-size: 2.2rem;
  color: #94a3b8;
  transition: all 0.3s ease;
  cursor: default;
}

.payment-icon:hover {
  color: #8b5cf6;
  transform: translateY(-3px);
}

/* Responsive */
@media (max-width: 992px) {
  .footer-main {
    padding: 40px 0 30px;
  }
  
  .footer-grid {
    gap: 30px;
  }
  
  .brand-description {
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .footer-section,
  .footer-contact,
  .footer-brand {
    padding: 0;
  }
  
  .section-link {
    font-size: 1rem;
  }
  
  .newsletter-form {
    flex-direction: column;
  }
  
  .newsletter-button {
    width: 100%;
    height: 50px;
  }
}

@media (max-width: 480px) {
  .legal-links {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
  
  .payment-methods {
    gap: 15px;
  }
  
  .payment-icon {
    font-size: 1.8rem;
  }
  
  .social-links {
    justify-content: center;
  }
}
</style>