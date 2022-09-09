<script>
export default {
    props:["buttonName"]
}
</script>
<template>
    <button class="px-2 py-1 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-400 rounded-md hover:bg-grey-500 focus:outline-none focus:ring focus:ring-grey-200 focus:ring-opacity-80">
        {{this.buttonName}}
    </button>
</template>