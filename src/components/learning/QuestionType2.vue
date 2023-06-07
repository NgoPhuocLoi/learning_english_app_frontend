<script setup>
import { computed, ref, watch } from "vue";
const props = defineProps(["question", "show", "testing", "ansStatusStyle"]);
const emit = defineEmits("update:showInfo", "update:chosenAns");

const ansChosen = ref([]);
const quesBody = ref();
const correctAudio = ref();
const incorrectAudio = ref();

const getWordBeforeAns = computed(() => {
  const content = props.question.content;
  const correctAnsContent = props.question.answers.find(
    (a) => a.correct
  ).content;
  const result = content.substring(0, content.indexOf(correctAnsContent));

  return result;
});

const getWordAfterAns = computed(() => {
  const content = props.question.content;
  const correctAnsContent = props.question.answers.find(
    (a) => a.correct
  ).content;
  const result = content.substring(
    content.indexOf(correctAnsContent) + correctAnsContent.length
  );

  return result;
});

const handleChooseAns = (id, isCorrect) => {
  if (props.testing) {
    ansChosen.value.pop();
    ansChosen.value.push(id);
    emit("update:chosenAns", { id, isCorrect });
  } else {
    if (!ansChosen.value.includes(id)) ansChosen.value.push(id);
    if (isCorrect) {
      setTimeout(() => {
        emit("update:showInfo", {
          show: true,
          correct: isCorrect,
        });
        correctAudio.value.play();
      }, 300);
    } else {
      incorrectAudio.value.play();
    }
  }
};

watch(props, () => {
  if (!props.show) {
    quesBody.value.style.opacity = "0";
    setTimeout(() => {
      if (quesBody.value) quesBody.value.style.opacity = "1";
    }, 300);
  }
});
</script>

<template>
  <div class="flex flex-col h-full w-full mt-4" ref="quesBody">
    <div v-if="props.question.type === 2">
      <h3 class="question-header">{{ props.question.meaning }}</h3>
      <div class="text-[24px] font-medium mb-12 text-center">
        <span>{{ getWordBeforeAns }}</span>
        <div class="w-14 h-0.5 bg-gray-400 mx-1 inline-block"></div>
        <span>{{ getWordAfterAns }}</span>
      </div>
    </div>

    <div v-if="props.question.type === 3">
      <h3 class="question-header">Chọn nghĩa chính xác</h3>
      <div class="text-[24px] font-medium mb-12 text-center">
        {{ props.question.content }}
      </div>
    </div>
    <div
      class="grid grid-cols-1 grid-rows-4 lg:grid-cols-2 lg:grid-rows-2 gap-6"
    >
      <div
        v-for="(answer, index) in props.question.answers"
        :key="answer.id"
        @click="handleChooseAns(answer.id, answer.correct)"
        :class="
          ansChosen.includes(answer.id)
            ? props.ansStatusStyle.border[answer.correct]
            : 'hover:border-gray-200 border-gray-100'
        "
        class="group h-16 lg:h-20 px-2 flex items-center border-2 cursor-pointer rounded-full shadow hover:shadow-md duration-100 w-full ease-out p-0"
      >
        <div
          :class="
            ansChosen.includes(answer.id)
              ? props.ansStatusStyle.bg[answer.correct] + ' text-white'
              : ' group-hover:bg-gray-200'
          "
          class="w-[50px] h-[50px] flex items-center justify-center flex-center rounded-full text-2xl bg-gray-100 duration-100 ease-out"
        >
          {{ String.fromCharCode(65 + index) }}
        </div>
        <div
          class="Question_sentence__MRV_k text-xl leading-6 pl-4 font-medium grow"
        >
          {{ answer.content }}
        </div>
      </div>
    </div>
    <audio
      ref="correctAudio"
      src="https://dinoenglish.app/assets/sound/correct.mp3"
      preload="auto"
      playsinline=""
      hidden=""
    ></audio>
    <audio
      ref="incorrectAudio"
      src="https://dinoenglish.app/assets/sound/incorrect.mp3"
      preload="auto"
      playsinline=""
      hidden=""
    ></audio>
  </div>
</template>

<style scoped></style>
