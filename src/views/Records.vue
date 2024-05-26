<script setup>
import { useRecordsStore } from '@/store/recordsStore';

const { records } = useRecordsStore();

console.log(records);

</script>

<template>
    <main class="flex flex-col w-full gap-4 p-6 dark:text-text">
        <h3 class="font-semibold"> Récords</h3>

        <section class="flex flex-col w-full gap-4">
            <div class="flex justify-between items-center w-full p-4" v-if="records.length > 0"
                v-for="record in records">
                <div class="flex flex-col gap-3">
                    <h3> {{ record.user }}</h3>
                    <p> {{ record.timestamp }}</p>
                </div>
                <p> Personaje: {{ record.winner.name }}</p>
            </div>
            <p class="text-sm text-text/70 ml-2" v-else> No se encontraron récords.</p>
        </section>
    </main>

</template>