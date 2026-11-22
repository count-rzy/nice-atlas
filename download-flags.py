from pathlib import Path
import urllib.request

folder=Path('photos/flags')
folder.mkdir(parents=True,exist_ok=True)
for code in ['ge','am','az','es','pt','ad','fr','ch','it','de','pl','ua','md','sk','no','fi','se','gr','rs','bg','me','mk','al','cn','kr','jp','sa','ae','om','jo','iq','th','id','my','sg','vn','ph']:
    if (folder/f'{code}.png').exists():
        continue
    request=urllib.request.Request(f'https://flagcdn.com/w160/{code}.png',headers={'User-Agent':'AtlasTravelPrototype/1.0'})
    with urllib.request.urlopen(request,timeout=30) as response: (folder/f'{code}.png').write_bytes(response.read())
    print(code,(folder/f'{code}.png').stat().st_size)
