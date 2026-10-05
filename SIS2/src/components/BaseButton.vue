<script>
// Global component with a slot for the label
export default {
  name: 'BaseButton',
  props: { variant: { type: String, default: 'default' } }
}
</script>

<template>
  <button :class="['btn', variant]"><slot /></button>
</template>

<style scoped>
.btn { padding: 6px 12px; border: 1px solid #c9ccd3; border-radius: 6px; background: #fff; cursor: pointer; font: inherit; }
.btn:hover { background: #f1f2f5; }
.btn:focus-visible { outline: 2px solid #2d5bff; outline-offset: 2px; }
.primary { background: #2d5bff; border-color: #2d5bff; color: #fff; }
.primary:hover { background: #1f47d6; }
.success { color: #137a3f; border-color: #137a3f; }
.danger { color: #c62828; border-color: #c62828; }
</style>
