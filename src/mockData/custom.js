import { mock, Random } from 'mockjs';

const customData = mock({
  'album|10': [
    {
      'id': '@GUID',
      'name': '@STRING(3, 7)'
    }
  ],
  'tag': ['独家', '数字专辑', '视频', '自制']
});

Random.extend({
  customAlbum() {
    return this.pick(customData.album);
  },
  customTag() {
    return this.pick(customData.tag);
  }
});