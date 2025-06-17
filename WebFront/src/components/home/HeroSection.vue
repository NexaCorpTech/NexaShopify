<template>
  <section class="hero">
    <!-- Carrousel d'images de fond -->
    <div class="carousel">
      <div class="carousel-inner" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
        <div 
          v-for="(slide, index) in slides" 
          :key="index" 
          class="carousel-item"
          :class="{ active: currentSlide === index }"
          :style="{ backgroundImage: `url(${slide.image})` }"
        >
          <!-- Texte superposé sur chaque slide en haut à gauche -->
          <div class="slide-content">
            <h3>{{ slide.title }}</h3>
            <p>{{ slide.description }}</p>
          </div>
        </div>
      </div>
      
      <!-- Contrôles du carrousel -->
      <button class="carousel-control prev" @click="prevSlide">
        <i class="fas fa-chevron-left"></i>
      </button>
      <button class="carousel-control next" @click="nextSlide">
        <i class="fas fa-chevron-right"></i>
      </button>
      
      <!-- Indicateurs de slide -->
      <div class="carousel-indicators">
        <span 
          v-for="(slide, index) in slides" 
          :key="index" 
          :class="{ active: currentSlide === index }"
          @click="goToSlide(index)"
        ></span>
      </div>
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
          
          <!-- <div class="hero-btns">
            <a href="#products-section" class="btn btn-primary">
              <i class="fas fa-shopping-bag"></i> Parcourir les produits
            </a>
            <button class="btn btn-seller">
              <i class="fas fa-store"></i> Créer ma boutique
            </button>
            <button class="btn btn-boutique">
              <i class="fas fa-door-open"></i> Accéder à ma boutique
            </button>
          </div> -->
       <div class="hero-btns">
                <a href="#products-section" class="btn btn-primary">
              <i class="fas fa-shopping-bag"></i> Parcourir les produits
            </a>
            <router-link :to="{ name: 'create-shop' }" class="btn btn-seller">
              <i class="fas fa-store"></i> Créer ma boutique
            </router-link>
            <router-link :to="{ name: 'login' }" class="btn btn-boutique">
              <i class="fas fa-door-open"></i> Accéder à ma boutique
            </router-link>
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
      currentSlide: 0,
      slides: [
        { 
          image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
          title: 'Plateforme Complète',
          description: 'Tout pour réussir en ligne'
        },
        { 
          image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
          title: 'Vendez Facilement',
          description: 'Boutique en quelques minutes'
        },
        { 
          image: 'https://images.unsplash.com/photo-1526178613552-2b45c6c302f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          title: 'Milliers de Produits',
          description: 'Catalogue varié et tendance'
        },
        { 
          image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          title: 'Gestion Simplifiée',
          description: 'Suivez vos ventes facilement'
        }
      ],
      autoPlayInterval: null,
      liveUsers: 1242,
      recentOrders: 568
    }
  },
  mounted() {
    this.startAutoPlay();
    
    // Mettre à jour les statistiques en temps réel
    setInterval(() => {
      this.liveUsers = Math.floor(Math.random() * 100) + 1200;
      this.recentOrders = Math.floor(Math.random() * 50) + 550;
    }, 5000);
  },
  beforeDestroy() {
    this.stopAutoPlay();
  },
  methods: {
    startAutoPlay() {
      this.autoPlayInterval = setInterval(() => {
        this.nextSlide();
      }, 5000);
    },
    stopAutoPlay() {
      if (this.autoPlayInterval) {
        clearInterval(this.autoPlayInterval);
        this.autoPlayInterval = null;
      }
    },
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    },
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    },
    goToSlide(index) {
      this.currentSlide = index;
    }
  }
}
</script>

<style scoped>
:root {
  --primary: #3b82f6;
  --primary-dark: #2563eb;
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

.carousel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.carousel-inner {
  display: flex;
  height: 100%;
  transition: transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.carousel-item {
  flex: 0 0 100%;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Overlay sombre sur les images pour améliorer la lisibilité */
.carousel-item::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

/* Contenu textuel sur chaque slide - Position en haut à gauche */
.slide-content {
  position: absolute;
  top: 20%;
  left: 5%;
  text-align: left;
  width: 45%;
  max-width: 500px;
  z-index: 5;
  opacity: 0;
  transition: opacity 0.5s ease;
  padding: 20px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  backdrop-filter: blur(5px);
}

.carousel-item.active .slide-content {
  opacity: 1;
  animation: fadeInLeft 1s ease forwards;
}

.slide-content h3 {
  font-size: 2.2rem;
  color: white;
  margin-bottom: 15px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.slide-content p {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  line-height: 1.5;
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

/* Animation du titre - CORRECTION DÉFINITIVE */
.animated-headline {
  font-size: 3rem;
  margin-bottom: 20px;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  line-height: 1.2; /* Réduction de l'interligne */
}

.static-text {
  display: inline;
  white-space: nowrap;
}

.rotating-words-container {
  display: inline-block;
  position: relative;
  text-align: left;
  margin-left: 0.3em; /* Espacement naturel entre les mots */
  vertical-align: top; /* Alignement vertical correct */
  min-width: 300px; /* Largeur suffisante pour contenir le texte */
  height: 1.2em; /* Hauteur fixe pour éviter les sauts */
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
  line-height: 1.2em; /* Même hauteur que le conteneur */
  width: max-content; /* Ajustement automatique à la largeur du texte */
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
  border: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  min-width: 200px;
  flex: 1;
  font-size: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
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
  clip-path: polygon(10% 0, 100% 0, 90% 100%, 0 100%);
  transform: translateY(-5px);
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
  box-shadow: 0 8px 15px rgba(59, 130, 246, 0.4);
}

.btn-seller {
  background: var(--seller-accent);
  color: white;
}

.btn-seller:hover {
  background: #ea580c;
  box-shadow: 0 8px 15px rgba(249, 115, 22, 0.4);
}

.btn-boutique {
  background: var(--secondary);
  color: white;
}

.btn-boutique:hover {
  background: #059669;
  box-shadow: 0 8px 15px rgba(16, 185, 129, 0.4);
}

.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 20;
  transition: all 0.3s;
  backdrop-filter: blur(5px);
}

.carousel-control:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-50%) scale(1.1);
}

.carousel-control.prev {
  left: 20px;
}

.carousel-control.next {
  right: 20px;
}

.carousel-indicators {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 10px;
  z-index: 20;
}

.carousel-indicators span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s;
}

.carousel-indicators span.active {
  background: white;
  transform: scale(1.3);
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

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
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
  
  .slide-content h3 {
    font-size: 1.8rem;
  }
  
  .slide-content p {
    font-size: 1.1rem;
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
  
  .slide-content {
    top: 15%;
    width: 40%;
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
    margin-top: 0.2em; /* Espacement vertical minimal */
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
  
  .carousel-control {
    width: 40px;
    height: 40px;
  }
  
  .slide-content h3 {
    font-size: 1.5rem;
  }
  
  .slide-content p {
    font-size: 1rem;
  }
  
  .live-stats {
    flex-direction: column;
    gap: 8px;
    padding: 8px 15px;
    right: 10px;
    bottom: 10px;
  }
  
  .slide-content {
    top: 10%;
    width: 50%;
    left: 5%;
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
    height: 1.1em; /* Hauteur réduite */
    margin-top: 0.1em; /* Espacement vertical minimal */
  }
  
  .rotating-word {
    line-height: 1.1em; /* Hauteur de ligne réduite */
  }
  
  .hero-card h2 {
    font-size: 1.3rem;
  }
  
  .btn {
    padding: 10px 15px;
    font-size: 0.95rem;
    min-width: auto;
  }
  
  .carousel-indicators {
    bottom: 10px;
  }
  
  .slide-content {
    top: 5%;
    width: 90%;
    left: 5%;
    padding: 15px;
  }
  
  .slide-content h3 {
    font-size: 1.3rem;
  }
  
  .slide-content p {
    font-size: 0.9rem;
  }
}
</style>