import axios from 'axios';

import iLikeData from './iLikeData';

const user = {
  namespaced: true,
  state: () => ({
      name: 'KingBsos',
      headPortrait: ''
  }),
  mutations: {
      loadBasicData(state, payload, rootState) {
          rootState.logged = true;
          Object.assign(state, payload);
      }
  },
  actions: {
      login({ commit }, url) {
          axios.get(url).then(({ data }) => {
              commit('changeLogged', true, { root: true });
              commit('loadBasicData', data);
          });
      }
  },
  modules: {
      iLikeData
  }
}

export default user;