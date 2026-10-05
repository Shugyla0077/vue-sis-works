<script>
export default {
  name: 'TaskStats',
  props: {
    total: { type: Number, default: 0 },
    active: { type: Number, default: 0 },
    completed: { type: Number, default: 0 }
  }
}
</script>

<template>
  <BaseCard>
    <template #header>Statistics</template>
    <div class="stats">
      <div><strong>{{ total }}</strong><span>Total</span></div>
      <div><strong>{{ active }}</strong><span>Active</span></div>
      <div><strong>{{ completed }}</strong><span>Completed</span></div>
    </div>
  </BaseCard>
</template>

<style scoped>
.stats { display: flex; justify-content: space-around; text-align: center; }
strong { display: block; font-size: 28px; }
span { color: #666; font-size: 13px; }
</style>
