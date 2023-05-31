<script setup>
import { ref, watch } from "vue";

const props = defineProps(["show"]);
const emit = defineEmits(["update:show"]);

const isShow = ref(props.show);

watch(props, () => {
  isShow.value = props.show;
});
</script>

<template>
  <div
    :class="`fixed z-10 h-full w-full bg-[rgba(0,0,0,.4)] duration-200 ${
      isShow ? '' : 'pointer-events-none bg-transparent'
    }`"
    @click="emit('update:show', false)"
  >
    <div
      :class="`${
        isShow ? '' : 'translate-x-[100%]'
      } w-full md:w-[50%] bg-white absolute top-0 right-0 h-full shadow-sm duration-200`"
      @click.stop
    >
      <div
        class="px-[22px] py-[14px] flex justify-between shadow-md items-center"
      >
        <span class="font-[500] text-[18px]">Bé học tiếng anh</span>
        <ion-icon
          @click="emit('update:show', false)"
          name="close"
          class="text-[26px] p-[2px] rounded-full hover:bg-gray-100 cursor-pointer"
        ></ion-icon>
      </div>

      <div class="mx-[22px] my-[11px] flex flex-col">
        <RouterLink
          to="/"
          active-class="text-blue-600 bg-blue-100"
          class="w-full py-[10px] mb-[4px] pl-[12px] rounded-md hover:bg-blue-100 text-[15px] font-semibold flex items-center"
          ><ion-icon
            name="home-outline"
            class="text-[18px] mr-[4px] mb-[1px]"
          ></ion-icon>
          Trang chủ</RouterLink
        >
        <RouterLink
          to="/ho-so"
          active-class="text-blue-600 bg-blue-100"
          class="w-full py-[10px] mb-[4px] pl-[12px] rounded-md hover:bg-blue-100 text-[15px] font-semibold flex items-center"
          ><ion-icon
            name="person-outline"
            class="text-[18px] mr-[4px] mb-[1px]"
          ></ion-icon>
          Hồ sơ</RouterLink
        >
      </div>
    </div>
  </div>
</template>

<style scoped></style>
