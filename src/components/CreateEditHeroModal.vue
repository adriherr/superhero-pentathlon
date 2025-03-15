<template>
<div :id="props.id" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-4xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    {{ props.hero ? 'Editar' : 'Crear' }} superhéroe
                </h3>
            </div>
            <!-- Modal body -->
            <div class="flex p-4 md:p-5">
                <!-- Hero Image -->
                <div class="w-1/3">
                    <img :src="imageUrl" alt="Hero Image" class="w-full h-auto rounded-lg">
                </div>
                <!-- Form -->
                 
    <!-- agility: { text: 'text-blue-700 dark:text-blue-700', bar: 'bg-blue-600', es: 'Agilidad' },
    strength: { text: 'text-red-600 dark:text-red-600', bar: 'bg-red-600', es: 'Fuerza' },
    weight: { text: 'text-green-600 dark:text-green-600', bar: 'bg-green-600', es: 'Peso' },
    endurance: { text: 'text-yellow-400 dark:text-yellow-400', bar: 'bg-yellow-400', es: 'Resistencia' },
    charisma: { text: 'text-indigo-600 dark:text-indigo-600', bar: 'bg-indigo-600', es: 'Carisma' } -->
                <form class="w-2/3 grid gap-4 ml-4" @submit.prevent="submitForm">
                    <div class="col-span-2">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                        <input type="text" name="name" id="name" v-model="formData.name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type hero name" required>
                    </div>
                    <div class="col-span-2">
                        <label for="image-url" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">URL de la imagen</label>
                        <input type="text" name="image-url" id="image-url" v-model="imageUrl" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type image URL" required>
                    </div>
                    <div class="col-span-1">
                        <label for="agility" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Agilidad: {{ formData.agility }}</label>
                        <input type="range" min="0" max="10" name="agility" id="agility" v-model="formData.agility" class="range w-full h-2 cursor-pointer accent-blue-600" required>

                    </div>
                    <div class="col-span-1">
                        <label for="strength" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fuerza: {{ formData.strength }}</label>
                        <input type="range" min="0" max="10" name="strength" id="strength" v-model="formData.strength" class="range w-full h-2 cursor-pointer accent-red-600" required>
    
                    </div>
                    <div class="col-span-1">
                        <label for="weight" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Peso: {{ formData.weight }}</label>
                        <input type="range" min="0" max="10" name="weight" id="weight" v-model="formData.weight" class="range w-full h-2 cursor-pointer accent-green-600" required>
                    </div>
                    <div class="col-span-1">
                        <label for="endurance" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Resistencia: {{ formData.endurance }}</label>
                        <input type="range" min="0" max="10" name="endurance" id="endurance" v-model="formData.endurance" class="range w-full h-2 cursor-pointer accent-orange-500" required>
                    </div>
                    <div class="col-span-1">
                        <label for="charisma" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Carisma: {{ formData.charisma }}</label>
                        <input type="range" min="0" max="10" name="charisma" id="charisma" v-model="formData.charisma" class="range w-full h-2 cursor-pointer accent-indigo-600" required>
                    </div>
                    <button type="submit" class="cursor-pointer col-span-2 text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                        {{ props.hero ? 'Editar' : 'Agregar' }} superhéroe
                    </button>
                </form>
            </div>
        </div>
    </div>
</div> 
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type HeroInterface from '../interfaces/HeroInterface';

const props = defineProps<{
    id: string;
    hero: HeroInterface | null;
}>();

const emit = defineEmits(['submit']);

const mode = ref<string>('create');
const defaultImage = 'https://imgs.search.brave.com/D_kk23RGsqBvYC6UdYEK6Sn0Ahl9FU9npIJP4Teyj0U/rs:fit:500:0:0:0/g:ce/aHR0cDovL2Jsb2cu/dG9mdGUtaXQuZGsv/d3AtY29udGVudC91/cGxvYWRzLzIwMTgv/MTIvcHJvZmlsZS1w/aWN0dXJlLnBuZw';
const imageUrl = ref<string>(props.hero?.picture || defaultImage);
const formData = ref({
    name: '',
    imageUrl,
    agility: 0,
    strength: 0,
    weight: 0,
    endurance: 0,
    charisma: 0,
});

watch(() => props.hero, (newHero) => {
    if (newHero) {
        mode.value = 'edit';
        formData.value.name = newHero.name;
        formData.value.imageUrl = newHero.picture || defaultImage;
        formData.value.agility = newHero.attributes.agility;
        formData.value.strength = newHero.attributes.strength;
        formData.value.weight = newHero.attributes.weight;
        formData.value.endurance = newHero.attributes.endurance;
        formData.value.charisma = newHero.attributes.charisma;
    } else {
        mode.value = 'create';
        formData.value.name = '';
        formData.value.imageUrl = defaultImage;
        formData.value.agility = 0;
        formData.value.strength = 0;
        formData.value.weight = 0;
        formData.value.endurance = 0;
        formData.value.charisma = 0;
    }
}, { immediate: true });

const submitForm = () => {
    const hero = {
        name: formData.value.name,
        picture: formData.value.imageUrl,
        attributes: {
            agility: formData.value.agility,
            strength: formData.value.strength,
            weight: formData.value.weight,
            endurance: formData.value.endurance,
            charisma: formData.value.charisma,
        },
    };
    emit('submit', {mode, data: hero});
};
</script>