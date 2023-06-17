<template>
  <div>
    <!-- MODAL -->
    <div v-viewer class="mx-0 md:mx-2 sm:mx-0 ">
      <transition
        enter-active-class="ease-out duration-300"
        enter-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="ease-in duration-200"
        leave-class="opacity-100 "
        leave-to-class="opacity-0"
      >
        <div
          class="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
          v-if="modal"
        >
          <div
            class="fixed inset-0 bg-gray-500 bg-opacity-15 transition-opacity"
          ></div>

          <div class="fixed inset-0 z-10 overflow-y-auto">
            <div
              class="MODAL-SCREEN flex min-h-0 sm:min-h-screen md:min-h-full
               
               py-2 sm:py-3 sm:px-3 sm:p-0 
               items-end justify-center text-center sm:items-center "
            >
              <transition
                enter-active-class="ease-out duration-300"
                enter-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enter-to-class="opacity-100 translate-y-0 sm:scale-100"
                leave-active-class="ease-in duration-200"
                leave-class="opacity-100 translate-y-0 sm:scale-100"
                leave-to-class="opacity-5 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
              </transition>

              <div
                v-if="modal"
                class="relative transform overflow-hidden 
                        rounded-lg bg-white text-left shadow-xl transition-all 
                        my-8 mx-4 w-full
                        sm:my-8 sm:w-full sm:max-w-lg"
              >
                <div class="p-2 space-y-2" >
       
                    
                    <p class="text-2xl font-bold">{{ atractivo_modal.type_attractive == 'Mirador' ? "Cerro "+ atractivo_modal.ubication  : atractivo_modal.ubication  }}</p>
                
                  <p><b>Calle:</b> {{ atractivo_modal.direction }}</p> 
                  
                  <p v-if="atractivo_modal.artista == 'Sin Artista' || atractivo_modal.artista == 'Sin artista'"> </p>
                  <p v-else> <b>Artista: </b>{{ atractivo_modal.artista }}</p>
                
                
                  <img
                  :src="`http://127.0.0.1:8000/storage/${atractivo_modal.image}`"
                  alt="imagen"
                  />
                  <div v-html="atractivo_modal.description" class="text-justify"></div>
                  
                </div>

                <div
                  class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
                >
                  <button
                    type="button"
                    @click="clicked"
                    class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <!-- ENDMODAL -->
    </div>
  </div>
</template>

<script>
export default {
  props: ["modal", "ubicacion", "atractivo_modal"],
  
  data() {
    return {
      arrayList: [],
      page: 0,
      cerro: "",
    };
  },

  mounted() {},

  methods: {
    clicked() {
      this.$emit("clicked", false);
      console.log("clicked");
    },
    // listAtractivos() {
    //     const url = "/api-murales-modal/" + this.ubicacion;

    //     axios.get(url).then((response)=>{
    //         console.log(response);
    //         this.arrayList = response.data
    //     })
    // },
  },
};
</script>
