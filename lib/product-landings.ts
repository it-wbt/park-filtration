export type LandingFaq = { question: string; answer: string };
export type LandingSection = {
  title: string;
  paragraphs: string[];
  paragraphLinks?: { before: string; label: string; href: string; after?: string }[];
};
export type LandingSpecificationTable = {
  caption: string;
  headers: string[];
  rows: string[][];
  note?: string;
};
export type ProductLandingContent = {
  slug: string;
  baseSlug: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  sections: LandingSection[];
  specifications: [string, string][];
  specificationTables?: LandingSpecificationTable[];
  applications: string[];
  faqs: LandingFaq[];
  resources: { label: string; href: string }[];
  ctaHeading?: string;
  ctaText?: string;
};

export const productLandings: Record<string, ProductLandingContent> = {
  'pocket-filters': {
    slug: 'pocket-filters', baseSlug: 'pocket-filter',
    title: 'Pocket Air Filter Manufacturer | Synthetic HVAC Filters',
    description: 'Synthetic pocket air filters for HVAC and AHU systems. Review PARK-listed grades and frame options; confirm PFA/PFAH/HV3 references, dimensions, and OEM fit.',
    h1: 'Pocket Air Filter Manufacturer for HVAC and AHU Systems',
    intro: 'PARK Nonwoven Filtration offers a synthetic pocket air filter for HVAC and air-handling applications in its catalogue. The pocket format uses an extended surface of media supported by a frame, but the format alone does not establish efficiency, pressure drop, energy savings, or fit for every AHU. When comparing a pocket filter manufacturer for a replacement, specify the required class, design airflow, frame dimensions, pocket arrangement, and installation details. PARK lists standard and special sizes, metal or plastic frames, and classification references under EN 779 and ISO 16890. The supplied product information does not define PFA, PFAH, or HV3 codes or confirm exact nominal sizes used in buyer searches. Send the equipment reference, filter label, and drawing so availability and dimensions can be checked before ordering.',
    sections: [
      { title: 'What Is a Pocket Air Filter and How Does It Work?', paragraphs: [
        'A pocket air filter is an HVAC filter with flexible media formed into pockets on a supporting frame. Air passes through the media, which retains particles. Pocket depth, layout, grade, frame and airflow affect selection; the word “pocket” alone states neither efficiency nor pressure drop.',
        'For an AHU replacement, match the system schedule and installed part. Confirm face dimensions, depth, header, seal and airflow. HVAC pocket filters are not interchangeable with industrial dust-collector bags.',
      ]},
      { title: 'Choose a Pocket Filter Grade for Your AHU', paragraphs: [
        'PARK lists ISO 16890 references of ISO Coarse 75%, ePM10 55% and 70%, ePM2.5 65%, and ePM1 70% and 80%, plus EN 779 references G4, M5, M6, F7, F8 and F9. These are catalogue options; availability by size or series needs confirmation.',
        'Specify the class in the project documents and request technical data for the exact product. Keep EN 779 references separate from ISO 16890; do not assume direct conversion or transfer a rating between sizes without evidence.',
      ], paragraphLinks: [
        { before: 'For the role of each air-filter format, see the ', label: 'panel, pocket, and HEPA air filters', href: '/resources/panel-pocket-hepa-air-filters', after: '.' },
      ]},
      { title: 'PFA, PFAH and HV3: Confirm the Series Before Specification', paragraphs: [
        'The supplied PARK catalogue does not define PFA pre filter pockets, PFAH pocket filter or HV3 pocket filter as PARK model codes or identify their filtration stages. Treat them as references from a buyer label or equipment schedule until PARK confirms their meaning and availability.',
        'Send the original label, drawing and system specification. Ask PARK to confirm each code, stage, grade, dimensions and intended application before comparing series.',
      ]},
      { title: 'Pocket Filter Media and Seam Construction', paragraphs: [
        'PARK identifies synthetic media but does not specify progressive density, electrostatic meltblown, non-shedding test results or ultrasonic welding for pocket filters. If your specification requires these features, request a product-specific datasheet.',
        'Ultrasonic welding and stitching describe seam methods; neither proves efficiency, leakage control or fibre performance. Ask how pockets are constructed and request supporting tests for the exact size, grade and airflow.',
      ], paragraphLinks: [
        { before: 'Explore the listed materials and processes on the ', label: 'nonwoven filtration media rolls', href: '/filtration-media', after: ' page; confirm raw-roll format and dimensions for your specific requirement.' },
      ]},
      { title: 'Standard Pocket Air Filter Sizes and Configurations', paragraphs: [
        'The terms 24x24x22 and 24x12x22 are buyer references, not sizes confirmed in PARK’s published pocket-filter schedule. PARK lists standard and special sizes but no actual frame dimensions or pocket counts. Verify the header measurements; nominal size alone does not prove fit.',
        'PARK lists metal or plastic frames but no alloy or polymer specifics. Provide width, height, depth, pocket layout, seal and photos. Confirm actual metric dimensions and tolerances before approval.',
      ]},
      { title: 'Applications Listed for PARK Pocket Filters', paragraphs: [
        'PARK lists HVAC and air handling, industrial environments, medical facilities, hospitals, laboratories, shopping centres, public institutions and paint booths. These are stated application areas, not guaranteed fit for every process.',
        'Pharmaceutical cleanroom pre-filtration and gas-turbine intake are not specified for this product. Share operating conditions and required evidence, then request written suitability confirmation.',
      ]},
      { title: 'Airflow, Pressure Drop and Fan Energy', paragraphs: [
        'Evaluate pressure drop at the specified airflow for the selected size, grade and construction. PARK publishes no model-specific initial or final values in the supplied catalogue. Request a curve or test data for the quoted configuration.',
        'Fan energy depends on the AHU, controls, operating hours and filter loading. Compare pressure-drop data at the same airflow and condition; have the system designer assess energy impact.',
      ]},
      { title: 'Prepare a Manufacturer and OEM Enquiry', paragraphs: [
        'Send the AHU make and model, installed filter label, grade, airflow, allowable pressure drop, dimensions, pocket layout, seal and quantity. Attach a drawing or photos; include source documents for any PFA, PFAH or HV3 reference.',
        'Ask the supplier to confirm grade, frame material, dimensions, seam construction and test information. If you need a technical datasheet or sample pocket, request availability and timing; the catalogue does not establish either.',
      ], paragraphLinks: [
        { before: 'Browse the ', label: 'industrial air and liquid filtration products', href: '/products', after: ' catalogue for the wider range.' },
        { before: 'Use the ', label: 'industrial filter selection guide', href: '/resources/filter-selection', after: ' to organize the specification.' },
      ]},
    ],
    specifications: [],
    specificationTables: [
      {
        caption: 'PFA / PFAH / HV3 series comparison — complete only with factory-confirmed data',
        headers: ['Buyer reference', 'Filtration stage', 'Efficiency standard / class', 'Media construction', 'Initial and final pressure drop', 'Recommended application'],
        rows: [
          ['PFA', '[INSERT FACTORY-CONFIRMED STAGE]', '[INSERT VALIDATED CLASS AND STANDARD]', '[INSERT CONFIRMED MEDIA CONSTRUCTION]', '[INSERT INITIAL Pa AT AIRFLOW] / [INSERT FINAL Pa]', '[INSERT FACTORY-CONFIRMED APPLICATION]'],
          ['PFAH', '[INSERT FACTORY-CONFIRMED STAGE]', '[INSERT VALIDATED CLASS AND STANDARD]', '[INSERT CONFIRMED MEDIA CONSTRUCTION]', '[INSERT INITIAL Pa AT AIRFLOW] / [INSERT FINAL Pa]', '[INSERT FACTORY-CONFIRMED APPLICATION]'],
          ['HV3', '[INSERT FACTORY-CONFIRMED STAGE]', '[INSERT VALIDATED CLASS AND STANDARD]', '[INSERT CONFIRMED MEDIA CONSTRUCTION]', '[INSERT INITIAL Pa AT AIRFLOW] / [INSERT FINAL Pa]', '[INSERT FACTORY-CONFIRMED APPLICATION]'],
        ],
        note: 'These terms are buyer search references, not series definitions in PARK’s supplied catalogue. Confirm code meaning, availability, test basis and application before publishing a comparison.',
      },
      {
        caption: 'Nominal pocket-filter size and OEM configuration — verify actual dimensions before order',
        headers: ['Buyer-requested nominal size', 'Actual metric dimensions', 'Pocket count', 'Frame material', 'OEM / custom availability'],
        rows: [
          ['24x24x22', '[INSERT VERIFIED ACTUAL WIDTH × HEIGHT × DEPTH IN mm]', '[INSERT FACTORY-VERIFIED COUNT]', '[INSERT FACTORY-VERIFIED MATERIAL]', '[CONFIRM FOR THIS CONFIGURATION]'],
          ['24x12x22', '[INSERT VERIFIED ACTUAL WIDTH × HEIGHT × DEPTH IN mm]', '[INSERT FACTORY-VERIFIED COUNT]', '[INSERT FACTORY-VERIFIED MATERIAL]', '[CONFIRM FOR THIS CONFIGURATION]'],
          ['Custom / drawing-based', '[INSERT VERIFIED ACTUAL WIDTH × HEIGHT × DEPTH IN mm]', '[INSERT REQUIRED COUNT]', '[INSERT FACTORY-VERIFIED MATERIAL]', '[CONFIRM AFTER DRAWING REVIEW]'],
        ],
        note: 'The PARK catalogue lists standard and special sizes and metal or plastic frames, but does not publish this size schedule, pocket counts or exact frame alloys/polymers.',
      },
    ],
    applications: ['HVAC and air-handling systems', 'Industrial environments', 'Medical facilities and hospitals', 'Laboratories', 'Shopping centres', 'Public institutions', 'Paint booths'],
    faqs: [
      { question: 'What is a pocket air filter?', answer: 'An HVAC filter with flexible media pockets on a support frame. Match its grade, airflow, dimensions and frame to the AHU.' },
      { question: 'Does PARK offer PFA, PFAH or HV3 pocket-filter series?', answer: 'The catalogue does not define them as PARK codes or identify stages. Send the label and drawing for confirmation.' },
      { question: 'Are 24x24x22 and 24x12x22 standard PARK pocket-air-filter sizes?', answer: 'PARK lists standard and special sizes, but does not confirm these dimensions. Send actual header measurements and a drawing to verify fit and pocket count.' },
      { question: 'How does ultrasonic-welded synthetic media differ from fiberglass pocket media?', answer: 'These terms describe media type and seam method. PARK lists synthetic media but does not specify fiberglass or ultrasonic seams; request construction and test data.' },
    ],
    ctaHeading: 'Request a pocket-filter specification review',
    ctaText: 'Send the AHU model, filter label, drawing, required grade and airflow. If your approval process needs a technical datasheet or sample pocket, ask us to confirm availability and timing with the proposed OEM quote.',
    resources: [
      { label: 'Panel, pocket and HEPA air-filter selection guide', href: '/resources/panel-pocket-hepa-air-filters' },
      { label: 'Industrial filter selection guide', href: '/resources/filter-selection' },
    ],
  },
  'dust-collector-bag-filters': {
    slug: 'dust-collector-bag-filters', baseSlug: 'bag-filter',
    title: 'Dust Collector Filter Bags Manufacturer | PARK Filtration',
    description: 'Specify PARK industrial dust-collector filter bags by media, collector dimensions and process conditions. Review listed materials and applications; confirm product-specific limits.',
    h1: 'Dust Collector Filter Bags Manufacturer for Industrial Systems',
    intro: 'PARK Nonwoven Filtration offers industrial bag filters for process dust collection. The supplied product information lists multiple media options, standard and special sizes, and metal or plastic ring and frame options. Selection depends on the dust collector, process conditions and exact assembly. Share the collector model, current bag reference and drawing to confirm a suitable construction and obtain product-specific technical details.',
    sections: [
      { title: 'Industrial filter bags for dust collection', paragraphs: [
        'Industrial bag filters separate particulate matter from process air in dust-collection equipment. The bag, attachment, support and cleaning arrangement must match the collector. PARK lists this family for cement, steel, foundries, power, chemical processing, mining, food, woodworking, material handling, manufacturing, and paint or coating applications.',
        'An application list is a starting point for discussion, not a guarantee that one bag material is compatible with every process in that sector. Describe the dust, the collection point and the equipment so the media and construction can be reviewed against your actual duty.',
      ]},
      { title: 'Catalogue-listed materials', paragraphs: [
        'PARK’s supplied catalogue lists PET (polyester), PPS, PTFE, glass fibre, aramid, polypropylene (PP), homopolymer acrylic (HPA) and P84 among the industrial bag-filter media options. These materials are not interchangeable, and the catalogue does not assign each one to every application, temperature or chemical condition. Request confirmation of the exact medium and finished bag configuration.',
        'Quote the specified material or grade exactly. Include required test documents and ask whether they apply to the proposed assembly; a fibre name alone does not establish performance or operating limits.',
      ]},
      { title: 'Match size and mounting to the collector', paragraphs: [
        'The catalogue lists standard and special sizes, with metal or plastic ring and frame options. A replacement still needs to match the tube sheet, cage or support arrangement, bag length, attachment and sealing interface. Provide the collector make and model, existing part number, drawing and measured dimensions. Photographs of the top connection and the full bag can clarify the assembly when a drawing is unavailable.',
        'No universal dimensions or tolerance schedule is published. Mark open values as [INSERT BAG DIAMETER], [INSERT BAG LENGTH] and [INSERT ATTACHMENT DETAILS], then verify the drawing and fit before ordering.',
      ]},
      { title: 'Describe the process conditions', paragraphs: [
        'Useful technical inputs include dust composition, particle characteristics, moisture exposure, normal and peak process temperature, chemical exposure, airflow, cleaning method and operating cycle. These are buyer-side requirements; they are not published PARK performance limits. The selected material and assembly must be checked against the actual collector and process conditions.',
        'If a bag failed early, share a photograph, maintenance history and any process change. Describe damage, blinding or abrasion; a diagnosis still needs evidence from the actual installation.',
      ]},
      { title: 'Recycling and end-of-life questions', paragraphs: [
        'Recycling, cleaning or reuse depends on the filter material, construction, collected dust and local waste requirements. PARK’s product information does not confirm those options for used bags; ask about the specific filter and contamination.',
        '“Bag filters for recycling industry” does not define a dust stream or prove suitability. Describe the operation, dust and collector conditions for review. Ask your waste handler about disposal.',
      ]},
      { title: 'Prepare a comparable quotation request', paragraphs: [
        'Send the collector reference, current bag specification, dimensions, ring or frame requirements, process description, operating information, requested medium and quantity. Attach the drawing and list any documents required for technical approval. Ask the supplier to confirm the exact assembly, selected material and supporting performance evidence in writing.',
        'For a fair comparison, keep any proposed material or construction substitution visible for engineering and procurement review.',
      ]},
    ],
    specifications: [
      ['Catalogue media options', 'PET, PPS, PTFE, glass fibre, aramid, PP, HPA and P84; confirm selected material'],
      ['Sizes', 'Standard and special sizes listed; exact dimensions require confirmation'],
      ['Ring / frame', 'Metal or plastic options listed; confirm collector interface'],
      ['Bag dimensions', '[INSERT EXACT DIAMETER] × [INSERT EXACT LENGTH]'],
      ['Operating temperature', '[INSERT PROCESS TEMPERATURE RANGE]'],
      ['Pressure drop / airflow', '[INSERT REQUIRED AIRFLOW] / [INSERT ALLOWABLE PRESSURE DROP]'],
      ['Efficiency and test evidence', '[INSERT REQUIRED CLASS AND TEST REPORT FOR SELECTED ASSEMBLY]'],
      ['GSM', '[INSERT EXACT GSM FOR SELECTED MEDIA]'],
    ],
    applications: ['Cement and construction', 'Steel and metals', 'Foundries', 'Power plants', 'Chemical and pharmaceutical processing', 'Mining and minerals', 'Food processing', 'Wood and furniture', 'Material handling', 'Automotive and general manufacturing', 'Paint and coating'],
    faqs: [
      { question: 'Which materials are listed for PARK dust-collector bags?', answer: 'The supplied catalogue lists PET, PPS, PTFE, glass fibre, aramid, PP, HPA and P84. Confirm which material is available and appropriate for the specific dust, collector and process conditions.' },
      { question: 'Can used baghouse filter bags be recycled or reused?', answer: 'The PARK catalogue does not confirm recycling or reuse for used bags. Check the exact material and dust contamination with the supplier and your responsible waste handler before selecting an end-of-life route.' },
      { question: 'Are PARK filter bags listed for recycling-industry applications?', answer: 'The catalogue does not specifically list the recycling industry. Share the process, dust description, operating conditions and collector details so suitability can be reviewed rather than inferred from the industry label.' },
      { question: 'What should I send for a dust-collector bag quotation?', answer: 'Send the collector make and model, existing bag reference, dimensions or drawing, attachment details, dust and process description, temperature, cleaning method, requested material, quantity and documentation requirements.' },
    ],
    resources: [
      { label: 'Dust collector filter-bag selection guide', href: '/resources/dust-collector-filter-bag-selection' },
      { label: 'Bag vs cartridge dust-collection guide', href: '/resources/bag-vs-cartridge-dust-collection' },
      { label: 'Industrial filter selection guide', href: '/resources/filter-selection' },
    ],
  },
  'hepa-filters': {
    slug: 'hepa-filters', baseSlug: 'hepa-filter',
    title: 'HEPA Air Filter Manufacturer | E10 to U15 Options | PARK',
    description: 'Explore PARK fine-filtration air filters with catalogue EN 1822 and ISO 29463 grade references. Confirm the selected grade, seal, dimensions, airflow and test report.',
    h1: 'HEPA Air Filter Manufacturer for Clean and Controlled Environments',
    intro: 'PARK Nonwoven Filtration offers fine-filtration air filters for applications that require a specified high-efficiency filter grade. The product catalogue lists E10, E11, E12, H13, H14 and U15 options under EN 1822, along with ISO 29463 references and different seal types. Each grade is a distinct option. Confirm the selected filter, dimensions and test evidence for the system before specifying or ordering.',
    sections: [
      { title: 'Fine-filtration filters for controlled air', paragraphs: [
        'The PARK HEPA product family is listed for cleanrooms, laboratories, pharmacy, medical equipment, data centres and the food industry. These application areas can have different system requirements and approval processes. Identify the filter stage, the process requirement and the equipment design before choosing a grade or construction.',
        'PARK’s catalogue describes media made from borosilicate micro-glass fibres and synthetic components. Air passes through the fine media and airborne particles are retained. The actual performance depends on the selected grade and finished filter configuration; a general product-family description should not be used as a test result for an individual filter.',
      ]},
      { title: 'Understand the listed grade references', paragraphs: [
        'The supplied product information includes EN 1822 options E10, E11, E12, H13, H14 and U15. It also lists ISO 29463 group references: ISO 15–30 E, ISO 35–45 H and ISO 50 U. These identifiers refer to different classification ranges and should be matched to the project specification. Do not assume every grade, format or seal is available in every dimension.',
        'Ask for the report and classification applicable to the exact filter model and configuration being quoted. If the project names H13 or H14, repeat that requirement precisely and request the corresponding test documentation. Do not apply a numeric efficiency value to the entire product range unless a document supports it for the selected assembly and test basis.',
      ]},
      { title: 'Seal and housing fit are part of the specification', paragraphs: [
        'The catalogue lists different seal types. Confirm the housing interface, filter dimensions, gasket or seal arrangement and installation direction from the equipment drawing. A filter that fits the opening but does not seal correctly may allow air to bypass the media, which can undermine the intended filtration stage.',
        'Provide the equipment manufacturer and model, current filter label, overall dimensions and a drawing or clear photographs. The supplied product information does not provide a universal frame size, seal profile, depth, airflow, pressure-drop limit or dimensional tolerance. Record these values as [INSERT VALUE] until confirmed for the selected unit.',
      ]},
      { title: 'Define airflow and operating requirements', paragraphs: [
        'Share the design airflow and allowable pressure drop from the air-handling specification. Include operating temperature, humidity or other environmental conditions if they are relevant to the application. These figures are system-specific and are not universal PARK product values. Request technical data for the exact grade, size, media pack and seal.',
        'The fine filter may be one stage within a larger air-handling system. Provide information about upstream filtration and installation conditions when they affect the selection. Changes to filter grade or system resistance should be reviewed by the responsible designer or facilities team.',
      ]},
      { title: 'Applications and technical review', paragraphs: [
        'For cleanrooms, laboratories, pharmacy, medical equipment, data centres and food-industry environments, the buyer should identify the relevant process or facility specification. A listed sector does not establish a particular cleanroom class, regulatory approval, sterile condition or contamination-control outcome. Keep the technical claim connected to the approved specification and the filter-specific evidence.',
        'For an enquiry, send the required grade and standard, equipment reference, size, seal type, airflow, pressure-drop limit, quantity and required documents. Request confirmation of the offered construction and the test report before accepting a substitution or releasing an order.',
      ]},
      { title: 'Request a filter-specific quotation', paragraphs: [
        'A complete request allows the proposed product to be checked against the actual housing and specification. Include the drawing, filter label, required classification, operating point and approval-document list. If details are missing, mark them as open requirements rather than relying on an assumed standard size or performance figure.',
        'PARK can discuss the catalogue-listed fine-filtration options and the seal types available for review. The final product specification, technical evidence and system fit should be confirmed in writing for the selected configuration.',
      ]},
    ],
    specifications: [
      ['Media', 'Borosilicate micro-glass fibres with synthetic components'],
      ['Catalogue EN 1822 references', 'E10, E11, E12, H13, H14 and U15'],
      ['Catalogue ISO 29463 references', 'ISO 15–30 E; ISO 35–45 H; ISO 50 U'],
      ['Seal', 'Different seal types listed; confirm required interface'],
      ['Dimensions', '[INSERT EXACT WIDTH × HEIGHT × DEPTH]'],
      ['Airflow / pressure drop', '[INSERT DESIGN AIRFLOW] / [INSERT ALLOWABLE PRESSURE DROP]'],
      ['Operating conditions', '[INSERT TEMPERATURE AND HUMIDITY REQUIREMENTS]'],
      ['Efficiency and report', '[INSERT SELECTED GRADE AND FILTER-SPECIFIC TEST REPORT]'],
    ],
    applications: ['Cleanrooms', 'Laboratories', 'Pharmacy', 'Medical equipment', 'Data centres', 'Food industry'],
    faqs: [
      { question: 'Does every PARK HEPA filter have the same efficiency?', answer: 'No. The catalogue lists multiple EN 1822 and ISO 29463 grade references. Confirm the selected classification and ask for the test report that applies to the exact filter configuration.' },
      { question: 'Can I specify an H13 or H14 HEPA filter?', answer: 'H13 and H14 are among the catalogue-listed options. Provide the required standard, size, airflow, seal and system details, then request product-specific confirmation and supporting test documentation.' },
      { question: 'What information is needed to match a HEPA filter?', answer: 'Provide the equipment model, existing filter label, width, height, depth, seal arrangement, airflow, pressure-drop allowance, required grade and any approval documents needed.' },
      { question: 'Does a HEPA filter remove gases and odours?', answer: 'The PARK HEPA listing describes fine-particle air filtration. Do not assume gas or odour adsorption from a particle-filter grade; specify that function separately and ask which product evidence supports it.' },
    ],
    resources: [
      { label: 'Panel, pocket and HEPA air-filter selection guide', href: '/resources/panel-pocket-hepa-air-filters' },
      { label: 'Industrial filter selection guide', href: '/resources/filter-selection' },
    ],
  },
  'cabin-air-filters': {
    slug: 'cabin-air-filters', baseSlug: 'cabin-air-filter',
    title: 'Automotive Cabin Air Filter Manufacturer | PARK Filtration',
    description: 'Compare PARK particulate, activated-carbon, PM2.5, bio-functional and HEPA cabin-filter variants. Share vehicle fitment and airflow details to confirm the right assembly.',
    h1: 'Automotive Cabin Air Filter Manufacturer for Passenger Vehicles',
    intro: 'PARK Nonwoven Filtration offers cabin air-filter variants for passenger-vehicle ventilation. The supplied product information lists particulate, activated-carbon, fine-dust PM2.5, bio-functional and HEPA options. Choose a variant around the required function, then confirm the vehicle fit, dimensions and airflow with the existing filter reference or drawing. Product-specific performance and fitment details should be verified for the selected assembly.',
    sections: [
      { title: 'Cabin filtration for vehicle ventilation', paragraphs: [
        'A cabin air filter treats air entering the passenger compartment through the vehicle ventilation system. It is different from an engine intake filter and from a compact filter used inside a separate in-car purifier. Confirm which assembly is being replaced before comparing dimensions or media functions.',
        'The PARK catalogue describes cabin products for passenger vehicles and automotive cabin ventilation. The available variants have different functions, so first identify whether the requirement concerns particles, fine dust, odours or a combination. Vehicle make and model, the current filter part number and the housing dimensions help check the fit.',
      ]},
      { title: 'Compare the listed cabin-filter variants', paragraphs: [
        'The particulate variant is described for dust, pollen and PM10-sized particles. An activated-carbon variant adds an adsorption function for certain gases and odours. The fine-dust option is identified as PM2.5, while the product range also lists bio-functional and HEPA variants. These names identify options in the catalogue; they do not define a single common efficiency or operating range.',
        'If a particular contaminant or performance threshold is important, name it in the enquiry and request evidence for the selected variant. Carbon adsorption depends on the target substance and conditions. Do not infer gas-removal performance from a particle-filter description, or apply one variant’s data to another construction.',
      ]},
      { title: 'Confirm fitment before ordering', paragraphs: [
        'Cabin-filter dimensions and attachment features can differ between vehicles. Provide the vehicle make, model, year or platform where relevant, the existing filter reference, and the filter’s length, width and depth. A drawing or clear photograph can help identify the frame, seal and orientation. Confirm fitment against the vehicle or replacement-part specification before ordering.',
        'The supplied PARK catalogue does not provide a complete vehicle-by-vehicle fitment list, universal dimensions, pleat count, frame schedule or dimensional tolerance. Keep those fields open until confirmed: [INSERT VEHICLE FITMENT], [INSERT FILTER DIMENSIONS] and [INSERT FRAME / SEAL DETAILS].',
      ]},
      { title: 'Discuss airflow and media requirements', paragraphs: [
        'The cabin ventilation system needs an appropriate airflow through the installed filter. Share any airflow or pressure-drop requirement in the vehicle or system specification and ask for selected-product data. The source material does not establish one pressure-drop figure for every cabin-filter variant or vehicle.',
        'If the requirement is fine-particle filtration, carbon adsorption or another listed function, clarify which is essential and which is optional. The appropriate variant must fit the available housing and operating conditions. Do not rely on a generic model name as proof of a specific removal rate or service life.',
      ]},
      { title: 'Use claims and supporting data carefully', paragraphs: [
        'Product claims should match the selected filter and supporting documents. For a particulate or PM2.5 request, ask which test method and particle-size basis apply. For an activated-carbon request, identify the gas or odour concern and ask what evidence is available for that substance. For a bio-functional or HEPA variant, request the precise product information and report that supports the stated feature.',
        'The product catalogue lists the variants but does not provide every fitment, efficiency value, pressure-drop curve or replacement interval. Do not copy performance information between variants. Confirm the exact product data before publishing a vehicle compatibility or filtration-performance claim.',
      ]},
      { title: 'Prepare a fitment enquiry', paragraphs: [
        'Send the vehicle details, current filter label or part number, dimensions, housing photographs, requested variant and estimated quantity. Include any airflow or performance requirement supplied by the vehicle or ventilation-system documentation. If the filter is a replacement, compare the proposed drawing and fit details with the existing assembly.',
        'PARK can review the listed cabin-filter options and identify which product details need confirmation. Ask for written confirmation of the variant, dimensions, frame, media function and available supporting evidence for the actual requirement.',
      ]},
    ],
    specifications: [
      ['Variants listed', 'Particulate, activated carbon, fine-dust PM2.5, bio-functional and HEPA'],
      ['Particulate description', 'Dust, pollen and PM10-sized particle capture listed'],
      ['Activated carbon', 'Odour and certain-gas adsorption function listed; confirm target and evidence'],
      ['Vehicle fitment', '[INSERT MAKE / MODEL / YEAR OR PLATFORM]'],
      ['Dimensions / frame', '[INSERT EXACT WIDTH × HEIGHT × DEPTH AND SEAL DETAILS]'],
      ['Airflow / pressure drop', '[INSERT VEHICLE SYSTEM REQUIREMENT]'],
      ['Media weight', '[INSERT EXACT GSM, IF APPLICABLE]'],
      ['Performance evidence', '[INSERT VARIANT-SPECIFIC TEST METHOD AND REPORT]'],
    ],
    applications: ['Passenger vehicles', 'Automotive cabin ventilation'],
    faqs: [
      { question: 'Which cabin air-filter variants does PARK list?', answer: 'The supplied product catalogue lists particulate, activated-carbon, fine-dust PM2.5, bio-functional and HEPA cabin-filter variants. Confirm availability and fitment for the vehicle and selected assembly.' },
      { question: 'Does an activated-carbon cabin filter remove all gases?', answer: 'No universal gas-removal claim is established. The catalogue describes adsorption for certain gases and odours. Specify the target substance and request product-specific supporting data.' },
      { question: 'What details are needed to confirm cabin-filter fit?', answer: 'Share the vehicle make and model, current filter part number, dimensions, housing or filter photographs, requested variant and any airflow requirement.' },
      { question: 'Can a cabin air filter replace an engine air filter?', answer: 'No. A cabin filter treats passenger ventilation air; an engine air filter treats engine intake air. Confirm the product family and vehicle assembly before ordering.' },
    ],
    resources: [
      { label: 'Industrial filter selection guide', href: '/resources/filter-selection' },
    ],
  },
  'liquid-bag-filters': {
    slug: 'liquid-bag-filters', baseSlug: 'liquid-filter',
    title: 'Industrial Liquid Filter Bags Manufacturer | PARK Filtration',
    description: 'Specify PARK polypropylene liquid filter bags by listed micron option, fluid, flow, bag size and sealing ring. Confirm compatibility and test basis for your process.',
    h1: 'Industrial Liquid Filter Bags Manufacturer for Process Filtration',
    intro: 'PARK Nonwoven Filtration offers polypropylene bags for suspended-particle removal in process applications. A micron-rated liquid filter bag must also match the fluid and housing. The catalogue lists customer-specific sizes, polypropylene or stainless-steel sealing rings, and 1.5, 2.5, 7.5, 10 and 34 micrometre options. Confirm fit, flow, pressure and temperature for your process.',
    sections: [
      { title: 'Liquid bag filtration for process applications', paragraphs: [
        'A liquid bag filter passes fluid through a filter medium that retains suspended particles. PARK lists polypropylene media for liquid bags and applications that include process water, machine coolants, food and pharmaceutical processing, acids and bases, amines, organic solvents, plating solutions, desalination, RO membrane protection, wastewater and other water-treatment processes.',
        'An application name does not establish chemical compatibility or guarantee a particular treatment result. Describe the actual liquid and the contaminant to be retained. Bag filtration for suspended solids should not be represented as removing dissolved chemicals or every biological contaminant unless a separate product-specific specification supports that function.',
      ]},
      { title: 'Select a listed micron option with its test basis', paragraphs: [
        'The supplied product information lists nominal rating options of 1.5, 2.5, 7.5, 10 and 34 micrometres. Confirm which selected rating is available for the requested bag and how the value is defined or tested. A micron number alone does not describe the full filter performance, flow capacity or retention result under every operating condition.',
        'Specify the particle size or downstream protection requirement, fluid cleanliness target and any test method named in the project documents. Ask for evidence linked to the exact media and finished bag. Do not assume that all listed ratings are available in every size or that the smallest number is automatically the right choice.',
      ]},
      { title: 'Check fluid compatibility and operating conditions', paragraphs: [
        'Provide the fluid identity, concentration where relevant, temperature, pressure, flow rate and any cleaning or process-cycle details. For chemical service, identify the substance precisely and include the conditions that could affect the filter. These inputs are needed to review compatibility; the catalogue does not publish a universal operating-temperature, pressure or flow limit for every liquid bag.',
        'If the process is food, pharmaceutical or otherwise controlled, list the documentation and product-contact requirements your approval process needs. Ask which details can be confirmed for the selected assembly. Do not infer a compliance status from the application list alone.',
      ]},
      { title: 'Match bag dimensions and sealing ring to the housing', paragraphs: [
        'The catalogue lists customer-specific bag sizes and polypropylene or stainless-steel sealing-ring options. Provide the housing make and model, existing bag reference, bag length and diameter, ring dimensions and installation arrangement. Include a drawing or photograph of the bag and housing to make fit review more direct.',
        'The sealing interface must match the housing to help prevent bypass. The supplied information does not define every ring profile, size, stitching detail or tolerance. Record the open values as [INSERT BAG SIZE] and [INSERT RING TYPE / DIMENSIONS] until confirmed for the product being quoted.',
      ]},
      { title: 'Plan the system around flow and contamination load', paragraphs: [
        'Flow rate and the amount of suspended contamination influence how a filter operates in the process. Share the normal and peak flow, pressure conditions, contaminant description and any downstream equipment the bag protects. Request the product data and service guidance for the selected rating, size and fluid rather than assuming a universal replacement interval.',
        'If there is an existing filter, include its label, current performance issue and operating history. A request describing only a micron value may not provide enough information to check housing fit, compatibility or the process objective.',
      ]},
      { title: 'Prepare a complete liquid-filter enquiry', paragraphs: [
        'A useful enquiry includes fluid identity, contaminant, desired micron rating, required flow and pressure, operating temperature, housing reference, bag dimensions, sealing-ring material, quantity and required documentation. Attach the existing part label or drawing where possible. If the process requirement is not yet fixed, identify which details need a technical discussion.',
        'PARK can review the catalogue-listed polypropylene liquid bag options and help identify the values that need product-specific confirmation. Request written confirmation of rating, media, fit, operating limits and any supporting test basis before approving a purchase.',
      ]},
    ],
    specifications: [
      ['Media', 'Polypropylene (PP) listed'],
      ['Catalogue micron options', '1.5, 2.5, 7.5, 10 and 34 µm; confirm selected rating and test basis'],
      ['Bag sizes', 'Customer-specific sizes listed; confirm dimensions'],
      ['Sealing rings', 'Polypropylene or stainless steel listed'],
      ['Flow / pressure', '[INSERT REQUIRED FLOW RATE] / [INSERT OPERATING PRESSURE]'],
      ['Temperature / fluid', '[INSERT EXACT FLUID AND TEMPERATURE CONDITIONS]'],
      ['Bag / ring dimensions', '[INSERT EXACT BAG SIZE AND RING INTERFACE]'],
      ['Performance evidence', '[INSERT SELECTED RATING AND SUPPORTING TEST INFORMATION]'],
    ],
    applications: ['Process water', 'Machine coolants', 'Food and pharmaceutical processes', 'Acids and bases', 'Amines', 'Organic solvents', 'Plating solutions', 'Desalination and RO / DI systems', 'Wastewater and groundwater treatment'],
    faqs: [
      { question: 'Which micron ratings are listed for PARK liquid filter bags?', answer: 'The supplied catalogue lists 1.5, 2.5, 7.5, 10 and 34 micrometre options. Confirm the selected rating, availability and test basis for the specific bag and process.' },
      { question: 'Which sealing rings can I request?', answer: 'The catalogue lists polypropylene and stainless-steel sealing-ring options. Share the housing model and ring dimensions so the required interface can be checked.' },
      { question: 'Will a polypropylene bag work with my process liquid?', answer: 'Compatibility depends on the exact fluid, concentration, temperature and operating conditions. Provide those details and request confirmation for the selected bag; do not assume suitability from a broad application category.' },
      { question: 'Does a liquid bag filter remove dissolved chemicals?', answer: 'The catalogue describes liquid bags for suspended-particle removal. Do not assume dissolved-contaminant removal. Specify the treatment goal so the filtration role and supporting evidence can be reviewed.' },
    ],
    resources: [
      { label: 'Liquid bag filter selection guide', href: '/resources/liquid-bag-filter-selection' },
      { label: 'Industrial filter selection guide', href: '/resources/filter-selection' },
    ],
  },
};
