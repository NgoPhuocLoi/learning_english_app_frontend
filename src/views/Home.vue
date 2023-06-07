<script setup>
import { computed } from "vue";
import TopicProgress from "../components/common/TopicProgress.vue";
import TopicItem from "../components/home/TopicItem.vue";
import topics from "../data/topics.json";
import icons from "../static/icons";
import { useTopicStore, useUserStore } from "../store";

const props = defineProps(["openModal"]);
const emit = defineEmits("update:openModal", "update:openTestModalInfo");
const topicStore = useTopicStore();
const userStore = useUserStore();

const onOpenModel = (topic) => {
  topicStore.setChosenTopic(topic);
  emit("update:openModal", true);
};

const onOpenTestModel = (topic) => {
  topicStore.setChosenTopic(null);
  emit("update:openTestModalInfo", topic);
};

const completedTopic = computed(
  () => userStore.user?.topicsDone.filter((t) => t.completed && !t.test).length
);

const completedTest = computed(
  () => userStore.user?.topicsDone.filter((t) => t.completed && t.test).length
);
</script>

<template>
  <div class="flex gap-7 justify-between h-[300px]">
    <div class="grow">
      <h2 class="my-4 font-bold text-[28px]">Chủ đề</h2>

      <div>
        <div class="flex items-center my-6 true">
          <h3 class="font-semibold text-2xl text-gray-500 mr-2">Sơ cấp</h3>
        </div>

        <div>
          <TopicItem
            v-for="topic in topicStore.topics.filter(
              (topic) => topic.level === 1 && topic.index !== null
            )"
            :key="topic.id"
            :title="topic.translatedTitle"
            :desc="topic.description"
            :thumb-url="topic.thumbnailUrl"
            @click="onOpenModel(topic)"
            :done="
              userStore.user?.topicsDone.find((t) => t.id === topic.id)
                ?.completed
            "
          />

          <div
            @click="
              () =>
                onOpenTestModel({
                  title: 'Kiểm tra sơ cấp',
                  desc: 'Luyện tập tất cả những gì đã học ở mức độ Sơ cấp',
                  thumbnail: icons.level1,
                  open: true,
                  slug: 'kiem-tra-so-cap',
                })
            "
            class="w-full mb-6 h-28 py-3 px-5 hover:scale-[101%] duration-100 ease-out bg-gradient-to-r from-blue-500 to-red-200 shadow-sm hover:shadow-md mt-6 rounded-lg flex justify-between items-center gap-2 cursor-pointer"
          >
            <div class="h-full flex items-center">
              <div class="bg-white p-2 rounded-full h-full aspect-square w-min">
                <div class="h-full w-full relative shrink-0 grow-0">
                  <img :src="icons.level1" alt="" />
                </div>
              </div>
              <div class="text-white text-xl ml-4 grow">Kiểm tra Sơ cấp</div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="flex flex-col justify-center my-6 true">
          <h3 class="font-semibold text-2xl text-gray-500 mr-2">Trung cấp</h3>
          <span
            v-if="userStore.user?.current_level < 2"
            class="text-sm mt-2 text-gray-500"
            >(Hoàn thành bài kiểm tra sơ cấp để mở khóa các chủ đề tiếp theo
            )</span
          >
        </div>

        <div>
          <TopicItem
            v-for="topic in topicStore.topics.filter(
              (topic) => topic.level === 2 && topic.index !== null
            )"
            :key="topic.id"
            :title="topic.translatedTitle"
            :desc="topic.description"
            :thumb-url="topic.thumbnailUrl"
            @click="onOpenModel(topic)"
            :disabled="
              userStore.user
                ? userStore.user?.current_level < topic.level
                : true
            "
          />

          <div
            :class="`${
              !userStore.user || userStore.user?.current_level < 2
                ? 'grayscale pointer-events-none'
                : ''
            } `"
            class="w-full mb-6 h-28 py-3 px-5 hover:scale-[101%] duration-100 ease-out bg-gradient-to-r from-blue-500 to-red-200 shadow-sm hover:shadow-md mt-6 rounded-lg flex justify-between items-center gap-2 cursor-pointer"
          >
            <div class="h-full flex items-center">
              <div class="bg-white p-2 rounded-full h-full aspect-square w-min">
                <div class="h-full w-full relative shrink-0 grow-0">
                  <img :src="icons.level2" alt="" />
                </div>
              </div>
              <div class="text-white text-xl ml-4 grow">Kiểm tra Trung cấp</div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="flex flex-col justify-center my-6 true">
          <h3 class="font-semibold text-2xl text-gray-500 mr-2">Cao cấp</h3>
          <span
            v-if="userStore.user?.current_level < 3"
            class="text-sm mt-2 text-gray-500"
            >(Hoàn thành bài kiểm tra trung cấp để mở khóa các chủ đề tiếp theo
            )</span
          >
        </div>

        <div>
          <TopicItem
            v-for="topic in topicStore.topics.filter(
              (topic) => topic.level === 3 && topic.index !== null
            )"
            :key="topic.id"
            :title="topic.translatedTitle"
            :desc="topic.description"
            :thumb-url="topic.thumbnailUrl"
            :disabled="
              userStore.user
                ? userStore.user?.current_level < topic.level
                : true
            "
            @click="onOpenModel(topic)"
          />

          <div
            :class="`${
              !userStore.user || userStore.user?.current_level < 3
                ? 'grayscale pointer-events-none'
                : ''
            } `"
            class="w-full mb-6 h-28 py-3 px-5 hover:scale-[101%] duration-100 ease-out bg-gradient-to-r from-blue-500 to-red-200 shadow-sm hover:shadow-md mt-6 rounded-lg flex justify-between items-center gap-2 cursor-pointer"
          >
            <div class="h-full flex items-center">
              <div class="bg-white p-2 rounded-full h-full aspect-square w-min">
                <div class="h-full w-full relative shrink-0 grow-0">
                  <img :src="icons.level3" alt="" />
                </div>
              </div>
              <div class="text-white text-xl ml-4 grow">Kiểm tra Cao cấp</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="userStore.user" class="w-[354px] hidden lg:block">
      <div class="py-4 px-5 border-2 border-gray-200 rounded-xl mt-4">
        <div class="mb-2 flex items-center justify-between">
          <span class="text-[18px] font-semibold">Gần đây</span
          ><RouterLink
            to="/ho-so"
            class="text-sm text-gray-500 hover:text-gray-700 duration-75 cursor-pointer"
            >Xem tất cả</RouterLink
          >
        </div>

        <div class="flex gap-2">
          <TopicProgress
            v-for="topicDone in userStore.user?.topicsDone
              .filter((topic) => !topic.test)
              .slice(0, 4)"
            :key="topicDone.id"
            :src="topicDone.thumbnailUrl"
            :done="topicDone.completed"
            :on-click-handler="() => onOpenModel(topicDone)"
          />

          <span
            class="text-gray-500"
            v-if="
              userStore.user?.topicsDone.filter((topic) => !topic.test)
                .length === 0
            "
          >
            Bạn không học chủ đề nào gần đây</span
          >
        </div>
      </div>

      <div class="py-4 px-5 border-2 border-gray-200 rounded-xl mt-4">
        <div class="mb-2 flex items-center justify-between">
          <span class="text-[18px] font-semibold">Tiến độ học</span>
        </div>

        <div class="my-2 flex justify-between">
          <div class="text-gray-500">Chủ đề đã hoàn thành</div>
          <div class="text-blue-500 font-semibold">{{ completedTopic }}/30</div>
        </div>
        <div class="my-2 flex justify-between">
          <div class="text-gray-500">Bài kiểm tra đã hoàn thành</div>
          <div class="text-red-500 font-semibold">{{ completedTest }}/3</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
