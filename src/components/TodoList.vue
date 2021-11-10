<script>
import TodoForm from "./TodoForm.vue";
import TodoItem from "./TodoItem.vue";

export default {
  components: {
    TodoForm,
    TodoItem,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      count: 0,
      list: [],
    };
  },
  created() {
    // init id increment to 0 if needed
    if (localStorage.getItem("todo-id-incrementer") === null) {
      localStorage.setItem("todo-id-incrementer", "-1");
    }
    const storedTodos = localStorage.getItem("todos");
    this.list = storedTodos ? JSON.parse(storedTodos) : [];

    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      this.count = state.todos;
    });

    this.$store.commit("editAmount", this.list.length);
  },
  beforeUnmount() {
    this.unsubscribe();
  },
  watch: {
    list() {
      this.updateStorage();
    },
  },
  methods: {
    stringifyDate(date) {
      return Intl.DateTimeFormat("nl-NL", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }).format(date);
    },
    updateStorage() {
      localStorage.setItem("todos", JSON.stringify(this.list));
    },
    clearStorage() {
      this.list = [];
      localStorage.removeItem("todo-id-incrementer");
      localStorage.removeItem("todos");
    },
    addItem(ev) {
      ev.preventDefault();
      localStorage.setItem(
        "todo-id-incrementer",
        parseFloat(localStorage.getItem("todo-id-incrementer")) + 1
      );
      const now = new Date();
      this.list = [
        {
          id: parseFloat(localStorage.getItem("todo-id-incrementer")),
          description: ev.target.elements.todoInput.value,
          date: this.stringifyDate(now),
        },
        ...this.list,
      ];
      this.$store.commit("increment");
    },
    updateItem(newItem) {
      const index = this.list.findIndex((item) => item.id === newItem.id);
      this.list[index].description = newItem.description;
      this.list[index].date = this.stringifyDate(new Date());
      this.updateStorage();
    },
    clearItem(id) {
      this.list = this.list.filter((item) => item.id !== id);
      this.$store.commit("decrement");
    },
  },
};
</script>

<template>
  <h1>{{ msg }}</h1>
  <button class="clear-btn" @click="clearStorage">Clear Storage</button>
  <span> Count: {{ count }}</span>
  <ul class="todo__list">
    <p v-if="list.length > 5">
      You may want to stop adding todo's, and start finishing some...
    </p>
    <TodoForm @add-todo="addItem"></TodoForm>
    <TodoItem
      v-for="item in list"
      @clear="clearItem"
      @update="updateItem"
      :key="item.id"
      :item="item"
    ></TodoItem>
  </ul>
</template>

<style scoped>
.clear-btn {
  text-align: center;
}

.todo__list {
  padding: 0;
}
</style>
