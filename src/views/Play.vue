<script setup>
import { ref, nextTick } from 'vue';
import { play } from '@/core';
import { FighterControls } from '@/core/models/FighterControls';
import { useAuthStore } from '@/store/authStore';
import { useRecordsStore } from '@/store/recordsStore';
import FighterSelector from '@/components/organisms/FighterSelector.vue';
import FighterCard from '@/components/molecules/FighterCard.vue';
import Modal from '@/components/atoms/Modal.vue';

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

const winnerRef = ref(null);
const start = ref(false);
const player1 = ref(null);
const player2 = ref(null);
const players = ref([]);



const handleGameFinish = (winner) => {
    const record = {
        user: authUser.name,
        timestamp: new Date().toLocaleString(),
        winner: winner,
    };

    addRecord(record);
    winnerRef.value = winner;
}

const onCloseModal = () => {
    winnerRef.value = null;
    window.location.reload();
}

const handleStartGame = async () => {
    if (player1.value && player2.value) {

        players.value = [player1.value, player2.value];

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
        <FighterSelector v-model:player1="player1" v-model:player2="player2" :onStartGame="handleStartGame" />

    </main>
    <main v-else class="flex flex-col gap-5 py-6 text-text w-full h-full">
        <audio id="gameAudio" src="src/assets/fight.wav" preload="auto" loop></audio>

        <audio v-for="player in players" :id="`${player.playerID}HitAudio`" src="src/assets/hit-sound.mp3"
            preload="auto"></audio>

        <audio id="gameOverAudio" src="src/assets/round_end.wav" preload="auto"></audio>

        <div class="flex w-full justify-between">
            <picture class="flex flex-col gap-2">
                <img :src="player1.image" class="h-40 w-40 object-cover rounded-md" />
                <h3 :id="`${player1.playerID}Stats`" class="flex w-full justify-between"></h3>
                <div :id="`${player1.playerID}Life`" class="bg-primary-950/70 rounded-md w-80 h-10">
                    <div class="life__bar-inner" style="width: 100%"></div>
                </div>
            </picture>
            <picture class="flex flex-col gap-2">
                <img :src="player2.image" class="h-40 w-40 object-cover rounded-md" />
                <h3 :id="`${player2.playerID}Stats`" class="flex w-full justify-between"></h3>
                <div :id="`${player2.playerID}Life`" class="bg-primary-950/70 rounded-sm w-80 h-10">
                    <div class="life__bar-inner" style="width: 100%"></div>
                </div>
            </picture>
        </div>
        <div class="fight__area rounded-md shadow-lg shadow-primary-600/30" id="fightArea" ref="fightArea"></div>
    </main>

    <Modal :isOpen="winnerRef !== null" :onClose="onCloseModal">
        <div class="flex flex-col gap-12 items-center w-80">
            <h3 class="font-semibold"> ¡{{ winnerRef?.name }} ha ganado!</h3>
            <FighterCard :fighter="winnerRef" :onlyPresentation="true" />
            <button class="
            bg-primary-900 text-text font-semibold p-3 w-full rounded-md shadow-lg 
                shadow-primary-900/80 
                hover:bg-primary-950
                hover:shadow-primary-900/90 transition-all duration-200 cursor-pointer" @click="onCloseModal">
                Cerrar
            </button>
        </div>

    </Modal>


</template>