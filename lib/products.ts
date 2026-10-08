// Product facts and range are sourced exclusively from Product ppt._AF.pptx.
// Keep repeated slides as one product family; reference links are not extra products.
export type Product = { slug: string; name: string; image: string; categories: string[]; description: string; material: string; applications: string[]; features: string[]; specifications?: { label: string; value: string }[]; variants?: string[]; sourceSlides?: number[] };
export const industries = [
 { name: 'Mobility', image: 'image5', label: 'Filters for cabins, engines and cooling air.', description: 'Manage dust and particles in vehicle cabins, engine intakes and battery cooling air. Explore PARK automotive and railway filters for your system.' },
 { name: 'Manufacturing', image: 'image2', label: 'Keep particles out of your process.', description: 'Address airborne particles and process-liquid contamination with PARK air and liquid filters for production, cleanrooms and paint booths.' },
 { name: 'Heavy Duty Industry', image: 'image4', label: 'Tackle dust in demanding processes.', description: 'Manage industrial dust with PARK bag and cartridge filters. Discuss materials and fit for cement, power and chemical processing systems.' },
 { name: 'Living', image: 'image3', label: 'Choose filters for your indoor air.', description: 'Find PARK HVAC air filters for homes, hotels, hospitals and commercial buildings. Compare filtration stages and sizes for your ventilation system.' },
 { name: 'Liquid', image: 'image32', label: 'Keep unwanted particles out of your liquid.', description: 'Remove suspended solids from process liquids with PARK liquid bag filters. Discuss micron rating, fluid compatibility, flow and housing fit.' },
];
export const products: Product[] = [
 {slug:'panel-filter',name:'Panel Filters',image:'image24',categories:['Mobility','Manufacturing','Heavy Duty Industry','Living'],description:'Capture dust in HVAC and ventilation systems with PARK pleated panel filters. Compare synthetic media, frame options and sizes for your installation.',material:'Synthetic nonwoven media',applications:['HVAC systems','Railway ventilation','Commercial buildings','Cleanroom pre-filtration'],features:['Standard and custom sizes','Metal or plastic frame options','Temperature resistance up to 70°C']},
 {slug:'pocket-filter',name:'Pocket Filters',image:'image30',categories:['Manufacturing','Heavy Duty Industry','Living'],description:'Manage airborne dust in air-handling units with PARK pocket filters. Explore extended-surface media, frame options and sizes for your ventilation system.',material:'Synthetic filtration media',applications:['Air handling units','Hospitals and laboratories','Paint booths','Industrial ventilation'],features:['High dust-holding capacity','Metal or plastic frames','Standard and custom dimensions']},
 {slug:'hepa-filter',name:'HEPA Filters',image:'image31',categories:['Manufacturing','Living'],description:'Need fine particle filtration? Explore PARK HEPA filter options for controlled-air systems. Discuss the required grade, airflow, dimensions and seal.',material:'Borosilicate micro glass fibers and synthetic components',applications:['Cleanrooms','Pharmaceutical production','Medical equipment','Food processing'],features:['E10–U15 grade options listed in the product catalogue','Different seal options','Application-specific sizes']},
 {slug:'cabin-air-filter',name:'Cabin Air Filters',image:'image16',categories:['Mobility'],description:'Reduce dust and pollen entering vehicle cabins with PARK cabin air filters. Compare particle, activated carbon and fine-dust media options.',material:'Synthetic and activated carbon media options',applications:['Passenger vehicles','Automotive cabin ventilation'],features:['Dust and pollen capture','Activated carbon options for odors and gases','Fine particle filtration options']},
 {slug:'engine-air-filter',name:'Engine Air Filters',image:'image23',categories:['Mobility'],description:'Keep dust and sand out of engine intake air with PARK engine air filters. Explore synthetic or cellulose media and formats for your vehicle.',material:'Cellulose or synthetic media',applications:['Two-wheelers','Passenger cars','Engine air intake'],features:['Two-wheeler and four-wheeler formats','Standard and custom sizes','Designed for varying road conditions']},
 {slug:'battery-air-filter',name:'Hybrid / EV Battery Air Filters',image:'image14',categories:['Mobility'],description:'Manage dust in filtered EV and hybrid battery cooling-air systems. Explore PARK battery air filters and discuss media grade and installation fit.',material:'Synthetic media with PET fabric options',applications:['Hybrid vehicles','Electric vehicle battery cooling'],features:['Designed for battery cooling systems','Custom dimensions available','Multiple filtration media grades']},
 {slug:'car-purifier-filter',name:'Car Air Purifier Filters',image:'image15',categories:['Mobility'],description:'Find replacement filtration for in-car air purifiers. Explore PARK particle and activated carbon options for your purifier format.',material:'Synthetic media and activated carbon options',applications:['In-car air purifiers','Passenger cabins'],features:['Particulate and carbon combinations','PET fabric frame options','Application-specific formats']},
 {slug:'filter-mats',name:'Filter Mats',image:'image25',categories:['Mobility','Manufacturing'],description:'Capture larger airborne particles before they reach downstream filters. Explore PARK nonwoven filter mats in rolls or custom cuts for your system.',material:'Synthetic PET / PES nonwoven fabric',applications:['Railway ventilation','Control cabinets','Paint booths','Air purifiers'],features:['Roll goods or custom cuts','Multiple thicknesses and grades','Mechanically compressed clean-air side']},
 {slug:'ceiling-filter',name:'Ceiling Filters',image:'image33',categories:['Manufacturing'],description:'Help control dust in paint and spray-booth supply air with PARK ceiling filters. Discuss the media grade, cut size and airflow your booth requires.',material:'Synthetic PET / PES nonwoven fabric',applications:['Paint booths','Spray booths','Paint drying systems'],features:['Rolled goods and custom cuts','Fine dust and paint particle capture','Compressed clean-air side']},
 {slug:'bag-filter',name:'Industrial Bag Filters',image:'image38',categories:['Heavy Duty Industry'],description:'Manage process dust with PARK industrial bag filters. Compare material options against your dust load, operating temperature and collector dimensions.',material:'PET, PPS, PTFE, glass fiber, aramid, PP, HPA (homopolymer acrylic) and P84',applications:['Cement plants','Power plants','Chemical processing','Mining and metals'],features:['Multiple application-specific materials','Standard and custom sizes','Industrial dust collection']},
 {slug:'cartridge-filter',name:'Cartridge Filters',image:'image37',categories:['Heavy Duty Industry'],description:'Explore PARK cartridge filters for industrial dust collection and high-dust-load processes. Discuss media, dimensions and collector fit.',material:'PET, PPS, PTFE, glass fiber, aramid, PP, HPA (homopolymer acrylic) and P84; confirm the selected cartridge medium',applications:['Cement and construction','Steel and metals','Power plants','Chemical processing'],features:['Industrial dust collection','Standard sizes and special sizes on request','Media options for high-dust-load applications']},
 {slug:'liquid-filter',name:'Liquid Bag Filters',image:'image32',categories:['Liquid','Manufacturing'],description:'Remove suspended particles from process liquids with PARK polypropylene liquid bag filters. Discuss micron ratings, sealing rings and housing fit.',material:'Polypropylene (PP)',applications:['Process water','Machine coolants','Food and pharmaceutical processes','Wastewater'],features:['Customer-specific sizes','Polypropylene or stainless steel sealing rings','Multiple micron ratings available']},
 {slug:'swimming-pool-filter',name:'Swimming Pool Filters',image:'image44',categories:['Living'],description:'Swimming pool filters are part of the PARK living range. Share your pool-system requirements to discuss the available product and confirmed specifications.',material:'Confirm media specification with the team',applications:['Swimming pools','Pool circulation systems'],features:['Part of the living filtration range','Discuss your pool-system requirements','Request product-specific technical details']},
];

export type ApplicationGroup = { name: string; children?: string[]; products: string[]; summary: string; sourceSlides: number[] };
// Application shortlists use the product-use descriptions, not the entire industry
// range. Where the PPT only gives a shared range, keep that range and clarify the
// application context instead of inventing exclusive product availability.
export const applicationGroups: Record<string, ApplicationGroup[]> = {
 'Mobility': [
  { name: 'Automobiles', children: ['Passenger Vehicle', 'Commercial Vehicle', 'Two wheeler'], products: ['cabin-air-filter', 'engine-air-filter', 'battery-air-filter', 'car-purifier-filter'], summary:'Cabin air, engine intake, hybrid / EV battery cooling and console air filtration. Select the vehicle application to explore the range.', sourceSlides:[2,3,4,5,6,7] },
  { name: 'Railways', children: ['Coach'], products: ['panel-filter', 'filter-mats'], summary:'Panel filters and nonwoven filter mats for railway coach ventilation.', sourceSlides:[2,8,9,10] },
 ],
 'Manufacturing': [
  {name:'Pharmaceutical', products:['panel-filter','pocket-filter','hepa-filter','liquid-filter'], summary:'Explore air handling, fine particle filtration and liquid filtration for pharmaceutical processes.', sourceSlides:[12,14,15,16,19,34]},
  {name:'Paint Booth', products:['pocket-filter','filter-mats','ceiling-filter'], summary:'Pre-filtration and final-stage supply-air filtration for painting, spraying and drying systems.', sourceSlides:[12,15,17,18]},
  {name:'Food Industry', products:['hepa-filter','liquid-filter'], summary:'Fine air filtration and suspended-particle removal from process liquids. Discuss your air or liquid requirement.', sourceSlides:[12,16,19,34]},
  {name:'Electronics & Optics', products:['panel-filter','hepa-filter'], summary:'Explore cleanroom ventilation and fine air-filtration options for your required particle-control level.', sourceSlides:[12,14,16]},
 ],
 'Heavy Duty Industry': [
  {name:'Power Plant', products:['bag-filter','cartridge-filter','panel-filter','pocket-filter'], summary:'Industrial bags and cartridges for process dust; panel and pocket filters for separate ventilation requirements.', sourceSlides:[21,22,23,24,25,26]},
  {name:'Cement Plant', products:['bag-filter','cartridge-filter','panel-filter','pocket-filter'], summary:'Discuss high-dust-load collection in cement processes, or select air-handling filters for plant ventilation.', sourceSlides:[21,22,23,24,25,26]},
  {name:'Chemical Industry', products:['bag-filter','cartridge-filter','panel-filter','pocket-filter'], summary:'Explore process-air dust collection and ventilation. Share chemical exposure and temperature when discussing media.', sourceSlides:[21,22,23,24,25,26]},
 ],
 'Living': [
  {name:'House', children:['Ventilation','Swimming Pool'], products:['panel-filter','swimming-pool-filter'], summary:'Panel filters for private indoor ventilation and HVAC systems. Match the size and grade to your installation.', sourceSlides:[28,29,14,32]},
  {name:'Hotel', children:['Ventilation','Swimming Pool'], products:['panel-filter','pocket-filter','swimming-pool-filter'], summary:'Explore panel and pocket options for ventilation, or discuss separate swimming pool filtration requirements.', sourceSlides:[28,29,14,15,32]},
  {name:'Retail and Commercial Building', children:['Ventilation','Swimming Pool'], products:['panel-filter','pocket-filter','swimming-pool-filter'], summary:'Air-handling filters for commercial indoor spaces and shopping centres.', sourceSlides:[28,29,14,15,32]},
  {name:'Hospital', children:['Ventilation','Swimming Pool'], products:['panel-filter','pocket-filter','hepa-filter','swimming-pool-filter'], summary:'Ventilation and fine-filtration options for hospital and medical systems. Confirm the grade required for each area.', sourceSlides:[28,29,14,15,31,32]},
 ],
 'Liquid': [
  {name:'Food Industry', products:['liquid-filter'], summary:'Polypropylene liquid bag filters for suspended particles. Discuss your process liquid, micron rating and sealing ring.', sourceSlides:[34,35]},
  {name:'Pharma', products:['liquid-filter'], summary:'Liquid bag filtration for pharmaceutical process requirements. Share fluid conditions, housing fit and required particle rating.', sourceSlides:[34,35]},
 ],
};
export const toSlug = (name: string) => name.toLowerCase().replaceAll('&', 'and').replaceAll(' ', '-');
export function applicationProducts(industry: string, group: ApplicationGroup, child?: string) {
 const slugs = industry === 'Mobility' && child === 'Two wheeler' ? ['engine-air-filter'] : industry === 'Living' ? (child === 'Swimming Pool' ? ['swimming-pool-filter'] : group.products.filter(slug => slug !== 'swimming-pool-filter')) : group.products;
 return slugs.map(slug => products.find(product => product.slug === slug)).filter((product): product is Product => !!product && product.categories.includes(industry));
}
const airGrades = 'ISO Coarse 75%; ePM10 55% / 70%; ePM2.5 65%; ePM1 70% / 80%';
const legacyGrades = 'G4, M5, M6, F7, F8, F9 (EN 779 catalogue references)';
const sizes = { label: 'Sizes', value: 'Standard sizes and special sizes on request' };
const catalogueSpecifications: Record<string, { label: string; value: string }[]> = {
 'panel-filter': [sizes, {label:'Catalogue ISO 16890 grades',value:airGrades}, {label:'Legacy catalogue grades',value:legacyGrades}, {label:'Temperature resistance',value:'70 degrees C'}, {label:'Frame options',value:'Metal or plastic'}],
 'pocket-filter': [sizes, {label:'Catalogue ISO 16890 grades',value:airGrades}, {label:'Legacy catalogue grades',value:legacyGrades}, {label:'Frame options',value:'Metal or plastic'}],
 'hepa-filter': [sizes, {label:'Catalogue EN 1822 range',value:'E10, E11, E12, H13, H14, U15'}, {label:'Catalogue ISO 29463 range',value:'ISO 15-30 E; ISO 35-45 H; ISO 50 U'}, {label:'Seal options',value:'Different seal types available'}],
 'engine-air-filter': [sizes, {label:'Media options',value:'Synthetic nonwoven or cellulose'}, {label:'Legacy catalogue grades',value:legacyGrades}],
 'battery-air-filter': [sizes, {label:'Catalogue ISO 16890 grades',value:airGrades}, {label:'Legacy catalogue grades',value:legacyGrades}, {label:'Frame option',value:'PET fabric'}],
 'car-purifier-filter': [sizes, {label:'Catalogue EN 1822 range',value:'E10, E11, E12, H13, H14, U15'}, {label:'Catalogue ISO 29463 range',value:'ISO 15-30 E; ISO 35-45 H; ISO 50 U'}, {label:'Frame option',value:'PET fabric'}],
 'filter-mats': [{label:'Supply format',value:'Roll goods or customer-specific cuts'}, {label:'Catalogue ISO 16890 range',value:'ISO Coarse 50-90%'}, {label:'Legacy EN 779 range',value:'G2, G3, G4, M5'}, {label:'Construction',value:'Mechanically compressed clean-air side'}],
 'ceiling-filter': [{label:'Supply format',value:'Roll goods or customer-specific cuts'}, {label:'Catalogue ISO 16890 range',value:'ISO Coarse and ePM10'}, {label:'Legacy EN 779 range',value:'G2, G3, G4, M5, M6'}, {label:'Construction',value:'Mechanically compressed clean-air side'}],
 'bag-filter': [sizes, {label:'Media options',value:'PET, PPS, PTFE, glass fiber, aramid, PP, homopolymer acrylic and P84'}, {label:'Ring / frame options',value:'Metal or plastic; confirm assembly for the dust collector'}],
 'cartridge-filter': [sizes, {label:'Catalogue media options',value:'PET, PPS, PTFE, glass fiber, aramid, PP, homopolymer acrylic and P84; confirm suitability for the cartridge format'}, {label:'Ring / frame options',value:'Metal or plastic; confirm assembly for the dust collector'}],
 'liquid-filter': [{label:'Sizes',value:'Customer-specific sizes'}, {label:'Catalogue micron ratings',value:'1.5, 2.5, 7.5, 10 and 34 microns'}, {label:'Sealing rings',value:'Polypropylene or stainless steel'}],
};
const productSourceSlides: Record<string, number[]> = {
 'panel-filter':[9,14,25], 'pocket-filter':[15,26], 'hepa-filter':[16,31],
 'cabin-air-filter':[4], 'engine-air-filter':[5], 'battery-air-filter':[6],
 'car-purifier-filter':[7], 'filter-mats':[10,17], 'ceiling-filter':[18],
 'bag-filter':[23], 'cartridge-filter':[24], 'liquid-filter':[19,35],
 'swimming-pool-filter':[29,32],
};
for (const product of products) {
 product.specifications = catalogueSpecifications[product.slug];
 product.sourceSlides = productSourceSlides[product.slug];
}
products.find(p => p.slug === 'cabin-air-filter')!.variants = ['Particle filter', 'Activated carbon filter', 'Fine dust PM2.5 filter', 'Bio-functional filter', 'HEPA filter'];
products.find(p => p.slug === 'engine-air-filter')!.variants = ['2-wheeler synthetic nonwoven engine filter', '4-wheeler cellulose engine filter'];
products.find(p => p.slug === 'car-purifier-filter')!.name = 'Console / Car Air Purifier Filters';
products.find(p => p.slug === 'liquid-filter')!.applications = ['Food industry', 'Pharmaceutical processes', 'Process water', 'Machine coolants', 'Acids and bases', 'Amines', 'Makeup water', 'Carbon beds', 'Organic solvents', 'Completion fluids', 'Deep wells', 'Plating solutions', 'Desalination', 'RO membrane protection', 'DI resins', 'Stormwater', 'Wastewater', 'Groundwater clean-up', 'Waterflood'];

// Full application lists from the supplied presentation. Exact original wording
// retained internally for content auditing.
products.find(p => p.slug === 'panel-filter')!.applications = ['Railway coach ventilation', 'Heating, ventilation and air conditioning (HVAC)', 'Cleanrooms', 'Offices', 'Schools', 'Hospitals', 'Private and commercial indoor spaces'];
products.find(p => p.slug === 'pocket-filter')!.applications = ['HVAC and air handling systems', 'Industrial environments', 'Medical facilities and hospitals', 'Laboratories', 'Shopping centres', 'Public institutions', 'Paint booths'];
products.find(p => p.slug === 'hepa-filter')!.applications = ['Cleanrooms', 'Laboratories', 'Pharmacy', 'Medical equipment', 'Data centres', 'Food industry'];
products.find(p => p.slug === 'filter-mats')!.applications = ['Railway ventilation', 'Ventilation and air-conditioning devices', 'Fans', 'Air purifiers', 'Forced ventilation for low-energy applications, with or without heat recovery', 'Control cabinets', 'Engine protection covers', 'Surface technology', 'Painting, paint spraying and drying systems'];
products.find(p => p.slug === 'ceiling-filter')!.applications = ['Paint booths', 'Cleanrooms', 'Spray booths', 'Ventilation systems', 'Painting, paint spraying and drying systems'];
const dustApplications = ['Cement and construction', 'Steel and metals', 'Foundries', 'Power plants', 'Chemical and pharmaceutical processing', 'Mining and minerals', 'Food processing', 'Wood and furniture', 'Material handling', 'Automotive and general manufacturing', 'Paint and coating'];
for (const slug of ['bag-filter','cartridge-filter']) {
 const product = products.find(p => p.slug === slug)!;
 product.applications = [...dustApplications];
 product.specifications!.push({label:'ISO 16890 classification options (confirm application)',value:airGrades}, {label:'EN 779 classification options (confirm application)',value:legacyGrades});
}
