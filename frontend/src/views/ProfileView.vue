<template>
    <div class="d-flex justify-content-center my-5">
        <div class="container row d-flex justify-content-center">
            <div class="col-6">
                <div class="form-group">
                    <label for="usernameField">Username</label>
                    <input v-model="me.username" readonly type="text" class="form-control" id="usernameField">
                </div>
                <div class="row">
                    <div class="col">
                        <form class="form-group">
                            <div class="form-group mx-sm-3">
                                <label for="passwordField">New Password</label>
                                <input v-model="me.password" type="text" class="form-control" id="passwordField"
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
                                <input v-model="me.birthday" type="date" class="form-control" id="birthdayField">

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
                        <div class="btn btn-danger col-12 mb-3" v-on:click="changeAccessToken">Access Token</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
  
<script setup>
import { useProfile } from '../store/me';

const { 
    me,
    reloadData,
    updatePassword,
    updateBirthday,
    changeAccessToken,
} = useProfile();

</script>