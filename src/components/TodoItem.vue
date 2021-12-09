<script>
export default {
  props: {
    item: Object,
    date: Date,
  },
  computed: {
    computedItem() {
      return {
        ...this.item,
        id: this.item.id++
      }
    }
  },
  methods: {
    edit(ev) {
      this.$emit("update", {
        id: this.item.id,
        value: ev.target.innerText,
      });
    },
  },
  emits: ["clear", "update"],
};
</script>

<template>
  <div class="todo__container">
    <p contenteditable @blur="edit" class="todo__text">
      {{ item.value }}
    </p>
    <input @change="$emit('clear', this.computedItem.id)" type="checkbox" />
  </div>
</template>

<style scoped>
.todo__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 400px;
  padding: 1rem 2rem;
  margin: 1rem auto;
  border-radius: 1rem;
  background-color: lightgreen;
}

.todo__date > p {
  margin: 0;
}
</style>
