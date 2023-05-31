<script setup>
const props = defineProps(["src", "total", "current"]);
</script>

<template>
  <div
    class="relative h-[72px] w-[72px] flex items-center shrink-0 justify-center"
  >
    <svg
      class="CircularProgressbar w-full"
      viewBox="0 0 100 100"
      data-test-id="CircularProgressbar"
      v-if="+current > 0"
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
          stroke: blue;
          transition-duration: 1.5s;
          stroke-dasharray: 300px, 300px;
          stroke-dashoffset: ${300 * (1 - current / total)}px;
        `"
      ></path>
    </svg>

    <img
      :src="props.src"
      :class="`${
        +current > 0 ? 'w-[80%] h-[80%]' : 'w-[100%] h-[100%]'
      }bg-red-500 absolute rounded-full`"
    />
  </div>
</template>

<style scoped></style>
