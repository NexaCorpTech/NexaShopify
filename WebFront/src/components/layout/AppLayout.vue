<template>
  <div class="nexashop-layout">
    <!-- Mobile Sidebar Overlay -->
    <Sidebar
      v-model:visible="sidebarVisible"
      position="left"
      class="mobile-sidebar"
      :modal="true"
      :dismissable="true"
      :showCloseIcon="false"
    >
      <AppSidebar :mobile="true" @close="sidebarVisible = false" />
    </Sidebar>

    <!-- Desktop Sidebar -->
    <div 
      class="desktop-sidebar"
      :class="{ 'collapsed': sidebarCollapsed }"
    >
      <AppSidebar 
        :mobile="false" 
        :collapsed="sidebarCollapsed"
        @toggle-collapse="toggleSidebarCollapse"
      />
    </div>

    <!-- Main Content Wrapper -->
    <div 
      class="main-wrapper"
      :class="{ 
        'sidebar-collapsed': sidebarCollapsed,
        'chat-open': chatVisible 
      }"
    >
      <!-- Header -->
      <AppHeader 
        @toggle-sidebar="toggleMobileSidebar"
        @toggle-sidebar-collapse="toggleSidebarCollapse"
        :sidebar-collapsed="sidebarCollapsed"
      />

      <!-- Plan Banner -->
      <PlanBanner 
        v-if="showPlanBanner" 
        @close="handlePlanBannerClose" 
        :sidebar-collapsed="sidebarCollapsed"
      />

      <!-- Main Content -->
      <main class="main-content" :style="{ marginTop: mainContentMarginTop }">
        <div class="content-area">
          <div class="content-scroll">
            <Toast />
            <ConfirmDialog />
            <router-view />

          </div>
        </div>
        
        <!-- Chat Assistant -->
        <Transition name="chat-slide">
          <div v-if="chatVisible" class="chat-container" :style="{ marginTop: mainContentMarginTop }">
            <ChatAssistant @close="chatVisible = false" />
          </div>
        </Transition>
        
        <Button 
          v-if="!chatVisible"
          icon="pi pi-comments" 
          rounded
          class="floating-chat-btn lg:hidden"
          @click="chatVisible = true"
        />
      </main>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useBreakpoints } from '@vueuse/core';
import AppSidebar from './AppSidebar.vue';
import AppHeader from './AppHeader.vue';
import PlanBanner from '../dashboard/PlanBanner.vue';
import ChatAssistant from '../dashboard/ChatAssistant.vue';

export default {
  name: 'AppLayout',
  components: {
    AppSidebar,
    AppHeader,
    PlanBanner,
    ChatAssistant
  },
  setup() {
    const breakpoints = useBreakpoints({
      mobile: 768,
      tablet: 1024,
      desktop: 1440
    });

    const isMobile = breakpoints.smaller('mobile');
    const isTablet = breakpoints.between('mobile', 'tablet');
    const isDesktop = breakpoints.greaterOrEqual('tablet');

    // State
    const sidebarVisible = ref(false);
    const sidebarCollapsed = ref(false);
    const showPlanBanner = ref(true);
    const chatVisible = ref(true);

    // Auto-collapse sidebar on tablet
    const autoCollapseSidebar = () => {
      if (isTablet.value) {
        sidebarCollapsed.value = true;
      } else if (isDesktop.value) {
        sidebarCollapsed.value = false;
      }
    };

    // Methods
    const toggleMobileSidebar = () => {
      sidebarVisible.value = !sidebarVisible.value;
    };

    const toggleSidebarCollapse = () => {
      if (!isMobile.value) {
        sidebarCollapsed.value = !sidebarCollapsed.value;
      }
    };

    const handlePlanBannerClose = () => {
      showPlanBanner.value = false;
    };

    const handleResize = () => {
      if (isMobile.value) {
        sidebarVisible.value = false;
        sidebarCollapsed.value = false;
      } else {
        autoCollapseSidebar();
      }
    };

    // Lifecycle
    onMounted(() => {
      autoCollapseSidebar();
      window.addEventListener('resize', handleResize);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize);
    });

    // Compute main-content top margin based on PlanBanner visibility
    const mainContentMarginTop = computed(() => {
      const headerHeight = isMobile.value ? '56px' : '60px';
      if (!showPlanBanner.value) {
        return headerHeight;
      }
      const bannerHeight = isMobile.value ? '96px' : '48px';
      return `calc(${headerHeight} + ${bannerHeight})`;
    });

    return {
      mainContentMarginTop,
      sidebarVisible,
      sidebarCollapsed,
      showPlanBanner,
      chatVisible,
      isMobile,
      isTablet,
      isDesktop,
      toggleMobileSidebar,
      toggleSidebarCollapse,
      handlePlanBannerClose
    };
  }
}
</script>

<style scoped>
.nexashop-layout {
  min-height: 100vh;
  background-color: #f8fafc;
  display: flex;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  overflow: hidden; /* Empêche le scroll sur le layout principal */
}

/* Desktop Sidebar */
.desktop-sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 280px;
  z-index: 100;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateX(0);
  background: white;
  border-right: 1px solid #e2e8f0;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);
}

.desktop-sidebar.collapsed {
  width: 72px;
}

/* Main Wrapper */
.main-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 280px;
  min-width: 0;
  height: 100vh;
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.main-wrapper.sidebar-collapsed {
  margin-left: 72px;
}

/* Main Content */
.main-content {
  flex: 1;
  display: flex;
  position: relative;
  height: calc(100vh - var(--header-height, 60px));
  transition: margin-top 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden; /* Empêche le scroll sur main-content */
}

.content-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  transition: margin-right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Zone de scroll pour le contenu principal */
.content-scroll {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: clamp(16px, 2vw, 24px);
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

/* Personnalisation de la scrollbar pour le contenu */
.content-scroll::-webkit-scrollbar {
  width: 6px;
}

.content-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.content-scroll::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

.content-scroll::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

.main-wrapper.chat-open .content-area {
  margin-right: clamp(320px, 30vw, 400px);
}

/* Chat Container */
.chat-container {
  position: fixed;
  top: 10px;
  right: 0;
  bottom: 0;
  width: clamp(320px, 30vw, 400px);
  z-index: 1000;
  background: rgba(0, 0, 0, 0.02);
  backdrop-filter: blur(0px);
}

/* Mobile Styles */
@media (max-width: 767px) {
  .desktop-sidebar {
    display: none;
  }
  
  .main-wrapper {
    margin-left: 0;
    height: 100vh;
  }
  
  .main-wrapper.sidebar-collapsed {
    margin-left: 0;
  }
  
  .main-content {
    height: calc(100vh - 56px);
  }
  
  .chat-container {
    width: 100%;
  }
  
  .main-wrapper.chat-open .content-area {
    margin-right: 0;
  }
}

/* Tablet Styles */
@media (min-width: 768px) and (max-width: 1023px) {
  .desktop-sidebar {
    width: 72px;
  }
  
  .desktop-sidebar.collapsed {
    width: 72px;
  }
  
  .main-wrapper {
    margin-left: 72px;
  }
  
  .main-wrapper.sidebar-collapsed {
    margin-left: 72px;
  }
  
  .chat-container {
    width: 300px;
  }

  .main-wrapper.chat-open .content-area {
    margin-right: 300px;
  }
}

/* Large Desktop */
@media (min-width: 1440px) {
  .chat-container {
    width: 350px;
  }

  .main-wrapper.chat-open .content-area {
    margin-right: 350px;
  }
}

/* Mobile Sidebar Styles */
:deep(.mobile-sidebar) {
  display: block !important;
}

:deep(.mobile-sidebar .p-sidebar) {
  width: 280px;
  max-width: 85vw;
}

@media (min-width: 768px) {
  :deep(.mobile-sidebar) {
    display: none !important;
  }
}

/* Chat Transitions */
.chat-slide-enter-active,
.chat-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.chat-slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.chat-slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* Focus states for accessibility */
.nexashop-layout *:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

.nexashop-layout *:focus:not(:focus-visible) {
  outline: none;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .desktop-sidebar {
    border-right-width: 2px;
  }
  
  .chat-container {
    border-left-width: 2px;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .desktop-sidebar,
  .main-wrapper,
  .content-area,
  .chat-slide-enter-active,
  .chat-slide-leave-active {
    transition: none;
  }

  .main-content,
  .content-scroll {
    transition: none;
  }
}

.floating-chat-btn {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 50;
  background-color: #8b5cf6;
  border: none;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.floating-chat-btn:hover {
  background-color: #7c3aed;
  transform: translateY(-2px);
}

/* Desktop Layout */
@media (min-width: 1280px) {
  .floating-chat-btn {
    bottom: 1rem;
    right: 1rem;
  }
}

/* Mobile adjustments */
@media (max-width: 767px) {
  .floating-chat-btn {
    bottom: 1rem;
    right: 1rem;
  }
}
</style>