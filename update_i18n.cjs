const fs = require('fs');
let code = fs.readFileSync('src/lib/i18n.ts', 'utf8');

code = code.replace(/tagline: '.*?'/g, "tagline: 'AI-Native Business Transformation Intelligence · Direct Internal System Connectivity'");
code = code.replace(/navBusinessOS: 'Business OS,',/g, "navBusinessOS: 'Business OS',\n    erpHeading: 'Automated 2-Way Sync with Global ERPs',\n    erpSubheading: 'Hubungkan BuildUp dengan sistem ERP, akuntansi, dan database internal Anda secara instan tanpa mengganggu core data.',");
code = code.replace(/navBusinessOS: 'Business OS',(?!\n    erpHeading)/g, "navBusinessOS: 'Business OS',\n    erpHeading: 'Automated 2-Way Sync with Global ERPs',\n    erpSubheading: 'Connect BuildUp with your ERP, accounting, and internal databases instantly without disrupting core data.',");

fs.writeFileSync('src/lib/i18n.ts', code);
