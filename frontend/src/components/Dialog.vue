<template>
    <div class="fixed-top container center"
        v-bind:class="{'invisible': !store.isShow }" >
        <div class="mx-5">
            <div class="mx-5 my-5">
                <div class="alert" role="alert"
                    :class="`alert-${store.dialogType}`">
                    <h4 class="alert-heading">{{ store.dialogContent.title }}</h4>
                    <p>{{ store.dialogContent.firstLine }}</p>
                    <hr>
                    <p class="mb-0">{{ store.dialogContent.secondLine }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>

import { useDialogStore } from '../store/dialog';
const store = useDialogStore();

</script>