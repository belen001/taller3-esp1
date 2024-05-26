<script setup>
import { ref } from 'vue';
import { fighters } from '@/core/fighters';

import FighterCard from '../molecules/FighterCard.vue';

const props = defineProps({
    player1: {
        type: Object,
        required: true
    },
    player2: {
        type: Object,
        required: true
    }
})


const emits = defineEmits(['update:player1', 'update:player2']);

const handlePlayerSelect = (fighter) => {
    if (props.player1 === null) {
        handlePlayer1Select(fighter);
    } else if (props.player2 === null) {
        handlePlayer2Select(fighter);
    }

}

const handlePlayer1Select = (fighter) => {
    emits('update:player1', fighter);
}

const handlePlayer2Select = (fighter) => {
    emits('update:player2', fighter);
}

</script>

<template>
    <section class="flex flex-col gap-6 max-h-full">
        <h3 class="text-lg font-semibold text-center"> Personajes</h3>
        <div class="flex flex-col w-full items-center gap-10 overflow-y-auto px-4">
            <FighterCard @click="handlePlayerSelect(fighter)" v-for="fighter in fighters" :fighter="fighter" />
        </div>
    </section>
</template>