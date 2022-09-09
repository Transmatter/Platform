<template>
    <div class="bg-gradient-to-r from-green-300 to-green-200">
        <div
            class="
                w-9/12
                m-auto
                py-16
                min-h-screen
                flex
                items-center
                justify-center
            "
        >
            <div class="bg-white shadow overflow-hidden sm:rounded-lg pb-8">
                <div class="border-t border-gray-200 text-center pt-8">
                    <h1 class="text-9xl font-bold text-green-300">Local News</h1>
                    <h1 class="text-6xl font-medium py-8">
                        Manually Fetching Local News
                    </h1>
                    <p class="text-2xl pb-8 px-12 font-medium">
                        This process Take a while. Please wait.
                    </p>
                    <button
                        @click="fetchLocalNews"
                        class="
                            bg-gradient-to-r
                            from-green-400
                            to-green-500
                            hover:from-green-500
                            hover:to-green-600
                            text-white
                            font-semibold
                            px-6
                            py-3
                            rounded-md
                        "
                    >
                        Start Fetching
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Nprogress from 'nprogress';
import adminContentFetchingService from './admin-content-fetching.service';
export default {
    name: 'Local News',
    methods : {
        fetchLocalNews() {
            Nprogress.start();
            adminContentFetchingService()
                .adminFetchingLocalNews()
                .then(() => {
                    Nprogress.done();
                })
        }
    }
}
</script>
<style scoped>
.text-9xl {
    font-size: 14rem;
}
@media (max-width: 645px) {
    .text-9xl {
        font-size: 5.75rem;
    }
    .text-6xl {
        font-size: 1.75rem;
    }
    .text-2xl {
        font-size: 1rem;
        line-height: 1.2rem;
    }
    .py-8 {
        padding-top: 1rem;
        padding-bottom: 1rem;
    }
    .px-6 {
        padding-left: 1.2rem;
        padding-right: 1.2rem;
    }
    .mr-6 {
        margin-right: 0.5rem;
    }
    .px-12 {
        padding-left: 1rem;
        padding-right: 1rem;
    }
}
</style>