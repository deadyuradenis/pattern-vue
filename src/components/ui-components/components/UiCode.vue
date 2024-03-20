<template>
    <p class="ui-code">
        <slot></slot>
    </p>
</template>

<script>
    import { defineComponent } from 'vue'

    export default defineComponent({
        name: 'UiCode',
    })
</script>

<style lang='scss'>
    @import "styles/ui-code";
</style>
