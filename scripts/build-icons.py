"""
Icone del sito (favicon e PWA): quadrato giallo #F5C33B, "GB" #111418 in Jost 600.

Le lettere sono convertite in tracciati (contorni del font letti da
app/fonts/jost-600.woff2 con fontTools): il disegno non dipende da un font
installato. Stesse regole delle icone del commit 7bd92dc:
  - quadrato pieno giallo, lettere inchiostro centrate sul loro riquadro reale
  - larghezza di "GB" = 80% del lato fino a 32px, 70% sopra
  - disegno a 1024px, poi riduzione Lanczos alla misura finale
Le icone android sono "maskable": lo script verifica che le lettere stiano
nel cerchio sicuro centrale (diametro 80% del lato).

Uso (dalla cartella del repo):
  pip install fonttools brotli pillow numpy
  python3 scripts/build-icons.py
"""
import os
import sys

import numpy as np
from fontTools.pens.recordingPen import DecomposingRecordingPen
from fontTools.ttLib import TTFont
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONT = os.path.join(ROOT, "app", "fonts", "jost-600.woff2")
OUT = os.path.join(ROOT, "public")

YELLOW = (0xF5, 0xC3, 0x3B)
INK = (0x11, 0x14, 0x18)
TEXT = "GB"
S = 1024  # lato del disegno prima della riduzione


def quad(p0, p1, p2, n=16):
    return [((1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * p1[0] + t * t * p2[0],
             (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * p1[1] + t * t * p2[1])
            for t in (i / n for i in range(1, n + 1))]


def cubic(p0, p1, p2, p3, n=16):
    return [((1 - t) ** 3 * p0[0] + 3 * (1 - t) ** 2 * t * p1[0] + 3 * (1 - t) * t * t * p2[0] + t ** 3 * p3[0],
             (1 - t) ** 3 * p0[1] + 3 * (1 - t) ** 2 * t * p1[1] + 3 * (1 - t) * t * t * p2[1] + t ** 3 * p3[1])
            for t in (i / n for i in range(1, n + 1))]


def text_contours(font, text):
    """Contorni di 'text' come poligoni (unita' del font, y verso l'alto)."""
    glyphs = font.getGlyphSet()
    cmap = font.getBestCmap()
    hmtx = font["hmtx"]
    contours, x = [], 0
    for ch in text:
        name = cmap[ord(ch)]
        pen = DecomposingRecordingPen(glyphs)
        glyphs[name].draw(pen)
        cur, start = [], None
        for op, args in pen.value:
            pts = [(px + x, py) for px, py in args]
            if op == "moveTo":
                cur, start = [pts[0]], pts[0]
            elif op == "lineTo":
                cur.append(pts[0])
            elif op == "qCurveTo":
                # TrueType: piu' punti di controllo con on-curve impliciti
                p0 = cur[-1] if cur else start
                ctrl, end = pts[:-1], pts[-1]
                if end is None:
                    end = start
                for i, c in enumerate(ctrl):
                    nxt = end if i == len(ctrl) - 1 else ((c[0] + ctrl[i + 1][0]) / 2, (c[1] + ctrl[i + 1][1]) / 2)
                    cur += quad(p0, c, nxt)
                    p0 = nxt
            elif op == "curveTo":
                cur += cubic(cur[-1], *pts)
            elif op in ("closePath", "endPath"):
                if len(cur) > 2:
                    contours.append(cur)
                cur = []
        x += hmtx[name][0]
    return contours


def fill_nonzero(polys):
    """Riempimento con la regola "nonzero" dei font, riga per riga.
    Serve perche' Jost disegna B con un solo contorno che si sovrappone a se'
    stesso: pieno dove il numero di avvolgimento non e' zero, buchi dove e' zero."""
    e = []
    for c in polys:
        for i in range(len(c)):
            (x0, y0), (x1, y1) = c[i - 1], c[i]
            if y0 != y1:
                e.append((x0, y0, x1, y1))
    e = np.array(e, dtype=np.float64)
    x0, y0, x1, y1 = e.T
    ymin, ymax = np.minimum(y0, y1), np.maximum(y0, y1)
    direction = np.where(y1 > y0, 1, -1)
    cols = np.arange(S) + 0.5
    mask = np.zeros((S, S), dtype=bool)
    for row in range(S):
        y = row + 0.5
        hit = (ymin <= y) & (y < ymax)
        if not hit.any():
            continue
        xs = x0[hit] + (y - y0[hit]) * (x1[hit] - x0[hit]) / (y1[hit] - y0[hit])
        order = np.argsort(xs)
        xs, d = xs[order], direction[hit][order]
        winding = np.cumsum(d)
        for j in range(len(xs) - 1):
            if winding[j] != 0:
                mask[row] |= (cols >= xs[j]) & (cols < xs[j + 1])
    return mask


def render(contours, size, fill):
    xs = [p[0] for c in contours for p in c]
    ys = [p[1] for c in contours for p in c]
    w, h = max(xs) - min(xs), max(ys) - min(ys)
    k = S * fill / w  # "GB" largo fill * lato
    ox = (S - w * k) / 2 - min(xs) * k
    oy = (S - h * k) / 2 + max(ys) * k  # y del font va verso l'alto
    mask = fill_nonzero([[(ox + px * k, oy - py * k) for px, py in c] for c in contours])
    im = Image.new("RGB", (S, S), YELLOW)
    im.paste(Image.new("RGB", (S, S), INK), mask=Image.fromarray(mask.astype(np.uint8) * 255))
    return im.resize((size, size), Image.LANCZOS), mask


def main():
    font = TTFont(FONT)
    contours = text_contours(font, TEXT)
    sizes = {
        "favicon-16x16.png": 16,
        "favicon-32x32.png": 32,
        "apple-touch-icon.png": 180,
        "android-chrome-192x192.png": 192,
        "android-chrome-512x512.png": 512,
    }
    for name, size in sizes.items():
        im, mask = render(contours, size, 0.80 if size <= 32 else 0.70)
        im.save(os.path.join(OUT, name))
        if name.startswith("android"):
            yy, xx = np.nonzero(mask)
            r = np.sqrt((xx - S / 2) ** 2 + (yy - S / 2) ** 2).max() / S
            ok = r <= 0.40
            print(f"{name}: lettere entro {r * 200:.1f}% del lato dal centro (cerchio sicuro 80%): {'OK' if ok else 'FUORI'}")
            if not ok:
                sys.exit(1)
    ico16, _ = render(contours, 16, 0.80)
    ico32, _ = render(contours, 32, 0.80)
    ico32.save(os.path.join(OUT, "favicon.ico"), sizes=[(16, 16), (32, 32)], append_images=[ico16])
    print("icone scritte in public/")


if __name__ == "__main__":
    main()
