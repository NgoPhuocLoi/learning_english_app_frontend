<script setup>
import { onMounted, ref, shallowRef, computed, watch } from "vue";
import { useRoute } from "vue-router";
import PopupNotification from "../components/common/PopupNotification.vue";
import { QuestionType1, QuestionType2 } from "../components/learning";
import { QuestionService, TopicService, UserService } from "../services";
import icons from "../static/icons";
import { useQuestionStore, useTopicStore, useUserStore } from "../store";
import finishAudioPass from "../static/finish_lesson_pass.flac";
import finishAudioFail from "../static/finish_lesson_fail.mp3";

const topicStore = useTopicStore();
const questionStore = useQuestionStore();
const userStore = useUserStore();
const route = useRoute();
const topicService = new TopicService();
const questionService = new QuestionService();
const userService = new UserService();

const chosenAns = ref(null);
const correctAudio = ref();
const incorrectAudio = ref();

let intervalId;

const ansStatusStyle = {
  border: {
    true: "border-blue-500",
    false: "border-blue-500",
  },
  bg: {
    true: "bg-blue-500",
    false: "bg-blue-500",
  },
};

const timer = ref(30);
const numCorrect = ref(0);
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

onMounted(async () => {
  if (!topicStore.chosenTopic) {
    const res = await topicService.getAllTopics();
    const currentTopic = res.data.metadata.topics.find(
      (tp) => tp.slug === route.params.topic
    );
    topicStore.setChosenTopic(currentTopic);
  }

  if (topicStore.chosenTopic.test) {
    const res = await questionService.getAllQuestionsOfTest(
      topicStore.chosenTopic.level
    );

    questionStore.setQuestions(res.data.metadata.questions);
  } else {
    const res = await questionService.getAllQuestions(
      topicStore.chosenTopic.id
    );

    questionStore.setQuestions(res.data.metadata.questions);
  }

  intervalId = setInterval(() => {
    timer.value--;
    if (
      timer.value === 0 &&
      currentQues.value < questionStore.questions.length
    ) {
      handleCheckAns();
    }
  }, 1000);
});

watch(currentQues, async () => {
  if (currentQues.value === questionStore.questions.length) {
    clearInterval(intervalId);
    if (userStore.user)
      try {
        await userService.updateProgress({
          topicId: topicStore.chosenTopic.id,
          completed:
            numCorrect.value >= Math.ceil(0.8 * questionStore.questions.length),
        });

        if (
          numCorrect.value >= Math.ceil(0.8 * questionStore.questions.length)
        ) {
          await userService.updateLevel({
            currentLevel: userStore.user.current_level,
          });
        }
      } catch (error) {
        console.log(error);
      }
  }
});

const onClickNextQuestion = () => {
  showInfo.value = {
    show: false,
    correct: true,
  };
  chosenAns.value = null;
  setTimeout(() => {
    currentQues.value++;
    timer.value = 30;
    intervalId = setInterval(() => {
      timer.value--;
      if (
        timer.value === 0 &&
        currentQues.value < questionStore.questions.length
      ) {
        handleCheckAns();
      }
    }, 1000);
  }, 300);
};

const handleCheckAns = () => {
  clearInterval(intervalId);
  if (chosenAns.value && chosenAns.value.isCorrect) numCorrect.value++;
  showInfo.value = {
    show: true,
    correct: chosenAns.value ? chosenAns.value.isCorrect : false,
  };
  if (!chosenAns.value || !chosenAns.value.isCorrect) {
    if (incorrectAudio.value) incorrectAudio.value.play();
  } else correctAudio.value.play();
};
</script>

<template>
  <div
    class="lg:px-[320px] pt-[24px] md:px-[90px] px-7 h-[100vh] flex flex-col"
  >
    <div class="flex items-center justify-between">
      <h3
        class="text-xl font-bold bg-gray-100 px-4 py-2 rounded-full shadow hidden md:block"
      >
        {{ topicStore.chosenTopic?.translatedTitle }}
      </h3>
      <div
        class="text-3xl font-semibold text-red-500"
        v-if="currentQues < questionStore.questions.length"
      >
        {{ timer }}
      </div>
      <div class="text-xl mr-16 lg:mr-0 font-semibold text-gray-500">
        {{
          currentQues + 1 > questionStore.questions.length
            ? questionStore.questions.length
            : currentQues + 1
        }}/{{ questionStore.questions.length }}
      </div>
    </div>
    <component
      v-if="currentQues < questionStore.questions.length"
      :is="Question[questionStore.questions[currentQues]?.type]"
      v-model:showInfo="showInfo"
      :question="questionStore.questions[currentQues]"
      :testing="true"
      :ansStatusStyle="ansStatusStyle"
      v-model:chosenAns="chosenAns"
    />

    <div v-else>
      <div class="flex items-center justify-center flex-col py-[100px]">
        <div class="mb-10 mt-[-50px] flex gap-10 font-semibold text-2xl">
          <div class="text-red-500 text-center">
            <div>Sai</div>
            <div class="font-normal">
              {{ questionStore.questions.length - numCorrect }}/{{
                questionStore.questions.length
              }}
            </div>
          </div>

          <div class="text-green-500 text-center">
            <div>Đúng</div>
            <div class="font-normal">
              {{ numCorrect }}/{{ questionStore.questions.length }}
            </div>
          </div>
        </div>
        <div class="w-[120px]">
          <img :src="topicStore.chosenTopic?.thumbnailUrl" alt="" />
        </div>

        <div class="font-medium text-2xl mt-8 text-center">
          {{
            numCorrect >= Math.ceil(0.8 * questionStore.questions.length)
              ? "Chúc mừng! Bạn đã vượt qua chủ đề này!"
              : `Rất tiếc, bạn chưa vượt qua bài kiểm tra này. Bạn phải đúng ít nhất ${Math.ceil(
                  0.8 * questionStore.questions.length
                )} câu để vượt bài kiểm tra này`
          }}
        </div>

        <audio
          :src="
            numCorrect >= Math.ceil(0.8 * questionStore.questions.length)
              ? finishAudioPass
              : finishAudioFail
          "
          autoplay
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
    <audio
      ref="incorrectAudio"
      preload="auto"
      src="https://dinoenglish.app/assets/sound/incorrect.mp3"
      playsinline=""
      hidden=""
    ></audio>
    <div class="px-0 lg:px-8 z-30 mb-4">
      <div v-if="currentQues < questionStore.questions?.length">
        <button
          v-if="!showInfo.show"
          @click="handleCheckAns"
          :class="`text-center text-xl rounded-full cursor-pointer font-semibold py-2 w-full duration-300 ease-out ${
            chosenAns
              ? 'text-white bg-blue-500'
              : 'text-gray-400 pointer-events-none bg-gray-200 '
          }`"
        >
          Kiểm tra
        </button>

        <button
          v-else
          @click="onClickNextQuestion"
          :class="`text-center text-xl rounded-full cursor-pointer font-semibold py-2 w-full duration-300 ease-out bg-gray-200 ${
            chosenAns
              ? chosenAns.isCorrect
                ? 'text-green-500'
                : 'text-red-500'
              : 'text-red-500'
          }`"
        >
          Tiếp theo
        </button>
      </div>

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
    :testing="true"
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
