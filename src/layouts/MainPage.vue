<script setup>
import { onMounted, ref } from "vue";
import HeaderNav from "../components/HeaderNav.vue";
import Dialog from "../components/common/Dialog.vue";
import TopicService from "../services/topic.service";
import { useTopicStore, useUserStore } from "../store";

const openModal = ref(false);
const openTestModalInfo = ref({
  title: "",
  desc: "",
  thumbnail: "",
  open: false,
  slug: "",
});

const topicService = new TopicService();
const topicStore = useTopicStore();
const userStore = useUserStore();

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
    <RouterView
      v-model:openModal="openModal"
      v-model:openTestModalInfo="openTestModalInfo"
    />
  </div>

  <Dialog v-model:open="openModal">
    <div class="mb-6 mx-auto w-24">
      <img :src="topicStore.chosenTopic?.thumbnailUrl" alt="" class="w-full" />
    </div>

    <div class="text-2xl font-semibold text-center mb-2">
      {{ topicStore.chosenTopic?.translatedTitle }}
    </div>

    <div class="text-lg text-center text-gray-500 mb-4">
      {{ topicStore.chosenTopic?.description }}
    </div>

    <div class="flex w-full gap-4">
      <RouterLink
        :to="`/${topicStore.chosenTopic?.slug}/hoc`"
        class="w-full mt-4 flex-center rounded-full bg-gradient-to-b from-blue-500 to-blue-300 hover:opacity-90 duration-100 text-white text-center text-lg uppercase py-3 cursor-pointer"
      >
        <span>Học</span>
      </RouterLink>

      <RouterLink
        :to="`/${topicStore.chosenTopic?.slug}/kiem-tra`"
        class="w-full mt-4 flex-center rounded-full bg-gradient-to-b from-red-500 to-red-300 hover:opacity-90 duration-100 text-white text-center text-lg uppercase py-3 cursor-pointer"
      >
        <span>Kiểm tra</span>
      </RouterLink>
    </div>
  </Dialog>

  <Dialog v-model:open="openTestModalInfo.open">
    <div class="mb-6 mx-auto w-24">
      <img :src="openTestModalInfo.thumbnail" alt="" class="w-full" />
    </div>

    <div class="text-2xl font-semibold text-center mb-2">
      {{ openTestModalInfo.title }}
    </div>

    <div class="text-lg text-center text-gray-500 mb-4">
      {{ openTestModalInfo.desc }}
    </div>

    <div class="flex w-full gap-4">
      <RouterLink
        v-if="userStore.user"
        :to="`/${openTestModalInfo.slug}/kiem-tra`"
        class="w-full mt-4 flex-center rounded-full bg-gradient-to-b from-red-500 to-red-300 hover:opacity-90 duration-100 text-white text-center text-lg uppercase py-3 cursor-pointer"
      >
        <span>Bắt đầu</span>
      </RouterLink>

      <RouterLink
        v-else
        :to="`/xac-thuc/dang-nhap`"
        class="w-full mt-4 flex-center rounded-full bg-gradient-to-b from-blue-500 to-blue-300 hover:opacity-90 duration-100 text-white text-center text-lg uppercase py-3 cursor-pointer"
      >
        <span>Vui lòng đăng nhập để tiếp tục</span>
      </RouterLink>
    </div>
  </Dialog>
</template>

<style scoped></style>
