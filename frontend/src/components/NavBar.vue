<template>
    <header>
        <nav class="navbar navbar-expand-md navbar-dark bg-dark">
            <div class="container">
                 <router-link class="navbar-brand" to="/">Demo</router-link> 
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
                    aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <ul class="navbar-nav me-auto mb-2 mb-md-0">
                        <li class="nav-item">
                            <router-link class="nav-link" to="/">Home</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/register">Register</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/profile">Profile</router-link>
                        </li> 
                        <li class="nav-item">
                            <router-link class="nav-link" to="/logout">Logout</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/login">Login</router-link>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>
  
<script setup>
import { useAuthStore } from '../store/auth';
const auth = useAuthStore();

</script>
  
<style scoped>
a {
    cursor: pointer;
}
</style>
  