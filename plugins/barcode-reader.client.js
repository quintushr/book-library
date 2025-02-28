// Ce plugin est uniquement exécuté côté client
import { StreamBarcodeReader } from 'vue-barcode-reader'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('StreamBarcodeReader', StreamBarcodeReader)
})