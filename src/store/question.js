import { defineStore } from "pinia";
import { ref } from "vue";

const useQuestionStore = defineStore("question", () => {
  const questions = ref([]);

  const setQuestions = (payload) => {
    questions.value = payload;
  };

  return { questions, setQuestions };
});

export default useQuestionStore;
