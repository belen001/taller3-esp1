<script setup>
import ProfileTile from '@/components/atoms/ProfileTile.vue';
import { routes } from '@/router/router';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/store/authStore';
import BrandTile from '../atoms/BrandTile.vue';

const { isAuthenticated } = useAuthStore();

const actualRoute = useRoute();

const isActiveRoute = (route) => {
    return route.path === actualRoute.path;
};


</script>


<template>
    <header class="flex w-full justify-between select-none items-center px-6 h-20 bg-secondary-950">
        <BrandTile />
        <div class="flex items-center gap-4">
            <nav>
                <ul class="flex gap-10 items-center">
                    <li v-for="route in routes">
                        <router-link v-if="route.meta.showInNav" :to="route.path" :class="isActiveRoute(route) ? 'dark:text-text' : 'dark:text-text/50'
                            " class="
                    text-white hover:text-text transition-all duration-200">
                            {{ route.name }}
                        </router-link>
                    </li>
                </ul>
            </nav>
            <ProfileTile v-if="isAuthenticated" />
        </div>
    </header>

</template>