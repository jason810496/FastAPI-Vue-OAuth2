<template>
    <div class="d-flex justify-content-center my-5">
        <div class="container row d-flex justify-content-center">
            <div class="col-6">
                <div class="form-group">
                    <label for="usernameField">Username</label>
                    <input v-model="form.username" readonly type="text" class="form-control" id="usernameField">
                </div>
                <div class="row">
                    <div class="col">
                        <form class="form-group">
                            <div class="form-group mx-sm-3">
                                <label for="passwordField">New Password</label>
                                <input v-model="form.password" type="text" class="form-control" id="passwordField"
                                    placeholder="new password">
                            </div>
                            <button type="submit" class="btn btn-primary mx-3" v-on:click="updatePassword">update
                                Password</button>
                        </form>
                    </div>
                    <div class="col">
                        <form class="form-group">
                            <div class="form-group mx-sm-3">
                                <label for="birthdayField">birthday</label>
                                <input v-model="form.birthday" type="date" class="form-control" id="birthdayField">

                            </div>
                            <button type="submit" class="btn btn-primary mx-3" v-on:click="updateBirthday">update
                                Birthday</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- Testing area -->
    <div class="row justify-content-center">
        <div class="col-6 mx-5">
            <div class="row">
                <div class="col-6">
                    <div class="col-9 alert alert-warning">
                        <div class="col-12 mb-3 text-center">Reload data:</div>
                        <div class="btn btn-warning  col-12 mb-3" v-on:click="reloadData">Reload</div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="col-9 alert alert-danger">
                        <div class="col-12 mb-3 text-center">Set to wrong token :</div>
                        <div class="btn btn-danger col-12 mb-3" v-on:click="changeBothToken">Both Token</div>
                        <div class="btn btn-danger col-12 mb-3" v-on:click="changeAccessToken">Access Token</div>
                        <div class="btn btn-danger col-12 mb-3" v-on:click="changeRefreshToken">Refresh Token</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import store from '../store';
import router from '../router';

export default {
    name: 'ProfileView',
    inject: ['$api', '$router'],
    data() {
        return {
            form: {
                username: '',
                password: '',
            },
        };
    },
    mounted() {
        this.$api.v1.user.getMyself()
        .then((res) => {
            console.log("res", res);
            this.form.username = res.data.username;
            this.form.birthday = res.data.birthday;
        }).catch((error) => {
            router.push({ name: 'Refresh' });
        });
    },
    methods: {
        reloadData() {

            this.$api.v1.user.getMyself()
            .then((res) => {
                this.form.username = res.data.username;
                this.form.birthday = res.data.birthday;
            }).catch((error) => {
                router.push({ name: 'Refresh' });
            });
        },
        changeAccessToken() {
            store.dispatch('auth/setAccessToken', 'wrongToken');
            console.log("changeAccessToken");
        },
        changeRefreshToken() {
            store.dispatch('auth/setRefreshToken', 'wrongToken');
            console.log("changeRefreshToken");
        },
        changeBothToken() {
            store.dispatch('auth/setAccessToken', 'wrongToken');
            store.dispatch('auth/setRefreshToken', 'wrongToken');
            console.log("changeBothToken");
        },
        updatePassword() {

            const data = {
                password: this.form.password,
            };

            this.$api.v1.user.updatePass(data)
                .then((res) => {
                    this.form.password = '';
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