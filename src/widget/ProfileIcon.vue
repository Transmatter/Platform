<script>
import MenuItem from './MenuItem.vue';
import ProfileButton from './ProfileButton.vue';
import Login from "@/service/LoginAPI.js";

export default {
    components : {
        MenuItem,
        ProfileButton
    },
    methods:{
        mockLogout(){
            Login.logout();
        },
        seeDetail(){
            this.$router.push(`/admin/${this.$store.getters.getCurrentUser.id}`);
            this.$store.state.trigger = false
        },
        updateDetail(){
            this.$router.push(`/update/${this.$store.getters.getCurrentUser.id}`);
            this.$store.state.trigger = false
        }
    } 
}
</script>
<template>
    <div class="dropdown dropdown-hover dropdown-end">
        <ProfileButton /> 
        {{$store.getters.getCurrentUser.username}}
        <ul tabindex="0" class="dropdown-content menu shadow bg-base-100 rounded-box w-52">
            <li><MenuItem @click="seeDetail" content="Account"/></li>                             
            <li><MenuItem @click="updateDetail" content="Update"/></li>
            <li><MenuItem @click="mockLogout" content="Logout"/></li>
        </ul>
        </div>
</template>