<template>
  <header>
    <div class="container">
      <div class="header-inner">
        <a href="#" class="logo">
          <i class="fas fa-store"></i>
          <span>NexaShop</span>
        </a>
        
        <div class="header-actions">
          <!-- Composant sélecteur de langue -->
          <LanguageSelector
            :currentLanguage="currentLanguage"
            :languages="languages"
            @language-changed="changeLanguage"
          />
          
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
          
          <div class="neobrutal-icons">
            <a href="/account" class="neobrutal-icon" @click.prevent="iconClick">
              <i class="far fa-user"></i>
              <div class="icon-bg"></div>
            </a>
            
            <a href="/wishlist" class="neobrutal-icon" @click.prevent="iconClick">
              <i class="far fa-heart"></i>
              <div class="icon-bg"></div>
            </a>
            
            <a href="/cart" class="neobrutal-icon" @click.prevent="iconClick">
              <i class="fas fa-shopping-cart"></i>
              <div class="icon-bg"></div>
              <span v-if="cartCount > 0" class="cart-count">{{ cartCount }}</span>
            </a>
          </div>
          
          <button class="btn btn-login">
            <i class="fas fa-sign-in-alt"></i> Se connecter
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
// Importation du composant LanguageSelector
import LanguageSelector from './LanguageSelector.vue';

export default {
  name: 'EnhancedHeader',
  // Déclaration du composant importé
  components: {
    LanguageSelector
  },
  data() {
    return {
      searchQuery: '',
      cartCount: 3,
      currentLanguage: {
        code: 'FR',
        name: 'Français',
        flag: 'fr-flag'
      },
      languages: [
        { code: 'FR', name: 'Français', flag: 'fr-flag' },
        { code: 'EN', name: 'English', flag: 'en-flag' },
        { code: 'ES', name: 'Español', flag: 'es-flag' },
        { code: 'DE', name: 'Deutsch', flag: 'de-flag' },
        { code: 'PT', name: 'Português', flag: 'pt-flag' }
      ]
    }
  },
  methods: {
    search() {
      if (this.searchQuery.trim()) {
        console.log("Recherche:", this.searchQuery);
      }
    },
    iconClick(event) {
      const icon = event.currentTarget;
      icon.classList.add('icon-clicked');
      setTimeout(() => {
        icon.classList.remove('icon-clicked');
        console.log("Navigation vers:", icon.getAttribute('href'));
      }, 300);
    },
    changeLanguage(lang) {
      this.currentLanguage = lang;
      console.log(`Changement de langue: ${lang.name}`);
      // Exemple: this.$i18n.locale = lang.code.toLowerCase();
    }
  }
}
</script>

<style scoped>
/* Styles généraux */
:root {
  --primary: #8b5cf6;
  --primary-dark: #7c3aed;
  --seller-accent: #f97316;
  --seller-accent-dark: #ea580c;
  --secondary: #10b981;
  --secondary-dark: #059669;
  --dark: #1e293b;
  --light: #f8fafc;
}

header {
  background: #f8fafc;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 15px 0;
  border-bottom: 3px solid #000;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
  font-weight: 800;
  color: var(--primary);
  text-decoration: none;
  font-family: 'Montserrat', sans-serif;
  letter-spacing: -0.5px;
}

.logo i {
  color: var(--seller-accent);
}

.header-actions {
  display: flex;
  gap: 20px;
  align-items: center;
}

.search-bar {
  display: flex;
  border: 3px solid #000;
  border-radius: 30px;
  overflow: hidden;
  height: 50px;
  box-shadow: 5px 5px 0 rgba(0,0,0,0.2);
  transition: all 0.3s ease;
}

.search-bar:focus-within {
  box-shadow: 8px 8px 0 rgba(0,0,0,0.2);
  transform: translate(-3px, -3px);
}

.search-bar input {
  border: none;
  padding: 0 20px;
  width: 200px;
  outline: none;
  font-size: 1.1rem;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
}

.search-button {
  background: var(--primary);
  border: none;
  color: white;
  width: 55px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 3px solid #000;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-button:hover {
  background: var(--primary-dark);
}

.neobrutal-icons {
  display: flex;
  gap: 15px;
  margin: 0 10px;
}

.neobrutal-icon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  cursor: pointer;
  z-index: 2;
  text-decoration: none;
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.neobrutal-icon i {
  font-size: 1.4rem;
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
  background: #FFD8B1;
  border-radius: 50%;
  z-index: 1;
  box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.7);
  transition: all 0.3s ease;
}

.neobrutal-icon:hover {
  transform: translate(-4px, -4px);
}

.neobrutal-icon:hover i {
  color: var(--seller-accent);
  transform: scale(1.15);
}

.neobrutal-icon:hover .icon-bg {
  box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.7);
  background: #FFB74D;
  transform: translate(4px, 4px);
}

.neobrutal-icon.icon-clicked {
  transform: translate(2px, 2px);
}

.neobrutal-icon.icon-clicked .icon-bg {
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.7);
  background: #FFA726;
  transform: translate(0, 0);
}

.cart-count {
  position: absolute;
  top: -5px;
  right: -5px;
  background: var(--primary);
  color: white;
  font-size: 0.9rem;
  min-width: 22px;
  height: 22px;
  padding: 0 5px;
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  z-index: 4;
  box-shadow: 4px 4px 0 rgba(0,0,0,0.3);
}

.btn {
  padding: 12px 25px;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 3px solid #000 !important;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  box-shadow: 5px 5px 0 rgba(0,0,0,0.2);
  font-family: 'Montserrat', sans-serif;
  letter-spacing: -0.2px;
}

.btn:hover {
  transform: translate(-4px, -4px);
  box-shadow: 8px 8px 0 rgba(0,0,0,0.2);
}

.btn:active {
  transform: translate(1px, 1px);
  box-shadow: 2px 2px 0 rgba(0,0,0,0.2);
}

.btn-login {
  background: var(--primary);
  color: white;
}

.btn-login:hover {
  background: var(--primary-dark);
}

@media (max-width: 1100px) {
  .search-bar input {
    width: 180px;
  }
  
  .header-actions {
    gap: 15px;
  }
}

@media (max-width: 992px) {
  .header-inner {
    flex-wrap: wrap;
    gap: 15px;
  }
  
  .header-actions {
    order: 2;
    width: 100%;
    justify-content: center;
    margin-top: 10px;
  }
}

@media (max-width: 768px) {
  .header-actions {
    flex-wrap: wrap;
  }
  
  .search-bar {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
  }
  
  .search-bar input {
    width: 100%;
  }
  
  .neobrutal-icons {
    margin: 0 auto;
  }
}

@media (max-width: 576px) {
  .btn {
    padding: 10px 20px;
    font-size: 1rem;
  }
  
  .logo {
    font-size: 20px;
  }
}
</style>