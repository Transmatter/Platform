<template>
  <DefaultLayout>
    <section
      class="max-w-4xl my-6 p-6 mx-auto bg-white rounded-md shadow-md"
    >
      <h2
        class="text-lg font-semibold text-gray-700 capitalize"
      >
        Account settings
      </h2>

      <Form :validation-schema="schema">
        <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
            <label class="text-gray-700" for="username"
              >Username</label
            >
            <Field
              v-model="admin.username"
              name="username"
              type="text"
              class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
            />
            <ErrorMessage name="username" class="text-red-500" />
          </div>

          <div>
            <label class="text-gray-700" for="email"
              >Email Address</label
            >
            <Field
              v-model="admin.email"
              name="email"
              type="email"
              class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
            />
            <ErrorMessage name="email" class="text-red-500" />
          </div>
          <div>
            <label class="text-gray-700" for="firstname"
              >Firstname</label
            >
            <Field
              v-model="admin.firstname"
              name="firstname"
              type="text"
              class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
            />
            <ErrorMessage name="firstname" class="text-red-500" />
          </div>

          <div>
            <label class="text-gray-700" for="lastname"
              >Lastname</label
            >
            <Field
              v-model="admin.lastname"
              name="lastname"
              type="text"
              class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
            />
            <ErrorMessage name="lastname" class="text-red-500" />
          </div>
          <div>
            <label class="text-gray-700" for="email"
              >Phone NO</label
            >
            <Field
              v-model="admin.phoneNo"
              name="phoneNo"
              type="text"
              class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
            />
            <ErrorMessage name="phoneNo" class="text-red-500" />
          </div>
        </div>
        <div class="flex justify-end mt-6">
          <button @click="handleUpdate"
            class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
          >
            update
          </button>
        </div>
      </Form>
    </section>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import adminDetailService from "../admin-detail-page/admin-detail.service";
import Nprogress from 'nprogress';
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import adminUpdateService from "./admin-update.service";
export default {
  name: "Admin Update",
  components: {
    DefaultLayout,
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup
        .string()
        .required("Username is required!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters"),
      email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid!")
        .max(50, "no longer than 50 character"),
      password: yup
        .string()
        .required("password is required")
        .min(6, "Must be at least 6 character")
        .max(40, "no longer than 40 character"),
      passwordConfirmation: yup
        .string()
        .required("you need to confirm you password")
        .oneOf([yup.ref("password")], "password is not match"),
      firstname: yup
        .string()
        .required("your firstname is required!")
        .min(2, "Your name need to be at least 2 character")
        .max(50, "No one have that much long firstname"),
      lastname: yup
        .string()
        .required("your lastname is required!")
        .min(2, "Your lastname need to be at least 2 character")
        .max(50, "No one have that much long lastname"),
      phoneNo : yup
        .string()
        .required("your phone number is required!")
        .min(10, "Your phone number need to be at least 10 character")
        .max(10, "No one have that much long phone number"), 
    });
    return {
      sex: "",
      schema,
      admin : {}
    };
  },
  methods: {
    handleUpdate() {
        let user = {
		    "username": this.admin.username,
		    "firstname": this.admin.firstname,
		    "lastname": this.admin.lastname,
		    "email": this.admin.email,
		    "phoneNo":this.admin.phoneNo 
        };
        Nprogress.start()
        adminUpdateService()
        .updateAdmin(this.$route.params.id,user)
        .then((res)=>{
          if(res.data.data.updateAdmin == null){
            alert("Admin data is invalid, Maybe username or email is duplicate")
          }
          Nprogress.done()
          this.$router.push({
              name: 'Admin Detail',
              params: {
                  id: this.admin.id
              }
          });
        })
    },
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
};
</script>
