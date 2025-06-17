<template>
    <div class="ecommerce-page">
      <div class="container">
        <header>
          <div class="logo">
            <i class="fas fa-store"></i>NexaShop eCommerce
            <div class="dunya mini-globe"></div>
          </div>
          <nav>
            <ul>
              <li><a href="#">Accueil</a></li>
              <li><a href="#">Boutiques</a></li>
              <li><a href="#">Produits</a></li>
              <li><a href="#">Vendre</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </nav>
          <div class="user-actions">
            <button class="action-btn buyer-btn" @click="goToBuyerSection">
              <i class="fas fa-shopping-bag"></i> Acheter
            </button>
            <button class="action-btn seller-btn" @click="goToSellerSection">
              <i class="fas fa-store"></i> Vendre
            </button>
          </div>
        </header>
        
        <section class="hero">
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
            Plus de 700 000 boutiques et des millions de produits disponibles - Rejoignez l'aventure <strong>WIX eCommerce</strong>.
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
          <p>&copy; {{ currentYear }} WIX eCommerce. Tous droits réservés.</p>
        </footer>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'EcommercePage',
    data() {
      return {
        currentYear: new Date().getFullYear()
      }
    },
    methods: {
      createShop() {
        alert("Création de votre boutique en cours...");
        // Redirection vers la page de création de boutique
      },
      browseProducts() {
        alert("Redirection vers notre catalogue de produits...");
        // Redirection vers la page des produits
      },
      goToBuyerSection() {
        // Dans une application réelle, on scrollerait vers la section acheteur
        const buyerSection = document.querySelector('.path-card.buyer');
        if (buyerSection) {
          buyerSection.scrollIntoView({ behavior: 'smooth' });
        }
      },
      goToSellerSection() {
        // Dans une application réelle, on scrollerait vers la section vendeur
        const sellerSection = document.querySelector('.path-card.seller');
        if (sellerSection) {
          sellerSection.scrollIntoView({ behavior: 'smooth' });
        }
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
  
  header {
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .logo {
    font-size: 28px;
    font-weight: 700;
    color: #0468ff;
    font-family: 'Montserrat', sans-serif;
    display: flex;
    align-items: center;
  }
  
  .logo i {
    margin-right: 8px;
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
  
  .user-actions {
    display: flex;
    gap: 15px;
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
  
  .hero {
    text-align: center;
    padding: 60px 20px;
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
  
  /* Responsive Design */
  @media (max-width: 992px) {
    header {
      flex-direction: column;
      align-items: flex-start;
    }
    
    nav ul {
      margin-top: 15px;
    }
    
    .user-actions {
      width: 100%;
      justify-content: center;
      margin-top: 20px;
    }
  }
  
  @media (max-width: 768px) {
    h1 {
      font-size: 2.2rem;
    }
    
    .subtitle {
      font-size: 1.3rem;
    }
    
    .hero {
      padding: 40px 20px;
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
  }
  
  @media (max-width: 480px) {
    .action-btn {
      padding: 8px 15px;
      font-size: 0.9rem;
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
  }


/* Styles pour le globe */
.dunya {
  width: 140px;
  height: 140px;
  background: url('https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Equirectangular_projection_SW.jpg/640px-Equirectangular_projection_SW.jpg');
  background-size: 400px;
  animation: spin 20s infinite linear;
  border-radius: 50%;
  margin: 0 auto 1.5rem;
  box-shadow: 0 0 25px rgba(0, 100, 200, 0.3);
  position: relative;
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

.mini-globe {
  width: 40px;
  height: 40px;
  display: inline-block;
  margin: 0 0 -12px 10px;
  animation: spin 15s infinite linear;
}

.hero-content {
  position: relative;
  padding-top: 20px;
}

@keyframes spin {
  0% {
    background-position: 0px 0px;
  }
  100% {
    background-position: 400px 0px;
  }
}

/* Ajustements pour intégrer le globe */
.hero h1 {
  margin-top: 20px;
}

.logo {
  position: relative;
}

footer {
  position: relative;
  padding-top: 60px;
}

footer .dunya {
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 60px;
}

.feature-card {
  position: relative;
  overflow: hidden;
}

.feature-card .dunya {
  width: 80px;
  height: 80px;
  margin: 0 auto 15px;
}

/* Effet de survol amélioré pour les cartes */
.path-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
}

.path-card:hover::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, transparent 70%);
  pointer-events: none;
}

/* Animation de texte pour les pays */
.conclusion strong {
  display: inline-block;
  min-width: 120px;
  text-align: center;
  transition: all 0.5s ease;
  color: #0468ff;
}
  </style>