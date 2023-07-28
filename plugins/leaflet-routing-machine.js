import L from 'leaflet';
import 'leaflet-routing-machine';

if (process.browser) {
  window.L = L;
}
