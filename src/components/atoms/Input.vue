<script setup>
import { computed, watch } from 'vue';

const props = defineProps({
    title: String,
    type: {
        type: String,
        default: 'text'
    },
    name: String,
    placeholder: String,
    modelValue: String,
    onInput: Function,
    errorMessage: {
        type: String,
        default: ''
    },
    formatter: {
        type: Function,
        default: (value) => value
    }
})

const emits = defineEmits(['update:modelValue']);

const handleInput = (event) => {
    emits('update:modelValue', event.target.value);
};

const borderClass = computed(() =>
    props.errorMessage !== ''
        ? 'border-[1.5px] ring-red-500 focus:border-red-600 focus:ring-red-600 focus:outline-none'
        : 'border-[1.5px] border-transparent ring-primary-500 focus:border-primary-700 focus:ring-primary-700'
);

if (props.formatter) {
    watch(() => props.modelValue, (newValue) => {
        handleInput({
            target: {
                value: props.formatter(newValue)
            }
        });
    });
}
</script>

<template>
    <div class="flex flex-col gap-2 w-full">
        <label :for="title" class="text-text/60 text-sm font-medium">
            {{ title }}
            <span class="ml-2 text-red-500 font-medium text-xs" v-if="errorMessage !== ''">
                {{ errorMessage }}
            </span>
        </label>
        <input :value="modelValue" @input="handleInput" :type="type" :id="title" :class="borderClass"
            class="
            bg-primary-900 text-text
            text-sm w-full p-2.5 border-[1.5px] border-transparent ring-1 transition-all duration-100 focus:outline-none focus:border-[1.5px]  rounded-md " :placeholder="placeholder" />

    </div>
</template>
