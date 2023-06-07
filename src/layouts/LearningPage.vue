<script setup>
import { onMounted, ref, shallowRef } from "vue";
import { useRoute } from "vue-router";
import PopupNotification from "../components/common/PopupNotification.vue";
import { QuestionType1, QuestionType2 } from "../components/learning";
import { QuestionService, TopicService, UserService } from "../services";
import icons from "../static/icons";
import { useQuestionStore, useTopicStore, useUserStore } from "../store";
import finishAudio from "../static/finish_lesson_pass.flac";

const topicStore = useTopicStore();
const questionStore = useQuestionStore();
const userStore = useUserStore();
const route = useRoute();
const topicService = new TopicService();
const questionService = new QuestionService();
const userService = new UserService();

const ansStatusStyle = {
  border: {
    true: "border-green-500",
    false: "border-red-500",
  },
  bg: {
    true: "bg-green-500",
    false: "bg-red-500",
  },
};

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

  if (userStore.user) {
    await userService.updateProgress({
      topicId: topicStore.chosenTopic.id,
      completed: false,
    });
  }
});

const type = ref(1);
const currentQues = ref(0);
const Question = shallowRef({
  1: QuestionType1,
  2: QuestionType2,
  3: QuestionType2,
});
const showInfo = ref({
  show: false,
  correct: true,
});

const onClickNextQuestion = () => {
  showInfo.value = { show: false, correct: true };
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
        {{
          currentQues + 1 > questionStore.questions.length
            ? questionStore.questions.length
            : currentQues + 1
        }}/{{ questionStore.questions.length }}
      </div>
    </div>
    <component
      v-if="currentQues < questionStore.questions?.length"
      :is="Question[questionStore.questions[currentQues]?.type]"
      v-model:showInfo="showInfo"
      :question="questionStore.questions[currentQues]"
      :ansStatusStyle="ansStatusStyle"
    />

    <div v-else>
      <div class="flex items-center justify-center flex-col py-[100px]">
        <div class="w-[120px]">
          <img :src="topicStore.chosenTopic?.thumbnailUrl" alt="" />
        </div>

        <div class="font-medium text-2xl mt-8 text-center">
          Chúc mừng! Bạn đã học xong chủ đề này!
        </div>

        <audio :src="finishAudio" autoplay></audio>
      </div>
    </div>
    <div class="px-0 lg:px-8 z-30 mb-4">
      <button
        v-if="currentQues < questionStore.questions?.length"
        @click="onClickNextQuestion"
        :class="`text-center text-xl rounded-full cursor-pointer font-semibold py-2 w-full duration-300 ease-out bg-gray-200 ${
          showInfo.show ? 'text-blue-500' : 'text-gray-400 pointer-events-none'
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
    :showInfo="showInfo"
    :question="questionStore.questions[currentQues]"
  />

  <div class="fixed top-5 right-6 flex gap-3">
    <RouterLink to="/" class="p-[10px] cursor-pointer rounded-full bg-gray-200">
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
