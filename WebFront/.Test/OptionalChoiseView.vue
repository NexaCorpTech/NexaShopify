<template>
    <div class="initial-view">
      <div class="overlay">
        <header class="header">
          <!-- Globe seul en haut -->
          <div class="dunya"></div>
  
          <h1 class="title">Bienvenue sur nexaShop</h1>
          <p class="subtitle">Votre plateforme e-commerce moderne</p>
        </header>
  
        <main class="main-content">
          <div class="options">
            <button @click="navigateTo('create-store')" class="option-button">
              🏬 Créer une boutique
            </button>
            <button @click="navigateTo('shop-online')" class="option-button">
              🛒 Acheter en ligne
            </button>
          </div>
        </main>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  function navigateTo(path) {
    router.push({ name: path })
  }
  </script>
  
  <style scoped>
  .initial-view {
    background-image: url('@/assets/background.jpg');
    background-size: cover;
    background-position: center;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Poppins', sans-serif;
    position: relative;
  }
  
  .overlay {
    background-color: rgba(0, 0, 0, 0.6);
    padding: 3rem;
    border-radius: 1rem;
    text-align: center;
    color: #fff;
    width: 90%;
    max-width: 600px;
    /* Permettre un léger débordement si tu souhaites faire dépasser le globe */
    overflow: visible;
  }
  
  .header {
    margin-bottom: 2rem;
  }
  
  .dunya {
    width: 90px;
    height: 90px;
    background: url('https://1.bp.blogspot.com/-UUXaK5GCj-k/UcsKJRMgkVI/AAAAAAAACfM/sePP_H08JTQ/s1600/1.jpg');
    background-size: 380px;
    animation: spin 3.5s infinite linear;
    border-radius: 50%;
    margin: 0 auto 1rem;
    /* Si tu veux le faire déborder de 15px vers le haut : */
    /* margin-top: -15px; */
  }
  
  .title {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }
  
  .subtitle {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
  
  .options {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .option-button {
    background-color: #ff7f50;
    border: none;
    padding: 1rem 2rem;
    font-size: 1.1rem;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .option-button:hover {
    background-color: #ff6347;
  }
  
  @keyframes spin {
    0% {
      background-position-x: 0;
    }
    100% {
      background-position-x: 380px;
    }
  }
  </style>
  