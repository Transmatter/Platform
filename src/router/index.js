import { createRouter, createWebHistory } from 'vue-router';
import ContentPage from '@/views/content/content-page/content.page.vue';
import ContentDetail from '@/views/content/content-detail-page/content-detail.page.vue';
import About from '@/views/About.vue';
import Login from '@/views/auth/login.page.vue';
import Register from '@/views/auth/register.page.vue';
import AdminEmptyAltPage from '@/views/admin/admin-empty-alt-page/admin-empty-alt.page.vue';
import AdminWatingListPage from '@/views/admin/admin-waitling-list/admin-waiting-list.page.vue';
import AdminDetailPage from '@/views/admin/admin-detail-page/admin-detail.page.vue';
import AdminUpdatePage from '@/views/admin/admin-update-page/admin-update.page.vue';
import AdminContentFetchingPage from '@/views/admin/admin-content-fetching/admin-content-fetching.page.vue';
import AdminContentInterFetchingPage from '@/views/admin/admin-content-fetching/admin-content-inter-fetching.page.vue';
import Nprogress from 'nprogress';
import VIHome from '@/views/VI/Home.vue';
import VIContentPage from '@/views/VI/vi-content-page/content.page.vue';
import AdminLandingPage from '@/views/admin/admin-landing-page/admin-landing-page.vue';
import store from '@/store';
import AudioFeedBack from '../service/AudioFeedBack';
import TTSService from '@/service/TTSService';
function checkAuth(to) {
    if (localStorage.user == undefined) {
        return '/';
    }
}

function checkAdmin(to) {
    if(localStorage.user == undefined) {
        return '/';
    }
    if(store.getters.getRole !== 'ROLE_SUPER_ADMIN') {
        return '/admin-home';
    }
}

function homeReminder(to){
    TTSService.stopVoice()
    TTSService.getVoice('คุณอยู่หน้าแรกของเว็บไซต์');
}

const routes = [
    {
        path: '/admin-home',
        name: 'Home',
        component: AdminLandingPage,
        beforeEnter: [checkAuth],
    },
    {
        path: '/',
        name: 'VIContenPage',
        component: VIContentPage,
        beforeEnter: [homeReminder],
    },
    {
        path: '/about',
        name: 'About',
        component: About,
    },
    {
        path: '/login',
        name: 'Sign in',
        component: Login,
    },
    {
        path: '/register',
        name: 'Sign up',
        component: Register,
    },
    {
        path: '/wating-list',
        name: 'Wating List',
        component: AdminWatingListPage,
        beforeEnter: [checkAdmin],
    },
    {
        path: '/content-without-alt',
        name: 'X Content',
        component: AdminEmptyAltPage,
        beforeEnter: [checkAuth],
    },
    {
        path: '/content/:id',
        name: 'Content Details',
        component: ContentDetail,
    },
    {
        path: '/admin/:id',
        name: 'Admin Detail',
        component: AdminDetailPage,
        beforeEnter: [checkAuth],
    },
    {
        path: '/update/:id',
        name: 'Admin Update',
        component: AdminUpdatePage,
        beforeEnter: [checkAuth],
    },
    {
        path: '/local-fetching',
        name: 'Local Fetching',
        component: AdminContentFetchingPage,
        beforeEnter: [checkAdmin],
    },
    {
        path: '/inter-fetching',
        name: 'Inter Fetching',
        component: AdminContentInterFetchingPage,
        beforeEnter: [checkAdmin],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    },
});

router.beforeEach(() => {
    Nprogress.start();
});

router.beforeEach(() => {
    Nprogress.done();
});

export default router;
