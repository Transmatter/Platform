import Nprogress from "nprogress";
import ContentService from '@/service/NewsProviderClient.js'

export default{
    checkSpell(text){
        Nprogress.start()
        return ContentService.
        get("/spellcheck?keyword="+text)
        .then((res)=>{
            Nprogress.done()
            return Promise.resolve(res)
        })
        .catch((err)=>{
            Nprogress.done()
            return Promise.reject(err)
        })

    }
}