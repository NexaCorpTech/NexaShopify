<template>
  <div class="dual-purpose">
    <div class="purpose-card seller">
      <h2><i class="fas fa-store"></i> Je veux vendre</h2>
      <p>Créez votre boutique en ligne et commencez à vendre vos produits à des milliers de clients potentiels. Profitez d'outils professionnels pour gérer votre inventaire, vos commandes et votre marketing.</p>
      <button class="btn btn-seller">
        Créer ma boutique
      </button>
      <button class="btn btn-seller ml-5">
        Accéder à ma boutique 
      </button>
    </div>
    
    <div class="purpose-card buyer">
      <h2><i class="fas fa-shopping-bag"></i> Je veux acheter</h2>
      <p>Découvrez des milliers de produits uniques de nos boutiques partenaires et faites vos achats en toute sécurité. Livraison rapide et paiements sécurisés garantis.</p>
      <a href="#products-section" class="btn btn-primary">
        <i class="fas fa-shopping-bag"></i> Parcourir les produits
      </a>
    </div>
  </div>
</template>

 
    

      


<style scoped>
.dual-purpose {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin: 60px 0;
}


.purpose-card {
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  transition: transform 0.3s;
  position: relative;
  overflow: hidden;
}



/*  */
  .purpose-card .btn {
      margin-top: 10px;
      margin-left: 15px;
 }

.purpose-card:hover {
  transform: translateY(-10px);
  box-shadow: 
    0 15px 30px rgba(0,0,0,0.1),
    0 0 0 2px var(--seller-accent, transparent); /* Bordure dynamique */
}

.purpose-card.buyer:hover {
  box-shadow: 
    0 15px 30px rgba(0,0,0,0.1),
    0 0 0 2px var(--buyer-accent); /* Bordure spécifique acheteur */
}

.purpose-card.seller {
  border-top: 5px solid var(--seller-accent); /* Harmonisation avec bouton */
}


.purpose-card.buyer {
  border-top: 5px solid var(--buyer-accent); /* Harmonisation avec bouton */
}

.purpose-card h2 {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--dark);
  font-size: 1.8rem;
}


.purpose-card p {
  margin-bottom: 25px;
  color: var(--gray);
  line-height: 1.7;
}


@media (max-width: 768px) {
  .dual-purpose {
    grid-template-columns: 1fr;
  }
  
  .purpose-card {
    padding: 25px;
  }
}
</style>