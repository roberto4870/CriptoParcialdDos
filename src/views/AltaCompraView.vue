<script setup>
import { ref, onMounted } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

const schema = yup.object({
  clienteId: yup.number().required('El cliente es obligatorio'),
  cryptoCode: yup.string().required('La criptomoneda es obligatoria'),
  cryptoAmount: yup.number().required('La cantidad es obligatoria').positive('Debe ser mayor a 0'),
  dateTime: yup.date().required('La fecha y hora son obligatorias'),
});

const clientes = ref([]);

const datosCompra = ref({
  clienteId: null,
  cryptoCode: '',
  cryptoAmount: null,
  dateTime: '',
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
  const payload = {
    ...datosCompra.value,
    dateTime: new Date(datosCompra.value.dateTime).toISOString(),
    action: 'compra',
  };

  const res = await fetch('https://localhost:7191/api/transaction', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    alert('Compra registrada correctamente');
    datosCompra.value = {
      clienteId: null,
      cryptoCode: '',
      cryptoAmount: null,
      dateTime: '',
    };
  } else {
    const errorText = await res.text();
    alert('Error al registrar la compra: ' + errorText);
  }
}
</script>

<template>

  <nav style="margin-bottom: 20px;">
    <router-link to="/alta-cliente" style="margin-right: 15px;">➕ Alta Cliente</router-link>
    <router-link to="/historial-movimiento" style="margin-right: 15px;">📜 Ver Historial</router-link>
  </nav>

  
  <Form :validation-schema="schema" @submit="enviarDatosApi">
    <label>
      Cliente:
      <Field as="select" v-model="datosCompra.clienteId" name="clienteId" id="clienteId">
        <option value="" disabled>Seleccione un cliente</option>
        <option v-for="c in clientes" :key="c.id" :value="c.id">{{ c.name }} - {{ c.email }}</option>
      </Field>
    </label>
    <ErrorMessage name="clienteId" />

    <br />

    <label>
      Criptomoneda:
      <Field as="select" v-model="datosCompra.cryptoCode" name="cryptoCode" id="cryptoCode">
        <option value="" disabled>Seleccione una criptomoneda</option>
        <option value="btc">Bitcoin (BTC)</option>
        <option value="eth">Ethereum (ETH)</option>
        <option value="usdc">USDC</option>
      </Field>
    </label>
    <ErrorMessage name="cryptoCode" />

    <br />

    <label>
      Cantidad:
      <Field
        v-model="datosCompra.cryptoAmount"
        type="number"
        name="cryptoAmount"
        id="cryptoAmount"
        step="0.00001"
        min="0.00001"
      />
    </label>
    <ErrorMessage name="cryptoAmount" />

    <br />

    <label>
      Fecha y hora:
      <Field v-model="datosCompra.dateTime" type="datetime-local" name="dateTime" id="dateTime" />
    </label>
    <ErrorMessage name="dateTime" />

    <br />

    <input type="submit" value="Registrar Compra" />
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
