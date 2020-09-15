import { stateHelper, mutationsHelper } from '../utils';
import axios from 'axios';
import { normalize, schema } from 'normalizr';

function add(i, state, { cover, data }) {
  if (cover) {
    state[i] = [].concat(data);
  } else {
    state[i] = [...new Set(state[i].concat(data))];
  }
}
function remove(i, state, { data }) {
  let arr = [].concat(data);
  state[i] = state[i].filter(item => {
    return !arr.includes(item);
  })
}
const initArr = ['song', 'songSheet', 'album', 'anchorStation', 'video'];
const iLikeData = {
  namespaced: true,
  state() {
    return {
      ...stateHelper(initArr, () => [], { suffix: 's' })
    }
  },
  mutations: {
    ...mutationsHelper(initArr, { add, remove }, { suffix: 's' })
  },
  actions: {
    fetchSong({ commit }) {
      return axios('/music').then(result => result.data).then(data => {
        let album = new schema.Entity('albums');
        let song = new schema.Entity('songs', { album });
        let { result, entities: { songs, albums } } = normalize(data, [song]);
        commit('addSong', { cover: true, data: result });
        commit('entities/addSong', { data: { byId: songs, allIds: result }, normalized: true }, { root: true });
        commit('entities/addAlbum', { data: albums, normalized: true }, { root: true });
      });
    }
  }
}

export default iLikeData;