import urllib.request, re

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}
urls = [
    'https://www.instagram.com/reel/DdTwWyDRV2w/',
    'https://www.instagram.com/reel/DZhw25nN4hQ/',
    'https://www.instagram.com/reel/DcF2AixtitB/',
    'https://www.instagram.com/reel/Dap3idQTkou/',
    'https://www.instagram.com/reel/C-kh-Soobid/'
]
for u in urls:
    try:
        req = urllib.request.Request(u, headers=headers)
        with urllib.request.urlopen(req, timeout=5) as res:
            html = res.read().decode('utf-8', errors='ignore')
            m = re.search(r'property="og:image" content="([^"]+)"', html)
            title_m = re.search(r'property="og:title" content="([^"]+)"', html)
            print(u)
            print('  Title:', title_m.group(1)[:80] if title_m else 'None')
            print('  Image:', m.group(1)[:80] if m else 'None')
    except Exception as e:
        print(u, 'Error:', str(e))
