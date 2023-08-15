<template>
    <ForgetPass title="Save as ..." role="saveAs"/>
</template>
    

<script>
import ForgetPass from '../components/ForgetPass.vue';
import store from "../store";

export default {
    components: {
        ForgetPass,
    },
    // beforeRouteEnter(to, from) {
    //     store.dispatch("formState/setCurrentState", { currentState: "newMap" });
    // },
}
</script>
