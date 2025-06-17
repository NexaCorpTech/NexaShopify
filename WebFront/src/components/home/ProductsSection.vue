<template>
  <section id="products-section">
    <div class="container">
      <!-- Breadcrumbs et titre au-dessus des deux colonnes -->
      <div class="breadcrumbs">
        <a href="#">Accueil</a>
        <span> > </span>
        <span>{{ activeCategoryName }}</span>
        <span v-if="activeSubcategory !== null"> > {{ activeSubcategoryName }}</span>
      </div>
      
      <h1 class="category-title">{{ activeCategoryName }}<span v-if="activeSubcategory !== null"> - {{ activeSubcategoryName }}</span></h1>
      
      <div class="category-layout">
        <!-- Sidebar des catégories (réduite) -->
        <aside class="category-sidebar">
          <div class="sidebar-section">
            <div class="sidebar-header">
              <i class="fas fa-list"></i>
              <h3>Catégories</h3>
            </div>
            
            <ul class="category-list">
              <li 
                v-for="(category, index) in categories" 
                :key="index"
                :class="{ active: activeCategory === index }"
                @click="setActiveCategory(index)"
              >
                <div class="category-item">
                  <span>{{ category.name }}</span>
                  <i 
                    v-if="category.subcategories" 
                    :class="activeCategory === index ? 'fas fa-minus' : 'fas fa-plus'"
                  ></i>
                </div>
                
                <transition name="slide">
                  <ul 
                    v-if="category.subcategories && activeCategory === index" 
                    class="subcategory-list"
                  >
                    <li 
                      v-for="(sub, subIndex) in category.subcategories" 
                      :key="subIndex"
                      :class="{ active: activeSubcategory === subIndex }"
                      @click.stop="setActiveSubcategory(subIndex)"
                    >
                      {{ sub }}
                    </li>
                  </ul>
                </transition>
              </li>
            </ul>
          </div>
        </aside>
        
        <!-- Contenu principal -->
        <main class="category-content">
          <div class="filters-bar">
            <div class="filter-group">
              <label>Trier par :</label>
              <select v-model="sortBy" class="sort-select">
                <option value="popular">Populaire</option>
                <option value="new">Nouveautés</option>
                <option value="price-low">Prix: croissant</option>
                <option value="price-high">Prix: décroissant</option>
              </select>
            </div>
            
            <div class="filter-group">
              <label>Filtres actifs :</label>
              <div class="filter-tags">
                <span 
                  v-for="(tag, index) in activeFilters" 
                  :key="index" 
                  class="filter-tag"
                >
                  {{ tag }}
                  <i class="fas fa-times" @click="removeFilter(tag)"></i>
                </span>
              </div>
            </div>
          </div>
          
          <div class="products-grid">
            <ProductCard 
              v-for="(product, index) in paginatedProducts"
              :key="index"
              :product="product"
            />
          </div>
          
          <div class="pagination">
            <button 
              class="pagination-button" 
              @click="prevPage"
              :disabled="currentPage === 1"
            >
              <i class="fas fa-chevron-left"></i>
            </button>
            <span class="pagination-page">Page {{ currentPage }} sur {{ totalPages }}</span>
            <button 
              class="pagination-button" 
              @click="nextPage"
              :disabled="currentPage === totalPages"
            >
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </main>
      </div>
    </div>
  </section>
</template>

<script>
import ProductCard from '@/components/home/ProductCard.vue';

export default {
  components: { ProductCard },
  data() {
    return {
      activeCategory: 0,
      activeSubcategory: null,
      sortBy: 'popular',
      currentPage: 1,
      itemsPerPage: 15,
      activeFilters: [],
      categories: [
        { 
          id: 0,
          name: 'Tous',
          subcategories: []
        },
        { 
          id: 1,
          name: 'Électronique',
          subcategories: ['Smartphones', 'Ordinateurs', 'Accessoires']
        },
        { 
          id: 2,
          name: 'Mode',
          subcategories: ['Hommes', 'Femmes', 'Enfants']
        },
        { 
          id: 3,
          name: 'Maison',
          subcategories: ['Meubles', 'Décoration', 'Cuisine']
        },
        { 
          id: 4,
          name: 'Beauté',
          subcategories: ['Soins visage', 'Maquillage', 'Parfums']
        }
      ],
      products: [
        { 
          id: 1,
          title: "Ordinateur Portable Pro", 
          description: "PC haut de gamme avec écran 15 pouces, processeur i7",
          price: 899.99,
          oldPrice: 999.99,
          rating: 4.8,
          reviews: 120,
          image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          badge: "Nouveau",
          categoryId: 1,
          subcategory: 'Ordinateurs',
          sizes: ['13"', '15"', '17"']
        },
        { 
          id: 2,
          title: "Smartphone Premium", 
          description: "Dernier modèle avec appareil photo professionnel",
          price: 799.99,
          oldPrice: 899.99,
          rating: 4.7,
          reviews: 95,
          image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          badge: "Promo",
          categoryId: 1,
          subcategory: 'Smartphones',
          sizes: []
        },
        { 
          id: 3,
          title: "Écouteurs Sans Fil", 
          description: "Écouteurs Bluetooth avec annulation de bruit",
          price: 199.99,
          oldPrice: null,
          rating: 4.6,
          reviews: 87,
          image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          badge: null,
          categoryId: 1,
          subcategory: 'Accessoires',
          sizes: []
        },
        { 
          id: 4,
          title: "Chemise en Coton", 
          description: "Chemise élégante pour homme, 100% coton",
          price: 49.99,
          oldPrice: 59.99,
          rating: 4.5,
          reviews: 64,
          image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          badge: "Soldes",
          categoryId: 2,
          subcategory: 'Hommes',
          sizes: ['S', 'M', 'L', 'XL']
        },
        { 
          id: 5,
          title: "Robe d'Été", 
          description: "Robe légère et confortable pour l'été",
          price: 39.99,
          oldPrice: null,
          rating: 4.4,
          reviews: 78,
          image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          badge: null,
          categoryId: 2,
          subcategory: 'Femmes',
          sizes: ['XS', 'S', 'M']
        },
        { 
          id: 6,
          title: "T-shirt Enfant", 
          description: "T-shirt 100% coton pour enfants",
          price: 19.99,
          oldPrice: 24.99,
          rating: 4.3,
          reviews: 42,
          image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          badge: null,
          categoryId: 2,
          subcategory: 'Enfants',
          sizes: ['4-6 ans', '8-10 ans', '12-14 ans']
        },
        { 
          id: 7,
          title: "Canapé d'Angle", 
          description: "Canapé moderne en tissu résistant",
          price: 799.99,
          oldPrice: 899.99,
          rating: 4.9,
          reviews: 36,
          image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          badge: "Nouveau",
          categoryId: 3,
          subcategory: 'Meubles',
          sizes: []
        },
        { 
          id: 8,
          title: "Lampe de Bureau", 
          description: "Lampe LED réglable avec chargeur USB",
          price: 29.99,
          oldPrice: 39.99,
          rating: 4.7,
          reviews: 58,
          image: "https://images.unsplash.com/photo-1531585022366-5d3a9f2a550d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          badge: null,
          categoryId: 3,
          subcategory: 'Décoration',
          sizes: []
        },
        { 
          id: 9,
          title: "Set de Couteaux", 
          description: "Set de 5 couteaux de cuisine professionnels",
          price: 89.99,
          oldPrice: 99.99,
          rating: 4.8,
          reviews: 47,
          image: "https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          badge: "Promo",
          categoryId: 3,
          subcategory: 'Cuisine',
          sizes: []
        },
        { 
          id: 10,
          title: "Crème Hydratante", 
          description: "Crème hydratante pour le visage 24h",
          price: 24.99,
          oldPrice: 29.99,
          rating: 4.6,
          reviews: 89,
          image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          badge: null,
          categoryId: 4,
          subcategory: 'Soins visage',
          sizes: []
        },
        { 
          id: 11,
          title: "Rouge à Lèvres", 
          description: "Rouge à lèvres longue tenue, 12 teintes disponibles",
          price: 16.99,
          oldPrice: null,
          rating: 4.5,
          reviews: 76,
          image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          badge: null,
          categoryId: 4,
          subcategory: 'Maquillage',
          sizes: []
        },
        { 
          id: 12,
          title: "Eau de Parfum", 
          description: "Parfum floral et boisé, flacon de 100ml",
          price: 59.99,
          oldPrice: 69.99,
          rating: 4.7,
          reviews: 63,
          image: "https://images.unsplash.com/photo-1592945403247-b0e5c0e1b6d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          badge: "Best-seller",
          categoryId: 4,
          subcategory: 'Parfums',
          sizes: []
        },
        { 
          id: 13,
          title: "Sac à Dos", 
          description: "Sac à dos léger et résistant, 25L",
          price: 49.99,
          oldPrice: 59.99,
          rating: 4.4,
          reviews: 52,
          image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          badge: null,
          categoryId: 1,
          subcategory: 'Accessoires',
          sizes: []
        },
        { 
          id: 14,
          title: "Montre Connectée", 
          description: "Montre connectée avec suivi d'activité et notifications",
          price: 129.99,
          oldPrice: 149.99,
          rating: 4.8,
          reviews: 94,
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          badge: "Nouveau",
          categoryId: 1,
          subcategory: 'Accessoires',
          sizes: []
        },
        { 
          id: 15,
          title: "Chaussures de Sport", 
          description: "Chaussures de running légères et confortables",
          price: 79.99,
          oldPrice: 89.99,
          rating: 4.6,
          reviews: 81,
          image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          badge: "Promo",
          categoryId: 2,
          subcategory: 'Hommes',
          sizes: ['40', '41', '42', '43', '44']
        }
      ]
    }
  },
  computed: {
    activeCategoryName() {
      return this.categories[this.activeCategory].name;
    },
    activeSubcategoryName() {
      if (this.activeSubcategory !== null) {
        return this.categories[this.activeCategory].subcategories[this.activeSubcategory];
      }
      return null;
    },
    filteredProducts() {
      let filtered = [...this.products];
      
      if (this.activeCategory > 0) {
        filtered = filtered.filter(p => p.categoryId === this.activeCategory);
        
        if (this.activeSubcategory !== null) {
          const subName = this.categories[this.activeCategory].subcategories[this.activeSubcategory];
          filtered = filtered.filter(p => p.subcategory === subName);
        }
      }
      
      switch (this.sortBy) {
        case 'price-low':
          return filtered.sort((a, b) => a.price - b.price);
        case 'price-high':
          return filtered.sort((a, b) => b.price - a.price);
        case 'new':
          return filtered.sort((a, b) => b.id - a.id);
        default:
          return filtered.sort((a, b) => b.rating - a.rating);
      }
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredProducts.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    }
  },
  methods: {
    setActiveCategory(index) {
      if (this.activeCategory === index) {
        this.activeCategory = 0;
        this.activeSubcategory = null;
      } else {
        this.activeCategory = index;
        this.activeSubcategory = null;
      }
      this.currentPage = 1;
    },
    setActiveSubcategory(index) {
      this.activeSubcategory = index;
      this.currentPage = 1;
    },
    addFilter(filter) {
      if (!this.activeFilters.includes(filter)) {
        this.activeFilters.push(filter);
      }
    },
    removeFilter(filter) {
      this.activeFilters = this.activeFilters.filter(f => f !== filter);
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  }
}
</script>

<style scoped>
#products-section {
  padding: 40px 0;
  text-align: left;
}

/* Conteneur pour aligner avec le header */
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.breadcrumbs {
  font-size: 0.9rem;
  margin-bottom: 10px;
  color: var(--gray);
}

.breadcrumbs a {
  color: var(--primary);
  text-decoration: none;
  font-weight: 500;
}

.breadcrumbs a:hover {
  text-decoration: underline;
}

.breadcrumbs span {
  margin: 0 5px;
}

.category-title {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: var(--dark);
  position: relative;
  padding-bottom: 15px;
}

.category-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100px;
  height: 3px;
  background: var(--primary);
}

.category-layout {
  display: flex;
  gap: 30px;
  align-items: flex-start;
}

/* Sidebar réduite */
.category-sidebar {
  flex: 0 0 240px;
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  height: fit-content;
}

.category-content {
  flex: 1;
  width: calc(100% - 270px);
}

.sidebar-section {
  margin-bottom: 30px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.sidebar-header h3 {
  font-size: 1.2rem;
  font-weight: 600;
}

.category-list {
  list-style: none;
  padding: 0;
}

.category-list > li {
  margin-bottom: 8px;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
}

.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  font-weight: 500;
  background: #f8f9fa;
  border-radius: 8px;
  transition: all 0.3s;
  font-size: 0.95rem;
}

.category-list > li.active .category-item {
  background: var(--primary);
  color: white;
}

.subcategory-list {
  list-style: none;
  padding: 0;
  margin: 0;
  background: white;
}

.subcategory-list li {
  padding: 8px 15px;
  transition: all 0.2s;
  border-bottom: 1px solid #f1f1f1;
  font-size: 0.9rem;
}

.subcategory-list li:last-child {
  border-bottom: none;
}

.subcategory-list li:hover {
  background: #f8f9fa;
}

.subcategory-list li.active {
  background: var(--primary-light);
  color: var(--primary);
  font-weight: 600;
}

.filters-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding: 15px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.05);
  width: 100%;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.filter-group label {
  font-weight: 500;
  font-size: 0.95rem;
}

.sort-select {
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-weight: 500;
  background: white;
  cursor: pointer;
  font-size: 0.9rem;
}

.filter-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-tag {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  background: #f0f9ff;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
}

.filter-tag i {
  font-size: 0.75rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 15px;
  width: 100%;
}

.products-grid > * {
  min-width: 0;
  width: 100%;
  height: 100%;
}

.pagination {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
  margin-top: 30px;
}

.pagination-button {
  width: 36px;
  height: 36px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  font-size: 0.9rem;
}

.pagination-button:hover:not(:disabled) {
  border-color: var(--primary);
  color: var(--primary);
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-page {
  font-weight: 500;
  font-size: 0.95rem;
}

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

@media (max-width: 1600px) {
  .products-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (max-width: 1300px) {
  .products-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 992px) {
  .category-layout {
    flex-direction: column;
  }
  
  .category-content {
    width: 100%;
  }
  
  .category-sidebar {
    flex: 0 0 auto;
    width: 100%;
  }
  
  .products-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: 1fr;
  }

  .filters-bar {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .category-title {
    font-size: 1.8rem;
  }
  
  .filter-group {
    width: 100%;
    justify-content: space-between;
  }
}

/* Animation d'apparition des produits */
.products-grid > * {
  animation: productAppear 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
  animation-delay: calc(0.05s * var(--i));
}

@keyframes productAppear {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Animation de la barre de filtres */
.filters-bar {
  animation: slideIn 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Effet de surbrillance sur catégorie active */
.category-list > li.active .category-item {
  position: relative;
  overflow: hidden;
}

.category-list > li.active .category-item::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  animation: shine 1.5s infinite;
}

@keyframes shine {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
</style>