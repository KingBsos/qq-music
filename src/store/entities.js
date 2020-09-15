import { stateHelper, mutationsHelper } from '../utils';

const initArr = ['songSheet', 'song', 'album', 'video', 'anchorStation'];
function add(i, state, { cover, data, normalized }) {
    let dataObj = {};
    if(normalized) {
        if (data.byId) {
            dataObj.byId = { ...data.byId };
            if (data.allIds) dataObj.allIds = [...data.allIds];
            else dataObj.allIds = [...Object.keys(data.byId)];
        } else {
            dataObj.byId = { ...data };
            dataObj.allIds = [...Object.keys(data)];
        }
    } else {
        dataObj = [].concat(data).map(item => ({
            [item.id]: {...item}
        }));
        dataObj = {
            byId: dataObj, allIds: Object.keys(dataObj)
        }
    }
    if (cover) {
        state[i] = dataObj;
    } else {
            state[i].byId = { ...state[i].byId, ...dataObj.byId };
            state[i].allIds = [...new Set([...state[i].allIds, ...dataObj.allIds])];
    }
}
function update(i, state, { data }) {
    if (data.byId) {
        state[i].byId = { ...state[i].byId, ...data.byId };
        if (data.allIds) state[i].allIds = [...new Set([...state[i].allIds, ...data.allIds])];
    }
}
function remove(i, state, { data }) {
    data = [].concat(data);
    let byIdObj = { ...state[i].byId };
    data.forEach(item => delete byIdObj[item]);
    state[i].byId = byIdObj;
    state[i].allIds = state[i].allIds.filter(item => !data.includes(item));
}
const entities = {
    namespaced: true,
    state() {
        return {
            ...stateHelper(initArr, () => ({ byId: {}, allIds: [] }))
        }
    },
    getters: {

    },
    mutations: {
        ...mutationsHelper(initArr, { add, update, remove })
    },
    actions: {

    }
}

export default entities;