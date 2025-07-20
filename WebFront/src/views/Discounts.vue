<template>
  <div class="discounts-view">
    <Card>
      <template #header>
        <div class="view-header">
          <h1>Réductions</h1>
          <Button label="Créer une réduction" icon="pi pi-plus" />
        </div>
      </template>
      <template #content>
        <p>Gestion des réductions et codes promo en cours de développement...</p>
      </template>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'Discounts'
}
</script>

<style scoped>
.discounts-view {
  padding: 1rem;
}

.view-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.view-header h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}
</style>