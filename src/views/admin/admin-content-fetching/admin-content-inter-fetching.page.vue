<template>
    <div class="bg-gradient-to-r from-green-300 to-green-200">
        <div class="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
            <div class="bg-white shadow overflow-hidden sm:rounded-lg pb-8">
                <div class="border-t border-gray-200 text-center pt-8">
                    <h1 class="text-9xl font-bold text-green-300">Inter News</h1>
                    <h1 class="text-6xl font-medium py-8">Manually Fetching Local News</h1>
                    <p class="text-2xl pb-8 px-12 font-medium">This process Take a while. Please wait.</p>
                    <Form @submit="fetchInterNews" :validation-schema="schema">
                        <div class="grid grid-cols-1 pb-8 px-12 gap-6 mt-4 sm:grid-cols-2">
                            <div>
                                <label class="text-gray-700" for="topic">News Topic</label>
                                <Field
                                    name="topic"
                                    type="text"
                                    class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                                    placeholder="Economic, Politics, etc."
                                />
                                <ErrorMessage name="topic" class="text-red-500" />
                            </div>

                            <div>
                                <label class="text-gray-700" for="date">date</label>
                                <Field
                                    name="date"
                                    type="date"
                                    :value="today"
                                    :min="last_month"
                                    :max="today"
                                    class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                                />
                                <ErrorMessage name="date" class="text-red-500" />
                            </div>
                        </div>
                        <button
                            class="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-semibold px-6 py-3 rounded-md"
                            >
                            Start Fetching
                        </button>
                    </Form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import dayjs from 'dayjs';
import * as yup from 'yup';
import adminContentFetchingService from './admin-content-fetching.service';
import Nprogress from 'nprogress';
export default {
    name: 'Local News',
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const schema = yup.object().shape({
            topic: yup.string().required('Topic is required'),
            date: yup.string().required('Date is required'),
        });
        return {
            schema,
            today:"",
            last_month:""
        }
    },
    methods:{
        fetchInterNews(data){
            Nprogress.start();
            adminContentFetchingService()
                .adminFetchingInterNews(data.topic,data.date)
                .then(()=>{
                    Nprogress.done()
                })
        }
    },
    created(){
        this.today = dayjs().format('YYYY-MM-DD');
        this.last_month = dayjs().subtract(1, 'month').format('YYYY-MM-DD');
    }
};
</script>
<style scoped>
.text-9xl {
    font-size: 14rem;
}
@media (max-width: 645px) {
    .text-9xl {
        font-size: 5.75rem;
    }
    .text-6xl {
        font-size: 1.75rem;
    }
    .text-2xl {
        font-size: 1rem;
        line-height: 1.2rem;
    }
    .py-8 {
        padding-top: 1rem;
        padding-bottom: 1rem;
    }
    .px-6 {
        padding-left: 1.2rem;
        padding-right: 1.2rem;
    }
    .mr-6 {
        margin-right: 0.5rem;
    }
    .px-12 {
        padding-left: 1rem;
        padding-right: 1rem;
    }
}
</style>
