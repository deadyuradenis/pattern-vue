<template>
    <main class="main">
        <slot></slot>
    </main>
</template>

<script>
    import { defineComponent } from 'vue'

    export default defineComponent({
        name: 'Main',
    })
</script>

<style scoped lang='scss'>
    @import "styles/main";
</style>
