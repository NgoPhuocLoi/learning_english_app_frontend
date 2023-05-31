<script setup>
import TopicProgress from "../components/common/TopicProgress.vue";
</script>

<template>
  <div
    class="flex flex-col lg:flex-row lg:justify-between lg:gap-20 mt-4 lg:mt-10 items-start"
  >
    <div
      class="w-full lg:basis-1/4 shrink-0 mb-6 lg:mb-0 flex-center flex-col pt-8 flex items-center justify-center"
    >
      <img
        class="h-24 w-24 rounded-full block"
        src="https://dinoenglish.app/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa%2FAAcHTtcCv6l2Vr_P4INtU6HseJ8BaiHNCKDgMEv60UkHtQ%3Ds96-c&w=1920&q=75"
        alt=""
      />

      <div class="font-semibold text-xl text-center my-3">Lợi Ngô Phước</div>
    </div>

    <div class="overflow-hidden w-full lg:w-auto flex flex-col lg:grow">
      <div class="mb-6">
        <h3 class="text-2xl font-semibold text-gray-500 mb-2">Gần đây</h3>

        <div
          class="w-full max-w-full flex flex-nowrap gap-3 my-4 pb-2 overflow-auto custom-scrollbar"
        >
          <TopicProgress
            src="https://dinoenglish.app/_next/image?url=%2Fassets%2Fmedia%2Fcolor%2Fimage%2Fblue.png&w=1200&q=100"
            total="50"
            current="14"
          />
          <TopicProgress
            src="https://dinoenglish.app/_next/image?url=%2Fassets%2Fmedia%2Fcolor%2Fimage%2Fblue.png&w=1200&q=100"
            total="50"
            current="14"
          />
          <TopicProgress
            src="https://dinoenglish.app/_next/image?url=%2Fassets%2Fmedia%2Fcolor%2Fimage%2Fblue.png&w=1200&q=100"
            total="50"
            current="14"
          />
          <TopicProgress
            src="https://dinoenglish.app/_next/image?url=%2Fassets%2Fmedia%2Fcolor%2Fimage%2Fblue.png&w=1200&q=100"
            total="50"
            current="14"
          />

          <TopicProgress
            src="https://dinoenglish.app/_next/image?url=%2Fassets%2Fmedia%2Fcolor%2Fimage%2Fblue.png&w=1200&q=100"
            total="50"
            current="14"
          />
          <TopicProgress
            src="https://dinoenglish.app/_next/image?url=%2Fassets%2Fmedia%2Fcolor%2Fimage%2Fblue.png&w=1200&q=100"
            total="50"
            current="14"
          />
        </div>
      </div>

      <div class="mb-8">
        <h3 class="text-2xl font-semibold text-gray-500 mb-2">Tiến độ học</h3>

        <div class="text-[18px] flex justify-between items-center my-4">
          <h4 class="font-medium">Chủ đề đã hoàn thành</h4>
          <div class="text-blue-500 font-semibold">0<span>/30</span></div>
        </div>
        <div class="h-[1px] bg-gray-200"></div>
        <div class="text-[18px] flex justify-between items-center my-4">
          <h4 class="font-medium">Bài kiểm tra đã hoàn thành</h4>
          <div class="text-red-500 font-semibold">0<span>/3</span></div>
        </div>
      </div>

      <div>
        <h3 class="text-2xl font-semibold text-gray-500 mb-2">Tài khoản</h3>
        <div class="flex justify-between items-center my-4">
          <h4 class="text-[18px] font-medium">Email</h4>
          <div class="text-gray-500 font-semibold text-lg">
            phuocloi11223@gmail.com
          </div>
        </div>
        <div class="h-[1px] bg-gray-200"></div>
        <button
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
