const fs = require('fs');
let code = fs.readFileSync('src/components/ContactSection.tsx', 'utf8');

// 1. Change single string to string array
code = code.replace(/const \[primaryChallenge, setPrimaryChallenge\] = useState\('Kebocoran Margin & Inefisiensi Biaya'\);/, 'const [primaryChallenge, setPrimaryChallenge] = useState<string[]>([]);');

// 2. Add lower revenue ranges
code = code.replace(/<option value="< Rp 1 Miliar">\&lt; Rp 1 Miliar \/ thn<\/option>/, `<option value="< Rp 500 Juta">&lt; Rp 500 Juta / thn</option>\n                          <option value="Rp 500 Juta - Rp 1 Miliar">Rp 500 Juta - Rp 1 Miliar / thn</option>`);

// 3. Replace the primary challenge select with a set of checkboxes
const checkboxes = `
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                        {['Kebocoran Margin & Inefisiensi', 'Piutang Lambat & Defisit Kas', 'Kepatuhan Pajak & Rekonsiliasi', 'Pencegahan Fraud & Audit', 'Integrasi Data ERP & AI Workforce'].map(opt => (
                          <label key={opt} className="flex items-center gap-2 text-xs text-brand-textMain cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={primaryChallenge.includes(opt)}
                              onChange={(e) => {
                                if (e.target.checked) setPrimaryChallenge([...primaryChallenge, opt]);
                                else setPrimaryChallenge(primaryChallenge.filter(i => i !== opt));
                              }}
                              className="w-4 h-4 rounded border-brand-border text-brand-gold focus:ring-brand-gold bg-brand-navy"
                            />
                            {opt}
                          </label>
                        ))}
                      </div>
`;
code = code.replace(/<select\s+value=\{primaryChallenge\}[\s\S]*?<\/select>/, checkboxes);

// 4. Update the WhatsApp button text and colors
code = code.replace(/<p className="font-semibold text-emerald-950 dark:text-emerald-100">Respon instan untuk Direksi & C-Level<\/p>/, '<p className="font-semibold text-emerald-700 dark:text-emerald-400">Respon instan untuk Direksi & C-Level</p>');
code = code.replace(/Hubungi via WhatsApp Resmi/i, 'Hubungi Tim Kami');
// Remove phone number
code = code.replace(/<p className="text-xs text-emerald-800 dark:text-emerald-200 opacity-90 mt-1">\s*\+62 813-8888-8888\s*<\/p>/, '');

// 5. Expand industries
const newInd = `const industries = [
    { id: 'fin', name: { id: 'Perbankan & Jasa Keuangan', en: 'Banking & Financial Services' } },
    { id: 'mfg', name: { id: 'Manufaktur & Otomotif', en: 'Manufacturing & Automotive' } },
    { id: 'ret', name: { id: 'Ritel & FMCG', en: 'Retail & FMCG' } },
    { id: 'log', name: { id: 'Logistik & Supply Chain', en: 'Logistics & Supply Chain' } },
    { id: 'eng', name: { id: 'Energi & Pertambangan', en: 'Energy & Mining' } },
    { id: 'hth', name: { id: 'Kesehatan & Farmasi', en: 'Healthcare & Pharmaceuticals' } },
    { id: 'prop', name: { id: 'Properti & Konstruksi', en: 'Property & Construction' } },
    { id: 'tech', name: { id: 'Teknologi & SaaS', en: 'Technology & SaaS' } },
    { id: 'fnb', name: { id: 'Makanan & Minuman (F&B)', en: 'Food & Beverage' } },
    { id: 'edu', name: { id: 'Pendidikan', en: 'Education' } },
    { id: 'agri', name: { id: 'Pertanian & Agribisnis', en: 'Agriculture & Agribusiness' } },
    { id: 'other', name: { id: 'Lainnya (Tuliskan Spesifik)', en: 'Other (Please Specify)' } }
  ];`;
code = code.replace(/const industries = \[[\s\S]*?\];/, newInd);

fs.writeFileSync('src/components/ContactSection.tsx', code);
