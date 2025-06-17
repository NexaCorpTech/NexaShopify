<template>
  <section class="hero">
    <!-- Remplacement du carrousel par la bannière SVG -->
    <div class="banner-container">
      <div class="banner-svg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450">
          <!-- Fond avec texture néo-brutaliste -->
          <defs>
            <pattern id="texture" patternUnits="userSpaceOnUse" width="40" height="40">
              <path d="M0,0 L40,40 M-10,10 L50,50 M30,-10 L70,30" stroke="rgba(0,0,0,0.05)" stroke-width="1"/>
            </pattern>
          </defs>
          
          <rect width="800" height="450" fill="#f8fafc"/>
          <rect width="800" height="450" fill="url(#texture)"/>
          
          <!-- Cadre principal -->
          <rect x="50" y="50" width="700" height="350" rx="20" fill="white" stroke="#000" stroke-width="8"/>
          
          <!-- Logo Nexa Shop -->
          <g transform="translate(400, 225)">
            <!-- Cercle décoratif avec effet 3D -->
            <circle cx="0" cy="0" r="100" fill="#f8fafc" stroke="#000" stroke-width="6"/>
            
            <!-- Éléments décoratifs du logo avec style néo-brutaliste -->
            <path d="M-50,-20 L50,-20" stroke="#000" stroke-width="6" stroke-linecap="round"/>
            <path d="M-50,20 L50,20" stroke="#000" stroke-width="6" stroke-linecap="round"/>
            <path d="M-20,-50 L-20,50" stroke="#000" stroke-width="6" stroke-linecap="round"/>
            <path d="M20,-50 L20,50" stroke="#000" stroke-width="6" stroke-linecap="round"/>
            
            <!-- Texte NEXA -->
            <text x="0" y="-15" font-family="'Montserrat', sans-serif" font-weight="800" font-size="48" fill="#000" text-anchor="middle" letter-spacing="2">NEXA</text>
            
            <!-- Texte SHOP -->
            <text x="0" y="35" font-family="'Montserrat', sans-serif" font-weight="700" font-size="32" fill="#8b5cf6" text-anchor="middle" letter-spacing="2">SHOP</text>
          </g>
          
          <!-- Éléments décoratifs supplémentaires -->
          <circle cx="650" cy="100" r="30" fill="#f97316" stroke="#000" stroke-width="4"/>
          <circle cx="150" cy="350" r="40" fill="#10b981" stroke="#000" stroke-width="4"/>
          <rect x="600" y="320" width="60" height="60" rx="10" fill="#8b5cf6" stroke="#000" stroke-width="4" transform="rotate(45 630 350)"/>
        </svg>
      </div>
      
      <!-- Overlay sombre pour améliorer la lisibilité du texte -->
      <div class="banner-overlay"></div>
    </div>
    
    <!-- Contenu Hero principal -->
    <div class="container">
      <div class="hero-content">
        <h1 class="animated-headline">
          <span class="static-text">Commencez à </span>
          <span class="rotating-words-container">
            <span class="rotating-words">
              <span class="rotating-word">vendre en ligne</span>
              <span class="rotating-word">acheter en ligne</span>
              <span class="rotating-word">découvrir</span>
              <span class="rotating-word">explorer</span>
            </span>
          </span>
        </h1>
        
        <p>Une solution e-Commerce complète pour tous vos besoins</p>
        
        <div class="hero-card">
          <h2><i class="fas fa-route"></i> Choisissez votre parcours</h2>
          
          <div class="hero-btns">
            <a href="#products-section" class="btn btn-primary">
              <i class="fas fa-shopping-bag"></i> Parcourir les produits
            </a>
            <button class="btn btn-seller">
              <i class="fas fa-store"></i> Créer ma boutique
            </button>
            <button class="btn btn-boutique">
              <i class="fas fa-door-open"></i> Accéder à ma boutique
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Statistiques en temps réel -->
    <div class="live-stats">
      <div class="stat">
        <i class="fas fa-users"></i>
        <span>{{ liveUsers }}</span> utilisateurs en ligne
      </div>
      <div class="stat">
        <i class="fas fa-shopping-cart"></i>
        <span>{{ recentOrders }}</span> commandes cette heure
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection',
  data() {
    return {
      liveUsers: 1242,
      recentOrders: 568
    }
  },
  mounted() {
    // Mettre à jour les statistiques en temps réel
    setInterval(() => {
      this.liveUsers = Math.floor(Math.random() * 100) + 1200;
      this.recentOrders = Math.floor(Math.random() * 50) + 550;
    }, 5000);
  }
}
</script>

<style scoped>
:root {
  --primary: #8b5cf6;
  --primary-dark: #7c3aed;
  --seller-accent: #f97316;
  --secondary: #10b981;
  --dark: #1e293b;
  --light: #f8fafc;
}

.hero {
  position: relative;
  height: 100vh;
  max-height: 800px;
  overflow: hidden;
  margin-bottom: 50px;
}

/* Nouveau conteneur pour la bannière SVG */
.banner-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
}

.banner-svg {
  width: 100%;
  max-width: 1200px;
  height: auto;
  padding: 20px;
  animation: float 6s infinite ease-in-out;
}

.banner-svg svg {
  width: 100%;
  height: auto;
  border: 3px solid #000;
  box-shadow: 15px 15px 0 rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  background: white;
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 100%);
  z-index: 1;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 10;
  height: 100%;
  display: flex;
  align-items: center;
}

.hero-content {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  padding: 20px;
}

/* Animation du titre */
.animated-headline {
  font-size: 3rem;
  margin-bottom: 20px;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  line-height: 1.2;
}

.static-text {
  display: inline;
  white-space: nowrap;
}

.rotating-words-container {
  display: inline-block;
  position: relative;
  text-align: left;
  margin-left: 0.3em;
  vertical-align: top;
  min-width: 300px;
  height: 1.2em;
}

.rotating-words {
  position: relative;
  display: block;
  height: 100%;
}

.rotating-word {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  animation: rotateWords 12s infinite;
  font-weight: bold;
  color: #ffde59;
  white-space: nowrap;
  line-height: 1.2em;
  width: max-content;
}

.rotating-word:nth-child(1) { animation-delay: 0s; }
.rotating-word:nth-child(2) { animation-delay: 3s; }
.rotating-word:nth-child(3) { animation-delay: 6s; }
.rotating-word:nth-child(4) { animation-delay: 9s; }

@keyframes rotateWords {
  0% { opacity: 0; transform: translateY(20px); }
  3% { opacity: 1; transform: translateY(0); }
  20% { opacity: 1; transform: translateY(0); }
  23% { opacity: 0; transform: translateY(-20px); }
  100% { opacity: 0; transform: translateY(-20px); }
}

.hero p {
  font-size: 1.4rem;
  margin-bottom: 40px;
  opacity: 0.9;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  animation: fadeInUp 1.2s ease;
}

.hero-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 30px;
  max-width: 800px;
  margin: 40px auto 0;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: fadeIn 1.5s ease;
  transform: translateZ(20px);
  border: 3px solid #000;
  box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.2);
}

.hero-card h2 {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  font-weight: 600;
  font-size: 1.5rem;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.hero-btns {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 30px;
  flex-wrap: wrap;
}

.btn {
  padding: 15px 25px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  min-width: 200px;
  flex: 1;
  font-size: 1rem;
  position: relative;
  overflow: hidden;
  border: 3px solid #000 !important;
  box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.2);
}

.btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(-100%);
  transition: transform 0.4s ease;
}

.btn:hover::after {
  transform: translateX(0);
}

.btn:hover {
  transform: translateY(-5px);
  box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.3);
}

.btn:active {
  transform: scale(0.98);
  transition: transform 0.1s;
}

.btn-primary {
  background: var(--primary);
  color: white;
}

.btn-primary:hover {
  background: var(--primary-dark);
}

.btn-seller {
  background: var(--seller-accent);
  color: white;
}

.btn-seller:hover {
  background: #ea580c;
}

.btn-boutique {
  background: var(--secondary);
  color: white;
}

.btn-boutique:hover {
  background: #059669;
}

/* Statistiques en temps réel */
.live-stats {
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 20px;
  z-index: 15;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 30px;
  padding: 10px 20px;
  animation: fadeIn 2s ease;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.stat {
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
  font-size: 0.9rem;
}

.stat i {
  color: #ffde59;
}

.stat span {
  font-weight: 700;
  color: #ffde59;
}

@keyframes float {
  0% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0); }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Responsive */
@media (max-width: 1100px) {
  .hero h1 {
    font-size: 2.5rem;
  }
  
  .animated-headline {
    font-size: 2.5rem;
  }
  
  .rotating-words-container {
    min-width: 280px;
  }
  
  .hero-btns {
    gap: 12px;
  }
  
  .btn {
    min-width: 180px;
    padding: 12px 15px;
  }
}

@media (max-width: 900px) {
  .hero-card {
    max-width: 700px;
  }
  
  .hero-btns {
    flex-wrap: wrap;
  }
  
  .btn {
    flex: 1 0 40%;
    min-width: 160px;
  }
}

@media (max-width: 768px) {
  .hero {
    max-height: 700px;
  }
  
  .hero h1 {
    font-size: 2.2rem;
  }
  
  .animated-headline {
    font-size: 2.2rem;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .rotating-words-container {
    min-width: 260px;
    margin-left: 0;
    margin-top: 0.2em;
  }
  
  .hero p {
    font-size: 1.2rem;
  }
  
  .hero-card {
    padding: 25px 20px;
    max-width: 600px;
  }
  
  .hero-btns {
    flex-direction: column;
    gap: 15px;
  }
  
  .btn {
    width: 100%;
    max-width: 280px;
    margin: 0 auto;
  }
  
  .live-stats {
    flex-direction: column;
    gap: 8px;
    padding: 8px 15px;
    right: 10px;
    bottom: 10px;
  }
  
  .banner-svg {
    padding: 10px;
  }
}

@media (max-width: 480px) {
  .hero {
    max-height: 600px;
  }
  
  .hero h1 {
    font-size: 1.8rem;
  }
  
  .animated-headline {
    font-size: 1.8rem;
  }
  
  .rotating-words-container {
    min-width: 240px;
    height: 1.1em;
    margin-top: 0.1em;
  }
  
  .rotating-word {
    line-height: 1.1em;
  }
  
  .hero-card h2 {
    font-size: 1.3rem;
  }
  
  .btn {
    padding: 10px 15px;
    font-size: 0.95rem;
    min-width: auto;
  }
  
  .banner-svg svg {
    box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.2);
  }
}
</style>