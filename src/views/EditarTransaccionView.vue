<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const transaccion = ref(null);
const nuevoMonto = ref(null);

onMounted(async () => {
  const res = await fetch(`https://localhost:7191/api/transaction/${route.params.id}`);
  if (res.ok) {
    transaccion.value = await res.json();
    nuevoMonto.value = transaccion.value.money;
  } else {
    alert('Error al cargar');
  }
});

async function actualizarMonto() {
  const res = await fetch(`https://localhost:7191/api/transaction/${transaccion.value.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ money: nuevoMonto.value }),
  });

  if (res.ok) {
    alert('Monto actualizado');
    router.push('/historial-movimiento');
  } else {
    const msg = await res.text();
    alert('Error al actualizar: ' + msg);
  }
}
</script>

<template>
  <div v-if="transaccion">
    <router-link to="/historial-movimiento">
      <button style="margin-bottom: 20px;">🔙 Volver al Historial</button>
    </router-link>

    <h1>Editar Monto</h1>
    <p><strong>ID:</strong> {{ transaccion.id }}</p>
    <p><strong>Criptomoneda:</strong> {{ transaccion.cryptoCode }}</p>
    <p><strong>Acción:</strong> {{ transaccion.action }}</p>
    <label>
      Monto ARS:
      <input v-model="nuevoMonto" type="number" step="0.01" />
    </label>
    <br />
    <button @click="actualizarMonto">Guardar</button>
  </div>
</template>
