<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NexaShop - Connexion contextuelle</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <script src="https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.js"></script>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #f8fafc;
      color: #334155;
      line-height: 1.6;
      min-height: 100vh;
      padding: 20px;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    header {
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      margin-bottom: 30px;
      padding: 15px 25px;
    }

    .header-grid {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      gap: 20px;
    }

    .logo {
      font-size: 24px;
      font-weight: 700;
      color: #3b82f6;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .logo i {
      color: #f97316;
    }

    .header-actions {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
      flex-wrap: wrap;
    }

    .action-btn {
      padding: 10px 18px;
      border-radius: 50px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s;
      border: 2px solid transparent;
      display: flex;
      align-items: center;
      gap: 8px;
      white-space: nowrap;
      font-size: 0.95rem;
    }

    .login-btn {
      background: #4b5563;
      color: white;
    }

    .login-btn:hover {
      background: #374151;
      transform: translateY(-2px);
    }

    .buyer-btn {
      background: #10b981;
      color: white;
    }

    .buyer-btn:hover {
      background: #059669;
      transform: translateY(-2px);
    }

    .seller-btn {
      background: #3b82f6;
      color: white;
    }

    .seller-btn:hover {
      background: #2563eb;
      transform: translateY(-2px);
    }

    .user-menu {
      position: relative;
    }

    .user-profile-btn {
      padding: 8px 15px;
      background: #f1f5f9;
      border-radius: 50px;
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      transition: all 0.3s;
      border: none;
      font-weight: 500;
    }

    .user-profile-btn:hover {
      background: #e2e8f0;
    }

    .dropdown-menu {
      position: absolute;
      top: 100%;
      right: 0;
      background: white;
      border-radius: 8px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      width: 220px;
      z-index: 100;
      overflow: hidden;
      margin-top: 5px;
    }

    .dropdown-menu button {
      width: 100%;
      text-align: left;
      padding: 12px 15px;
      display: flex;
      align-items: center;
      gap: 10px;
      background: none;
      border: none;
      cursor: pointer;
      transition: background 0.2s;
      font-size: 0.95rem;
    }

    .dropdown-menu button:hover {
      background: #f8fafc;
    }

    .user-badge {
      background: #f1f5f9;
      border-radius: 12px;
      padding: 3px 10px;
      font-size: 0.75rem;
      margin-left: 8px;
      color: #475569;
      font-weight: 600;
    }

    .user-badge.seller { background: #dbeafe; color: #1d4ed8; }
    .user-badge.buyer { background: #dcfce7; color: #166534; }

    .user-profile-btn i {
      margin-right: 8px;
      font-size: 1.1em;
    }

    .demo-container {
      background: white;
      border-radius: 16px;
      padding: 30px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
      margin-top: 30px;
    }

    .demo-title {
      text-align: center;
      color: #3b82f6;
      margin-bottom: 30px;
      font-size: 1.8rem;
    }

    .demo-content {
      display: flex;
      gap: 30px;
      flex-wrap: wrap;
      margin-bottom: 30px;
    }

    .demo-card {
      flex: 1;
      min-width: 300px;
      padding: 25px;
      border-radius: 12px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
    }

    .demo-card h3 {
      color: #3b82f6;
      margin-bottom: 15px;
      font-size: 1.3rem;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .user-type {
      padding: 8px 15px;
      border-radius: 20px;
      display: inline-block;
      margin: 10px 0;
      font-weight: 600;
    }

    .user-type.buyer {
      background: #dcfce7;
      color: #166534;
    }

    .user-type.seller {
      background: #dbeafe;
      color: #1d4ed8;
    }

    .demo-card ul {
      padding-left: 20px;
      margin: 15px 0;
    }

    .demo-card li {
      margin-bottom: 10px;
      line-height: 1.5;
    }

    .toggle-container {
      display: flex;
      justify-content: center;
      gap: 15px;
      margin: 30px 0 20px;
      flex-wrap: wrap;
    }

    .toggle-btn {
      padding: 12px 24px;
      background: #e2e8f0;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .toggle-btn.active {
      background: #3b82f6;
      color: white;
    }

    .toggle-btn:hover:not(.active) {
      background: #cbd5e1;
    }

    .status-info {
      text-align: center;
      margin: 20px 0;
      padding: 15px;
      border-radius: 8px;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }

    .status-info.logged-in {
      background: #dcfce7;
      color: #166534;
      border-left: 4px solid #10b981;
    }

    .status-info.logged-out {
      background: #ffedd5;
      color: #9a3412;
      border-left: 4px solid #f97316;
    }

    .flow-section {
      background: #f1f5f9;
      border-radius: 12px;
      padding: 25px;
      margin-top: 30px;
    }

    .flow-title {
      color: #3b82f6;
      margin-bottom: 20px;
      text-align: center;
    }

    .flow-steps {
      display: flex;
      justify-content: space-between;
      position: relative;
      margin: 40px 0;
    }

    .flow-steps::before {
      content: "";
      position: absolute;
      top: 20px;
      left: 10%;
      width: 80%;
      height: 2px;
      background: #cbd5e1;
      z-index: 1;
    }

    .flow-step {
      position: relative;
      z-index: 2;
      text-align: center;
      width: 20%;
    }

    .step-number {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #3b82f6;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 15px;
      font-weight: bold;
    }

    .step-label {
      font-weight: 500;
      font-size: 0.9rem;
    }

    .step-desc {
      font-size: 0.85rem;
      color: #64748b;
      margin-top: 8px;
    }

    .best-practice {
      background: #fffbeb;
      border-left: 4px solid #f59e0b;
      padding: 20px;
      border-radius: 8px;
      margin-top: 30px;
    }

    .best-practice h4 {
      color: #b45309;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    @media (max-width: 768px) {
      .header-grid {
        grid-template-columns: 1fr;
        gap: 15px;
        text-align: center;
      }
      
      .header-actions {
        justify-content: center;
      }
      
      .flow-steps {
        flex-direction: column;
        align-items: center;
        gap: 30px;
      }
      
      .flow-steps::before {
        display: none;
      }
      
      .flow-step {
        width: 100%;
      }
    }
  </style>
</head>
<body>
  <div id="app">
    <div class="container">
      <header>
        <div class="header-grid">
          <div class="logo-container">
            <div class="logo">
              <i class="fas fa-store"></i>
              <span>NexaShop</span>
            </div>
          </div>
          
          <div class="header-actions">
            <!-- Utilisateur connecté -->
            <div v-if="isLoggedIn" class="user-menu">
              <button class="user-profile-btn" @click="toggleUserMenu">
                <i :class="userRoleIcon"></i>
                <span>{{ user.name }}</span>
                <span class="user-badge" :class="user.role">{{ userBadgeText }}</span>
              </button>
              
              <div v-if="showUserMenu" class="dropdown-menu">
                <button @click="goToDashboard">
                  <i class="fas fa-tachometer-alt"></i> Tableau de bord
                </button>
                <button @click="goToProfile">
                  <i class="fas fa-user"></i> Mon profil
                </button>
                <button @click="logout">
                  <i class="fas fa-sign-out-alt"></i> Déconnexion
                </button>
              </div>
            </div>
            
            <!-- Utilisateur non connecté -->
            <div v-else class="login-section">
              <button class="action-btn login-btn" @click="goToLogin">
                <i class="fas fa-sign-in-alt"></i> Se connecter
              </button>
            </div>

            <button class="action-btn buyer-btn" @click="goToBuyerSection">
              <i class="fas fa-shopping-bag"></i> Acheter
            </button>
            <button class="action-btn seller-btn" @click="goToSellerSection">
              <i class="fas fa-store"></i> Vendre
            </button>
          </div>
        </div>
      </header>

      <div class="demo-container">
        <h2 class="demo-title">Parcours utilisateur optimisé</h2>
        
        <div class="status-info" :class="isLoggedIn ? 'logged-in' : 'logged-out'">
          <i class="fas" :class="isLoggedIn ? 'fa-check-circle' : 'fa-exclamation-circle'"></i>
          {{ isLoggedIn ? `Connecté en tant que ${user.role} - ${user.name}` : 'Non connecté' }}
        </div>
        
        <div class="toggle-container">
          <button class="toggle-btn" :class="!isLoggedIn ? 'active' : ''" @click="logout">
            <i class="fas fa-user-slash"></i> Visiteur
          </button>
          <button class="toggle-btn" :class="isLoggedIn && user.role === 'buyer' ? 'active' : ''" @click="loginAsBuyer">
            <i class="fas fa-shopping-bag"></i> Acheteur
          </button>
          <button class="toggle-btn" :class="isLoggedIn && user.role === 'seller' ? 'active' : ''" @click="loginAsSeller">
            <i class="fas fa-store"></i> Vendeur
          </button>
        </div>
        
        <div class="demo-content">
          <div class="demo-card">
            <h3><i class="fas fa-shopping-bag"></i> Parcours acheteur</h3>
            <div class="user-type buyer">Connexion contextuelle</div>
            <ul>
              <li>Navigation libre sans compte</li>
              <li>Ajout au panier sans connexion</li>
              <li>Connexion requise uniquement au checkout</li>
              <li>Création de compte accélérée lors de la commande</li>
            </ul>
            
            <div class="best-practice">
              <h4><i class="fas fa-lightbulb"></i> Bonne pratique</h4>
              <p>Ne pas forcer la création de compte avant le processus d'achat. Les études montrent que cela réduit les abandons de panier de 45%.</p>
            </div>
          </div>
          
          <div class="demo-card">
            <h3><i class="fas fa-store"></i> Parcours vendeur</h3>
            <div class="user-type seller">Connexion nécessaire</div>
            <ul>
              <li>Accès au tableau de bord vendeur</li>
              <li>Gestion des produits et commandes</li>
              <li>Suivi des statistiques de vente</li>
              <li>Configuration de la boutique</li>
            </ul>
            
            <div class="best-practice">
              <h4><i class="fas fa-lightbulb"></i> Bonne pratique</h4>
              <p>Proposer un onboarding guidé pour les nouveaux vendeurs avec des étapes simples pour démarrer rapidement.</p>
            </div>
          </div>
        </div>
        
        <div class="flow-section">
          <h3 class="flow-title">Flux d'achat optimisé</h3>
          <div class="flow-steps">
            <div class="flow-step">
              <div class="step-number">1</div>
              <div class="step-label">Navigation</div>
              <div class="step-desc">Aucun compte requis</div>
            </div>
            <div class="flow-step">
              <div class="step-number">2</div>
              <div class="step-label">Panier</div>
              <div class="step-desc">Ajout sans connexion</div>
            </div>
            <div class="flow-step">
              <div class="step-number">3</div>
              <div class="step-label">Checkout</div>
              <div class="step-desc">Connexion/Inscription</div>
            </div>
            <div class="flow-step">
              <div class="step-number">4</div>
              <div class="step-label">Paiement</div>
              <div class="step-desc">Finalisation</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    const { createApp, ref, computed } = Vue
    
    createApp({
      setup() {
        const isLoggedIn = ref(false)
        const showUserMenu = ref(false)
        const user = ref({
          name: "Thomas Martin",
          role: "buyer"
        })
        
        const userRoleIcon = computed(() => {
          return user.value.role === 'seller' 
            ? 'fas fa-store' 
            : 'fas fa-user'
        })
        
        const userBadgeText = computed(() => {
          return user.value.role === 'seller' ? 'Vendeur' : 'Acheteur'
        })
        
        const toggleUserMenu = () => {
          showUserMenu.value = !showUserMenu.value
        }
        
        const goToLogin = () => {
          alert("Redirection vers la page de connexion")
        }
        
        const goToDashboard = () => {
          alert(`Redirection vers le tableau de bord ${user.value.role}`)
        }
        
        const goToProfile = () => {
          alert("Redirection vers le profil utilisateur")
        }
        
        const logout = () => {
          isLoggedIn.value = false
          showUserMenu.value = false
        }
        
        const loginAsBuyer = () => {
          isLoggedIn.value = true
          user.value = {
            name: "Marie Dupont",
            role: "buyer"
          }
        }
        
        const loginAsSeller = () => {
          isLoggedIn.value = true
          user.value = {
            name: "Pierre Dubois",
            role: "seller"
          }
        }
        
        const goToBuyerSection = () => {
          alert("Redirection vers la section produits")
        }
        
        const goToSellerSection = () => {
          if (isLoggedIn.value && user.value.role === 'seller') {
            alert("Redirection vers le tableau de bord vendeur")
          } else {
            alert("Redirection vers la page d'inscription vendeur")
          }
        }
        
        return {
          isLoggedIn,
          showUserMenu,
          user,
          userRoleIcon,
          userBadgeText,
          toggleUserMenu,
          goToLogin,
          goToDashboard,
          goToProfile,
          logout,
          loginAsBuyer,
          loginAsSeller,
          goToBuyerSection,
          goToSellerSection
        }
      }
    }).mount('#app')
  </script>
</body>
</html>