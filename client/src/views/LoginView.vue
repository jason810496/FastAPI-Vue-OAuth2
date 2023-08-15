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

export default {
    name: 'LoginView',
    inject: ['$api' , '$store' , '$router'],
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
        submit(){
            
            this.$api.v1.auth.login(this.form)
            .then((res) => {
                this.$store.dispatch("auth/setAccessToken", res.data.access_token);
                this.$store.dispatch("auth/setRefreshToken", res.data.refresh_token);
                this.$store.dispatch("auth/setLastLogin", Date.now());
                this.$router.push({ name: 'Profile' });
            })
            .catch((err) => {
                console.log(err);
                this.loginFail = true;
                setTimeout(() => {
                    this.loginFail = false;
                }, 1000);
            })
        }
    },
};
</script>