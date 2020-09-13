
const initEntity = () => ({byId: {}, allIds: []});
const entities = {
    state() {
        return {
            songSheet: initEntity(),
            song: initEntity(),
            album: initEntity(),
            video: initEntity(),
            anchorStation: initEntity()
        }
    },
    getters: {

    },
    mutations: {

    },
    actions: {

    }
}

export default entities;