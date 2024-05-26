<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import { loginRules } from '@/validation/formRules';
import Input from '@/components/atoms/Input.vue';

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
    <main class="flex items-center justify-center h-full w-full">
        <form @submit.prevent="handleLogin"
            class="flex flex-col gap-4 p-6 h-[40%] w-[60%] bg-primary-950/70 rounded-md justify-between">
            <h1 class="text-xl text-center text-text font-bold">Login</h1>

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