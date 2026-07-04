/**
 * Real NEVARA content — extracted from delivered reports in /Reports.
 * Nothing here is invented; every figure traces to a report page.
 */

export interface Project {
  slug: string;
  name: string;
  location: string;
  partner?: string;
  assessment: string;
  period: string;
  reference: string;
  cover: string;
  highlight?: string;
  /** Folder under /assets/reports and its rendered page count. */
  reportDir: string;
  pageCount: number;
  /** Verified before/after parameters (impact-verification reports only). */
  beforeAfter?: Array<{ parameter: string; before: string; after: string; change: string }>;
  /** Verified satellite observations (baseline / pre-feasibility reports). */
  observations?: Array<{ label: string; value: string; note: string }>;
}

/** Pages visitors may browse per report in the public interactive viewer. */
export const PUBLIC_PREVIEW_PAGES = 5;

export const projects: Project[] = [
  {
    slug: 'bommasandra',
    name: 'Bommasandra Lake',
    location: 'South Bangalore, Karnataka',
    partner: 'Twin Glacier Foundation',
    assessment: 'Restoration Impact Verification',
    period: '2019 – 2025',
    reference: 'TGF-BL-RIVR-2026-001',
    cover: '/assets/reports/bommasandra/page_01.webp',
    highlight:
      'NDWI rose from −0.183 to +0.050 across the 7.633-hectare basin — the lake crossed back over the boundary between dry land and a functioning water body.',
    reportDir: 'bommasandra',
    pageCount: 16,
    // Verified parameter comparison, report page 5 (TGF-BL-RIVR-2026-001).
    beforeAfter: [
      { parameter: 'NDWI', before: '−0.183', after: '+0.050', change: '+0.233' },
      { parameter: 'NDVI', before: '0.302', after: '0.086', change: '−71.5%' },
      { parameter: 'Open water', before: 'Minimal', after: 'Expanded', change: 'Restored' },
      { parameter: 'Thermal stress', before: 'High', after: 'Reduced', change: 'Improved' },
      { parameter: 'Basin habitat', before: 'Degraded', after: 'Active', change: 'Functional' },
    ],
  },
  {
    slug: 'doddathoguru',
    name: 'Doddathoguru Lake',
    location: 'Karnataka',
    partner: 'Twin Glacier Foundation',
    assessment: 'Restoration Intelligence Assessment',
    period: 'June 2026',
    reference: 'TGL-RIA-DL-2026-001',
    cover: '/assets/reports/doddathoguru/page_01.webp',
    reportDir: 'doddathoguru',
    pageCount: 11,
  },
  {
    slug: 'jonnahalli-1',
    name: 'Jonnahalli Lake 1',
    location: 'Devanahalli, Karnataka',
    assessment: 'Restoration Intelligence Assessment',
    period: 'May 2026',
    reference: 'NEV-RIA-JHL-2026-001',
    cover: '/assets/reports/mrv-baseline/page_01.webp',
    reportDir: 'mrv-baseline',
    pageCount: 11,
  },
  {
    slug: 'jonnahalli-2',
    name: 'Jonnahalli Lake 2',
    location: 'Devanahalli, Karnataka',
    assessment: 'Restoration Intelligence Assessment',
    period: 'May 2026',
    reference: 'NEV-RIA-JHL2-2026-002',
    cover: '/assets/reports/jonnahalli/page_02.webp',
    reportDir: 'jonnahalli',
    pageCount: 13,
    // Verified satellite observations, executive summary (NEV-RIA-JHL2-2026-002).
    observations: [
      { label: 'Mean NDVI', value: '0.238', note: 'Sparse vegetation' },
      { label: 'Mean NDWI', value: '−0.278', note: 'Low moisture' },
      { label: 'Mean LST', value: '34.64 °C', note: 'Elevated thermal' },
      { label: 'Suitability', value: '0.389', note: 'Moderate potential' },
      { label: 'Ecological stress', value: '−0.240', note: 'Moderate stress' },
    ],
  },
  {
    slug: 'handenahalli',
    name: 'Handenahalli Lake',
    location: 'Karnataka',
    partner: 'SayTrees Environmental Trust',
    assessment: 'Restoration Baseline Assessment',
    period: 'May 2026',
    reference: 'Baseline · v1.0',
    cover: '/assets/reports/saytrees/page_01.webp',
    reportDir: 'saytrees',
    pageCount: 15,
  },
];

/** Assessment methodology — the four steps every engagement follows. */
export const methodology = [
  {
    n: '01',
    title: 'Acquire',
    text: 'Sentinel-2 MSI and Landsat 8/9 imagery is gathered for every registered site, pass after pass, processed through Google Earth Engine.',
  },
  {
    n: '02',
    title: 'Analyse',
    text: 'Spectral, terrain and thermal analysis reads the condition of vegetation, water and land.',
  },
  {
    n: '03',
    title: 'Verify',
    text: 'Findings are cross-checked against historical baselines and multiple independent sources.',
  },
  {
    n: '04',
    title: 'Deliver',
    text: 'Evidence arrives as a referenced, audit-ready report — clear enough for a board, rigorous enough for an auditor.',
  },
];

export const companyInfo = {
  name: 'NEVARA',
  fullName: 'Natural Environmental Verification & Registry Authority',
  line: 'Environmental Intelligence. Verified from space.',
  description:
    'NEVARA converts satellite observations into audit-ready environmental evidence — pre-feasibility assessments, restoration baselines and impact verification for lakes, forests and wetlands.',
};

export interface EvidenceCard {
  src: string;
  label: string;
  project: string;
  caption: string;
}

/**
 * Curated single pages from delivered reports — each demonstrates one part
 * of the work (cover, analysis, evidence, findings, roadmap, conclusion).
 * Never the full report: one page per card, inspected and selected by hand
 * from the actual rendered pages under /assets/reports/<dir>/.
 */
export const evidenceShowcase: EvidenceCard[] = [
  {
    src: '/assets/reports/bommasandra/page_01.webp',
    label: 'Restoration Impact Verification',
    project: 'Bommasandra Lake',
    caption: 'The quality of the final deliverable.',
  },
  {
    src: '/assets/reports/bommasandra/page_02.webp',
    label: 'Executive Summary',
    project: 'Bommasandra Lake',
    caption: 'Complex analysis, resolved into a decision.',
  },
  {
    src: '/assets/reports/bommasandra/page_09.webp',
    label: 'Environmental Change Analysis',
    project: 'Bommasandra Lake',
    caption: 'A basin crossing from dry land to water.',
  },
  {
    src: '/assets/reports/saytrees/page_03.webp',
    label: 'Satellite Evidence',
    project: 'Handenahalli Lake',
    caption: 'Findings anchored in geospatial data.',
  },
  {
    src: '/assets/reports/bommasandra/page_12.webp',
    label: 'Impact Validation',
    project: 'Bommasandra Lake',
    caption: 'Analysis, made defensible.',
  },
  {
    src: '/assets/reports/doddathoguru/page_10.webp',
    label: 'Restoration Roadmap',
    project: 'Doddathoguru Lake',
    caption: 'Intelligence that supports action.',
  },
  {
    src: '/assets/reports/jonnahalli/page_12.webp',
    label: 'Decision-Ready Conclusions',
    project: 'Jonnahalli Lake 2',
    caption: 'Where the intelligence workflow ends.',
  },
];

export interface IndexRow {
  abbr: string;
  name: string;
  reveals: string;
}

export const intelligenceIndices: IndexRow[] = [
  {
    abbr: 'NDVI',
    name: 'Vegetation Index',
    reveals: 'The health and density of living vegetation — where an ecosystem is growing, and where it is thinning.',
  },
  {
    abbr: 'NDWI',
    name: 'Water Index',
    reveals: 'The presence and consistency of surface water. Crossing zero marks the line between dry land and a living water body.',
  },
  {
    abbr: 'LULC',
    name: 'Land Cover',
    reveals: 'How land is actually being used — water, vegetation, bare soil, built area — and how that mix shifts over time.',
  },
  {
    abbr: 'LST',
    name: 'Surface Temperature',
    reveals: 'Thermal stress across a site. Degraded land runs hot; recovering ecosystems cool.',
  },
  {
    abbr: 'Δt',
    name: 'Historical Change',
    reveals: 'The same ground, observed across years of satellite passes — decline and recovery as a measurable trajectory.',
  },
];

export const partners = ['Twin Glacier Foundation', 'SayTrees Environmental Trust', 'Jalposhan'];

/** Temporary recipient until official contact details are provided. */
export const contactEmail = 'tahir.tamam.005@gmail.com';
