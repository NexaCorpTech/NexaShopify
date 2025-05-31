<template>
    <div class="product-card" @click="viewProduct">
      <span v-if="product.badge" class="product-badge" :class="badgeClass">
        {{ product.badge }}
      </span>
      <div class="product-image">
        <img :src="product.image" :alt="product.title">
        <div class="quick-view">
          <button class="quick-view-btn" @click.stop="quickView">Voir rapidement</button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-category">{{ product.category }}</div>
        <h3 class="product-title">{{ product.title }}</h3>
        <p class="product-description">{{ product.description }}</p>
        <div class="product-price">
          <div class="price">
            <span v-if="product.oldPrice" class="old-price">{{ product.oldPrice }}€</span>
            {{ product.price }}€
          </div>
          <button class="add-to-cart" @click.stop="addToCart">
            <i class="fas fa-plus"></i>
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
      badgeClass() {
        if (this.product.badge === 'Promo') return 'promo';
        if (this.product.badge === 'Nouveau') return 'new';
        if (this.product.badge.includes('-')) return 'discount';
        return '';
      }
    },
    methods: {
      viewProduct() {
        this.$router.push(`/product/${this.product.id}`);
      },
      quickView() {
        this.$emit('quick-view', this.product);
      },
      addToCart() {
        this.$emit('add-to-cart', this.product);
      }
    }
  }
  </script>
  
  <style scoped>
  .product-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    transition: all 0.3s;
    position: relative;
    cursor: pointer;
  }
  
  .product-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
  
  .product-badge {
    position: absolute;
    top: 15px;
    left: 15px;
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: 600;
    z-index: 2;
  }
  
  .product-badge.promo {
    background: #ff6b6b;
  }
  
  .product-badge.new {
    background: #20c997;
  }
  
  .product-badge.discount {
    background: #ffd166;
    color: #333;
  }
  
  .product-image {
    height: 200px;
    overflow: hidden;
    position: relative;
  }
  
  .product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s;
  }
  
  .product-card:hover .product-image img {
    transform: scale(1.05);
  }
  
  .quick-view {
    position: absolute;
    bottom: -40px;
    left: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.9);
    padding: 10px;
    text-align: center;
    transition: bottom 0.3s;
  }
  
  .product-card:hover .quick-view {
    bottom: 0;
  }
  
  .quick-view-btn {
    background: #0468ff;
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 4px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  .quick-view-btn:hover {
    background: #0353d9;
  }
  
  .product-info {
    padding: 20px;
  }
  
  .product-category {
    color: #20c997;
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 5px;
  }
  
  .product-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 10px;
    color: #1a1a1a;
  }
  
  .product-description {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 15px;
    height: 40px;
    overflow: hidden;
  }
  
  .product-price {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .price {
    font-size: 1.2rem;
    font-weight: 700;
    color: #1a1a1a;
  }
  
  .old-price {
    font-size: 0.9rem;
    color: #999;
    text-decoration: line-through;
    margin-right: 5px;
  }
  
  .add-to-cart {
    background: #0468ff;
    color: white;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .add-to-cart:hover {
    background: #0353d9;
    transform: scale(1.1);
  }
  </style>