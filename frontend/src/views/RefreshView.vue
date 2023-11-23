<template>
    <!-- loading page -->
    <div 
        v-bind:class="{'invisible': !auth.isRefresh}"
        class="fixed-top h-100 w-100 d-flex align-items-center justify-content-center"
        style="background: #00044152;">
        <div class="mx-5">
            <div class="mx-5 my-5">
                <div class="d-flex flex-row justify-content-center">
                    <div>
                        <div class="spinner-border" role="status">
                            <span class="sr-only">Loading ...</span>
                        </div>
                    </div>
                </div>
                <div class="d-flex flex-row justify-content-center">
                    <div class="mt-3">Loading ...</div>
                    <div class="mt-3">Try refresh token.</div>
                </div>
            </div>
        </div>
    </div>

</template>
  
<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from '../store/auth';

const auth = useAuthStore();

onMounted(() => {
    auth.refresh();
});

</script>