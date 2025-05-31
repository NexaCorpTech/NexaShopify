  <template>
    <div class="category-card" @click="navigateToCategory">
      <div class="category-icon" :style="{ backgroundColor: bgColor }">
        <i :class="icon"></i>
      </div>
      <h3>{{ name }}</h3>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CategoryCard',
    props: {
      name: {
        type: String,
        required: true
      },
      icon: {
        type: String,
        required: true
      },
      bgColor: {
        type: String,
        default: '#f8f9fa'
      },
      path: {
        type: String,
        required: true
      }
    },
    methods: {
      navigateToCategory() {
        this.$router.push(this.path);
      }
    }
  }
  </script>
  
  <style scoped>
  .category-card {
    background: white;
    border-radius: 12px;
    padding: 25px;
    width: 180px;
    text-align: center;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    transition: all 0.3s;
    cursor: pointer;
    flex: 0 0 auto;
  }
  
  .category-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
  
  .category-icon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    font-size: 2rem;
    color: #0468ff;
  }
  
  .category-card h3 {
    font-size: 1.1rem;
    color: #333;
  }
  
  @media (max-width: 768px) {
    .category-card {
      width: 160px;
      padding: 20px;
    }
    
    .category-icon {
      width: 70px;
      height: 70px;
      font-size: 1.8rem;
    }
  }
  
  @media (max-width: 480px) {
    .category-card {
      width: 140px;
      padding: 15px;
    }
  }
  </style>