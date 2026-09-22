import sys, base64
filename = sys.argv[1]
b64 = sys.argv[2]
with open(filename, 'wb') as out:
    out.write(base64.b64decode(b64.encode('utf-8', errors='ignore')))
print(f'Wrote {filename}')
