<template>
    <HeroesLayout>
        <div v-if="heroes.length > 2" class="flex justify-center space-x-4 pt-5">
            <div>
                <label for="heroes1" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Selecciona héroe 1</label>
                <select id="heroes1" v-model="selectedHeroes[0]" class="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option v-for="hero in filteredHeroes(0)" :key="hero.id" :value="hero">{{ hero.name }}</option>
                </select>
            </div>

            <div>
                <label for="heroes2" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Selecciona héroe 2</label>
                <select id="heroes2" v-model="selectedHeroes[1]" class="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option v-for="hero in filteredHeroes(1)" :key="hero.id" :value="hero">{{ hero.name }}</option>
                </select>
            </div>

            <div>
                <label for="heroes3" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Selecciona héroe 3</label>
                <select id="heroes3" v-model="selectedHeroes[2]" class="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option v-for="hero in filteredHeroes(2)" :key="hero.id" :value="hero">{{ hero.name }}</option>
                </select>
            </div>
        </div>
        <div v-if="heroes.length > 2" class="flex justify-center pt-5">
            <button @click="calculateScores" class="cursor-pointer w-full max-w-md p-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800">Calcular Puntuaciones</button>
        </div>
        <div v-if="heroes.length > 2" class="pt-5 text-center">
            <div v-for="(score, heroId) in scores" :key="heroId" class="mb-4">
                <p class="text-lg font-medium text-gray-900 dark:text-white">{{ getHeroNameById(heroId.toString()) }}: {{ score }}</p>
            </div>
        </div>
        <div v-else class="pt-5 text-center">
            <p class="text-lg font-medium text-gray-900 dark:text-white">Es necesario añadir al menos 3 héroes para poder hacer la simulación.</p>
            <p class="text-lg font-medium text-gray-900 dark:text-white">Haz click en la siguiente etiqueta para acceder al gestor de Superhéroes</p>
            
            <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 pt-4">
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
            </div>
                
        </div>
    </HeroesLayout>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, type Ref } from 'vue';
import type HeroInterface from '../interfaces/HeroInterface';
import HeroesLayout from '../layouts/HeroesLayout.vue';
import { getHeroes } from '../services/HeroesServices.ts';
import getScores from '../utils/calculations.ts';

const heroes: Ref<HeroInterface[]> = ref([]);
const selectedHeroes: Ref<(HeroInterface | null)[]> = ref([null, null, null]);
const scores = ref<{ [key: string]: number } | null>(null);

onBeforeMount(async () => {
    heroes.value = await getHeroes();
});

const filteredHeroes = (index: number) => {
    return heroes.value.filter(hero => !selectedHeroes.value.includes(hero) || selectedHeroes.value[index] === hero);
};

const calculateScores = () => {
    const validHeroes = selectedHeroes.value.filter(hero => hero !== null) as HeroInterface[];
    if (validHeroes.length === 3) {
        scores.value = getScores(validHeroes);
    } else {
        scores.value = null;
    }
};

const getHeroNameById = (id: string) => {
    const hero = heroes.value.find(hero => hero.id === id);
    return hero ? hero.name : 'Desconocido';
};

onBeforeMount(async () => {
    heroes.value = await getHeroes();
});
</script>
