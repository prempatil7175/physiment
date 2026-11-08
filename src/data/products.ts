import { RawCategoryGroup, Product } from '../types';

export const RAW_PRODUCT_PAYLOAD: RawCategoryGroup[] = [
  {
    category: "PHYSIDAP",
    products: [
      {
        name: "PHYSIDAP 10",
        composition: "Dapagliflozin Propanediol Monohydrate (Eq. to 10 mg), Sitagliptin Phosphate Monohydrate IP. Colours: Ferric oxide USPNF yellow & titanium dioxide IP",
        price: "110/-"
      },
      {
        name: "PHYSIDAP S 10/100",
        composition: "Sitagliptin (100 mg), Dapagliflozin (10 mg)",
        price: "110/-"
      },
      {
        name: "PHYSIDAP TRIO",
        composition: "Dapagliflozin (10 mg), Sitagliptin (100 mg), Metformin Hydrochloride IP (500 mg)",
        price: "110/-"
      }
    ]
  },
  {
    category: "PHYSITEL",
    products: [
      {
        name: "PHYSITEL 40",
        composition: "Telmisartan IP (40 mg)",
        price: "54/-"
      },
      {
        name: "PHYSITEL 80",
        composition: "Telmisartan (80 mg), Excipients q.s",
        price: "54/-"
      },
      {
        name: "PHYSITEL LN 10/40",
        composition: "Cilnidipine IP (10 mg), Excipients (40 mg)",
        price: "85/-"
      },
      {
        name: "PHYSITEL CT 6.25",
        composition: "Telmisartan IP (40 mg), Chlorthalidone IP (6.25 mg)",
        price: "TBD"
      },
      {
        name: "PHYSITEL TRIO",
        composition: "Cilnidipine IP (10 mg), Telmisartan IP (40 mg), Chlorthalidone IP (6.25 mg)",
        price: "110/-"
      },
      {
        name: "PHYSITEL M 25",
        composition: "Telmisartan IP (40 mg), Metoprolol Succinate IP (23.75 mg) Eq. to 25 mg (Extended Release)",
        price: "119/-"
      }
    ]
  },
  {
    category: "CARDIAC & DIABETIC CARE",
    products: [
      {
        name: "CV-ACS",
        composition: "Ticagrelor IP (90 mg)",
        price: "415/-"
      },
      {
        name: "PHYGIL XR-30",
        composition: "Gliclazide IP (30 mg)",
        price: "59/-"
      },
      {
        name: "PHYGIL XR-60",
        composition: "Gliclazide IP (60 mg)",
        price: "89/-"
      },
      {
        name: "PHYGIL M XR-60",
        composition: "Gliclazide IP (60 mg), Metformin Hydrochloride IP (500 mg)",
        price: "120/-"
      }
    ]
  },
  {
    category: "GASTROINTESTINAL & MULTIVITAMINS",
    products: [
      {
        name: "PHYSOME-40",
        composition: "Esomeprazole 40",
        price: "84/-"
      },
      {
        name: "PHYSOME-DSR",
        composition: "Esomeprazole 40 (EC) + Domperidone 30 (SR)",
        price: "98/-"
      },
      {
        name: "DALMECO",
        composition: "Alphalipoic Acid 100mg + Methylcobalamin 1500mcg + Pyridoxine 3mg + Folic Acid 1.5mg + Vit D3 1000 IU",
        price: "158/-"
      },
      {
        name: "PHYSIWELL",
        composition: "Lycopene (10%), Vitamin A, E, C, Green Tea Extract, Selenium, Biotin, Zinc, Magnesium, Manganese and complete multivitamin profile",
        price: "145/-"
      }
    ]
  }
];

// Helper to determine clinical metadata based on category and formula
export const ENRICHED_PRODUCTS: Product[] = RAW_PRODUCT_PAYLOAD.flatMap((catGroup) => {
  return catGroup.products.map((item, index) => {
    const slug = `${catGroup.category}-${item.name}`.toLowerCase().replace(/[^a-z0-9]/g, '-');
    
    // Determine category specific theme and badge details
    let formType: Product['formType'] = 'Tablet';
    let accentGradient = 'from-blue-600 to-cyan-500';
    let badgeColor = 'bg-blue-50 text-blue-700 border-blue-200';
    let glowColor = 'rgba(0, 102, 255, 0.4)';
    let indications: string[] = ['Prescription Only', 'Oral Solid Dosage'];
    let therapeuticArea = 'Metabolic Therapeutics';
    let packagingUnit = '10 x 10 Blister Pack';

    if (item.composition.includes('Extended Release') || item.name.includes('XR')) {
      formType = 'Extended Release';
    } else if (item.composition.includes('(SR)') || item.composition.includes('(EC)')) {
      formType = 'Sustained Release';
    } else if (item.name.includes('TRIO')) {
      formType = 'Bilayered';
    }

    if (catGroup.category === 'PHYSIDAP') {
      accentGradient = 'from-emerald-600 via-teal-500 to-cyan-500';
      badgeColor = 'bg-emerald-50 text-emerald-800 border-emerald-200';
      glowColor = 'rgba(16, 185, 129, 0.45)';
      therapeuticArea = 'Type-2 Diabetes Mellitus & Cardio-Renal Care';
      indications = ['SGLT2 Inhibitor', 'DPP-4 Combination', 'Glycemic Control', 'Renal Protection'];
    } else if (catGroup.category === 'PHYSITEL') {
      accentGradient = 'from-blue-700 via-indigo-600 to-sky-500';
      badgeColor = 'bg-blue-50 text-blue-800 border-blue-200';
      glowColor = 'rgba(37, 99, 235, 0.45)';
      therapeuticArea = 'Hypertension & Cardiovascular Risk Reduction';
      indications = ['ARB Class', 'Blood Pressure Regulation', 'End-organ Defense'];
    } else if (catGroup.category === 'CARDIAC & DIABETIC CARE') {
      accentGradient = 'from-rose-600 via-red-500 to-amber-500';
      badgeColor = 'bg-rose-50 text-rose-800 border-rose-200';
      glowColor = 'rgba(244, 63, 94, 0.45)';
      therapeuticArea = 'Advanced Cardiology & Glycemic Management';
      indications = ['Antiplatelet / Acute Coronary', 'Sulfonylurea Matrix', 'Cardiovascular Stability'];
    } else if (catGroup.category === 'GASTROINTESTINAL & MULTIVITAMINS') {
      accentGradient = 'from-violet-600 via-purple-500 to-fuchsia-500';
      badgeColor = 'bg-violet-50 text-violet-800 border-violet-200';
      glowColor = 'rgba(139, 92, 246, 0.45)';
      therapeuticArea = 'Gastrointestinal & Restorative Cellular Nutrition';
      indications = ['Proton Pump Inhibitor', 'Antioxidant Complex', 'Neural Health', 'Bioavailability Boost'];
    }

    // Extract strength or variant shorthand for clean display
    const parts = item.name.split(' ');
    const brandVariant = parts.slice(1).join(' ') || 'Standard Formulation';
    const strengthBadge = parts.slice(1).join(' ') || item.name;

    return {
      ...item,
      id: slug,
      category: catGroup.category,
      brandVariant,
      strengthBadge,
      formType,
      accentGradient,
      badgeColor,
      glowColor,
      indications,
      therapeuticArea,
      packagingUnit,
      scheduleCategory: 'Schedule H / Prescription Drug',
      isActiveCompound: true,
    };
  });
});

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Quality', href: '#quality' },
  { label: 'Our Product', href: '#products', active: true },
  { label: 'CFA and Stockist', href: '#cfa' },
  { label: 'Blogs', href: '#blogs' },
  { label: 'Career', href: '#career' },
  { label: 'Contact Us', href: '#contact' },
];

export const COMPANY_CONTACT = {
  name: "Physiment Pharma Pvt. Ltd.",
  tagline: "Accelerating Access to Quality Medicines for People Everywhere",
  address: "Unit No. 105, Aradhya One C-wing Chsl, Pestom Sagar, Amar Mahal, Chembur (w), Mumbai-Maharastra 400089",
  emails: ["info@physimentpharma.com"],
  phones: ["+91 85919 21818", "+91 22315 90863"],
  socials: [
    { name: "Facebook", href: "https://facebook.com", color: "hover:text-blue-500 hover:border-blue-500/50" },
    { name: "Instagram", href: "https://instagram.com", color: "hover:text-pink-500 hover:border-pink-500/50" },
    { name: "LinkedIn", href: "https://linkedin.com", color: "hover:text-blue-400 hover:border-blue-400/50" },
    { name: "Twitter", href: "https://twitter.com", color: "hover:text-sky-400 hover:border-sky-400/50" },
    { name: "WhatsApp", href: "https://wa.me/918591921818", color: "hover:text-emerald-400 hover:border-emerald-400/50" },
    { name: "YouTube", href: "https://youtube.com", color: "hover:text-red-500 hover:border-red-500/50" },
  ]
};

