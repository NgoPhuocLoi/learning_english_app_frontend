<script setup>
const props = defineProps(["src", "done", "onClickHandler", "disabled"]);
</script>

<template>
  <div
    @click="props.onClickHandler"
    :class="`${props.onClickHandler ? 'cursor-pointer' : ''}`"
    class="relative h-[72px] w-[72px] flex items-center shrink-0 justify-center"
  >
    <svg
      class="CircularProgressbar w-full"
      viewBox="0 0 100 100"
      data-test-id="CircularProgressbar"
      v-if="props.done"
    >
      <path
        class="CircularProgressbar-trail"
        d="
      M 50,50
      m 0,-48
      a 48,48 0 1 1 0,96
      a 48,48 0 1 1 0,-96
    "
        stroke-width="4"
        fill-opacity="0"
        stroke-linecap="round"
        style="
          stroke: rgb(201, 198, 198);
          stroke-dasharray: 300px, 300px;
          stroke-dashoffset: 0px;
        "
      ></path>
      <path
        class="CircularProgressbar-path"
        d="
      M 50,50
      m 0,-48
      a 48,48 0 1 1 0,96
      a 48,48 0 1 1 0,-96
    "
        stroke-width="4"
        fill-opacity="0"
        stroke-linecap="round"
        :style="`
          stroke: green;
          transition-duration: 1.5s;
          stroke-dasharray: 300px, 300px;
          stroke-dashoffset: 0;
        `"
      ></path>
    </svg>

    <img
      :src="props.src"
      :class="`${
        done ? 'w-[80%] h-[80%]' : 'w-[100%] h-[100%]'
      }bg-red-500 absolute rounded-full ${props.disabled ? 'grayscale-0' : ''}`"
    />
  </div>
</template>

<style scoped></style>
