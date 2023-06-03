<script setup>
import { onMounted, ref, shallowRef } from "vue";
import { useRoute } from "vue-router";
import PopupNotification from "../components/common/PopupNotification.vue";
import { QuestionType1, QuestionType2 } from "../components/learning";
import { QuestionService, TopicService } from "../services";
import icons from "../static/icons";
import { useQuestionStore, useTopicStore } from "../store";

const topicStore = useTopicStore();
const questionStore = useQuestionStore();
const route = useRoute();
const topicService = new TopicService();
const questionService = new QuestionService();

onMounted(async () => {
  if (!topicStore.chosenTopic) {
    console.log("Fetch");
    const res = await topicService.getAllTopics();
    const currentTopic = res.data.metadata.topics.find(
      (tp) => tp.slug === route.params.topic
    );
    topicStore.setChosenTopic(currentTopic);
  }

  const res = await questionService.getAllQuestions(topicStore.chosenTopic.id);

  questionStore.setQuestions(res.data.metadata.questions);

  console.log(res.data.metadata.questions);
});

const type = ref(1);
const currentQues = ref(0);
const Question = shallowRef({
  1: QuestionType1,
  2: QuestionType2,
  3: QuestionType2,
});
const show = ref(false);

const onClickNextQuestion = () => {
  show.value = false;
  setTimeout(() => {
    currentQues.value++;
  }, 300);
};
</script>

<template>
  <div
    class="lg:px-[320px] pt-[24px] md:px-[90px] px-7 h-[100vh] flex flex-col"
  >
    <div class="flex items-center justify-between">
      <h3 class="text-xl font-bold bg-gray-100 px-4 py-2 rounded-full shadow">
        {{ topicStore.chosenTopic?.translatedTitle }}
      </h3>
      <div class="text-xl mr-16 lg:mr-0 font-semibold text-gray-500">
        {{ currentQues + 1 }}/{{ questionStore.questions.length }}
      </div>
    </div>
    <component
      v-if="currentQues < topicStore.chosenTopic?.totalQuestions"
      :is="Question[questionStore.questions[currentQues]?.type]"
      v-model:show="show"
      :question="questionStore.questions[currentQues]"
    />

    <div v-else>
      <div class="flex items-center justify-center flex-col py-[100px]">
        <div class="w-[120px]">
          <img :src="topicStore.chosenTopic?.thumbnailUrl" alt="" />
        </div>

        <div class="font-medium text-2xl mt-8 text-center">
          Chúc mừng! Bạn đã hoàn thành chủ đề này!
        </div>
      </div>
    </div>
    <div class="px-0 lg:px-8 z-30 mb-4">
      <button
        v-if="currentQues < topicStore.chosenTopic?.totalQuestions"
        @click="onClickNextQuestion"
        :class="`text-center text-xl rounded-full cursor-pointer font-semibold py-2 w-full duration-300 ease-out bg-gray-200 ${
          show ? 'text-blue-500' : 'text-gray-400 pointer-events-none'
        }`"
      >
        Tiếp theo
      </button>

      <RouterLink
        v-else
        to="/"
        class="block text-center text-xl rounded-full cursor-pointer font-medium py-2 w-full duration-300 ease-out bg-blue-500 text-white hover:opacity-90"
      >
        Kết thúc
      </RouterLink>
    </div>
  </div>

  <PopupNotification
    :show="show"
    :question="questionStore.questions[currentQues]"
  />

  <div class="fixed top-5 right-6 flex gap-3">
    <div class="p-2 md:p-[10px] cursor-pointer rounded-full bg-gray-200">
      <img :src="icons.menu" alt="" class="md:w-[26px] w-[22px]" />
    </div>
    <RouterLink
      to="/"
      class="p-[10px] cursor-pointer rounded-full bg-gray-200 hidden lg:block"
    >
      <img :src="icons.filledHome" alt="" class="w-[26px]" />
    </RouterLink>
  </div>
</template>

<style>
.question-header {
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
}
</style>
