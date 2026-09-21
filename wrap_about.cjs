const fs = require('fs');
let code = fs.readFileSync('src/components/AboutSection.tsx', 'utf8');

if (!code.includes('EditableText')) {
  code = code.replace("import { ThemeToggle } from '../components/ThemeToggle';", "import { ThemeToggle } from '../components/ThemeToggle';\nimport { EditableText } from '../components/admin/EditableText';");
}

code = code.replace(
  "Siklus 9 Tahap Transformasi Bisnis Berkelanjutan",
  "<EditableText id=\"about.stages.title\" default=\"Siklus 9 Tahap Transformasi Bisnis Berkelanjutan\" />"
);

code = code.replace(
  "Satu-satunya kerangka kerja yang menghubungkan identifikasi kebocoran nilai dengan orkestrasi eksekusi multi-sistem secara otomatis.",
  "<EditableText id=\"about.stages.subtitle\" default=\"Satu-satunya kerangka kerja yang menghubungkan identifikasi kebocoran nilai dengan orkestrasi eksekusi multi-sistem secara otomatis.\" className=\"block\" />"
);

code = code.replace(
  "Kerahasiaan Data Bisnis Anda Adalah Fondasi Kami",
  "<EditableText id=\"about.security.title\" default=\"Kerahasiaan Data Bisnis Anda Adalah Fondasi Kami\" />"
);

code = code.replace(
  "Kami memahami bahwa data keuangan, margin, dan transaksi pelanggan adalah rahasia dagang paling berharga. BuildUp dirancang dengan prinsip pertahanan berlapis (defense-in-depth):",
  "<EditableText id=\"about.security.desc\" default=\"Kami memahami bahwa data keuangan, margin, dan transaksi pelanggan adalah rahasia dagang paling berharga. BuildUp dirancang dengan prinsip pertahanan berlapis (defense-in-depth):\" className=\"block w-full\" />"
);

code = code.replace(
  "Siap Memulai Transformasi Bisnis Bersama BuildUp?",
  "<EditableText id=\"about.cta.title\" default=\"Siap Memulai Transformasi Bisnis Bersama BuildUp?\" />"
);

code = code.replace(
  "Ikuti ratusan pimpinan bisnis yang telah menghentikan kebocoran margin dan mempercepat perputaran modal kerja.",
  "<EditableText id=\"about.cta.subtitle\" default=\"Ikuti ratusan pimpinan bisnis yang telah menghentikan kebocoran margin dan mempercepat perputaran modal kerja.\" className=\"block w-full\" />"
);

fs.writeFileSync('src/components/AboutSection.tsx', code);
