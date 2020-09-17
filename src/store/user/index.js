import axios from 'axios';
import iLikeData from './iLikeData';

const user = {
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
          axios.get(url).then(({ data }) => {
              commit('changeLogged', true, { root: true });
              commit('loadBasicData', data);
          });
      },
      getLikeSong({ commit }) {
          axios.get('/data/likesong').then(({ data }) => {
              commit('loadLikeSong', data);
          });
      }
  },
  modules: {
      iLikeData
  }
}

export default user;