import html
import json
import re
import urllib.parse
import urllib.request
from pathlib import Path

CANDIDATES = {
    'geo': ['Greater coat of arms of Georgia.svg', 'Coat of arms of Georgia.svg'],
    'arm': ['Coat of arms of Armenia.svg', 'Coat of Arms of Armenia.svg'],
    'aze': ['Emblem of Azerbaijan.svg'],
    'esp': ['Escudo de España (mazonado).svg', 'Coat of Arms of Spain.svg', 'Coat of arms of Spain.svg'],
    'prt': ['Coat of arms of Portugal.svg'],
    'and': ['Coat of arms of Andorra.svg'],
    'fra': ['Arms of the French Republic.svg', 'Emblem of France.svg'],
    'che': ['Coat of Arms of Switzerland (Pantone).svg', 'Coat of arms of Switzerland.svg'],
    'ita': ['Emblem of Italy.svg'],
    'deu': ['Coat of arms of Germany.svg', 'Bundesadler Bundesorgane.svg'],
    'pol': ['Coat of arms of Poland-official.svg'],
    'ukr': ['Coat of arms of Ukraine.svg'],
    'mda': ['Coat of arms of Moldova.svg'],
    'svk': ['Coat of arms of Slovakia.svg'],
    'nor': ['Coat of arms of Norway.svg'],
    'fin': ['Coat of arms of Finland.svg'],
    'swe': ['Coat of arms of Sweden.svg'],
    'grc': ['Coat of arms of Greece.svg'],
    'srb': ['Coat of arms of Serbia.svg'],
    'bgr': ['Coat of arms of Bulgaria.svg'],
    'mne': ['Coat of arms of Montenegro.svg'],
    'mkd': ['Coat of arms of North Macedonia.svg'],
    'alb': ['Coat of arms of Albania.svg'],
    'chn': ["National Emblem of the People's Republic of China.svg", 'National Emblem of the People’s Republic of China.svg'],
    'kor': ['Emblem of South Korea.svg', 'Emblem of the Republic of Korea.svg'],
    'jpn': ['Imperial Seal of Japan.svg', 'Government Seal of Japan.svg'],
    'twn': ['National Emblem of the Republic of China.svg'],
    'sau': ['Emblem of Saudi Arabia.svg', 'Coat of arms of Saudi Arabia.svg'],
    'are': ['Emblem of the United Arab Emirates.svg', 'Coat of arms of the United Arab Emirates.svg'],
    'omn': ['National emblem of Oman.svg', 'Emblem of Oman.svg', 'Coat of arms of Oman.svg'],
    'jor': ['Coat of arms of Jordan.svg'],
    'irq': ['Coat of arms of Iraq.svg', 'Emblem of Iraq.svg'],
    'psx': ['Coat of arms of Palestine (official).svg'],
    'tha': ['Emblem of Thailand.svg', 'Coat of arms of Thailand.svg'],
    'idn': ['National emblem of Indonesia Garuda Pancasila.svg', 'Coat of arms of Indonesia.svg'],
    'mys': ['Coat of arms of Malaysia.svg'],
    'sgp': ['Coat of arms of Singapore.svg'],
    'vnm': ['Emblem of Vietnam.svg', 'Coat of arms of Vietnam.svg'],
    'phl': ['Coat of arms of the Philippines.svg'],
}

headers = {'User-Agent':'AtlasTravelPrototype/1.0 (educational local prototype; contact: codex@example.org)'}
titles = [title for group in CANDIDATES.values() for title in group]
by_title = {}
for offset in range(0, len(titles), 25):
    batch = titles[offset:offset + 25]
    params = urllib.parse.urlencode({'action':'query','format':'json','titles':'|'.join('File:'+title for title in batch),'prop':'imageinfo','iiprop':'url|extmetadata','iiurlwidth':'240'})
    request = urllib.request.Request('https://commons.wikimedia.org/w/api.php?'+params,headers=headers)
    with urllib.request.urlopen(request,timeout=30) as response: data=json.load(response)
    by_title.update({page['title'].lower():page for page in data['query']['pages'].values() if 'imageinfo' in page})
target_dir=Path('photos/coats')
target_dir.mkdir(parents=True,exist_ok=True)
credits=['# Гербы и государственные эмблемы','','Изображения получены из Wikimedia Commons. Для Японии показана императорская печать.','']
for code,group in CANDIDATES.items():
    page=next((by_title.get(('File:'+title).lower()) for title in group if ('File:'+title).lower() in by_title),None)
    if not page:
        print('MISSING',code,group)
        continue
    info=page['imageinfo'][0]
    url=info.get('thumburl',info['url'])
    try:
        target=target_dir/(code+'.png')
        if not target.exists():
            with urllib.request.urlopen(urllib.request.Request(url,headers=headers),timeout=30) as response: content=response.read()
            target.write_bytes(content)
        meta=info.get('extmetadata',{})
        artist=html.unescape(re.sub(r'<[^>]*>','',meta.get('Artist',{}).get('value',''))).strip()
        license_name=html.unescape(re.sub(r'<[^>]*>','',meta.get('LicenseShortName',{}).get('value',''))).strip()
        credits.append(f'- **{code}.png** — [{page["title"]}]({info["descriptionurl"]}); автор: {artist or "см. страницу файла"}; лицензия: {license_name or "см. страницу файла"}.')
        print(code,target.stat().st_size,page['title'])
    except Exception as error: print('ERROR',code,error)
Path('photos/coats/CREDITS.md').write_text('\n'.join(credits)+'\n',encoding='utf-8')
