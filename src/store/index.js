import { createPinia } from "pinia";

const pinia = createPinia();

export default pinia;
export { default as useTopicStore } from "./topic";
export { default as useQuestionStore } from "./question";
export { default as useUserStore } from "./user";
