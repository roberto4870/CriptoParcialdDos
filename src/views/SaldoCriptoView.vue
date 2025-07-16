<script setup>
import { ref, onMounted } from 'vue';

const clientes = ref([]);
const saldos = ref([]);
const clienteIdSeleccionado = ref('');

async function cargarClientes() {
  const res = await fetch('https://localhost:7191/api/cliente');
  if (res.ok) {
    clientes.value = await res.json();
  }
}

async function obtenerSaldo() {
  if (!clienteIdSeleccionado.value) return;

  const res = await fetch(`https://localhost:7191/api/transaction/saldo/${clienteIdSeleccionado.value}`);
  if (res.ok) {
    saldos.value = await res.json();
  } else {
    saldos.value = [];
    alert('Error al obtener saldos');
  }
}

onMounted(() => cargarClientes());
</script>

<template>
  <nav style="margin-bottom: 20px;">
    <router-link to="/alta-cliente" style="margin-right: 15px;">➕ Alta Cliente</router-link>
    <router-link to="/alta-compra" style="margin-right: 15px;">💰 Alta Compra/Venta</router-link>
    <router-link to="/historial-movimiento">📜 Ver Historial</router-link>
  </nav>

  <h1>Saldo Criptomonedas por Cliente</h1>

  <label>
    Seleccione Cliente:
    <select v-model="clienteIdSeleccionado" @change="obtenerSaldo">
      <option value="">-- Seleccionar --</option>
      <option v-for="c in clientes" :value="c.id" :key="c.id">{{ c.name }}</option>
    </select>
  </label>

  <table v-if="saldos.length > 0" border="1" cellpadding="5" cellspacing="0">
    <thead>
      <tr>
        <th>Criptomoneda</th>
        <th>Saldo</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="s in saldos" :key="s.cryptoCode">
        <td>{{ s.cryptoCode.toUpperCase() }}</td>
        <td>{{ s.total }}</td>
      </tr>
    </tbody>
  </table>
</template>
