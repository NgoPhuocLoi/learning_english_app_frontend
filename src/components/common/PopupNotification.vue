<script setup>
import correctGif from "../../static/giphy.gif";
import incorrectGif from "../../static/incorrect.gif";
import icons from "../../static/icons";
import { ref, watch } from "vue";
const props = defineProps(["showInfo", "question", "testing"]);

const isAudioPlaying = ref(false);
const audio = ref();
const correctAns = ref(
  props?.question?.answers?.find((a) => a.correct === true)
);

watch(props, () => {
  correctAns.value = props?.question?.answers?.find((a) => a.correct === true);
});

const onPlayAudio = () => {
  isAudioPlaying.value = true;
  audio.value.play();
  setTimeout(() => {
    isAudioPlaying.value = false;
  }, 700);
};
</script>

<template>
  <div
    :class="`fixed z-20  ${
      props.showInfo.show ? 'bg-white/60' : 'bg-transparent pointer-events-none'
    } w-full h-full top-0`"
  >
    <div
      :class="`absolute inset-x-0 bottom-60 lg:bottom-[230px] z-10 duration-300 ease-out ${
        props.showInfo.show ? 'scale-100' : 'scale-0'
      } w-[180px] left-[50%] translate-x-[-50%]`"
    >
      <img :src="props.showInfo.correct ? correctGif : incorrectGif" alt="" />
    </div>
    <div
      :class="`absolute  ${
        props.showInfo.show ? 'translate-y-0' : 'translate-y-[100%]'
      } bottom-0 bg-gradient-to-t rounded-t-[50px] pt-6 duration-300 ease-out inset-x-0 lg:inset-x-52 xl:inset-x-80 2xl:inset-x-[420px] h-56 lg:h-[216px] ${
        props.testing
          ? showInfo.correct
            ? 'bg-green-500'
            : 'bg-red-500'
          : 'from-blue-500 to-blue-500/90'
      } `"
    >
      <div class="w-full flex mb-2 justify-center items-center">
        <div v-if="props.question?.type === 1">
          <img
            v-if="!isAudioPlaying"
            @click="onPlayAudio"
            :src="icons.playIcon"
            alt=""
            class="w-[30px] mr-2 text-white cursor-pointer"
          />

          <img
            v-if="isAudioPlaying"
            :src="icons.pauseIcon"
            alt=""
            class="w-[30px] mr-2 text-white cursor-pointer"
          />
        </div>

        <div
          v-if="props.question?.type === 1"
          class="text-white text-2xl font-medium"
        >
          {{
            correctAns?.content[0].toUpperCase() +
            correctAns?.content.substring(1)
          }}
        </div>

        <div v-else>
          <div
            v-if="props.question?.type === 2 && props.question?.grammarTips"
            class="text-white text-2xl font-medium"
          >
            Mẹo
          </div>

          <div v-else class="text-white text-2xl font-medium">
            {{ props.question?.content }}
          </div>
        </div>
      </div>

      <div
        v-if="props.question?.type === 2 && props.question?.grammarTips"
        class="text-center text-white text-xl font-light px-4"
      >
        {{ props.question.grammarTips }}
      </div>

      <div v-else class="text-center text-white text-xl font-light px-4">
        {{
          props.question?.meaning[0].toUpperCase() +
          props.question?.meaning.substring(1)
        }}
      </div>

      <audio
        ref="audio"
        :src="correctAns?.audioUrl"
        preload="auto"
        playsinline=""
        hidden=""
      ></audio>
    </div>
  </div>
</template>

<style scoped></style>
