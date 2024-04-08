<template>
  <div>
    <div class="d-flex justify-content-center table-wrap ">
      <div class="per-page bg-dark rounded-top d-flex align-items-center px-3 justify-content-end">
        <div class="wrap-select d-flex">
          <p class="text-select">Per page</p>
          <select v-model="todosPerPage" class="form-select form-select-sm my-1 select-custom bg-dark text-white" style="width: auto;border: none;padding: 0 25px 0 10px;margin-top: 0px !important;">
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>
      <table class="table table-dark text-white custom-table my-0" style="max-width: 94%;"> 
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Judul</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(todo, index) in paginatedTodos" :key="todo.id">
            <th v-if="todosPerPage === 'all'" scope="row">{{ index + 1 }}</th>
            <th v-else scope="row">{{ index + 1 + ((currentPage - 1) * parseInt(todosPerPage)) }}</th>
            <td>{{ todo.title }}</td>
            <td>
              <button class="btn btn-primary btn-sm mx-2" @click="editTodo(todo)"><i class="bi bi-pencil-square"></i></button>
              <button class="btn btn-danger btn-sm" @click="deleteTodo(todo.id)"><i class="bi bi-trash-fill"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
      <nav aria-label="Page navigation example" class="bg-dark my-0">
      <ul class="pagination justify-content-end text-black">
        <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }">
          <a class="page-link text-black" href="#" @click.prevent="setPage(page)">{{ page }}</a>
        </li>
      </ul>
    </nav>
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

export default {
  data() {
    return {
      currentPage: 1,
      todosPerPage: '20',
  }
},
  computed: {
    ...mapState(["todos"]),
    paginatedTodos() {
      if (this.todosPerPage === 'all') {
        return this.todos;
      } else {
        const start = (this.currentPage - 1) * parseInt(this.todosPerPage);
        const end = start + parseInt(this.todosPerPage);
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
      console.log(`Mengedit todo: ${todo.title}`);
    },
    deleteTodo(todoId) {
      console.log(`Menghapus todo dengan ID: ${todoId}`);
    },
    setPage(pageNumber) {
      this.currentPage = pageNumber;
    },
  },
  created() {
    this.fetchTodos();
  },
};
</script>
