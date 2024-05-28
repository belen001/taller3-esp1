<script setup>
// wiki view
import Onboarding from '../components/md/Onboarding.md';
import Footer from '../components/md/Footer.md';
import FightersCarroussel from '@/components/organisms/FightersCarroussel.vue';

</script>
<template>
    <main class="flex flex-col gap-4 p-6 overflow-y-auto">
        <article class="prose lg:prose-base dark:prose-invert dark:text-text flex flex-col w-full">

            <Onboarding />
            <FightersCarroussel />
            <Footer />
        </article>
    </main>
</template>
