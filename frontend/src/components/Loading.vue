<template>
    <!-- loading page -->
    <div 
        v-bind:class="{'invisible': !store.isLoading }"
        class="fixed-top h-100 w-100 d-flex align-items-center justify-content-center"
        style="z-index: 9999; background: #00044152;">
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
                </div>
            </div>
        </div>
    </div>

</template>
  
<script setup>

import { useLoadingStore } from '../store/loading';
const store = useLoadingStore();

</script>