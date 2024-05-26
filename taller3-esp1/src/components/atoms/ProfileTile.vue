<script setup>
import Divider from '@/components/atoms/Divider.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { ref } from 'vue';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'vue-router';


const router = useRouter();
const { authUser, logout } = useAuthStore();
const isDropdownOpen = ref(false);

const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
};

const handleLogout = () => {
    logout();
    toggleDropdown();
    window.location.reload();
};

</script>


<template>
    <div v-if="authUser" class="flex items-center gap-4 relative dark:text-text">
        <img @click="toggleDropdown"
            class="w-10 h-10 rounded-full object-cover cursor-pointer hover:scale-[101%] transition-all duration-200"
            :src="authUser.picture" alt="Profile Picture" />
        <transition>
            <div v-if="isDropdownOpen" class="flex flex-col w-60 absolute top-10 right-6 rounded-md bg-primary-950">
                <div class="flex gap-5 w-full items-center p-4">
                    <img class="w-10 h-10 rounded-full object-cover cursor-pointer hover:scale-[101%] transition-all duration-200"
                        :src="authUser.picture" alt="Profile Picture" />
                    <h3 class="text-sm font-medium"> {{ authUser.name }}</h3>

                </div>
                <Divider />
                <ul class="flex flex-col gap-3 text-sm">
                    <li @click="handleLogout"
                        class="flex items-center gap-3 hover:bg-primary-900/60 rounded-md transition-all duration-200 cursor-pointer p-4">
                        <FontAwesomeIcon class="text-red-500" :icon="faArrowRightFromBracket" />
                        Cerrar sesión
                    </li>

                </ul>

            </div>
        </transition>
    </div>

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