<!-- <template>
    <header>
      <div class="container">
        <div class="header-top">
          <router-link to="/" class="logo">
            <i class="fas fa-store"></i>
            <span>NexaShop</span>
          </router-link>
          
          <div class="search-container">
            <input 
              type="text" 
              placeholder="Rechercher des produits..."
              v-model="searchQuery"
              @keyup.enter="performSearch"
            >
            <button @click="performSearch">
              <i class="fas fa-search"></i>
            </button>
          </div>
          
          <div class="user-actions">
            <router-link to="/account" class="action-btn">
              <i class="fas fa-user"></i>
              <span>Compte</span>
            </router-link>
            <router-link to="/wishlist" class="action-btn" style="position: relative;">
              <i class="fas fa-heart"></i>
              <span>Favoris</span>
              <span class="cart-count">{{ wishlistCount }}</span>
            </router-link>
            <router-link to="/cart" class="action-btn" style="position: relative;">
              <i class="fas fa-shopping-cart"></i>
              <span>Panier</span>
              <span class="cart-count">{{ cartCount }}</span>
            </router-link>
          </div>
        </div>
      </div>
      
      <nav>
        <div class="container">
          <ul>
            <li v-for="(category, index) in categories" :key="index">
              <router-link :to="category.link">{{ category.name }}</router-link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  </template>
  
  <script>
  export default {
    name: 'BuyerHeader',
    data() {
      return {
        searchQuery: '',
        wishlistCount: 3,
        cartCount: 5,
        categories: [
          { name: 'Accueil', link: '/' },
          { name: 'Nouveautés', link: '/new' },
          { name: 'Meilleures ventes', link: '/bestsellers' },
          { name: 'Promotions', link: '/sales' },
          { name: 'Électronique', link: '/electronics' },
          { name: 'Mode', link: '/fashion' },
          { name: 'Maison', link: '/home' },
          { name: 'Beauté', link: '/beauty' },
          { name: 'Sport', link: '/sports' }
        ]
      };
    },
    methods: {
      performSearch() {
        if (this.searchQuery.trim()) {
          this.$router.push({ path: '/search', query: { q: this.searchQuery } });
        }
      }
    }
  }
  </script>
  
  <style scoped>
  /* Styles du header (identique à la version précédente) */
  header {
    background-color: white;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
    position: sticky;
    top: 0;
    z-index: 100;
  }
  
  .header-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
  }
  
  .logo {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 24px;
    font-weight: 700;
    color: #0468ff;
    font-family: 'Montserrat', sans-serif;
    text-decoration: none;
  }
  
  .logo i {
    color: #ff7a00;
  }
  
  .search-container {
    flex: 1;
    max-width: 600px;
    margin: 0 20px;
    position: relative;
  }
  
  .search-container input {
    width: 100%;
    padding: 12px 50px 12px 20px;
    border: 2px solid #e9ecef;
    border-radius: 50px;
    font-size: 1rem;
    transition: all 0.3s;
  }
  
  .search-container input:focus {
    border-color: #0468ff;
    outline: none;
    box-shadow: 0 0 0 3px rgba(4, 104, 255, 0.2);
  }
  
  .search-container button {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #666;
    font-size: 1.2rem;
    cursor: pointer;
  }
  
  .user-actions {
    display: flex;
    gap: 20px;
  }
  
  .action-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.9rem;
    color: #555;
    text-decoration: none;
    transition: color 0.3s;
  }
  
  .action-btn i {
    font-size: 1.4rem;
    margin-bottom: 5px;
  }
  
  .action-btn:hover {
    color: #0468ff;
  }
  
  .cart-count {
    position: absolute;
    top: -5px;
    right: -5px;
    background: #ff6b6b;
    color: white;
    font-size: 0.7rem;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  nav {
    background: linear-gradient(135deg, #0468ff 0%, #00c6ff 100%);
    padding: 15px 0;
  }
  
  nav ul {
    display: flex;
    list-style: none;
    justify-content: center;
    gap: 30px;
  }
  
  nav a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    padding: 5px 10px;
    border-radius: 4px;
    transition: background 0.3s;
  }
  
  nav a:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  
  @media (max-width: 992px) {
    .header-top {
      flex-wrap: wrap;
    }
    
    .search-container {
      order: 3;
      max-width: 100%;
      margin: 15px 0 0;
    }
  }
  
  @media (max-width: 480px) {
    .user-actions {
      gap: 10px;
    }
    
    .action-btn span {
      display: none;
    }
  }
  </style> -->
  <template>
  <header>
    <div class="container">
      <div class="header-top">
        <router-link to="/" class="logo">
          <i class="fas fa-store"></i>
          <span>NexaShop</span>
        </router-link>
        
        <div class="search-container">
          <input 
            type="text" 
            placeholder="Rechercher des produits..."
            v-model="searchQuery"
            @keyup.enter="performSearch"
          >
          <button @click="performSearch">
            <i class="fas fa-search"></i>
          </button>
        </div>
        
        <div class="user-actions">
          <router-link to="/account" class="action-btn">
            <i class="fas fa-user"></i>
            <span>Compte</span>
          </router-link>
          <router-link to="/wishlist" class="action-btn" style="position: relative;">
            <i class="fas fa-heart"></i>
            <span>Favoris</span>
            <span class="cart-count">{{ wishlistCount }}</span>
          </router-link>
          <router-link to="/cart" class="action-btn" style="position: relative;">
            <i class="fas fa-shopping-cart"></i>
            <span>Panier</span>
            <span class="cart-count">{{ cartCount }}</span>
          </router-link>
        </div>
      </div>
    </div>
    
    <!-- <nav>
      <div class="container">
        <ul>
          <li v-for="(category, index) in categories" :key="index">
            <router-link :to="category.link">{{ category.name }}</router-link>
          </li>
        </ul>
      </div>
    </nav> -->
    <nav>
        ####
    <div class="container">
      <ul>
        <li v-for="(category, index) in categories" :key="index" class="nav-category">
          <router-link :to="category.link">{{ category.name }}</router-link>
          
          <div v-if="category.subcategories" class="subcategories-menu">
            <router-link 
              v-for="(sub, subIndex) in category.subcategories" 
              :key="subIndex"
              :to="sub.path"
            >
              {{ sub.name }}
            </router-link>
          </div>
        </li>
      </ul>
    </div>
  </nav>
  </header>
</template>

<script>
export default {
  name: 'BuyerHeader',
  data() {
    return {
      searchQuery: '',
      wishlistCount: 3,
      cartCount: 5,
      categories: [
        { name: 'Accueil', link: '/' },
        { name: 'Nouveautés', link: '/new' },
        { name: 'Meilleures ventes', link: '/bestsellers' },
        { name: 'Promotions', link: '/sales' },
        { name: 'Électronique', link: '/electronics' },
        { name: 'Mode', link: '/fashion' },
        { name: 'Maison', link: '/home' },
        { name: 'Beauté', link: '/beauty' },
        { name: 'Sport', link: '/sports' }
      ]
    };
  },
  methods: {
    performSearch() {
      if (this.searchQuery.trim()) {
        this.$router.push({ path: '/search', query: { q: this.searchQuery } });
      }
    }
  }
}
</script>

<style scoped>
header {
  background-color: white;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
  font-weight: 700;
  color: #0468ff;
  font-family: 'Montserrat', sans-serif;
  text-decoration: none;
}

.logo i {
  color: #ff7a00;
}

.search-container {
  flex: 1;
  max-width: 600px;
  margin: 0 20px;
  position: relative;
}

.search-container input {
  width: 100%;
  padding: 12px 50px 12px 20px;
  border: 2px solid #e9ecef;
  border-radius: 50px;
  font-size: 1rem;
  transition: all 0.3s;
}

.search-container input:focus {
  border-color: #0468ff;
  outline: none;
  box-shadow: 0 0 0 3px rgba(4, 104, 255, 0.2);
}

.search-container button {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #666;
  font-size: 1.2rem;
  cursor: pointer;
}

.user-actions {
  display: flex;
  gap: 20px;
}

.action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.9rem;
  color: #555;
  text-decoration: none;
  transition: color 0.3s;
}

.action-btn i {
  font-size: 1.4rem;
  margin-bottom: 5px;
}

.action-btn:hover {
  color: #0468ff;
}

.cart-count {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ff6b6b;
  color: white;
  font-size: 0.7rem;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

nav {
  background: linear-gradient(135deg, #0468ff 0%, #00c6ff 100%);
  padding: 15px 0;
}

nav ul {
  display: flex;
  list-style: none;
  justify-content: center;
  gap: 30px;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background 0.3s;
}

nav a:hover {
  background: rgba(255, 255, 255, 0.2);
}

@media (max-width: 992px) {
  .header-top {
    flex-wrap: wrap;
  }
  
  .search-container {
    order: 3;
    max-width: 100%;
    margin: 15px 0 0;
  }
}

@media (max-width: 480px) {
  .user-actions {
    gap: 10px;
  }
  
  .action-btn span {
    display: none;
  }
}

/** */
/* Ajouter ces styles */
.nav-category {
  position: relative;
}

.subcategories-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 200px;
  background: white;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  display: none;
  flex-direction: column;
  z-index: 100;
}

.nav-category:hover .subcategories-menu {
  display: flex;
}

.subcategories-menu a {
  color: #333;
  padding: 12px 15px;
  text-decoration: none;
  border-bottom: 1px solid #f0f0f0;
  font-size: 0.95rem;
  font-weight: 500;
}

.subcategories-menu a:hover {
  background: #f8f9fa;
  color: #0468ff;
}

@media (max-width: 992px) {
  .subcategories-menu {
    position: static;
    width: 100%;
    box-shadow: none;
    display: none;
    padding-left: 20px;
  }
  
  .nav-category:hover .subcategories-menu {
    display: block;
  }
}
</style>