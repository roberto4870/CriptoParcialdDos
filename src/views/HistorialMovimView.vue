<script setup>
import { ref, onMounted } from 'vue';

const movimientos = ref([]);
const clientes = ref([]);

async function cargarClientes() {
  const res = await fetch('https://localhost:7191/api/cliente');
  if (res.ok) {
    clientes.value = await res.json();
  } else {
    alert('Error cargando clientes');
  }
}

async function cargarMovimientos() {
  const res = await fetch('https://localhost:7191/api/transaction');
  if (res.ok) {
    movimientos.value = await res.json();
  } else {
    alert('Error cargando movimientos');
  }
}
// Función para mostrar el nombre del cliente, si no lo encuentra devuelve "N/A"

function getNombreCliente(clienteId) {
  const cliente = clientes.value.find(c => c.id === clienteId);
  return cliente ? cliente.name : 'N/A';
}

// Función para mostrar fecha legible, o "Invalid Date" si no es válida
function formatoFecha(fechaISO) {
  const fecha = new Date(fechaISO);
  return isNaN(fecha) ? 'Fecha inválida' : fecha.toLocaleString();
}
onMounted(async () => {
  await cargarClientes();
  await cargarMovimientos();
  console.log('Clientes:', clientes.value);
  console.log('Movimientos:', JSON.stringify(movimientos.value, null, 2));
});





</script>

<template>
    <div>
    <nav style="margin-bottom: 20px;">
      <router-link to="/alta-cliente" style="margin-right: 15px;">➕ Alta Cliente</router-link>
      <router-link to="/alta-compra" style="margin-right: 15px;">💰 Alta Compra</router-link>
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
        <td>{{ getNombreCliente(mov.clientId) }}</td>
        <td>{{ mov.cryptoCode }}</td>
        <td>{{ mov.action }}</td>
        <td>{{ mov.cryptoAmount }}</td>
        <td>{{ mov.money }}</td>
        <td>{{ formatoFecha(mov.datetime) }}</td>
      </tr>
    </tbody>
  </table>
</div>
</template>

