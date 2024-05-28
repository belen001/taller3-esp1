<script setup>
// FightersCarroussel.vue
import { ref } from 'vue';
import { fighters } from '@/core/fighters';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import FighterCard from '../molecules/FighterCard.vue';

const carouselRef = ref(null);

const scrollLeft = () => {
    if (carouselRef.value) {
        carouselRef.value.scrollBy({ left: -400, behavior: 'smooth' });
    }
};

const scrollRight = () => {
    if (carouselRef.value) {
        carouselRef.value.scrollBy({ left: 400, behavior: 'smooth' });
    }
};

</script>

<template>
    <main class="flex flex-col w-full gap-6 overflow-hidden">
        <h3 class="text-sm"> Personajes </h3>
        <div class="relative w-full">
            <button @click="scrollLeft" class="absolute left-1 top-1/2 transform -translate-y-1/2 z-10 p-2 
                bg-primary-950 transition-all duration-200 text-white rounded-full shadow-md hover:bg-primary-800">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <section ref="carouselRef" class="flex w-full overflow-x-auto gap-10 overflow-hidden px-4 py-10">
                <FighterCard class="flex-shrink-0 w-[400px] h-[400px] cursor-default select-none hover:scale-[102%]"
                    v-for="fighter in fighters" :onlyPresentation="true" :fighter="fighter" :key="fighter.id" />
            </section>
            <button @click="scrollRight" class="absolute right-1 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-primary-950 transition-all 
                duration-200 text-white rounded-full shadow-md hover:bg-primary-800">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    </main>
</template>

<style scoped>
section {
    scrollbar-width: none;
}
</style>