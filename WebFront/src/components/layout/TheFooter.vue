<template>
  <footer>
    <div class="container">
      <div class="logo" style="justify-content: center; margin-bottom: 20px;">
        <i class="fas fa-store"></i>
        <span>NexaShop</span>
      </div>
      
      <div class="footer-links">
        <a href="#">À propos</a>
        <a href="#">Conditions d'utilisation</a>
        <a href="#">Politique de confidentialité</a>
        <a href="#">FAQ</a>
        <a href="#">Support</a>
      </div>
      
      <p>&copy; 2023 NexaShop. Tous droits réservés.</p>
    </div>
  </footer>
</template>

<style scoped>
footer {
  text-align: center;
  padding: 40px 0;
  color: var(--gray);
  border-top: 1px solid #e2e8f0;
  margin-top: 40px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
  font-weight: 700;
  color: var(--primary);
  text-decoration: none;
  font-family: 'Montserrat', sans-serif;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin: 20px 0;
  flex-wrap: wrap;
}

.footer-links a {
  color: var(--gray);
  text-decoration: none;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: var(--primary);
}

/* Animation d'apparition */
footer {
  animation: footerAppear 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes footerAppear {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Effet de lien au survol */
.footer-links a {
  position: relative;
}

.footer-links a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--primary);
  transition: width 0.3s ease;
}

.footer-links a:hover::after {
  width: 100%;
}
</style>