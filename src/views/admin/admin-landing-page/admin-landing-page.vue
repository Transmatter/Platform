<template>
    <div class="flex flex-col w-full">
        <Hero/>
        <div class="divider">Content Status on Platform</div>
        <div class="flex flex-row w-full lg:flex-row">
            <div class="flex flex-row w-full lg:flex-row stats shadow">
                <Stat title="All Content" :content="allContent" text="all content"/>
                <Stat title="❌ Content" :content="incomplateContent" text="not approve content"/>
                <Stat title="✔ Content" :content="allContent - incomplateContent" text="approve content"/>
                <Stat title="Local Content" :content="local_content" text="local content"/>
                <Stat title="Inter Content" :content="inter_content" text="inter content"/>
            </div>
        </div>
        <div class="divider">Features</div>
        <div class="flex flex-row w-full lg:flex-row">
            <div class="flex flex-row w-full lg:flex-row justify-start">
                <Card v-if="this.$store.getters.getRole == 'ROLE_SUPER_ADMIN'" title="Waiting List" content="Admin in Wating List" page="Wating List"/>
                <Card v-if="this.$store.getters.getRole == 'ROLE_SUPER_ADMIN'" title="Fetching Local Content" content="sanook Thairath Dek-d" page="Local Fetching"/>
                <Card v-if="this.$store.getters.getRole == 'ROLE_SUPER_ADMIN'" title="Fetching Inter Content" content="News api" page="Inter Fetching"/>
                <Card title="update Content" content="update a content" page="X Content"/>
            </div>
        </div>
    </div>
</template>
<script>
import { useViewModel } from './admin-landing-page.viewmodel';
import Drawer from '@/components/Drawer.vue';
import Card from '@/components/Card.vue';
import Hero from '@/components/hero.vue';
import Stat from '@/components/Stat.vue';
export default {
    name: 'Admin Landing Page',
    components: {
    Drawer,
    Card,
    Hero,
    Stat,
},
    data() {
        return {
            page: 1,
            contents: [],
            query: '',
            totalPage: 0,
        };
    },
    setup() {
        const { pages, contents, isLoading, allContent, incomplateContent, local_content,inter_content } = useViewModel();
        return {
            pages,
            contents,
            isLoading,
            allContent,
            incomplateContent,
            local_content,
            inter_content
        };
    },
};
</script>
