<template>
  <div class="dashboard-container">首页</div>
</template>

<script setup lang="ts">
defineOptions({
  name: "Dashboard",
  inheritAttrs: false,
});
</script>

<style lang="scss" scoped>
.dashboard-container {
  position: relative;
  padding: 24px;

  .github-corner {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    border: 0;
  }
}
</style>
