<template>
    <HeroesLayout>
        <div class="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
            <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                Bienvenidos a las Olimpiadas de Superhéroes</h1>
            <p class="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">En este Pentatlón de
                Superhéroes, los héroes de todo el mundo se enfrentarán en una serie de pruebas para demostrar su
                destreza, fuerza y habilidades.
            </p>
            <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                <RouterLink to="/superhero-manager"
                    class="group relative p-6 bg-gradient-to-br from-grey-600 via-grey-500 to-blue-950 rounded-lg shadow-lg cursor-pointer transform transition duration-500 hover:scale-105 hover:shadow-blue-500/50  hover:from-grey-600 hover:via-grey-500 hover:to-blue-900 bg-gray-800 0 dark:bg-gray-800 bg-opacity-80 flex items-center w-full sm:w-auto">
                    <svg class="w-10 h-10 text-white mr-4 size-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                    </svg>
                    <div class="max-w-xs w-full">
                        <h2 class="text-2xl font-bold text-white mb-2">Personalizar héroes</h2>
                        <p class="text-gray-300">Crea nuevos héroes, modifica sus estadísticas o elimina aquellos que no
                            te gusten.</p>
                    </div>
                </RouterLink>
                <RouterLink to="/tests-simulator"
                    class="group relative p-6 bg-gradient-to-br from-grey-600 via-grey-500 to-red-950 rounded-lg shadow-lg cursor-pointer transform transition duration-500 hover:scale-105 hover:shadow-red-500/50 sm:ms-4  hover:from-grey-600 hover:via-grey-500 hover:to-red-900 bg-gray-800 dark:bg-gray-800 bg-opacity-80 flex items-center w-full sm:w-auto">
                    <svg fill="white" class="w-10 h-10 text-white mr-4 size-6" xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 297 297">
                        <g>
                            <path d="M119.306,51.203l-1.612,21.974c-0.126,1.716,0.644,3.376,2.037,4.387c1.391,1.012,3.209,1.232,4.801,0.582l20.401-8.325
        l20.401,8.325c0.605,0.247,1.243,0.368,1.877,0.368c1.035,0,2.061-0.323,2.924-0.95c1.393-1.011,2.163-2.671,2.037-4.387
        l-1.612-21.974l14.221-16.831c1.11-1.314,1.463-3.109,0.93-4.745c-0.531-1.637-1.871-2.882-3.542-3.293l-21.397-5.257
        L149.158,2.352C148.251,0.89,146.654,0,144.933,0c-1.721,0-3.32,0.89-4.226,2.352l-11.611,18.725l-21.399,5.257
        c-1.671,0.411-3.011,1.656-3.542,3.293c-0.532,1.636-0.18,3.431,0.93,4.745L119.306,51.203z" />
                            <path d="M288.732,177.902h-71.919V97.219c0-3.845-3.117-6.962-6.962-6.962H87.148c-3.845,0-6.962,3.117-6.962,6.962v45.625H8.268
        c-3.845,0-6.962,3.117-6.962,6.962v140.232c0,3.845,3.117,6.962,6.962,6.962h280.465c3.845,0,6.962-3.117,6.962-6.962V184.864
        C295.694,181.019,292.577,177.902,288.732,177.902z M74.799,239.825c0,4.12-3.339,7.459-7.459,7.459H54.252v6.969H67.34
        c4.12,0,7.459,3.339,7.459,7.459c0,4.12-3.339,7.459-7.459,7.459H46.793c-4.12,0-7.459-3.339-7.459-7.459v-21.887
        c0-4.12,3.339-7.459,7.459-7.459h13.088v-7.415H46.793c-4.12,0-7.459-3.339-7.459-7.459s3.339-7.459,7.459-7.459H67.34
        c4.12,0,7.459,3.339,7.459,7.459V239.825z M155.959,166.032c0,4.12-3.339,7.459-7.459,7.459s-7.459-3.339-7.459-7.459v-24.274
        h-1.676c-4.12,0-7.459-3.339-7.459-7.459c0-4.12,3.339-7.459,7.459-7.459h9.135c4.12,0,7.459,3.339,7.459,7.459V166.032z
         M259.721,261.712c0,4.12-3.339,7.459-7.459,7.459h-20.548c-4.12,0-7.459-3.339-7.459-7.459c0-4.12,3.339-7.459,7.459-7.459h13.089
        v-6.969h-13.089c-4.12,0-7.459-3.339-7.459-7.459c0-4.12,3.339-7.459,7.459-7.459h13.089v-7.415h-13.089
        c-4.12,0-7.459-3.339-7.459-7.459s3.339-7.459,7.459-7.459h20.548c4.12,0,7.459,3.339,7.459,7.459V261.712z" />
                        </g>
                    </svg>
                    <div class="max-w-xs w-full">
                        <h2 class="text-2xl font-bold text-white mb-2">Empezar las pruebas</h2>
                        <p class="text-gray-300">Somete a prueba a tres héroes a tu elección y observa quién gana cada
                            una de las pruebas y sus puntuaciones totales finales.</p>
                    </div>
                </RouterLink>
            </div>
        </div>
    </HeroesLayout>
</template>

<script setup lang="ts">
import HeroesLayout from '../layouts/HeroesLayout.vue';
</script>