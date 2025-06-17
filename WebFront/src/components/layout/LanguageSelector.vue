<template>
  <div class="language-selector">
    <button class="current-language" @click.stop="toggleLanguageMenu">
      <span class="flag" :class="currentLanguage.flag"></span>
      <span class="code">{{ currentLanguage.code }}</span>
      <i class="fas fa-chevron-down"></i>
    </button>
    
    <transition name="slide-fade">
      <div v-if="showLanguageMenu" class="language-menu">
        <div 
          v-for="lang in languages" 
          :key="lang.code"
          class="language-option"
          :class="{ active: currentLanguage.code === lang.code }"
          @click="changeLanguage(lang)"
        >
          <span class="flag" :class="lang.flag"></span>
          <span>{{ lang.name }}</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'LanguageSelector',
  props: {
    languages: {
      type: Array,
      required: true
    },
    currentLanguage: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showLanguageMenu: false
    }
  },
  methods: {
    toggleLanguageMenu() {
      this.showLanguageMenu = !this.showLanguageMenu;
    },
    changeLanguage(lang) {
      this.$emit('language-changed', lang);
      this.showLanguageMenu = false;
    },
    handleClickOutside(e) {
      if (!this.$el.contains(e.target)) {
        this.showLanguageMenu = false;
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }
}
</script>

<style scoped>
.language-selector {
  position: relative;
  margin-right: 15px;
}

.current-language {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 15px;
  background: #f8f9fa;
  border: 2px solid #000;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  font-weight: 600;
  box-shadow: 3px 3px 0 rgba(0,0,0,0.2);
}

.current-language:hover {
  transform: translate(-2px, -2px);
  box-shadow: 5px 5px 0 rgba(0,0,0,0.2);
}

.current-language:active {
  transform: translate(1px, 1px);
  box-shadow: 2px 2px 0 rgba(0,0,0,0.2);
}

.flag {
  display: inline-block;
  width: 24px;
  height: 18px;
  border-radius: 2px;
  background-size: cover;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}

.fr-flag { background: linear-gradient(90deg, #002395 33%, #FFF 33%, #FFF 66%, #ED2939 66%); }
.en-flag { background: linear-gradient(180deg, #012169 0%, #012169 40%, #C8102E 40%, #C8102E 60%, #FFFFFF 60%, #FFFFFF 100%); }
.es-flag { background: linear-gradient(180deg, #AA151B 25%, #F1BF00 25%, #F1BF00 75%, #AA151B 75%); }
.de-flag { background: linear-gradient(180deg, #000000 33%, #DD0000 33%, #DD0000 66%, #FFCE00 66%); }
.pt-flag { background: linear-gradient(90deg, #046A38 40%, #FF0000 40%, #FF0000 60%, #FFD900 60%); }

.language-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 160px;
  background: white;
  border: 2px solid #000;
  border-radius: 12px;
  box-shadow: 5px 5px 0 rgba(0,0,0,0.2);
  margin-top: 10px;
  overflow: hidden;
  z-index: 100;
}

.language-option {
  padding: 12px 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
}

.language-option:hover {
  background: #f0f5ff;
  transform: translateX(5px);
}

.language-option.active {
  background: #e6f0ff;
  font-weight: 600;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

@media (max-width: 576px) {
  .current-language .name {
    display: none;
  }
  
  .current-language {
    padding: 8px;
  }
  
  .current-language .code {
    font-size: 0.9rem;
  }
}
</style>