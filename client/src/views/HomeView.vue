<template>
    <div class="mx-5">
        <table class="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">User</th>
                <th scope="col">Birthday</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(user,idx) in userList" :key="idx">
                <th scope="row">{{ idx+1 }}</th>
                <td>@{{ user.username }}</td>
                <td>{{ user.birthday }}</td>
            </tr>
        </tbody>
    </table>
    </div>
</template>
  
<script>
import axios from 'axios';
export default {
    name: 'HomeView',
    data() {
        return {
            userList: [],
        };
    },
    async mounted() {
        await this.getUserList();
    },
    methods: {
        getUserList() {
            console.log("getUserList");

            axios.get('http://localhost:5001/user').then((response) => {

                console.log("response", response);
                this.userList = response.data;
            });
        },
        updatePassword() {
            const token = localStorage.getItem('access_token');
            const payload = {
                password: this.form.password,
            };
            axios.put('http://localhost:5001/user/password', payload,
                {
                    headers: { "Authorization": `Bearer ${token}`, "Accept": 'application/json', "Access-Control-Allow-Origin": '*' }
                }).then((response) => {

                    if (response.status == 200) {
                        alert("Password updated");
                    }

                }).catch((error) => {
                    console.log("error", error);
                    this.$router.push('/login');
                });
        },
        updateBirthday() {
            const token = localStorage.getItem('access_token');

            const payload = {
                birthday: this.form.birthday,
            };
            axios.put('http://localhost:5001/user/birthday', payload,
                {
                    headers: { "Authorization": `Bearer ${token}`, "Accept": 'application/json', "Access-Control-Allow-Origin": '*' }
                }).then((response) => {

                    if (response.status == 200) {
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