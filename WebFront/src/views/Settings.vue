<template>
  <div class="settings-view">
    <Card>
      <template #header>
        <div class="view-header">
          <h1>Paramètres</h1>
          <Button label="Enregistrer" icon="pi pi-save" />
        </div>
      </template>
      <template #content>
        <p>Configuration des paramètres de la boutique en cours de développement...</p>
      </template>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'Settings'
}
</script>

<style scoped>
.settings-view {
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