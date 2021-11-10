import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import { createStore } from "vuex";
import App from "./App.vue";
import TodoList from "./components/TodoList.vue";
import About from "./components/About.vue";

const routes = [
  {
    path: "/",
    component: TodoList,
    props: { msg: "My Todo List" },
  },
  { path: "/about", component: About },
];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

// Create a new store instance.
const store = createStore({
  state() {
    return {
      todos: 0,
    };
  },
  mutations: {
    increment(state) {
      state.todos++;
    },
    decrement(state) {
      state.todos--;
    },
    editAmount(state, amount) {
      state.todos = amount;
    },
  },
});

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
