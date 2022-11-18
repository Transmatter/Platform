<template>
    <KeyBoardEvent v-on:keyup="handleKeyPress"></KeyBoardEvent>
    <div class="lg:mx-64 lg:my-6 lg:px-3 border">
        <div v-if="(this.$store.getters.getRole == 'ROLE_SUPER_ADMIN' || this.$store.getters.getRole == 'ROLE_ADMIN') && this.$store.getters.getStatus == 'VERIFIED'">
            <input class="text-2xl font-bold my-2 py-4 input input-bordered w-full " v-model="title"/>
            <p class="text-sm py-3 px-3">{{contentDetail.author}}</p>
            <p class="text-sm py-3 px-3">{{contentDetail.public_date}}</p>
            <textarea class="textarea textarea-primary text-md py-3 px-3 leading-8 text-justify indent-8 w-full h-96" v-model="content" />
            <div class="grid grid-cols-6 justify-item-end my-6" v-if="(this.$store.getters.getRole == 'ROLE_SUPER_ADMIN' || this.$store.getters.getRole == 'ROLE_ADMIN') && this.$store.getters.getStatus == 'VERIFIED'">
                <ButtomVue class="invisible" buttonName="update" />
                <ButtomVue class="invisible" buttonName="update" />
                <ButtomVue class="invisible" buttonName="update" />
                <ButtomVue class="invisible" buttonName="update" />
                <ButtomVue class="invisible" buttonName="update" />
                <ButtomVue @click="updateContent()" class="mx-2" buttonName="update" />
            </div>
        </div>
        <div v-else>
            <p class="text-2xl font-bold py-2">{{contentDetail.title}}</p>
            <p class="text-sm py-3 px-3">{{contentDetail.author}}</p>
            <p class="text-sm py-3 px-3">{{getDate(contentDetail.public_date)}}</p>
            <p class="text-md py-3 px-3 leading-8 text-justify indent-8">{{contentDetail.content}}</p>
        </div>
        <div class="inline-flex items-baseline" >
            <div v-if="(this.$store.getters.getRole == 'ROLE_SUPER_ADMIN' || this.$store.getters.getRole == 'ROLE_ADMIN') && this.$store.getters.getStatus == 'VERIFIED'">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th>Images</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr v-for="(image,index) in contentDetail.images" :key="index">
                            <td>
                                <img class="my-2 mx-3 h-64" :src="image.url" :alt="image.alt"/>
                            </td>
                            <td>
                                <div v-if="image.verifyStatus == 'COMPLETE'">
                                    <textarea v-model="imagesAlt[index]" class="textarea textarea-primary my-2 mx-3 px-2 py-2 w-80" type="text" placeholder="คำอธิบายภาพ"/>
                                    <p class="text-primary mx-3 px-2">ตรวจทานเรียบร้อย</p>
                                    <p class="text-primary mx-3 px-2">ตรวจทาน โดย : {{image.verifiedBy}}</p>
                                    <p class="text-primary mx-3 px-2">ตรวจทาน วันที่ {{getDate(image.verifiedDate)}}</p>
                                </div>
                                <div v-if="image.verifyStatus == 'INCOMPLETE'">
                                    <textarea v-model="imagesAlt[index]" class="textarea textarea-warning my-2 mx-3 px-2 py-2 w-80" type="text" placeholder="คำอธิบายภาพ"/>
                                    <p class="text-warning mx-3 px-2">ต้องการการตรวจทาน</p>
                                </div>
                                <div v-if="image.verifyStatus == 'EMPTY'">
                                    <textarea v-model="imagesAlt[index]" class="textarea textarea-error my-2 mx-3 px-2 py-2 w-80" type="text" placeholder="คำอธิบายภาพ"/>
                                    <p class="text-error mx-3 px-2">ยังไม่ได้ใส่คำอธิบายภาพ</p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else v-for="(image,index) in contentDetail.images" :key="index">
                <img class="my-2 mx-3 h-64" :src="image.url" :alt="image.alt"/>
            </div>
        </div >
        <div class="grid grid-cols-6 justify-item-end my-6" v-if="(this.$store.getters.getRole == 'ROLE_SUPER_ADMIN' || this.$store.getters.getRole == 'ROLE_ADMIN') && this.$store.getters.getStatus == 'VERIFIED'">
            <ButtomErrorVue @click="deleteId()" buttonName="delete" />
            <ButtomVue class="invisible" buttonName="update" />
            <ButtomVue class="invisible" buttonName="update" />
            <ButtomVue class="invisible" buttonName="update" />
            <ButtomVue class="invisible" buttonName="update" />
            <ButtomVue @click="getImageContent()" class="mx-2" buttonName="update" />
        </div>
    </div>
    <div v-for="comment in contentDetail.comment" :key="comment" class="border hover:bg-green-100 lg:mx-80 my-4">
            <p class="px-6 py-2 text-sm">ผู้เขียน: {{convertAuthor(comment.author)}}</p>
            <p class="px-6 py-2 text-sm indent-8">{{comment.content}}</p>
            <p class="px-6 py-2 text-sm flex justify-end">{{comment.time}}</p>
        </div>
</template>
<script>
import { defineComponent } from "vue"
import ButtomErrorVue from "@/widget/ButtomError.vue";
import ButtomVue from "@/widget/Buttom.vue";
import ContentDetailSerivce from "./content-detail.service"
import Nprogress from 'nprogress';
import TTS from '@/service/TTSService';
import dayjs from 'dayjs'
import AudioFeed from "../../../service/AudioFeedBack.js";
import KeyBoardEvent from '../../../components/KeyBoardEvent.vue'
import 'dayjs/locale/th'
import TTSService from '@/service/TTSService';
export default defineComponent({
    name: 'ContentDetailPage',
    components : {
        ButtomVue,
        ButtomErrorVue,
        KeyBoardEvent
    },
    data() {
        return {
            title : '',
            content : '',
            contentDetail: {},
            imagesAlt : [], 
            inputAlt : []
        }
    },
    methods: {
        getDate(dateString){
            return dayjs(dateString).locale('th').format('DD MMMM YYYY');
        },
        read(){
            TTS.getVoice(this.contentDetail.content);
        },
        readImage(alt){
            TTS.getVoice(alt)
        },
        getImageContent(){
            Nprogress.start()
            for(let i = 0; i < this.imagesAlt.length; i++){
                this.inputAlt.push({'alt' : this.imagesAlt[i]});
            }
            ContentDetailSerivce()
            .updateImateAlt(this.$route.params.id,this.inputAlt)
            .then(() => {
                Nprogress.done()
                this.$router.push('/content/'+this.$route.params.id);
            }).catch(error => {
                console.log(error);
            })
        },
        deleteId(){
            let check = confirm('คุณต้องการลบข้อมูลนี้ใช่หรือไม่');
            if(check){
                Nprogress.start()
                ContentDetailSerivce()
                    .deleteContentById(this.$route.params.id)
                    .then(() => {
                        Nprogress.done()
                        this.$router.push('/')
                    })
            }
        },
        convertAuthor(author){
            if(author == null) {
                return 'ไม่ทราบผู้เขียน'
            }
            if(author.length === 0){
                return 'ไม่ทราบผู้เขียน'
            }
            return author
        },
        updateContent(){
            Nprogress.start()
            const updatedContent = {
                title : this.title,
                content : this.content
            }
            ContentDetailSerivce()
            .updateContent(this.$route.params.id,updatedContent)
            .then(() => {
                Nprogress.done()
                this.$router.push('/content/'+this.$route.params.id);
            }).catch(error => {
                console.log(error);
            })
        },
        handleKeyPress: function (e){
        const keyCode = String(e.keyCode || e.code || e.keyIdentifier);
        if(keyCode == '86'){
            TTSService.stopVoice()
            TTSService.stopVoice()
            TTSService.getVoice(`คุณอยู่ที่หน้าข่าว ${this.title}`);
        }
    }
    },
    created(){
        ContentDetailSerivce()
        .getContentById(this.$route.params.id)
        .then((res) => {
            AudioFeed.getAccessContent()
            this.contentDetail = res.data.data.getContent
            this.imagesAlt = this.contentDetail.images.map(image => image.alt)
            this.title = this.contentDetail.title
            this.content = this.contentDetail.content
        })
    }
});
</script>