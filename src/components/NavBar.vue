<script>
import LinkButton from '@/widget/LinkButton.vue';
import ProfileIcon from '@/widget/ProfileIcon.vue';
import Buttom from '@/widget/Buttom.vue';
import KeyBoardEvent from './KeyBoardEvent.vue'
import TTSService from '../service/TTSService';
export default {
    
    components: {
    LinkButton,
    ProfileIcon,
    Buttom,
    KeyBoardEvent,
},
    methods:{
        mockLogin(){
            this.$router.push('/login');
        },
        mockRegister(){
            this.$router.push('/register');
        },
        handleKeyPress: function (e) {
        const keyCode = String(e.keyCode || e.code || e.keyIdentifier);
        if(keyCode == '37'){
            window.history.back()
        }else if(keyCode == '39'){
            window.history.forward()
        }else if(keyCode=='32'){
            document.getElementById("searchBox").focus();
        }else if(keyCode=='13'){
            document.getElementById("searchButt").click();
        }else if(keyCode== '90'){
            if(document.getElementById("sugg1")){
                document.getElementById("sugg1").click();
            }
            
        }else if(keyCode=='88'){
            if(document.getElementById("sugg2")){
                document.getElementById("sugg2").click();
            }
        }else if(keyCode=='67'){
             if(document.getElementById("sugg3")){
                document.getElementById("sugg3").click();
            }
        }else if(keyCode == '38'){
            this.$router.push({ name: "Home" })
        }
    }
    } 
};
</script>
<template>
<KeyBoardEvent v-on:keyup="handleKeyPress"></KeyBoardEvent>
    <div>
        <nav class="bg-white shadow">
            <div class="max-w-9xl mx-auto px-8">
                <div class="flex items-center justify-between h-16">
                    <div class="flex items-center">

                        <a class="flex-shrink-0" href="/" @click.left="handleKeyPress">
                             <h1 class="text-primary text-xl font-bold normal-case">

                                Transmatter Platform 
                                <sup class="text-xs" v-if="this.$store.getters.getRole == 'ROLE_ADMIN'">
                                    Admin
                                </sup>
                                <sup class="text-xs" v-if="this.$store.getters.getRole == 'ROLE_SUPER_ADMIN'">
                                    SAdmin
                                </sup>
                            </h1>
                        </a>
                        <div class="hidden md:block">
                            <div class="ml-10 flex items-baseline space-x-4">
                                <span>
                                    <LinkButton path="Home"/>
                                    <LinkButton path="About"/>
                                </span>
                            </div>
                        </div>
                    </div>
                    <ProfileIcon v-if="this.$store.getters.getCurrentUser != null"/>
                    <span v-else>
                        <Buttom class="mx-2" @click="mockRegister" buttonName="Sign up"/>
                        <Buttom class="mx-2" @click="mockLogin" buttonName="Sign in"/>
                    </span>
                </div>
            </div>
            <div class="md:hidden">
                <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <LinkButton path="Home"/>
                    <LinkButton path="About"/>
                </div>
            </div>
        </nav>
    </div>
</template>
