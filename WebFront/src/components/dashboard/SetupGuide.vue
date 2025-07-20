<template>
  <Card class="setup-guide-card">
    <template #header>
      <div class="guide-header">
        <div class="header-info">
          <h2 class="guide-title">Guide de configuration</h2>
          <p class="guide-subtitle">
            Utilisez ce guide personnalisé pour mettre votre boutique en route
          </p>
        </div>
        <div class="progress-info">
          <p class="progress-text">{{ completedTasksCount }} sur {{ totalTasksCount }} tâches terminées</p>
          <ProgressBar 
            :value="setupProgress" 
            class="progress-bar"
            :show-value="false"
          />
        </div>
      </div>
    </template>

    <template #content>
      <div class="guide-sections">
        <div class="guide-section">
          <div class="section-content">
            <div class="section-main">
              <h3 class="section-title">Ajouter des produits</h3>
              <div class="task-list">
                <div class="task-item">
                  <div class="task-icon">
                    <i class="pi pi-circle" :class="{ 'pi-check-circle text-green-500': setupTasks.importProducts }" aria-hidden="true"></i>
                  </div>
                  <span class="task-text">Importer vos produits</span>
                </div>
                <p class="task-description">
                  Préparez-vous à vendre en important un fichier CSV de vos produits existants. <a href="#" class="learn-more-link" aria-label="En savoir plus sur l'importation des produits">En savoir plus</a>
                </p>
                <div class="action-buttons">
                  <Button 
                    label="Importer des produits" 
                    icon="pi pi-upload" 
                    class="primary-btn" 
                    @click="toggleTask('importProducts')"
                    aria-label="Importer des produits via CSV"
                  />
                  <Button 
                    label="Ajouter un produit" 
                    icon="pi pi-plus" 
                    outlined 
                    class="secondary-btn" 
                    @click="addProduct"
                    aria-label="Ajouter un produit manuellement"
                  />
                </div>
                <div class="product-preview">
                  <img src="https://via.placeholder.com/100x100" alt="Aperçu du produit T-shirt Rouge" class="product-image" style="background-color: #e0f4ff;">
                  <div class="product-info">
                    <p>T-shirt Rouge</p>
                    <p>Stock: 50</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="section-illustration">
              <div class="illustration-box" style="background-color: #e0f4ff;">
                <i class="pi pi-box illustration-icon" aria-hidden="true"></i>
                <div class="illustration-indicator"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="guide-section simple-section">
          <div class="task-item">
            <div class="task-icon">
              <i class="pi pi-circle" :class="{ 'pi-check-circle text-green-500': setupTasks.manageServices }" aria-hidden="true"></i>
            </div>
            <span class="task-text">Gérer vos services</span>
          </div>
        </div>

        <div class="guide-section">
          <h3 class="section-title">Vendre en ligne</h3>
          <div class="task-list">
            <div class="task-item">
              <div class="task-icon">
                <i class="pi pi-circle" :class="{ 'pi-check-circle text-green-500': setupTasks.customizeStore }" aria-hidden="true"></i>
              </div>
              <span class="task-text">Personnaliser votre boutique en ligne</span>
            </div>
          </div>
        </div>

        <div class="guide-section">
          <h3 class="section-title">Paramètres de la boutique</h3>
          <div class="task-list">
            <div class="task-item">
              <div class="task-icon">
                <i class="pi pi-circle" :class="{ 'pi-check-circle text-green-500': setupTasks.importCustomers }" aria-hidden="true"></i>
              </div>
              <span class="task-text">Importer vos clients</span>
            </div>
            <div class="task-item">
              <div class="task-icon">
                <i class="pi pi-circle" :class="{ 'pi-check-circle text-green-500': setupTasks.importOrders }" aria-hidden="true"></i>
              </div>
              <span class="task-text">Importer vos commandes</span>
            </div>
            <div v-for="(task, key) in additionalTasks" :key="key" class="task-item">
              <div class="task-icon">
                <i class="pi pi-circle" :class="{ 'pi-check-circle text-green-500': setupTasks[key] }" :aria-hidden="true"></i>
              </div>
              <span class="task-text">{{ taskLabels[key] }}</span>
            </div>
          </div>
        </div>

        <div class="guide-section launch-section">
          <h3 class="section-title">Lancer votre boutique en ligne</h3>
          <div class="trial-info">
            <p class="trial-text">{{ storeSettings.trialDaysLeft }} jours restants dans votre période d'essai</p>
            <ProgressBar 
              :value="trialProgress" 
              class="trial-progress"
              :show-value="false"
            />
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<script>
import { useDashboardStore } from '../../stores/dashboard';

export default {
  name: 'SetupGuide',
  setup() {
    const dashboardStore = useDashboardStore();
    const { setupTasks, completedTasksCount, totalTasksCount, setupProgress, toggleTask, storeSettings } = dashboardStore;

    const taskLabels = {
      addPaymentMethods: 'Ajouter des méthodes de paiement',
      configureShipping: 'Configurer les options d\'expédition',
      setTaxRates: 'Définir les taux de taxe',
      createCategories: 'Créer des catégories de produits',
      addTeamMembers: 'Ajouter des membres à l\'équipe',
      setupAnalytics: 'Configurer les analytics',
      configureEmail: 'Configurer les notifications email',
      addSocialMedia: 'Ajouter les réseaux sociaux',
      createHomepage: 'Créer une page d\'accueil',
      addBlog: 'Ajouter un blog',
      setupSeo: 'Configurer le SEO',
      launchStore: 'Lancer la boutique'
    };

    const additionalTasks = Object.keys(taskLabels).reduce((acc, key) => {
      acc[key] = taskLabels[key];
      return acc;
    }, {});

    const trialProgress = 75;

    const addProduct = () => {
      console.log('Navigate to add product page');
    };

    return {
      setupTasks,
      completedTasksCount,
      totalTasksCount,
      setupProgress,
      toggleTask,
      storeSettings,
      taskLabels,
      additionalTasks,
      trialProgress,
      addProduct
    };
  }
}
</script>

<style scoped>
.setup-guide-card {
  width: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  background-color: #ffffff;
}

.guide-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: clamp(1rem, 2vw, 1.5rem);
  border-bottom: 1px solid #e2e8f0;
  gap: clamp(0.75rem, 2vw, 1rem);
}

.header-info {
  flex: 1;
}

.guide-title {
  font-size: clamp(1rem, 2vw, 1.125rem);
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 0.25rem;
}

.guide-subtitle {
  font-size: clamp(0.8rem, 1.5vw, 0.875rem);
  color: #64748b;
}

.progress-info {
  text-align: right;
  min-width: clamp(150px, 20vw, 200px);
}

.progress-text {
  font-size: clamp(0.8rem, 1.5vw, 0.875rem);
  color: #64748b;
  margin-bottom: 0.5rem;
}

.progress-bar {
  width: 100%;
  height: 0.5rem;
}

.progress-bar :deep(.p-progressbar-value) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.guide-sections {
  padding: clamp(0.375rem, 1vw, 0.5rem);
}

.guide-section {
  padding: clamp(1rem, 2vw, 1.5rem);
  border-bottom: 1px solid #e2e8f0;
}

.guide-section:last-child {
  border-bottom: none;
}

.section-content {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: clamp(1rem, 2vw, 1.5rem);
}

.section-main {
  flex: 1;
}

.section-title {
  font-size: clamp(0.9rem, 1.8vw, 1rem);
  font-weight: 500;
  color: #1a202c;
  margin-bottom: clamp(0.75rem, 1.5vw, 1rem);
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: clamp(0.5rem, 1vw, 0.75rem);
}

.task-item {
  display: flex;
  align-items: center;
  gap: clamp(0.5rem, 1vw, 0.75rem);
}

.task-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: clamp(0.875rem, 2vw, 1rem);
  height: clamp(0.875rem, 2vw, 1rem);
}

.task-icon i {
  font-size: clamp(0.875rem, 2vw, 1rem);
  color: #d1d5db;
}

.task-text {
  font-size: clamp(0.8rem, 1.5vw, 0.875rem);
  color: #374151;
}

.task-description {
  font-size: clamp(0.8rem, 1.5vw, 0.875rem);
  color: #64748b;
  margin-left: clamp(1.5rem, 3vw, 1.75rem);
  line-height: 1.5;
}

.learn-more-link {
  color: #667eea;
  text-decoration: none;
}

.learn-more-link:hover {
  text-decoration: underline;
}

.action-buttons {
  display: flex;
  gap: clamp(0.5rem, 1vw, 0.75rem);
  margin-left: clamp(1.5rem, 3vw, 1.75rem);
  margin-top: clamp(0.5rem, 1vw, 0.75rem);
}

.primary-btn :deep(.p-button) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: #ffffff;
  font-size: clamp(0.8rem, 1.5vw, 0.875rem);
}

.primary-btn :deep(.p-button:hover) {
  background: linear-gradient(135deg, #5a6cd1 0%, #69439b 100%);
}

.secondary-btn :deep(.p-button) {
  color: #667eea;
  border-color: #e2e8f0;
  font-size: clamp(0.8rem, 1.5vw, 0.875rem);
}

.section-illustration {
  flex-shrink: 0;
}

.illustration-box {
  width: clamp(4rem, 8vw, 5rem);
  height: clamp(4rem, 8vw, 5rem);
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 1px solid #e2e8f0;
}

.illustration-icon {
  font-size: clamp(1.5rem, 3vw, 2rem);
  color: #667eea;
  margin-bottom: 0.25rem;
}

.illustration-indicator {
  width: clamp(0.875rem, 2vw, 1rem);
  height: 0.25rem;
  background-color: #e0e7ff;
  border-radius: 0.125rem;
}

.simple-section .task-item {
  margin-bottom: 0;
}

.launch-section {
  background-color: #f8fafc;
}

.trial-info {
  margin-top: clamp(0.375rem, 1vw, 0.5rem);
}

.trial-text {
  font-size: clamp(0.8rem, 1.5vw, 0.875rem);
  color: #64748b;
  margin-bottom: 0.5rem;
}

.trial-progress {
  width: 100%;
  height: 0.5rem;
}

.trial-progress :deep(.p-progressbar-value) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.product-preview {
  display: flex;
  align-items: center;
  gap: clamp(0.75rem, 1.5vw, 1rem);
  margin-top: clamp(0.75rem, 1.5vw, 1rem);
}

.product-image {
  width: clamp(80px, 15vw, 100px);
  height: clamp(80px, 15vw, 100px);
  object-fit: cover;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
}

.product-info {
  font-size: clamp(0.8rem, 1.5vw, 0.875rem);
  color: #1a202c;
}

/* Desktop */
@media (min-width: 1024px) {
  .guide-sections {
    padding: clamp(0.375rem, 1vw, 0.5rem);
  }
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) {
  .guide-header {
    flex-direction: column;
    align-items: flex-start;
    gap: clamp(0.5rem, 1vw, 0.75rem);
  }
  
  .progress-info {
    text-align: left;
    min-width: auto;
  }
  
  .section-content {
    grid-template-columns: 1fr;
    gap: clamp(0.75rem, 1.5vw, 1rem);
  }
  
  .action-buttons {
    flex-direction: row;
    margin-left: 0;
  }
  
  .product-preview {
    flex-direction: column;
    align-items: flex-start;
  }
}

/* Mobile */
@media (max-width: 767px) {
  .guide-header {
    flex-direction: column;
    gap: clamp(0.5rem, 1vw, 0.75rem);
    padding: clamp(0.75rem, 1.5vw, 1rem);
  }
  
  .progress-info {
    text-align: left;
    min-width: auto;
    width: 100%;
  }
  
  .section-content {
    grid-template-columns: 1fr;
    gap: clamp(0.5rem, 1vw, 0.75rem);
  }
  
  .illustration-box {
    width: clamp(3.5rem, 7vw, 4rem);
    height: clamp(3.5rem, 7vw, 4rem);
    align-self: center;
  }
  
  .action-buttons {
    flex-direction: column;
    margin-left: 0;
    gap: clamp(0.375rem, 1vw, 0.5rem);
  }
  
  .action-buttons .p-button {
    width: 100%;
  }
  
  .task-description {
    margin-left: 0;
    margin-top: clamp(0.375rem, 1vw, 0.5rem);
  }
  
  .product-preview {
    flex-direction: column;
    align-items: flex-start;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .setup-guide-card,
  .primary-btn :deep(.p-button:hover) {
    transition: none;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .setup-guide-card,
  .illustration-box,
  .product-image {
    border-width: 2px;
  }
  
  .primary-btn :deep(.p-button),
  .secondary-btn :deep(.p-button) {
    border-width: 2px;
  }
}
</style>