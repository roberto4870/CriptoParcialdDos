<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const cliente = ref({ name: '', email: '' });

const schema = yup.object({
  name: yup.string().required('El nombre es obligatorio'),
  email: yup.string().email('Email inválido').required('El email es obligatorio'),
});

onMounted(async () => {
  const res = await fetch(`https://localhost:7191/api/cliente/${id}`);
  if (res.ok) {
    cliente.value = await res.json();
  } else {
    alert('Error al cargar cliente');
  }
});

async function actualizarCliente() {
  const res = await fetch(`https://localhost:7191/api/cliente/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cliente.value),
  });

  if (res.ok) {
    alert('Cliente actualizado');
    router.push('/listado-clientes');
  } else {
    const errorText = await res.text();
    alert('Error al actualizar cliente: ' + errorText);
  }
}
</script>

<template>
  
  <router-link to="/listado-clientes">
    <button style="margin-bottom: 20px;">🔙 Volver al listado</button>
  </router-link>
     <br/>
  <h2>Editar Cliente</h2>
  <br/>
  <Form :validation-schema="schema" @submit="actualizarCliente">
    <label>
      Nombre:
      <Field v-model="cliente.name" name="name" />
    </label>
    <ErrorMessage name="name" />
    <br />

    <label>
      Email:
      <Field v-model="cliente.email" name="email" />
    </label>
    <ErrorMessage name="email" />
    <br />

    <input type="submit" value="Actualizar Cliente" />
  </Form>
</template>
