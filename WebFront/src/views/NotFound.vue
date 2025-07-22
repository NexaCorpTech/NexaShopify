<template>
  <div class="not-found">
    <h1>404 - Page Non Trouvée</h1>
    <p>Désolé, la page que vous recherchez n'existe pas.</p>
    <router-link to="/" class="back-link">Retour à l'accueil</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
.not-found {
  text-align: center;
  padding: 2rem;
  color: #374151;
}

.not-found h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.not-found p {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
}

.back-link {
  color: #3b82f6;
  text-decoration: underline;
}

.back-link:hover {
  color: #1d4ed8;
}
</style>