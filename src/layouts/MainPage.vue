<script setup>
import HeaderNav from "../components/HeaderNav.vue";
import Dialog from "../components/common/Dialog.vue";
import { ref } from "vue";

const openModel = ref(false);
</script>

<template>
  <HeaderNav />

  <div
    class="lg:px-[160px] lg:py-[80px] md:px-[60px] md:py-[75px] md:pb-[60px] px-[21px] py-[70px] pb-[20px]"
  >
    <RouterView v-model:openModal="openModel" />
  </div>

  <Dialog v-model:open="openModel" />
</template>

<style scoped></style>
