const fs = require('fs');
let code = fs.readFileSync('src/lib/i18n.ts', 'utf8');

// Just inject erpHeading and erpSubheading into all language blocks at the end
const langs = ['id', 'en', 'zh', 'ja', 'ar', 'es'];
for (const l of langs) {
  const inject =     erpHeading: 'Automated 2-Way Sync with Global ERPs',\n    erpSubheading: 'Connect BuildUp with your ERP, accounting, and internal databases instantly without disrupting core data.',\n  },\n;
  code = code.replace(new RegExp(  : \\{[\\s\\S]*?\\n  \\},), (match) => {
    return match.replace(/\n  \},$/, ',\n' + inject.replace(/  \},$/, '  },'));
  });
}

// Add de and ru to Language type
code = code.replace(/export type Language = 'id' \| 'en' \| 'zh' \| 'ja' \| 'ar' \| 'es';/, "export type Language = 'id' | 'en' | 'zh' | 'ja' | 'ar' | 'es' | 'de' | 'ru';");

// Add to SUPPORTED_LANGUAGES
code = code.replace(/\];/, "  ,{ code: 'de', name: 'Deutsch', flag: '????' },\n  { code: 'ru', name: '???????', flag: '????' }\n];");

// Add empty TRANSLATIONS for de and ru
code = code.replace(/};\s*$/, ",\n  de: { ...TRANSLATIONS.en },\n  ru: { ...TRANSLATIONS.en }\n};\n");

// Replace tagline in all
code = code.replace(/tagline: '.*?'/g, "tagline: 'AI-Native Business Transformation Intelligence · Direct Internal System Connectivity'");

fs.writeFileSync('src/lib/i18n.ts', code);
