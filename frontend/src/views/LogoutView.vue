<template>
    <div class="mx-5">
        <div class="mx-5 my-5">
            <!-- redirect to login page in 3 seconds -->
            <div class="alert alert-success" role="alert">
                <h4 class="alert-heading">Logout</h4>
                <p>You have been logged out.</p>
                <hr>
                <p class="mb-0">Redirecting to login page in 1 seconds...</p>
            </div>
        </div>
    </div>
    

</template>
  
<script>
export default {
    name: 'LoginView',
    inject: ['$router'],
    created(){
        this.$store.dispatch('auth/resetAccessToken');
        this.$store.dispatch('auth/resetRefreshToken');
        this.$store.dispatch('auth/resetLastLogin');

        setTimeout(() => {
            this.$router.push({ name: 'Login' });
        }, 1000);
    }
};
</script>