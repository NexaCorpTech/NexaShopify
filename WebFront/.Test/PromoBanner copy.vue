<template>
  <section class="promo-banner">
    <div class="promo-content">
      <h2 class="promo-title">{{ title }}</h2>
      <p class="promo-description">{{ description }}</p>
      <router-link :to="ctaLink" class="promo-button">{{ ctaText }}</router-link>
    </div>
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
      required: true
    },
    ctaLink: {
      type: String,
      default: '/'
    }
  }
}
</script>

<style scoped>
.promo-banner {
  background: linear-gradient(45deg, #0468ff, #00c6ff);
  color: white;
  padding: 50px 20px;
  text-align: center;
  margin: 40px 0;
}

.promo-content {
  max-width: 800px;
  margin: 0 auto;
}

.promo-title {
  font-size: 2.2rem;
  margin-bottom: 15px;
  font-family: 'Montserrat', sans-serif;
}

.promo-description {
  font-size: 1.2rem;
  margin-bottom: 25px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.promo-button {
  display: inline-block;
  background: white;
  color: #0468ff;
  padding: 12px 35px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.promo-button:hover {
  background: #f0f0f0;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .promo-title {
    font-size: 1.8rem;
  }
  
  .promo-description {
    font-size: 1rem;
  }
}
</style>