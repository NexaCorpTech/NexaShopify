<template>
  <div class="plan-banner" v-if="show" :style="{ left: bannerLeft }">
    <div class="banner-content">
      <p class="banner-text">Sélectionnez un plan pour obtenir 3 mois à 1$/mois</p>
      <Button 
        label="Sélectionner un plan" 
        class="select-plan-btn" 
        @click="selectPlan"
        aria-label="Sélectionner un plan de tarification"
      />
    </div>
    <Button 
      icon="pi pi-times" 
      text 
      rounded 
      severity="white" 
      class="close-btn" 
      @click="close"
      aria-label="Fermer la bannière"
    />
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useBreakpoints } from '@vueuse/core';


export default {
  name: 'PlanBanner',
  emits: ['close'],
  props: {
    sidebarCollapsed: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const show = ref(true);
    const breakpoints = useBreakpoints({
      mobile: 768,
      tablet: 1024
    });
    const isMobile = breakpoints.smaller('mobile');
    const isTablet = breakpoints.between('mobile', 'tablet');

    const bannerLeft = computed(() => {
      if (isMobile.value) return '0';
      if (isTablet.value || props.sidebarCollapsed) return '72px';
      return '280px';
    });

    const selectPlan = () => {
      console.log('Navigate to plan selection');
    };

    const close = () => {
      show.value = false;
      emit('close');
    };

    return { show, selectPlan, close, bannerLeft, isMobile };
  }
}
</script>

<style scoped>
.plan-banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  padding: clamp(0.5rem, 1.5vw, 0.75rem) clamp(0.75rem, 2vw, 1rem);
  position: fixed;
  top: 60px;
  right: 0;
  z-index: 900;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.banner-content {
  display: flex;
  align-items: center;
  gap: clamp(0.75rem, 2vw, 1rem);
  flex: 1;
}

.banner-text {
  font-size: clamp(0.8rem, 1.5vw, 0.875rem);
  font-weight: 500;
}

.select-plan-btn {
  background-color: #f3f4f6;
  color: #000000;
  border: none;
  font-size: clamp(0.75rem, 1.2vw, 0.875rem);
  padding: clamp(0.375rem, 1vw, 0.5rem) clamp(0.75rem, 2vw, 1rem);
}

.select-plan-btn:hover {
  background-color: #e0e0e0;
}

.close-btn {
  color: #ffffff;
  width: clamp(1.8rem, 4vw, 2rem);
  height: clamp(1.8rem, 4vw, 2rem);
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* Mobile */
@media (max-width: 767px) {
  .plan-banner {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    top: 56px;
    left: 0;
    padding: clamp(0.375rem, 1vw, 0.5rem);
  }
  
  .banner-content {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
  
  .select-plan-btn {
    width: 100%;
  }
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) {
  .plan-banner {
    padding: clamp(0.375rem, 1vw, 0.5rem) clamp(0.625rem, 1.5vw, 0.75rem);
  }
  
  .banner-text {
    font-size: clamp(0.75rem, 1.2vw, 0.8rem);
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .plan-banner {
    transition: none;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .plan-banner {
    border-bottom: 2px solid #ffffff;
  }
  
  .select-plan-btn {
    border: 2px solid #000000;
  }
}
</style>