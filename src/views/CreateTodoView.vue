<template>
  <div>
    <h1>Tambah Todo Baru</h1>
    <form @submit.prevent="addTodo" class="form-group">
      <input type="text" v-model="newTodoTitle" placeholder="Judul Todo">
      <button type="submit" class="btn btn-primary mx-2">Tambah</button>
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
    ...mapActions(['createTodo', 'fetchTodos']), 
    addTodo() {
      if (this.newTodoTitle.trim()) {
        this.createTodo(this.newTodoTitle).then(() => {
          this.newTodoTitle = '';
          this.fetchTodos(); 
          this.$router.push('/'); 
          console.log('berhasil dibuat');
        });
      }
    }
  },
  created() {
    this.fetchTodos(); 
  }
};
</script>
s