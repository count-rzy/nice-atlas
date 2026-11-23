import html
import json
import re
import time
import urllib.parse
import urllib.request
from pathlib import Path

PHOTOS = {
    'georgia.jpg': 'The Greater Caucasus Mountains in Georgia.jpg',
    'armenia.jpg': 'Khor Virap Monastery and Mount Ararat, Armenia.jpg',
    'azerbaijan.jpg': 'Baku banner Old City panorama.jpg',
    'spain.jpg': 'Alhambra evening panorama Mirador San Nicolas sRGB-1.jpg',
    'portugal.jpg': 'Panorama with Nossa Senhora da Penha de França Convent at sunrise, Lisbon, Portugal julesvernex2.jpg',
    'andorra.jpg': 'Andorra2008.JPG',
    'france.jpg': 'Panorama of Paris city from Montmartre.jpg',
    'switzerland.jpg': 'Landscape Arnisee-region.JPG',
    'italy.jpg': 'Amalfi Coast, Italy Panoramic.jpg',
    'germany.jpg': 'Neuschwanstein Castle 2024-02.jpg',
    'poland.jpg': 'Winter in Tatry Mountains - Poland.jpg',
    'ukraine.jpg': 'Морозний ранок над Яремчею.jpg',
    'moldova.jpg': 'Orhei Vechi 08.JPG',
    'slovakia.jpg': 'Strbske Pleso - Mountains 2.jpg',
    'norway.jpg': 'Geirangerfjord from Ørnesvingen, 2013 June.jpg',
    'finland.jpg': 'Bisajärvi in evening light from the southwest in Sipoonkorpi, Vantaa, Finland, 2021 May.jpg',
    'sweden.jpg': 'Typhical landscape of Stockholm archipelago, Fjärdlång, Stockholm (Sweden) - panoramio.jpg',
    'greece.jpg': 'Santorin (GR), Ia -- 2017 -- 2698.jpg',
    'serbia.jpg': 'Nacionalni Park Tara - NP04.jpg',
    'bulgaria.jpg': 'Chepino Valley Landscape.jpg',
    'montenegro.jpg': 'Kotor and Boka kotorska - view from city wall.jpg',
    'north-macedonia.jpg': 'Vista de Ohrid, Macedonia, 2014-04-17, DD 52.JPG',
    'albania.jpg': '2024-10-14 Valbona Valley 5.jpg',
    'china.jpg': 'Landscape - Great Wall of China at Jiankou.jpg',
    'south-korea.jpg': 'Panoramic view of Hyangwonjeong Pavilion in its pond at Gyeongbokgung Palace with blue sky in Seoul.jpg',
    'japan.jpg': 'Mount Fuji and Fog over Lake Yamanaka.jpg',
    'taiwan.jpg': 'Sun Moon Lake, Taiwan.jpg',
    'saudi-arabia.jpg': 'Landscape at al-Ula, Saudi Arabia (1).jpg',
    'uae.jpg': 'Dubai skyline unsplash.jpg',
    'oman.jpg': 'Wadi Shab, Oman.jpg',
    'jordan.jpg': 'Al-Khazneh (The Treasury) 2, Petra, Jordan.jpg',
    'iraq.jpg': 'Panorama view of the Erbil Citadel, Erbil Governorate, Iraqi Kurdistan.jpg',
    'palestine.jpg': "Palestine, Wadi Qelt, (Landscape with St. George's Monastery)(10).jpg",
    'thailand.jpg': 'Playa Maya, Ko Phi Phi, Tailandia, 2013-08-19, DD 13.JPG',
    'indonesia.jpg': 'Rice terraces, Ubud, Bali.jpg',
    'malaysia.jpg': 'Cameron Bharat Tea Plantation, Cameron Highlands, Malaysia, 20250829 1432 4034.jpg',
    'singapore.jpg': 'Gardens by the Bay, Marina Bay, Singapur, 2023-08-19, DD 14-16 HDR.jpg',
    'vietnam.jpg': 'Hạ Long Bay Panorama, Vietnam.jpg',
    'philippines.jpg': 'El Nido Bay, Island lagoon, Tropical lagoon, Palawan, Philippines.jpg',
}

HEADERS = {'User-Agent': 'AtlasTravelPrototype/1.0 (educational local prototype; contact: codex@example.org)'}

def get_json(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers=HEADERS), timeout=30) as response:
        return json.load(response)

def plain(value):
    return html.unescape(re.sub(r'<[^>]*>', '', value or '')).strip()

credits = ['# Фотографии', '', 'Фотографии получены из Wikimedia Commons. У каждого файла есть своя лицензия и автор; данные приведены ниже.', '']
for filename, title in PHOTOS.items():
    params = urllib.parse.urlencode({
        'action': 'query', 'format': 'json', 'titles': 'File:' + title,
        'prop': 'imageinfo', 'iiprop': 'url|extmetadata', 'iiurlwidth': '1600',
    })
    for attempt in range(3):
        try:
            data = get_json('https://commons.wikimedia.org/w/api.php?' + params)
            page = next(iter(data['query']['pages'].values()))
            info = page['imageinfo'][0]
            source = info.get('thumburl', info['url'])
            target = Path('photos') / filename
            if not target.exists():
                with urllib.request.urlopen(urllib.request.Request(source, headers=HEADERS), timeout=60) as response:
                    target.write_bytes(response.read())
            meta = info.get('extmetadata', {})
            artist = plain(meta.get('Artist', {}).get('value'))
            license_name = plain(meta.get('LicenseShortName', {}).get('value'))
            credits.append(f'- **{filename}** — [{title}]({info["descriptionurl"]}); автор: {artist or "см. страницу файла"}; лицензия: {license_name or "см. страницу файла"}.')
            print(filename, target.stat().st_size)
            break
        except Exception as error:
            print(filename, 'attempt', attempt + 1, str(error)[:120])
            time.sleep(2 + attempt * 3)
    else:
        credits.append(f'- **{filename}** — загрузка не удалась; источник: {title}.')
    time.sleep(.4)

Path('photos/CREDITS.md').write_text('\n'.join(credits) + '\n', encoding='utf-8')
