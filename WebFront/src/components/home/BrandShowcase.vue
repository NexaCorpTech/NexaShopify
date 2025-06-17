<template>
  <section class="partners-section">
    <div class="container">
      <h2 class="section-title"><i class="fas fa-crown"></i>  NOS PARTENAIRES</h2>
      <p class="section-subtitle">Ils nous ont fait confiance et croient en nos potentiels</p>
      
      <div class="partners-grid">
        <div v-for="(partner, index) in partners" :key="index" class="partner-card">
          <div class="partner-logo">
            <div class="logo-text">{{ getInitials(partner.name) }}</div>
          </div>
          <div class="partner-info">
            <div class="partner-name">{{ partner.name }}</div>
            <p v-if="partner.description" class="partner-description">{{ partner.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PartnersSection',
  data() {
    return {
      partners: [
        {
          name: "CIPMEN",
          description: "CIPPIN inclusive des NICs au logo"
        },
        {
          name: "ACEP",
          description: "La réussite à portée de main"
        },
        {
          name: "ATMA",
          description: "Accompagnement vers l'excellence"
        },
        {
          name: "TARRA",
          description: "Innovation et développement durable"
        },
        {
          name: "SLT",
          description: "Solutions technologiques avancées"
        },
        {
          name: "NIGER TELECOMS",
          description: "Connectivité pour tous"
        }
      ]
    }
  },
  methods: {
    getInitials(name) {
      return name.split(' ').map(word => word[0]).join('');
    }
  }
}
</script>

<style scoped>
.partners-section {
  padding: 80px 0;
  background: #ffffff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  text-align: center;
  font-size: 3rem;
  color: #1a237e;
  margin-bottom: 15px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  padding-bottom: 15px;
}

.section-title:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 5px;
  background: #3498db;
  border-radius: 3px;
}

.section-subtitle {
  text-align: center;
  font-size: 1.4rem;
  color: #5a5a5a;
  max-width: 800px;
  margin: 25px auto 60px;
  font-weight: 500;
  line-height: 1.6;
}

.partners-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 40px;
}

.partner-card {
  border-radius: 12px;
  background: #ffffff;
  transition: all 0.3s ease;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 260px;
  position: relative;
  overflow: hidden;
  border: 1px solid #eaeaea;
}

.partner-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.partner-logo {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.logo-text {
  font-size: 2.8rem;
  font-weight: 800;
  color: #1a237e;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.partner-info {
  padding: 20px;
  background: #f8f9fa;
  border-top: 1px solid #e0e0e0;
}

.partner-name {
  font-size: 1.6rem;
  font-weight: 700;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 10px;
}

.partner-description {
  font-size: 1.1rem;
  color: #5a5a5a;
  text-align: center;
  line-height: 1.5;
}

@media (max-width: 992px) {
  .partners-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 30px;
  }
  
  .section-title {
    font-size: 2.5rem;
  }
  
  .section-subtitle {
    font-size: 1.2rem;
  }
}

@media (max-width: 768px) {
  .partners-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 25px;
  }
  
  .section-title {
    font-size: 2.2rem;
  }
  
  .section-subtitle {
    font-size: 1.1rem;
    margin-bottom: 40px;
  }
  
  .partner-card {
    height: 240px;
  }
  
  .logo-text {
    font-size: 2.4rem;
  }
  
  .partner-name {
    font-size: 1.4rem;
  }
}

@media (max-width: 480px) {
  .partners-grid {
    grid-template-columns: 1fr;
    max-width: 400px;
    margin: 0 auto;
  }
  
  .section-title {
    font-size: 1.8rem;
  }
  
  .section-subtitle {
    font-size: 1rem;
  }
  
  .partner-card {
    height: 220px;
  }
}

.partner-card {
  animation: partnerAppear 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
  animation-delay: calc(0.1s * var(--i));
}

@keyframes partnerAppear {
  from {
    opacity: 0;
    transform: translateY(30px) rotate(2deg);
  }
  to {
    opacity: 1;
    transform: translateY(0) rotate(0);
  }
}

/* Effet de brillance au survol */
.partner-card:hover::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg, 
    rgba(255,255,255,0) 0%, 
    rgba(255,255,255,0.1) 40%,
    rgba(255,255,255,0.1) 60%,
    rgba(255,255,255,0) 100%
  );
  animation: shine 1.5s infinite;
}

@keyframes shine {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
</style>

      <!-- <h2 class="section-title">Nos partenaires technologiques</h2>
      <p class="section-subtitle">Découvrez les marques leaders qui nous font confiance et avec lesquelles nous collaborons</p> -->
      