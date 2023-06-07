<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import TopicProgress from "../components/common/TopicProgress.vue";
import defaultAvatar from "../static/default_avatar.png";
import { useUserStore, useTopicStore } from "../store";

const userStore = useUserStore();
const topicStore = useTopicStore();
const router = useRouter();
const emit = defineEmits(["update:openModal"]);

const handleLogout = () => {
  localStorage.removeItem("token");
  document.cookie = "token=";
  userStore.setUser(null);
};

const onOpenModel = (topic) => {
  topicStore.setChosenTopic(topic);
  emit("update:openModal", true);
};

const completedTopic = computed(
  () => userStore.user?.topicsDone.filter((t) => t.completed && !t.test).length
);

const completedTest = computed(
  () => userStore.user?.topicsDone.filter((t) => t.completed && t.test).length
);
</script>

<template>
  <div v-if="!userStore.user" class="mt-10">
    <img
      class="h-24 w-24 rounded-full block mx-auto"
      :src="defaultAvatar"
      alt=""
    />

    <div class="text-center my-3">
      <RouterLink to="/xac-thuc/dang-nhap" class="text-blue-500 font-semibold"
        >Đăng nhập</RouterLink
      >
      để lưu tiến độ học tập và làm nhiều chủ đề hơn.
    </div>
  </div>

  <div
    v-else
    class="flex flex-col lg:flex-row lg:justify-between lg:gap-20 mt-4 lg:mt-10 items-start"
  >
    <div
      class="w-full lg:basis-1/4 shrink-0 mb-6 lg:mb-0 flex-center flex-col pt-8 flex items-center justify-center"
    >
      <div
        class="w-[100px] h-[100px] bg-gray-500 leading-none flex-shrink-0 rounded-full flex justify-center items-center text-5xl text-white"
      >
        {{ userStore.user.name.split(" ").at(-1)[0].toUpperCase() }}
      </div>

      <div class="font-semibold text-xl text-center my-3">
        {{ userStore.user.name }}
      </div>
    </div>

    <div class="overflow-hidden w-full lg:w-auto flex flex-col lg:grow">
      <div class="mb-6">
        <h3 class="text-2xl font-semibold text-gray-500 mb-2">Gần đây</h3>

        <div
          class="w-full max-w-full flex flex-nowrap gap-3 my-4 pb-2 overflow-auto custom-scrollbar"
        >
          <TopicProgress
            v-for="topicDone in userStore.user?.topicsDone.filter(
              (topic) => !topic.test
            )"
            :key="topicDone.id"
            :src="topicDone.thumbnailUrl"
            :done="topicDone.completed"
            :on-click-handler="() => onOpenModel(topicDone)"
          />
        </div>
      </div>

      <div class="mb-8">
        <h3 class="text-2xl font-semibold text-gray-500 mb-2">Tiến độ học</h3>

        <div class="text-[18px] flex justify-between items-center my-4">
          <h4 class="font-medium">Chủ đề đã hoàn thành</h4>
          <div class="text-blue-500 font-semibold">
            {{ completedTopic }}<span>/30</span>
          </div>
        </div>
        <div class="h-[1px] bg-gray-200"></div>
        <div class="text-[18px] flex justify-between items-center my-4">
          <h4 class="font-medium">Bài kiểm tra đã hoàn thành</h4>
          <div class="text-red-500 font-semibold">
            {{ completedTest }}<span>/3</span>
          </div>
        </div>
      </div>

      <div>
        <h3 class="text-2xl font-semibold text-gray-500 mb-2">Tài khoản</h3>
        <div class="flex justify-between items-center my-4">
          <h4 class="text-[18px] font-medium">Email</h4>
          <div class="text-gray-500 font-semibold text-lg">
            {{ userStore.user.email }}
          </div>
        </div>
        <div class="h-[1px] bg-gray-200"></div>
        <button
          @click="handleLogout"
          class="text-[18px] font-medium my-4 bg-red-500 text-white px-3 py-2 rounded-md hover:opacity-80"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  height: 4px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}
</style>
