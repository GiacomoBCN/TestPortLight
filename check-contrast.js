// Accessibility Color Contrast Checker
// Calculates WCAG contrast ratios for the color combinations used in the project

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(color1, color2) {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
}

function checkWCAGCompliance(ratio) {
  return {
    'AA Normal': ratio >= 4.5 ? '✅ PASS' : '❌ FAIL',
    'AA Large': ratio >= 3 ? '✅ PASS' : '❌ FAIL',
    'AAA Normal': ratio >= 7 ? '✅ PASS' : '❌ FAIL',
    'AAA Large': ratio >= 4.5 ? '✅ PASS' : '❌ FAIL'
  };
}

console.log('╔═══════════════════════════════════════════════════════════════════════════╗');
console.log('║           ACCESSIBILITY COLOR CONTRAST ANALYSIS                           ║');
console.log('║           TestPortLight - Portfolio Website                               ║');
console.log('╚═══════════════════════════════════════════════════════════════════════════╝\n');

const colorCombinations = [
  {
    name: 'White text on dark background',
    foreground: '#ffffff',
    background: '#050810',
    usage: 'Headings, primary text'
  },
  {
    name: 'Primary body text (slate-300)',
    foreground: '#cbd5e1',
    background: '#050810',
    usage: 'Body text, descriptions, navigation'
  },
  {
    name: 'Secondary text (slate-500)',
    foreground: '#697990',
    background: '#050810',
    usage: 'Footer text, secondary info'
  },
  {
    name: 'Tertiary text (slate-400)',
    foreground: '#94a3b8',
    background: '#050810',
    usage: 'Labels, metadata'
  },
  {
    name: 'Primary blue accent',
    foreground: '#1a7aff',
    background: '#050810',
    usage: 'Links, badges, interactive elements'
  },
  {
    name: 'Teaching green accent',
    foreground: '#10b981',
    background: '#050810',
    usage: 'Teaching section accents, metrics'
  },
  {
    name: 'White on primary blue',
    foreground: '#ffffff',
    background: '#086efd',
    usage: 'Button text, CTA elements'
  },
  {
    name: 'Primary blue hover state',
    foreground: '#2375ef',
    background: '#050810',
    usage: 'Hover state for blue elements'
  },
  {
    name: 'Text on secondary background',
    foreground: '#cbd5e1',
    background: '#0a0e27',
    usage: 'Text on glass cards/components'
  },
  {
    name: 'White on secondary background',
    foreground: '#ffffff',
    background: '#0a0e27',
    usage: 'Headings on glass cards'
  }
];

colorCombinations.forEach((combo, index) => {
  const ratio = getContrastRatio(combo.foreground, combo.background);
  const compliance = checkWCAGCompliance(ratio);

  console.log(`\n${index + 1}. ${combo.name.toUpperCase()}`);
  console.log('─'.repeat(75));
  console.log(`   Foreground: ${combo.foreground}`);
  console.log(`   Background: ${combo.background}`);
  console.log(`   Usage: ${combo.usage}`);
  console.log(`   \n   📊 Contrast Ratio: ${ratio.toFixed(2)}:1\n`);
  console.log(`   WCAG Compliance:`);
  console.log(`   • AA Normal Text (4.5:1):    ${compliance['AA Normal']}`);
  console.log(`   • AA Large Text (3:1):       ${compliance['AA Large']}`);
  console.log(`   • AAA Normal Text (7:1):     ${compliance['AAA Normal']}`);
  console.log(`   • AAA Large Text (4.5:1):    ${compliance['AAA Large']}`);
});

console.log('\n\n╔═══════════════════════════════════════════════════════════════════════════╗');
console.log('║                         SUMMARY & RECOMMENDATIONS                         ║');
console.log('╚═══════════════════════════════════════════════════════════════════════════╝\n');

// Calculate all ratios for summary
const ratios = colorCombinations.map(combo => ({
  name: combo.name,
  ratio: getContrastRatio(combo.foreground, combo.background)
}));

const allPassAA = ratios.every(r => r.ratio >= 4.5);
const allPassAAA = ratios.every(r => r.ratio >= 7);

console.log('📋 Compliance Status:\n');
console.log(`   WCAG 2.1 Level AA:  ${allPassAA ? '✅ ALL PASS' : '⚠️  SOME FAILURES'}`);
console.log(`   WCAG 2.1 Level AAA: ${allPassAAA ? '✅ ALL PASS' : '⚠️  SOME FAILURES'}\n`);

// Identify potential issues
const failedAA = ratios.filter(r => r.ratio < 4.5);
const failedAAA = ratios.filter(r => r.ratio >= 4.5 && r.ratio < 7);

if (failedAA.length > 0) {
  console.log('❌ Combinations failing AA (4.5:1):');
  failedAA.forEach(f => console.log(`   • ${f.name}: ${f.ratio.toFixed(2)}:1`));
  console.log('');
}

if (failedAAA.length > 0) {
  console.log('⚠️  Combinations passing AA but failing AAA (7:1):');
  failedAAA.forEach(f => console.log(`   • ${f.name}: ${f.ratio.toFixed(2)}:1`));
  console.log('');
}

const perfect = ratios.filter(r => r.ratio >= 7);
console.log(`✅ Combinations achieving AAA compliance: ${perfect.length}/${ratios.length}\n`);

console.log('\n📖 WCAG Standards Reference:');
console.log('─'.repeat(75));
console.log('   • Level AA Normal Text: 4.5:1 minimum');
console.log('   • Level AA Large Text:  3:1 minimum (18pt+ or 14pt+ bold)');
console.log('   • Level AAA Normal Text: 7:1 minimum');
console.log('   • Level AAA Large Text:  4.5:1 minimum');
console.log('\n   💡 Large text = 18pt (24px) or larger, or 14pt (18.66px) bold or larger\n');

// ---------------------------------------------------------------------------
// HERO GLOW (home): testo dell'hero sopra la luce calda (.hero-glow)
// Legge i token da app/globals.css e calcola il fondo nel punto peggiore possibile:
// bianco + per ognuno dei due punti di fuga un raggio giallo (con il "sole", x1.2) e uno
// arancio alla massima opacita', piu' i due impulsi gialli e arancio al loro massimo,
// poi scurito dalla grana.
// E' un caso limite che a schermo non si verifica: un punto sta in un raggio giallo
// oppure arancio, mai in tutti e due, e i raggi sfumano allontanandosi dal punto di fuga.
// ---------------------------------------------------------------------------
(function heroGlowCheck() {
  const fs = require('fs');
  const path = require('path');
  const css = fs.readFileSync(path.join(__dirname, 'app', 'globals.css'), 'utf8');
  const token = (name) => {
    const m = css.match(new RegExp(name.replace(/[-]/g, '\\-') + '\\s*:\\s*([^;]+);'));
    if (!m) throw new Error('Token non trovato: ' + name);
    const v = m[1].trim();
    const ref = v.match(/^var\((--[\w-]+)\)$/);
    return ref ? token(ref[1]) : v;
  };
  const toHex = (c) => '#' + [c.r, c.g, c.b].map((n) => Math.round(n).toString(16).padStart(2, '0')).join('');
  const over = (top, alpha, bottom) => ({
    r: top.r * alpha + bottom.r * (1 - alpha),
    g: top.g * alpha + bottom.g * (1 - alpha),
    b: top.b * alpha + bottom.b * (1 - alpha),
  });

  const white = hexToRgb('#ffffff');
  // I colori della luce sono scritti come canali RGB ("242 140 40")
  const channels = (name) => {
    const [r, g, b] = token(name).split(/\s+/).map(Number);
    return { r, g, b };
  };
  const orange = channels('--hero-glow-orange');
  const yellow = channels('--hero-glow-yellow');
  const ink = token('--primitive-white'); // testo piu' forte: titolo, intro, bottone secondario
  const grain = parseFloat(token('--hero-grain-opacity'));

  console.log('\n\n╔═══════════════════════════════════════════════════════════════════════════╗');
  console.log('║            HERO GLOW - testo dell\'hero sul punto piu\' colorato            ║');
  console.log('╚═══════════════════════════════════════════════════════════════════════════╝');

  let ok = true;
  for (const [label, suffix] of [['Desktop (da 768px)', ''], ['Mobile (sotto 768px)', '-mobile']]) {
    const o = parseFloat(token('--hero-glow-orange-opacity' + suffix));
    const y = parseFloat(token('--hero-glow-yellow-opacity' + suffix));
    const pulse = parseFloat(token('--hero-glow-pulse-opacity'));
    let bg = white;
    for (let side = 0; side < 2; side++) {
      bg = over(orange, o, over(yellow, Math.min(1, y * 1.2), bg)); // raggi fermi
      for (let i = 0; i < 2; i++) bg = over(orange, o * pulse, over(yellow, y * pulse, bg)); // impulsi
    }
    bg = { r: bg.r * (1 - grain), g: bg.g * (1 - grain), b: bg.b * (1 - grain) }; // grana: multiply col nero
    const bgHex = toHex(bg);
    // Bottone secondario (glass): velo rgba(7, 9, 11, 0.05) sopra il fondo
    const glassHex = toHex(over({ r: 7, g: 9, b: 11 }, 0.05, bg));
    const rows = [
      ['Nome, intro (inchiostro) sul fondo', ink, bgHex],
      ['Bottone secondario (inchiostro su glass)', ink, glassHex],
      ['Etichetta (inchiostro su giallo: fondo proprio)', ink, token('--primitive-yellow-400')],
      ['Bottone primario (bianco su inchiostro: fondo proprio)', '#ffffff', token('--primitive-black')],
    ];
    console.log(`\n${label} - arancio ${o}, giallo ${y}, impulsi x${pulse}, grana ${grain} -> fondo peggiore ${bgHex}`);
    console.log('─'.repeat(75));
    for (const [name, fg, bgc] of rows) {
      const ratio = getContrastRatio(fg, bgc);
      if (ratio < 4.5) ok = false;
      console.log(`   ${ratio >= 4.5 ? '✅' : '❌'} ${ratio.toFixed(2).padStart(5)}:1  ${name} (${fg} su ${bgc})`);
    }
  }
  console.log(`\n   ${ok ? '✅ Tutto il testo dell\'hero resta sopra 4,5:1' : '❌ Qualche testo dell\'hero scende sotto 4,5:1'}\n`);
})();

console.log('─'.repeat(75));
console.log('Generated: ' + new Date().toLocaleString());
console.log('─'.repeat(75) + '\n');
