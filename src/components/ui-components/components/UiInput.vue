<template>
    <div
        class="ui-input"
        :class="getStatusClasses"
    >
        <div
            class="ui-input__title"
            v-if="title"
        >
            {{ title }}
        </div>
        <label class="ui-input__wrapper">
            <textarea
                class="ui-input__native"
                :type="type"
                :name="name"
                :placeholder="placeholder"
                :required="required"
                :disabled="disabled"
                @input="handleInput"
                @focus="handleFocus"
                @blur="handleBlur"
                v-if="tag === 'textarea'"
            >{{ inputValue }}</textarea>
            <input
                class="ui-input__native"
                :type="type"
                :name="name"
                :placeholder="placeholder"
                :value="inputValue"
                :required="required"
                :disabled="disabled"
                @input="handleInput"
                @focus="handleFocus"
                @blur="handleBlur"
                v-else
            >
            <slot></slot>
        </label>
        <transition name="ui-input-status">
            <div
                class="ui-input__status"
                v-if="(status && typeof status.type === 'string' && status.title)"
            >
                <span>{{ status.title }}</span>
            </div>
        </transition>
    </div>
</template>

<script>
    import {
        defineComponent,
        computed,
        onMounted,
        onUnmounted,
        ref,
        watch
    } from 'vue'

    export default defineComponent({
        name: 'UiInput',
        props: {
            tag: {
                type: String,
                default: 'input',
                required: false,
            },
            type: {
                type: String,
                default: 'text',
                required: false,
            },
            name: {
                type: String,
                default: 'input',
                required: true,
            },
            placeholder: {
                required: false,
            },
            required: {
                type: Boolean,
                default: false,
                required: false,
            },
            validationType: {
                type: String,
                default: 'default',
                required: false,
            },
            disabled: {
                type: Boolean,
                default: false,
                required: false,
            },
            value: {
                type: String,
                default: '',
                required: false,
            },
            title: {
                type: String,
                default: false,
                required: false,
            },
        },
        setup(props, { emit }) {
            const inputValue = ref(props.value || '');
            const isFocused = ref(false);
            const status = ref(props.status);

            const validate = () => {
                status.value = {type: '', title: ''};

                const clearValue = inputValue.value.trim();

                const isValidEmail = (value) => {
                    const regexpMail = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
                    return regexpMail.test(value);
                }

                const isValidPhone = (value) => {
                    const regexpPhone = new RegExp('(7|8)\\s[\(][0-9]{3}[\)]\\s[0-9]{3}[\-][0-9]{2}[\-][0-9]{2}');
                    return regexpPhone.test(value);
                }

                if (props.required) {
                    if (clearValue === '') {
                        status.value = {type: 'error', title: 'Поле обязательно для заполнения'};
                    } else {
                        switch (props.validationType) {
                            case 'email':
                                status.value = !isValidEmail(clearValue) ? {type: 'error', title: 'Пожалуйста, введите правильный email'} : {type: 'success', title: ''}
                                break;

                            case 'phone':
                                status.value = !isValidPhone(clearValue) ? {type: 'error', title: 'Пожалуйста, введите правильный номер'} : {type: 'success', title: ''}
                                break;

                            default:
                                status.value = clearValue == '' ? {type: 'error', title: 'Поле обязательно для заполнения'} : {type: 'success', title: ''}
                                break;
                        }
                    }
                } else if (clearValue !== '') {
                    status.value = {type: 'success', title: ''}
                } else {
                    status.value = {}
                }

                // console.log(status.value);
                emit('validation', status.value);

                return status.value;
            };

            const handleFocus = () => {
                isFocused.value = true;
                status.value = {};
            };

            const handleBlur = () => {
                isFocused.value = false;
                validate()
            };

            const handleInput = (event) => {
                inputValue.value = event.target.value;
                emit('update:modelValue', inputValue.value);
            };

            const clear = () => {
                inputValue.value = '';
                status.value = {};

                return;
            }

            watch(inputValue, validate);

            watch(() => props.value, (newValue) => {
                inputValue.value = newValue;
            });

            // Classes

            const getStatusClasses = computed(() => {
                const classes = [];

                if (status.value && status.value.type) {
                    classes.push(`ui-input--is-${status.value.type}`);
                }

                if (props.disabled) {
                    classes.push('ui-input--is-disabled');
                }

                if (props.tag === 'textarea') {
                    classes.push('ui-input--type-textarea');
                }

                if (isFocused.value) {
                    classes.push('ui-input--is-focused');
                }

                return classes.join(' ');
            });


            return {
                getStatusClasses,
                inputValue,
                handleInput,
                handleFocus,
                handleBlur,
                validate,
                status,
                clear,
            };
        },
    })
</script>


<style scoped lang="scss">
    @import "styles/ui-input";
</style>
