<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { play } from '@/core';
import { FighterControls } from '@/core/models/FighterControls';
import { useAuthStore } from '@/store/authStore';
import { useRecordsStore } from '@/store/recordsStore';
import FighterSelector from '@/components/organisms/FighterSelector.vue';
import FighterCard from '@/components/molecules/FighterCard.vue';

const player1Controls = new FighterControls({
    toUp: "w",
    toDown: "s",
    toLeft: "a",
    toRight: "d",
    attack: "q",
});

const player2Controls = new FighterControls({
    toUp: "i",
    toDown: "k",
    toLeft: "j",
    toRight: "l",
    attack: "o",
})

const { authUser } = useAuthStore();
const { addRecord } = useRecordsStore();

const fightArea = ref(null);
const speed = 30;

const start = ref(false);
const player1 = ref(null);
const player2 = ref(null);

const handleGameFinish = (winner) => {
    const record = {
        user: authUser.name,
        timestamp: new Date().toLocaleString(),
        winner: winner,
    };

    addRecord(record);
    start.value = false;
    player1.value = null;
    player2.value = null;
    fightArea.value.innerHTML = "";
    nextTick(() => {
        fightArea.value.innerHTML = "";
    });

}


const handleStartGame = async () => {
    if (player1.value && player2.value) {
        start.value = true;
        await nextTick();

        player1.value.initialize({
            fightArea: fightArea.value,
            controls: player1Controls,
        });
        player2.value.initialize({
            fightArea: fightArea.value,
            controls: player2Controls
        });

        // Start the game

        play({
            player1: player1.value,
            player2: player2.value,
            speed: speed,
            onGameFinish: handleGameFinish,
        });
    }
}



</script>

<template>
    <main v-if="!start" class="flex w-full h-full gap-10 text-text p-6">
        <FighterSelector v-model:player1="player1" v-model:player2="player2" />
        <div class="flex flex-col gap-8 w-full h-full items-center justify-center">
            <div class="flex w-full justify-between items-center">
                <FighterCard :fighter="player1" :onlyPresentation="true" />
                vs
                <FighterCard :fighter="player2" :onlyPresentation="true" />
            </div>
            <button v-if="player1 && player2" class="
            w-40
            bg-primary-900 text-text font-semibold p-4 rounded-md shadow-lg 
                shadow-primary-900/80 
                hover:bg-primary-950
                hover:shadow-primary-900/90 transition-all duration-200 cursor-pointer" @click="handleStartGame"> Start
            </button>
        </div>
    </main>
    <main v-else class="flex flex-col gap-5 text-text w-full h-full">
        <audio id="gameAudio" src="../assets/fight.wav" preload="auto" loop></audio>
        <audio id="player1HitAudio" src=".../assets/hit-sound.mp3" preload="auto"></audio>
        <audio id="player2HitAudio" src="../assets/hit-sound.mp3" preload="auto"></audio>
        <audio id="gameOverAudio" src="../assets/round_end.wav" preload="auto"></audio>

        <div class="flex w-full justify-between">
            <picture class="flex flex-col gap-2">
                <!-- <img :src="player1.image" /> -->
                <h3 :id="`${player1.playerID}Stats`" class="player__stats"></h3>
                <div :id="`${player1.playerID}Life`" class="life__bar">
                    <div class="life__bar-inner" style="width: 100%"></div>
                </div>
            </picture>
            <picture>
                <!-- <img :src="player2.image" /> -->
                <h3 :id="`${player2.playerID}Stats`" class="player__stats"></h3>
                <div :id="`${player2.playerID}Life`" class="life__bar">
                    <div class="life__bar-inner" style="width: 100%"></div>
                </div>
            </picture>
        </div>
        <div class="fight__area" id="fightArea" ref="fightArea"></div>
    </main>
</template>