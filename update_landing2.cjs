const fs = require('fs');
let c = fs.readFileSync('src/pages/LandingPage.tsx', 'utf8');
c = c.replace(
  'case "pricing":\n              return <PricingSection key="pricing" />;',
  'case "pricing":\n              return <PricingSection key="pricing" />;\n            case "affiliate":\n              return <AffiliateSection key="affiliate" />;'
);
// Also replacing `\r\n` just in case it's a windows file
c = c.replace(
  'case "pricing":\r\n              return <PricingSection key="pricing" />;',
  'case "pricing":\r\n              return <PricingSection key="pricing" />;\r\n            case "affiliate":\r\n              return <AffiliateSection key="affiliate" />;'
);
fs.writeFileSync('src/pages/LandingPage.tsx', c);
