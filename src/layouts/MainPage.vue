<script setup>
import { onMounted, ref } from "vue";
import HeaderNav from "../components/HeaderNav.vue";
import Dialog from "../components/common/Dialog.vue";
import TopicService from "../services/topic.service";
import { useTopicStore } from "../store";

const openModel = ref(false);

const topicService = new TopicService();
const topicStore = useTopicStore();

onMounted(async () => {
  const res = await topicService.getAllTopics();
  topicStore.setTopics(res.data.metadata.topics);
});
</script>

<template>
  <HeaderNav />

  <div
    class="lg:px-[160px] lg:py-[80px] md:px-[60px] md:py-[75px] md:pb-[60px] px-[21px] py-[70px] pb-[20px]"
  >
    <RouterView v-model:openModal="openModel" />
  </div>

  <Dialog v-model:open="openModel" />
</template>

<style scoped></style>
