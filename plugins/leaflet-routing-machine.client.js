import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';

// Agrega el complemento al objeto window para que esté disponible en el lado del cliente
if (process.client) {
  window.L.Routing = L.Routing || {};
  require('leaflet-routing-machine');

}
