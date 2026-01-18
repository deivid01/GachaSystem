import { Character } from '../types';

// Usar uma imagem padrão para personagens sem imagem específica
const DEFAULT_4STAR_IMAGE = '/public/images/bennett.jpg';
const DEFAULT_5STAR_IMAGE = '/public/images/mona.jpg';

export const fourStarCharacters: Character[] = [
    { id: 'amber', name: 'Amber', rarity: 4, image: '/public/images/amber.jpg' },
    { id: 'bennett', name: 'Bennett', rarity: 4, image: '/public/images/bennett.jpg' },
    { id: 'fischl', name: 'Fischl', rarity: 4, image: '/public/images/fischl.jpg' },
    { id: 'diona', name: 'Diona', rarity: 4, image: '/public/images/diona.jpg' },
    { id: 'barbara', name: 'Barbara', rarity: 4, image: '/public/images/barbara.jpg' },
    { id: 'kujou-sara', name: 'Kujou Sara', rarity: 4, image: '/public/images/kujousara.jpg' },
    { id: 'lisa', name: 'Lisa', rarity: 4, image: '/public/images/lisa.jpg' },
    { id: 'ningguang', name: 'Ningguang', rarity: 4, image: '/public/images/ningguang.jpg' },
    { id: 'rosaria', name: 'Rosaria', rarity: 4, image: '/public/images/rosaria.jpg' },
    { id: 'razor', name: 'Razor', rarity: 4, image: '/public/images/razor.jpg' },

    // Personagens sem imagem específica usam fallback
    { id: 'thoma', name: 'Thoma', rarity: 4, image: DEFAULT_4STAR_IMAGE },
    { id: 'yanfei', name: 'Yanfei', rarity: 4, image: DEFAULT_4STAR_IMAGE },
    { id: 'candace', name: 'Candace', rarity: 4, image: DEFAULT_4STAR_IMAGE },
    { id: 'mika', name: 'Mika', rarity: 4, image: DEFAULT_4STAR_IMAGE },
    { id: 'sucrose', name: 'Sucrose', rarity: 4, image: DEFAULT_4STAR_IMAGE },
    { id: 'chongyun', name: 'Chongyun', rarity: 4, image: DEFAULT_4STAR_IMAGE },
    { id: 'shenhe', name: 'Shenhe', rarity: 4, image: DEFAULT_4STAR_IMAGE },
    { id: 'heizou', name: 'Shikanoin Heizou', rarity: 4, image: DEFAULT_4STAR_IMAGE },
    { id: 'noelle', name: 'Noelle', rarity: 4, image: DEFAULT_4STAR_IMAGE },
    { id: 'sayu', name: 'Sayu', rarity: 4, image: DEFAULT_4STAR_IMAGE },
    { id: 'beidou', name: 'Beidou', rarity: 4, image: DEFAULT_4STAR_IMAGE },
    { id: 'yun-jin', name: 'Yun Jin', rarity: 4, image: DEFAULT_4STAR_IMAGE },
    { id: 'collei', name: 'Collei', rarity: 4, image: DEFAULT_4STAR_IMAGE },
    { id: 'faruzan', name: 'Faruzan', rarity: 4, image: DEFAULT_4STAR_IMAGE },
    { id: 'layla', name: 'Layla', rarity: 4, image: DEFAULT_4STAR_IMAGE },
];

export const fiveStarCharacters: Character[] = [
    { id: 'raiden', name: 'Raiden Shogun', rarity: 5, image: '/public/images/raiden.jpg' },
    { id: 'ayaka', name: 'Kamisato Ayaka', rarity: 5, image: '/public/images/ayaka.jpg' },
    { id: 'diluc', name: 'Diluc', rarity: 5, image: '/public/images/diluc.jpg' },
    { id: 'mona', name: 'Mona', rarity: 5, image: '/public/images/mona.jpg' },
    { id: 'itto', name: 'Arataki Itto', rarity: 5, image: '/public/images/itto.jpg' },
    { id: 'eula', name: 'Eula', rarity: 5, image: '/public/images/eula.jpg' },
    { id: 'hutao', name: 'Hu Tao', rarity: 5, image: '/public/images/hutao.jpg' },
    { id: 'ganyu', name: 'Ganyu', rarity: 5, image: '/public/images/ganyu.jpg' },
    { id: 'kazuha', name: 'Kaedehara Kazuha', rarity: 5, image: '/public/images/kazuha.jpg' },
    { id: 'yae', name: 'Yae Miko', rarity: 5, image: '/public/images/yae.jpg' },

    // Personagens sem imagem específica usam fallback
    { id: 'ayato', name: 'Kamisato Ayato', rarity: 5, image: DEFAULT_5STAR_IMAGE },
    { id: 'kokomi', name: 'Sangonomiya Kokomi', rarity: 5, image: DEFAULT_5STAR_IMAGE },
    { id: 'yelan', name: 'Yelan', rarity: 5, image: DEFAULT_5STAR_IMAGE },
    { id: 'furina', name: 'Furina', rarity: 5, image: DEFAULT_5STAR_IMAGE },
    { id: 'neuvillette', name: 'Neuvillette', rarity: 5, image: DEFAULT_5STAR_IMAGE },
    { id: 'clorinde', name: 'Clorinde', rarity: 5, image: DEFAULT_5STAR_IMAGE },
    { id: 'venti', name: 'Venti', rarity: 5, image: DEFAULT_5STAR_IMAGE },
    { id: 'xiao', name: 'Xiao', rarity: 5, image: DEFAULT_5STAR_IMAGE },
    { id: 'wanderer', name: 'Wanderer', rarity: 5, image: DEFAULT_5STAR_IMAGE },
    { id: 'alhaitham', name: 'Alhaitham', rarity: 5, image: DEFAULT_5STAR_IMAGE },
    { id: 'zhongli', name: 'Zhongli', rarity: 5, image: DEFAULT_5STAR_IMAGE },
    { id: 'baizhu', name: 'Baizhu', rarity: 5, image: DEFAULT_5STAR_IMAGE },
    { id: 'nahida', name: 'Nahida', rarity: 5, image: DEFAULT_5STAR_IMAGE },
    { id: 'tighnari', name: 'Tighnari', rarity: 5, image: DEFAULT_5STAR_IMAGE },
    { id: 'dehya', name: 'Dehya', rarity: 5, image: DEFAULT_5STAR_IMAGE },
    { id: 'jean', name: 'Jean', rarity: 5, image: DEFAULT_5STAR_IMAGE },
    { id: 'keqing', name: 'Keqing', rarity: 5, image: DEFAULT_5STAR_IMAGE },
    { id: 'qiqi', name: 'Qiqi', rarity: 5, image: DEFAULT_5STAR_IMAGE },
    { id: 'lyney', name: 'Lyney', rarity: 5, image: DEFAULT_5STAR_IMAGE },
];

export const allCharacters: Character[] = [...fourStarCharacters, ...fiveStarCharacters];
