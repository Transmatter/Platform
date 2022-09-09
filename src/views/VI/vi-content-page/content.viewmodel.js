import { ref, onMounted } from 'vue'
import ContentService from './content.service'

export const useViewModel = () => {
    const contents = ref([])
    const pages = ref()
    const isLoading = ref(false)

    const fetchContent = () => {
        ContentService()
        .getAllContents()
        .then((res) => {
            contents.value = res.data.data.getAllApprovedContent.content
            pages.value = res.data.data.getAllApprovedContent.totalPages
            isLoading.value = false
        })
    }
    
    const fetchSpecificContent = (value) => {
        if(value === "ไทยรัฐออนไลน์"){
            ContentService()
            .getThairathContents()
            .then((res) => {
                contents.value = res.data.data.getNewsBySource
                isLoading.value = false
            })
        }
        if(value === "sanook"){
            ContentService()
            .getSanookContents()
            .then((res) => {
                contents.value = res.data.data.getNewsBySource
                isLoading.value = false
            })
        }
        if(value === "dek-d"){
            ContentService()
            .getDekDContents()
            .then((res) => {
                contents.value = res.data.data.getNewsBySource
                isLoading.value = false
            })
        }
        if(value==="normal people"){
            ContentService()
            .getOtherContents()
            .then((res) => {
                contents.value = res.data.data.getNewsBySource
                isLoading.value = false
            })
        }
    }

    onMounted(() => {
        fetchContent()
    })
    
    return {
        fetchSpecificContent,
        pages,
        contents,
        isLoading
    }
}

