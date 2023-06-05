<script setup>
import TopicProgress from "../common/TopicProgress.vue";

const props = defineProps(["title", "desc", "thumbUrl", "done"]);
</script>

<template>
  <div
    class="mb-3 px-3 md:px-4 md:py-4 py-3 h-24 border border-colorGrey3/70 shadow-sm hover:shadow-md hover:scale-[101%] rounded-lg flex items-center gap-2 cursor-pointer duration-100 ease-out"
  >
    <div class="grow">
      <h3 class="font-semibold text-xl text-gray-800">{{ props.title }}</h3>
      <p class="text-[17px] mt-[2px] text-gray-500">{{ props.desc }}</p>
    </div>

    <TopicProgress :src="props.thumbUrl" :done="props.done" />
  </div>
</template>

<style scoped></style>
