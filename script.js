const REGIONS = {
  europe: [
    { name: 'Кавказ', ids: ['GEO', 'ARM', 'AZE'], key: 'caucasus' },
    { name: 'Пиренейский полуостров', ids: ['ESP', 'PRT', 'AND'], key: 'iberia' },
    { name: 'Центральная Европа', ids: ['FRA', 'CHE', 'ITA', 'DEU'], key: 'central' },
    { name: 'Славяне', ids: ['POL', 'UKR', 'MDA', 'SVK'], key: 'slavs' },
    { name: 'Скандинавы', ids: ['NOR', 'FIN', 'SWE'], key: 'scandinavia' },
    { name: 'Балканы', ids: ['GRC', 'SRB', 'BGR', 'MNE', 'MKD', 'ALB'], key: 'balkans' }
  ],
  asia: [
    { name: 'Восточная Азия', ids: ['CHN', 'KOR', 'JPN'], key: 'east-asia' },
    { name: 'Арабы', ids: ['SAU', 'ARE', 'OMN', 'JOR', 'IRQ'], key: 'arab-world' },
    { name: 'Юго-Восточная Азия', ids: ['THA', 'IDN', 'MYS', 'SGP', 'VNM', 'PHL'], key: 'southeast-asia' }
  ]
};

const COUNTRIES = {
  GEO: { name: 'Грузия', photo: 'georgia.jpg', flag: '🇬🇪', summary: 'Горы, долины и гостеприимство, которое остаётся в памяти.', fact: 'На небольшой территории встречаются заснеженные вершины Кавказа, старые города и черноморское побережье.' },
  ARM: { name: 'Армения', photo: 'armenia.jpg', flag: '🇦🇲', summary: 'Камень, солнце и многовековая история.', fact: 'Армения известна древними монастырями, горными ландшафтами, виноградниками и видом на Арарат.' },
  AZE: { name: 'Азербайджан', photo: 'azerbaijan.jpg', flag: '🇦🇿', summary: 'Город ветров и пейзажи у Каспийского моря.', fact: 'От старого Баку до горных деревень и полупустынь — здесь рядом существуют разные природные и городские миры.' },
  ESP: { name: 'Испания', photo: 'spain.jpg', flag: '🇪🇸', summary: 'Южный свет, архитектура и энергия улиц.', fact: 'Пиренеи, атлантический берег, Средиземное море и города с многослойной историей делают каждое путешествие разным.' },
  PRT: { name: 'Португалия', photo: 'portugal.jpg', flag: '🇵🇹', summary: 'Океанский воздух и города на холмах.', fact: 'Лиссабон, старые кварталы, плитка азулежу и Атлантика задают Португалии особенный ритм.' },
  AND: { name: 'Андорра', photo: 'andorra.jpg', summary: 'Горные долины и маленькие города среди Пиренеев.', fact: 'Андорра расположена между Испанией и Францией: здесь высокогорные тропы, каменные деревни и столица Андорра-ла-Велья.' },
  FRA: { name: 'Франция', photo: 'france.jpg', flag: '🇫🇷', summary: 'От шумных бульваров до тихих долин.', fact: 'Франция соединяет искусство, альпийские маршруты, виноградные регионы и побережья двух морей.' },
  CHE: { name: 'Швейцария', photo: 'switzerland.jpg', flag: '🇨🇭', summary: 'Горные озёра и дороги сквозь Альпы.', fact: 'Здесь на небольшом расстоянии меняются языки, города и пейзажи, а поезда проходят через высокогорные долины.' },
  ITA: { name: 'Италия', photo: 'italy.jpg', flag: '🇮🇹', summary: 'История и повседневная жизнь на одном маршруте.', fact: 'Античные улицы, Альпы, приморские города и острова складываются в удивительно разнообразную карту Италии.' },
  DEU: { name: 'Германия', photo: 'germany.jpg', flag: '🇩🇪', summary: 'От северных портов до предгорий Альп.', fact: 'У городов Германии свой характер, а между ними лежат леса, речные долины, замки и винные дороги.' },
  POL: { name: 'Польша', photo: 'poland.jpg', summary: 'Старинные города, леса и горные тропы.', fact: 'От Балтийского побережья до Татр Польша меняет ритм: средневековые площади уступают место озёрам, лесам и вершинам.' },
  UKR: { name: 'Украина', photo: 'ukraine.jpg', summary: 'Просторные ландшафты и города с сильным характером.', fact: 'Карпаты, старые улицы Львова, берега Днепра и степные горизонты складываются в разнообразную географию Украины.' },
  MDA: { name: 'Молдова', photo: 'moldova.jpg', summary: 'Мягкие холмы и тихие виноградные долины.', fact: 'В Молдове сельские пейзажи, виноградники и старые монастыри соседствуют с улицами Кишинёва.' },
  SVK: { name: 'Словакия', photo: 'slovakia.jpg', summary: 'Татры, замки и города на берегах Дуная.', fact: 'От Братиславы до Высоких Татр Словакия соединяет старые города, карпатские вершины и лесные долины.' },
  NOR: { name: 'Норвегия', photo: 'norway.jpg', summary: 'Фьорды, северный свет и дороги вдоль моря.', fact: 'Норвежское побережье изрезано фьордами; от прибрежных городов путь уходит к горам, ледникам и северным островам.' },
  FIN: { name: 'Финляндия', photo: 'finland.jpg', summary: 'Озёра и леса, в которых легко замедлиться.', fact: 'Тысячи озёр, хвойные леса, северная Лапландия и приморский Хельсинки задают стране спокойный ритм.' },
  SWE: { name: 'Швеция', photo: 'sweden.jpg', summary: 'Архипелаги, северные леса и города у воды.', fact: 'Шведские острова, озёра и лесные дороги ведут от южных городов к северным просторам.' },
  GRC: { name: 'Греция', photo: 'greece.jpg', summary: 'Белый камень, острова и море на горизонте.', fact: 'Античные памятники, горные деревни и сотни островов создают путешествие между историей и Эгейским морем.' },
  SRB: { name: 'Сербия', photo: 'serbia.jpg', summary: 'Речные города и зелёные балканские холмы.', fact: 'Белград стоит у слияния Савы и Дуная, а за городом начинаются монастыри, ущелья и горные маршруты.' },
  BGR: { name: 'Болгария', photo: 'bulgaria.jpg', summary: 'Горы, старые города и черноморский берег.', fact: 'Рильские горы, исторические кварталы и побережье Чёрного моря показывают разные стороны Болгарии.' },
  MNE: { name: 'Черногория', photo: 'montenegro.jpg', summary: 'Горы подступают вплотную к Адриатике.', fact: 'Которский залив, каменные улицы и горные национальные парки делают короткие расстояния удивительно насыщенными.' },
  MKD: { name: 'Северная Македония', photo: 'north-macedonia.jpg', summary: 'Озёра и горы в сердце Балкан.', fact: 'Охридское озеро, старые монастыри и горные долины открывают страну за пределами её столицы Скопье.' },
  ALB: { name: 'Албания', photo: 'albania.jpg', summary: 'Горные перевалы и бирюзовое Адриатическое море.', fact: 'Албанские Альпы, каменные кварталы Берата и морское побережье складываются в яркий балканский маршрут.' },
  CHN: { name: 'Китай', photo: 'china.jpg', flag: '🇨🇳', summary: 'Огромная страна с множеством разных пейзажей.', fact: 'Горные цепи, древние города и современные мегаполисы открывают разные стороны многовековой культуры.' },
  KOR: { name: 'Южная Корея', photo: 'south-korea.jpg', flag: '🇰🇷', summary: 'Старинные дворцы в ритме нового времени.', fact: 'В Сеуле, горных национальных парках и на острове Чеджу древние традиции соседствуют с современной жизнью.' },
  JPN: { name: 'Япония', photo: 'japan.jpg', flag: '🇯🇵', summary: 'Тишина сада и энергия большого города.', fact: 'От Фудзи и старых храмов до неоновых улиц — сезоны и традиции задают Японии особый ритм.' },
  SAU: { name: 'Саудовская Аравия', photo: 'saudi-arabia.jpg', summary: 'Песчаные пространства и скалы древней Аль-Улы.', fact: 'От Красного моря до пустыни Руб-эль-Хали страна соединяет исторические оазисы, горы и быстро меняющиеся города.' },
  ARE: { name: 'ОАЭ', photo: 'uae.jpg', summary: 'Городские силуэты на берегу Персидского залива.', fact: 'Дубай и Абу-Даби известны современной архитектурой, а за городами начинаются дюны, горы и мангровые заросли.' },
  OMN: { name: 'Оман', photo: 'oman.jpg', summary: 'Каньоны, оазисы и побережье Аравийского моря.', fact: 'Вади, горные дороги и старые порты делают Оман одним из самых разнообразных ландшафтов Аравийского полуострова.' },
  JOR: { name: 'Иордания', photo: 'jordan.jpg', summary: 'Розовые скалы Петры и простор пустыни.', fact: 'Петра, Вади-Рам и берега Мёртвого моря показывают разные стороны Иордании на коротком маршруте.' },
  IRQ: { name: 'Ирак', photo: 'iraq.jpg', summary: 'Древние города между Тигром и Евфратом.', fact: 'Багдад, цитадель Эрбиля и южные болотные земли напоминают о долгой истории региона и его разных природных зонах.' },
  THA: { name: 'Таиланд', photo: 'thailand.jpg', summary: 'Острова, храмы и тропические берега.', fact: 'От шумного Бангкока до известняковых скал и северных гор пейзажи Таиланда меняются вместе с ритмом путешествия.' },
  IDN: { name: 'Индонезия', photo: 'indonesia.jpg', summary: 'Острова, вулканы и зелёные рисовые террасы.', fact: 'Огромный архипелаг объединяет разные культуры и ландшафты: от Явы и Бали до островов восточной части страны.' },
  MYS: { name: 'Малайзия', photo: 'malaysia.jpg', summary: 'Тропические леса и горные плато.', fact: 'На полуострове и острове Борнео соседствуют мегаполисы, чайные холмы, дождевые леса и морское побережье.' },
  SGP: { name: 'Сингапур', photo: 'singapore.jpg', summary: 'Сады и городские огни у экватора.', fact: 'На небольшом острове рядом существуют зелёные парки, исторические кварталы, современная архитектура и оживлённая гавань.' },
  VNM: { name: 'Вьетнам', photo: 'vietnam.jpg', summary: 'Известняковые острова и рисовые долины.', fact: 'От северной бухты Халонг до южной дельты Меконга Вьетнам раскрывается через воду, горы и живые города.' },
  PHL: { name: 'Филиппины', photo: 'philippines.jpg', summary: 'Бирюзовые бухты и тысячи островов.', fact: 'Палаван, вулканические ландшафты и оживлённая Манила показывают островную страну с очень разным характером.' }
};

const PHOTO_SOURCE = {
  GEO: 'The Greater Caucasus Mountains in Georgia.jpg',
  ARM: 'Khor Virap Monastery and Mount Ararat, Armenia.jpg',
  AZE: 'Baku banner Old City panorama.jpg',
  ESP: 'Alhambra evening panorama Mirador San Nicolas sRGB-1.jpg',
  PRT: 'Panorama with Nossa Senhora da Penha de França Convent at sunrise, Lisbon, Portugal julesvernex2.jpg',
  AND: 'Andorra2008.JPG',
  FRA: 'Panorama of Paris city from Montmartre.jpg',
  CHE: 'Landscape Arnisee-region.JPG',
  ITA: 'Amalfi Coast, Italy Panoramic.jpg',
  DEU: 'Neuschwanstein Castle 2024-02.jpg',
  POL: 'Winter in Tatry Mountains - Poland.jpg',
  UKR: 'Морозний ранок над Яремчею.jpg',
  MDA: 'Orhei Vechi 08.JPG',
  SVK: 'Strbske Pleso - Mountains 2.jpg',
  NOR: 'Geirangerfjord from Ørnesvingen, 2013 June.jpg',
  FIN: 'Bisajärvi in evening light from the southwest in Sipoonkorpi, Vantaa, Finland, 2021 May.jpg',
  SWE: 'Typhical landscape of Stockholm archipelago, Fjärdlång, Stockholm (Sweden) - panoramio.jpg',
  GRC: 'Santorin (GR), Ia -- 2017 -- 2698.jpg',
  SRB: 'Nacionalni Park Tara - NP04.jpg',
  BGR: 'Chepino Valley Landscape.jpg',
  MNE: 'Kotor and Boka kotorska - view from city wall.jpg',
  MKD: 'Vista de Ohrid, Macedonia, 2014-04-17, DD 52.JPG',
  ALB: '2024-10-14 Valbona Valley 5.jpg',
  CHN: 'Landscape - Great Wall of China at Jiankou.jpg',
  KOR: 'Panoramic view of Hyangwonjeong Pavilion in its pond at Gyeongbokgung Palace with blue sky in Seoul.jpg',
  JPN: 'Mount Fuji and Fog over Lake Yamanaka.jpg',
  SAU: 'Landscape at al-Ula, Saudi Arabia (1).jpg',
  ARE: 'Dubai skyline unsplash.jpg',
  OMN: 'Wadi Shab, Oman.jpg',
  JOR: 'Al-Khazneh (The Treasury) 2, Petra, Jordan.jpg',
  IRQ: 'Panorama view of the Erbil Citadel, Erbil Governorate, Iraqi Kurdistan.jpg',
  THA: 'Playa Maya, Ko Phi Phi, Tailandia, 2013-08-19, DD 13.JPG',
  IDN: 'Rice terraces, Ubud, Bali.jpg',
  MYS: 'Cameron Bharat Tea Plantation, Cameron Highlands, Malaysia, 20250829 1432 4034.jpg',
  SGP: 'Gardens by the Bay, Marina Bay, Singapur, 2023-08-19, DD 14-16 HDR.jpg',
  VNM: 'Hạ Long Bay Panorama, Vietnam.jpg',
  PHL: 'El Nido Bay, Island lagoon, Tropical lagoon, Palawan, Philippines.jpg'
};
const FLAG_CODE = { GEO:'ge', ARM:'am', AZE:'az', ESP:'es', PRT:'pt', AND:'ad', FRA:'fr', CHE:'ch', ITA:'it', DEU:'de', POL:'pl', UKR:'ua', MDA:'md', SVK:'sk', NOR:'no', FIN:'fi', SWE:'se', GRC:'gr', SRB:'rs', BGR:'bg', MNE:'me', MKD:'mk', ALB:'al', CHN:'cn', KOR:'kr', JPN:'jp', SAU:'sa', ARE:'ae', OMN:'om', JOR:'jo', IRQ:'iq', THA:'th', IDN:'id', MYS:'my', SGP:'sg', VNM:'vn', PHL:'ph' };

const CONTINENT_VIEW = {
  europe: [1620, 130, 930, 550],
  asia: [1960, 40, 1700, 850]
};
const WORLD_VIEW = [1500, 80, 2100, 850];
const REGION_FOCUS = {
  caucasus: [39, 36, 52, 45],
  iberia: [-12, 34, 6, 46],
  central: [-12, 35, 20, 57],
  slavs: [13, 44, 42, 56],
  scandinavia: [3, 54, 33, 72],
  balkans: [18, 34, 30, 47],
  'east-asia': [72, 14, 148, 56],
  'arab-world': [33, 12, 64, 38],
  'southeast-asia': [92, -12, 143, 25]
};
// Coordinates from Natural Earth's populated places layer (Admin-0 capitals).
const CAPITALS = {
  GEO: { name: 'Тбилиси', point: [44.78885, 41.726956], side: 'left', shift: -16 },
  ARM: { name: 'Ереван', point: [44.511606, 40.183097], side: 'left', shift: 16 },
  AZE: { name: 'Баку', point: [49.860271, 40.397218], side: 'right' },
  ESP: { name: 'Мадрид', point: [-3.685297, 40.401972], side: 'right' },
  PRT: { name: 'Лиссабон', point: [-9.146812, 38.724669], side: 'left' },
  AND: { name: 'Андорра-ла-Велья', point: [1.52109, 42.50779], side: 'right' },
  FRA: { name: 'Париж', point: [2.352992, 48.858092], side: 'left' },
  CHE: { name: 'Берн', point: [7.466976, 46.916683], side: 'right' },
  ITA: { name: 'Рим', point: [12.481313, 41.897902], side: 'right' },
  DEU: { name: 'Берлин', point: [13.399603, 52.523764], side: 'right' },
  POL: { name: 'Варшава', point: [21.005347, 52.230872], side: 'left' },
  UKR: { name: 'Киев', point: [30.514682, 50.435313], side: 'right' },
  MDA: { name: 'Кишинёв', point: [28.857711, 47.005024], side: 'left' },
  SVK: { name: 'Братислава', point: [17.146572, 48.134041], side: 'right' },
  NOR: { name: 'Осло', point: [10.748033, 59.918636], side: 'left' },
  FIN: { name: 'Хельсинки', point: [24.932457, 60.163804], side: 'right' },
  SWE: { name: 'Стокгольм', point: [18.0663, 59.324127], side: 'left' },
  GRC: { name: 'Афины', point: [23.731375, 37.985272], side: 'left' },
  SRB: { name: 'Белград', point: [20.466045, 44.820591], side: 'left' },
  BGR: { name: 'София', point: [23.314708, 42.685295], side: 'right' },
  MNE: { name: 'Подгорица', point: [19.266307, 42.465972], side: 'left' },
  MKD: { name: 'Скопье', point: [21.433461, 42.000006], side: 'right', shift: 18 },
  ALB: { name: 'Тирана', point: [19.809132, 41.370934], side: 'left', shift: 18 },
  CHN: { name: 'Пекин', point: [116.394201, 39.90172], side: 'left' },
  KOR: { name: 'Сеул', point: [126.997785, 37.568295], side: 'right' },
  JPN: { name: 'Токио', point: [139.749462, 35.686963], side: 'right' },
  SAU: { name: 'Эр-Рияд', point: [46.720487, 24.634497], side: 'left' },
  ARE: { name: 'Абу-Даби', point: [54.366593, 24.466684], side: 'left' },
  OMN: { name: 'Маскат', point: [58.378311, 23.585179], side: 'right' },
  JOR: { name: 'Амман', point: [35.931354, 31.951971], side: 'left' },
  IRQ: { name: 'Багдад', point: [44.391923, 33.340594], side: 'right' },
  THA: { name: 'Бангкок', point: [100.514699, 13.751945], side: 'left' },
  IDN: { name: 'Джакарта', point: [106.827492, -6.172472], side: 'left' },
  MYS: { name: 'Куала-Лумпур', point: [101.688699, 3.139797], side: 'right' },
  SGP: { name: 'Сингапур', point: [103.853875, 1.294979], side: 'right', shift: 18 },
  VNM: { name: 'Ханой', point: [105.848068, 21.035273], side: 'right' },
  PHL: { name: 'Манила', point: [120.980271, 14.606105], side: 'right' }
};
const state = { continent: null, region: null, country: null, hoverRegion: null, hoverCountry: null };
const app = document.getElementById('app');
const worldMap = document.getElementById('mapWorld');
const maps = { europe: worldMap, asia: worldMap };
const selection = document.getElementById('selection');
const selectionList = document.getElementById('selectionList');
const detail = document.getElementById('detail');
let detailCloseTimer = null;
const tooltip = document.createElement('div');
tooltip.className = 'map-tooltip';
tooltip.hidden = true;
document.querySelector('.map-area').append(tooltip);

function project(point) { return [(point[0] + 180) * 10, (90 - point[1]) * 10]; }
function formatCoordinates(lon, lat) {
  const format = (value, positive, negative) => {
    const minutes = Math.round(Math.abs(value) * 60);
    return `${String(Math.floor(minutes / 60)).padStart(2, '0')}° ${String(minutes % 60).padStart(2, '0')}′ ${value < 0 ? negative : positive}`;
  };
  return `${format(lat, 'N', 'S')} · ${format(lon, 'E', 'W')}`;
}
function continentCoordinates(continent) {
  const [x, y, width, height] = CONTINENT_VIEW[continent];
  return formatCoordinates((x + width / 2) / 10 - 180, 90 - (y + height / 2) / 10);
}
function continentAt(event) {
  const point = worldMap.createSVGPoint();
  point.x = event.clientX;
  point.y = event.clientY;
  return point.matrixTransform(worldMap.getScreenCTM().inverse()).x < 2350 ? 'europe' : 'asia';
}
function ringPath(ring) { return ring.map((point, index) => { const [x,y] = project(point); return `${index ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`; }).join('') + 'Z'; }
function geometryPath(geometry) {
  const polygons = geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates;
  return polygons.map(polygon => polygon.map(ringPath).join('')).join('');
}
function featureBounds(feature, focus) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  const visit = value => {
    if (typeof value[0] === 'number') {
      const [lon, lat] = value;
      if (lon < focus[0] || lon > focus[2] || lat < focus[1] || lat > focus[3]) return;
      const [x,y] = project(value);
      minX = Math.min(minX,x); maxX = Math.max(maxX,x);
      minY = Math.min(minY,y); maxY = Math.max(maxY,y);
    }
    else value.forEach(visit);
  };
  visit(feature.geometry.coordinates);
  return [minX,minY,maxX,maxY];
}
function viewForRegion(region) {
  const focus = REGION_FOCUS[region.key];
  const bounds = MAP_DATA.filter(feature => region.ids.includes(feature.id)).map(feature => featureBounds(feature, focus));
  const minX = Math.min(...bounds.map(b => b[0])), minY = Math.min(...bounds.map(b => b[1]));
  const maxX = Math.max(...bounds.map(b => b[2])), maxY = Math.max(...bounds.map(b => b[3]));
  const minWidth = region.ids.includes('CHN') ? 1050 : ['caucasus','balkans'].includes(region.key) ? 270 : 340;
  const width = Math.max((maxX-minX)*1.65, minWidth);
  const height = Math.max((maxY-minY)*1.75, width*.58);
  return [(minX+maxX-width)/2,(minY+maxY-height)/2,width,height];
}
function animateViewBox(svg, target, onComplete) {
  const current = svg.viewBox.baseVal;
  const start = [current.x,current.y,current.width,current.height];
  if (svg._animation) cancelAnimationFrame(svg._animation);
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || start.every((value,index) => Math.abs(value-target[index]) < .01)) {
    svg.setAttribute('viewBox', target.join(' '));
    onComplete?.();
    return;
  }
  const began = performance.now();
  function frame(now) {
    const progress = Math.min((now-began)/1050,1);
    const eased = .5-Math.cos(Math.PI*progress)/2;
    const value = start.map((v,i) => v+(target[i]-v)*eased);
    svg.setAttribute('viewBox',value.join(' '));
    if (progress<1) svg._animation = requestAnimationFrame(frame);
    else { svg._animation = null; onComplete?.(); }
  }
  svg._animation = requestAnimationFrame(frame);
}
function createCapitalMarker(id) {
  const capital = CAPITALS[id];
  const marker = document.createElementNS('http://www.w3.org/2000/svg','g');
  const [x,y] = project(capital.point);
  marker.setAttribute('transform',`translate(${x} ${y})`);
  marker.setAttribute('class','capital-marker');
  marker.setAttribute('role','button');
  marker.setAttribute('aria-label',`${capital.name} — столица страны ${COUNTRIES[id].name}. Открыть страну`);
  marker.setAttribute('aria-hidden','true');
  marker.setAttribute('tabindex','-1');
  marker.dataset.id = id;
  marker.innerHTML = '<circle class="capital-ring"></circle><circle class="capital-dot"></circle><rect class="capital-label-bg"></rect><text class="capital-name"></text>';
  marker.querySelector('.capital-name').textContent = capital.name;
  marker.addEventListener('click',event => { event.stopPropagation(); if (state.region !== null && REGIONS[state.continent][state.region].ids.includes(id)) showCountry(id); });
  marker.addEventListener('mouseenter',() => setHoverCountry(id));
  marker.addEventListener('mouseleave',clearHover);
  marker.addEventListener('focus',() => setHoverCountry(id));
  marker.addEventListener('blur',clearHover);
  return marker;
}
function sizeCapitalMarkers(svg, viewWidth) {
  const rect = svg.getBoundingClientRect();
  const mapRect = document.querySelector('.map-area').getBoundingClientRect();
  const unit = Math.max(viewWidth / Math.max(rect.width,1), svg.viewBox.baseVal.height / Math.max(rect.height,1));
  svg.querySelectorAll('.capital-marker').forEach(marker => {
    const capital = CAPITALS[marker.dataset.id];
    const labelPixels = capital.name.length*6.8+20;
    const labelWidth = labelPixels*unit;
    const position = svg.createSVGPoint();
    [position.x,position.y] = project(capital.point);
    const screenX = position.matrixTransform(svg.getScreenCTM()).x;
    let side = capital.side;
    if (side === 'right' && screenX+labelPixels+21 > mapRect.right) side = 'left';
    else if (side === 'left' && screenX-labelPixels-21 < mapRect.left) side = 'right';
    const x = side === 'left' ? -labelWidth-13*unit : 13*unit;
    const shift = (capital.shift || 0)*unit;
    marker.querySelector('.capital-ring').setAttribute('r',11*unit);
    marker.querySelector('.capital-dot').setAttribute('r',4.5*unit);
    const rect = marker.querySelector('.capital-label-bg');
    rect.setAttribute('x',x); rect.setAttribute('y',(-12*unit)+shift);
    rect.setAttribute('width',labelWidth); rect.setAttribute('height',24*unit);
    const text = marker.querySelector('.capital-name');
    text.setAttribute('x',x+10*unit); text.setAttribute('y',4*unit+shift);
    text.setAttribute('font-size',11*unit);
  });
}
function hideCapitals() {
  document.getElementById('capitalLegend').hidden = true;
  [worldMap].forEach(svg => {
    svg.classList.remove('has-capitals');
    svg.querySelectorAll('.capital-marker').forEach(marker => {
      marker.classList.remove('is-visible','is-emphasized');
      marker.setAttribute('aria-hidden','true');
      marker.setAttribute('tabindex','-1');
    });
  });
}
function showCapitals(svg, region, viewWidth) {
  sizeCapitalMarkers(svg,viewWidth);
  svg.querySelectorAll('.capital-marker').forEach(marker => {
    const visible = region.ids.includes(marker.dataset.id);
    marker.classList.toggle('is-visible',visible);
    marker.style.setProperty('--marker-delay',`${region.ids.indexOf(marker.dataset.id)*75}ms`);
    marker.setAttribute('aria-hidden',String(!visible));
    marker.setAttribute('tabindex',visible ? '0' : '-1');
  });
  svg.classList.add('has-capitals');
  document.getElementById('capitalLegend').hidden = false;
}
function renderMaps() {
    const svg = worldMap;
    svg.setAttribute('viewBox',WORLD_VIEW.join(' '));
    const fragment = document.createDocumentFragment();
    MAP_DATA.forEach(feature => {
      const path = document.createElementNS('http://www.w3.org/2000/svg','path');
      path.setAttribute('d',geometryPath(feature.geometry));
      path.setAttribute('fill-rule','evenodd');
      path.setAttribute('class','country-path');
      path.dataset.id = feature.id;
      path.setAttribute('aria-label',feature.name);
      path.addEventListener('click',event => state.continent ? countryPathClick(feature.id) : chooseContinent(continentAt(event)));
      path.addEventListener('mouseenter',event => countryPathEnter(event,feature.id));
      path.addEventListener('mousemove',moveTooltip);
      path.addEventListener('mouseleave',() => { tooltip.hidden = true; clearHover(); });
      fragment.append(path);
    });
    svg.append(fragment);
    const capitalLayer = document.createElementNS('http://www.w3.org/2000/svg','g');
    capitalLayer.setAttribute('class','capital-layer');
    const ids = Object.values(REGIONS).flatMap(regions => regions.flatMap(region => region.ids));
    ids.forEach(id => capitalLayer.append(createCapitalMarker(id)));
    svg.append(capitalLayer);
}
function setIntro(section,eyebrow,title,description,instruction) {
  document.getElementById('sectionNo').textContent = section;
  document.getElementById('eyebrow').textContent = eyebrow;
  document.getElementById('headline').innerHTML = title;
  document.getElementById('introDescription').textContent = description;
  document.getElementById('instruction').textContent = instruction;
  const content = document.querySelector('.intro-content');
  content.classList.remove('is-changing');
  void content.offsetWidth;
  content.classList.add('is-changing');
}
function updateMapClasses() {
  const region = state.region === null ? null : REGIONS[state.continent][state.region];
  const allTargets = state.continent ? REGIONS[state.continent].flatMap(item => item.ids) : [];
  document.querySelectorAll('.country-path').forEach(path => {
    const id = path.dataset.id;
    const isTarget = region ? region.ids.includes(id) : allTargets.includes(id);
    path.classList.toggle('is-target',isTarget);
    path.classList.toggle('is-dimmed',Boolean(state.continent) && !isTarget);
    path.classList.toggle('is-selected',state.country === id);
    path.classList.toggle('is-hovered',(state.hoverRegion !== null && REGIONS[state.continent][state.hoverRegion].ids.includes(id)) || state.hoverCountry === id);
    path.style.cursor = isTarget ? 'pointer' : 'default';
    if (isTarget) { path.setAttribute('tabindex','0'); path.setAttribute('role','button'); }
    else { path.removeAttribute('tabindex'); path.removeAttribute('role'); }
  });
  document.querySelectorAll('.capital-marker').forEach(marker => {
    marker.classList.toggle('is-emphasized',state.hoverCountry === marker.dataset.id || state.country === marker.dataset.id);
  });
}
function renderList() {
  selectionList.replaceChildren();
  const region = state.region === null ? null : REGIONS[state.continent][state.region];
  const items = region ? region.ids.map(id => ({ name: COUNTRIES[id].name, id })) : REGIONS[state.continent];
  const totalCountries = region ? region.ids.length : new Set(items.flatMap(item => item.ids)).size;
  const countryWord = totalCountries % 100 >= 11 && totalCountries % 100 <= 14 ? 'СТРАН'
    : totalCountries % 10 === 1 ? 'СТРАНА'
    : totalCountries % 10 >= 2 && totalCountries % 10 <= 4 ? 'СТРАНЫ' : 'СТРАН';
  document.getElementById('selectionCount').textContent = region
    ? `${String(totalCountries).padStart(2,'0')} ${countryWord} · СТОЛИЦЫ НА КАРТЕ`
    : `${String(items.length).padStart(2,'0')} МАРШРУТОВ · ${totalCountries} СТРАН`;
  items.forEach((item,index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `selection-item ${region ? 'is-country' : 'is-region'}`;
    button.style.setProperty('--item-delay',`${index*45}ms`);
    button.innerHTML = `<span class="selection-index">0${index+1}</span><span class="selection-label"><span class="selection-name">${item.name}</span>${region ? `<span class="selection-subline">${CAPITALS[item.id].name}</span>` : ''}</span>${region ? '' : `<span class="selection-meta">${String(item.ids.length).padStart(2,'0')}</span>`}<span class="selection-arrow">↗</span>`;
    button.addEventListener('click',() => region ? showCountry(item.id) : chooseRegion(index));
    if (!region) {
      button.addEventListener('mouseenter',() => setHoverRegion(index));
      button.addEventListener('mouseleave',clearHover);
      button.addEventListener('focus',() => setHoverRegion(index));
      button.addEventListener('blur',clearHover);
    } else {
      button.addEventListener('mouseenter',() => setHoverCountry(item.id));
      button.addEventListener('mouseleave',clearHover);
      button.addEventListener('focus',() => setHoverCountry(item.id));
      button.addEventListener('blur',clearHover);
    }
    selectionList.append(button);
  });
}
function setHoverRegion(index) {
  state.hoverRegion = index;
  state.hoverCountry = null;
  updateMapClasses();
  selectionList.querySelectorAll('.selection-item').forEach((button,i) => button.classList.toggle('is-active',i===index));
}
function setHoverCountry(id) {
  if (state.region === null) return;
  state.hoverCountry = id;
  updateMapClasses();
  const ids = REGIONS[state.continent][state.region].ids;
  selectionList.querySelectorAll('.selection-item').forEach((button,index) => button.classList.toggle('is-active',ids[index]===id));
}
function clearHover() {
  state.hoverRegion = null;
  state.hoverCountry = null;
  updateMapClasses();
  selectionList.querySelectorAll('.selection-item').forEach(button => button.classList.remove('is-active'));
}
function chooseContinent(continent) {
  hideCapitals();
  state.continent = continent;
  state.region = null;
  state.country = null;
  state.hoverCountry = null;
  app.dataset.continent = continent;
  app.dataset.step = 'region';
  selection.hidden = false;
  document.getElementById('mapOverlayTop').hidden = false;
  document.getElementById('mapScale').hidden = false;
  document.getElementById('mapHint').hidden = false;
  document.getElementById('mapStatus').textContent = continent === 'europe' ? 'ЕВРОПА' : 'АЗИЯ';
  document.getElementById('mapCoords').textContent = continentCoordinates(continent);
  document.getElementById('selectionLabel').textContent = 'ВЫБЕРИТЕ РЕГИОН';
  setIntro('02 / РЕГИОН','НАЧИНАЕМ ПУТЕШЕСТВИЕ',continent === 'europe' ? 'Европа.<br><em>Ближе к деталям.</em>' : 'Азия.<br><em>Ближе к деталям.</em>','Отметьте регион на карте или выберите его из списка.','ВЫБЕРИТЕ РЕГИОН');
  animateViewBox(maps[continent],CONTINENT_VIEW[continent]);
  renderList();
  updateMapClasses();
}
function chooseRegion(index) {
  hideCapitals();
  state.region = index;
  state.country = null;
  state.hoverRegion = null;
  state.hoverCountry = null;
  const region = REGIONS[state.continent][index];
  app.dataset.step = 'country';
  document.getElementById('selectionLabel').textContent = 'ВЫБЕРИТЕ СТРАНУ';
  document.getElementById('mapStatus').textContent = region.name.toLocaleUpperCase('ru');
  const [west, south, east, north] = REGION_FOCUS[region.key];
  document.getElementById('mapCoords').textContent = formatCoordinates((west + east) / 2, (south + north) / 2);
  document.getElementById('mapHint').textContent = 'Выберите страну или её столицу';
  setIntro('03 / СТРАНА',region.name.toLocaleUpperCase('ru'),'Выберите<br><em>страну.</em>','Нажмите на её контур или название, чтобы открыть короткую историю и пейзаж.','ВЫБЕРИТЕ СТРАНУ');
  renderList();
  updateMapClasses();
  const svg = maps[state.continent];
  const target = viewForRegion(region);
  animateViewBox(svg,target,() => {
    if (state.region === index && state.continent) showCapitals(svg,region,target[2]);
  });
}
function countryPathClick(id) {
  if (!state.continent) return;
  if (state.region === null) {
    const index = REGIONS[state.continent].findIndex(region => region.ids.includes(id));
    if (index !== -1) chooseRegion(index);
  } else if (REGIONS[state.continent][state.region].ids.includes(id)) showCountry(id);
}
function countryPathEnter(event,id) {
  if (!state.continent) return;
  const index = REGIONS[state.continent].findIndex(region => region.ids.includes(id));
  if (index === -1 || (state.region !== null && state.region !== index)) return;
  if (state.region === null) setHoverRegion(index);
  else setHoverCountry(id);
  tooltip.textContent = state.region === null ? REGIONS[state.continent][index].name : COUNTRIES[id].name;
  tooltip.hidden = false;
  moveTooltip(event);
}
function moveTooltip(event) {
  if (tooltip.hidden) return;
  const rect = document.querySelector('.map-area').getBoundingClientRect();
  tooltip.style.left = `${event.clientX-rect.left+15}px`;
  tooltip.style.top = `${event.clientY-rect.top-20}px`;
}
function showCountry(id) {
  const wasOpen = !detail.hidden && !detail.classList.contains('is-closing');
  if (detailCloseTimer) clearTimeout(detailCloseTimer);
  detailCloseTimer = null;
  detail.classList.remove('is-closing');
  state.country = id;
  const country = COUNTRIES[id];
  const region = REGIONS[state.continent][state.region];
  document.getElementById('detailName').textContent = country.name;
  document.getElementById('detailRegion').textContent = `${region.name.toLocaleUpperCase('ru')} / ${state.continent === 'europe' ? 'ЕВРОПА' : 'АЗИЯ'}`;
  document.getElementById('detailSummary').textContent = country.summary;
  document.getElementById('detailFact').textContent = country.fact;
  document.getElementById('detailNumber').textContent = String(region.ids.indexOf(id)+1).padStart(2,'0');
  const flag = document.getElementById('detailFlag');
  flag.src = `photos/flags/${FLAG_CODE[id]}.png`;
  flag.alt = `Флаг: ${country.name}`;
  document.getElementById('detailMedia').style.backgroundImage = `url("photos/${country.photo}")`;
  document.getElementById('photoLink').href = `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(PHOTO_SOURCE[id]).replaceAll('%20','_')}`;
  const coat = document.getElementById('detailCoat');
  coat.hidden = false;
  coat.src = `photos/coats/${id.toLowerCase()}.png`;
  coat.alt = `Герб: ${country.name}`;
  coat.onerror = () => { coat.hidden = true; document.getElementById('coatFallback').hidden = false; };
  coat.onload = () => { document.getElementById('coatFallback').hidden = true; };
  detail.hidden = false;
  detail.classList.remove('is-refreshing');
  if (wasOpen) { void detail.offsetWidth; detail.classList.add('is-refreshing'); }
  document.body.style.overflow = 'hidden';
  document.getElementById('detailClose').focus();
  updateMapClasses();
}
function closeDetail() {
  if (detail.hidden || detail.classList.contains('is-closing')) return;
  detail.classList.add('is-closing');
  document.body.style.overflow = '';
  state.country = null;
  updateMapClasses();
  const finish = () => {
    detail.hidden = true;
    detail.classList.remove('is-closing','is-refreshing');
    detailCloseTimer = null;
    selectionList.querySelector('.selection-item')?.focus();
  };
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) finish();
  else detailCloseTimer = window.setTimeout(finish,300);
}
function goBack() {
  if (!detail.hidden) { closeDetail(); return; }
  if (state.region !== null) {
    hideCapitals();
    state.region = null;
    state.hoverCountry = null;
    app.dataset.step = 'region';
    document.getElementById('mapStatus').textContent = state.continent === 'europe' ? 'ЕВРОПА' : 'АЗИЯ';
    document.getElementById('mapCoords').textContent = continentCoordinates(state.continent);
    document.getElementById('selectionLabel').textContent = 'ВЫБЕРИТЕ РЕГИОН';
    document.getElementById('mapHint').textContent = 'Наведите на выделенную страну, чтобы увидеть регион';
    setIntro('02 / РЕГИОН','НАЧИНАЕМ ПУТЕШЕСТВИЕ',state.continent === 'europe' ? 'Европа.<br><em>Ближе к деталям.</em>' : 'Азия.<br><em>Ближе к деталям.</em>','Отметьте регион на карте или выберите его из списка.','ВЫБЕРИТЕ РЕГИОН');
    animateViewBox(maps[state.continent],CONTINENT_VIEW[state.continent]);
    renderList();
    updateMapClasses();
    return;
  }
  state.continent = null;
  state.hoverRegion = null;
  state.hoverCountry = null;
  hideCapitals();
  delete app.dataset.continent;
  app.dataset.step = 'continent';
  animateViewBox(worldMap,WORLD_VIEW);
  selection.hidden = true;
  document.getElementById('mapOverlayTop').hidden = true;
  document.getElementById('mapScale').hidden = true;
  document.getElementById('mapHint').hidden = true;
  setIntro('01 / НАПРАВЛЕНИЕ','ОТКРОЙ СВОЙ МАРШРУТ','У каждого места<br><em>своя история.</em>','Начните с карты. Выберите континент, затем регион и страну, чтобы оказаться немного ближе к её миру.','ВЫБЕРИТЕ КОНТИНЕНТ НА КАРТЕ');
  updateMapClasses();
}

renderMaps();
document.getElementById('metricContinents').textContent = String(Object.keys(REGIONS).length).padStart(2,'0');
document.getElementById('metricRegions').textContent = String(Object.values(REGIONS).flat().length).padStart(2,'0');
document.getElementById('metricCountries').textContent = String(new Set(Object.values(REGIONS).flatMap(regions => regions.flatMap(region => region.ids))).size).padStart(2,'0');
document.querySelectorAll('[data-continent]').forEach(button => button.addEventListener('click',() => chooseContinent(button.dataset.continent)));
worldMap.addEventListener('click',event => { if (!state.continent) chooseContinent(continentAt(event)); });
document.getElementById('backButton').addEventListener('click',goBack);
document.getElementById('homeButton').addEventListener('click',() => { if (!detail.hidden) closeDetail(); if (state.continent) { state.region = null; goBack(); } });
document.getElementById('detailClose').addEventListener('click',closeDetail);
document.getElementById('detailBackdrop').addEventListener('click',closeDetail);
document.getElementById('nextCountry').addEventListener('click',() => { const ids = REGIONS[state.continent][state.region].ids; showCountry(ids[(ids.indexOf(state.country)+1)%ids.length]); });
document.addEventListener('keydown',event => {
  if (event.key === 'Escape') { if (!detail.hidden) closeDetail(); else if (state.continent) goBack(); }
  if ((event.key === 'Enter' || event.key === ' ') && event.target.classList?.contains('country-path')) { event.preventDefault(); countryPathClick(event.target.dataset.id); }
  if ((event.key === 'Enter' || event.key === ' ') && event.target.classList?.contains('capital-marker')) { event.preventDefault(); event.target.dispatchEvent(new MouseEvent('click',{bubbles:true})); }
});
