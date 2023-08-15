<template>
    <!-- Login fail modal -->
    <div 
        v-bind:class="{ 'invisible': !loginFailed }"
        class="fixed-top mx-5"
        style="z-index: 999;">
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
import { mapState  } from 'vuex';
import store from '../store';

export default {
    name: 'RefreshView',
    inject: ['$api'],
    data(){
        return {
            loginFailed: false
        }
    },
    mounted(){
        console.log("RefreshView mounted");
        this.$api.v1.auth.refresh()
        .then( (res) => {
            console.log("res", res);
            store.dispatch('auth/setAccessToken', res.data.access_token);
            store.dispatch('auth/setRefreshToken', res.data.refresh_token);
            store.dispatch("auth/setLastLogin", Date.now());
            setTimeout(() => {
                this.$router.push('/profile');
            }, 3000);
        }).catch((error) => {
            store.dispatch('auth/resetAccessToken');
            store.dispatch('auth/resetRefreshToken');
            store.dispatch("auth/resetLastLogin");

            setTimeout(() => {
                this.loginFailed = true;
            }, 200);
            setTimeout(() => {
                this.$router.push('/login');
            }, 1000);
        });
    }
};
</script>