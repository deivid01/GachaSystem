import { Character } from '../types';

export const fourStarCharacters: Character[] = [
    { id: 'bennett', name: 'Bennett', rarity: 4, image: '/public/images/bennett.jpg' },
    { id: 'razor', name: 'Razor', rarity: 4, image: '/public/images/razor.jpg' },
    { id: 'fischl', name: 'Fischl', rarity: 4, image: '/public/images/fischl.jpg' },
    { id: 'amber', name: 'Amber', rarity: 4, image: '/public/images/amber.jpg' },
    { id: 'barbara', name: 'Barbara', rarity: 4, image: '/public/images/barbara.jpg' },
    { id: 'diona', name: 'Diona', rarity: 4, image: '/public/images/diona.jpg' },
    { id: 'kujou-sara', name: 'Kujou Sara', rarity: 4, image: '/public/images/kujousara.jpg' },
    { id: 'lisa', name: 'Lisa', rarity: 4, image: '/public/images/lisa.jpg' },
    { id: 'ningguang', name: 'Ningguang', rarity: 4, image: '/public/images/ningguang.jpg' },
    { id: 'rosaria', name: 'Rosaria', rarity: 4, image: '/public/images/rosaria.jpg' },
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
];

export const allCharacters: Character[] = [...fourStarCharacters, ...fiveStarCharacters];
