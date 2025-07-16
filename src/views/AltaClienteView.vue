<script setup>
import { ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

const schema = yup.object({
  name: yup.string().required('El nombre es obligatorio'),
  email: yup.string().email('Email inválido').required('El email es obligatorio'),
});

const nuevoCliente = ref({
  name: '',
  email: '',
});

async function enviarCliente() {
  const res = await fetch('https://localhost:7191/api/cliente', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nuevoCliente.value),
  });

  if (res.ok) {
    alert('Cliente agregado correctamente');
    nuevoCliente.value = {
      name: '',
      email: '',
    };
  } else {
    const errorText = await res.text();
    alert('Error al agregar cliente: ' + errorText);
  }
}
</script>

<template>

  <h1>Alta Cliente</h1>
  <br/>
  <nav style="margin-bottom: 20px;">
    <router-link to="/alta-compra" style="margin-right: 15px;">🛒 Alta Compra/Venta</router-link>
    <br/>
    <router-link to="/historial-movimiento" style="margin-right: 15px;">📜 Ver Historial</router-link>
    <br/>
    <router-link to="/listado-clientes" style="margin-right: 15px;">📜 Listado Clientes</router-link>

  </nav>

  <Form :validation-schema="schema" @submit="enviarCliente">
    <label>
      Nombre:
      <Field v-model="nuevoCliente.name" type="text" name="name" />
    </label>
    <ErrorMessage name="name" />

    <br />
    
    <label>
      Email:
      <Field v-model="nuevoCliente.email" type="email" name="email" />
    </label>
    <ErrorMessage name="email" />

    <br />

    <input type="submit" value="Agregar Cliente" />
  </Form>
</template>
