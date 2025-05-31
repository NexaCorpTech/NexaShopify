<template>
    <header class="buyer-header">
      <div class="header-container">
        <!-- <div class="logo">Nexa<span>Shop</span></div> -->
        <div class="logo">Nexa<span>Shop</span></div>
        <nav class="nav-links">
          <router-link to="/" class="nav-link">Accueil</router-link>
          <router-link to="/categories" class="nav-link">Catégories</router-link>
          <router-link to="/new" class="nav-link">Nouveautés</router-link>
          <router-link to="/promotions" class="nav-link">Promotions</router-link>
          <router-link to="/contact" class="nav-link">Contact</router-link>
        </nav>
        
        <div class="header-actions">
          <div class="search-bar">
            <input 
              type="text" 
              placeholder="Rechercher..."
              v-model="searchQuery"
              @keyup.enter="search"
            >
            <button class="search-button" @click="search">
              <i class="fas fa-search"></i>
            </button>
          </div>
          
    <!-- Icônes modifiées avec style néo-brutaliste sans bordure -->
        <div class="neobrutal-icons">
          <router-link to="/account" class="neobrutal-icon" @click.prevent="iconClick">
            <i class="far fa-user"></i>
            <div class="icon-bg"></div>
          </router-link>
          
          <router-link to="/wishlist" class="neobrutal-icon" @click.prevent="iconClick">
            <i class="far fa-heart"></i>
            <div class="icon-bg"></div>
          </router-link>
          
          <router-link to="/cart" class="neobrutal-icon" @click.prevent="iconClick">
            <i class="fas fa-shopping-cart"></i>
            <div class="icon-bg"></div>
            <span v-if="cartCount > 0" class="cart-count">{{ cartCount }}</span>
          </router-link>
        </div>
        </div>
      </div>
    </header>
  </template>
  
  <script>
  export default {
    name: 'BuyerHeader',
    data() {
      return {
        searchQuery: '',
        cartCount: 3
      }
    },
    methods: {
      search() {
        if (this.searchQuery.trim()) {
          this.$emit('search', this.searchQuery);
        }
      },
      
      iconClick(event) {  // you must use it
      const icon = event.currentTarget;
      icon.classList.add('icon-clicked');
      setTimeout(() => {
        icon.classList.remove('icon-clicked');
        this.$router.push(icon.getAttribute('to'));
      }, 300);
    }
    }

  }
  </script>
  
  <style scoped>

/* Style néo-brutaliste pour les icônes sans bordure */
.neobrutal-icons {
  display: flex;
  gap: 18px;
  margin-left: 15px;
}

.neobrutal-icon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px; /* Taille augmentée */
  height: 50px; /* Taille augmentée */
  cursor: pointer;
  z-index: 2;
  text-decoration: none;
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.neobrutal-icon i {
  font-size: 1.5rem; /* Taille de police augmentée */
  color: #1a1a1a;
  z-index: 3;
  transition: all 0.3s;
}

.neobrutal-icon .icon-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #FFEB3B;
  border-radius: 50%; /* Forme circulaire */
  z-index: 1;
  box-shadow: 5px 5px 0px rgba(0, 0, 0, 0.7); /* Ombre décalée */
  transition: all 0.3s ease;
}

/* Animation au survol */
.neobrutal-icon:hover {
  transform: translate(-3px, -3px);
}

.neobrutal-icon:hover i {
  color: #ff7a00;
  transform: scale(1.1);
}

.neobrutal-icon:hover .icon-bg {
  box-shadow: 8px 8px 0px rgba(0, 0, 0, 0.7); /* Ombre plus prononcée */
  background: #FFD600;
  transform: translate(3px, 3px);
}

/* Animation au clic */
.neobrutal-icon.icon-clicked {
  transform: translate(2px, 2px);
}

.neobrutal-icon.icon-clicked .icon-bg {
  box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.7);
  background: #FFC107;
  transform: translate(0, 0);
}

/* Style pour le compteur de panier */
.cart-count {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ff7a00;
  color: white;
  font-size: 0.8rem;
  min-width: 22px;
  height: 22px;
  padding: 0 4px;
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  z-index: 4;
  box-shadow: 3px 3px 0 rgba(0,0,0,0.3);
}
/*  */


  .buyer-header {
    background: white;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    position: sticky;
    top: 0;
    z-index: 100;
  }
  
  .header-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
  }
  
  .logo {
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    font-size: 1.8rem;
    color: #ff7a00;
  }
  
  .logo span {
    color: #0468ff;
  }
  
  .nav-links {
    display: flex;
    gap: 30px;
  }
  
  .nav-link {
    text-decoration: none;
    color: #1a1a1a;
    font-weight: 600;
    transition: all 0.3s ease;
    position: relative;
  }
  
  .nav-link:hover {
    color: #ff7a00;
  }
  
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: #ff7a00;
    transition: all 0.3s ease;
  }
  
  .nav-link:hover::after {
    width: 100%;
  }
  
  .header-actions {
    display: flex;
    gap: 30px;
    align-items: center;
  }
  
  .search-bar {
    display: flex;
    border: 1px solid #e0e0e0;
    border-radius: 30px;
    overflow: hidden;
    height: 40px;
    border: 2px solid #000; /* Ajout de bordure pour harmoniser */
    box-shadow: 3px 3px 0 #000; /* Ajout d'ombre pour harmoniser */
    
  }
  
  .search-bar input {
    border: none;
    padding: 0 15px;
    width: 250px;
    outline: none;
    padding: 0 20px; /* Padding augmenté */
    font-size: 1rem; /* Taille de police augmentée */
  }
  
  .search-button {
    background: #ff7a00;
    border: none;
    color: white;
    width: 40px;
    cursor: pointer;
    transition: all 0.3s ease;
    border-left: 2px solid #000; /* Ajout de bordure */
    width: 50px; /* Largeur augmentée */
    font-size: 1.2rem; /* Taille de l'icône augmentée */
  }
  
  .search-button:hover {
    background: #ff8c2a;
  }
  
  .icon-button {
    position: relative;
    color: #1a1a1a;
    text-decoration: none;
    font-size: 1.2rem;
    transition: all 0.3s ease;
  }
  
  .icon-button:hover {
    color: #ff7a00;
  }
  
  .cart-count {
    position: absolute;
    top: -8px;
    right: -8px;
    background: #ff7a00;
    color: white;
    font-size: 0.7rem;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  @media (max-width: 992px) {
    .search-bar input {
      width: 180px;
    }
    
    .nav-links {
      gap: 15px;
    }
  }
  
  @media (max-width: 768px) {
    .nav-links {
      display: none;
    }
    
    .search-bar input {
      width: 150px;
    }
  }
  </style>