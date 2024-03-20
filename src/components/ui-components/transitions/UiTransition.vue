<template>
    <transition
        @enter=""
        @leave=""
        :appear="appear"
        :mode="mode"
        :name="transitionName"
    >
        <slot></slot>
    </transition>
</template>

<!--
  @before-enter="onBeforeEnter"
  @enter="onEnter"
  @after-enter="onAfterEnter"
  @enter-cancelled="onEnterCancelled"
  @before-leave="onBeforeLeave"
  @leave="onLeave"
  @after-leave="onAfterLeave"
  @leave-cancelled="onLeaveCancelled"
-->

<script>
    import {
        computed,
        defineComponent
    } from 'vue';

    export default defineComponent({
        name: 'UiTransition',
        props: {
            name: {
                type: String,
                default: 'fade',
                required: true,
            },
            appear: {
                type: Boolean,
                default: false,
                required: false,
            },
            mode: {
                type: String,
                required: false,
            },
        },
        setup (props) {
            const transitionName = computed(() => {
                return `ui-transition-${props.name}`
            })

            return {
                transitionName,
            }
        }
    })
</script>

<style scoped lang='scss'>
    @import "styles/ui-transition";
</style>
