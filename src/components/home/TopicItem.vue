<script setup>
import TopicProgress from "../common/TopicProgress.vue";

const props = defineProps(["title", "desc", "thumbUrl", "done", "disabled"]);
</script>

<template>
  <div
    :class="props.disabled ? 'grayscale pointer-events-none' : ''"
    class="mb-3 px-3 md:px-4 md:py-4 py-3 h-24 border border-gray-300/70 shadow-sm hover:shadow-md hover:scale-[101%] rounded-lg flex items-center gap-2 cursor-pointer duration-100 ease-out"
  >
    <div class="grow">
      <h3
        :class="props.disabled ? 'text-gray-400 ' : 'text-gray-800'"
        class="font-semibold text-xl"
      >
        {{ props.title }}
      </h3>
      <p class="text-[17px] mt-[2px] text-gray-500">{{ props.desc }}</p>
    </div>

    <TopicProgress :src="props.thumbUrl" :done="props.done" />
  </div>
</template>

<style scoped></style>
