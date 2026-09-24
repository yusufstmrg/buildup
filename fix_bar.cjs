const fs = require('fs');
let bar = fs.readFileSync('src/components/admin/AdminBar.tsx', 'utf8');

bar = bar.replace('setPricing } = useCms()', 'setSaasPlans } = useCms()');
bar = bar.replace(/if \(config\.pricing\) setPricing\(config\.pricing\);/g, 'if (config.saasPlans) setSaasPlans(config.saasPlans);');

fs.writeFileSync('src/components/admin/AdminBar.tsx', bar);
