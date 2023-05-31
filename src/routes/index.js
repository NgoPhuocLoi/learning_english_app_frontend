import { createRouter, createWebHistory } from "vue-router";
import { MainPage, LearningPage } from "../layouts";
import { Home, Profile } from "../views";
const routes = [
  {
    path: "/",
    component: MainPage,
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
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
