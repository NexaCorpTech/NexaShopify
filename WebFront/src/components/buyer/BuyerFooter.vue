<template>
    <footer>
      <div class="container">
        <div class="footer-content">
          <div class="footer-column">
            <h3>À propos de nous</h3>
            <p>NexaShop est votre destination shopping en ligne préférée avec des milliers de produits de qualité à prix compétitifs.</p>
            <div class="social-links">
              <a href="#"><i class="fab fa-facebook-f"></i></a>
              <a href="#"><i class="fab fa-twitter"></i></a>
              <a href="#"><i class="fab fa-instagram"></i></a>
              <a href="#"><i class="fab fa-pinterest"></i></a>
            </div>
          </div>
          
          <div class="footer-column">
            <h3>Liens rapides</h3>
            <ul class="footer-links">
              <li v-for="(link, index) in quickLinks" :key="index">
                <router-link :to="link.path">{{ link.text }}</router-link>
              </li>
            </ul>
          </div>
          
          <div class="footer-column">
            <h3>Catégories</h3>
            <ul class="footer-links">
              <li v-for="(category, index) in categories" :key="index">
                <router-link :to="category.path">{{ category.name }}</router-link>
              </li>
            </ul>
          </div>
          
          <div class="footer-column">
            <h3>Newsletter</h3>
            <p>Inscrivez-vous pour recevoir nos offres exclusives</p>
            <div class="newsletter">
              <input 
                type="email" 
                placeholder="Votre email"
                v-model="email"
                @keyup.enter="subscribe"
              >
              <button @click="subscribe">S'inscrire</button>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; {{ currentYear }} NexaShop. Tous droits réservés. | 
            <router-link to="/privacy">Politique de confidentialité</router-link> | 
            <router-link to="/terms">Conditions d'utilisation</router-link>
          </p>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'BuyerFooter',
    data() {
      return {
        email: '',
        currentYear: new Date().getFullYear(),
        quickLinks: [
          { text: 'Accueil', path: '/' },
          { text: 'À propos', path: '/about' },
          { text: 'Produits', path: '/products' },
          { text: 'Promotions', path: '/sales' },
          { text: 'Nouveautés', path: '/new' }
        ],
        categories: [
          { name: 'Électronique', path: '/electronics' },
          { name: 'Mode', path: '/fashion' },
          { name: 'Maison', path: '/home' },
          { name: 'Beauté', path: '/beauty' },
          { name: 'Sport', path: '/sports' }
        ]
      };
    },
    methods: {
      subscribe() {
        if (this.email && this.validateEmail(this.email)) {
          alert(`Merci pour votre inscription avec ${this.email}`);
          this.email = '';
        } else {
          alert('Veuillez entrer une adresse email valide');
        }
      },
      validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      }
    }
  }
  </script>
  
  <style scoped>
  footer {
    background: #1a1a1a;
    color: #aaa;
    padding: 60px 0 30px;
  }
  
  .footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 40px;
    margin-bottom: 40px;
  }
  
  .footer-column h3 {
    color: white;
    font-size: 1.3rem;
    margin-bottom: 20px;
    position: relative;
    padding-bottom: 10px;
  }
  
  .footer-column h3::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background: #0468ff;
  }
  
  .footer-links {
    list-style: none;
  }
  
  .footer-links li {
    margin-bottom: 12px;
  }
  
  .footer-links a {
    color: #aaa;
    text-decoration: none;
    transition: color 0.3s;
  }
  
  .footer-links a:hover {
    color: #0468ff;
  }
  
  .social-links {
    display: flex;
    gap: 15px;
    margin-top: 20px;
  }
  
  .social-links a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: #333;
    border-radius: 50%;
    color: white;
    font-size: 1.2rem;
    transition: all 0.3s;
  }
  
  .social-links a:hover {
    background: #0468ff;
    transform: translateY(-5px);
  }
  
  .newsletter input {
    width: 100%;
    padding: 12px 15px;
    border: none;
    border-radius: 4px;
    margin-bottom: 15px;
  }
  
  .newsletter button {
    background: #0468ff;
    color: white;
    border: none;
    padding: 12px 25px;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  .newsletter button:hover {
    background: #0353d9;
  }
  
  .footer-bottom {
    text-align: center;
    padding-top: 30px;
    border-top: 1px solid #333;
    font-size: 0.9rem;
  }
  
  .footer-bottom a {
    color: #aaa;
    text-decoration: none;
  }
  
  .footer-bottom a:hover {
    color: #0468ff;
    text-decoration: underline;
  }
  </style>