<template>
  <div>
    <Header /> 

    <main>
      <Nuxt /> <!-- Componente para mostrar las páginas hijas -->
    </main>

    <Footer /> 
  </div>
</template>

<script>

import Header from '../components/Header.vue'; 
import Footer from '@/components/Footer.vue'; 

export default {
  components: {
    Header, 
    Footer
  },
}
  </script>