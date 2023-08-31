<template>
    <!-- Login fail modal -->
    <div 
        v-bind:class="{ 'invisible': !loginFailed }"
        class="fixed fixed-top mx-5"
        style="z-index: 99999;">
        <div class="mx-5 my-5">
            <!-- redirect to login page in 3 seconds -->
            <div class="alert alert-danger" role="alert">
                <h4 class="alert-heading">Unauthorize</h4>
                <p>Try refresh token fail.</p>
                <hr>
                <p class="mb-0">Redirecting to login page in 1 seconds...</p>
            </div>
        </div>
    </div>

    <!-- loading page -->
    <div 
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
  
<script>

import { apiRefresh } from '../api/auth';
export default {
    name: 'RefreshView',
    data(){
        return {
            loginFailed: false
        }
    },
    mounted(){
        apiRefresh()
        .then( (res) => {
            this.$store.dispatch('auth/setState', res.data);
            setTimeout(() => {
                this.$router.push('/profile');
            }, 1000);
        }).catch((error) => {
            this.$store.dispatch('auth/resetState');

            setTimeout(() => {
                this.loginFailed = true;
            }, 100);
            setTimeout(() => {
                this.$router.push('/login');
            }, 1200);
        });
    }
};
</script>