<template>
    <div>
      <h1>Tambah Todo Baru</h1>
      <form @submit.prevent="addTodo">
        <input type="text" v-model="newTodoTitle" placeholder="Judul Todo">
        <button type="submit">Tambah</button>
      </form>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        newTodoTitle: ''
      };
    },
    methods: {
      ...mapActions(['createTodo']),
      addTodo() {
        if (this.newTodoTitle.trim()) {
          this.createTodo(this.newTodoTitle);
          this.newTodoTitle = '';
        }
      }
    }
  };
  </script>
  