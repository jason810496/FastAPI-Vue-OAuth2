
  
<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from '../store/auth';

const auth = useAuthStore();
onMounted(() => {
    auth.logout();
});

</script>