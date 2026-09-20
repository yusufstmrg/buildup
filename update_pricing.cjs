const fs = require('fs');
let code = fs.readFileSync('src/components/PricingSection.tsx', 'utf8');
code = code.replace(/if \(value === 0\) return "Waived";/g, 'if (value === 0) return "Free";');
code = code.replace(/const getPriceIdr = \(monthlyIdr: number\) => \{\s*return monthlyIdr;\s*\};/g, 'const getPriceIdr = (monthlyIdr: number) => {\n    return isAnnual ? monthlyIdr * 0.8 : monthlyIdr;\n  };');
code = code.replace(/const getPriceUsd = \(monthlyUsd: number\) => \{\s*return monthlyUsd;\s*\};/g, 'const getPriceUsd = (monthlyUsd: number) => {\n    return isAnnual ? monthlyUsd * 0.8 : monthlyUsd;\n  };');
fs.writeFileSync('src/components/PricingSection.tsx', code);
