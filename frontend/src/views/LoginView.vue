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

    <!-- notification div for login fail -->
    <div>
        <div v-bind:class="{'invisible': !loginFail}"
            class="fixed-top container center">
            <div class="mx-5">
                <div class="mx-5 my-5">
                    <div class="alert alert-danger" role="alert">
                        <h4 class="alert-heading">Login fail</h4>
                        <p>Username or password is incorrect.</p>
                        <hr>
                        <p class="mb-0">Please try again.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { apiLogin } from '../api/auth';
export default {
    name: 'LoginView',
    data() {
        return {
            form: {
                username: '',
                password: '',
            },
            loginFail: false,
        };
    },
    methods: {
        async submit(){
            apiLogin(this.form)
            .then( (res) => {
                this.$store.dispatch('auth/setState', res.data);
                setTimeout(() => {
                    this.$router.push('/profile');
                }, 1000);
            }).catch((error) => {
                this.$store.dispatch('auth/resetState');
                this.loginFail = true;
                setTimeout(() => {
                    this.loginFail = false;
                }, 1000);
            });
        }
    },
};
</script>