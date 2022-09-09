<script>
export default {
    props:["buttonName"]
}
</script>
<template>
     <!-- <button class="px-2 py-1 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-80">
        {{this.buttonName}}
    </button> -->
    <button class="btn btn-primary btn-sm text-base-100" >
        {{this.buttonName}}
    </button>
</template>