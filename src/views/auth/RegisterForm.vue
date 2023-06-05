<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import Spinner from "../../components/common/Spinner.vue";
import { AuthService } from "../../services";

const authService = new AuthService();
const router = useRouter();

const email = ref("");
const name = ref("");
const password = ref("");
const confirmPassword = ref("");
const loading = ref(false);
const errMsg = ref("");

watch([email, name, password, confirmPassword], () => {
  errMsg.value = "";
});

const handleRegister = async () => {
  loading.value = true;
  try {
    if (!name.value.trim()) return (errMsg.value = "Vui lòng nhập tên hợp lệ!");
    if (password.value.trim().length < 8)
      return (errMsg.value = "Mật khẩu ít nhất 8 ký tự");
    if (password.value !== confirmPassword.value)
      return (errMsg.value = "Nhập lại mật khẩu không khớp!");

    await authService.register({
      email: email.value,
      name: name.value,
      password: password.value,
    });
    await router.push("/xac-thuc/dang-nhap");
  } catch (error) {
    if (error.response?.status === 400) {
      errMsg.value = "Email đã được sử dụng! Vui lòng nhập email khác!";
    } else {
      errMsg.value = "Lỗi Server! Vui lòng thử lại!";
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="w-full bg-white rounded-lg shadow-lg md:mt-0 sm:max-w-md xl:p-0">
    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1
        class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"
      >
        Đăng ký
      </h1>
      <form class="space-y-4 md:space-y-6" @submit.prevent="handleRegister">
        <div>
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900"
            >Email</label
          >
          <input
            type="email"
            name="email"
            id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
            placeholder="user@gmail.com"
            required="true"
            v-model="email"
          />
        </div>
        <div>
          <label for="name" class="block mb-2 text-sm font-medium text-gray-900"
            >Tên của bạn</label
          >
          <input
            type="text"
            name="name"
            id="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
            placeholder="Nguyễn Văn A"
            required="true"
            v-model="name"
          />
        </div>
        <div>
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900"
            >Mật khẩu</label
          >
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
            required="true"
            v-model="password"
          />
        </div>

        <div>
          <label
            for="confirmPassword"
            class="block mb-2 text-sm font-medium text-gray-900"
            >Nhập lại mật khẩu</label
          >
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="••••••••"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
            required="true"
            v-model="confirmPassword"
          />
        </div>
        <span class="text-[12px] text-red-500 err-msg block">{{ errMsg }}</span>

        <button
          type="submit"
          class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          <Spinner v-if="loading" />
          <span v-else>Đăng ký</span>
        </button>
        <p class="text-sm font-light text-gray-500">
          Đã có tài khoản?
          <RouterLink
            to="/xac-thuc/dang-nhap"
            class="font-medium text-blue-600 hover:underline"
            >Đăng nhập ngay</RouterLink
          >
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
