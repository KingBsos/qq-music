import Vue from 'vue';
import Vuex from 'vuex';
import { PLAY_TYPE } from '../constants';
import pic from '../assets/pic/0a8b265911c1171246ee645fae735f7d.png';
import entities from './entities';
import user from './user';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        logged: true,
        playing: false,
        playType: PLAY_TYPE.RANDOM,
        currentSongSheet: [],
        currentSongIndex: undefined
    },
    getters: {
        currentSong({ currentSongSheet, currentSongIndex }) {
            let result = currentSongSheet[currentSongIndex];
            if (result) return { ...result };
            else return {
                id: 0,
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
        changePlayType(state, type) {
            state.playType = type;
        },
        loadCurrentSongSheet(state, payload) {
            state.currentSongSheet = payload;
        },
        loadCurrentSongIndex(state, index) {
            state.currentSongIndex = index;
        },
        randomPlay(state) {
            let index;
            do {
                index = Math.round(Math.random() * (state.currentSongSheet.length - 1));
            } while (index === state.currentSongIndex);
            state.currentSongIndex = index;
        }
    },
    actions: {

    },
    modules: {
        entities, user
    }
});

export default store;