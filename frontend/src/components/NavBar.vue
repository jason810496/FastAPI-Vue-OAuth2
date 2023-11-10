<template>
    <header>
        <nav class="navbar navbar-expand-md navbar-dark bg-dark">
            <div class="container">
                <a class="navbar-brand" href="/">Demo</a>
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
                            <router-link class="nav-link" to="/profile">Profile</router-link>
                        </li>
                        
                        <li v-if="!isAuthenticated" class="nav-item">
                            <router-link class="nav-link" to="/register">Register</router-link>
                        </li>

                        <!-- login/logout button -->
                        <li v-if="isAuthenticated" class="nav-item">
                            <router-link class="nav-link" to="/logout">Logout</router-link>
                        </li>
                        <li v-else class="nav-item">
                            <router-link class="nav-link" to="/login">Login</router-link>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>
  
<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
    name: 'NavBar',
    computed:{
        ...mapGetters({
            isAuthenticated: 'auth/isAuthenticated',
        })
    }
});
</script>
  
<style scoped>
a {
    cursor: pointer;
}
</style>
  