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

      <Form @submit="handleRegister" :validation-schema="schema">
        <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
            <label class="text-gray-700" for="username"
              >Username</label
            >
            <Field
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
              name="lastname"
              type="text"
              class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
            />
            <ErrorMessage name="lastname" class="text-red-500" />
          </div>
          <div>
            <label class="text-gray-700" for="password"
              >Password</label
            >
            <Field
              name="password"
              type="password"
              class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
            />
            <ErrorMessage name="password" class="text-red-500" />
          </div>

          <div>
            <label
              class="text-gray-700"
              for="passwordConfirmation"
              >Password Confirmation</label
            >
            <Field
              name="passwordConfirmation"
              type="password"
              class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
            />
            <ErrorMessage name="passwordConfirmation" class="text-red-500" />
          </div>
          <div>
            <label class="text-gray-700" for="email"
              >Phone NO</label
            >
            <Field
              name="phoneNo"
              type="text"
              class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
            />
            <ErrorMessage name="phoneNo" class="text-red-500" />
          </div>
        </div>
        <div class="flex justify-end mt-6">
          <button
            class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
          >
            Sign up
          </button>
        </div>
      </Form>
    </section>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import RegisterService from "@/service/RegisterAPI";
import * as yup from "yup";
export default {
  name: "Register",
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
        .min(4, "Username have a minimum of 4 characters")
        .max(10, "Username have a maximum of 10 characters"),
      email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid!")
        .max(50, "no longer than 50 character"),
      password: yup
        .string()
        .required("password is required")
        .min(6, "Password have a minimum of 6 characters")
        .max(20, "Password have a maximum of 20 characters"),
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
    };
  },
  methods: {
    handleRegister(user) {
      RegisterService.register(user)
        .then(() => {
          this.$router.push("/login");
        })
        .catch((err) => {
          console.log("could not register " + err);
        });
    },
  },
};
</script>
