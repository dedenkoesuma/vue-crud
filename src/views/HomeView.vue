<template>
  <div>
  
    <div class="d-flex justify-content-center table-wrap ">
      <!-- <div class="per-page bg-dark rounded-top d-flex align-items-center px-3 justify-content-end">
        <div class="wrap-select d-flex">
          <p class="text-select">Per page</p>
          <select v-model="todosPerPage" class="form-select form-select-sm my-1 select-custom bg-dark text-white" style="width: auto;border: none;padding: 0 25px 0 10px;margin-top: 0px !important;">
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="all">All</option>
          </select>
        </div>
      </div> -->
      <div class="d-flex justify-content-end" style="margin:10px 0 -15px 0">
        <a class="btn btn-primary " href="/create">create</a>
      </div>
      <table class="table table-striped text-white custom-table" style="max-width: 94%;"> 
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Judul</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(todo, index) in paginatedTodos" :key="todo.id">
            <th scope="row">{{ ((currentPage - 1) * perPage) + index + 1 }}</th>
            <td :key="todo.id">{{ todo.title }}</td>
            <td>
              <button class="btn btn-primary btn-sm mx-2" @click="editTodo(todo)"><i class="bi bi-pencil-square"></i></button>
              <button class="btn btn-danger btn-sm" @click="deleteTodo(todo.id)"><i class="bi bi-trash-fill"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
      <b-pagination
      v-model="currentPage"
      :total-rows="todos.length"
      :per-page="perPage"
      first-text="⏮"
      prev-text="⏪"
      next-text="⏩"
      last-text="⏭"
      class="mt-3"
    ></b-pagination>
    </div>
  </div>
</template>
<style>
.table-wrap{
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  border-bottom-left-radius: 10px !important;
  border-bottom-right-radius: 10px !important;
}

.per-page{
  display: flex;
  border-top-left-radius: 10px !important;
  border-top-right-radius: 10px !important;

}
.text-select{
  margin-top: 14px;
  color: gray;
}
.active>.page-link, .page-link.active{
  color: white !important;
}
</style>


<script>
import { mapState, mapActions } from "vuex";
import { BPagination } from 'bootstrap-vue-3';

export default {
  components: {
    BPagination
  },
  data() {
    return {
      currentPage: 1,
      perPage: 10, 
  }
},
  computed: {
    ...mapState(["todos"]),
    paginatedTodos() {
      if (this.todosPerPage === 'all') {
        return this.todos;
      } else {
        const start = (this.currentPage - 1) * parseInt(this.perPage);
        const end = start + parseInt(this.perPage);
        return this.todos.slice(start, end);
      }
    },
    totalPages() {
      if (this.todosPerPage === 'all') {
        return 1;
      } else {
        return Math.ceil(this.todos.length / parseInt(this.todosPerPage));
      }
    },
  },
  watch: {
    todosPerPage() {
      this.currentPage = 1; 
    },
  },
  methods: {
    ...mapActions(["fetchTodos"]),
    editTodo(todo) {
      const todoId = todo.id;

      this.$router.push({ name: 'update', params: { id: todoId } });
    },
    deleteTodo(todoId) {
      console.log(`Menghapus todo dengan ID: ${todoId}`);
    },
    setPage(pageNumber) {
      this.currentPage = pageNumber;
    },
    async updateTodoAndFetch(todo) {
      try {
        await this.$store.dispatch('updateTodo', todo); // Memanggil action updateTodo untuk memperbarui todo
        await this.fetchTodos(); // Memanggil action fetchTodos untuk memperbarui daftar todos
      } catch (error) {
        console.error('Gagal memperbarui todo:', error);
      }
    }
  },
  created() {
    this.fetchTodos();
  },
};
</script>
