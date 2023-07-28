<template>
    <div class="mx-5">
        <div class="mx-5 my-5">
            <form>
                <div class="form-group">
                    <label for="usernameField">Username</label>
                    <input v-model="form.username" type="text" class="form-control" id="usernameField">
                </div>
                <div class="form-group">
                    <label for="passwordField">Password</label>
                    <input v-model="form.password" type="password" class="form-control" id="passwordField">
                </div>
                <button type="submit" class="btn btn-primary" v-on:click="submit">Login</button>
            </form>
        </div>
    </div>
    

</template>
  
<script>
import axios from 'axios';
import qs from 'qs';
export default {
    name: 'LoginView',
    data() {
        return {
            status : 'show', // hidden
            form: {
                username: '',
                password: '',
            },
        };
    },
    methods: {
        toggle() {
            this.status = this.status === 'show' ? 'hidden' : 'show';
        },
        async submit(){
            console.log("this.form",this.form)
            console.log("this.form -> qs",qs.stringify(this.form))
            
            axios.post('http://localhost:5001/login', qs.stringify(this.form) , { headers: { 'content-type': 'application/x-www-form-urlencoded' } }  )
            .then((response) => {
                console.log("after login post");
                console.log(response);
                // console.log(response.data);
                // console.log(response.data.access_token);
                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('login', 'true' );
                console.log("localStorage.getItem('access_token')",localStorage.getItem('access_token'));

                this.$router.push('/profile');
            }).catch((err) => {
                console.log(err);
                alert("Login failed");
            });
            
            
        }
    },
};
</script>