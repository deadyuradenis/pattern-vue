import debounce from 'lodash/debounce';

export default (store) => {
    const handleResize = debounce(() => {
        store.commit('updateScreen', window.innerWidth);
    }, 150);


    const handleLoad = debounce(() => {
        store.commit('updateScreen', window.innerWidth);
    }, 0);

    window.addEventListener('resize', handleResize);
    window.addEventListener('load', handleLoad);

    return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('load', handleLoad);
    };
};
