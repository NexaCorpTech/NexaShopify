<!-- <template>
    <div class="buyer-home">
      <BuyerHeader />
      
      <main class="container"> -->
        <!-- Hero Banner -->
        <!-- <section class="hero-banner">
          <div class="hero-content">
            <h1>Découvrez des produits exceptionnels</h1>
            <p>Des milliers d'articles sélectionnés avec soin pour répondre à tous vos besoins</p>
            <router-link to="/products" class="cta-button">Explorer maintenant</router-link>
          </div>
        </section> -->
        
        <!-- Catégories -->
        <!-- <section class="categories-section">
          <div class="section-title">
            <h2>Parcourir par catégories</h2>
          </div>
          
          <div class="categories">
            <CategoryCard 
              v-for="(category, index) in categories" 
              :key="index"
              :name="category.name"
              :icon="category.icon"
              :path="category.path"
              :bgColor="category.bgColor"
            />
          </div>
        </section> -->
        
        <!-- Produits populaires -->
        <!-- <section class="products-section">
          <div class="section-title">
            <h2>Produits populaires</h2>
          </div>
          
          <div class="products-grid">
            <ProductCard 
              v-for="product in popularProducts" 
              :key="product.id"
              :product="product"
              @quick-view="handleQuickView"
              @add-to-cart="addToCart"
            />
          </div>
        </section> -->
        
        <!-- Banner Promotion -->
        <!-- <PromoBanner 
          title="Livraison gratuite à partir de 50€ d'achat!"
          description="Profitez de notre offre spéciale et faites-vous livrer rapidement et gratuitement"
          ctaText="Voir les conditions"
          ctaLink="/shipping"
        /> -->
        
        <!-- Nouveautés -->
        <!-- <section class="products-section">
          <div class="section-title">
            <h2>Nouveautés</h2>
          </div>
          
          <div class="products-grid">
            <ProductCard 
              v-for="product in newProducts" 
              :key="product.id"
              :product="product"
              @quick-view="handleQuickView"
              @add-to-cart="addToCart"
            />
          </div>
        </section>
      </main>
      
      <BuyerFooter />
    </div>
  </template> -->
  
  <!-- <script>
  import BuyerHeader from '@/components/buyerComponents/BuyerHeader.vue';
  import BuyerFooter from '@/components/buyerComponents/BuyerFooter.vue';
  import ProductCard from '@/components/buyerComponents/ProductCard.vue';
  import CategoryCard from '@/components/buyerComponents/CategoryCard.vue';
  import PromoBanner from '@/components/buyerComponents/PromoBanner.vue';
  
  export default {
    name: 'BuyerHome',
    components: {
      BuyerHeader,
      BuyerFooter,
      ProductCard,
      CategoryCard,
      PromoBanner
    },
    data() {
      return {
        categories: [
          { name: 'Électronique', icon: 'fas fa-mobile-alt', path: '/electronics', bgColor: '#e6f7ff' },
          { name: 'Mode', icon: 'fas fa-tshirt', path: '/fashion', bgColor: '#fff7e6' },
          { name: 'Maison', icon: 'fas fa-home', path: '/home', bgColor: '#f9f0ff' },
          { name: 'Beauté', icon: 'fas fa-heart', path: '/beauty', bgColor: '#fff0f6' },
          { name: 'Sport', icon: 'fas fa-dumbbell', path: '/sports', bgColor: '#f6ffed' },
          { name: 'Livres', icon: 'fas fa-book', path: '/books', bgColor: '#e6fffb' },
          { name: 'Cuisine', icon: 'fas fa-utensils', path: '/kitchen', bgColor: '#fff2e8' },
          { name: 'Jeux', icon: 'fas fa-gamepad', path: '/games', bgColor: '#fcffe6' }
        ],
        popularProducts: [
          {
            id: 1,
            title: 'Smartphone Premium',
            category: 'Électronique',
            description: 'Écran 6.7", 256GB, Appareil photo triple capteur',
            price: 799,
            oldPrice: 899,
            badge: 'Promo',
            image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
          },
          {
            id: 2,
            title: 'Montre Connectée Pro',
            category: 'Accessoires',
            description: 'Suivi santé, GPS, Résistance à l\'eau',
            price: 249,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
          },
          {
            id: 3,
            title: 'Casque Sans Fil',
            category: 'Audio',
            description: 'Annulation de bruit, 30h autonomie',
            price: 179,
            image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
          },
          {
            id: 4,
            title: 'Veste d\'hiver chaude',
            category: 'Mode',
            description: 'Isolation thermique, imperméable, design moderne',
            price: 129,
            badge: 'Nouveau',
            image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
          },
          {
            id: 5,
            title: 'Baskets Sport',
            category: 'Chaussures',
            description: 'Confort maximal, semelle amortissante',
            price: 89,
            image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
          },
          {
            id: 6,
            title: 'Machine à Café Automatique',
            category: 'Cuisine',
            description: 'Préparation rapide, plusieurs options',
            price: 159,
            image: 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
          },
          {
            id: 7,
            title: 'Écouteurs Sans Fil',
            category: 'Audio',
            description: 'Son haute qualité, batterie longue durée',
            price: 69,
            oldPrice: 99,
            badge: '-30%',
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
          },
          {
            id: 8,
            title: 'Sac à Dos Élégant',
            category: 'Accessoires',
            description: 'Design moderne, compartiments multiples',
            price: 79,
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
          }
        ],
        newProducts: [
          // Similaire à popularProducts mais pour les nouveautés
        ]
      };
    },
    methods: {
      handleQuickView(product) {
        // Implémenter la logique de prévisualisation rapide
        console.log('Quick view for:', product.title);
        // Ici, vous pourriez ouvrir un modal ou afficher une vue rapide
      },
      addToCart(product) {
        // Implémenter la logique d'ajout au panier
        console.log('Added to cart:', product.title);
        // Mettre à jour le store Vuex ou le state local
      }
    }
  }
  </script> -->
  
  <!-- <style scoped>
  .buyer-home {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #f8f9fa;
    color: #333;
    line-height: 1.6;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
  }
  
  .hero-banner {
    background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80');
    background-size: cover;
    background-position: center;
    color: white;
    padding: 100px 0;
    text-align: center;
    margin-bottom: 50px;
    border-radius: 12px;
  }
  
  .hero-content {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .hero-content h1 {
    font-size: 3rem;
    margin-bottom: 20px;
    font-weight: 700;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  }
  
  .hero-content p {
    font-size: 1.3rem;
    margin-bottom: 30px;
    text-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);
  }
  
  .cta-button {
    display: inline-block;
    background: #ff7a00;
    color: white;
    padding: 15px 40px;
    border-radius: 50px;
    font-size: 1.1rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
  
  .cta-button:hover {
    background: #ff8c2a;
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }
  
  .section-title {
    text-align: center;
    margin-bottom: 40px;
    position: relative;
    padding-bottom: 15px;
  }
  
  .section-title h2 {
    font-size: 2.2rem;
    color: #1a1a1a;
    font-family: 'Montserrat', sans-serif;
  }
  
  .section-title:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(to right, #0468ff, #00c6ff);
    border-radius: 2px;
  }
  
  .categories {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    margin-bottom: 60px;
  }
  
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 30px;
    margin-bottom: 60px;
  }
  
  @media (max-width: 768px) {
    .hero-content h1 {
      font-size: 2.2rem;
    }
    
    .hero-content p {
      font-size: 1.1rem;
    }
    
    .section-title h2 {
      font-size: 1.8rem;
    }
  }
  </style> -->

  <template>
  <div class="buyer-home">
    <BuyerHeader />
    
   
    <!-- Hero Banner en dehors du conteneur principal -->
    <section class="hero-banner">
      <div class="container">
        <div class="hero-content">
          <h1>Découvrez des produits exceptionnels</h1>
          <p>Des milliers d'articles sélectionnés avec soin pour répondre à tous vos besoins</p>
          <router-link to="/products" class="cta-button">Explorer maintenant</router-link>
        </div>
      </div>
    </section>
      <main class="container">
      <!-- Catégories -->
      <section class="categories-section">
        <div class="section-header">
          <div class="section-title">
            <h2>Parcourir par catégories</h2>
          </div>
          <div class="controls">
            <input 
              v-model="categorySearch" 
              placeholder="Rechercher une catégorie..."
              class="search-input"
            >
            <button @click="scrollCategories(-1)" class="nav-button">
              <i class="fas fa-chevron-left"></i>
            </button>
            <button @click="scrollCategories(1)" class="nav-button">
              <i class="fas fa-chevron-right"></i>
            </button>
            <router-link to="/all-categories" class="view-all">
              Voir toutes
            </router-link>
          </div>
        </div>
        
        <div class="categories-scroller" ref="scroller">
          <CategoryCard 
            v-for="(category, index) in filteredCategories" 
            :key="index"
            :name="category.name"
            :icon="category.icon"
            :path="category.path"
            :bgColor="category.bgColor"
          />
        </div>
      </section>
      
      <!-- Produits populaires -->
      <section class="products-section">
        <div class="section-title">
          <h2>Produits populaires</h2>
        </div>
        
        <div class="products-grid">
          <ProductCard 
            v-for="product in popularProducts" 
            :key="product.id"
            :product="product"
            @quick-view="handleQuickView"
            @add-to-cart="addToCart"
          />
        </div>
      </section>
      
      <!-- Banner Promotion -->
      <!-- <PromoBanner 
        title="Livraison gratuite à partir de 50€ d'achat!"
        description="Profitez de notre offre spéciale et faites-vous livrer rapidement et gratuitement"
        ctaText="Voir les conditions"
        ctaLink="/shipping"
      /> -->
      
      <!-- Nouveautés -->
      <section class="products-section">
        <div class="section-title">
          <h2>Nouveautés</h2>
        </div>
        
        <div class="products-grid">
          <ProductCard 
            v-for="product in newProducts" 
            :key="product.id"
            :product="product"
            @quick-view="handleQuickView"
            @add-to-cart="addToCart"
          />
        </div>
      </section>
    </main>
    
    <BuyerFooter />
  </div>
</template>

<script>
import BuyerHeader from '@/components/buyer/BuyerHeader.vue';
import BuyerFooter from '@/components/buyer/BuyerFooter.vue';
import ProductCard from '@/components/buyer/ProductCard.vue';
import CategoryCard from '@/components/buyer/CategoryCard.vue';
import PromoBanner from '@/components/buyer/PromoBanner.vue';

export default {
  name: 'BuyerHome',
  components: {
    BuyerHeader,
    BuyerFooter,
    ProductCard,
    CategoryCard,
    PromoBanner
  },
  data() {
    return {
      categorySearch: '',
      categories: [
        { name: 'Électronique', icon: 'fas fa-mobile-alt', path: '/electronics', bgColor: '#e6f7ff' },
        { name: 'Mode', icon: 'fas fa-tshirt', path: '/fashion', bgColor: '#fff7e6' },
        { name: 'Maison', icon: 'fas fa-home', path: '/home', bgColor: '#f9f0ff' },
        { name: 'Beauté', icon: 'fas fa-heart', path: '/beauty', bgColor: '#fff0f6' },
        { name: 'Sport', icon: 'fas fa-dumbbell', path: '/sports', bgColor: '#f6ffed' },
        { name: 'Livres', icon: 'fas fa-book', path: '/books', bgColor: '#e6fffb' },
        { name: 'Cuisine', icon: 'fas fa-utensils', path: '/kitchen', bgColor: '#fff2e8' },
        { name: 'Jeux', icon: 'fas fa-gamepad', path: '/games', bgColor: '#fcffe6' },
        { name: 'Jardin', icon: 'fas fa-leaf', path: '/garden', bgColor: '#f0fff4' },
        { name: 'Bébé', icon: 'fas fa-baby', path: '/baby', bgColor: '#fff5f7' },
        { name: 'Bureau', icon: 'fas fa-laptop', path: '/office', bgColor: '#f8f9fa' },
        { name: 'Voyage', icon: 'fas fa-suitcase', path: '/travel', bgColor: '#e6f7ff' }
      ],
      popularProducts: [
          {
            id: 1,
            title: 'Smartphone Premium',
            category: 'Électronique',
            description: 'Écran 6.7", 256GB, Appareil photo triple capteur',
            price: 799,
            oldPrice: 899,
            badge: 'Promo',
            image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
          },
          {
            id: 2,
            title: 'Montre Connectée Pro',
            category: 'Accessoires',
            description: 'Suivi santé, GPS, Résistance à l\'eau',
            price: 249,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
          },
          {
            id: 3,
            title: 'Casque Sans Fil',
            category: 'Audio',
            description: 'Annulation de bruit, 30h autonomie',
            price: 179,
            image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
          },
          {
            id: 4,
            title: 'Veste d\'hiver chaude',
            category: 'Mode',
            description: 'Isolation thermique, imperméable, design moderne',
            price: 129,
            badge: 'Nouveau',
            image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
          },
          {
            id: 5,
            title: 'Baskets Sport',
            category: 'Chaussures',
            description: 'Confort maximal, semelle amortissante',
            price: 89,
            image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
          },
          {
            id: 6,
            title: 'Machine à Café Automatique',
            category: 'Cuisine',
            description: 'Préparation rapide, plusieurs options',
            price: 159,
            image: 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
          },
          {
            id: 7,
            title: 'Écouteurs Sans Fil',
            category: 'Audio',
            description: 'Son haute qualité, batterie longue durée',
            price: 69,
            oldPrice: 99,
            badge: '-30%',
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
          },
          {
            id: 8,
            title: 'Sac à Dos Élégant',
            category: 'Accessoires',
            description: 'Design moderne, compartiments multiples',
            price: 79,
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
          }
        ],
      newProducts: [
        // ... (votre liste existante)
        {
        id: 4,
            title: 'Veste d\'hiver chaude',
            category: 'Mode',
            description: 'Isolation thermique, imperméable, design moderne',
            price: 129,
            badge: 'Nouveau',
            image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
          },
          
      ]
    };
  },
  computed: {
    filteredCategories() {
      if (!this.categorySearch) return this.categories;
      const searchTerm = this.categorySearch.toLowerCase();
      return this.categories.filter(cat => 
        cat.name.toLowerCase().includes(searchTerm)
      );
    }
  },
  methods: {
    scrollCategories(direction) {
      const scroller = this.$refs.scroller;
      const scrollAmount = 300;
      scroller.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
      });
    },
    handleQuickView(product) {
      console.log('Quick view for:', product.title);
    },
    addToCart(product) {
      console.log('Added to cart:', product.title);
    }
  }
}
</script>

<style scoped>
.buyer-home {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f8f9fa;
  color: #333;
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

.hero-banner {
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 100px 0;
  text-align: center;
  margin-bottom: 50px;
  /* border-radius: 12px; */
  width: 100%;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}


.hero-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

.hero-content h1 {
  font-size: 3rem;
  margin-bottom: 20px;
  font-weight: 700;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.hero-content p {
  font-size: 1.3rem;
  margin-bottom: 30px;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);
}

.cta-button {
  display: inline-block;
  background: #ff7a00;
  color: white;
  padding: 15px 40px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.cta-button:hover {
  background: #ff8c2a;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.section-title {
  text-align: center;
  margin-bottom: 40px;
  position: relative;
  padding-bottom: 15px;
}

.section-title h2 {
  font-size: 2.2rem;
  color: #1a1a1a;
  font-family: 'Montserrat', sans-serif;
}

.section-title:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(to right, #0468ff, #00c6ff);
  border-radius: 2px;
}

.categories-section {
  margin-bottom: 60px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
}

.controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-input {
  padding: 10px 15px;
  border: 2px solid #ddd;
  border-radius: 4px;
  min-width: 200px;
}

.nav-button {
  background: #0468ff;
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
}

.nav-button:hover {
  background: #0353d9;
}

.view-all {
  color: #0468ff;
  font-weight: 600;
  text-decoration: none;
  padding: 8px 15px;
  border: 2px solid #0468ff;
  border-radius: 4px;
  transition: all 0.3s;
}

.view-all:hover {
  background: #0468ff;
  color: white;
}

.categories-scroller {
  display: flex;
  overflow-x: auto;
  gap: 20px;
  padding: 10px 0 20px;
  scrollbar-width: thin;
  scrollbar-color: #0468ff #f0f0f0;
}

.categories-scroller::-webkit-scrollbar {
  height: 8px;
}

.categories-scroller::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 4px;
}

.categories-scroller::-webkit-scrollbar-thumb {
  background: #0468ff;
  border-radius: 4px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2.2rem;
  }
  
  .hero-content p {
    font-size: 1.1rem;
  }
  
  .section-title h2 {
    font-size: 1.8rem;
  }
  
  .section-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .controls {
    flex-wrap: wrap;
  }
  
  .search-input {
    flex: 1;
    min-width: auto;
  }
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }
  
  .nav-button {
    width: 35px;
    height: 35px;
  }
}
</style>


<!-- //#region -->
<!-- <template>
    <div class="buyer-home">
      <BuyerHeader />
      
      <main class="container"> -->
        <!-- Hero Banner -->
        <!-- <section class="hero-banner">
          <div class="hero-content">
            <h1>Découvrez des produits exceptionnels</h1>
            <p>Des milliers d'articles sélectionnés avec soin pour répondre à tous vos besoins</p>
            <router-link to="/products" class="cta-button">Explorer maintenant</router-link>
          </div>
        </section> -->
        
        <!-- Catégories -->
        <!-- <section class="categories-section">
          <div class="section-header">
            <div class="section-title">
              <h2>Parcourir par catégories</h2>
              <p v-if="filteredCategories.length === 0" class="no-results">Aucune catégorie trouvée</p>
            </div>
            <div class="controls">
              <input 
                v-model="categorySearch" 
                placeholder="Rechercher une catégorie..."
                class="search-input"
              >
              <router-link to="/all-categories" class="view-all">
                Voir toutes
              </router-link>
            </div>
          </div>
          
          <div class="categories-container">
            <div class="categories">
              <CategoryCard 
                v-for="(category, index) in filteredCategories" 
                :key="index"
                :name="category.name"
                :icon="category.icon"
                :path="category.path"
                :bgColor="category.bgColor"
              />
            </div>
            <button v-if="showScrollLeft" @click="scrollCategories(-1)" class="scroll-button left">
              <i class="fas fa-chevron-left"></i>
            </button>
            <button v-if="showScrollRight" @click="scrollCategories(1)" class="scroll-button right">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </section> -->
        
        <!-- Produits populaires -->
        <!-- <section class="products-section">
          <div class="section-title">
            <h2>Produits populaires</h2>
          </div>
          
          <div class="products-grid">
            <ProductCard 
              v-for="product in popularProducts" 
              :key="product.id"
              :product="product"
              @quick-view="handleQuickView"
              @add-to-cart="addToCart"
            />
          </div>
        </section> -->
        
        <!-- Banner Promotion -->
        <!-- <PromoBanner 
          title="Livraison gratuite à partir de 50€ d'achat!"
          description="Profitez de notre offre spéciale et faites-vous livrer rapidement et gratuitement"
          ctaText="Voir les conditions"
          ctaLink="/shipping"
        />
         -->
        <!-- Nouveautés -->
        <!-- <section class="products-section">
          <div class="section-title">
            <h2>Nouveautés</h2>
          </div>
          
          <div class="products-grid">
            <ProductCard 
              v-for="product in newProducts" 
              :key="product.id"
              :product="product"
              @quick-view="handleQuickView"
              @add-to-cart="addToCart"
            />
          </div>
        </section>
      </main>
      
      <BuyerFooter />
    </div>
  </template>
  
  <script>
  import BuyerHeader from '@/components/buyerComponents/BuyerHeader.vue';
  import BuyerFooter from '@/components/buyerComponents/BuyerFooter.vue';
  import ProductCard from '@/components/buyerComponents/ProductCard.vue';
  import CategoryCard from '@/components/buyerComponents/CategoryCard.vue';
  import PromoBanner from '@/components/buyerComponents/PromoBanner.vue';
  
  export default {
    name: 'BuyerHome',
    components: {
      BuyerHeader,
      BuyerFooter,
      ProductCard,
      CategoryCard,
      PromoBanner
    },
    data() {
      return {
        categorySearch: '',
        showScrollLeft: false,
        showScrollRight: true,
        categories: [
          { name: 'Électronique', icon: 'fas fa-mobile-alt', path: '/electronics', bgColor: '#e6f7ff' },
          { name: 'Mode', icon: 'fas fa-tshirt', path: '/fashion', bgColor: '#fff7e6' },
          { name: 'Maison', icon: 'fas fa-home', path: '/home', bgColor: '#f9f0ff' },
          { name: 'Beauté', icon: 'fas fa-heart', path: '/beauty', bgColor: '#fff0f6' },
          { name: 'Sport', icon: 'fas fa-dumbbell', path: '/sports', bgColor: '#f6ffed' },
          { name: 'Livres', icon: 'fas fa-book', path: '/books', bgColor: '#e6fffb' },
          { name: 'Cuisine', icon: 'fas fa-utensils', path: '/kitchen', bgColor: '#fff2e8' },
          { name: 'Jeux', icon: 'fas fa-gamepad', path: '/games', bgColor: '#fcffe6' },
          { name: 'Jardin', icon: 'fas fa-leaf', path: '/garden', bgColor: '#f0fff4' },
          { name: 'Bébé', icon: 'fas fa-baby', path: '/baby', bgColor: '#fff5f7' },
          { name: 'Bureau', icon: 'fas fa-laptop', path: '/office', bgColor: '#f8f9fa' },
          { name: 'Voyage', icon: 'fas fa-suitcase', path: '/travel', bgColor: '#e6f7ff' }
        ],
        popularProducts: [
          // ... (votre liste existante)
        ],
        newProducts: [
          // ... (votre liste existante)
        ]
      };
    },
    computed: {
      filteredCategories() {
        if (!this.categorySearch) return this.categories;
        const searchTerm = this.categorySearch.toLowerCase();
        return this.categories.filter(cat => 
          cat.name.toLowerCase().includes(searchTerm)
        );
      }
    },
    mounted() {
      this.checkScrollButtons();
      window.addEventListener('resize', this.checkScrollButtons);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.checkScrollButtons);
    },
    methods: {
      scrollCategories(direction) {
        const container = this.$el.querySelector('.categories');
        const scrollAmount = 300;
        container.scrollBy({
          left: direction * scrollAmount,
          behavior: 'smooth'
        });
        
        // Vérifier les boutons après un court délai
        setTimeout(this.checkScrollButtons, 300);
      },
      checkScrollButtons() {
        const container = this.$el.querySelector('.categories');
        if (!container) return;
        
        this.showScrollLeft = container.scrollLeft > 0;
        this.showScrollRight = container.scrollLeft + container.clientWidth < container.scrollWidth;
      },
      handleQuickView(product) {
        console.log('Quick view for:', product.title);
      },
      addToCart(product) {
        console.log('Added to cart:', product.title);
      }
    }
  }
  </script>
  
  <style scoped>
  .buyer-home {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #f8f9fa;
    color: #333;
    line-height: 1.6;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
  }
  
  .hero-banner {
    background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80');
    background-size: cover;
    background-position: center;
    color: white;
    padding: 100px 0;
    text-align: center;
    margin-bottom: 50px;
    border-radius: 12px;
  }
  
  .hero-content {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .hero-content h1 {
    font-size: 3rem;
    margin-bottom: 20px;
    font-weight: 700;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  }
  
  .hero-content p {
    font-size: 1.3rem;
    margin-bottom: 30px;
    text-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);
  }
  
  .cta-button {
    display: inline-block;
    background: #ff7a00;
    color: white;
    padding: 15px 40px;
    border-radius: 50px;
    font-size: 1.1rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
  
  .cta-button:hover {
    background: #ff8c2a;
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }
  
  .section-title {
    text-align: center;
    margin-bottom: 40px;
    position: relative;
    padding-bottom: 15px;
  }
  
  .section-title h2 {
    font-size: 2.2rem;
    color: #1a1a1a;
    font-family: 'Montserrat', sans-serif;
  }
  
  .section-title:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(to right, #0468ff, #00c6ff);
    border-radius: 2px;
  }
  
  .categories-section {
    margin-bottom: 60px;
  }
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 15px;
  }
  
  .controls {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .search-input {
    padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    min-width: 200px;
  }
  
  .view-all {
    color: #0468ff;
    font-weight: 600;
    text-decoration: none;
    transition: color 0.3s;
  }
  
  .view-all:hover {
    text-decoration: underline;
  }
  
  .categories-container {
    position: relative;
  }
  
  .categories {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    gap: 20px;
    padding: 10px 0 20px;
    scrollbar-width: thin;
    scroll-behavior: smooth;
    scrollbar-color: #0468ff #f0f0f0;
  }
  
  .categories::-webkit-scrollbar {
    height: 6px;
  }
  
  .categories::-webkit-scrollbar-track {
    background: #f0f0f0;
    border-radius: 4px;
  }
  
  .categories::-webkit-scrollbar-thumb {
    background: #0468ff;
    border-radius: 4px;
  }
  
  .scroll-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: white;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    transition: all 0.3s;
  }
  
  .scroll-button:hover {
    background: #f0f0f0;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  }
  
  .scroll-button.left {
    left: -20px;
  }
  
  .scroll-button.right {
    right: -20px;
  }
  
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 30px;
    margin-bottom: 60px;
  }
  
  .no-results {
    color: #666;
    font-style: italic;
    margin-top: 10px;
  }
  
  @media (max-width: 768px) {
    .hero-content h1 {
      font-size: 2.2rem;
    }
    
    .hero-content p {
      font-size: 1.1rem;
    }
    
    .section-title h2 {
      font-size: 1.8rem;
    }
    
    .section-header {
      flex-direction: column;
      align-items: stretch;
    }
    
    .controls {
      flex-wrap: wrap;
    }
    
    .search-input {
      flex: 1;
      min-width: auto;
    }
    
    .scroll-button {
      display: none;
    }
  }
  
  @media (max-width: 480px) {
    .products-grid {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 20px;
    }
  }
  </style> -->

<!-- //#endregion -->