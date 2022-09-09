import {ref, onMounted, onBeforeMount } from 'vue';
import ContentDetailSerivce from './content-detail.service';

export const useViewModel = () => {
    const contentDetail = ref({
        id: '',
        source : '',
        author: '',
        public_date: '',
        title: '',
        content: '',
        images: []
    })
    onBeforeMount(() => {
        fetchContentDetail();
    })
    onMounted(() => {
        fetchContentDetail();
    })
    const isLoading = ref(true);
    const fetchContentDetail = () => {
        ContentDetailSerivce()
        .getContentById(contentDetail.value.id)
        .then((res)=>{
            const data = res.data.data.getContent;
            contentDetail.value = data;
            isLoading.value = false;
        })
        return contentDetail;
    }
    return {contentDetail, isLoading}
}