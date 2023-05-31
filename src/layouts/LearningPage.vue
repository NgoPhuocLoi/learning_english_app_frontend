<script setup>
import { QuestionType1, QuestionType2 } from "../components/learning";
import congratulateImg from "../static/giphy.gif";
import { ref, shallowRef, watch } from "vue";
import questions from "../data/animal_questions.json";

const type = ref(1);
const currentQues = ref(1);
const Question = shallowRef(QuestionType1);
</script>

<template>
  <div class="lg:px-[320px] pt-[24px]">
    <div class="flex items-center justify-between">
      <h3 class="text-xl font-bold bg-gray-100 px-4 py-2 rounded-full shadow">
        Chào hỏi
      </h3>
      <div class="text-xl mr-16 lg:mr-0 font-semibold text-gray-500">10/35</div>
    </div>
    <component :is="Question" :question="questions[currentQues]" />
    <div class="z-20 px-0 lg:px-8 relative z-30">
      <button
        @click="currentQues++"
        class="text-center text-xl rounded-full cursor-pointer font-semibold py-2 w-full duration-300 ease-out bg-gray-200 text-gray-500"
      >
        Tiếp theo
      </button>
    </div>
  </div>

  <div class="fixed z-20 bg-white/60 w-full h-full top-0">
    <div
      class="absolute inset-x-0 bottom-60 lg:bottom-[230px] z-10 duration-300 ease-out scale-100 w-[180px] left-[50%] translate-x-[-50%]"
    >
      <img :src="congratulateImg" alt="" />
    </div>
    <div
      class="absolute bottom-0 bg-gradient-to-t rounded-t-[50px] pt-6 duration-300 ease-out inset-x-0 lg:inset-x-52 xl:inset-x-80 2xl:inset-x-[420px] h-56 lg:h-[216px] translate-y-0 from-blue-500 to-blue-500/90"
    >
      <div class="w-full flex mb-2 justify-center items-center">
        <ion-icon
          name="play-circle"
          class="text-[40px] text-white mr-2"
        ></ion-icon>
        <div class="text-white text-2xl font-medium">Cat</div>
      </div>

      <div class="text-center text-white text-xl font-light px-4">Con mèo</div>
    </div>
  </div>
</template>

<style scoped></style>
