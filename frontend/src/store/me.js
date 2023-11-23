import { ref } from 'vue'
import { apiGetMyself, apiUpdatePass, apiUpdateBirth, apiDelateAccount } from '../api/me'
import { useLoadingStore } from './loading';
import { useDialogStore } from './dialog';
import { useAuthStore } from './auth';

function useProfile(){
    const loadingStore = useLoadingStore();
    const dialogStore = useDialogStore();
    const authStore = useAuthStore();

    // can't use `reactive` here
    // because `reactive` can only be used with `Array` ,`Map` or `Set`
    const me = ref({
        username: '',
        birthday: '',
        password: '',
    });

    const fetchMe = async () => {
        loadingStore.setLoading();

        try {
            const res = await apiGetMyself();
            me.value = res.data;
            console.log(me.value);
        }
        catch (err) {
            console.log(err);
        }
        finally {
            loadingStore.clearLoading();
        }
    }

    const reloadData = async () => {
        loadingStore.setLoading();

        apiGetMyself()
        .then(res => {
            me.value = res.data;
            dialogStore.setSuccess({
                title: 'Load Data Success',
                firstLine: 'Successfully loaded your data',
                secondLine: 'This dialog will close in 1 seconds'
            });
            console.log(res.data);
            console.log(me.value);
        })
        .catch(err => {
            console.log(err);
            dialogStore.setError({
                title: 'Failed to fetch data',
                firstLine: 'Please check your internet connection',
                secondLine: 'This dialog will close in 1 seconds'
            });
        })
        .finally(() => {
            loadingStore.clearLoading();
            setTimeout(() => {
                dialogStore.reset();
            }, 1000);
        });
    }

    const updatePassword = async () => {
        loadingStore.setLoading();
        apiUpdatePass({password: me.value.password})
        .then(res => {
            dialogStore.setSuccess({
                title: 'Update Success',
                firstLine: 'Update password successfully',
                secondLine: 'This dialog will close in 1 seconds'
            });
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            loadingStore.clearLoading();
            setTimeout(() => {
                dialogStore.reset();
            }, 1000);
        });
    }

    const updateBirthday = async () => {
        loadingStore.setLoading();
        apiUpdateBirth({birthday: me.value.birthday})
        .then(res => {
            dialogStore.setSuccess({
                title: 'Update Success',
                firstLine: 'Update birthday successfully',
                secondLine: 'This dialog will close in 1 seconds'
            });
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            loadingStore.clearLoading();
            setTimeout(() => {
                dialogStore.reset();
            }, 1000);
        });
    }

    const changeAccessToken = () => {
        authStore.access_token = null;

        dialogStore.setSuccess({
            title: 'Delete Access Token Success',
            firstLine: 'The access token has been deleted.',
            secondLine: 'Click "Reload\" to try refresh token.',    
        });
        setTimeout(() => {
            dialogStore.reset();
        }, 1000);
    }

    // load data before component mounted
    fetchMe();

    return {
        me,
        reloadData,
        updatePassword,
        updateBirthday,
        changeAccessToken
    }
}

export { useProfile }