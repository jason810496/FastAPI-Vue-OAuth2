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
                <div class="form-group">
                    <label for="birthdayField">Birthday </label>
                    <input v-model="form.birthday" type="date" class="form-control" id="birthdayField">
                </div>
                <div class=" d-flex justify-content-center">
                    <button type="submit" class="btn btn-primary" v-on:click="submit">Register</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { registerUser } from '../store/user';

const form = ref({
    username: '',
    password: '',
    birthday: '',
});

const submit = async () => {
    registerUser(form.value);
}

</script>