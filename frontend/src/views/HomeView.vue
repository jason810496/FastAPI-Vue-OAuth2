<template>
    <div class="row d-flex justify-content-center mx-auto mt-5">
        <div class="col-6 pt-6">
            <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">User</th>
                    <th scope="col">Birthday</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, idx) in userList.value" :key="idx">
                    <th scope="row">{{ idx + 1 }}</th>
                    <td>@{{ user.username }}</td>
                    <td>{{ user.birthday }}</td>
                </tr>
            </tbody>
        </table>
        </div>
    </div>
</template>
  
<script setup>

import { useFetchUser } from '../store/user';
const { userList } = useFetchUser();

</script>