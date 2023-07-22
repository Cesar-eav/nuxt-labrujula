<template>
<div>
  <h1>Posición Geográfica Actual</h1>
  <p>Latitud: <span id="latitud"></span></p>
  <p>Longitud: <span id="longitud"></span></p>



  </div>
</template>





<script>

export default {

  layout: "Default",
}

</script>

  <script>
    function mostrarPosicion(position) {
      const latitud = position.coords.latitude;
      const longitud = position.coords.longitude;

      document.getElementById('latitud').textContent = latitud;
      document.getElementById('longitud').textContent = longitud;
    }

    function errorObteniendoPosicion(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          alert("El usuario denegó la solicitud de geolocalización.");
          break;
        case error.POSITION_UNAVAILABLE:
          alert("La información de la posición no está disponible.");
          break;
        case error.TIMEOUT:
          alert("Se agotó el tiempo para obtener la posición.");
          break;
        case error.UNKNOWN_ERROR:
          alert("Ocurrió un error desconocido.");
          break;
      }
    }

    if (navigator.geolocation) {
      // Solicitar la posición actual del usuario
      navigator.geolocation.getCurrentPosition(mostrarPosicion, errorObteniendoPosicion);
    } else {
      alert("La geolocalización no es compatible con este navegador.");
    }
  </script>