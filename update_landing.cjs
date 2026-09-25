const fs = require('fs');

let c = fs.readFileSync('src/pages/LandingPage.tsx', 'utf8');

// 1. Add isMobileMenuOpen state
c = c.replace(
  'const { state } = useCms();',
  'const { state } = useCms();\n  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);'
);

// 2. Add hamburger menu and mobile menu UI
const replacement = `
            </div>
            
            {/* Mobile Menu Toggle */}
            <div className="flex xl:hidden items-center ml-2">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-brand-textMuted hover:text-brand-gold transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="xl:hidden bg-brand-navy border-b border-brand-border px-4 py-4 space-y-4 shadow-xl">
            <nav className="flex flex-col gap-2">
              {(state.navItems || []).map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    smoothScrollTo(item.target);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left font-semibold hover:text-brand-gold text-brand-textMain py-2 px-2"
                >
                  {item.label}
                </button>
              ))}
              <div className="h-px bg-brand-border my-2"></div>
              <Link
                to="/affiliate"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 text-brand-gold font-bold py-2 px-2"
              >
                <Share2 className="w-4 h-4" />
                Affiliate Program
              </Link>
            </nav>
            <div className="flex flex-col gap-4 pt-4 border-t border-brand-border px-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-brand-textMuted">Tema & Bahasa</span>
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <LanguageSelector />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-brand-textMuted">Mata Uang</span>
                <div className="flex items-center bg-brand-card border border-brand-border rounded-lg p-0.5 text-xs">
                  <button
                    onClick={() => { setCurrency("IDR"); setIsMobileMenuOpen(false); }}
                    className={\`px-4 py-1.5 rounded font-bold transition-colors \${currency === "IDR" ? "bg-brand-gold text-white" : "text-brand-textMuted"}\`}
                  >
                    IDR
                  </button>
                  <button
                    onClick={() => { setCurrency("USD"); setIsMobileMenuOpen(false); }}
                    className={\`px-4 py-1.5 rounded font-bold transition-colors \${currency === "USD" ? "bg-brand-gold text-white" : "text-brand-textMuted"}\`}
                  >
                    USD
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
`;

c = c.replace(
  /            <\/div>\s*<\/div>\s*<\/header>/,
  replacement
);

// 3. Add affiliate case in switch statement
c = c.replace(
  /            case "pricing":\s*return <PricingSection key="pricing" \/>;/,
  '            case "pricing":\n              return <PricingSection key="pricing" />;\n            case "affiliate":\n              return <AffiliateSection key="affiliate" />;'
);

fs.writeFileSync('src/pages/LandingPage.tsx', c);
console.log("Updated LandingPage.tsx");
