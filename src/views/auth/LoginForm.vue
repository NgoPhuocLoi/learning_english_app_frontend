<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import Spinner from "../../components/common/Spinner.vue";
import { AuthService } from "../../services";
import { useUserStore } from "../../store";

const authService = new AuthService();
const userStore = useUserStore();
const router = useRouter();

const email = ref("");
const password = ref("");
const loading = ref(false);
const errMsg = ref("");

watch([email, password], () => {
  errMsg.value = "";
});

const handleLogin = async () => {
  loading.value = true;
  errMsg.value = "";
  try {
    const res = await authService.login({
      email: email.value,
      password: password.value,
    });

    localStorage["token"] = res.data.metadata.tokens.accessToken;
    userStore.setUser(res.data.metadata.user);
    router.push("/");
  } catch (error) {
    errMsg.value =
      error.response?.status === 401
        ? "Sai tên đăng nhập hoặc mật khẩu"
        : "Lỗi Server! Vui lòng thử lại!";
    console.log(error);
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
        Đăng nhập
      </h1>
      <form class="space-y-4 md:space-y-6" @submit.prevent="handleLogin">
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
            required=""
            v-model="email"
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
            required=""
            v-model="password"
          />
        </div>
        <span class="text-[12px] text-red-500 err-msg block">{{ errMsg }}</span>
        <button
          type="submit"
          class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          <Spinner v-if="loading" />
          <span v-else>Đăng nhập</span>
        </button>
        <p class="text-sm font-light text-gray-500">
          Chưa có tài khoản?
          <RouterLink
            to="/xac-thuc/dang-ky"
            class="font-medium text-blue-600 hover:underline"
            >Đăng ký ngay</RouterLink
          >
        </p>
      </form>
    </div>
  </div>
</template>

<style>
.err-msg {
  margin-top: 7px !important;
  margin-bottom: -10px !important;
}
</style>
