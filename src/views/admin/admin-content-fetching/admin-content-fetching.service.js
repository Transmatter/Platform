import newProviderClient from '@/service/NewsProviderClient';

const adminContentFetchingService = () => {
    const adminFetchingLocalNews = () => {
        return newProviderClient
            .get("/LocalNews")
            .then((res) => {
                alert('News had been added to database');
            }).catch((err) => {
                alert('News had been added to database');
                console.log(err);
            })
    }

    const adminFetchingInterNews = (topic,time) => {
        return newProviderClient
        .get(`/InterNews?topic=${topic}&time=${time}`)
        .then((res)=>{
            alert('News had been added to database');
            console.log(`/InterNews?topic=${topic}&time=${time}`)
        }).catch((err) => {
            alert('News had been added to database');
            console.log(`/InterNews?topic=${topic}&time=${time}`)
            console.log(err);
        })
    }

    return { adminFetchingInterNews, adminFetchingLocalNews }
}

export default adminContentFetchingService;