<script>
// Global component with named slots (header + default body)
export default { name: 'BaseCard' }
</script>

<template>
  <section class="card">
    <header v-if="$slots.header" class="card-header"><slot name="header" /></header>
    <div class="card-body"><slot /></div>
  </section>
</template>

<style scoped>
.card { background: #fff; border: 1px solid #dfe1e6; border-radius: 10px; }
.card-header { padding: 12px 16px; border-bottom: 1px solid #dfe1e6; font-weight: 600; }
.card-body { padding: 16px; }
</style>
