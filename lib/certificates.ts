// Document titles and legal entities are taken from the user-supplied
// certificatesforwebsiteupload.zip. Each certificate applies only to the
// entity, site and scope stated in its original PDF.

export type CertificateDocument = {
  title: string;
  file: string;
};

export const featuredCertificates = [
  {
    title: 'ISO 9001:2015',
    type: 'Quality management',
    file: 'park-industries-karnal-iso-9001.pdf',
    image: 'park-industries-karnal-iso-9001.webp',
  },
  {
    title: 'ISO 14001:2015',
    type: 'Environmental management',
    file: 'park-industries-karnal-iso-14001.pdf',
    image: 'park-industries-karnal-iso-14001.webp',
  },
  {
    title: 'ISO 45001:2018',
    type: 'Occupational health and safety',
    file: 'park-industries-karnal-iso-45001.pdf',
    image: 'park-industries-karnal-iso-45001.webp',
  },
  {
    title: 'ZED Gold',
    type: 'MSME Sustainable (ZED) Certification Scheme',
    file: 'park-industries-karnal-zed-gold.pdf',
    image: 'park-industries-karnal-zed-gold.webp',
  },
] as const;

export const plantCertificates: {
  entity: string;
  site: string;
  documents: CertificateDocument[];
}[] = [
  {
    entity: 'P.A.R.K. Industries Pvt. Ltd.',
    site: 'Chennai, Tamil Nadu',
    documents: [
      {title: 'IATF 16949', file: 'park-industries-chennai-iatf-16949.pdf'},
      {title: 'ISO 14001:2015', file: 'park-industries-chennai-iso-14001.pdf'},
      {title: 'ISO 45001:2018', file: 'park-industries-chennai-iso-45001.pdf'},
    ],
  },
  {
    entity: 'P.A.R.K. Felts Pvt. Ltd.',
    site: 'Chennai, Tamil Nadu',
    documents: [
      {title: 'IATF 16949', file: 'park-felts-chennai-iatf-16949.pdf'},
      {title: 'ISO 14001:2015', file: 'park-felts-chennai-iso-14001.pdf'},
      {title: 'ISO 45001:2018', file: 'park-felts-chennai-iso-45001.pdf'},
    ],
  },
  {
    entity: 'P.A.R.K. Industries Pvt. Ltd.',
    site: 'Pune, Maharashtra',
    documents: [
      {title: 'ISO 14001:2015', file: 'park-industries-pune-iso-14001.pdf'},
      {title: 'ISO 45001:2018', file: 'park-industries-pune-iso-45001.pdf'},
    ],
  },
  {
    entity: 'Park Non Woven Private Limited',
    site: 'Bhainswal, Panipat, Haryana',
    documents: [
      {title: 'IATF 16949', file: 'park-nonwoven-bhainswal-iatf-16949.pdf'},
    ],
  },
  {
    entity: 'P.A.R.K. Non-Woven Private Limited',
    site: 'Mehsana, Gujarat',
    documents: [
      {title: 'IATF 16949', file: 'park-nonwoven-gujarat-iatf-16949.pdf'},
      {title: 'ISO 14001:2015', file: 'park-nonwoven-gujarat-iso-14001.pdf'},
      {title: 'ISO 45001:2018', file: 'park-nonwoven-gujarat-iso-45001.pdf'},
    ],
  },
  {
    entity: 'Park Non Woven Private Limited',
    site: 'Plot 298, Panipat, Haryana',
    documents: [
      {title: 'IATF 16949', file: 'park-nonwoven-panipat-iatf-16949.pdf'},
    ],
  },
  {
    entity: 'ESSAR Industries',
    site: 'Karnal, Haryana',
    documents: [
      {title: 'ISO 9001:2015', file: 'essar-iso-9001.pdf'},
    ],
  },
];

export const awards = [
  {
    title: 'Speciality & Innovation MMF Products',
    body: 'Outstanding Export Performance, 2024–25',
    file: 'matexil-speciality-mmf-award-2024-25.pdf',
    image: 'matexil-speciality-mmf-award-2024-25.webp',
  },
  {
    title: 'Polyester Staple Fibre (Recycled)',
    body: 'Outstanding Export Performance, 2024–25',
    file: 'matexil-recycled-polyester-award-2024-25.pdf',
    image: 'matexil-recycled-polyester-award-2024-25.webp',
  },
] as const;
