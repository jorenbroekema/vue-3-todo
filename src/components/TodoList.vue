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
      /** @type {import('../types/Todo').Todo[]} */
      list: [],
    };
  },
  created() {
    // Make sure our count gets synced to state machine "todos" amount when it changes
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      this.count = state.todos;
    });

    this.fetchTodos();
  },
  beforeUnmount() {
    // Teardown the state change subscription
    this.unsubscribe();
  },
  methods: {
    // GET (Read)
    async fetchTodos() {
      const resp = await fetch("http://localhost:5000/todos");
      this.list = await resp.json();

      // Store amount of todos in state machine to show on other pages
      // without having to re-fetch the todos from the API
      this.$store.commit("editAmount", this.list.length);
    },
    // POST (Create)
    async addItem(ev) {
      ev.preventDefault();
      await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          value: ev.target.elements.todo.value,
        }),
      });

      this.fetchTodos();
    },
    // PATCH (Update)
    async updateItem(newItem) {
      await fetch(`http://localhost:5000/todos/${newItem.id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          value: newItem.value,
        }),
      });

      this.fetchTodos();
    },
    // DELETE (Delete)
    async clearItem(id) {
      await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });

      this.fetchTodos();
    },
  },
};
</script>

<template>
  <h1>{{ msg }}</h1>
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
