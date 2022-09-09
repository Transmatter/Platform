<template>
    <div class="stat hover:shadow-2xl" @click="getDetails()">
        <div class="stat-title">{{title}}</div>
        <div class="stat-value">{{content}}</div>
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
        text : {
            type: String,
            default: 'go'
        }
    },
    methods: {
        getDetails() {
            console.log(`${this.text}`);
            // this.$router.push({
            //     name: 'admin-landing-page-details',
            //     params: {
            //         title: this.title,
            //         content: this.content,
            //         text: this.text
            //     }
            // });
        }
    }
}
</script>
