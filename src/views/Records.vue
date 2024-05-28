<script setup>
import { useRecordsStore } from '@/store/recordsStore';

const { records } = useRecordsStore();

</script>

<template>
    <main class="flex flex-col w-full gap-4 p-6 text-text">
        <article class=" prose lg:prose-base prose-invert">
            <h3 class="font-semibold"> Récords</h3>
            <p> Aquí se encuentran los récords y/o calificaciones de los usuarios globales,
                ordenadas de manera descendente por fecha.

            </p>
        </article>

        <section class="flex flex-col w-full gap-4 overflow-y-auto px-2">
            <div class="flex justify-between items-center w-full p-4 hover:bg-primary-950/60 
            transition-all duration-200 rounded-md" v-if="records.length > 0" v-for="record in records">
                <div class="flex flex-col gap-3">
                    <picture class="flex gap-4 items-center">
                        <img :src="record.user.picture" class="h-8 w-8 rounded-full object-cover" />
                        <h3 class="font-medium"> {{ record.user.name }}</h3>
                    </picture>
                    <p> {{ record.timestamp }}</p>
                </div>
                <picture class="flex flex-col gap-2">
                    <img :src="record.winner.image" class="h-10 w-10 rounded-md object-cover" />
                    <p class="text-center text-sm">{{ record.winner.name }}</p>
                </picture>
            </div>
            <p class="text-sm text-text/70 ml-2" v-else> No se encontraron récords.</p>
        </section>
    </main>

</template>