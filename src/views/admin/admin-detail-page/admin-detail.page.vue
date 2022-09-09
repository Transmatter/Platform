<template>
  <DefaultLayout>
    <section class="max-w-4xl my-6 p-6 mx-auto bg-white rounded-md shadow-md">
      <div class="grid grid-cols-5 justify-item-end my-6" v-if="this.$store.getters.getRole == 'ROLE_ADMIN'">
        <span class="text-xl font-semibold text-gray-700 capitalize">
          Account Data 
          <span v-if="admin.status === 'VERIFIED'" class="text-green-600 font-bold">Verify</span>
          <span v-else class="text-red-600 font-bold">Not Verify</span>
        </span>
        <span></span>
        <span></span>
        <span></span>
        <ButtomVue v-if="admin.username === this.$store.getters.getCurrentUser.username" buttonName="update" @click="updateAdmin"/>
      </div>
      <div v-else class="grid grid-cols-4 justify-item-end my-6">
        <span class="text-xl font-semibold text-gray-700 capitalize">
          Account Data 
          <span v-if="admin.status === 'VERIFIED'" class="text-green-600 font-bold">Verify</span>
          <span v-else class="text-red-600 font-bold">Not Verify</span>
        </span>
      </div>
        <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
            <label class="text-gray-700" for="username">Username</label>
            <p class="text-lg font-bold">
                {{admin.username}}
            </p>
          </div>

          <div>
            <label class="text-gray-700" for="email">Email Address</label>
            <p class="text-lg font-bold">
                {{admin.email}}
            </p>
          </div>
          <div>
            <label class="text-gray-700" for="firstname">Firstname</label>
            <p class="text-lg font-bold">
                {{admin.firstname}}
            </p>
          </div>

          <div>
            <label class="text-gray-700" for="lastname">Lastname</label>
            <p class="text-lg font-bold">
                {{admin.lastname}}
            </p>
          </div>
          <div>
            <label class="text-gray-700" for="email">Phone NO</label>
            <p class="text-lg font-bold">
                {{admin.phoneNo}}
            </p>
          </div>
        </div>
         <div class="grid grid-cols-6 justify-item-end my-6" v-if="this.$store.getters.getRole == 'ROLE_SUPER_ADMIN' && admin.id!=4">
            <ButtomVue @click="verifyUser" class="mx-2" buttonName="Verify" />
            <ButtomVue class="invisible" buttonName="update" />
            <ButtomVue class="invisible" buttonName="update" />
            <ButtomVue class="invisible" buttonName="update" />
            <ButtomVue class="invisible" buttonName="update" />
            <ButtomErrorVue @click="notVerifyUser" buttonName="Not verify" />
        </div>
    </section>
  </DefaultLayout>
</template>
<script>
import ButtomErrorVue from "@/widget/ButtomError.vue";
import ButtomVue from "@/widget/Buttom.vue";
import adminDetailService from "./admin-detail.service";
import Nprogress from 'nprogress';
import { Form, Field, ErrorMessage } from "vee-validate";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
export default {
    name : "Admin details",
    components : {
        ButtomVue,
        ButtomErrorVue,
        Form,
        Field,
        ErrorMessage,
        DefaultLayout
    },
    data() {
        return {
            admin : {}
        }
    },
    methods : {
        verifyUser(){
            Nprogress.start()
            adminDetailService()
            .getVerifyStatusToUser(this.$route.params.id,"VERIFIED")
            .then(() => {
                Nprogress.done()
                this.$router.push("/wating-list");
            })
        },
        notVerifyUser(){
            Nprogress.start()
            let check = confirm("Are you sure to not verify this user?");
            if(check){
              let reason = prompt("ทำไมถึงไม่รับรอง Admin คนนี้");
                adminDetailService()
                  .getNotVerifyStatusToUser(this.$route.params.id,reason,"NOT_VERIFIED")
                  .then(() => {
                    Nprogress.done()
                    this.$router.push("/wating-list");
                  })
            }
            Nprogress.done()
        },
        updateAdmin(){
            this.$router.push({
              name : "Admin Update",
              params : {
                id: this.admin.id
              },
            })
        }
    },
    created() {
        Nprogress.start()
        adminDetailService()
        .getAdminDetail(this.$route.params.id)
        .then((res) => {
            this.admin = res.data.data.getAdminById
            Nprogress.done()
        })  
    },
}
</script>