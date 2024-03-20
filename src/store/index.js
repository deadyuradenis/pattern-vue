import { createStore } from 'vuex';

// Modules:
import DataModule from './modules/data';
//

// Plugins:
// import updateScreenWidth from './plugins/updateScreenWidth';
//

export default createStore({
    state: {
        // screenWidth: window.innerWidth,
    },
    mutations: {
    },
    getters: {
    },
    modules: {
        data: DataModule,
    },
    plugins: [
        // updateScreenWidth,
    ],
});
