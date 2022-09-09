import { ref, onMounted } from 'vue'
import adminWatingListService from './admin-waiting-list.service'

export const useViewModel = () => {
    const waitingList = ref([])
    const pages = ref()
    const isLoading = ref(false)

    const fetchWaitingList = () => {
        adminWatingListService()
        .getAdminWatingList()
        .then((res) => {
            waitingList.value = res.data.data.getUnVerifyAdmin.content
            pages.value = res.data.data.getUnVerifyAdmin.totalPages
            isLoading.value = false
        })
    }

    onMounted(() => {
        fetchWaitingList()
    })

    return {
        pages,
        waitingList,
        isLoading
    }
}