import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useLoadingStore = defineStore('loading', () => {
    const loading = ref(false);

    const isLoading = computed(() => loading.value);

    async function setLoading(isLoading) {
        loading.value = isLoading;
    }

    async function setLoading() {
        loading.value = true;
    }

    async function clearLoading() {
        loading.value = false;
    }

    return {
        loading,
        isLoading,
        setLoading,
        clearLoading
    }
})