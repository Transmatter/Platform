import { ref, onMounted } from 'vue'
import AdminEmptyAltService from './admin-empty-alt.service'
import NProgress from 'nprogress'

export const useViewModel = () => {
    const contents = ref([])
    const pages = ref()
    const isLoading = ref(false)

    const fetchContent = () => {
        AdminEmptyAltService()
        .getEmptyAltContents()
        .then((res) => {
            contents.value = res.data.data.getAllEmptyAltNews.content
            pages.value = res.data.data.getAllEmptyAltNews.totalPages
            isLoading.value = false
        })
    }
    
    onMounted(() => {
        NProgress.start()
        fetchContent()
        NProgress.done()
    })
    
    return {
        pages,
        contents,
        isLoading
    }
}
