import json
import urllib.parse
import urllib.request

queries = [
    'Coat of arms of Georgia country svg', 'Coat of arms of Armenia svg',
    'Emblem of Azerbaijan svg', 'Coat of Arms of Spain svg',
    'Coat of arms of Portugal svg', 'Emblem of France svg',
    'Coat of arms of Switzerland svg', 'Emblem of Italy svg',
    'Coat of arms of Germany svg', 'National Emblem of China svg',
    'Emblem of South Korea svg', 'Imperial Seal of Japan svg',
]
for query in queries:
    params = urllib.parse.urlencode({'action':'query','generator':'search','gsrsearch':query,'gsrnamespace':6,'gsrlimit':3,'format':'json'})
    try:
        request = urllib.request.Request('https://commons.wikimedia.org/w/api.php?'+params,headers={'User-Agent':'AtlasTravelPrototype/1.0 (educational local prototype)'})
        with urllib.request.urlopen(request,timeout=30) as response: data=json.load(response)
        print('\n'+query)
        for page in data['query']['pages'].values(): print(page['title'])
    except Exception as error: print('ERROR',query,error)
