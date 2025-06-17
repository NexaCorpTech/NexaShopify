<template>
  <div class="cta-section">
    <div class="cta-content">
      <!-- Correction de la faute d'orthographe -->
      <h2>Prêt à lancer votre boutique?</h2>
      <p>Rejoignez notre plateforme et commencez à vendre dès aujourd'hui. Des milliers d'acheteurs vous attendent!</p>
      
      <!-- Bouton avec classes correctes -->
      <!-- <button class="btn btn-accent">
        <i class="fas fa-store"></i> Créer ma boutique
      </button> -->
              <router-link :to="{ name: 'create-shop' }" class="btn btn-accent">
          <i class="fas fa-store"></i> Créer ma boutique
        </router-link>
      <div class="stats">
        <!-- Statistiques corrigées -->
        <div class="stat-item">
          <div class="stat-value">700K+</div>
          <div class="stat-label">Boutiques</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">10M+</div>
          <div class="stat-label">Produits</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">98%</div>
          <div class="stat-label">Clients satisfaits</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CtaSection'
}
</script>

<style scoped>
:root {
  --primary: #8b5cf6;
  --primary-dark: #7c3aed;
  --seller-accent: #f97316;
  --seller-accent-dark: #ea580c;
  --secondary: #10b981;
  --secondary-dark: #059669;
  --dark: #1e293b;
  --darker: #0f172a;
  --light: #f8fafc;
}

.cta-section {
  /* background: linear-gradient(135deg, var(--dark) 0%, var(--darker) 100%); */
    background: linear-gradient(135deg, var(--dark) 0%, #334155 100%);
  color: white;
  padding: 100px 0;
  text-align: center;
  margin: 80px 0;
  position: relative;
  overflow: hidden;
  border-radius: 0;
}

.cta-section::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%);
  pointer-events: none;
}

.cta-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

.cta-section h2 {
  font-size: 2.8rem;
  margin-bottom: 20px;
  line-height: 1.2;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.cta-section p {
  margin-bottom: 40px;
  opacity: 0.9;
  font-size: 1.3rem;
  max-width: 650px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.btn {
  padding: 18px 45px;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 3px solid #000 !important;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.2);
  font-size: 1.2rem;
  position: relative;
  overflow: hidden;
  letter-spacing: -0.2px;
  background: var(--seller-accent);
  color: white;
}

.btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.15);
  transform: translateX(-100%);
  transition: transform 0.4s ease;
}

.btn:hover {
  transform: translate(-4px, -4px);
  box-shadow: 9px 9px 0 rgba(0, 0, 0, 0.2);
  background: var(--seller-accent-dark);
}

.btn:hover::after {
  transform: translateX(0);
}

.btn:active {
  transform: translate(1px, 1px);
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.2);
}

.stats {
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-top: 70px;
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
  background: rgba(255, 255, 255, 0.08);
  padding: 30px 35px;
  border-radius: 16px;
  border: 2px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
  min-width: 180px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.stat-item:hover {
  transform: translateY(-10px);
  background: rgba(255, 255, 255, 0.12);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.stat-value {
  font-size: 3.2rem;
  font-weight: 800;
  margin-bottom: 10px;
  color: white;
  text-shadow: 0 3px 6px rgba(0,0,0,0.2);
  line-height: 1;
}

.stat-label {
  font-size: 1.1rem;
  opacity: 0.9;
  letter-spacing: 0.5px;
}

/* Animation des stats */
.stat-item {
  animation: statAppear 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
  opacity: 0;
  transform: translateY(30px);
}

.stat-item:nth-child(1) { animation-delay: 0.1s; }
.stat-item:nth-child(2) { animation-delay: 0.3s; }
.stat-item:nth-child(3) { animation-delay: 0.5s; }

@keyframes statAppear {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Effet de pulsation sur le bouton */
@keyframes ctaPulse {
  0% { transform: translate(-4px, -4px); box-shadow: 6px 6px 0 rgba(0,0,0,0.2); }
  50% { transform: translate(-4px, -4px); box-shadow: 10px 10px 0 rgba(0,0,0,0.3); }
  100% { transform: translate(-4px, -4px); box-shadow: 6px 6px 0 rgba(0,0,0,0.2); }
}

.btn {
  animation: ctaPulse 2s infinite ease-in-out;
}

@media (max-width: 992px) {
  .cta-section {
    padding: 80px 0;
  }
  
  .cta-section h2 {
    font-size: 2.4rem;
  }
  
  .cta-section p {
    font-size: 1.2rem;
  }
  
  .stats {
    gap: 30px;
    margin-top: 60px;
  }
  
  .stat-item {
    padding: 25px 30px;
    min-width: 160px;
  }
  
  .stat-value {
    font-size: 2.8rem;
  }
}

@media (max-width: 768px) {
  .cta-section {
    padding: 70px 0;
    margin: 60px 0;
  }
  
  .cta-section h2 {
    font-size: 2rem;
  }
  
  .cta-section p {
    font-size: 1.1rem;
    margin-bottom: 30px;
  }
  
  .btn {
    padding: 16px 35px;
    font-size: 1.1rem;
  }
  
  .stats {
    gap: 20px;
    margin-top: 50px;
  }
  
  .stat-item {
    padding: 20px;
    min-width: 140px;
  }
  
  .stat-value {
    font-size: 2.5rem;
  }
}

@media (max-width: 576px) {
  .cta-section {
    padding: 60px 0;
    margin: 50px 0;
  }
  
  .stats {
    flex-direction: column;
    gap: 15px;
    align-items: center;
  }
  
  .stat-item {
    width: 100%;
    max-width: 280px;
  }
  
  .btn {
    width: 100%;
    max-width: 320px;
    margin: 0 auto;
  }
}
</style>