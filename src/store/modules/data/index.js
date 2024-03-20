import state from './state';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

const data = {
    namespaced: true,
    state:      state,
    mutations:  mutations,
    actions:    actions,
    getters:    getters,
}

export default data;
