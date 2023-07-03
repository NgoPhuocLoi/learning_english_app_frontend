<script setup>
import { ref } from "vue";
import Sidebar from "./common/Sidebar.vue";
import icons from "../static/icons";

const show = ref(false);
</script>

<template>
  <div
    class="fixed bg-white z-10 top-0 w-full lg:h-[80px] md:h-[75px] h-[70px] lg:px-[128px] lg:py-[8px] md:px-[60px] md:py-[7.5px] px-[21px] py-[10.5px] flex justify-between shadow-md"
  >
    <div class="w-[180px] md:w-[190px] lg:w-[200px]">
      <img :src="icons.logo" class="w-full" alt="" />
    </div>

    <div class="hidden lg:flex items-center justify-center">
      <RouterLink
        to="/"
        exact-active-class="text-blue-600 bg-blue-100"
        class="p-2 mx-2 rounded-md hover:bg-blue-100 font-semibold text-gray-700 flex items-center"
      >
        <img
          :src="icons.homeOutline"
          class="w-[20px] mr-[2px] mb-[1px]"
          alt=""
        />
        Trang chủ
      </RouterLink>

      <RouterLink
        to="/ho-so"
        active-class="text-blue-600 bg-blue-100"
        class="p-2 mx-2 rounded-md hover:bg-blue-100 font-semibold text-gray-700 flex items-center"
      >
        <img
          :src="icons.personOutline"
          class="w-[20px] mr-[2px] mb-[1px]"
          alt=""
        />
        Hồ sơ</RouterLink
      >
    </div>

    <div class="flex items-center lg:hidden justify-center">
      <img
        :src="icons.menu"
        @click="show = true"
        class="w-[46px] cursor-pointer hover:bg-gray-200 rounded-full p-[6px] text-gray-600 hover:text-black"
        alt=""
      />
    </div>
  </div>

  <Sidebar v-model:show="show" />
</template>

<style scoped></style>
