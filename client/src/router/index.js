import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/ProfileView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ForgetView from '../views/ForgetView.vue'
import LogoutView from '../views/LogoutView.vue'
import RefreshView from '../views/RefreshView.vue'
import store from "../store";
import auth from '../api/v1/auth'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView,
        meta: { requiresAuth: false },
    },
    {
        path: '/register',
        name: 'Register',
        component: RegisterView,
        meta: { requiresAuth: false },
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView,
        meta: { requiresAuth: false },
    },
    {
        path: '/profile',
        name: 'Profile',
        component: ProfileView,
        meta: { requiresAuth: true },
    },
    {
        path: '/forget',
        name: 'Forget',
        component: ForgetView,
    },
    {
        path: '/logout',
        name: 'Logout',
        component: LogoutView,
    },
    {
        path: '/refresh',
        name: 'Refresh',
        component: RefreshView,
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})

router.beforeEach((to, from , next) => {
    console.log("Router.beforeEach");
    if(to.name === "Login" && store.getters["auth/last_login"]){
        console.log("already login");
        next("/profile");
        return;
    }

    if (to.meta.requiresAuth ) {
        console.log("requiresAuth");
        if (store.getters["auth/access_token"]){
            console.log("has access token");
            let timeNow = Date.now();
            if (timeNow - (store.getters["auth/last_login"] || 0) > 300000) {
                // over 30 minutes 
                console.log("over 30 minutes");
                next("/refresh");
                return;
            }
            else{
                console.log("under 30 minutes");
                next();
                return;
            }
        } 
        else {
            console.log("no access token");
            next("/login");
            return;
        }
    }
    else{
        next();
        return;
    }

})

export default router;