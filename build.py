"""Build static HTML for localhost, a GitHub project path, or a custom domain.
Python 3.9+, standard library only. Edit src/, never generated dist/.
"""
from pathlib import Path
from urllib.parse import urlsplit
from html.parser import HTMLParser
import argparse
import os
import re
import shutil

ROOT = Path(__file__).resolve().parent
parser = argparse.ArgumentParser()
parser.add_argument('--url', default=os.environ.get('SITE_URL') or 'http://localhost:8000')
args = parser.parse_args()
site_url = args.url.rstrip('/')
u = urlsplit(site_url)
if u.scheme not in ('http', 'https') or not u.netloc or u.query or u.fragment or u.username or not re.fullmatch(r'[A-Za-z0-9:/._~-]+', site_url):
    raise SystemExit('Provide a plain site URL, e.g. https://username.github.io/repository')
base = u.path.rstrip('/')
dest = ROOT / 'dist'
if dest.exists():
    shutil.rmtree(dest)
shutil.copytree(ROOT / 'src', dest)
for path in dest.rglob('*'):
    if not path.is_file() or path.suffix not in ('.html', '.xml', '.txt', '.js', '.css'):
        continue
    content = path.read_text(encoding='utf-8').replace('__SITE_URL__', site_url)
    if path.suffix == '.html':
        content = re.sub(r'((?:href|src)=([\"\']))/(?!/)', lambda m: m.group(1) + base + '/', content)
    path.write_text(content, encoding='utf-8')
(dest / '.nojekyll').touch()

class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.ids = set()
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if 'id' in a:
            self.ids.add(a['id'])
        for key in ('href', 'src'):
            if a.get(key, '').startswith('/'):
                self.links.append(a[key])

for page in dest.rglob('*.html'):
    parsed = Links()
    parsed.feed(page.read_text(encoding='utf-8'))
    for link in parsed.links:
        target = urlsplit(link)
        prefix = base + '/'
        if not target.path.startswith(prefix):
            raise SystemExit('Incorrect base path: ' + link)
        local = dest / target.path[len(prefix):]
        if local.is_dir():
            local = local / 'index.html'
        if not local.is_file():
            raise SystemExit('Broken local link: ' + link)
        if target.fragment:
            anchors = Links()
            anchors.feed(local.read_text(encoding='utf-8'))
            if target.fragment not in anchors.ids:
                raise SystemExit('Broken anchor: ' + link)
print('Built and checked all local links: ' + site_url)
print('Output: ' + str(dest))
