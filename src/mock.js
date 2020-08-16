import Mock from 'mockjs';

import music1 from './assets/music/花澤香菜 - 恋爱サーキュレーション -Instrumental-.mp3';
import music2 from './assets/music/花澤香菜 - 心生七面 善恶难辨.mp3';
import music3 from './assets/music/花たん - 心做し.mp3';
import music4 from './assets/music/a_hisa - Town of Windmill.mp3';
import music5 from './assets/music/DAOKO,米津玄師 - 打上花火.mp3';
import music6 from './assets/music/EpicMusicVn - Last Reunion.mp3';
import music7 from './assets/music/Jack Stauber - buttercup.mp3';
import music8 from './assets/music/Kayaz - Sansa Lala.mp3';
import music9 from './assets/music/milet - Drown.mp3';
import music10 from './assets/music/supercell - 君の知らない物語.mp3';
import music11 from './assets/music/さユり - ミカヅキ -street弾き語りver.-.mp3';

Mock.mock(/music/, [
    {
        name: '花澤香菜 - 恋爱サーキュレーション -Instrumental-',
        url: music1,
        poster: '@dataImage(50x50)',
        singer: Mock.mock('@name'),
        album: '@string(5, 20)',
        like: true
    },
    {
        name: '花澤香菜 - 心生七面 善恶难辨',
        url: music2,
        poster: '@dataImage(50x50)',
        singer: Mock.mock('@name'),
        album: '@string(5, 20)',
        like: true
    },
    {
        name: '花たん - 心做し',
        url: music3,
        poster: '@dataImage(50x50)',
        singer: Mock.mock('@name'),
        album: '@string(5, 20)',
        like: true
    },
    {
        name: 'a_hisa - Town of Windmill',
        url: music4,
        poster: '@dataImage(50x50)',
        singer: Mock.mock('@name'),
        album: '@string(5, 20)',
        like: true
    },
    {
        name: 'DAOKO,米津玄師 - 打上花火',
        url: music5,
        poster: '@dataImage(50x50)',
        singer: Mock.mock('@name'),
        album: '@string(5, 20)',
        like: true
    },
    {
        name: 'EpicMusicVn - Last Reunion',
        url: music6,
        poster: '@dataImage(50x50)',
        singer: Mock.mock('@name'),
        album: '@string(5, 20)',
        like: true
    },
    {
        name: 'Jack Stauber - buttercup',
        url: music7,
        poster: '@dataImage(50x50)',
        singer: Mock.mock('@name'),
        album: '@string(5, 20)',
        like: true
    },
    {
        name: 'Kayaz - Sansa Lala',
        url: music8,
        poster: '@dataImage(50x50)',
        singer: Mock.mock('@name'),
        album: '@string(5, 20)',
        like: true
    },
    {
        name: 'milet - Drown',
        url: music9,
        poster: '@dataImage(50x50)',
        singer: Mock.mock('@name'),
        album: '@string(5, 20)',
        like: true
    },
    {
        name: 'supercell - 君の知らない物語',
        url: music10,
        poster: '@dataImage(50x50)',
        singer: Mock.mock('@name'),
        album: '@string(5, 20)',
        like: true
    },
    {
        name: 'さユり - ミカヅキ -street弾き語りver',
        url: music11,
        poster: '@dataImage(50x50)',
        singer: Mock.mock('@name'),
        album: '@string(5, 20)',
        like: true
    }
]);