import { createRouter, createWebHistory } from "vue-router";
import { MainPage, LearningPage, AuthPage, TestingPage } from "../layouts";
import { Home, Profile } from "../views";
import { LoginForm, RegisterForm } from "../views/auth";
import store, { useUserStore } from "../store";
import { UserService } from "../services";

const userStore = useUserStore(store);
const userService = new UserService();

const routes = [
  {
    path: "/xac-thuc",
    beforeEnter: (to, from, next) => {
      const token = localStorage["token"] || document.cookie.split("=")[1];
      if (token) next("/");
      next();
    },
    component: AuthPage,
    children: [
      {
        path: "dang-nhap",
        component: LoginForm,
      },
      {
        path: "dang-ky",
        component: RegisterForm,
      },
    ],
  },
  {
    path: "/",
    component: MainPage,
    beforeEnter: async (to, from, next) => {
      const token = localStorage["token"] || document.cookie.split("=")[1];
      if (!token) next();
      const res = await userService.getCurrentUser();
      userStore.setUser(res.data.metadata.user);
      next();
    },
    children: [
      {
        path: "",
        component: Home,
      },
      {
        path: "ho-so",
        component: Profile,
      },
    ],
  },
  {
    path: "/:topic/hoc",
    component: LearningPage,
  },
  {
    path: "/:topic/kiem-tra",
    component: TestingPage,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
