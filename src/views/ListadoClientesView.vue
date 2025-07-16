<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const clientes = ref([]);
const router = useRouter();

async function cargarClientes() {
  const res = await fetch('https://localhost:7191/api/cliente');
  if (res.ok) {
    clientes.value = await res.json();
  } else {
    alert('Error al cargar clientes');
  }
}

async function eliminarCliente(id) {
  if (!confirm('¿Está seguro que desea eliminar este cliente?')) return;

  const res = await fetch(`https://localhost:7191/api/cliente/${id}`, {
    method: 'DELETE',
  });

  if (res.ok) {
    alert('Cliente eliminado');
    await cargarClientes(); // Refresca lista
  } else {
    const err = await res.text();
    alert('Error al eliminar cliente: ' + err);
  }
}

onMounted(cargarClientes);
</script>

<template>
  <div>
    <nav style="margin-bottom: 20px;">
      <router-link to="/alta-cliente" style="margin-right: 15px;">➕ Alta Cliente</router-link>
      <router-link to="/alta-compra" style="margin-right: 15px;">🪙 Alta Transacción</router-link>
    </nav>

    <h2>Listado de Clientes</h2>

    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="c in clientes" :key="c.id">
          <td>{{ c.id }}</td>
          <td>{{ c.name }}</td>
          <td>{{ c.email }}</td>
          <td>
            <button @click="router.push(`/editar-cliente/${c.id}`)">✏️ Editar</button>
            <button @click="eliminarCliente(c.id)">🗑️ Borrar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
