<template>
  <div class="category-container">
    <!-- Header avec logo néo-brutaliste -->
    <header class="buyer-header">
      <div class="header-container">
        <div class="logo" @click="$router.push('/')">
          <span class="logo-nexa">Nexa</span>
          <span class="logo-shop">Shop</span>
        </div>
        
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
          
          <div class="neobrutal-icons">
            <router-link to="/account" class="neobrutal-icon" @click.prevent="navigateTo('/account')">
              <i class="far fa-user"></i>
              <div class="icon-bg"></div>
            </router-link>
            
            <router-link to="/wishlist" class="neobrutal-icon" @click.prevent="navigateTo('/wishlist')">
              <i class="far fa-heart"></i>
              <div class="icon-bg"></div>
            </router-link>
            
            <router-link to="/cart" class="neobrutal-icon" @click.prevent="navigateTo('/cart')">
              <i class="fas fa-shopping-cart"></i>
              <div class="icon-bg"></div>
              <span v-if="cartCount > 0" class="cart-count">{{ cartCount }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </header>
    
    <div class="category-layout">
      <!-- Sidebar des catégories -->
      <aside class="category-sidebar">
        <div class="sidebar-section">
          <div class="sidebar-header">
            <i class="fas fa-search"></i>
            <h3>Recherche</h3>
          </div>
          <div class="search-container">
            <input 
              v-model="categorySearch" 
              placeholder="Rechercher une catégorie..."
              class="search-input"
            >
          </div>
        </div>
        
        <div class="sidebar-section">
          <div class="sidebar-header">
            <i class="fas fa-shopping-cart"></i>
            <h3>Mon Panier</h3>
          </div>
          <div class="cart-summary">
            <p>0,00 TND - 0 ARTICLES</p>
            <router-link to="/cart" class="view-cart-btn">
              Voir le panier
            </router-link>
          </div>
        </div>
        
        <div class="sidebar-section">
          <div class="sidebar-header">
            <i class="fas fa-list"></i>
            <h3>Catégories</h3>
          </div>
          <ul class="category-list">
            <li 
              v-for="(category, index) in filteredCategories" 
              :key="index"
              :class="{ 'active': activeCategoryId === category.id }"
              @click="toggleCategory(category)"
            >
              <div class="category-item">
                <span>{{ category.name }}</span>
                <i 
                  :class="[
                    'fas', 
                    category.subcategories && category.subcategories.length > 0 
                      ? (category.open ? 'fa-minus' : 'fa-plus') 
                      : ''
                  ]"
                ></i>
              </div>
              
              <transition name="slide">
                <ul v-if="category.open" class="subcategory-list">
                  <li 
                    v-for="(subcategory, subIndex) in category.subcategories" 
                    :key="subIndex"
                    :class="{ 'active': activeSubcategoryId === subcategory.id }"
                    @click.stop="selectSubcategory(subcategory)"
                  >
                    {{ subcategory.name }}
                  </li>
                </ul>
              </transition>
            </li>
          </ul>
        </div>
      </aside>
      
      <!-- Contenu principal -->
      <main class="category-content">
        <div class="breadcrumbs">
          <router-link to="/">Accueil</router-link>
          <span> > </span>
          <span class="current">Pulls & Polos</span>
        </div>
        
        <div class="content-header">
          <h1>Pulls & Polos</h1>
          <div class="sort-filter">
            <select v-model="sortOption" class="sort-select">
              <option value="popular">Populaire</option>
              <option value="new">Nouveautés</option>
              <option value="price-low">Prix: croissant</option>
              <option value="price-high">Prix: décroissant</option>
            </select>
          </div>
        </div>
        
        <div class="product-grid">
          <div class="product-card" v-for="(product, index) in products" :key="index">
            <div class="product-badge" v-if="product.badge">{{ product.badge }}</div>
            <div class="product-image" :style="{ backgroundImage: `url(${product.image})` }"></div>
            <div class="product-info">
              <h3 class="product-title">{{ product.title }}</h3>
              <p class="product-description">{{ product.description }}</p>
              <div class="product-price">
                <span class="current-price">{{ product.price }} TND</span>
                <span v-if="product.oldPrice" class="old-price">{{ product.oldPrice }} TND</span>
              </div>
              <div class="size-selector">
                <span class="size-label">Taille:</span>
                <div class="sizes">
                  <span 
                    v-for="size in product.sizes" 
                    :key="size" 
                    :class="{ 'selected': selectedSizes[product.id] === size }"
                    @click="selectSize(product.id, size)"
                  >
                    {{ size }}
                  </span>
                </div>
              </div>
              <div class="product-actions">
                <button class="action-button quick-view">
                  <i class="far fa-eye"></i> Voir
                </button>
                <button class="action-button add-to-cart">
                  <i class="fas fa-shopping-cart"></i> Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryPage',
  data() {
    return {
      searchQuery: '',
      categorySearch: '',
      cartCount: 3,
      activeCategoryId: null,
      activeSubcategoryId: null,
      sortOption: 'popular',
      selectedSizes: {},
      categories: [
        {
          id: 1,
          name: "Nouveautés",
          open: false
        },
        {
          id: 2,
          name: "Promotions",
          open: false
        },
        {
          id: 3,
          name: "GIFT CARD",
          open: false
        },
        {
          id: 4,
          name: "Soyez fidèle",
          open: false
        },
        {
          id: 5,
          name: "Trouver un magasin",
          open: false
        },
        {
          id: 6,
          name: "Pulls & Polos",
          open: true,
          subcategories: [
            { id: 61, name: "Pantalons" },
            { id: 62, name: "Gilets" },
            { id: 63, name: "Blousons" },
            { id: 64, name: "Chemises" },
            { id: 65, name: "Costumes & Blazers" },
            { id: 66, name: "Shorts & Bermudas" },
            { id: 67, name: "Chaussures" },
            { id: 68, name: "Sportswear" },
            { id: 69, name: "Accessoires" }
          ]
        }
      ],
      products: [
        {
          id: 1,
          title: "Claquettes",
          description: "Claquettes pour hommes au design tendance et minimaliste. La lope en matière synthétique noire est décorée de l'inscription en relief « MAKE YOUR DREAMS COME TRUE », offrant un look inspirant et moderne. Confortables et légères, elles sont idéales pour une utilisation quotidienne, en intérieur comme à l'extérieur.",
          price: "49,99",
          sizes: [38, 39, 40, 41, 42],
          image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          badge: "Nouveau"
        },
        {
          id: 2,
          title: "Chaussures de sport",
          description: "Chaussures de sport légères et respirantes pour un confort optimal pendant vos activités.",
          price: "89,99",
          sizes: [39, 40, 41, 42, 43],
          image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          badge: "Promo"
        },
        {
          id: 3,
          title: "Baskets urbaines",
          description: "Baskets au style urbain avec semelle confortable et design moderne.",
          price: "69,99",
          sizes: [38, 39, 40, 41, 42],
          image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
          id: 4,
          title: "Sandales d'été",
          description: "Sandales légères et confortables pour l'été, idéales pour la plage ou la ville.",
          price: "39,99",
          sizes: [37, 38, 39, 40],
          image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        }
      ]
    }
  },
  computed: {
    filteredCategories() {
      if (!this.categorySearch) return this.categories;
      const searchTerm = this.categorySearch.toLowerCase();
      return this.categories.filter(cat => 
        cat.name.toLowerCase().includes(searchTerm) || 
        (cat.subcategories && cat.subcategories.some(sub => 
          sub.name.toLowerCase().includes(searchTerm))
      ));
    }
  },
  methods: {
    search() {
      if (this.searchQuery.trim()) {
        console.log('Recherche:', this.searchQuery);
      }
    },
    navigateTo(path) {
      this.$router.push(path);
    },
    toggleCategory(category) {
      // Fermer toutes les autres catégories
      this.categories.forEach(cat => {
        if (cat.id !== category.id) {
          cat.open = false;
        }
      });
      
      // Ouvrir/fermer la catégorie sélectionnée
      if (category.subcategories && category.subcategories.length > 0) {
        category.open = !category.open;
      }
      
      this.activeCategoryId = category.id;
      this.activeSubcategoryId = null;
    },
    selectSubcategory(subcategory) {
      this.activeSubcategoryId = subcategory.id;
      console.log('Sous-catégorie sélectionnée:', subcategory.name);
    },
    selectSize(productId, size) {
      this.selectedSizes[productId] = size;
      console.log(`Taille ${size} sélectionnée pour le produit ${productId}`);
    }
  }
}
</script>

<style scoped>
/* Styles néo-brutalistes harmonisés */
.category-container {
  font-family: 'Montserrat', sans-serif;
  background-color: #f8f9fa;
  min-height: 100vh;
}

/* Header */
.buyer-header {
  background: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
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
  height: 80px;
}

/* Logo */
.logo {
  position: relative;
  display: inline-block;
  padding: 8px 15px;
  cursor: pointer;
  transform: rotate(-1deg);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.logo-nexa, 
.logo-shop {
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  font-size: 1.8rem;
  position: relative;
  z-index: 2;
}

.logo-nexa {
  color: #ff7a00;
}

.logo-shop {
  color: #0468ff;
}

.logo::before {
  content: '';
  position: absolute;
  top: -5px;
  left: -5px;
  width: 100%;
  height: 100%;
  background: #FFEB3B;
  border: 3px solid #000;
  z-index: 1;
  transform: translate(5px, 5px);
  transition: all 0.3s ease;
}

.logo:hover {
  transform: rotate(0deg);
}

.logo:hover::before {
  transform: translate(8px, 8px);
  background: #FFD600;
}

/* Icônes */
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
  width: 50px;
  height: 50px;
  cursor: pointer;
  z-index: 2;
  text-decoration: none;
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.neobrutal-icon i {
  font-size: 1.5rem;
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
  border-radius: 50%;
  z-index: 1;
  box-shadow: 5px 5px 0px rgba(0, 0, 0, 0.7);
  transition: all 0.3s ease;
}

.neobrutal-icon:hover {
  transform: translate(-3px, -3px);
}

.neobrutal-icon:hover i {
  color: #ff7a00;
  transform: scale(1.1);
}

.neobrutal-icon:hover .icon-bg {
  box-shadow: 8px 8px 0px rgba(0, 0, 0, 0.7);
  background: #FFD600;
  transform: translate(3px, 3px);
}

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

/* Layout principal */
.category-layout {
  display: flex;
  max-width: 1400px;
  margin: 30px auto;
  padding: 0 20px;
  gap: 30px;
}

/* Sidebar */
.category-sidebar {
  flex: 0 0 280px;
  background: white;
  border: 3px solid #000;
  box-shadow: 8px 8px 0px rgba(0, 0, 0, 0.1);
  padding: 20px;
  height: fit-content;
  position: sticky;
  top: 100px;
}

.sidebar-section {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #eee;
}

.sidebar-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.sidebar-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.sidebar-header h3 {
  font-size: 1.3rem;
  color: #1a1a1a;
  font-weight: 700;
}

.sidebar-header i {
  color: #0468ff;
  font-size: 1.2rem;
}

.search-container {
  position: relative;
}

.search-input {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #000;
  border-radius: 4px;
  font-size: 1rem;
  box-shadow: 3px 3px 0px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.search-input:focus {
  outline: none;
  box-shadow: 5px 5px 0px rgba(0, 0, 0, 0.2);
  border-color: #ff7a00;
}

.cart-summary {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 4px;
  border: 2px solid #eee;
  text-align: center;
}

.cart-summary p {
  font-weight: 600;
  margin-bottom: 10px;
}

.view-cart-btn {
  display: inline-block;
  background: #0468ff;
  color: white;
  padding: 8px 15px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
  border: 2px solid #000;
  box-shadow: 3px 3px 0px rgba(0, 0, 0, 0.1);
}

.view-cart-btn:hover {
  background: #0353d9;
  transform: translate(-2px, -2px);
  box-shadow: 5px 5px 0px rgba(0, 0, 0, 0.2);
}

.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-list > li {
  margin-bottom: 8px;
  cursor: pointer;
  border-radius: 4px;
  overflow: hidden;
  transition: all 0.3s;
}

.category-list > li.active {
  background: #FFEB3B;
}

.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  font-weight: 600;
  border: 2px solid #000;
  box-shadow: 3px 3px 0px rgba(0, 0, 0, 0.1);
  background: white;
}

.category-item i {
  font-size: 0.9rem;
  color: #0468ff;
}

.category-list > li.active .category-item {
  background: #FFEB3B;
}

.subcategory-list {
  list-style: none;
  padding: 0;
  margin: 0;
  background: #f8f9fa;
  border-left: 3px solid #0468ff;
  border-right: 3px solid #0468ff;
  border-bottom: 3px solid #0468ff;
}

.subcategory-list li {
  padding: 10px 20px;
  transition: all 0.2s;
  border-bottom: 1px solid #eee;
}

.subcategory-list li:last-child {
  border-bottom: none;
}

.subcategory-list li:hover {
  background: #e6f7ff;
}

.subcategory-list li.active {
  background: #0468ff;
  color: white;
  font-weight: 600;
}

/* Contenu principal */
.category-content {
  flex: 1;
}

.breadcrumbs {
  font-size: 0.9rem;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.breadcrumbs a {
  color: #0468ff;
  text-decoration: none;
}

.breadcrumbs .current {
  font-weight: 600;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 3px solid #000;
}

.content-header h1 {
  font-size: 2.2rem;
  font-weight: 800;
  color: #1a1a1a;
}

.sort-filter {
  display: flex;
  gap: 15px;
}

.sort-select {
  padding: 10px 15px;
  border: 2px solid #000;
  border-radius: 4px;
  font-weight: 600;
  background: white;
  box-shadow: 3px 3px 0px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s;
}

.sort-select:focus {
  outline: none;
  box-shadow: 5px 5px 0px rgba(0, 0, 0, 0.2);
  border-color: #ff7a00;
}

/* Grille de produits */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
}

.product-card {
  background: white;
  border: 3px solid #000;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 5px 5px 0px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
}

.product-card:hover {
  transform: translate(-5px, -5px);
  box-shadow: 8px 8px 0px rgba(0, 0, 0, 0.2);
}

.product-badge {
  position: absolute;
  top: 15px;
  left: 15px;
  background: #ff7a00;
  color: white;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  z-index: 2;
  box-shadow: 2px 2px 0 rgba(0,0,0,0.3);
}

.product-image {
  height: 220px;
  background-size: cover;
  background-position: center;
}

.product-info {
  padding: 20px;
}

.product-title {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: #1a1a1a;
}

.product-description {
  color: #6c757d;
  font-size: 0.95rem;
  margin-bottom: 15px;
  line-height: 1.5;
}

.product-price {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.current-price {
  font-size: 1.4rem;
  font-weight: 800;
  color: #ff7a00;
}

.old-price {
  font-size: 1rem;
  color: #6c757d;
  text-decoration: line-through;
}

.size-selector {
  margin-bottom: 15px;
}

.size-label {
  font-weight: 600;
  margin-right: 10px;
}

.sizes {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 5px;
}

.sizes span {
  display: inline-block;
  width: 35px;
  height: 35px;
  border: 2px solid #ddd;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 600;
}

.sizes span:hover {
  border-color: #0468ff;
}

.sizes span.selected {
  background: #0468ff;
  color: white;
  border-color: #0468ff;
}

.product-actions {
  display: flex;
  gap: 10px;
}

.action-button {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 2px solid #000;
  box-shadow: 3px 3px 0px rgba(0, 0, 0, 0.1);
}

.quick-view {
  background: white;
  color: #1a1a1a;
}

.quick-view:hover {
  background: #f0f0f0;
  transform: translate(-2px, -2px);
  box-shadow: 5px 5px 0px rgba(0, 0, 0, 0.2);
}

.add-to-cart {
  background: #0468ff;
  color: white;
}

.add-to-cart:hover {
  background: #0353d9;
  transform: translate(-2px, -2px);
  box-shadow: 5px 5px 0px rgba(0, 0, 0, 0.2);
}

/* Animations */
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
  max-height: 500px;
  overflow: hidden;
}

.slide-enter, .slide-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}

/* Responsive */
@media (max-width: 992px) {
  .category-layout {
    flex-direction: column;
  }
  
  .category-sidebar {
    position: static;
    width: 100%;
  }
  
  .content-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
}

@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    height: auto;
    padding: 15px 0;
  }
  
  .header-actions {
    width: 100%;
    justify-content: center;
    margin-top: 15px;
  }
  
  .product-grid {
    grid-template-columns: 1fr;
  }
}
</style>