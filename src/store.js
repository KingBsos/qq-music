import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { PLAY_TYPE } from './constant-poll.js';
import pic from './assets/pic/0a8b265911c1171246ee645fae735f7d.png';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        logged: true,
        playing: false,
        ended: false,
        playType: PLAY_TYPE.RANDOM,
        currentSongSheet: [],
        currentSongIndex: undefined
    },
    getters: {
        currentSong({ currentSongSheet, currentSongIndex}) {
            let result = currentSongSheet[currentSongIndex];
            if(result) return {...result};
            else return {
                name: 'QQ音乐',
                poster: pic
            };
        }
    },
    mutations: {
        changeLogged(state, payload) {
            state.logged = payload;
        },
        changePlaying(state, bool) {
            state.playing = bool;
        },
        changeEnded(state, bool) {
            state.ended = bool;
        },
        changePlayType(state, type) {
            state.playType = type;
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