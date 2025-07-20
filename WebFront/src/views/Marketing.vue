<!-- views/Marketing.vue -->
<template>
  <div class="marketing-view">
    <Card>
      <template #header>
        <div class="view-header">
          <h1>Marketing</h1>
          <Button label="Nouvelle campagne" icon="pi pi-plus" />
        </div>
      </template>
      <template #content>
        <p>Interface de marketing en cours de développement...</p>
      </template>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'Marketing'
}
</script>