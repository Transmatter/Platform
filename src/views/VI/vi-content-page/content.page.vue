<template>
    <!-- <KeyBoardEvent v-on:keyup="handleKeyPress"></KeyBoardEvent> -->
    <div class="flex flex-row my-6">
        <select
            aria-label="คุณกำลังเลือกหมวดหมูของบทความ"
            @change="loadselect"
            v-model="select"
            id="optionSource"
            data-toggle="dropdown"
            class="px-2 mx-1 select select-primary w-1/2 bg-primary text-base-100 lg:text-xl md:text-md sm:text-xs"
        >
            <option disabled value="">เลือกหมวดหมู่</option>
            <option
                v-for="opt in source"
                :value="opt"
                :key="opt"
                @mouseover="PlaySound(opt.source, opt.type)"
                @mouseleaves="stopSound"
                class="sm:text-sm md:text-md lg:text-xl"
            >
                {{ opt.source === 'all' ? 'ทั้งหมด' : opt.source }}
                {{ opt.type === 'all' ? '' : ' : ' + opt.type }}
            </option>
        </select>
        <div class="flex w-full items-center sm:flex-row sm:justify-center">
            <input
                id="searchBox"
                v-model="query"
                type="text"
                class="w-9/12 input input-bordered input-primary mx-1 text-xl"
                placeholder="หาข่าวอื่นๆ"
            />
            <button
                id="searchButt"
                @click="spellChecking()"
                class="w-2/12 px-4 py-2 btn btn-primary btn-md text-base-100"
            >
                Search
            </button>
        </div>
    </div>
    <p class="mx-6">มีข่าวทั้งสิ้น {{ totalElements }} รายการ</p>
    <div v-if="contents.length != 0 && suggestion.length == 0">
        <NewsDetailsVue :contents="contents" />
        <div class="w-full sm:w-auto overflow-hidden bg-green-50 rounded-lg my-6 lg:mx-0">
            <div>
                <button
                    v-if="totalElements != contents.length && !isload"
                    @click="loadmore"
                    id="readMore"
                    class="btn btn-block btn-primary text-base-100"
                >
                    load more
                </button>
                <button v-else-if="isload" class="btn btn-block btn-primary text-base-100 loading"></button>
                <button v-else-if="totalElements == contents.length" class="btn btn-block btn-disabled text-base-100">
                    load more
                </button>
            </div>
        </div>
    </div>
    <div v-else-if="suggestion.length == 0">
        <img class="mx-auto" src="../../../assets/not_found_image.png" alt="not found icon" />
        <p class="text-3xl font-bold text-center">Nothing Here...</p>
    </div>
    <div v-if="suggestion.length != 0">
        <div class="drawer-side">
            <label for="my-drawer-2" class="drawer-overlay"></label>
            <ul class="menu p-4 h-4/5drawer-end overflow-y-auto w-4/5 bg-base-100 text-base-content">
                <!-- Sidebar content here -->
                <li id="sugg1" @click="searchContent(this.suggestion[0])">
                    <a>{{ this.suggestion[0] }}</a>
                </li>
                <li id="sugg2" @click="searchContent(this.suggestion[1])">
                    <a>{{ this.suggestion[1] }}</a>
                </li>
                <li id="sugg3" @click="searchContent(this.query)">
                    <a>{{ this.query }}</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useViewModel } from './content.viewmodel';
import NewsDetailsVue from '@/components/NewsDetails.vue';
import ContentService from './content.service';
import '@hennge/vue3-pagination/dist/vue3-pagination.css';
import Nprogress from 'nprogress';
import SC from '@/service/SpellCorrection.js';
import TTS from '@/service/TTSService.js';
import AudioFeedBack from '@/service/AudioFeedBack';
import { onKeyStroke } from '@vueuse/core';
import TTSService from '@/service/TTSService';

var page = ref(1);
var pages = ref(1);
var size = ref(3);
var contents = ref([]);
var totalElements = ref(0);
var source = ref([
    { source: 'all', type: 'all', id: 's1' },
    { source: 'ไทยรัฐออนไลน์', type: 'all', id: 's2' },
    { source: 'ไทยรัฐออนไลน์', type: 'วิเคราะห์เศรษฐกิจ', id: 's3' },
    { source: 'ไทยรัฐออนไลน์', type: 'การเงิน', id: 's4' },
    { source: 'ไทยรัฐออนไลน์', type: 'นโยบาย', id: 's5' },
    { source: 'ไทยรัฐออนไลน์', type: 'การตลาด', id: 's6' },
    { source: 'ไทยรัฐออนไลน์', type: 'การลงทุน', id: 's7' },
    { source: 'สนุกออนไลน์', type: 'ทั้งหมด', id: 's8' },
    { source: 'เด็กดี', type: 'ชีวิตวัยรุ่น', id: 's9' },
]);
var select = ref('');
var spell_error = ref(true);
var suggestion = ref([]);
var isload = ref(false);
var index = ref(0);
var instruction = ref([
    'กดลูกศรขึ้นไปหน้าโฮม',
    'กดลูกศรซ้ายเพื่อนย้อนหน้ากลับ',
    'กดลูกศรขวาเพื่อไปหน้าที่ย้อนมา',
    'กดสเปซบาร์เพื่อเปิดโหมดค้นหา',
    'กดเอ็นเทอร์เพื่อค้นหา',
    'กดเอ็กซ์เพื่อเปลี่ยนหมวดหมู่',
    'หลังจากค้นหาแล้วมีคำผิด กด แซก เอ็กซ์ หรือ ซี เพื่อเลือกตัวเลือกตามลำดับ',
]);
var instru_id = ref(0);
// const { fetchSpecificContent, contents, pages, isLoading } = useViewModel();
onKeyStroke('v', () => {
    index.value++;
    select.value = source.value[index.value%source.value.length]
    console.log(select.value);
});
onKeyStroke('ArrowDown', () => {
    console.log('down');
});
onKeyStroke('/', () => {
    TTSService.stopVoice();
    TTSService.getVoice(instruction.value[instru_id.value%7]);
    instru_id.value += 1;
});

const getAllContents = () => {
    Nprogress.start();
    ContentService()
        .getAllContents(this.page, this.size)
        .then((res) => {
            contents.value = res.data.data.getAllApprovedContent.content;
            totalElements.value = res.data.data.getAllApprovedContent.totalElements;
            isload.value = false;
            AudioFeedBack.getNewContent();
            Nprogress.done();
        });
};
const searchContent = (keyword = this.query) => {
    size.value = 3;
    console.log(keyword, this.select);
    Nprogress.start();
    if (typeof select.value == 'string' || (select.value.source == 'all' && select.value.type == 'all')) {
        ContentService()
            .searchContent(keyword, page.value, size.value)
            .then((res) => {
                contents.value = res.data.data.searchOnlyApprovedContent.content;
                totalElements.value = res.data.data.searchOnlyApprovedContent.totalElements;
                query.value = keyword;
                suggestion.value = [];
                if (contents.value.length == 0) {
                    AudioFeedBack.getError();
                } else {
                    AudioFeedBack.getSuccessSearch();
                }
                TTS.getVoice('เจอทั้งหมด ' + this.totalElements + ' รายการ');
                Nprogress.done();
            });
    } else {
        ContentService()
            .searchContentBySrcAndCate(
                this.query,
                select.value.source,
                select.value.type === 'all' ? 'ทั้งหมด' : this.select.type,
                page.value,
                size.value
            )
            .then((res) => {
                contents.value = res.data.data.searchOnlyApprovedContentSpecInSrcAndCate.content;
                totalElements.value = res.data.data.searchOnlyApprovedContentSpecInSrcAndCate.totalElements;
                isload.value = false;
                if (contents.value.length == 0) {
                    AudioFeedBack.getError();
                } else {
                    AudioFeedBack.getNewContent();
                }
                TTS.getVoice('เจอทั้งหมด ' + totalElements.value + ' รายการ');
                Nprogress.done();
            });
    }
};
const spellChecking = () => {
    if (this.query.length === 0) {
        TTS.getVoice('กรุณากรอกคำค้นหา');
        alert('กรุณากรอกคำค้นหา');
        return;
    }
    SC.checkSpell(this.query)
        .then((res) => {
            if (res.data.suggestion == null) {
                this.searchContent();
            } else {
                const words = res.data.suggestion;
                this.suggestion.value = res.data.suggestion;
                console.log(words);
                TTS.getVoice('คุณหมายถึง ' + words[0] + ' หรือ ' + words[1] + 'หรือ ค้นหาด้วยคำของคุณ');
            }
        })
        .catch((err) => {
            console.log(err);
            // this.searchContent()
        });
    // this.searchContent()
};
const loadselect = () => {
    this.isload.value = true;
    if (typeof this.select == 'string') {
        this.getAllContents();
    }
    if (this.query != '') {
        this.spellChecking();
    } else if ((this.select.source == 'all' && this.select.type == 'all') || this.select == null) {
        const readyToTTS = 'คุณอยู่ที่เนื้อหาทั้งหมด';
        TTS.getVoice(readyToTTS);
        this.getAllContents();
    } else {
        let t = '';
        if (this.select.type === 'all') {
            t = 'ทั้งหมด';
        } else {
            t = this.select.type;
        }
        const readyToTTS = 'คุณอยู่ที่ ' + this.select.source + ' หมวด' + t;
        TTS.getVoice(readyToTTS);
        Nprogress.start();
        ContentService()
            .getNewsBySourceAndCategory(
                this.select.source,
                this.select.type === 'all' ? 'ทั้งหมด' : this.select.type,
                this.page,
                this.size
            )
            .then((res) => {
                AudioFeedBack.getNewContent();
                this.contents.value = res.data.data.getOnlyApprovedContentBySource.content;
                this.totalElements.value = res.data.data.getOnlyApprovedContentBySource.totalElements;
                this.isload.value = false;
                Nprogress.done();
            });
    }
};
const loadmore = () => {
    Nprogress.start();
    this.size += 3;
    this.isload.value = true;
    if (typeof this.select == 'string') {
        this.getAllContents();
    } else if (this.query !== '' && this.select.source == 'all' && this.select.type == 'all') {
        this.size.value = 3;
        this.searchContent(this.query);
    } else if (this.query !== '') {
        ContentService()
            .searchContentBySrcAndCate(
                this.query,
                this.select.source,
                this.select.type === 'all' ? 'ทั้งหมด' : this.select.type,
                this.page,
                this.size
            )
            .then((res) => {
                this.contents.value = res.data.data.searchOnlyApprovedContentBySource.content;
                this.totalElements.value = res.data.data.searchOnlyApprovedContentBySource.totalElements;
                this.isload.value = false;
                AudioFeedBack.getNewContent();
                Nprogress.done();
            });
    } else if ((this.select.source == 'all' && this.select.type == 'all') || this.select == null) {
        this.getAllContents();
        TTS.getVoice(readyToTTS);
    } else {
        Nprogress.start();
        ContentService()
            .getNewsBySourceAndCategory(
                this.select.source,
                this.select.type === 'all' ? 'ทั้งหมด' : this.select.type,
                this.page,
                this.size
            )
            .then((res) => {
                this.contents.value = res.data.data.getOnlyApprovedContentBySource.content;
                this.totalElements.value = res.data.data.getOnlyApprovedContentBySource.totalElements;
                this.isload.value = false;
                AudioFeedBack.getNewContent();
                Nprogress.done();
            });
    }
};
//     handleKeyPress: function (e){
//     const keyCode = String(e.keyCode || e.code || e.keyIdentifier);
//     if(keyCode == '40'){
//         document.getElementById("readMore").click();
//     }else if(keyCode == '88'){
//         this.index++;
//         this.select = this.source[this.index%this.source.length]
//         this.loadselect()
//     }else if(keyCode == '191'){
//         TTSService.stopVoice()
//         if(this.instru_id == this.instruction.length-1){
//             this.instru_id=0
//         }
//         TTSService.getVoice(this.instruction[this,this.instru_id])
//         this.instru_id+=1
//     }
// }
</script>
