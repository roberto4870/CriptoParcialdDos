<template>
  <div class="container mt-4">
    <router-link to="/alta-cliente">
        <button style="margin-bottom: 20px;">Volver</button>
    </router-link> 
    <h2>¿Dónde conviene operar?</h2>
    
  <div style="display: flex; gap: 40px; align-items: flex-start;">
    <form @submit.prevent="buscarMejorExchange">
      <div class="form-group mb-3">
        <label>Criptomoneda:</label>
        <select v-model="crypto" class="form-select">
          <option disabled value="">Seleccione</option>
          <option v-for="c in criptosDisponibles" :key="c" :value="c">{{ c }}</option>
        </select>
      </div>

      <div class="form-group mb-3">
        <label>Acción:</label>
        <select v-model="accion" class="form-select">
          <option disabled value="">Seleccione</option>
          <option value="compra">Compra</option>
          <option value="venta">Venta</option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary">Buscar</button>
    </form>

    <div v-if="Object.keys(exchangeData).length" class="mt-4">
      <h4>Resultados ordenados por {{ accion == 'compra' ? 'precio más bajo' : 'precio más alto' }}</h4>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Exchange</th>
            <th>Precio (ARS)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(precio, exchange) in exchangesOrdenados" :key="exchange"
            @click="irAlExchange(exchange)"
            style="cursor: pointer">
            <td>{{ exchange }}<span style="margin-left: 5px; color: gray;">🔗</span></td>
                <td>{{accion === 'compra'
                    ? precio.totalAsk.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })
                    : precio.totalBid.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })
                    }}
                </td>
            </tr>
        </tbody>
      </table>
    </div>
  </div>
  </div>
</template>

<script>
import { criptosDisponibles } from '@/Constants/Criptos'

export default {
  name: 'OpcionExchangeView',
  data() {
    return {
      crypto: '',
      accion: '',
      exchangeData: {},
      criptosDisponibles,
      exchangeUrls: {
        binance: 'https://www.binance.com/',
        ripio: 'https://www.ripio.com/',
        buenbit: 'https://www.buenbit.com/',
        letssbit: 'https://letssbit.com/',
        decrypto: 'https://www.decrypto.la/',
        lemoncash: 'https://www.lemon.me/',
        fiwind: 'https://www.fiwind.com/',
        bitmonedero: 'https://bitmonedero.com/',
        arcadia: 'https://arcadiam.com/',
        cryptomkt: 'https://www.cryptomkt.com/',
        calypso: 'https://calypso.finance/'
      }
    }
    
  },
  computed: {
    exchangesOrdenados() {
      if (!this.exchangeData || Object.keys(this.exchangeData).length === 0) return {}

      const sorted = Object.entries(this.exchangeData)
        .filter(([_, datos]) => datos && datos.totalAsk && datos.totalBid)
        .sort((a, b) => {
          const precioA = this.accion === 'compra' ? a[1].totalAsk : a[1].totalBid
          const precioB = this.accion === 'compra' ? b[1].totalAsk : b[1].totalBid
          return this.accion === 'compra' ? precioA - precioB : precioB - precioA
        })

      return Object.fromEntries(sorted)
    }
  },
  methods: {
    async buscarMejorExchange() {
      if (!this.crypto || !this.accion) {
        alert('Por favor seleccione una criptomoneda y una acción.')
        return
      }

      try {
        const response = await fetch(`https://localhost:7191/api/transaction/cotizaciones?crypto=${this.crypto}&accion=${this.accion}`)
        if (!response.ok) throw new Error('No se pudo obtener la información.')

        this.exchangeData = await response.json()
      } catch (error) {
        console.error('Error al buscar cotizaciones:', error)
        alert('Ocurrió un error al obtener las cotizaciones.')
      }
    },
    irAlExchange(exchange) {
      const url = this.exchangeUrls[exchange.toLowerCase()]
      if (url) {
        window.open(url, '_blank')
      } else {
        alert('URL del exchange no disponible.')
      }
    }
  }
}

</script>

<style scoped>
.container {
  max-width: 600px;
}

tr:hover {
  background-color: #f0f0f0;
}

</style>
