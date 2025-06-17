<template>
  <div class="product-card">
    <div v-if="product.badge" class="product-badge">{{ product.badge }}</div>
    
    <div class="product-image" :style="{ backgroundImage: 'url(' + product.image + ')' }"></div>
    
    <div class="product-info">
      <h3 class="product-title">{{ product.title }}</h3>
      <p class="product-description">{{ product.description }}</p>
      
      <div class="product-price">
        <span class="current-price">{{ formattedPrice }}</span>
        <span v-if="product.oldPrice" class="old-price">{{ formattedOldPrice }}</span>
      </div>
      
      <div class="size-selector" v-if="product.sizes && product.sizes.length">
        <span class="size-label">Taille:</span>
        <div class="sizes">
          <span 
            v-for="(size, index) in product.sizes" 
            :key="index"
            :class="{ selected: selectedSize === size }"
            @click="selectSize(size)"
          >
            {{ size }}
          </span>
        </div>
      </div>
      
      <div class="product-meta">
        <span><i class="fas fa-star"></i> {{ product.rating }} ({{ product.reviews }})</span>
        <span>En stock</span>
      </div>
      
      <!-- <div class="product-actions">
        <button class="action-button quick-view">
          <i class="far fa-eye"></i> Voir
        </button>
        <button class="action-button add-to-cart">
          <i class="fas fa-shopping-cart"></i> Ajouter
        </button>
      </div> -->
       <div class="product-actions">
      <button class="action-button neo-brutal quick-view">
        <i class="far fa-eye"></i> Voir
      </button>
      <button class="action-button neo-brutal add-to-cart">
        <i class="fas fa-shopping-cart"></i> Ajouter
      </button>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      selectedSize: null
    }
  },
  computed: {
    formattedPrice() {
      return `${this.product.price.toFixed(2)} €`;
    },
    formattedOldPrice() {
      return this.product.oldPrice ? `${this.product.oldPrice.toFixed(2)} €` : '';
    }
  },
  methods: {
    selectSize(size) {
      this.selectedSize = size;
    }
  }
}
</script>

<style scoped>
.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  transition: all 0.3s;
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 220px;
  max-width: 100%;
  height: 100%;
  min-height: 380px;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.1);
}

.product-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: var(--accent);
  color: white;
  padding: 4px 8px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  z-index: 2;
}

.product-image {
  height: 180px;
  background-size: cover;
  background-position: center;
  background-color: #f8f9fa;
  flex-shrink: 0;
}

.product-info {
  padding: 15px;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.product-title {
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 1rem;
  color: var(--dark);
  line-height: 1.3;
  min-height: 3em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.product-description {
  color: var(--gray);
  font-size: 0.85rem;
  margin-bottom: 12px;
  line-height: 1.5;
  flex-grow: 1;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.product-price {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.current-price {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--primary);
}

.old-price {
  font-size: 0.85rem;
  color: var(--gray);
  text-decoration: line-through;
}

.size-selector {
  margin-bottom: 12px;
}

.size-label {
  font-weight: 500;
  margin-right: 8px;
  font-size: 0.85rem;
}

.sizes {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 4px;
}

.sizes span {
  display: inline-block;
  padding: 4px 8px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.8rem;
}

.sizes span:hover {
  border-color: var(--primary);
}

.sizes span.selected {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.product-meta {
  display: flex;
  justify-content: space-between;
  color: var(--gray);
  font-size: 0.8rem;
  margin-bottom: 12px;
}

.product-actions {
  display: flex;
  gap: 8px;
  margin-top: auto;
}

.action-button {
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 0.85rem;
}

.quick-view {
  background: #f8f9fa;
  color: var(--dark);
}

.quick-view:hover {
  background: #e2e8f0;
}

.add-to-cart {
  background: var(--primary);
  color: white;
}

.add-to-cart:hover {
  background: var(--primary-dark);
}

@media (max-width: 768px) {
  .product-card {
    min-height: auto;
  }
  
  .product-image {
    height: 180px;
  }
}
/* ... (nouveau style bouton ajouter et voir product) ... */

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
  border: 2px solid #000 !important;
  box-shadow: 3px 3px 0px rgba(0, 0, 0, 0.1);
}

.action-button:hover {
  transform: translate(-2px, -2px);
  box-shadow: 5px 5px 0px rgba(0, 0, 0, 0.2);
}

.quick-view {
  background: white !important;
  color: #1a1a1a !important;
}

.quick-view:hover {
  background: #f0f0f0 !important;
}

.add-to-cart {
  background: #0468ff !important;
  color: white !important;
}

.add-to-cart:hover {
  background: #0353d9 !important;
}

@keyframes cartAdd {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.add-to-cart:active {
  animation: cartAdd 0.3s ease;
}

/* Effet de texture sur la carte */
.product-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><rect width="20" height="20" fill="transparent"/><path d="M0 10 L20 10 M10 0 L10 20" stroke="rgba(0,0,0,0.05)" stroke-width="0.5"/></svg>');
  pointer-events: none;
  z-index: 1;
}

/* Animation de survol améliorée */
.product-card:hover {
  transform: translate(-5px, -5px);
  box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.15);
}

</style>