<template>
    <svg
        class="icon"
        aria-hidden="true"
    >
        <use :href="symbolId" />
    </svg>
</template>

<script>
    import {
        defineComponent,
        computed
    } from 'vue'

    export default defineComponent({
        name: 'Icon',
        props: {
            id: {
                type: String,
                required: true,
            },
            prefix: {
                type: String,
                default: 'icon',
            },
            color: {
                type: String,
                default: 'currentColor',
            },
        },
        setup(props) {
            const symbolId = computed(() => `#${props.prefix}-${props.id}`)
            return { symbolId }
        },
    })
</script>

<style lang="scss">
    @import "styles/icon";
</style>
