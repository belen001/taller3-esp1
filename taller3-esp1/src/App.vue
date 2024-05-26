<script setup>
import Header from './components/layout/Header.vue';
import { useRoute } from 'vue-router';

const route = useRoute();

</script>

<template>
    <Header v-if="route.path !== '/login'" />
    <RouterView></RouterView>
</template>
