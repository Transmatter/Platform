<template>
    <div class="p-1.5 w-full sm:w-auto overflow-hidden bg-white rounded-lg my-6 lg:mx-80">
        <table class="border">
            <thead class="border">
                <tr>
                    <th class="px-7 py-3 text-center">No.</th>
                    <th class="px-7">username</th>
                    <th class="px-7">firstname</th>
                    <th class="px-7">lastname</th>
                    <th class="px-7">email</th>
                    <th class="px-7">phone No</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in waitingList" @click="seeDetail(item.id)" class="hover:bg-green-50 hover:underline cursor-pointer">
                    <td class="px-7 text-center py-3">{{index}}</td>
                    <td class="px-7 text-left">{{item.username}}</td>
                    <td class="px-7 text-left">{{item.firstname}}</td>
                    <td class="px-7 text-left">{{item.lastname}}</td>
                    <td class="px-7 text-left">{{item.email}}</td>
                    <td class="px-7 text-left">{{item.phoneNo}}</td>
                </tr>
            </tbody>
        </table>
    </div>
    
    <div class="w-full sm:w-auto overflow-hidden bg-green-50 rounded-lg my-6 lg:mx-80">
        <div class="p-1">
            <v-pagination 
                v-model="page"
                :pages="pages" 
                :range-size="1" 
                activeColor="#bbf7d0"
                @update:modelValue="getAllWaitingList"
            />
        </div>
    </div>
</template>
<script>
import { useViewModel } from './admin-waiting-list.viewmodel';
import Nprogress from 'nprogress';
import AdminWatingService from './admin-waiting-list.service';
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
export default {
    name: "Wating List",
    components: {
        VPagination
    },
    data(){
        return {
            waitingList : [],
            pages : 1,
            totalPage: 0 
        }
    },
    methods : {
        getAllWaitingList(){
            Nprogress.start();
            AdminWatingService()
                .getAdminWatingList(this.page)
                .then((res) => {
                    this.waitingList = res.data.data.getUnVerifyAdmin.content;
                    Nprogress.done();
            });
        },
        seeDetail(id){
            this.$router.push({
                name: 'Admin Detail',
                params: {
                    id: id
                }
            });
        }
    },
    setup(){
        const {
            waitingList,
            isLoading,
        } = useViewModel();
        return {
            waitingList,
            isLoading
        }
    },
}
</script>