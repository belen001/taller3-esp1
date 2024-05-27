<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHeartPulse, faHandFist } from '@fortawesome/free-solid-svg-icons';

defineProps({
    fighter: Object,
    onlyPresentation: {
        type: Boolean,
        default: false
    }
});


</script>


<template>
    <div :class="!fighter && 'animate-pulse'" class="flex select-none flex-col max-w-60 rounded-md bg-primary-950/70 
    hover:scale-[102%] transition-all duration-200 cursor-pointer shadow-lg shadow-primary-900/80">
        <img :src="fighter?.image ?? 'src/assets/unselected.jpg'"
            class="w-full flex-1 aspect-square object-cover rounded-md" />

        <div v-if="fighter" class="flex flex-col gap-4 w-full p-4">
            <h3 class="font-semibold"> {{ fighter.name }}</h3>
            <div v-if="!onlyPresentation" class="flex w-full justify-between">
                <p class="text-sm">
                    <FontAwesomeIcon :icon="faHeartPulse" class="text-red-500 mr-2" />
                    {{ fighter.health }}
                </p>
                <p class="text-sm">
                    <FontAwesomeIcon :icon="faHandFist" class="text-blue-500 mr-2" />
                    {{ fighter.damage }}
                </p>
            </div>
        </div>
    </div>

</template>