

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <RouterView />

  <!-- Para mostrar solo si la ruta actual NO es alguna de estas -->
  <router-link
    class="nav-link"
    to="/opcion-exchange"
    v-if="!['alta-cliente', 'opcionexchange', 'listado-clientes','ver-transaccion','editar-cliente'].includes(route.name)"
  >
    Consultar cotizaciones
  </router-link>
</template>



<style>
body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #0f172a, #1e3a8a); 
  color: #f1f5f9;
}

/* Navegación */
nav {
  background: linear-gradient(90deg, #1e3a8a, #0f172a);
  padding: 10px 15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}

nav a {
  text-decoration: none;
  color: #93c5fd;
  font-weight: bold;
  margin-right: 20px;
}

nav a:hover {
  color: #bfdbfe;
  text-decoration: underline;
}

/* Títulos */
h1 {
  color: #f1f5f9;
  text-align: center;
  margin-bottom: 20px;
}

/* Formularios y tablas */
form,
table {
  background: #111827;
  color: #e0e0e0;
  border-radius: 10px;
  padding: 20px;
  margin: auto;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  max-width: 800px;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th {
  background-color: #1f2937; 
  color: #e5e7eb;
}

td {
  background-color: #1a202c;
  color: #d1d5db;
  border-bottom: 1px solid #2d3748;
  padding: 10px 15px;
  text-align: center;
}

/* Inputs y selects */
input[type="text"],
input[type="number"],
input[type="datetime-local"],
select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 15px;
  background-color: #2d3748;
  color: #f7fafc;
  border: 1px solid #4a5568;
  border-radius: 6px;
  box-sizing: border-box;
}

/* Botones */
input[type="submit"],
button {
  background-color: #2563eb; 
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
}

input[type="submit"]:hover,
button:hover {
  background-color: #1d4ed8;
}

/* Labels */
label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  color: #e2e8f0;
}

/* Mensajes de error */
.error-message {
  color: #f87171;
  font-size: 14px;
}
</style>


