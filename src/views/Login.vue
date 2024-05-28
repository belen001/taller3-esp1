<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import { loginRules } from '@/validation/formRules';
import Input from '@/components/atoms/Input.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import BrandTile from '@/components/atoms/BrandTile.vue';

const router = useRouter();
const globalError = ref('');
const { login } = useAuthStore();

const loginData = ref({
    email: '',
    password: ''
})

const $v = useVuelidate(loginRules, loginData.value);


const handleLogin = async () => {
    try {
        const result = await $v.value.$validate();
        if (result) {
            login(loginData.value);
            router.push('/');
        }
    } catch (error) {
        console.log(error);
        globalError.value = error.message;
    }
};

</script>


<template>
    <main class="flex items-center justify-center h-full w-full text-text">
        <form @submit.prevent="handleLogin"
            class="flex flex-col gap-10 p-6 w-[60%] bg-primary-950/70 rounded-md justify-between">
            <div class="flex justify-between items-center">
                <h1 class="text-lg text-center text-text font-bold">
                    <FontAwesomeIcon :icon="faLock" class="mr-2" />
                    Login
                </h1>
                <BrandTile />
            </div>

            <div class="flex flex-col gap-6">
                <Input v-model="loginData.email" :errorMessage="$v.email.$errors[0]?.$message" title="Email"
                    placeholder="ejemplo@dominio.com" />
                <Input v-model="loginData.password" :errorMessage="$v.password.$errors[0]?.$message" title="Contraseña"
                    placeholder="********" type="password" />

                <span v-if="globalError" class="text-red-500 text-center text-sm font-semibold">{{ globalError }}</span>
            </div>

            <button type="submit" class="p-4 bg-primary-700 hover:bg-primary-800 transition-all text-sm duration-200 rounded-md 
                text-text font-semibold">Iniciar Sesión</button>

        </form>
    </main>
</template>