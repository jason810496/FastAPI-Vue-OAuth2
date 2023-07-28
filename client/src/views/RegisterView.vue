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
                <div class="form-group">
                    <label for="birthdayField">Birthday </label>
                    <input v-model="form.birthday" type="date" class="form-control" id="birthdayField">
                </div>
                <button type="submit" class="btn btn-primary" v-on:click="submit">Register</button>
            </form>
        </div>
    </div>
    

</template>
  
<script>
import axios from 'axios';
import qs from 'qs';
export default {
    data() {
        return {
            status : 'show', // hidden
            form: {
                username: '',
                password: '',
                birthday: '',
            },
        };
    },
    methods: {
        isValidDate(dateString) {
            const regEx = /^\d{4}-\d{2}-\d{2}$/;
            return dateString.match(regEx) != null;
        },
        async submit(){
            
            axios.post('http://localhost:5001/user', this.form , { headers: { 'content-type': 'application/json' } }  )
            .then((response) => {
                console.log("create user");
                console.log(response);
                
                this.$router.push('/login');
            }).catch((err) => {
                console.log(err);
            });
            
            
        }
    },
};
</script>