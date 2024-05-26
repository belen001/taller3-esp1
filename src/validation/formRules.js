import { required, email, minLength, helpers } from '@vuelidate/validators';
import { computed } from 'vue';

export const loginRules = computed(() => {
    return {
        email: {
            required: helpers.withMessage('El correo es requerido', required),
            email: helpers.withMessage('El correo no es válido', email)
        },
        password: {
            required: helpers.withMessage('La contraseña es requerida', required),
        }
    }
})