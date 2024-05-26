import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useRecordsStore = defineStore('record', () => {
    const records = ref([]);

    const getRecordsSortedByDate = () => {
        return records.value.sort((a, b) => {
            const dateA = new Date(a.timestamp);
            const dateB = new Date(b.timestamp);
            return dateB - dateA;
        });
    };

    const addRecord = (record) => {
        records.value.push(record)
    }

    return {
        records: getRecordsSortedByDate(),
        addRecord
    }

}, { persist: true })