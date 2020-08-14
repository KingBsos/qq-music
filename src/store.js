import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        logged: true,
        playing: false,
        currentSongSheet: [],
        currentSongIndex: undefined
    },
    getters: {
        currentSong({ currentSongSheet, currentSongIndex}) {
            let result = currentSongSheet[currentSongIndex];
            if(result) return result;
            else return {};
        }
    },
    mutations: {
        changeLogged(state, payload) {
            state.logged = payload;
        },
        changePlaying(state, bool) {
            state.playing = bool;
        },
        loadCurrentSongSheet(state, payload) {
            state.currentSongSheet = payload;
        },
        loadCurrentSongIndex(state, index) {
            state.currentSongIndex = index;
        }
    },
    modules: {
        user: {
            namespaced: true,
            state: () => ({
                name: 'KingBsos',
                headPortrait: '',
                likeSongSheet: null
            }),
            mutations: {
                loadBasicData(state, payload, rootState) {
                    rootState.logged = true;
                    Object.assign(state, payload);
                },
                loadLikeSong(state, payload) {
                    state.likeSongSheet = [...payload];
                }
            },
            actions: {
                login({ commit }, url) {
                    axios.get(url).then(({data}) => {
                        commit('changeLogged', true, {root: true});
                        commit('loadBasicData', data);
                    });
                },
                getLikeSong({ commit }, url) {
                    axios.get(url).then(({ data }) => {
                        commit('loadLikeSong', data);
                    });
                }
            }
        }
    }
});

export default store;