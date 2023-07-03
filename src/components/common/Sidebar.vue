<script setup>
import { ref, watch } from "vue";
import icons from "../../static/icons";

const props = defineProps(["show"]);
const emit = defineEmits(["update:show"]);

const isShow = ref(props.show);

watch(props, () => {
  isShow.value = props.show;
});
</script>

<template>
  <div
    :class="`fixed top-0 z-20 h-full w-full bg-[rgba(0,0,0,.4)] duration-200 ${
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
        <img
          :src="icons.closeOutline"
          @click="emit('update:show', false)"
          class="w-[32px] p-[2px] rounded-full hover:bg-gray-100 cursor-pointer"
          alt=""
        />
      </div>

      <div class="mx-[22px] my-[11px] flex flex-col">
        <RouterLink
          to="/"
          @click="emit('update:show', false)"
          exact-active-class=" bg-blue-100"
          class="w-full py-[10px] mb-[4px] pl-[12px] rounded-md hover:bg-blue-100 text-[15px] font-semibold flex items-center"
          ><img
            :src="icons.homeOutline"
            class="w-[20px] mr-[2px] mb-[1px]"
            alt=""
          />
          Trang chủ</RouterLink
        >
        <RouterLink
          to="/ho-so"
          @click="emit('update:show', false)"
          active-class=" bg-blue-100"
          class="w-full py-[10px] mb-[4px] pl-[12px] rounded-md hover:bg-blue-100 text-[15px] font-semibold flex items-center"
          ><img
            :src="icons.personOutline"
            class="w-[20px] mr-[2px] mb-[1px]"
            alt=""
          />
          Hồ sơ</RouterLink
        >
      </div>
    </div>
  </div>
</template>

<style scoped></style>
