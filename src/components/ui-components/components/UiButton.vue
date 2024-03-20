<template>
    <component
        :is="tag"
        class="ui-button"
    >
        <slot></slot>
    </component>
</template>

<script>
    export default {
        name: 'UiButton',
        props: {
            tag: {
                type: String,
                default: 'button',
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "styles/ui-button";
</style>
