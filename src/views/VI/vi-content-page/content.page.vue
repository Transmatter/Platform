<template>
<KeyBoardEvent v-on:keyup="handleKeyPress"></KeyBoardEvent>
        <div class="flex flex-row my-6">
            <select aria-label="คุณกำลังเลือกหมวดหมูของบทความ" @change="loadselect" v-model="select" id="optionSource" data-toggle="dropdown" class="px-2 mx-1 select select-primary w-1/2 bg-primary text-base-100 lg:text-xl md:text-md sm:text-xs">
                <option disabled value="">เลือกหมวดหมู่</option>
                <option v-for="opt in source" :value="opt" :key="opt" @mouseover="PlaySound(opt.source,opt.type)" @mouseleaves="stopSound" class="sm:text-sm md:text-md lg:text-xl" >
                    {{opt.source === 'all' ? 'ทั้งหมด' : opt.source}}
                    {{opt.type === 'all' ? '' : ' : ' + opt.type}}
                </option>
            </select>
            <div class="flex w-full items-center sm:flex-row sm:justify-center">
                <input id="searchBox" v-model="query" type="text" class="w-9/12 input input-bordered input-primary mx-1 text-xl" placeholder="หาข่าวอื่นๆ">
                <button  id="searchButt" @click="spellChecking()" class="w-2/12 px-4 py-2 btn btn-primary btn-md text-base-100 ">
                    Search
                </button>
            </div>
        </div>
    <p class="mx-6">มีข่าวทั้งสิ้น {{totalElements}} รายการ</p>
    <div  v-if="contents.length != 0 && suggestion.length == 0">
        <NewsDetailsVue :contents="contents"/>
        <div class="w-full sm:w-auto overflow-hidden bg-green-50 rounded-lg my-6 lg:mx-0">
            <div>
                <button v-if="totalElements!=contents.length && !isload" @click="loadmore" id="readMore" class="btn btn-block btn-primary text-base-100">load more</button>
                <button v-else-if="isload" class="btn btn-block btn-primary text-base-100 loading"></button>
                <button v-else-if="totalElements==contents.length"  class="btn btn-block btn-disabled text-base-100">load more</button>
            </div>
        </div>
    </div>
    <div v-else-if="suggestion.length == 0">
        <img class="mx-auto" src="../../../assets/not_found_image.png" alt="not found icon">
        <p class="text-3xl font-bold text-center">Nothing Here...</p>
    </div>
    <div v-if="suggestion.length != 0">
        <div class="drawer-side">
    <label for="my-drawer-2" class="drawer-overlay"></label> 
    <ul class="menu p-4 h-4/5drawer-end overflow-y-auto w-4/5 bg-base-100 text-base-content">
        <!-- Sidebar content here -->
        <li id="sugg1" @click="searchContent(this.suggestion[0])"><a>{{this.suggestion[0]}}</a></li>
        <li id="sugg2" @click="searchContent(this.suggestion[1])" ><a>{{this.suggestion[1]}}</a></li>
        <li id="sugg3" @click="searchContent(this.query)"><a>{{this.query}}</a></li>
    </ul>
    </div>
    </div>

</template>

<script>
import { useMagicKeys, useSpeechRecognition, onKeyUp } from '@vueuse/core';
import { ref, watch } from 'vue'
import { useViewModel } from "./content.viewmodel";
import NewsDetailsVue from "@/components/NewsDetails.vue";
import ButtomVue from "@/widget/Buttom.vue";
import ContentService from "./content.service";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import Nprogress from 'nprogress';
import SC from '@/service/SpellCorrection.js'
import TTS from '@/service/TTSService.js'
import AudioFeedBack from "../../../service/AudioFeedBack";
import KeyBoardEvent from '../../../components/KeyBoardEvent.vue'
import TTSService from "../../../service/TTSService";

const lang = ref('th-TH')
const {m} = useMagicKeys()
const speech = useSpeechRecognition({
    lang,
    continuous: true,
});
const {
    isSupported,
    isListening,
    isFinal,
    result,
    start,
    stop,
} = speech

watch(m,async (v)=> {
    if(v){
        await AudioFeedBack.getSuccessSearch()
        await speech.start();
    }
})
onKeyUp('m',() => {
    TTSService.stopVoice();
    speech.stop();
    document.getElementById("searchBox").value = speech.result.value;
    console.log('not press m m');
});

export default {
    name: "Content Page",
    components: {
        NewsDetailsVue,
        ButtomVue,
        VPagination,
        KeyBoardEvent
    },
    data(){
        return {
            page : 1,
            pages : 1,
            size: 3,
            contents: [],
            query : '',
            totalElements: 0, 
            source : [
                {"source": "all","type": "all", "id":"s1"},
                {"source":"ไทยรัฐออนไลน์","type":"all", "id":"s2"},
                {"source":"ไทยรัฐออนไลน์","type":"วิเคราะห์เศรษฐกิจ", "id":"s3"},
                {"source":"ไทยรัฐออนไลน์","type":"การเงิน", "id":"s4"},
                {"source":"ไทยรัฐออนไลน์","type":"นโยบาย", "id":"s5"},
                {"source":"ไทยรัฐออนไลน์","type":"การตลาด", "id":"s6"},
                {"source":"ไทยรัฐออนไลน์","type":"การลงทุน", "id":"s7"},
                {"source":"สนุกออนไลน์","type":"ทั้งหมด", "id":"s8"},
                {"source":"เด็กดี","type":"ชีวิตวัยรุ่น", "id":"s9"}
            ],
            select : '' ,
            spell_error: true,
            suggestion:[],
            isload: false,
            index : 0 ,
            instruction: [
            "กดลูกสรขึ้นไปหน้าโฮม",
            "กดลูกสรซ้ายเพื่อนย้อนหน้ากลับ",
            "กดลูกสรขวาเพื่อไปหน้าที่ย้อนมา",
            "กดสเปซบาร์เพื่อเปิดโหมดค้นหา",
            "กดเอ็นเทอร์เพื่อค้นหา",
            "กดเอ็กซ์เพื่อเปลี่ยนหมวดหมู่",
            "หลังจากค้นหาแล้วมีคำผิด กด แซก เอ็กซ์ หรือ ซี เพื่อเลือกตัวเลือกตามลำดับ"

            ],
            instru_id:0
        }
    },
    setup() {
        const {
            fetchSpecificContent,
            contents,
            pages,
            isLoading
        } = useViewModel();

        return {
            fetchSpecificContent,
            pages,
            contents,
            isLoading
        };
    },
    methods : {
        getAllContents(){
            Nprogress.start();
            ContentService()
                .getAllContents(this.page,this.size)
                .then((res) => {
                    this.contents = res.data.data.getAllApprovedContent.content
                    this.totalElements = res.data.data.getAllApprovedContent.totalElements
                    this.isload = false;
                    AudioFeedBack.getNewContent()
                    Nprogress.done();
            });
        },
        searchContent(keyword=this.query){
            this.size = 3;
            console.log(keyword,this.select);
            Nprogress.start();
            if (typeof this.select == 'string' || (this.select.source == 'all' && this.select.type == 'all')){
                ContentService()
                .searchContent(keyword,this.page,this.size)
                .then((res) => {
                this.contents = res.data.data.searchOnlyApprovedContent.content
                this.totalElements = res.data.data.searchOnlyApprovedContent.totalElements
                this.query = keyword
                this.suggestion = []
                if(this.contents.length==0){
                    AudioFeedBack.getError()
                }else{
                    AudioFeedBack.getSuccessSearch() 
                }
                TTS.getVoice("เจอทั้งหมด "+this.totalElements+" รายการ")
                Nprogress.done();

            });
            } else {
                ContentService()
                .searchContentBySrcAndCate(this.query,this.select.source,this.select.type === 'all' ? 'ทั้งหมด' : this.select.type ,this.page,this.size)
                .then((res) => {
                    this.contents = res.data.data.searchOnlyApprovedContentSpecInSrcAndCate.content
                    this.totalElements = res.data.data.searchOnlyApprovedContentSpecInSrcAndCate.totalElements
                    this.isload = false;
                    if(this.contents.length==0){
                        AudioFeedBack.getError()
                    }else{
                        AudioFeedBack.getNewContent() 
                    }
                    TTS.getVoice("เจอทั้งหมด "+this.totalElements+" รายการ")
                    Nprogress.done();
                });
            }             
        },
        spellChecking(){
            this.query = document.getElementById("searchBox").value;
            if(this.query.length === 0){
                TTS.getVoice("กรุณากรอกคำค้นหา")
                alert("กรุณากรอกคำค้นหา")
                return 
            }
            SC.checkSpell(this.query)
            .then((res)=>{
                if(res.data.suggestion==null){
                    this.searchContent()
                }else{
                    const words = res.data.suggestion
                    this.suggestion = res.data.suggestion
                    console.log(words)
                    TTS.getVoice("คุณหมายถึง "+words[0]+" หรือ "+words[1]+'หรือ ค้นหาด้วยคำของคุณ')
                }
            })
            .catch((err)=>{
                console.log(err)
                // this.searchContent()
            })
            // this.searchContent()
        },
        loadselect(){
            this.isload = true;
            if(typeof this.select == 'string'){
                this.getAllContents();
            }
            if(this.query != ''){
                this.spellChecking();
            }
            else if((this.select.source == 'all' && this.select.type == 'all') || this.select == null){
                const readyToTTS = "คุณอยู่ที่เนื้อหาทั้งหมด" 
                TTS.getVoice(readyToTTS)
                this.getAllContents();
            } else {
                let t = '';
                if(this.select.type === 'all'){
                    t = 'ทั้งหมด'
                }else {
                    t = this.select.type
                }
                const readyToTTS = "คุณอยู่ที่ " + this.select.source + " หมวด" + t
                TTS.getVoice(readyToTTS)
                Nprogress.start();
                ContentService()
                .getNewsBySourceAndCategory(this.select.source,this.select.type === 'all' ? 'ทั้งหมด' : this.select.type ,this.page,this.size)
                .then((res) => {
                    AudioFeedBack.getNewContent()
                    this.contents = res.data.data.getOnlyApprovedContentBySource.content
                    this.totalElements = res.data.data.getOnlyApprovedContentBySource.totalElements
                    this.isload = false;
                    Nprogress.done();
                });
            }
        },
        loadmore(){
            Nprogress.start();
            this.size+=3;
            this.isload = true;
            if (typeof this.select == 'string'){
                this.getAllContents();
            }else if(this.query !== '' && this.select.source == 'all' && this.select.type == 'all'){
                this.size = 3;
                this.searchContent(this.query);

            } else if(this.query !== ''){
                ContentService()
                .searchContentBySrcAndCate(this.query,this.select.source,this.select.type === 'all' ? 'ทั้งหมด' : this.select.type ,this.page,this.size)
                .then((res) => {
                    this.contents = res.data.data.searchOnlyApprovedContentBySource.content
                    this.totalElements = res.data.data.searchOnlyApprovedContentBySource.totalElements
                    this.isload = false;
                    AudioFeedBack.getNewContent()
                    Nprogress.done();
                });
            } else if((this.select.source == 'all' && this.select.type == 'all') || this.select == null){
                this.getAllContents();
                TTS.getVoice(readyToTTS)
            } else {
                Nprogress.start();
                ContentService()
                .getNewsBySourceAndCategory(this.select.source,this.select.type === 'all' ? 'ทั้งหมด' : this.select.type ,this.page,this.size)
                .then((res) => {
                    this.contents = res.data.data.getOnlyApprovedContentBySource.content
                    this.totalElements = res.data.data.getOnlyApprovedContentBySource.totalElements
                    this.isload = false;
                    AudioFeedBack.getNewContent()
                    Nprogress.done();
                });
            }
        },
        handleKeyPress: function (e){
        const keyCode = String(e.keyCode || e.code || e.keyIdentifier);
        if(keyCode == '40'){
            document.getElementById("readMore").click();
        }else if(keyCode == '88'){
            this.index++;
            this.select = this.source[this.index%this.source.length]
            this.loadselect()
        }else if(keyCode == '191'){
            TTSService.stopVoice()
            if(this.instru_id == this.instruction.length-1){
                this.instru_id=0
            }
            TTSService.getVoice(this.instruction[this,this.instru_id])
            this.instru_id+=1
        }
    }
    },
    
}
</script>