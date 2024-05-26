<script setup>
import { handleStartButton } from '@/core';

</script>

<template>
    <main class="text-text p-6">
        <h1>Play</h1>
        <p>Play page</p>
        <button @click="handleStartButton"> Start </button>

        <canvas id="fightArea"></canvas>
    </main>
</template>