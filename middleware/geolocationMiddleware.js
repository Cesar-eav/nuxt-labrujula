export default function ({ route, redirect }) {
    // Verifica si la ruta actual es la página de geolocalización (ruta "GPS")
    if (route.name === 'gps') {
      // Verifica si el navegador es compatible con la geolocalización
      if (!navigator.geolocation) {
        console.log('Geolocation API is not supported');
      } else {
        // Si el navegador es compatible con la geolocalización, solicita el permiso aquí
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // No es necesario hacer nada con la posición aquí, simplemente se solicita el permiso
          },
          (error) => {
            console.error("Error en getCurrentPosition:", error);
          }
        );
      }
    }
  }
  