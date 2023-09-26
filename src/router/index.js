import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/categorias',
      name: 'categoria',
      component: () => import('../views/CategoriaView.vue')
    },
    {
      path: '/produtos',
      name: 'produto',
      component: () => import('../views/ProdutoView.vue')
    }
  ]
})

export default router
