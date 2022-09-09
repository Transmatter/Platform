<template>
    <div class="card w-96 bg-base-100 shadow-xl my-6 mx-6">
        <div class="card-body">
            <h2 class="card-title text-3xl">{{title}}</h2>
            <p class="text-xl py-2">{{content}}</p>
            <div class="card-actions justify-center">
                <button @click="changePageTo()" class="btn btn-primary text-base-100">Go</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props :  {
        title: {
            type: String,
            default: 'title'
        },
        content: {
            type: String,
            default: 'content'
        },
        page : {
            type: String,
            default: 'go'
        }
    },
    methods: {
        changePageTo(){
            this.$router.push({name: this.page,});
        }
    }
}
</script>
