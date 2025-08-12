<template>
  <div class="nexa-header">
    <!-- Top Bar -->
    <div class="top-bar">
      <div class="container">
        <div class="top-left">
          <span class="delivery-location">
            <i class="pi pi-map-marker"></i>
            Livrer à Tunis 1000
          </span>
        </div>
        <div class="top-right">
          <Dropdown 
            v-model="selectedLanguage" 
            :options="languages" 
            optionLabel="name"
            class="language-selector"
            panelClass="language-panel"
          >
            <template #value="slotProps">
              <div class="language-item" v-if="slotProps.value">
                <img :src="slotProps.value.flag" :alt="slotProps.value.name" class="flag" />
                <span>{{ slotProps.value.code }}</span>
              </div>
            </template>
            <template #option="slotProps">
              <div class="language-item">
                <img :src="slotProps.option.flag" :alt="slotProps.option.name" class="flag" />
                <span>{{ slotProps.option.name }}</span>
              </div>
            </template>
          </Dropdown>
          
          <div class="account-section">
            <span class="greeting">Bonjour, Identifiez-vous</span>
            <div class="account-dropdown">
              <span class="account-text">Compte et listes</span>
              <i class="pi pi-angle-down"></i>
            </div>
          </div>
          
          <div class="returns-orders">
            <span class="returns">Retours</span>
            <span class="orders">et commandes</span>
          </div>
          
          <Button class="btn btn-login">
            <i class="pi pi-sign-in"></i> Se connecter
          </Button>
        </div>
      </div>
    </div>

    <!-- Main Header -->
    <div class="main-header">
      <div class="container">
        <div class="header-content">
          <!-- Logo -->
          <div class="logo">
            <a href="#" @click.prevent>
              <i class="fas fa-store"></i>
              <span class="logo-text">NexaShop</span>
            </a>
          </div>

          <!-- Location Selector -->
          <div class="location-selector" @click="showLocationDialog = true">
            <i class="pi pi-map-marker"></i>
            <div class="location-text">
              <span class="deliver-to">Livrer à</span>
              <span class="location">Tunis 1000</span>
            </div>
          </div>

          <!-- Search Bar -->
          <div class="search-container">
            <Dropdown 
              v-model="selectedCategory" 
              :options="categories" 
              optionLabel="name"
              class="category-dropdown"
              placeholder="Toutes nos catégories"
            />
            <div class="search-input-container">
              <InputText 
                v-model="searchQuery" 
                placeholder="Rechercher NexaShop"
                class="search-input"
                @keyup.enter="handleSearch"
              />
              <Button 
                icon="pi pi-search" 
                class="search-button"
                @click="handleSearch"
              />
            </div>
          </div>

          <!-- Right Actions -->
          <div class="header-actions">
            <!-- Icons Container -->
            <div class="neobrutal-icons">
              <a href="/account" class="neobrutal-icon" @click.prevent="iconClick">
                <i class="pi pi-user"></i>
                <div class="icon-bg"></div>
              </a>
              
              <a href="/wishlist" class="neobrutal-icon" @click.prevent="iconClick">
                <i class="pi pi-heart"></i>
                <div class="icon-bg"></div>
              </a>
              
              <a href="/cart" class="neobrutal-icon" @click.prevent="goToCart">
                <i class="pi pi-shopping-cart"></i>
                <div class="icon-bg"></div>
                <Badge 
                  v-if="cartCount > 0" 
                  :value="cartCount" 
                  class="cart-badge"
                  severity="warning"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Bar -->
    <div class="nav-bar">
      <div class="container">
        <div class="nav-content">
          <!-- Menu Button -->
          <Button 
            icon="pi pi-bars" 
            label="Toutes"
            class="menu-button"
            @click="toggleSidebar"
          />

          <!-- Navigation Links -->
          <div class="nav-links">
            <a href="#" @click.prevent>Meilleures ventes</a>
            <a href="#" @click.prevent>Ventes Flash</a>
            <a href="#" @click.prevent>Dernières Nouveautés</a>
            <a href="#" @click.prevent>Nexa Basics</a>
            <a href="#" @click.prevent>Vendre sur Nexa</a>
            <a href="#" @click.prevent>Livres</a>
            <a href="#" @click.prevent>Guide de l'acheteur</a>
            <a href="#" @click.prevent>Cartes cadeaux</a>
          </div>

          <!-- Right Nav -->
          <div class="nav-right">
            <span class="promo-text">Organisez votre rentrée</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Location Dialog -->
    <Dialog 
      v-model:visible="showLocationDialog" 
      modal 
      header="Choisir votre position"
      :style="{ width: '450px' }"
    >
      <div class="location-dialog-content">
        <p>La livraison des articles de votre panier nécessite une adresse précise.</p>
        <InputText 
          v-model="newLocation" 
          placeholder="Entrez votre code postal ou ville"
          class="w-full mb-3"
        />
        <div class="flex justify-content-end gap-2">
          <Button label="Annuler" severity="secondary" @click="showLocationDialog = false" />
          <Button label="Appliquer" @click="updateLocation" />
        </div>
      </div>
    </Dialog>

    <!-- Sidebar -->
    <Sidebar v-model:visible="sidebarVisible" class="nav-sidebar">
      <template #header>
        <div class="sidebar-header">
          <i class="pi pi-user"></i>
          <span>Bonjour, Identifiez-vous</span>
        </div>
      </template>
      
      <div class="sidebar-content">
        <div class="sidebar-section">
          <h3>Parcourir par catégorie</h3>
          <ul class="sidebar-menu">
            <li><a href="#" @click.prevent>Électronique</a></li>
            <li><a href="#" @click.prevent>Mode</a></li>
            <li><a href="#" @click.prevent>Maison</a></li>
            <li><a href="#" @click.prevent>Beauté</a></li>
            <li><a href="#" @click.prevent>Sports</a></li>
            <li><a href="#" @click.prevent>Livres</a></li>
          </ul>
        </div>
      </div>
    </Sidebar>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Sidebar from 'primevue/sidebar';
import Badge from 'primevue/badge';

const searchQuery = ref('');
const cartCount = ref(3);
const showLocationDialog = ref(false);
const newLocation = ref('');
const sidebarVisible = ref(false);
const selectedLanguage = ref({ 
  code: 'FR', 
  name: 'Français', 
  flag: 'https://flagcdn.com/fr.svg' 
});
const selectedCategory = ref(null);

const languages = ref([
  { code: 'FR', name: 'Français', flag: 'https://flagcdn.com/fr.svg' },
  { code: 'EN', name: 'English', flag: 'https://flagcdn.com/gb.svg' },
  { code: 'ES', name: 'Español', flag: 'https://flagcdn.com/es.svg' },
  { code: 'DE', name: 'Deutsch', flag: 'https://flagcdn.com/de.svg' }
]);

const categories = ref([
  { name: 'Toutes nos catégories', code: 'ALL' },
  { name: 'Électronique', code: 'ELECTRONICS' },
  { name: 'Mode', code: 'FASHION' },
  { name: 'Maison', code: 'HOME' },
  { name: 'Beauté', code: 'BEAUTY' },
  { name: 'Sports', code: 'SPORTS' }
]);

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    console.log('Recherche:', searchQuery.value);
  }
};

const toggleAccountMenu = () => {
  console.log('Toggle account menu');
};

const goToCart = () => {
  console.log('Go to cart');
};

const toggleSidebar = () => {
  sidebarVisible.value = !sidebarVisible.value;
};

const updateLocation = () => {
  if (newLocation.value.trim()) {
    console.log('Nouvelle localisation:', newLocation.value);
    showLocationDialog.value = false;
    newLocation.value = '';
  }
};

const iconClick = (event) => {
  const icon = event.currentTarget;
  icon.classList.add('icon-clicked');
  setTimeout(() => {
    icon.classList.remove('icon-clicked');
    console.log("Navigation vers:", icon.getAttribute('href'));
  }, 300);
};
</script>

<style scoped>
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

.nexa-header {
  font-family: 'Amazon Ember', Arial, sans-serif;
  border-bottom: 3px solid #000;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

/* Top Bar */
.top-bar {
  background-color: var(--dark);
  color: white;
  padding: 6px 0;
  font-size: 12px;
  border-bottom: 2px solid #000;
}

.container {
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 15px;
}

.top-bar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.delivery-location {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #ccc;
}

.top-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.language-selector {
  background: transparent;
  border: none;
  color: white;
}

.language-selector :deep(.p-dropdown-trigger) {
  color: white;
}

.language-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.flag {
  width: 16px;
  height: 12px;
  object-fit: cover;
  border: 1px solid #fff;
}

.account-section, .returns-orders {
  color: white;
  cursor: pointer;
  font-size: 12px;
  line-height: 1.2;
  padding: 5px 8px;
  border-radius: 3px;
  border: 1px solid transparent;
}

.account-section:hover, .returns-orders:hover {
  border: 1px solid white;
}

.greeting {
  display: block;
  font-size: 12px;
}

.account-dropdown {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 14px;
}

.returns, .orders {
  display: block;
  text-align: center;
}

.orders {
  font-weight: bold;
}

.btn {
  padding: 8px 15px;
  border-radius: 4px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 2px solid #000 !important;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: 3px 3px 0 rgba(0,0,0,0.2);
  font-family: 'Montserrat', sans-serif;
  letter-spacing: -0.2px;
}

.btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: 5px 5px 0 rgba(0,0,0,0.2);
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

/* Main Header */
.main-header {
  background-color: var(--primary-dark);
  padding: 10px 0;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

/* Logo */
.logo a {
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
  text-decoration: none;
  font-size: 24px;
  font-weight: bold;
  font-family: 'Montserrat', sans-serif;
}

.logo i {
  color: var(--seller-accent);
  font-size: 28px;
}

/* Location Selector */
.location-selector {
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid transparent;
}

.location-selector:hover {
  border: 1px solid white;
}

.location-selector i {
  font-size: 18px;
}

.location-text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.deliver-to {
  font-size: 12px;
  color: #ccc;
}

.location {
  font-size: 14px;
  font-weight: bold;
}

/* Search Container */
.search-container {
  flex: 1;
  display: flex;
  max-width: 600px;
  border-radius: 4px;
  overflow: hidden;
  border: 3px solid #000;
  box-shadow: 5px 5px 0 rgba(0,0,0,0.2);
  transition: all 0.3s ease;
}

.search-container:focus-within {
  box-shadow: 8px 8px 0 rgba(0,0,0,0.2);
  transform: translate(-3px, -3px);
}

.category-dropdown {
  background: #f3f3f3;
  border: none;
  border-radius: 4px 0 0 4px;
  min-width: 50px;
  border-right: 2px solid #000;
}

.category-dropdown :deep(.p-dropdown-label) {
  font-size: 12px;
  padding: 0 8px;
}

.search-input-container {
  display: flex;
  flex: 1;
}

.search-input {
  flex: 1;
  border: none;
  border-radius: 0;
  padding: 10px 12px;
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
}

.search-input:focus {
  outline: 3px solid var(--seller-accent);
  outline-offset: -3px;
}

.search-button {
  background: var(--seller-accent);
  border: none;
  border-radius: 0;
  padding: 0 16px;
  color: #131921;
  border-left: 2px solid #000;
}

.search-button:hover {
  background: var(--seller-accent-dark);
}

/* Header Actions */
.header-actions {
  display: flex;
  align-items: center;
  gap: 20px;
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
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.7);
  border: 2px solid #000;
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
  box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.7);
  background: #FFB74D;
  transform: translate(4px, 4px);
}

.neobrutal-icon.icon-clicked {
  transform: translate(2px, 2px);
}

.neobrutal-icon.icon-clicked .icon-bg {
  box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.7);
  background: #FFA726;
  transform: translate(0, 0);
}

.cart-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: var(--primary) !important;
  color: white !important;
  font-weight: 700;
  min-width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 4;
  box-shadow: 3px 3px 0 rgba(0,0,0,0.3);
  border: 1px solid #000;
}

/* Navigation Bar */
.nav-bar {
  background-color: var(--dark);
  padding: 8px 0;
  border-top: 2px solid #000;
}

.nav-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.menu-button {
  background: var(--dark);
  color: white;
  border: 2px solid #fff;
  font-size: 14px;
  font-weight: bold;
  padding: 6px 12px;
  box-shadow: 3px 3px 0 rgba(0,0,0,0.2);
}

.menu-button:hover {
  background: #2d3748;
  transform: translate(-2px, -2px);
  box-shadow: 5px 5px 0 rgba(0,0,0,0.2);
}

.nav-links {
  display: flex;
  gap: 20px;
  flex: 1;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-size: 14px;
  padding: 6px 8px;
  border: 1px solid transparent;
  border-radius: 3px;
}

.nav-links a:hover {
  border: 1px solid white;
}

.nav-right {
  color: white;
  font-size: 14px;
  font-weight: bold;
  padding: 5px 10px;
  background: var(--seller-accent);
  border: 1px solid #000;
  box-shadow: 3px 3px 0 rgba(0,0,0,0.2);
}

/* Sidebar */
.nav-sidebar {
  width: 365px;
  border-left: 3px solid #000;
}

.sidebar-header {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--dark);
  color: white;
  padding: 16px;
  font-size: 18px;
  font-weight: bold;
  border-bottom: 2px solid #000;
}

.sidebar-content {
  padding: 0;
}

.sidebar-section {
  border-bottom: 1px solid #ddd;
  padding: 20px;
}

.sidebar-section h3 {
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: bold;
  color: var(--primary-dark);
}

.sidebar-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-menu li {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.sidebar-menu a {
  color: var(--dark);
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  display: block;
  padding: 8px 0;
}

.sidebar-menu a:hover {
  color: var(--primary);
  font-weight: bold;
}

/* Location Dialog */
.location-dialog-content p {
  margin-bottom: 16px;
  color: #666;
}

/* Responsive */
@media (max-width: 1024px) {
  .top-bar {
    display: none;
  }
  
  .header-content {
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .search-container {
    order: 3;
    width: 100%;
    max-width: none;
    margin: 10px 0;
  }
  
  .header-actions {
    gap: 15px;
  }
  
  .nav-links {
    gap: 15px;
    font-size: 12px;
  }
}

@media (max-width: 768px) {
  .nav-links a:not(:first-child):not(:nth-child(2)) {
    display: none;
  }
  
  .location-selector {
    display: none;
  }
}

@media (max-width: 576px) {
  .logo-text {
    display: none;
  }
  
  .nav-right {
    display: none;
  }
  
  .menu-button span {
    display: none;
  }
  
  .neobrutal-icons {
    gap: 10px;
  }
  
  .neobrutal-icon {
    width: 40px;
    height: 40px;
  }
}
</style>