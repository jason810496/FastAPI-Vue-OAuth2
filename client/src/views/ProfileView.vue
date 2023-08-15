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

    <div v-bind:class="{'invisible': !updated}"
        class="fixed container center fixed-top"
        style="z-index: 999;">
        <div class="mx-5">
            <div class="mx-5 my-5">
                <div class="alert alert-success" role="alert">
                    <h4 class="alert-heading" >{{ subject }}</h4>
                    <hr>
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
            updated: false,
            subject: '',
        };
    },
    mounted() {
        this.$api.v1.user.getMyself()
        .then((res) => {
            console.log("load data while mounted", res);
            this.form.username = res.data.username;
            this.form.birthday = res.data.birthday;
        }).catch((error) => {
            router.push({ name: 'Refresh' });
        });
    },
    methods: {
        updatePassword() {
            const data = {
                password: this.form.password,
            };
            this.$api.v1.user.updatePass(data).then((res) => {
                this.updated = true;
                this.subject = "Password updated";
                this.form.password = '';
                setTimeout(() => {
                    this.updated = false;
                }, 1000);
            });
        },
        updateBirthday() {
            const data = {
                birthday: this.form.birthday,
            };
            this.$api.v1.user.updateBirth(data).then((res) => {
                this.updated = true;
                this.subject = "Birthday updated";
                setTimeout(() => {
                    this.updated = false;
                }, 1000);
            });
        },
        reloadData() {
            this.$api.v1.user.getMyself()
            .then((res) => {
                this.form.username = res.data.username;
                this.form.birthday = res.data.birthday;
                this.updated = true;
                this.subject = "Reloaded successfully";
                setTimeout(() => {
                    this.updated = false;
                }, 1000);
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
    },
};
</script>