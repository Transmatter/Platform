<template>
    <div class="flex justify-center">
        <h1 class="my-6 text-3xl font-bold">Content that need to be approve by admin</h1>
    </div>
    <div class="flex justify-center space-y-2 sm:space-y-0 sm:flex sm:-mx-1">
        <select
            aria-label="state"
            @change="getContentBySourceAndCategory"
            v-model="select"
            class="px-2 mx-2 select select-primary w-60 max-w-xs bg-primary text-base-100 lg:text-md md:text-md sm:text-xs"
        >
            <option disabled value="">เลือกหมวดหมู่</option>
            <option v-for="opt in source" :value="opt" :key="opt" class="sm:text-sm md:text-md lg:text-md">
                {{ opt.source === 'all' ? 'ทั้งหมด' : opt.source }}
                {{ opt.type === 'all' ? '' : ' : ' + opt.type }}
            </option>
        </select>
        <div class="flex flex-col mt-8 space-y-3 sm:space-y-0 sm:flex-row sm:justify-center sm:-mx-2">
            <input
                v-model="query"
                type="text"
                class="input input-bordered input-primary w-full max-w-xs mx-4"
                placeholder="หาข่าวอื่นๆ"
            />
            <button @click="spellChecking()" class="px-4 py-2 btn btn-primary btn-md text-base-100">Search</button>
        </div>
    </div>
    <div class="p-1.5 w-full sm:w-auto overflow-hidden bg-white rounded-lg my-6 lg:mx-80">
        <table class="table table-compact border">
            <thead class="border">
                <tr>
                    <th class="px-7 py-3 text-center">No.</th>
                    <th class="px-7">Title</th>
                    <th class="px-7">Source</th>
                    <th class="px-7">Category</th>
                    <th class="px-7">Author</th>
                    <th class="px-7">Publish Date</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(item, index) in contents"
                    @click="seeDetail(item.id)"
                    class="hover:bg-green-300 hover:underline cursor-pointer"
                >
                    <td class="px-7 text-center py-3">{{ index + 1 }}</td>
                    <td class="px-7 text-left">{{ item.title.substring(0, 15) + '...' }}</td>
                    <td class="px-7 text-left">{{ item.source }}</td>
                    <td class="px-7 text-left">{{ item.category.substring(0, 15) + '...' }}</td>
                    <td class="px-7 text-left">{{ item.author.substring(0, 10) + '...' }}</td>
                    <td class="px-7 text-left">{{ getDate(item.public_date) }}</td>
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
                @update:modelValue="getAllEmptyAltNews"
            />
        </div>
    </div>
</template>

<script>
import { useViewModel } from './admin-empty-alt.viewmodel';
import AdminEmptyAltService from './admin-empty-alt.service';
import NewsDetailsVue from '@/components/NewsDetails.vue';
import VPagination from '@hennge/vue3-pagination';
import '@hennge/vue3-pagination/dist/vue3-pagination.css';
import Nprogress from 'nprogress';
import dayjs from 'dayjs';

export default {
    name: 'Content Page',
    components: {
        NewsDetailsVue,
        VPagination,
    },
    data() {
        return {
            page: 1,
            contents: [],
            query: '',
            totalPage: 0,
            source: [
                { source: 'all', type: 'all' },
                { source: 'ไทยรัฐออนไลน์', type: 'all' },
                { source: 'ไทยรัฐออนไลน์', type: 'วิเคราะห์เศรษฐกิจ' },
                { source: 'ไทยรัฐออนไลน์', type: 'การเงิน' },
                { source: 'ไทยรัฐออนไลน์', type: 'นโยบาย' },
                { source: 'ไทยรัฐออนไลน์', type: 'การตลาด' },
                { source: 'ไทยรัฐออนไลน์', type: 'การลงทุน' },
                { source: 'สนุกออนไลน์', type: 'เอ็นเตอร์เทน' },
                { source: 'เด็กดี', type: 'ชีวิตวัยรุ่น' },
            ],
        };
    },
    methods: {
        getDate(dateString) {
            return dayjs(dateString).locale('th').format('DD MMMM YYYY');
        },
        seeDetail(id) {
            this.$router.push('/content/' + id);
        },
        getAllEmptyAltNews() {
            Nprogress.start();
            AdminEmptyAltService()
                .getEmptyAltContents(this.page)
                .then((response) => {
                    this.contents = response.data.data.getAllEmptyAltNews.content;
                    Nprogress.done();
                });
        },
    },
    setup() {
        const { pages, contents, isLoading } = useViewModel();
        Nprogress.start();
        Nprogress.done();
        return {
            pages,
            contents,
            isLoading,
        };
    },
};
</script>
