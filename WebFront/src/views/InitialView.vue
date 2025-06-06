<template>
  <div class="ecommerce-page">
    <div class="container">
<header>
  <div class="header-grid">
    <div class="logo-container">
      <div class="logo">
        <i class="fas fa-store"></i>
        <span>NexaShop eCommerce</span>
        <div class="dunya mini-globe">
          <div class="mini-orbit"></div>
        </div>
      </div>
    </div>
    
    <nav class="main-nav">
      <ul>
        <li><a href="#">Accueil</a></li>
        <li><a href="#">Boutiques</a></li>
        <!-- <li><a href="#">Produits</a></li>
        <li><a href="#">Vendre</a></li>
        <li><a href="#">Contact</a></li> -->
      </ul>
    </nav>

    <div class="header-actions">
      <div v-if="!isLoggedIn" class="login-section">
        <button class="action-btn login-btn" @click="goToLogin">
          <i class="fas fa-sign-in-alt"></i> Se connecter
        </button>
      </div>
      
      <div v-else class="user-menu">
        <button class="user-profile-btn" @click="toggleUserMenu">
          <i class="fas fa-user-circle"></i>
          <span>{{ user.name }}</span>
        </button>
        <div v-if="showUserMenu" class="dropdown-menu">
          <button @click="goToDashboard">
            <i class="fas fa-tachometer-alt"></i> Tableau de bord
          </button>
          <button @click="logout">
            <i class="fas fa-sign-out-alt"></i> Déconnexion
          </button>
        </div>
      </div>

      <button class="action-btn buyer-btn" @click="goToBuyerSection">
        <i class="fas fa-shopping-bag"></i> Acheter
      </button>
      <button class="action-btn seller-btn" @click="goToSellerSection">
        <i class="fas fa-store"></i> Vendre
      </button>
    </div>
    <!-- Test  -->
     
  </div>
</header>
      
      <section class="hero">
        <!-- <div class="globe-container">
          <div class="dunya main-globe">
            <div class="orbit"></div>
            <div class="satellite"></div>
          </div>
        </div> -->
        
        <h1>Commencez à vendre ou acheter en ligne</h1>
        <div class="subtitle">Une solution e-Commerce complète pour tous</div>
        
        <div class="path-selector">
          <div class="path-card seller">
            <i class="fas fa-store"></i>
            <h2>Je veux vendre</h2>
            <p>Créez votre boutique en ligne et commencez à vendre vos produits à des milliers de clients potentiels.</p>
            <button class="path-btn seller-path-btn" @click="createShop">
              Créer ma boutique
            </button>
          </div>
          
          <div class="path-card buyer">
            <i class="fas fa-shopping-bag"></i>
            <h2>Je veux acheter</h2>
            <p>Découvrez des milliers de produits uniques de nos boutiques partenaires et faites vos achats en toute sécurité.</p>
            <button class="path-btn buyer-path-btn" @click="browseProducts">
              Parcourir les produits
            </button>
          </div>
        </div>
        
        <div class="content-box">
          <p>Que vous soyez entrepreneur ou consommateur, notre plateforme offre une expérience e-commerce optimale. Vendeurs : démarquez-vous avec une boutique professionnelle. Acheteurs : découvrez des produits de qualité.</p>
        </div>
        
        <div class="divider"></div>
        
        <p class="conclusion">
          Plus de 700 000 boutiques et des millions de produits disponibles - Rejoignez l'aventure <strong>NexaShop eCommerce</strong>.
        </p>
      </section>
      
      <div class="features">
        <div class="feature-card">
          <i class="fas fa-shopping-cart"></i>
          <h3>Boutique Complète</h3>
          <p>Créez une boutique professionnelle avec tous les outils nécessaires pour vendre en ligne.</p>
        </div>
        
        <div class="feature-card">
          <i class="fas fa-search"></i>
          <h3>Découverte Facile</h3>
          <p>Trouvez facilement les produits que vous cherchez grâce à notre moteur de recherche avancé.</p>
        </div>
        
        <div class="feature-card">
          <i class="fas fa-shield-alt"></i>
          <h3>Paiements Sécurisés</h3>
          <p>Transactions 100% sécurisées pour acheteurs et vendeurs.</p>
        </div>
        
        <div class="feature-card">
          <i class="fas fa-truck"></i>
          <h3>Livraison Rapide</h3>
          <p>Options de livraison flexibles et suivis en temps réel.</p>
        </div>
      </div>
      
      <section class="cta-section">
        <h2>Prêt à commencer ?</h2>
        <p>Rejoignez notre communauté de plus de 2 millions d'utilisateurs</p>
        <div class="path-selector">
          <button class="path-btn seller-path-btn" @click="createShop">
            Créer votre boutique
          </button>
          <button class="path-btn buyer-path-btn" @click="browseProducts">
            Parcourir les produits
          </button>
        </div>
        <div class="trial-text">
          Essai gratuit et sans limite de temps pour les vendeurs
        </div>
      </section>
      
      <footer>
        <p>&copy; {{ currentYear }} NexaShop eCommerce. Tous droits réservés.</p>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EcommercePage',
  data() {
    return {
      currentYear: new Date().getFullYear(),
      isLoggedIn: false, // À remplacer par une vérification réelle
      user: {
        name: "Jean Dupont",
        role: "seller" // ou "buyer"
      },
      showUserMenu: false
    }
  },
  mounted() {
    // Vérifier si l'utilisateur est connecté (simulation)
    this.checkAuthStatus();
  },
  methods: {
    createShop() {
      // Enregistrer l'intention avant redirection
      localStorage.setItem('intendedPath', '/signup');
      
      if (this.isLoggedIn && this.user.role === 'seller') {
        this.$router.push('/seller-dashboard');
      } else {
        this.$router.push('/signup');
      }
    },
    browseProducts() {
      if (this.isLoggedIn && this.user.role === 'buyer') {
        this.$router.push('/buyer-home');
      } else {
        this.$router.push('/products');
      }
    },
    goToBuyerSection() {
      const buyerSection = document.querySelector('.path-card.buyer');
      if (buyerSection) {
        buyerSection.scrollIntoView({ behavior: 'smooth' });
      }
    },
    goToSellerSection() {
      const sellerSection = document.querySelector('.path-card.seller');
      if (sellerSection) {
        sellerSection.scrollIntoView({ behavior: 'smooth' });
      }
    },
    goToLogin() {
      // Redirection intelligente basée sur l'intention
      const intendedPath = localStorage.getItem('intendedPath') || '/login';
      this.$router.push(intendedPath);
    },
    goToDashboard() {
      this.showUserMenu = false;
      if (this.user.role === 'seller') {
        this.$router.push('/seller-dashboard');
      } else {
        this.$router.push('/buyer-home');
      }
    },
    logout() {
      // Logique de déconnexion
      this.isLoggedIn = false;
      this.showUserMenu = false;
      localStorage.removeItem('authToken');
    },
    toggleUserMenu() {
      this.showUserMenu = !this.showUserMenu;
    },
    checkAuthStatus() {
      // Simuler une vérification d'authentification
      const token = localStorage.getItem('authToken');
      this.isLoggedIn = !!token;
    }
  }
}
</script>


<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.ecommerce-page {
  font-family: 'Open Sans', sans-serif;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  color: #333;
  line-height: 1.6;
  min-height: 100vh;
  padding: 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}




.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  font-size: 28px;
  font-weight: 700;
  color: #0468ff;
  font-family: 'Montserrat', sans-serif;
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
}

.logo i {
  color: #ff7a00;
}

nav ul {
  display: flex;
  list-style: none;
  flex-wrap: wrap;
}

nav li {
  margin-left: 20px;
}

nav a {
  text-decoration: none;
  color: #555;
  font-weight: 500;
  transition: color 0.3s;
  font-size: 16px;
}

nav a:hover {
  color: #0468ff;
}

/* .user-actions {
  display: flex;
  gap: 15px;
} */

.user-actions {
  display: flex;
  gap: 15px;
  align-items: center;
  position: relative;
}

.action-btn {
  padding: 8px 20px;
  border-radius: 50px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  border: 2px solid transparent;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

.login-btn {
  background: #6c757d;
  color: white;
}

.login-btn:hover {
  background: #5a6268;
  transform: translateY(-2px);
}

.buyer-btn {
  background: #20c997;
  color: white;
}

.buyer-btn:hover {
  background: #1aa179;
  transform: translateY(-2px);
}

.seller-btn {
  background: #0468ff;
  color: white;
}

.seller-btn:hover {
  background: #0353d9;
  transform: translateY(-2px);
}

/* Menu utilisateur */
.user-menu {
  position: relative;
}

.user-profile-btn {
  padding: 8px 15px;
  background: #e9ecef;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
}

.user-profile-btn:hover {
  background: #dde0e3;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  width: 200px;
  z-index: 100;
  overflow: hidden;
  margin-top: 5px;
}

.dropdown-menu button {
  width: 100%;
  text-align: left;
  padding: 12px 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  background: none;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
}

.dropdown-menu button:hover {
  background: #f8f9fa;
}

.hero {
  text-align: center;
  padding: 80px 20px 60px;
  margin: 40px 0;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: "";
  position: absolute;
  top: -50px;
  right: -50px;
  width: 200px;
  height: 200px;
  background: linear-gradient(45deg, #0468ff, #00c6ff);
  border-radius: 50%;
  opacity: 0.1;
}

.hero::after {
  content: "";
  position: absolute;
  bottom: -80px;
  left: -50px;
  width: 250px;
  height: 250px;
  background: linear-gradient(45deg, #ff7a00, #ffd000);
  border-radius: 50%;
  opacity: 0.1;
}

.glow-effect {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 220px;
  height: 220px;
  background: radial-gradient(circle, rgba(4, 104, 255, 0.2) 0%, transparent 70%);
  border-radius: 50%;
  z-index: 1;
}

.globe-container {
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto 40px;
}

.dunya {
  background: url('https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Equirectangular_projection_SW.jpg/640px-Equirectangular_projection_SW.jpg');
  background-size: 400px;
  border-radius: 50%;
  position: relative;
  box-shadow: 0 0 25px rgba(0, 100, 200, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.dunya::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, transparent 60%, rgba(0, 50, 100, 0.2));
  border-radius: 50%;
}

.main-globe {
  width: 180px;
  height: 180px;
  animation: spin 20s infinite linear;
  margin: 0 auto;
}

.mini-globe {
  position: relative;
  width: 80px;
  height: 80px;
  animation: spin 15s infinite linear;
  box-shadow: 0 0 10px rgba(0, 100, 255, 0.3);
}

.orbit {
  position: absolute;
  top: -15px;
  left: -15px;
  width: 210px;
  height: 210px;
  border: 2px dashed rgba(4, 104, 255, 0.2);
  border-radius: 50%;
  animation: rotate 20s infinite linear;
}

.mini-orbit {
  position: absolute;
  top: -10%;  /* Changé de -8px à pourcentage */
  left: -10%; /* Changé de -8px à pourcentage */
  width: 120%; /* Changé de 94px à pourcentage */
  height: 120%; /* Changé de 94px à pourcentage */
  border: 1px dashed rgba(4, 104, 255, 0.2);
  border-radius: 50%;
  animation: rotate 12s infinite linear;
}

.satellite {
  position: absolute;
  top: 0;
  left: 50%;
  width: 10px;
  height: 10px;
  background: #0468ff;
  border-radius: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 8px #0468ff;
}

.mini-satellite {
  position: absolute;
  top: -12.5%; /* Changé de -10px à pourcentage */
  left: 50%;
  width: 7.5%; /* Changé de 6px à pourcentage */
  height: 7.5%; /* Changé de 6px à pourcentage */
  background: #0468ff;
  border-radius: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 5px #0468ff;
}

@keyframes spin {
  0% {
    background-position: 0px 0px;
  }
  100% {
    background-position: 400px 0px;
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

h1 {
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #1a1a1a;
  font-family: 'Montserrat', sans-serif;
  line-height: 1.2;
}

.subtitle {
  font-size: 1.5rem;
  color: #0468ff;
  margin-bottom: 40px;
  font-weight: 500;
}

.path-selector {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin: 40px 0;
  flex-wrap: wrap;
}

.path-card {
  background: white;
  border-radius: 16px;
  padding: 30px;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transition: all 0.4s;
  border: 2px solid transparent;
  text-align: center;
  flex: 1;
  min-width: 300px;
}

.path-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.path-card.seller {
  border-top: 6px solid #0468ff;
}

.path-card.buyer {
  border-top: 6px solid #20c997;
}

.path-card i {
  font-size: 3rem;
  margin-bottom: 25px;
  display: block;
}

.path-card.seller i {
  color: #0468ff;
}

.path-card.buyer i {
  color: #20c997;
}

.path-card h2 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  font-family: 'Montserrat', sans-serif;
}

.path-card p {
  color: #555;
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 30px;
}

.path-btn {
  padding: 14px 35px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
  width: 100%;
  max-width: 300px;
}

.seller-path-btn {
  background: #0468ff;
  color: white;
}

.seller-path-btn:hover {
  background: #0353d9;
  transform: translateY(-3px);
}

.buyer-path-btn {
  background: #20c997;
  color: white;
}

.buyer-path-btn:hover {
  background: #1aa179;
  transform: translateY(-3px);
}

.content-box {
  max-width: 800px;
  margin: 0 auto 50px;
  padding: 30px;
  background: #f8f9fa;
  border-radius: 12px;
  position: relative;
  z-index: 2;
}

.content-box p {
  font-size: 1.1rem;
  color: #4d4d4d;
  text-align: center;
  line-height: 1.8;
}

.divider {
  height: 2px;
  background: linear-gradient(90deg, transparent, #0468ff, #20c997, transparent);
  width: 80%;
  margin: 50px auto;
  max-width: 500px;
  border-radius: 2px;
}

.conclusion {
  max-width: 800px;
  margin: 0 auto;
  font-size: 1.2rem;
  color: #333;
  font-weight: 500;
  text-align: center;
  padding: 0 20px;
  line-height: 1.7;
}

.conclusion strong {
  color: #0468ff;
  font-weight: 700;
}

.features {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  margin: 60px 0;
}

.feature-card {
  background: white;
  border-radius: 12px;
  padding: 30px;
  width: 100%;
  max-width: 280px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.feature-card i {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #0468ff;
}

.feature-card h3 {
  font-size: 1.4rem;
  margin-bottom: 15px;
  color: #1a1a1a;
  font-family: 'Montserrat', sans-serif;
}

.feature-card p {
  color: #666;
  font-size: 1rem;
}

.cta-section {
  text-align: center;
  margin: 60px 0;
  padding: 40px;
  background: linear-gradient(135deg, #0468ff 0%, #20c997 100%);
  border-radius: 16px;
  color: white;
}

.cta-section h2 {
  font-size: 2rem;
  margin-bottom: 20px;
  font-weight: 600;
}

.cta-section .path-selector {
  margin-top: 30px;
}

.cta-section .path-btn {
  width: auto;
  padding: 14px 40px;
}

.trial-text {
  font-size: 1rem;
  margin-top: 15px;
  font-style: italic;
  opacity: 0.9;
}

footer {
  text-align: center;
  padding: 30px 0;
  color: #666;
  font-size: 0.9rem;
  border-top: 1px solid #eee;
  margin-top: 40px;
}

/* Here */
/* Nouveau système de grille pour l'alignement */
.header-grid {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  width: 100%;
  gap: 30px;
}

.main-nav ul {
  display: flex;
  gap: 25px;
  justify-content: center;
  margin: 0;
  padding: 0;
}

.main-nav li {
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  flex-wrap: nowrap;
}

/* Ajustements pour les boutons */
.action-btn {
  padding: 10px 18px;
  font-size: 0.95rem;
}

/* Responsive */
@media (max-width: 1100px) {
  .header-grid {
    gap: 15px;
  }
  
  .main-nav ul {
    gap: 15px;
  }
  
  .action-btn {
    padding: 8px 15px;
  }
}

@media (max-width: 992px) {
  .header-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    gap: 15px;
  }
  
  .logo-container {
    text-align: center;
  }
  
  .main-nav ul {
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .header-actions {
    justify-content: center;
    flex-wrap: wrap;
  }
}

@media (max-width: 768px) {
  .action-btn {
    font-size: 0.85rem;
    padding: 7px 12px;
  }
  
  .main-nav ul {
    gap: 10px;
  }
}

/* End */

@media (max-width: 768px) {
  h1 {
    font-size: 2.2rem;
  }
  
  .subtitle {
    font-size: 1.3rem;
  }
  
  .hero {
    padding: 60px 20px 40px;
  }
  
  nav ul {
    justify-content: center;
  }
  
  nav li {
    margin: 0 10px;
  }
  
  .content-box p {
    font-size: 1rem;
  }
  
  .conclusion {
    font-size: 1.1rem;
  }
  
  .features {
    flex-direction: column;
    align-items: center;
  }
  
  .path-card h2 {
    font-size: 1.6rem;
  }
  
  .path-card {
    padding: 25px 15px;
  }
  
  .cta-section {
    padding: 30px 20px;
  }
  
  .globe-container {
    width: 160px;
    height: 160px;
  }
  
  .main-globe {
    width: 140px;
    height: 140px;
  }
  
  .orbit {
    width: 170px;
    height: 170px;
  }
}

@media (max-width: 480px) {
  .action-btn {
    padding: 8px 15px;
    font-size: 0.9rem;
  }
  
  .mini-globe {
    width: 48px;
    height: 48px;
  }

  .path-btn {
    padding: 12px 20px;
    font-size: 1rem;
  }
  
  .cta-section .path-selector {
    flex-direction: column;
    gap: 15px;
  }
  
  .cta-section .path-btn {
    width: 100%;
  }
  
  h1 {
    font-size: 1.8rem;
  }
  
  
/* Alignement du logo */
.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  font-size: 28px;
  font-weight: 700;
  color: #0468ff;
  font-family: 'Montserrat', sans-serif;
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
}

.mini-globe {
  width: 48px;
  height: 48px;
  position: relative;
  margin-left: 10px;
}
}

</style>