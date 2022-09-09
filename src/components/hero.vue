<template>
    <div
        class="hero min-h-0 bg-base-200"
        style="
            background-image: url(https://img.freepik.com/free-photo/blind-person-reading-home_23-2149275720.jpg?w=1060&t=st=1660748235~exp=1660748835~hmac=275ff01dac5faa71ae627b48e0d13cf646eb5894b00ef3c2c22738148f46f29a);
        "
    >
        <div class="hero-content text-center">
            <div class="max-w-md py-6">
                <h1 class="text-5xl text-base-100 font-bold">
                    Welcome, {{ this.$store.getters.getCurrentUser.username }}
                </h1>
                <p class="py-6 text-base-100">
                    you are using this platform as
                    <span class="font-bold">{{ this.$store.getters.getRole.substring(5) }}</span>
                </p>
                <div class="space-y-2 sm:space-y-0 sm:flex sm:-mx-1">
                    <select
                        aria-label="state"
                        @change="getContentBySourceAndCategory"
                        v-model="select"
                        class="px-2 mx-2 select select-primary w-60 max-w-xs bg-primary text-base-100 lg:text-md md:text-md sm:text-xs"
                    >
                        <option disabled value="">เลือกหมวดหมู่</option>
                        <option v-for="opt in source" :value="opt" :key="opt" class="sm:text-sm md:text-md lg:text-md">
                            {{ opt.source === 'all' ? 'ทั้งหมด' : opt.source }}
                            {{ opt.type === 'all' ? '' : ' : ' + opt.type }}
                        </option>
                    </select>
                    <div class="flex flex-col mt-8 space-y-3 sm:space-y-0 sm:flex-row sm:justify-center sm:-mx-2">
                        <input
                            v-model="query"
                            type="text"
                            class="input input-bordered input-primary w-full max-w-xs mx-4"
                            placeholder="หาข่าวอื่นๆ"
                        />
                        <button @click="spellChecking()" class="px-4 py-2 btn btn-primary btn-md text-base-100">
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            page: 1,
            pages: 1,
            contents: [],
            query: '',
            totalPage: 0,
            source: [
                { source: 'all', type: 'all' },
                { source: 'ไทยรัฐออนไลน์', type: 'all' },
                { source: 'ไทยรัฐออนไลน์', type: 'วิเคราะห์เศรษฐกิจ' },
                { source: 'ไทยรัฐออนไลน์', type: 'การเงิน' },
                { source: 'ไทยรัฐออนไลน์', type: 'นโยบาย' },
                { source: 'ไทยรัฐออนไลน์', type: 'การตลาด' },
                { source: 'ไทยรัฐออนไลน์', type: 'การลงทุน' },
                { source: 'สนุกออนไลน์', type: 'เอ็นเตอร์เทน' },
                { source: 'เด็กดี', type: 'ชีวิตวัยรุ่น' },
            ],

            select: '',
            spell_error: true,
        };
    },
};
</script>
