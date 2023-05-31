<script setup>
import { ref } from "vue";
const props = defineProps(["question"]);

const ansStatusStyle = {
  true: "green-500",
  false: "red-500",
};

const correctClass = "";
const ansChosen = ref([]);
const audios = ref();

const handleChooseAns = (id, isCorrect) => {
  if (!ansChosen.value.includes(id)) ansChosen.value.push(id);
  if (isCorrect) console.log("aha");
  audios.value.find((a) => a.id === id).play();
};
</script>

<template>
  <div class="grow mt-4 pb-10 overflow-x-hidden">
    <div class="w-full h-full">
      <div class="flex flex-col h-full w-full">
        <h3 class="question-header text-gray-700">
          Chọn "{{ props.question.meaning }}"
        </h3>
        <div class="h-full mt-4 pb-1 grid grid-cols-2 grid-rows-2 gap-8">
          <div
            v-for="(answer, index) in props.question.answers"
            :key="answer.id"
            @click="handleChooseAns(answer.id, answer.correct)"
            :class="
              ansChosen.includes(answer.id)
                ? 'border-' + ansStatusStyle[answer.correct]
                : ''
            "
            class="flex flex-col border-2 cursor-pointer rounded-lg shadow hover:shadow-md duration-100 h-full w-full ease-out p-0 normal-border"
          >
            <div class="h-[110px] flex justify-center">
              <img :src="answer.thumbnailUrl" alt="" class="h-full" />
            </div>
            <div
              :class="
                ansChosen.includes(answer.id)
                  ? 'text-white bg-' + ansStatusStyle[answer.correct]
                  : ''
              "
              class="h-12 flex-center border-0 border-t-2 w-full rounded-lg rounded-t-none text-center font-medium text-xl duration-100 border-gray-200 group-hover:border-gray-300 flex justify-center items-center"
            >
              <span class="mb-1">{{ answer.content }}</span>
            </div>

            <audio
              ref="audios"
              :id="answer.id"
              :src="answer.audioUrl"
              preload="auto"
              playsinline=""
              hidden=""
            ></audio>
          </div>
        </div>
        <audio
          id="correct-audio"
          preload="auto"
          playsinline=""
          hidden=""
        ></audio>
      </div>
    </div>
  </div>
</template>

<style scoped>
.question-header {
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
}
</style>
