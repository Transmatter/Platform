<script>
export default {
    props: ["content"]
}
</script>
<template>
    <a
        href="#"
        class="
            block block
            px-4
            py-2
            text-md text-green-700
            hover:bg-green-100 hover:text-green-800
        "
        role="menuitem"
    >
        <span class="flex flex-col">
            <span> {{ this.content }} </span>
        </span>
    </a>
</template>