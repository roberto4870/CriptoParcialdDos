<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const transaccion = ref(null);

onMounted(async () => {
  const id = route.params.id;
  const res = await fetch(`https://localhost:7191/api/transaction/${id}`);
  if (res.ok) {
    transaccion.value = await res.json();
  } else {
    alert('Error al cargar transacción');
  }
});
</script>

<template>
  <div v-if="transaccion">

    <router-link to="/historial-movimiento">
        <button style="margin-bottom: 20px;">🔙 Volver al Historial</button>
    </router-link>

    <h1>Detalle de Transacción</h1>
    <p><strong>ID:</strong> {{ transaccion.id }}</p>
    <p><strong>Cripto:</strong> {{ transaccion.cryptoCode }}</p>
    <p><strong>Acción:</strong> {{ transaccion.action }}</p>
    <p><strong>ClienteId:</strong> {{ transaccion.clienteId }}</p>
    <p><strong>Cantidad:</strong> {{ transaccion.cryptoAmount }}</p>
    <p><strong>Monto:</strong> {{ transaccion.money }}</p>
    <p><strong>Fecha y hora:</strong> {{ new Date(transaccion.datetime).toLocaleString() }}</p>
  </div>
</template>
