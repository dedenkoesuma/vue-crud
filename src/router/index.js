import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateTodoView from '@/views/CreateTodoView.vue'
import UpdateTodoView from '@/views/UpdateTodoView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/create',
    name: 'create',
    component: CreateTodoView
  },
  {
    path: '/update/:id',
    name: 'update',
    component: UpdateTodoView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
