<script setup>
const props = defineProps("size");
</script>

<template>
  <div
    :class="`lds-dual-ring animate-spin after:w-[15px] after:h-[15px]`"
  ></div>
</template>

<style scoped>
.lds-dual-ring {
  display: inline-block;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  border-radius: 50%;
  border: 2px solid #fff;
  border-color: #fff transparent #fff transparent;
}
</style>
