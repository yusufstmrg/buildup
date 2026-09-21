const fs = require('fs');
let code = fs.readFileSync('src/components/PricingSection.tsx', 'utf8');

if (!code.includes('EditableText')) {
  code = code.replace("import * as Switch from '@radix-ui/react-switch';", "import * as Switch from '@radix-ui/react-switch';\nimport { EditableText } from '../components/admin/EditableText';");
}

code = code.replace(
  "Transparent, Outcome-Led Pricing",
  "<EditableText id=\"pricing.title\" default=\"Transparent, Outcome-Led Pricing\" />"
);

code = code.replace(
  "Select the engagement model that fits your scale.",
  "<EditableText id=\"pricing.subtitle\" default=\"Select the engagement model that fits your scale.\" className=\"block\" />"
);

code = code.replace(
  "Frequently Asked Questions",
  "<EditableText id=\"pricing.faq.title\" default=\"Frequently Asked Questions\" />"
);

fs.writeFileSync('src/components/PricingSection.tsx', code);
