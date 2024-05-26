import { defineStore } from 'pinia'

export const useRecordsStore = defineStore('record', () => {
    const records = ref([]);

    const getRecordsSortedByScore = () => {
        return records.value.sort((a, b) => b.score - a.score)
    }

    const addRecord = (record) => {
        records.value.push(record)
    }

    return { records, getRecordsSortedByScore, addRecord }
})