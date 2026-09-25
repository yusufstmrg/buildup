const fs=require('fs');
let c=fs.readFileSync('src/context/CmsContext.tsx', 'utf8');
c=c.replace(/sectionOrder:\s*\['hero',\s*'calculator',\s*'connectors',\s*'workforce',\s*'pricing',[\s\S]*?'testimonials',\s*'about',\s*'contact'\],/, `sectionOrder: ['hero', 'calculator', 'connectors', 'workforce', 'pricing', 'affiliate', 'testimonials', 'about', 'contact'],`);
fs.writeFileSync('src/context/CmsContext.tsx', c);
