import { defineStore } from "pinia";
import users from "@/assets/users.json"
import { ref } from "vue";

const findUserByCredentials = (email, password) => {
    return users.find(user => user.email === email && user.password === password)
}

export const useAuthStore = defineStore('auth', () => {
    const isAuthenticated = ref(false);
    const authUser = ref(null);

    const login = ({ email, password }) => {
        const userFound = findUserByCredentials(email, password);

        if (userFound) {
            isAuthenticated.value = true;
            authUser.value = userFound;
        } else {
            throw new Error('Credenciales Inválidas');
        }
    }

    const logout = () => {
        isAuthenticated.value = false;
        authUser.value = null;
    }

    return { isAuthenticated, authUser, login, logout }

}, { persist: true })