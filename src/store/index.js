import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    todos: [],
  },
  mutations: {
    SET_TODOS(state, todos) {
      state.todos = todos;
    },
    ADD_TODO(state, todo) {
      state.todos.unshift(todo);
    },
    REMOVE_TODO(state, todoId) {
      state.todos = state.todos.filter((todo) => todo.id !== todoId);
    },
    UPDATE_TODO(state, updatedTodo) {
      const index = state.todos.findIndex(todo => todo.id === updatedTodo.id);
      if (index !== -1) {
        state.todos.splice(index, 1, updatedTodo);
      } else {
        console.error(`Todo dengan ID ${updatedTodo.id} tidak ditemukan.`);
      }
    },
  },
  actions: {
    fetchTodos({ commit }) {
      axios
        .get("https://jsonplaceholder.typicode.com/todos")
        .then((response) => {
          commit("SET_TODOS", response.data);
        })
        .catch((error) => console.error(error));
    },
    createTodo({ commit }, title) {
      axios
        .post("https://jsonplaceholder.typicode.com/todos", {
          title,
          completed: false,
        })
        .then((response) => {
          commit("ADD_TODO", response.data);
        })
        .catch((error) => console.error(error));
    },
    deleteTodo({ commit }, todoId) {
      axios
        .delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
        .then(() => {
          commit("REMOVE_TODO", todoId);
        })
        .catch((error) => console.error(error));
    },
    updateTodo({ commit }, todo) {
      return axios
        .put(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, todo)
        .then(() => {
          commit("UPDATE_TODO", todo);
        })
        .catch((error) => {
          console.error(error);
          throw error;
        });
    },
  },
});
