export default ({ app }) => {
    if (process.env.NODE_ENV !== 'production') return
  
    // Agrega el código de seguimiento de GA4 proporcionado por Google Analytics
    window.dataLayer = window.dataLayer || []
    function gtag() { dataLayer.push(arguments) }
    gtag('js', new Date())
    gtag('config', 'G-RCZ6EYBXLP')
    
    // Registra la ruta actual cada vez que se cambia
    app.router.afterEach((to, from) => {
      gtag('config', 'G-RCZ6EYBXLP', { page_path: to.fullPath })
    })
  }
  