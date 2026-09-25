const fs = require('fs');
let c = fs.readFileSync('src/pages/LandingPage.tsx', 'utf8');
c = c.replace(
  '<PricingSection key="pricing" />;',
  '<PricingSection key="pricing" />;\n            case "affiliate":\n              return <AffiliateSection key="affiliate" />;'
);
fs.writeFileSync('src/pages/LandingPage.tsx', c);
