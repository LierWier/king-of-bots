<template>
  <div class="card bg-theme-grey">
    <div class="card-body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "CardGrey"
}
</script>

<style scoped>
.bg-theme-grey {
  background-color: rgba(50, 50, 50, 0.5);
}
</style>