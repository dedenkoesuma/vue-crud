<template>
    <div>
      <h1>Edit Todo</h1>
      <form @submit.prevent="submitUpdateTodo" class="form-group">
        <div>
          <label for="title" class="mx-2">Title:</label>
          <input type="text" id="title" v-model="todo.title">
          <button type="submit" class="btn btn-primary mx-2">Update</button>
        </div>
        <div>
          <label for="completed">Completed:</label>
          <input type="checkbox" id="completed" class="my-2" v-model="todo.completed">
        </div>
        
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
  