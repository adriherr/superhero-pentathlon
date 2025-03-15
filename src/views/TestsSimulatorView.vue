<template>
    <HeroesLayout>
        <div class="flex justify-center space-x-4 pt-5">
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
        <div class="flex justify-center pt-5">
            <button @click="calculateScores" class="cursor-pointer w-full max-w-md p-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800">Calcular Puntuaciones</button>
        </div>
        <div v-if="scores" class="pt-5 text-center">
            <div v-for="(score, heroId) in scores" :key="heroId" class="mb-4">
                <p class="text-lg font-medium text-gray-900 dark:text-white">{{ getHeroNameById(heroId.toString()) }}: {{ score }}</p>
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
