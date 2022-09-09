<template>
  <DefaultLayout>
    <section
      class="max-w-md p-6 my-10 mx-auto bg-white rounded-md shadow-md"
    >
      <h2
        class="text-3xl font-bold text-center font-semibold text-gray-700 capitalize"
      >
        Sign In
      </h2>

      <Form @submit="handleLogin" :validation-schema="schema">
        <div>
          <div class="my-4">
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
          <div class="my-4">
            <label class="text-gray-700" for="password"
              >Password</label
            >
            <Field
              name="password"
              type="password"
              class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
            <ErrorMessage name="password" class="text-red-500" />
          </div>
        </div>
        <div class="flex justify-center mt-6">
          <button
            class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
          >
            Login
          </button>
        </div>
      </Form>
    </section>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import Login from "@/service/LoginAPI.js";
import * as yup from "yup";
export default {
  name: "Login",
  components: {
    DefaultLayout,
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Username is required!"),
      password: yup.string().required("password is required"),
    });
    return {
      schema,
    };
  },
  methods: {
    handleLogin(user) {
      Login.login(user)
        .then(() => {
          this.$router.push({ name: "Home" });
        })
        .catch((err) => {
          console.log("could not login" + err);
        });
    },
  },
};
</script>
