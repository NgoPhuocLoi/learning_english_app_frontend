<script setup>
import { useTopicStore } from "../../store";

const props = defineProps(["open"]);
const emit = defineEmits(["update:open"]);
const topicStore = useTopicStore();
</script>

<template>
  <div
    @click="emit('update:open', false)"
    :class="`fixed z-20 h-[100vh] w-[100vw] top-0 ${
      props.open ? 'bg-[rgba(0,0,0,.4)]' : 'bg-transparent pointer-events-none'
    }  duration-200 flex items-center justify-center`"
  >
    <div
      @click.stop
      :class="`${
        props.open ? 'animate-show-animation' : 'animate-hide-animation'
      }  z-50 bg-white duration-200 ease-out opacity-100 visible rounded-md h-auto w-[32rem] max-w-[90%] lg:p-8 md:p-[30px] p-7  flex-center flex-col`"
    >
      <div class="mb-6 mx-auto w-24">
        <img
          :src="topicStore.chosenTopic?.thumbnailUrl"
          alt=""
          class="w-full"
        />
      </div>

      <div class="text-2xl font-semibold text-center mb-2">
        {{ topicStore.chosenTopic?.translatedTitle }}
      </div>

      <div class="text-lg text-center text-gray-500 mb-4">
        {{ topicStore.chosenTopic?.description }}
      </div>

      <div class="flex w-full gap-4">
        <RouterLink
          :to="`/${topicStore.chosenTopic?.slug}/hoc`"
          class="w-full mt-4 flex-center rounded-full bg-gradient-to-b from-blue-500 to-blue-300 hover:opacity-90 duration-100 text-white text-center text-lg uppercase py-3 cursor-pointer"
        >
          <span>Học</span>
        </RouterLink>

        <div
          class="w-full mt-4 flex-center rounded-full bg-gradient-to-b from-red-500 to-red-300 hover:opacity-90 duration-100 text-white text-center text-lg uppercase py-3 cursor-pointer"
        >
          <span>Kiểm tra</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
