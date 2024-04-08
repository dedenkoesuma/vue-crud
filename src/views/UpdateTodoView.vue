<template>
    <div>
      <h1>Edit Todo</h1>
      <form @submit.prevent="submitUpdateTodo">
        <div>
          <label for="title">Title:</label>
          <input type="text" id="title" v-model="todo.title">
        </div>
        <div>
          <label for="completed">Completed:</label>
          <input type="checkbox" id="completed" v-model="todo.completed">
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  </template>
  
  <script>
  import { mapState, mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        todoId: null,
        todo: {
          title: '',
          completed: false
        }
      };
    },
    computed: {
      ...mapState(['todos'])
    },
    methods: {
      ...mapActions(['fetchTodos', 'updateTodo']), 
  
      loadTodo() {
        this.todoId = this.$route.params.id;
        const foundTodo = this.todos.find(todo => todo.id === parseInt(this.todoId));
        if (foundTodo) {
          this.todo = { ...foundTodo };
        } else {
          console.error(`Todo dengan id ${this.todoId} tidak ditemukan`);
        }
      },
      submitUpdateTodo() {
        this.updateTodo(this.todo)
            .then(() => {
                this.fetchTodos();
                this.$router.push('/'); 
            })
            .catch(error => {
            console.error('Gagal memperbarui todo:', error);
            });
        }
    },
    created() {
      this.loadTodo();
    }
  };
  </script>
  