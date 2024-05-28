<script setup>
import { ref } from 'vue';
import { fighters } from '@/core/fighters';
import { playSelectedPlayerSound, playUnselectedPlayerSound } from '@/core/utils';

import FighterCard from '../molecules/FighterCard.vue';

const fightersRef = ref(fighters);

const props = defineProps({
    player1: {
        type: Object,
        required: true
    },
    player2: {
        type: Object,
        required: true
    },
    onStartGame: Function
})

const emits = defineEmits(['update:player1', 'update:player2']);

const handlePlayerSelect = (fighter) => {
    if (props.player1 === null) {
        handlePlayer1Select(fighter);
    } else if (props.player2 === null) {
        handlePlayer2Select(fighter);
    }

    playSelectedPlayerSound();
}

const handlePlayer1Select = (fighter) => {
    fightersRef.value = fightersRef.value.filter(f => f.playerID !== fighter.playerID);
    emits('update:player1', fighter);
}

const handlePlayer2Select = (fighter) => {
    fightersRef.value = fightersRef.value.filter(f => f.playerID !== fighter.playerID);
    emits('update:player2', fighter);
}

const handleTitle = () => {
    if (!props.player1) return "Selecciona un luchador";
    else if (!props.player2) return "Selecciona un contrincante";
    else return "¡A luchar!";
}

const handleUnselectPlayer1 = (player) => {
    if (props.player1 !== null) {
        fightersRef.value = [...fightersRef.value, player];
        emits('update:player1', null);

        playUnselectedPlayerSound();
    }
}

const handleUnselectPlayer2 = (player) => {
    if (props.player2 !== null) {
        fightersRef.value = [...fightersRef.value, player];
        emits('update:player2', null);

        playUnselectedPlayerSound();
    }
}

</script>

<template>
    <audio id="selectedPlayerAudio" src="src/assets/selected-player.wav"></audio>
    <audio id="unselectedPlayerAudio" src="src/assets/unselected-player.wav"></audio>
    <section class="flex flex-col gap-6 max-h-full">
        <h3 class="text-lg font-semibold text-center"> Personajes</h3>
        <div class="flex flex-col w-full items-center gap-10 overflow-y-auto px-4 py-2">
            <FighterCard @click="handlePlayerSelect(fighter)" v-for="fighter in fightersRef" :fighter="fighter" />
        </div>
    </section>
    <div class="flex flex-col gap-8 w-full h-full items-center justify-center">
        <h3 class="font-semibold"> {{ handleTitle() }} </h3>
        <div class="flex w-full justify-between items-center">
            <FighterCard @click="handleUnselectPlayer1(player1)" class="h-80 w-60" :fighter="player1"
                :onlyPresentation="true" />
            vs
            <FighterCard @click="handleUnselectPlayer2(player2)" class="h-80 w-60" :fighter="player2"
                :onlyPresentation="true" />
        </div>
        <button v-if="player1 && player2" class="
            w-40
            bg-primary-900 text-text font-semibold p-4 rounded-md shadow-lg 
                shadow-primary-900/80 
                hover:bg-primary-950
                hover:shadow-primary-900/90 transition-all duration-200 cursor-pointer" @click="onStartGame">
            Comenzar
        </button>
    </div>
</template>