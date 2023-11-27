import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiLogin, apiRefresh, apiLogout } from '../api/auth'
import { useLoadingStore } from './loading';
import { useDialogStore } from './dialog';
import router from '../router';

export const useAuthStore = defineStore('auth', () => {
    const access_token = ref(null);
    const expires_in = ref(null);

    const loadingStore = useLoadingStore();
    const dialogStore = useDialogStore();

    const isAuthenticated = computed(() => access_token.value && expires_in.value && expires_in.value > Date.now());
    const get_access_token = computed(() => access_token.value);
    const get_expires_in = computed(() => expires_in.value);

    async function login(form) {
        access_token.value = null;
        expires_in.value = null;

        loadingStore.setLoading();

        apiLogin(form)
        .then(res => {
            access_token.value = res.data.access_token;
            expires_in.value = res.data.expires_in;

            dialogStore.setSuccess({
                title: 'Login Success',
                firstLine: 'You can login now',
                secondLine: 'This dialog will close in 1 seconds'
            });
        })
        .catch(err => {
            dialogStore.setError({
                title: 'Login Failed',
                firstLine: 'Please check your input',
                secondLine: 'This dialog will close in 1 seconds'
            });
            access_token.value = null;
            expires_in.value = null;
        })
        .finally( () => {
            loadingStore.clearLoading();
            setTimeout(() => {
                dialogStore.reset();

                console.log(isAuthenticated.value);
                console.log(access_token.value);
                console.log(expires_in.value);
                console.log(Date.now());    

                if (isAuthenticated.value){
                    router.push('/profile');
                    console.log('pushed to profile');
                }

            }, 1000);
        })

    }

    function logout() {
        apiLogout()
        .then(res => {
            access_token.value = null;
            expires_in.value = null;

            dialogStore.setSuccess({
                title: 'Logout Success',
                firstLine: 'Redirecting to login page 1 second',
                secondLine: ''
            });

            setTimeout(() => {
                dialogStore.reset();
                router.push('/login');
            },1000);
        });
    }

    function refresh() {
        loadingStore.setLoading();

        apiRefresh()
        .then(res => {
            access_token.value = res.data.access_token;
            expires_in.value = res.data.expires_in;

            dialogStore.setSuccess({
                title: 'Refresh Success',
                firstLine: 'Redirecting to profile page',
                secondLine: 'This dialog will close in 1 seconds'
            });
        })
        .catch(err => {
            console.log(err);
            access_token.value = null;
            expires_in.value = null;

            dialogStore.setError({
                title: 'Refresh Failed',
                firstLine: 'Please login again',
                secondLine: 'This dialog will close in 1 seconds'
            });
        })
        .finally( () => {
            setTimeout(() => {
                if (isAuthenticated.value){
                    router.push('/profile');
                    console.log('pushed to profile');
                }
                else{
                    router.push('/login');
                    console.log('pushed to login');
                }
                
                dialogStore.reset();
                loadingStore.clearLoading();

            }, 1000);
        })
    }

    function refreshForLogin() {
        loadingStore.setLoading();

        apiRefresh()
        .then(res => {
            access_token.value = res.data.access_token;
            expires_in.value = res.data.expires_in;
        })
        .catch(err => {
            console.log(err);
            access_token.value = null;
            expires_in.value = null;
        })
        .finally( () => {
            
            if (isAuthenticated.value){
                router.push('/profile');
                console.log('pushed to profile');
            }
            else{
                router.push('/login');
                console.log('pushed to login');
            }

            loadingStore.clearLoading();
        })
    }

    return {
        access_token,
        get_access_token,
        get_expires_in,
        isAuthenticated,
        login,
        logout,
        refresh,
        refreshForLogin
    }
})