import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useRecordsStore = defineStore('record', () => {
    const records = ref([]);

    const addRecord = (record) => {
        records.value.unshift(record)
    }

    return {
        records,
        addRecord
    }

}, { persist: true })