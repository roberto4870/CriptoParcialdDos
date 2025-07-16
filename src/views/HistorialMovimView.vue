<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

async function confirmarBorrado(id) {
  if (confirm('¿Seguro que deseas borrar esta transacción?')) {
    const res = await fetch(`https://localhost:7191/api/transaction/${id}`, {
      method: 'DELETE'
    });
    if (res.ok) {
      alert('Transacción eliminada');
      await cargarMovimientos();
    } else {
      alert('Error al eliminar');
    }
  }
}
const movimientos = ref([]);

async function cargarMovimientos() {
  const res = await fetch('https://localhost:7191/api/transaction');
  if (res.ok) {
    movimientos.value = await res.json();
  } else {
    alert('Error cargando movimientos');
  }
}

function formatoFecha(fechaISO) {
  const fecha = new Date(fechaISO);
  return isNaN(fecha) ? 'Fecha inválida' : fecha.toLocaleString();
}

onMounted(() => {
  cargarMovimientos();
});
</script>

<template>
  <div>
    <nav style="margin-bottom: 20px;">
      <router-link to="/alta-cliente" style="margin-right: 15px;">➕ Alta Cliente</router-link>
      <router-link to="/alta-compra" style="margin-right: 15px;">💰 Alta Compra/Venta</router-link>
    </nav>

    <h1>Historial de Movimientos</h1>

    <table border="1" cellspacing="0" cellpadding="5">
      <thead>
        <tr>
          <th>Cliente</th>
          <th>Código Crypto</th>
          <th>Acción</th>
          <th>Cantidad Crypto</th>
          <th>Monto ARS</th>
          <th>Fecha y Hora</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="mov in movimientos" :key="mov.id">
          <td>{{ mov.clientName }}</td>
          <td>{{ mov.cryptoCode }}</td>
          <td>{{ mov.action }}</td>
          <td>{{ mov.cryptoAmount }}</td>
          <td>{{ mov.money }}</td>
          <td>{{ formatoFecha(mov.datetime) }}</td>
          <td>
            <router-link :to="`/ver-transaccion/${mov.id}`">
              <button>Ver</button>
            </router-link>
            <router-link :to="`/editar-transaccion/${mov.id}`">
              <button>Editar</button>
            </router-link>
            <button @click="confirmarBorrado(mov.id)">Borrar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>




