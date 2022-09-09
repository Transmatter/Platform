<script>
import NavBar from '@/components/NavBar.vue';
import store from "@/store";
export default {
    components: {
        NavBar,
    },
    created() {
        if(this.$store.getters.getRole === ""){
            if(localStorage.user !== undefined){
                const user = JSON.parse(localStorage.user);
                store.dispatch('setCurrentUser', user);
                store.dispatch('setRole', user.authorities[0]);
                store.dispatch('setStatus', user.status);
            }
        }
    },
};
</script>

<template>
    <NavBar/>
    <router-view />
</template>