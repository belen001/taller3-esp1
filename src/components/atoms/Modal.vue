<script setup>

const props = defineProps({
    isOpen: Boolean,
    onClose: Function,
})

const handleCloseClick = () => {
    props.onClose();
}

</script>

<template>
    <transition>
        <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-text"
            @click="handleCloseClick">
            <div @click.stop
                class=" bg-secondary-950 max-h-[85vh] overflow-y-auto rounded-md flex flex-col gap-6 p-6 z-10">
                <slot></slot>
            </div>
        </div>
    </transition>
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