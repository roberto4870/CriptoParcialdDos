import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AltaCompraView from '../views/AltaCompraView.vue'
import HistorialMovimView from '../views/HistorialMovimView.vue'
import AltaClienteView from '../views/AltaClienteView.vue'
import SaldoCriptoView from '../views/SaldoCriptoView.vue';
import VerTransaccionView from '../views/VerTransaccionView.vue';
import EditarTransaccionView from '../views/EditarTransaccionView.vue';
import ListadoClientesView from '../views/ListadoClientesView.vue';
import EditarClienteView from '../views/EditarClienteView.vue';

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
    {
      path: '/saldo-cripto',
      name: 'saldo-cripto',
      component: SaldoCriptoView,
    },
    {
      path: '/ver-transaccion/:id',
      name: 'ver-transaccion',
      component: VerTransaccionView
    },
    {
      path: '/editar-transaccion/:id',
      name: 'editar-transaccion',
      component: EditarTransaccionView
    }, 
    { path: '/listado-clientes',
      name: 'listado-clientes',
      component: ListadoClientesView
    },
    { path: '/editar-cliente/:id',
      name: 'editar-cliente',
      component: EditarClienteView 
    }

  ],
})

export default router
