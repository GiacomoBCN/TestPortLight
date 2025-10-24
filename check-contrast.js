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

console.log('─'.repeat(75));
console.log('Generated: ' + new Date().toLocaleString());
console.log('─'.repeat(75) + '\n');
