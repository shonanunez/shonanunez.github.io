#!/usr/bin/env python3
"""Refresh browser cache keys after editing the shared CSS or JavaScript."""
import hashlib
from pathlib import Path
import re

root = Path(__file__).resolve().parent.parent
assets = ('styles.css', 'script.js')
versions = {name: hashlib.sha256((root / name).read_bytes()).hexdigest()[:12]
            for name in assets}
changed = 0
for page in root.rglob('*.html'):
    if '.git' in page.parts:
        continue
    before = page.read_text()
    after = re.sub(
        r'((?:href|src)="[^"]*?)(styles\.css|script\.js)(?:\?v=[^"]*)?(")',
        lambda match: f'{match[1]}{match[2]}?v={versions[match[2]]}{match[3]}',
        before,
    )
    if after != before:
        page.write_text(after)
        changed += 1
print(f'Updated asset versions in {changed} HTML files.')
