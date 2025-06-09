import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AltaCompraView from '../views/AltaCompraView.vue'
import HistorialMovimView from '../views/HistorialMovimView.vue'
import AltaClienteView from '../views/AltaClienteView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/alta-compra',
      name: 'alta-compra',
      component: AltaCompraView,
    },
    {
      path: '/historial-movimiento',
      name: 'historial-movimiento',
      component: HistorialMovimView,
    },
    {
      path: '/alta-cliente',
      name: 'alta-cliente',
      component: AltaClienteView,
    },
  ],
})

export default router
