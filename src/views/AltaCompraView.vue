<script setup>
import { criptosDisponibles } from '@/Constants/Criptos'

import { ref, onMounted } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';


const schema = yup.object({
  clienteId: yup.number().required('El cliente es obligatorio'),
  cryptoCode: yup.string().required('La criptomoneda es obligatoria'),
  cryptoAmount: yup.number().required('La cantidad es obligatoria').positive('Debe ser mayor a 0'),
  dateTime: yup.date().required('La fecha y hora son obligatorias'),
  action: yup.string().required('La acción es obligatoria'),
});

const clientes = ref([]);

const datosCompra = ref({
  clienteId: null,
  cryptoCode: '',
  cryptoAmount: null,
  dateTime: '',
  action: '',
});

async function cargarClientes() {
  const res = await fetch('https://localhost:7191/api/cliente');
  if (res.ok) {
    clientes.value = await res.json();
  } else {
    alert('Error cargando clientes');
  }
}

onMounted(() => cargarClientes());

async function enviarDatosApi() {
  try {
    const payload = {
      ...datosCompra.value,
      dateTime: new Date(datosCompra.value.dateTime).toISOString(),
    };

    const res = await fetch('https://localhost:7191/api/transaction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText); // Lanzamos excepción personalizada
    }

    alert('Transacción registrada correctamente');

    // Limpiamos solo si la operación fue exitosa
    datosCompra.value = {
      clienteId: null,
      cryptoCode: '',
      cryptoAmount: null,
      dateTime: '',
      action: '',
    };
  } catch (error) {
    alert('Error al registrar transacción: ' + error.message);
  }
}

</script>

<template>

  <h1>Transacciones</h1>

  <br/>

  <nav style="margin-bottom: 20px;">
    <router-link to="/alta-cliente" style="margin-right: 15px;">➕ Alta Cliente</router-link>
    <router-link to="/historial-movimiento" style="margin-right: 15px;">📜 Ver Historial</router-link>
    <router-link to="/saldo-cripto">📊 Ver Saldo</router-link>
  </nav>

  <Form :validation-schema="schema" @submit="enviarDatosApi">
    <label>
      Cliente:
      <Field as="select" v-model="datosCompra.clienteId" name="clienteId">
        <option value="" disabled>Seleccione un cliente</option>
        <option v-for="c in clientes" :key="c.id" :value="c.id">{{ c.name }} - {{ c.email }}</option>
      </Field>
    </label>
    <ErrorMessage name="clienteId" />

    <br/>

    <label>
      Acción:
      <Field as="select" v-model="datosCompra.action" name="action">
        <option value="compra">Compra</option>
        <option value="venta">Venta</option>
      </Field>
    </label>
    <ErrorMessage name="action" />

    <br/>

    <label>
      Criptomoneda:
      <Field as="select" v-model="datosCompra.cryptoCode" name="cryptoCode">
        <option value="" disabled>Seleccione una criptomoneda</option>
        <option v-for="cripto in criptosDisponibles" :key="cripto" :value="cripto">
          {{ cripto.toUpperCase() }}
        </option>
      </Field>
    </label>

    <ErrorMessage name="cryptoCode" />

    <br/>

    <label>
      Cantidad:
      <Field v-model="datosCompra.cryptoAmount" type="number" name="cryptoAmount" step="0.00001" min="0.00001" />
    </label>
    <ErrorMessage name="cryptoAmount" />

    <br/>

    <label>
      Fecha y hora:
      <Field v-model="datosCompra.dateTime" type="datetime-local" name="dateTime" id="dateTime"/>
    </label>
    <ErrorMessage name="dateTime" />

    <br/>

    <input type="submit" value="Registrar Transacción" />
  </Form>
</template>




<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
