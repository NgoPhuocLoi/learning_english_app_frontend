import { defineStore } from "pinia";
import { ref } from "vue";

const useTopicStore = defineStore("topic", () => {
  const topics = ref([]);
  const chosenTopic = ref(null);

  const setTopics = (payload) => {
    topics.value = payload;
  };

  const setChosenTopic = (payload) => {
    chosenTopic.value = payload;
  };

  return { topics, setTopics, chosenTopic, setChosenTopic };
});

export default useTopicStore;
