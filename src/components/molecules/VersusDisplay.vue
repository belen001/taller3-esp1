<script setup>
defineProps({
    player1: {
        type: Object,
        required: true
    },
    player2: {
        type: Object,
        required: true
    },
    authUser: {
        type: Object,
        required: true
    }
})

</script>

<template>

    <div class="flex w-full items-center justify-between">
        <picture class="flex flex-col gap-2">
            <img :src="player1.image" class="h-40 w-40 object-cover rounded-md" />
            <span class="flex gap-3 items-center">
                <img :src="authUser.picture" class="h-8 w-8 rounded-full object-cover" />
                <h3>{{ authUser.name }}</h3>
            </span>
            <h3 :id="`${player1.playerID}Stats`" class="flex w-full justify-between"></h3>
            <div :id="`${player1.playerID}Life`" class="bg-primary-950/70 rounded-md w-80 h-10">
                <div class="life__bar-inner" style="width: 100%"></div>
            </div>
        </picture>
        <h3 class="font-semibold"> v/s </h3>
        <picture class="flex flex-col gap-2">
            <img :src="player2.image" class="h-40 w-40 object-cover rounded-md" />
            <span class="flex gap-3 items-center">
                <img src="../../assets/unselected.jpg" class="h-8 w-8 rounded-full object-cover" />
                <h3> Desconocido </h3>
            </span>
            <h3 :id="`${player2.playerID}Stats`" class="flex w-full justify-between"></h3>
            <div :id="`${player2.playerID}Life`" class="bg-primary-950/70 rounded-sm w-80 h-10">
                <div class="life__bar-inner" style="width: 100%"></div>
            </div>
        </picture>
    </div>

</template>