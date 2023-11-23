<template>
    <div class="row d-flex justify-content-center mx-auto mt-5">
        <div class="col-4 pt-6">
            <form>
                <div class="form-group">
                    <label for="usernameField">Username</label>
                    <input v-model="form.username" type="text" class="form-control" id="usernameField">
                </div>
                <div class="form-group">
                    <label for="passwordField">Password</label>
                    <input v-model="form.password" type="password" class="form-control" id="passwordField">
                </div>
                <div class="d-flex justify-content-center">
                    <button type="submit" class="btn btn-primary" v-on:click="submit">Login</button>
                </div>
            </form>
        </div>
    </div>

</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../store/auth';

const form = ref({
    username: '',
    password: ''
});

const auth = useAuthStore();

const submit = async () => {
    await auth.login(form.value);
}

onMounted(() => {
    auth.refreshForLogin();
});


</script>