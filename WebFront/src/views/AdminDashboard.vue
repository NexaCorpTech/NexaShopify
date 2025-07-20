<template>
  <div class="admin-dashboard">
    <!-- Sidebar -->
    <aside :class="{ 'sidebar': true, 'collapsed': isSidebarCollapsed }">
      <div class="sidebar-header">
        <h2>NexaShop Admin</h2>
        <button @click="toggleSidebar" class="toggle-btn">
          <i :class="isSidebarCollapsed ? 'fas fa-chevron-right' : 'fas fa-chevron-left'"></i>
        </button>
      </div>
      <nav class="sidebar-nav">
        <ul>
          <li :class="{ active: activeSection === 'dashboard' }">
            <a href="#" @click.prevent="setActiveSection('dashboard')">
              <i class="fas fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </a>
          </li>
          <li :class="{ active: activeSection === 'stores' }">
            <a href="#" @click.prevent="setActiveSection('stores')">
              <i class="fas fa-store"></i>
              <span>Boutiques</span>
            </a>
          </li>
          <li :class="{ active: activeSection === 'merchants' }">
            <a href="#" @click.prevent="setActiveSection('merchants')">
              <i class="fas fa-users"></i>
              <span>Commerçants</span>
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="logout">
              <i class="fas fa-sign-out-alt"></i>
              <span>Déconnexion</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Navbar -->
      <header class="navbar">
        <div class="navbar-search">
          <input type="text" v-model="searchQuery" placeholder="Recherche par nom de boutique ou de commerçant..." />
          <i class="fas fa-search"></i>
        </div>
        <div class="navbar-right">
          <div class="notifications">
            <i class="fas fa-bell"></i>
            <span class="badge">0</span>
          </div>
          <div class="profile">
            <img src="https://via.placeholder.com/40" alt="Profile" />
            <span>Admin</span>
          </div>
        </div>
      </header>

      <!-- Content Area -->
      <main>
        <section v-if="activeSection === 'dashboard'" class="dashboard-section">
          <h1>Vue Globale de votre application</h1>
          <div class="dashboard-cards">
            <div class="card">
              <h3>Visiteurs</h3>
              <p>{{ dashboardData.visitors }}</p>
            </div>
            <div class="card">
              <h3>Boutiques actives</h3>
              <p>{{ dashboardData.activeStores }}</p>
            </div>
            <div class="card">
              <h3>Commerçants actifs</h3>
              <p>{{ dashboardData.activeMerchants }}</p>
            </div>
          </div>
        </section>

        <section v-if="activeSection === 'stores'" class="stores-section">
          <h1>Boutiques</h1>
          <table class="data-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Propriétaire</th>
                <th>Date de création</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="store in fetchStores" :key="store.storeId">
                <td>{{ store.name }}</td>
                <td>{{ store.ownerName }}</td>
                <td>{{ formatDate(store.createdAt) }}</td>
                <td>{{ store.isActive ? 'Active' : 'Suspended' }}</td>
                <td>
                  <button
                    :class="{ 'btn': true, 'btn-activate': !store.isActive, 'btn-suspend': store.isActive }"
                    @click="toggleStoreStatus(store.storeId, store.isActive)"
                  >
                    {{ store.isActive ? 'Suspend' : 'Activate' }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <section v-if="activeSection === 'merchants'" class="merchants-section">
          <h1>Commerçants</h1>
          <table class="data-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Inscrit le</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="merchant in filteredMerchants" :key="merchant.id">
                <td>{{ merchant.username }}</td>
                <td>{{ merchant.email }}</td>
                <td>{{ merchant.mobile }}</td>
                <td>{{ formatDate(merchant.createdAt) }}</td>
                <td>{{ merchant.isActive ? 'Active' : 'Blocked' }}</td>
                <td>
                  <button
                    :class="{ 'btn': true, 'btn-activate': !merchant.isActive, 'btn-suspend': merchant.isActive }"
                    @click="toggleMerchantStatus(merchant.id, merchant.isActive)"
                  >
                    {{ merchant.isActive ? 'Block' : 'Unblock' }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'AdminDashboard',
  data() {
    return {
      isSidebarCollapsed: false,
      activeSection: 'dashboard',
      searchQuery: '',
      dashboardData: {
        visitors: 0,
        activeStores: 0,
        activeMerchants: 0,
      },
      stores: [] as any[],
      merchants: [] as any[],
    };
  },
  computed: {
    filteredStores() {
      return this.stores.filter(store =>
        store.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        store.ownerName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    filteredMerchants() {
      return this.merchants.filter(merchant =>
        merchant.username.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        merchant.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        merchant.mobile.includes(this.searchQuery)
      );
    },
  },
  methods: {
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    },
    setActiveSection(section: string) {
      this.activeSection = section;
    },
    async fetchDashboardData() {
      try {
        const response = await axios.get('/api/admin/dashboard');
        this.dashboardData = response.data;
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    },
    async fetchStores() {
      try {
        const response = await axios.get('/api/stores');
        this.stores = response.data;
      } catch (error) {
        console.error('Error fetching stores:', error);
      }
    },
    async fetchMerchants() {
      try {
        const response = await axios.get('/api/merchants');
        this.merchants = response.data;
      } catch (error) {
        console.error('Error fetching merchants:', error);
      }
    },
    async toggleStoreStatus(storeId: number, isActive: boolean) {
      try {
        await axios.put(`/api/stores/${storeId}/status`, { isActive: !isActive });
        this.fetchStores();
      } catch (error) {
        console.error('Error updating store status:', error);
      }
    },
    async toggleMerchantStatus(merchantId: number, isActive: boolean) {
      try {
        await axios.put(`/api/merchants/${merchantId}/status`, { isActive: !isActive });
        this.fetchMerchants();
      } catch (error) {
        console.error('Error updating merchant status:', error);
      }
    },
    formatDate(date: string) {
      return new Date(date).toLocaleDateString();
    },
    logout() {
      // Implement logout logic
      console.log('Logout triggered');
    },
  },
  mounted() {
    this.fetchDashboardData();
    this.fetchStores();
    this.fetchMerchants();
  },
});
</script>

<style scoped>
.admin-dashboard {
  display: flex;
  min-height: 100vh;
  font-family: 'Arial', sans-serif;
  background-color: #f4f6f9;
}

.sidebar {
  width: 250px;
  background-color: #2c3e50;
  color: white;
  transition: width 0.3s;
  overflow: hidden;
}

.sidebar.collapsed {
  width: 60px;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.sidebar.collapsed .sidebar-header h2 {
  display: none;
}

.toggle-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
}

.sidebar-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-nav li {
  padding: 15px;
}

.sidebar-nav li.active {
  background-color: #34495e;
}

.sidebar-nav a {
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
}

.sidebar-nav span {
  display: inline;
}

.sidebar.collapsed .sidebar-nav span {
  display: none;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-search {
  position: relative;
  width: 300px;
}

.navbar-search input {
  width: 100%;
  padding: 8px 30px 8px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.navbar-search .fa-search {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.notifications {
  position: relative;
}

.notifications .badge {
  position: absolute;
  top: -5px;
  right: -10px;
  background-color: #e74c3c;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.8rem;
}

.profile {
  display: flex;
  align-items: center;
  gap: 10px;
}

.profile img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

main {
  padding: 20px;
}

.dashboard-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.card {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.card h3 {
  margin: 0 0 10px;
  font-size: 1.2rem;
  color: #2c3e50;
}

.card p {
  font-size: 1.5rem;
  font-weight: bold;
  color: #34495e;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.data-table th,
.data-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.data-table th {
  background-color: #2c3e50;
  color: white;
}

.data-table tr:hover {
  background-color: #f5f5f5;
}

.btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.btn-activate {
  background-color: #2ecc71;
  color: white;
}

.btn-suspend {
  background-color: #e74c3c;
  color: white;
}

.btn:hover {
  opacity: 0.9;
}
</style>