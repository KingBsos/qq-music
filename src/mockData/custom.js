import { mock, Random } from 'mockjs';

const albumsData = mock({
  'data|10': [
    {
      'id': '@GUID',
      'name': '@STRING(3, 7)'
    }
  ]
}).data;

Random.extend({
  customAlbum() {
    return this.pick(albumsData);
  }
});