<script setup>
const props = defineProps(["open"]);
const emit = defineEmits(["update:open"]);
</script>

<template>
  <div
    @click="emit('update:open', false)"
    :class="`fixed z-20 h-[100vh] w-[100vw] top-0 ${
      props.open ? 'bg-[rgba(0,0,0,.4)]' : 'bg-transparent pointer-events-none'
    }  duration-200 flex items-center justify-center`"
  >
    <div
      @click.stop
      :class="`${
        props.open ? 'animate-show-animation' : 'animate-hide-animation'
      }  z-50 bg-white duration-200 ease-out opacity-100 visible rounded-md h-auto w-[32rem] max-w-[90%] lg:p-8 md:p-[30px] p-7  flex-center flex-col`"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
