
const fs = require('fs');
let code = fs.readFileSync('src/components/AboutSection.tsx', 'utf8');
code = code.replace(/<span className="bg-gradient-to-r from-amber-600 to-amber-500 dark:from-brand-gold dark:to-amber-500 bg-clip-text text-transparent">[^<]+<\/span>/g, '<span className="bg-gradient-to-r from-amber-600 to-amber-500 dark:from-brand-gold dark:to-amber-500 bg-clip-text text-transparent">AI-Native Business Transformation Intelligence &bull; Direct Internal System Connectivity</span>');
fs.writeFileSync('src/components/AboutSection.tsx', code);

