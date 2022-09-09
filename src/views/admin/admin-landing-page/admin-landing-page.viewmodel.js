import { ref, onMounted } from 'vue'
import AdminLandingPageService from './admin-landing-page.service'
import NProgress from 'nprogress'
// import { all } from 'core-js/fn/promise'

export const useViewModel = () => {
    const contents = ref([])
    const pages = ref()
    const allContent = ref()
    const incomplateContent = ref()
    const local_content = ref()
    const inter_content = ref()
    const isLoading = ref(false)

    const fetchContent = () => {
        AdminLandingPageService()
        .getAllContent()
        .then((res) => {
            allContent.value = res.data.data.getAllContents.totalElements
        });
        AdminLandingPageService()
        .getAllEmptyAltNews()
        .then((res) => {
            incomplateContent.value = res.data.data.getAllEmptyAltNews.totalElements
        })
        AdminLandingPageService()
        .getContentType("LOCAL_CONTENT")
        .then((res) => {
            local_content.value = res.data.data.getContentByType.totalElements
        });
        AdminLandingPageService()
        .getContentType("INTER_CONTENT")
        .then((res) => {
            inter_content.value = res.data.data.getContentByType.totalElements
        });
        isLoading.value = false
    }
    
    onMounted(() => {
        NProgress.start()
        fetchContent()
        NProgress.done()
    })
    
    return {
        pages,
        contents,
        isLoading,
        allContent,
        incomplateContent,
        local_content,
        inter_content,
    }
}
