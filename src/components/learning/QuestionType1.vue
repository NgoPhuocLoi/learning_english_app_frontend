<script setup>
import { ref, watch } from "vue";
const props = defineProps([
  "question",
  "showInfo",
  "ansStatusStyle",
  "testing",
]);
const emit = defineEmits(["update:showInfo", "update:chosenAns"]);

const ansStatusStyle = ref(props.ansStatusStyle);

const ansChosen = ref([]);
const audios = ref();
const correctAudio = ref();
const quesBody = ref();

const handleChooseAns = (id, isCorrect) => {
  audios.value.find((a) => a.id === id).play();
  if (props.testing) {
    ansChosen.value.pop();
    ansChosen.value.push(id);
    emit("update:chosenAns", { id, isCorrect });
  } else {
    if (!ansChosen.value.includes(id)) ansChosen.value.push(id);

    if (isCorrect) {
      setTimeout(() => {
        emit("update:showInfo", { show: true, correct: true });
        correctAudio.value.play();
      }, 600);
    }
  }
};

watch(props, () => {
  if (!props.showInfo.show) {
    quesBody.value.style.opacity = "0";
    setTimeout(() => {
      if (quesBody.value) quesBody.value.style.opacity = "1";
    }, 500);
  }
});
</script>

<template>
  <div class="grow mt-4 pb-10 overflow-x-hidden">
    <div class="w-full h-full">
      <div class="flex flex-col h-full w-full duration-300" ref="quesBody">
        <h3 class="question-header text-gray-700">
          Chọn "{{ props.question?.meaning }}"
        </h3>
        <div class="mt-4 pb-1 grid grid-cols-2 grid-rows-2 gap-8 h-[90%]">
          <div
            v-for="(answer, index) in props.question?.answers"
            :key="answer.id"
            @click="handleChooseAns(answer.id, answer.correct)"
            :class="
              ansChosen.includes(answer.id)
                ? ansStatusStyle.border[answer.correct]
                : ''
            "
            class="border-2 rounded-md flex flex-col cursor-pointer shadow hover:shadow-lg duration-100"
          >
            <div
              v-if="!props.testing"
              class="flex items-center justify-center h-full max-h-[calc(100%_-_48px)]"
            >
              <img
                :src="answer.thumbnailUrl"
                class="h-full object-contain"
                alt=""
              />
            </div>
            <div
              v-if="!props.testing"
              :class="
                ansChosen.includes(answer.id)
                  ? 'text-white ' + ansStatusStyle.bg[answer.correct]
                  : ''
              "
              class="h-12 flex items-center justify-center flex-center bottom-0 inset-x-0 border-0 border-t-2 w-full rounded-lg rounded-t-none text-center font-medium text-xl duration-100 border-gray-200"
            >
              <span>{{ answer.content }}</span>
            </div>
            <div
              v-if="props.testing"
              class="text-2xl text-center font-medium h-full flex items-center justify-center"
            >
              {{ answer?.content }}
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
          ref="correctAudio"
          preload="auto"
          src="https://dinoenglish.app/assets/sound/correct.mp3"
          playsinline=""
          hidden=""
        ></audio>
        <!-- <audio
          ref="statusAudio"
          preload="auto"
          src="https://dinoenglish.app/assets/sound/incorrect.mp3"
          playsinline=""
          hidden=""
        ></audio> -->
      </div>
    </div>
  </div>
</template>

<style scoped></style>
