<template>
  <div>
    <TheHeader />
    <HeroSection />
    
    <!-- Pas de container pour laisser la section produits prendre toute la largeur -->
    <ProductsSection />
    <CtaSection />
    
    <BrandShowcase />
    <TheFooter />
  </div>
</template>

<script>
import BrandShowcase from '@/components/home/BrandShowcase.vue'
import TheHeader from '@/components/layout/TheHeader.vue';
import HeroSection from '@/components/home/HeroSection.vue';
import ProductsSection from '@/components/home/ProductsSection.vue';
import CtaSection from '@/components/home/CtaSection.vue';
import TheFooter from '@/components/layout/TheFooter.vue';
import ContextualLoginFlow from '@/components/ContextualLoginFlow.vue'

export default {
  name: 'App',
  components: {
    BrandShowcase,
    TheHeader,
    HeroSection,
    ProductsSection,
    CtaSection,
    TheFooter,
    ContextualLoginFlow
  },
  mounted() {
    this.handleAnchorNavigation();
  },
  methods: {
    handleAnchorNavigation() {
      if (window.location.hash === '#products-section') {
        const productsSection = document.getElementById('products-section');
        if (productsSection) {
          productsSection.classList.add('active-section');
          
          setTimeout(() => {
            productsSection.classList.remove('active-section');
          }, 3000);
        }
      }
      
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          if (this.getAttribute('href') === '#products-section') {
            e.preventDefault();
            const productsSection = document.getElementById('products-section');
            if (productsSection) {
              productsSection.classList.add('active-section');
              
              window.scrollTo({
                top: productsSection.offsetTop - 80,
                behavior: 'smooth'
              });
              
              setTimeout(() => {
                productsSection.classList.remove('active-section');
              }, 3000);
            }
          }
        });
      });
    }
  }
}
</script>