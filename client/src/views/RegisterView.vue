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
    
    <!-- Notification : create user successful , redirect to login page  -->
    <div v-bind:class="{'invisible': !createSuccess}"
        class="fixed container center fixed-top">
        <div class="mx-5">
            <div class="mx-5 my-5">
                <!-- redirect to login page in 3 seconds -->
                <div class="alert alert-success" role="alert">
                    <h4 class="alert-heading">Create successful</h4>
                    <p>You can login now.</p>
                    <hr>
                    <p class="mb-0">Redirecting to login page in 3 seconds...</p>
                    <p class="mb-0">
                        Or click 
                        <a href="#/login" class="link-success">here</a>
                        to login now.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            status : 'show', // hidden
            form: {
                username: '',
                password: '',
                birthday: '',
            },
            createSuccess: false,
        };
    },
    inject: ['$api'],
    methods: {
        isValidDate(dateString) {
            const regEx = /^\d{4}-\d{2}-\d{2}$/;
            return dateString.match(regEx) != null;
        },
        submit(){
            const data = {
                username: this.form.username,
                password: this.form.password,
                birthday: this.form.birthday,
            };
            this.$api.v1.user.register(data)
            .then( (res) => {
                this.createSuccess = true;
                setTimeout(() => {
                    this.$router.push('/login');
                }, 2000);
            });  
            
        }
    },
};
</script>