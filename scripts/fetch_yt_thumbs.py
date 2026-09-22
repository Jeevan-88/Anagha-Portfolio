import urllib.request

yt_vids = {
    'muwci': 'ox9tHmJMVgk',
    'muwci_shorts': 'pb2blYD0-Fg',
    'bharat_forge': 'TRaFX8nfcHI',
    'root_cause_s1': '0u2vR_mI4Fo'
}

headers = {'User-Agent': 'Mozilla/5.0'}

for name, vid_id in yt_vids.items():
    urls = [
        f'https://img.youtube.com/vi/{vid_id}/maxresdefault.jpg',
        f'https://img.youtube.com/vi/{vid_id}/hqdefault.jpg'
    ]
    saved = False
    for u in urls:
        try:
            req = urllib.request.Request(u, headers=headers)
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = resp.read()
                if len(data) > 2000: # Not a 404 placeholder
                    with open(f'public/assets/projects/{name}.jpg', 'wb') as f:
                        f.write(data)
                    print(f'Successfully downloaded thumbnail for {name} from {u}')
                    saved = True
                    break
        except Exception as e:
            continue
    if not saved:
        print(f'Could not download {name}')
