<template>
    <HeroesLayout>
        <div v-if="filteredHeroes.length > 0" class="flex justify-between items-center">
            <div class="flex-grow m-8">
                <SearchComponent :placeholder="'Buscar héroe'" @input="onInput"></SearchComponent>
            </div>
        </div>

        <div v-if="filteredHeroes.length > 0" class="text-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-9" style="height: calc(100vh - 150px); overflow-y: auto;">
            <HeroCardComponent v-for="hero in filteredHeroes" :key="hero.id" :hero="hero" class="w-full" @innerClick="() => { openModal(); selectedHero.value = hero; }" @remove="removeHero(hero.id!)">
            </HeroCardComponent>
        </div>
        <div v-else class="flex justify-center items-center h-full">
            <p class="text-white text-lg">No hay héroes disponibles. Por favor, crea al menos un héroe usando el botón de abajo.</p>
        </div>

        <button @click="openModal()" data-modal-target="add-edit-hero" data-modal-toggle="add-edit-hero" class="fixed bottom-1 right-7 inline-flex items-center justify-center p-2 mb-1 overflow-hidden text-lg font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
            <span class="cursor-pointer relative px-6 py-3 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                Crear superhéroe
            </span>
        </button>
    </HeroesLayout>
    <CreateEditHeroModal :id="'add-edit-hero'" :hero="selectedHero?.value" @submit="onSubmit"></CreateEditHeroModal>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, type Ref } from 'vue';
import HeroesLayout from '../layouts/HeroesLayout.vue';
import HeroCardComponent from '../components/HeroCardComponent.vue';
import SearchComponent from '../components/SearchComponent.vue';
import CreateEditHeroModal from '../components/CreateEditHeroModal.vue';
import type HeroInterface from '../interfaces/HeroInterface';
import { Modal, type ModalOptions, type InstanceOptions } from 'flowbite';
import { onMounted, onUnmounted } from 'vue';
import { getHeroes, createHero, updateHero, deleteHero } from '../services/HeroesServices.ts';

const heroes: Ref<HeroInterface[]> = ref([]);
onBeforeMount( async () => {
    heroes.value = await getHeroes();
    const $modalElement = document.querySelector('#add-edit-hero') as HTMLElement | null;
    if ($modalElement) {
        const modalOptions: ModalOptions = {
            placement: 'center',
            backdrop: 'dynamic',
            backdropClasses:
                'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
            closable: true,
            onHide: () => {
                selectedHero.value = { value: null };
            },
            onShow: () => {
                console.log('modal is shown');
            },
            onToggle: () => {
                console.log('modal has been toggled');
            },
        };

        const instanceOptions: InstanceOptions = {
          id: 'modalEl',
          override: true
        };

        modalInstance = new Modal($modalElement, modalOptions, instanceOptions);

        (window as any).modalInstance = modalInstance;
    } else {
        console.error('Modal element not found');
    }
});
onMounted( async () => {
    filteredHeroes.value = await getHeroes();
    const $modalElement = document.querySelector('#add-edit-hero') as HTMLElement | null;
    if ($modalElement) {
        const modalOptions: ModalOptions = {
            placement: 'center',
            backdrop: 'dynamic',
            backdropClasses:
                'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
            closable: true,
            onHide: () => {
                selectedHero.value = { value: null };
            },
            onShow: () => {
                console.log('modal is shown');
            },
            onToggle: () => {
                console.log('modal has been toggled');
            },
        };

        const instanceOptions: InstanceOptions = {
          id: 'modalEl',
          override: true
        };

        modalInstance = new Modal($modalElement, modalOptions, instanceOptions);

        (window as any).modalInstance = modalInstance;
    } else {
        console.error('Modal element not found');
    }
});

onUnmounted(() => {
    if (modalInstance) {
        modalInstance.hide();
        (window as any).modalInstance = null; // referencia global
        modalInstance = null; // referencia local
    }
});

const filteredHeroes = ref<HeroInterface[]>(heroes.value);
let modalInstance: Modal | null = null;
const selectedHero = ref<{ value: HeroInterface | null }>({ value: null });


const onInput = (value: string) => {
    filteredHeroes.value = heroes.value.filter(hero => {
        if (value === '') {
            return heroes.value;
        } else {
            return hero.name.toLowerCase().includes(value.toLowerCase());
        }
    });
};

const openModal = () => {
    if (modalInstance) {
        modalInstance.show();
    }
};

const onSubmit = async ({ mode, data }: { mode: Ref<string>, data: HeroInterface }) => {
    console.log({data});
    if (mode.value === 'create') {
        await createHero(data);
    } else if (mode.value === 'edit') {
        await updateHero(selectedHero.value?.value?.id as string, data);
    }
    filteredHeroes.value = await getHeroes();
    modalInstance?.hide();
};

const removeHero = async (id: string) => {
    await deleteHero(id);
    filteredHeroes.value = await getHeroes();
};
</script>