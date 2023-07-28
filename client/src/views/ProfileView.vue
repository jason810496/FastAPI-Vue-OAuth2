<template>
    <div class="mx-5">
        <div class="mx-5 my-5">
            <div class="form-group">
                <label for="usernameField">Username</label>
                <input v-model="form.username" readonly type="text" class="form-control" id="usernameField">
            </div>
            <div class="row">
                <div class="col">
                    <form class="form-group">
                    <div class="form-group mx-sm-3">
                        <label for="hashPasswordField">Hash Password</label>
                        <input v-model="form.hashPassword" type="text" class="form-control" id="hashPasswordField" readonly>
                        <label for="passwordField">New Password</label>
                        <input v-model="form.password" type="text" class="form-control" id="passwordField" placeholder="new password">
                    </div>
                    <button type="submit" class="btn btn-primary mx-3" v-on:click="updatePassword">update Password</button>
                    </form>
                </div>
                <div class="col">
                    <form class="form-group">
                        <div class="form-group mx-sm-3">
                            <label for="birthdayField">birthday</label>
                            <input v-model="form.birthday" type="date" class="form-control" id="birthdayField">
                            
                        </div>
                        <button type="submit" class="btn btn-primary mx-3" v-on:click="updateBirthday">update Birthday</button>
                    </form>
                </div>
            </div>
            
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
export default {
    name: 'ProfileView',
    data() {
        return {
            isLoaded: false,
            form: {
                username: '',
                password: '',
                hashPassword: '',
            },
        };
    },
    async mounted() {
        await this.getUserData();
    },
    methods: {
        getUserData() {
            console.log("getUserData");
            const token = localStorage.getItem('access_token');
            console.log("token", token);

            // console.log("this.$store.state.password",this.$store.state.password);
            
           
            axios.get('http://localhost:5001/whoami',
            {
                headers: { "Authorization": `Bearer ${token}`, "Accept": 'application/json', "Access-Control-Allow-Origin": '*' }
            }).then((response) => {

                this.isLoaded = true;

                 // console.log("this.$store.state.password",this.$store.state.password);
                console.log("response", response);
                this.form.username = response.data.username;
                this.form.hashPassword = response.data.password;
                this.form.password = ''
                this.form.birthday = response.data.birthday;

            }).catch((error) => {
                console.log("error log:", error);
                localStorage.removeItem('access_token');
                localStorage.removeItem('login');
                this.$router.push('/login');
            });
            
        },
        updatePassword(){
            const token = localStorage.getItem('access_token');
            const payload = {
                password: this.form.password,
            };
            axios.put('http://localhost:5001/user/password' , payload,
            {
                headers: { "Authorization": `Bearer ${token}`, "Accept": 'application/json', "Access-Control-Allow-Origin": '*' }
            }).then((response) => {

                if(response.status == 200) {
                    this.form.hashPassword = response.data.password;
                    this.form.password = '';
                    alert("Password updated");
                }

            }).catch((error) => {
                console.log("error", error);
                this.$router.push('/login');
            });
        },
        updateBirthday(){
            const token = localStorage.getItem('access_token');

            const payload = {
                birthday: this.form.birthday,
            };
            axios.put('http://localhost:5001/user/birthday' , payload,
            {
                headers: { "Authorization": `Bearer ${token}`, "Accept": 'application/json', "Access-Control-Allow-Origin": '*' }
            }).then((response) => {

                if(response.status == 200) {
                    alert("Birthday updated");
                }

            }).catch((error) => {
                console.log("error", error);
                this.$router.push('/login');
            });
        }
    },
};
</script>