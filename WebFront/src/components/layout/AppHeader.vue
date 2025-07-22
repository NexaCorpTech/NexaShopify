<template>
  <header class="app-header">
    <div class="header-container">
      <!-- Left Section -->
      <div class="header-left">
        <!-- Mobile Menu Button -->
        <Button 
          v-if="isMobile"
          icon="pi pi-bars" 
          text 
          rounded 
          size="small"
          class="mobile-menu-btn" 
          @click="$emit('toggle-sidebar')"
          aria-label="Toggle menu"
        />
        
        <!-- Desktop Collapse Button -->
        <Button 
          v-if="!isMobile"
          :icon="sidebarCollapsed ? 'pi pi-angle-right' : 'pi pi-angle-left'"
          text 
          rounded 
          size="small"
          class="collapse-btn" 
          @click="$emit('toggle-sidebar-collapse')"
          aria-label="Toggle sidebar"
        />

        <!-- Logo -->
        <div class="logo-container">
          <div class="logo-icon">
            <span>N</span>
          </div>
          <div class="logo-content">
            <span class="logo-text">NexaShop</span>
            <span class="logo-version">Summer '25</span>
          </div>
        </div>
      </div>

      <!-- Center Section - Search -->
      <div class="header-center">
        <div class="search-container" :class="{ 'focused': searchFocused }">
          <Button
            icon="pi pi-search"
            text
            size="small"
            class="search-btn"
            @click="focusSearch"
            aria-label="Search"
          />
          <InputText
            ref="searchInput"
            v-model="searchQuery"
            placeholder="Search products, orders, customers..."
            class="search-input"
            @focus="searchFocused = true"
            @blur="searchFocused = false"
            @keydown="handleSearchKeydown"
          />
          <div v-if="searchQuery" class="search-actions">
            <Button
              icon="pi pi-times"
              text
              size="small"
              class="clear-btn"
              @click="clearSearch"
              aria-label="Clear search"
            />
          </div>
          <div class="search-shortcut">
            <kbd>⌘K</kbd>
          </div>
        </div>
      </div>

      <!-- Right Section -->
      <div class="header-right">
        <!-- Quick Actions -->
        <div class="quick-actions">
          <Button 
            icon="pi pi-plus" 
            text 
            rounded 
            size="small"
            class="action-btn" 
            v-tooltip.bottom="'Add Product'"
            aria-label="Add product"
          />
          <Button 
            icon="pi pi-bell" 
            text 
            rounded 
            size="small"
            class="action-btn notification-btn" 
            v-tooltip.bottom="'Notifications'"
            aria-label="Notifications"
          >
            <Badge value="3" severity="danger" class="notification-badge" />
          </Button>
          <Button 
            icon="pi pi-question-circle" 
            text 
            rounded 
            size="small"
            class="action-btn" 
            v-tooltip.bottom="'Help'"
            aria-label="Help"
          />
        </div>

        <!-- User Profile -->
        <div class="user-profile">
          <div class="user-info">
            <span class="user-name">My Store</span>
            <span class="user-role">Admin</span>
          </div>
          <Avatar 
            label="MS" 
            shape="circle" 
            class="user-avatar"
          />
          <Button
            icon="pi pi-chevron-down"
            text
            size="small"
            class="profile-dropdown-btn"
            aria-label="User menu"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { ref, computed, nextTick } from 'vue';
import { useBreakpoints, useMagicKeys, whenever } from '@vueuse/core';
import { useDashboardStore } from '../../stores/dashboard';

export default {
  name: 'AppHeader',
  props: {
    sidebarCollapsed: {
      type: Boolean,
      default: false
    }
  },
  emits: ['toggle-sidebar', 'toggle-sidebar-collapse'],
  setup() {
    const dashboardStore = useDashboardStore();
    
    // Breakpoints
    const breakpoints = useBreakpoints({
      mobile: 768,
      tablet: 1024
    });
    
    const isMobile = breakpoints.smaller('mobile');
    const isTablet = breakpoints.between('mobile', 'tablet');

    // Search functionality
    const searchInput = ref(null);
    const searchQuery = ref('');
    const searchFocused = ref(false);

    // Magic keys for search
    const { cmd_k, ctrl_k } = useMagicKeys();
    whenever(() => cmd_k.value || ctrl_k.value, () => {
      focusSearch();
    });

    const focusSearch = async () => {
      await nextTick();
      searchInput.value?.focus();
    };

    const clearSearch = () => {
      searchQuery.value = '';
      focusSearch();
    };

    const handleSearchKeydown = (event) => {
      if (event.key === 'Escape') {
        event.target.blur();
        searchQuery.value = '';
      }
    };

    return {
      isMobile,
      isTablet,
      searchInput,
      searchQuery,
      searchFocused,
      focusSearch,
      clearSearch,
      handleSearchKeydown
    };
  }
}
</script>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.header-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  max-width: 100%;
}

/* Left Section */
.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}

.mobile-menu-btn,
.collapse-btn {
  color: white;
  width: 40px;
  height: 40px;
  transition: all 0.2s ease;
}

.mobile-menu-btn:hover,
.collapse-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: scale(1.05);
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.logo-icon span {
  font-size: 18px;
  font-weight: 700;
  color: white;
}

.logo-content {
  display: flex;
  flex-direction: column;
}

.logo-text {
  font-size: 18px;
  font-weight: 700;
  color: white;
  line-height: 1;
}

.logo-version {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1;
  margin-top: 2px;
}

/* Center Section - Search */
.header-center {
  flex: 1;
  max-width: 600px;
  margin: 0 32px;
}

.search-container {
  position: relative;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 8px 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
}

.search-container:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
}

.search-container.focused {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
}

.search-btn {
  color: rgba(255, 255, 255, 0.8);
  width: 32px;
  height: 32px;
  margin-right: 8px;
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  color: white;
  font-size: 14px;
  outline: none;
  padding: 0;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.search-actions {
  display: flex;
  align-items: center;
  margin-left: 8px;
}

.clear-btn {
  color: rgba(255, 255, 255, 0.6);
  width: 24px;
  height: 24px;
}

.search-shortcut {
  margin-left: 12px;
  padding-left: 12px;
  border-left: 1px solid rgba(255, 255, 255, 0.2);
}

.search-shortcut kbd {
  background: rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.8);
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-family: system-ui;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Right Section */
.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
}

.quick-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.action-btn {
  color: rgba(255, 255, 255, 0.9);
  width: 40px;
  height: 40px;
  position: relative;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  transform: scale(1.05);
}

.notification-btn {
  position: relative;
}

.notification-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  min-width: 18px;
  height: 18px;
  font-size: 10px;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.2s ease;
  cursor: pointer;
}

.user-profile:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: scale(1.02);
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.user-name {
  font-size: 14px;
  font-weight: 600;
  color: white;
  line-height: 1;
}

.user-role {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1;
  margin-top: 2px;
}

.user-avatar {
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-weight: 600;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.profile-dropdown-btn {
  color: rgba(255, 255, 255, 0.8);
  width: 24px;
  height: 24px;
}

/* Mobile Responsive */
@media (max-width: 767px) {
  .app-header {
    height: 56px;
  }

  .header-container {
    padding: 0 16px;
    gap: 12px;
  }

  .header-left {
    gap: 12px;
  }

  .logo-icon {
    width: 32px;
    height: 32px;
  }

  .logo-icon span {
    font-size: 14px;
  }

  .logo-text {
    font-size: 16px;
  }

  .logo-version {
    display: none;
  }

  .header-center {
    margin: 0 16px;
    max-width: none;
  }

  .search-container {
    padding: 6px 12px;
  }

  .search-input {
    font-size: 16px; /* Prevent zoom on iOS */
  }

  .search-input::placeholder {
    font-size: 14px;
  }

  .search-shortcut {
    display: none;
  }

  .quick-actions {
    gap: 4px;
  }

  .action-btn {
    width: 36px;
    height: 36px;
  }

  .user-info {
    display: none;
  }

  .user-avatar {
    width: 32px;
    height: 32px;
  }

  .profile-dropdown-btn {
    display: none;
  }
}

/* Tablet Responsive */
@media (min-width: 768px) and (max-width: 1023px) {
  .header-container {
    padding: 0 20px;
  }

  .header-center {
    margin: 0 24px;
  }

  .user-name {
    font-size: 13px;
  }

  .user-role {
    font-size: 11px;
  }
}

/* Large screens */
@media (min-width: 1440px) {
  .header-container {
    padding: 0 32px;
  }

  .header-center {
    margin: 0 48px;
    max-width: 800px;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .app-header {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .search-container,
  .user-profile {
    border-width: 2px;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .search-container,
  .action-btn,
  .user-profile,
  .mobile-menu-btn,
  .collapse-btn {
    transition: none;
  }
}
</style>