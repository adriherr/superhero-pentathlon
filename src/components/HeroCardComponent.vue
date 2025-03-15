<template>
    <div class="relative p-4 rounded-lg shadow-md transform transition duration-500 hover:scale-105 hover:shadow-blue-500/50 w-64 h-96  group"
        :style="{ backgroundImage: `url(${props.hero.picture})`, backgroundSize: 'cover', backgroundPosition: 'center' }">
        <div class="bg-gray-700 bg-opacity-75 rounded p-2 inline-block cursor-pointer" @click="$emit('innerClick')">
            <h2 class="text-white font-bold text-xl">{{ props.hero.name }}</h2>
        </div>
        <button @click="$emit('remove')"
            class="cursor-pointer absolute top-4 right-4 bg-red-600 text-white font-bold py-1 px-2 rounded opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd"
                    d="M5 8a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm-2 9a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1Zm13-6a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-4Z"
                    clip-rule="evenodd" />
            </svg>
        </button>

        <div
            class="cursor-pointer absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-75 p-2 rounded-b-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            @click="$emit('innerClick')">
            <div v-for="(value, key) in props.hero.attributes" :key="key" class="mb-1 text-base font-normal">
                <div :class="attributesColorsMap[key].text">{{ attributesColorsMap[key].es }}: {{ value }}</div>
                <div class="w-full bg-gray-200 rounded-full h-1 mb-4 dark:bg-gray-700">
                    <div :class="[attributesColorsMap[key].bar, 'h-1 rounded-full']"
                        :style="{ width: (typeof value === 'number' ? value * 10 : 0) + '%' }"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type HeroInterface from '../interfaces/HeroInterface';

const props = defineProps<{
    hero: HeroInterface
}>()

const attributesColorsMap: { [key: string]: { text: string, bar: string , es: string} } = {
    agility: { text: 'text-blue-700 dark:text-blue-700', bar: 'bg-blue-600', es: 'Agilidad' },
    strength: { text: 'text-red-600 dark:text-red-600', bar: 'bg-red-600', es: 'Fuerza' },
    weight: { text: 'text-green-600 dark:text-green-600', bar: 'bg-green-600', es: 'Peso' },
    endurance: { text: 'text-yellow-400 dark:text-yellow-400', bar: 'bg-yellow-400', es: 'Resistencia' },
    charisma: { text: 'text-indigo-600 dark:text-indigo-600', bar: 'bg-indigo-600', es: 'Carisma' }
}
</script>
