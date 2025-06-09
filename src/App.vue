

<template>
  <RouterView></RouterView>
</template>

<style>
body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
  color: #333;
}

nav {
  background: linear-gradient(90deg, #e3edf7, #cfd9df);
  padding: 10px 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

nav a {
  text-decoration: none;
  color: #0077cc;
  font-weight: bold;
  margin-right: 20px;
}

nav a:hover {
  color: #005fa3;
  text-decoration: underline;
}

h1 {
  color: #222;
  text-align: center;
  margin-bottom: 20px;
}

form, table {
  background: #ffffff;
  border-radius: 10px;
  padding: 20px;
  margin: auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 800px;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  padding: 10px 15px;
  text-align: center;
  border-bottom: 1px solid #e0e0e0;
}

th {
  background-color: #f7fafc;
  color: #444;
}

input[type="submit"] {
  background-color: #0077cc;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
}

input[type="submit"]:hover {
  background-color: #005fa3;
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}

input[type="text"],
input[type="number"],
input[type="datetime-local"],
select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
}

.error-message {
  color: red;
  font-size: 14px;
}
</style>

