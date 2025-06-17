<template>
    <div class="category-page">
      <BuyerHeader />
      
      <div class="container">
        <div class="breadcrumb">
          <router-link to="/">Accueil</router-link> 
          <span> > </span>
          <span>{{ categoryData.name }}</span>
        </div>
        
        <h1 class="page-title">{{ categoryData.name }}</h1>
        
        <div v-if="categoryData.subcategories" class="subcategories">
          <div 
            v-for="(sub, index) in categoryData.subcategories" 
            :key="index"
            class="subcategory-card"
            @click="$router.push(sub.path)"
          >
            <div class="subcategory-icon">
              <i :class="sub.icon || 'fas fa-tag'"></i>
            </div>
            <h3>{{ sub.name }}</h3>
          </div>
        </div>
        
        <div class="products-section">
          <h2>Produits populaires dans {{ categoryData.name }}</h2>
          <div class="products-grid">
            <ProductCard 
              v-for="product in categoryProducts" 
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
    name: 'CategoryPage',
    components: {
      BuyerHeader,
      BuyerFooter,
      ProductCard
    },
    props: {
      category: String
    },
    data() {
      return {
        categoryData: {},
        categoryProducts: []
      };
    },
    created() {
      this.loadCategoryData();
      this.loadCategoryProducts();
    },
    methods: {
      loadCategoryData() {
        // En réalité, vous feriez un appel API ici
        // Pour l'exemple, nous utilisons les données locales
        const allCategories = [
          // Copiez votre liste de catégories de BuyerHome.vue ici
        ];
        
        this.categoryData = allCategories.find(
          cat => cat.path.substring(1) === this.category
        ) || {};
      },
      loadCategoryProducts() {
        // Simuler un appel API pour les produits
        setTimeout(() => {
          this.categoryProducts = [
            {
              id: 101,
              title: 'Smartphone Premium',
              category: 'Électronique',
              description: 'Écran 6.7", 256GB, Appareil photo triple capteur',
              price: 799,
              oldPrice: 899,
              badge: 'Promo',
              image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
            },
            // Ajoutez d'autres produits selon la catégorie
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
  
  .subcategories {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 40px;
  }
  
  .subcategory-card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    width: 180px;
    text-align: center;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    transition: all 0.3s;
    cursor: pointer;
  }
  
  .subcategory-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
  
  .subcategory-icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #f8f9fa;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 15px;
    font-size: 1.5rem;
    color: #0468ff;
  }
  
  .subcategory-card h3 {
    font-size: 1rem;
    color: #333;
  }
  
  .products-section {
    margin-top: 50px;
  }
  
  .products-section h2 {
    font-size: 1.8rem;
    margin-bottom: 30px;
    color: #1a1a1a;
    position: relative;
    padding-bottom: 10px;
  }
  
  .products-section h2::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background: #0468ff;
    border-radius: 2px;
  }
  
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 30px;
  }
  
  @media (max-width: 768px) {
    .subcategories {
      justify-content: center;
    }
  }
  </style>