<template>
    <div class="subcategory-page">
      <BuyerHeader />
      
      <div class="container">
        <div class="breadcrumb">
          <router-link to="/">Accueil</router-link> 
          <span> > </span>
          <router-link :to="'/' + category">{{ category }}</router-link>
          <span> > </span>
          <span>{{ subcategory }}</span>
        </div>
        
        <h1 class="page-title">{{ subcategory }}</h1>
        
        <div class="products-section">
          <div class="products-grid">
            <ProductCard 
              v-for="product in subcategoryProducts" 
              :key="product.id"
              :product="product"
            />
          </div>
        </div>
      </div>
      
      <BuyerFooter />
    </div>
  </template>
  
  <script>
  import BuyerHeader from '@/components/buyerComponents/BuyerHeader.vue';
  import BuyerFooter from '@/components/buyerComponents/BuyerFooter.vue';
  import ProductCard from '@/components/buyerComponents/ProductCard.vue';
  
  export default {
    name: 'SubcategoryPage',
    components: {
      BuyerHeader,
      BuyerFooter,
      ProductCard
    },
    props: {
      category: String,
      subcategory: String
    },
    data() {
      return {
        subcategoryProducts: []
      };
    },
    created() {
      this.loadSubcategoryProducts();
    },
    methods: {
      loadSubcategoryProducts() {
        // Simuler un appel API pour les produits
        setTimeout(() => {
          this.subcategoryProducts = [
            {
              id: 201,
              title: 'iPhone 13 Pro',
              category: 'Smartphones',
              description: 'Le dernier iPhone avec écran ProMotion',
              price: 999,
              image: 'https://images.unsplash.com/photo-1632661341184-67b4d5b0a3a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
            },
            {
              id: 202,
              title: 'Samsung Galaxy S22',
              category: 'Smartphones',
              description: 'Écran AMOLED 120Hz, triple appareil photo',
              price: 899,
              image: 'https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
            },
            // Ajoutez d'autres produits selon la sous-catégorie
          ];
        }, 500);
      }
    }
  }
  </script>
  
  <style scoped>
  .breadcrumb {
    padding: 20px 0;
    font-size: 0.95rem;
    color: #666;
  }
  
  .breadcrumb a {
    color: #0468ff;
    text-decoration: none;
  }
  
  .breadcrumb a:hover {
    text-decoration: underline;
  }
  
  .page-title {
    font-size: 2.2rem;
    margin-bottom: 30px;
    color: #1a1a1a;
  }
  
  .products-section {
    margin-top: 30px;
  }
  
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 30px;
  }
  </style>