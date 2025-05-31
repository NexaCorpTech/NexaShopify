<template>
    <div class="product-card">
      <span v-if="product.badge" class="product-badge">{{ product.badge }}</span>
      <img :src="product.image" :alt="product.title" class="product-image">
      <div class="product-info">
        <div class="product-category">{{ product.category }}</div>
        <h3 class="product-title">{{ product.title }}</h3>
        <p class="product-description">{{ product.description }}</p>
        <div class="product-price">
          <span class="current-price">{{ formattedPrice }}€</span>
          <span v-if="product.oldPrice" class="old-price">{{ product.oldPrice }}€</span>
        </div>
        <div class="product-actions">
          <button class="action-button quick-view" @click="$emit('quick-view', product)">
            <i class="far fa-eye"></i> Voir
          </button>
          <button class="action-button add-to-cart" @click="$emit('add-to-cart', product)">
            <i class="fas fa-shopping-cart"></i> Ajouter
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProductCard',
    props: {
      product: {
        type: Object,
        required: true
      }
    },
    computed: {
      formattedPrice() {
        return this.product.price.toFixed(2);
      }
    },
    emits: ['quick-view', 'add-to-cart']
  }
  </script>
  
  <style scoped>
  .product-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    position: relative;
  }
  
  .product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
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
  }
  
  .product-image {
    width: 100%;
    height: 220px;
    object-fit: cover;
    display: block;
  }
  
  .product-info {
    padding: 20px;
  }
  
  .product-category {
    color: #6c757d;
    font-size: 0.9rem;
    margin-bottom: 5px;
  }
  
  .product-title {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 10px;
    color: #1a1a1a;
  }
  
  .product-description {
    color: #6c757d;
    font-size: 0.95rem;
    margin-bottom: 15px;
    height: 40px;
    overflow: hidden;
  }
  
  .product-price {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
  }
  
  .current-price {
    font-size: 1.3rem;
    font-weight: 700;
    color: #ff7a00;
  }
  
  .old-price {
    font-size: 1rem;
    color: #6c757d;
    text-decoration: line-through;
  }
  
  .product-actions {
    display: flex;
    gap: 10px;
  }
  
  .action-button {
    flex: 1;
    padding: 10px;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  
  .quick-view {
    background: #f0f0f0;
    color: #1a1a1a;
  }
  
  .quick-view:hover {
    background: #e0e0e0;
  }
  
  .add-to-cart {
    background: #0468ff;
    color: white;
  }
  
  .add-to-cart:hover {
    background: #0353d9;
  }
  </style>