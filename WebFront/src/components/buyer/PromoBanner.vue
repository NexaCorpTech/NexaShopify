<template>
  <section class="promo-banner">
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <router-link :to="ctaLink" class="cta-button">{{ ctaText }}</router-link>
  </section>
</template>

<script>
export default {
  name: 'PromoBanner',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    ctaText: {
      type: String,
      default: 'En savoir plus'
    },
    ctaLink: {
      type: String,
      default: '/promotions'
    },
    bgColor: {
      type: String,
      default: 'linear-gradient(135deg, #ff7a00 0%, #ffd000 100%)'
    }
  }
}
</script>

<style scoped>
.promo-banner {
  background: v-bind(bgColor);
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  color: white;
  margin-bottom: 60px;
  position: relative;
  overflow: hidden;
}

.promo-banner h2 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  position: relative;
  z-index: 2;
}

.promo-banner p {
  font-size: 1.2rem;
  margin-bottom: 30px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 2;
}

.promo-banner::before {
  content: "";
  position: absolute;
  top: -50px;
  right: -50px;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%);
  border-radius: 50%;
}

.promo-banner::after {
  content: "";
  position: absolute;
  bottom: -80px;
  left: -50px;
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%);
  border-radius: 50%;
}

.cta-button {
  display: inline-block;
  background: white;
  color: #ff7a00;
  padding: 15px 40px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 2;
}

.cta-button:hover {
  background: #f0f0f0;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .promo-banner {
    padding: 30px 20px;
  }
  
  .promo-banner h2 {
    font-size: 2rem;
  }
}
</style>