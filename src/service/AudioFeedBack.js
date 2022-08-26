import getNewContentAudio from '../assets/audio/getNewContent.mp3'
import SuccessSearch from '../assets/audio/SuccessSearch.mp3'
import AccessContent from '../assets/audio/accessContent.mp3'

export default{
    getNewContent(){
        const audio1 = new Audio(getNewContentAudio);
        console.log("newContent")
        audio1.play();
        // audio.pause();
        audio1.currentTime = 0;
    },
    getSuccessSearch(){
        const audio2 = new Audio(SuccessSearch);
        console.log("search")
        audio2.play();
        // audio.pause();
        audio2.currentTime = 0;
    },
    getAccessContent(){
        const audio3 = new Audio(AccessContent);
        console.log("accessContent")
        audio3.play(); 
        // audio.pause();
        audio3.currentTime = 0;
    }
}