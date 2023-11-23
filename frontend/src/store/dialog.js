import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useDialogStore = defineStore('dialog', () => {
    const type = ref(''); // 'success' or 'danger' , for bootstrap alert
    const show = ref(false);
    const content = ref({
        'title': '',
        'firstLine': '',
        'secondLine': '',
    })

    const isShow = computed(() => show.value);
    const dialogContent = computed(() => content.value);
    const dialogType = computed(() => type.value);


    async function setSuccess(newContent) {
        show.value = true;
        type.value = 'success';
        content.value = newContent;
    }

    async function setError(newContent) {
        show.value = true;
        type.value = 'danger';
        content.value = newContent;
    }

    async function reset() {
        show.value = false;
    }

    return {
        dialogContent,
        isShow,
        dialogType,
        setSuccess,
        setError,
        reset
    }
})