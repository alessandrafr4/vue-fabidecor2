import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/categorias',
      name: 'categoria',
      component: () => import('../views/CategoriaView.vue')
    },
    {
      path: '/produtos',
      name: 'produto',
      component: () => import('../views/ProdutoView.vue')
    },
    {
      path: '/temas',
      name: 'tema',
      component: () => import('../views/TemaView.vue')
    }
  ]
})

export default router

