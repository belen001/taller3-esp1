<script setup>
import { ref, nextTick } from 'vue';
import { restartFighters } from '@/core/fighters';
import { playStartGameSound } from '@/core/utils';
import { play } from '@/core';
import { defaultPlayer1Controls, defaultPlayer2Controls } from '@/core/fighters';
import { useAuthStore } from '@/store/authStore';
import { useRecordsStore } from '@/store/recordsStore';
import FighterSelector from '@/components/organisms/FighterSelector.vue';
import FighterCard from '@/components/molecules/FighterCard.vue';
import VersusDisplay from '@/components/molecules/VersusDisplay.vue';
import Modal from '@/components/atoms/Modal.vue';

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
    // only add record if the winner is associated with a user
    if (winner.associatedUser) {
        const record = {
            user: winner.associatedUser,
            timestamp: new Date().toLocaleString(),
            winner: winner,
        }

        addRecord(record);
    }

    restartFighters();
    winnerRef.value = winner;
}

const onCloseModal = () => {
    winnerRef.value = null;
    start.value = false;
    player1.value = null;
    player2.value = null;
}

const handleStartGame = async () => {
    if (player1.value && player2.value) {
        players.value = [player1.value, player2.value];

        // associate the auth user to the player
        player1.value.setAssociatedUser(authUser);

        start.value = true;
        await nextTick();

        playStartGameSound();


        player1.value.initialize({
            fightArea: fightArea.value,
            controls: defaultPlayer1Controls,
        });
        player2.value.initialize({
            fightArea: fightArea.value,
            controls: defaultPlayer2Controls
        });

        // start the game
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
    <transition>
        <main v-if="!start" class="flex w-full h-full gap-10 text-text p-6">
            <FighterSelector v-model:player1="player1" v-model:player2="player2" :onStartGame="handleStartGame" />

        </main>

        <main v-else class="flex flex-col gap-5 py-6 text-text w-full h-full">
            <audio id="startGameAudio" src="src/assets/start-game.wav"></audio>
            <audio id="gameAudio" src="src/assets/fight.wav" preload="auto" loop></audio>

            <audio v-for="player in players" :id="`${player.playerID}HitAudio`" src="src/assets/hit-sound.mp3"
                preload="auto"></audio>

            <audio id="gameOverAudio" src="src/assets/round_end.wav" preload="auto"></audio>
            <VersusDisplay :player1="player1" :player2="player2" :authUser="authUser" />

            <div class="fight__area rounded-md shadow-lg shadow-primary-600/30" id="fightArea" ref="fightArea"></div>
        </main>

    </transition>
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


<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>