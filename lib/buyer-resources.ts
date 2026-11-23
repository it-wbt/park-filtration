export type BuyerResource = {
 slug:string; title:string; description:string; kicker:string; readTime:string;
 intro:string; takeaways:string[];
 sections:{title:string;paragraphs:string[];checks?:string[];productLink?:{href:string;label:string};paragraphLinks?:{before:string;label:string;href:string;after?:string;external?:boolean}[];table?:{caption:string;headers:string[];rows:string[][]}}[];
 products:string[]; question:string; answer:string;
 faqs?:{question:string;answer:string}[];
 callToAction?:{title:string;description:string;label:string;href:string};
};
// Buyer guidance developed from PARK's supplied catalogue and product explanations.
// No prices, measured performance, certifications or service-life claims are inferred.
export const buyerResources:BuyerResource[]=[
 {
  slug:'paint-booth-filter-guide',
  title:'Paint Booth Filters in India: Ceiling Filters & Filter Mats',
  description:'Compare PARK paint booth ceiling filters and PET/PES filter mats. Check their listed roles, grades and roll or customer-specific cut options, then prepare a product enquiry.',
  kicker:'PAINT BOOTH FILTRATION',readTime:'6 min read',
  intro:'Need a paint booth filter? Start with its position and job, then check the booth maker’s fit and airflow requirements. PARK’s catalogue lists synthetic PET/PES nonwoven ceiling filters for final-stage air filtration in paint and spray booths, plus filter mats listed for paint-booth applications. The two product families have different listed roles, so choose for the stage your booth actually uses.',
  takeaways:[
   'Ceiling filters and filter mats have different listed functions; choose by filter stage, not name alone.',
   'Both PARK product families list synthetic PET/PES nonwoven media, rolled goods and customer-specific cuts.',
   'Confirm the filter location, dimensions, requested grade and booth requirements before asking for a quote.',
  ],
  sections:[
   {
    title:'Start with the filter position in your paint booth',
    paragraphs:[
     '“Paint booth filter” can mean different things depending on where a filter sits and what the booth requires there. Before choosing a product, identify the exact filter position and the function specified for that stage.',
     'This guide focuses on PARK’s catalogue-listed ceiling filters and filter mats for paint-booth applications. If you are replacing another type of booth filter, name that stage in your enquiry so the product can be checked against the equipment specification.',
    ],
   },
   {
    title:'Ceiling filters and filter mats have different listed roles',
    paragraphs:[
     'PARK describes ceiling filters for final-stage air filtration in applications that include paint booths, spray booths, cleanrooms and ventilation systems. The presentation says these filters are designed to capture fine dust, paint particles and other airborne contaminants.',
     'PARK describes filter mats as a pre-filter option for dust, pollen and larger airborne particles, including use in paint booths, ventilation systems and air purification. The listed purpose also includes protecting finer filters and extending their service life.',
     'Those descriptions are useful starting points, not a substitute for the booth maker’s design. A ceiling filter and a filter mat are not automatically interchangeable. Confirm the stage, assembly and requested grade before ordering.',
    ],
    checks:[
     'Ceiling filters: listed for final-stage air filtration; paint booths and spray booths are among the applications.',
     'Filter mats: listed for pre-filtration and paint-booth applications, among others.',
    ],
   },
   {
    title:'PARK ceiling filters for paint and spray booths',
    paragraphs:[
     'PARK’s catalogue lists ceiling filters made from synthetic PET/PES nonwoven fabric. The listed supply formats are rolled goods and customer-specific cuts, with the clean-air side mechanically compressed.',
     'The presentation lists ISO Coarse and ePM10 classes, along with EN 779 grades G2, G3, G4, M5 and M6. Treat those as catalogue-listed classifications, not as a claim that every grade is interchangeable or suited to every booth. Confirm the exact grade required for your equipment.',
    ],
    productLink:{href:'/products/ceiling-filter',label:'Explore PARK ceiling filters'},
   },
   {
    title:'PARK filter mats for paint-booth applications',
    paragraphs:[
     'PARK’s filter mats are also listed as synthetic PET/PES nonwoven fabric. The catalogue includes rolled goods and customer-specific cuts, and notes a mechanically compressed clean-air side.',
     'Listed classifications include ISO Coarse and EN 779 grades G2, G3, G4 and M5. The catalogue names paint booths and painting, paint-spraying and drying systems among the applications. Share the filter stage and required specification so the right option can be checked.',
    ],
    productLink:{href:'/products/filter-mats',label:'Explore PARK filter mats'},
   },
   {
    title:'How to choose a paint booth filter for your setup',
    paragraphs:[
     'Once you know whether you need a ceiling filter or filter mat, match the product details to your actual booth. Use the equipment documentation and the existing filter as references; a product name or grade by itself does not confirm fit.',
     'If the booth specification uses a particular classification, quote that classification as written. PARK’s catalogue lists both ISO 16890 and EN 779 terms for these product families; do not assume one grade is a direct conversion of another.',
    ],
    checks:[
     'Booth make, model and filter position or stage',
     'Existing filter label, reference number, photo or drawing',
     'Frame opening and filter dimensions, including depth',
     'Required grade or standard from the booth documentation',
     'Airflow or pressure requirements stated by the equipment maker',
     'Roll or cut format, quantity and delivery location',
    ],
   },
   {
    title:'Avoid these common buying mistakes',
    paragraphs:[
     'Ordering by “paint booth filter” alone leaves out the information that determines which product family to consider. Add the filter location and current part reference to your request.',
     'Do not select only by a grade label, appearance or a claim that one filter is “better.” The booth design, requested specification and physical fit all matter. A higher or different listed class does not automatically make a suitable replacement.',
     'Finally, send dimensions and format requirements before asking for a custom cut. A clear enquiry helps the team discuss the catalogue option that best matches your application.',
    ],
   },
  ],
  products:['ceiling-filter','filter-mats'],
  question:'What information should I send when asking about a paint booth filter?',
  answer:'Include the booth make and model, filter position, existing filter reference, dimensions, required grade or standard, quantity and a photo or drawing if available. Add airflow or pressure requirements from the booth documentation when you have them.',
  faqs:[
   {question:'What is a paint booth ceiling filter?',answer:'PARK’s catalogue describes ceiling filters as final-stage air filters for applications including paint booths and spray booths. Confirm the filter stage and required grade against your booth documentation.'},
   {question:'Are ceiling filters and filter mats the same product?',answer:'No. PARK lists ceiling filters for final-stage filtration and filter mats for pre-filtration, including paint-booth applications. Check the required stage before choosing between them.'},
   {question:'Which grade should I choose for my paint booth?',answer:'There is no single grade for every booth. Use the class or standard specified by the booth maker, then confirm the selected product and grade with PARK. The catalogue lists multiple classifications for each family.'},
   {question:'What details do I need to request a paint booth filter quote?',answer:'Send the booth model, filter location, existing part or label, exact dimensions, required grade, format and quantity. A photo or drawing can help clarify the assembly.'},
  ],
  callToAction:{
   title:'Need a ceiling filter or filter mat for your booth?',
   description:'Send PARK the booth model, filter position, dimensions and requested grade. The team can review the listed options with you before you specify a product.',
   label:'Discuss your paint-booth filter requirement',href:'/#contact',
  },
 },
 {
  slug:'panel-pocket-hepa-air-filters',title:'Panel, Pocket or HEPA? Choose the Right Air Filtration Stage',
  description:'Compare panel, pocket and fine-filtration formats for HVAC and controlled-air systems. Understand media grade, airflow, sealing and what to send for a quote.',
  kicker:'HVAC & CONTROLLED AIR',readTime:'5 min read',
  intro:'A building or production air system needs more than a filter that fits the opening. The filter format, particle requirement, available airflow and installation seal need to work together. PARK offers panel, pocket and fine-filtration options; start by identifying the job of the stage you are specifying.',
  takeaways:['Format describes construction; grade describes a filtration requirement.','Airflow and pressure drop belong in the same specification.','A staged arrangement must match the actual air-handling system.'],
  sections:[
   {title:'Start with the air system, not the highest grade',paragraphs:['Identify whether the filter is for outdoor-air intake, railway ventilation, a commercial air-handling unit, paint-booth ventilation or a controlled production environment. These applications have different filter housings and particle-control needs.','Record the existing filter reference, the stage being replaced and the performance requested by the system designer. A catalogue range is a list of available options, not proof that every option is appropriate for your equipment.']},
   {title:'Panel filters: a compact pleated format',paragraphs:['Panel filters use pleated media within a supporting frame. PARK lists synthetic nonwoven media, metal or plastic frames and standard or special-size options. Catalogue applications include HVAC, railway ventilation, commercial buildings and cleanroom ventilation.','Confirm the overall width, height and depth, frame construction, seal and airflow. A panel describes the physical assembly; it does not identify one universal particle-efficiency class.']},
   {title:'Pocket filters: extended surface for air handling',paragraphs:['Pocket filters provide an extended-surface arrangement in an air-handling unit. The pocket media retain dust and airborne particles as air passes through them. Media selection and system airflow determine the resistance of the selected assembly.','Check the pocket depth and arrangement as well as the frame size. PARK lists hospitals, laboratories, paint booths and industrial ventilation among the applications. An HVAC pocket filter is different from an industrial dust-collection bag filter.']},
   {title:'Fine filtration: specify the exact grade and seal',paragraphs:['The PARK fine-filtration range lists E10, E11, E12, H13, H14 and U15 options with EN 1822 and ISO 29463 catalogue references. These are different classifications. Ask for the selected filter grade and its supporting report rather than applying one efficiency number to the whole range.','Media performance is only part of the assembly. Confirm the housing, seal, dimensions and operating airflow to address bypass around the filter. Particle filtration should not be treated as gas adsorption or a guarantee of infection prevention.']},
   {title:'Compare the whole filtration stage',paragraphs:['A staged system may use an upstream filter to retain larger contamination before a fine-filtration stage. The arrangement depends on the equipment design; adding stages or changing a grade can change the system resistance.','Share the current arrangement with the team. Discuss performance at the required airflow, the available pressure-drop limit and the planned maintenance approach. Do not choose a replacement by image or nominal dimensions alone.'],checks:['Overall frame size, depth and sealing arrangement','Required airflow and acceptable pressure drop','Selected grade and filter-specific technical evidence','System drawing or existing part reference','Quantity and standard or custom format']},
  ],products:['panel-filter','pocket-filter','hepa-filter','filter-mats'],question:'Can I upgrade to a finer filter without changing anything else?',answer:'Suitability depends on the housing, airflow, fan capability, pressure-drop allowance and required grade. Share the current filter and system details so these can be checked before selecting a replacement.',
  faqs:[
   {question:'What do PFA and PFAH mean on a pocket-filter specification?',answer:'The supplied PARK product catalogue does not define PFA or PFAH. Treat them as unconfirmed reference codes and share the exact manufacturer, model, drawing or filter label so the construction and any equivalent option can be checked.'},
   {question:'Which EN 779 or ISO 16890 class should I specify for a PARK pocket filter?',answer:'PARK’s catalogue lists EN 779 grades G4, M5, M6, F7, F8 and F9, plus ISO 16890 options ISO Coarse 75%, ePM10 55% and 70%, ePM2.5 65%, and ePM1 70% and 80%. Use the class required by your system specification and ask for the selected filter’s test data; the catalogue does not provide a cross-standard conversion.'},
   {question:'Can I replace my pocket filter with a finer class?',answer:'Check the housing, seal, airflow, fan capacity and pressure-drop allowance against the required class. Share the existing filter reference and system requirements so the selected option can be confirmed.'},
   {question:'What details should I send for a pocket-filter quotation?',answer:'Include the equipment model, current filter reference, frame dimensions, pocket depth and arrangement, required class, airflow, quantity and a drawing or photo if available.'},
  ]
 },
 {
  slug:'bag-vs-cartridge-dust-collection',title:'Bag vs Cartridge Filters for Industrial Dust Collection',
  description:'Compare industrial bag and cartridge filter formats. Learn which dust, temperature, media and collector details to confirm before requesting a quotation.',
  kicker:'INDUSTRIAL DUST COLLECTION',readTime:'5 min read',
  intro:'Dust collection is a process-equipment decision. A bag and a cartridge both retain particles, but their construction and mounting need to match the collector and the process. Start with the dust characteristics and equipment details, then confirm the media and assembly.',
  takeaways:['Choose for the collector, not the product name alone.','Dust properties and operating conditions guide media selection.','Neither format is a universal replacement for the other.'],
  sections:[
   {title:'Understand the dust and the collection point',paragraphs:['Describe where the dust is generated: cement handling, power generation, chemical processing, metalworking, powder handling or another production process. Include whether conditions vary during start-up, normal operation or cleaning.','Record the dust characteristics and the operating information you have. If the process has a documented fire, combustible-dust or other safety requirement, include that specification in the enquiry so equipment and media suitability can be assessed by the responsible system specialist.']},
   {title:'Industrial bag filters: media shaped for the collector',paragraphs:['PARK lists industrial bag filters for continuous industrial dust collection. The catalogue includes PET, PPS, PTFE, glass fibre, aramid, polypropylene, homopolymer acrylic and P84 media options. Availability of a material does not confirm its suitability for a particular process.','A bag assembly needs the correct dimensions, mounting, ring and supporting arrangement. Share a drawing or existing part details. Confirm the selected medium against the actual process conditions rather than assuming all listed media have the same operating limits.']},
   {title:'Cartridge filters: match the collector',paragraphs:['PARK lists cartridge filters for industrial dust collection and high-dust-load applications, including cement, steel and metals, power plants, chemical processing and general manufacturing.','Confirm the selected cartridge construction with our team. The fit and performance depend on the collector design, dust load, cleaning method and chosen media. Confirm the mounting and seal as well as the overall diameter and length.']},
   {title:'Compare what the collector can actually accept',paragraphs:['A bag collector and a cartridge collector can have different mounting and cleaning arrangements. A filter that appears similar may still be incompatible with the support, end cap, seal or available installation clearance.','Provide the collector manufacturer or model where known, the existing filter reference and the cleaning arrangement. Ask for a confirmed assembly rather than treating the two formats as interchangeable. An HVAC pocket filter is also a separate product family, despite the similar bag-shaped appearance.']},
   {title:'Build a complete enquiry',paragraphs:['The quotation should identify both the assembly and the process conditions. This gives the team a useful basis for selecting an available medium and confirming the construction.','Plan inspection and replacement around the equipment guidance and operating evidence. Dust loads and conditions vary; a catalogue description cannot establish a fixed service interval for every site.'],checks:['Dust or process description and collector model','Existing filter dimensions, mounting and seal details','Temperature and relevant chemical exposure','Flow requirement and pressure conditions, if available','Cleaning method, quantity and an existing drawing']},
  ],products:['bag-filter','cartridge-filter'],question:'Which format lasts longer?',answer:'Service life depends on the selected media, dust load, operating conditions, cleaning arrangement and maintenance. A universal bag-versus-cartridge life comparison would be misleading. Compare the assemblies under the conditions of your collector.',
  faqs:[
   {question:'Can used baghouse filter bags be recycled or reused?',answer:'PARK’s product catalogue lists filter-bag media but does not state whether a used bag can be recycled, cleaned or reused. Confirm the selected medium and the dust it has collected with the filter supplier and your responsible waste handler before choosing a disposal route.'},
   {question:'Are baghouse bags more recyclable than cartridge filters?',answer:'The PARK product information does not establish recyclability for either format. Ask about the composition and handling requirements of the specific used filter rather than assuming recyclability from the bag or cartridge format.'},
   {question:'Can a cartridge filter replace a bag in the same dust collector?',answer:'Bag and cartridge formats are not interchangeable by default. Confirm the collector design, mounting, seal, clearance, cleaning arrangement and selected media before specifying a replacement.'},
   {question:'What details should I send for a baghouse bag or cartridge quotation?',answer:'Include the collector make and model, current filter reference, dimensions, mounting and seal, cleaning method, dust or process description, temperature, relevant chemical exposure, quantity and any available drawing.'},
  ]
 },
 {
  slug:'dust-collector-filter-bag-selection',
  title:'Dust Collector Filter Bags Manufacturer: Materials and Selection Guide',
  description:'A practical guide to PARK industrial bag filters: catalogue-listed media, size and frame options, buyer quote details, and product-specific data to confirm.',
  kicker:'INDUSTRIAL DUST COLLECTION',readTime:'8 min read',
  intro:'Choosing industrial bag-filter media starts with the collector and process conditions, not a fibre name alone. If your team is comparing a dust collector filter bags manufacturer, begin with the current bag assembly, dimensions, material requirement and dust-collection application. A replacement that matches only a label or approximate size still needs to be checked against the collector. PARK lists Industrial Bag Filters for industrial dust collection, with several material options, standard and special sizes, and metal or plastic frame options. The catalogue does not provide a model-by-model pressure-drop curve, operating-temperature limit or efficiency report for this guide. This page explains what PARK lists, what buyers should send with a request, and which performance details need written confirmation before purchase. Use the collector documentation and product-specific data for final selection.',
  takeaways:[
   'PARK lists industrial bag filters for dust collection, with multiple media options and metal or plastic frame options.',
   'Standard and special sizes are listed; provide a drawing or current bag dimensions for fit review.',
   'Confirm performance labels and operating limits against a product-specific document before specifying a bag.',
  ],
  sections:[
   {
    title:'Industrial bag filters and HVAC pocket filters serve different systems',
    paragraphs:[
     'Buyers may see the words bag filter and pocket filter used for different products. PARK lists industrial bag filters for process dust collection. Its pocket filters are a separate product family used in HVAC and air-handling systems. The outline of a filter alone does not confirm its collector, mounting or duty. Start with the equipment nameplate, the current filter reference and the collection point, then identify the product family you are replacing.',
     'This guide covers process-dust bags. Use the separate HVAC guide for panel, pocket and HEPA filters, and the existing bag-versus-cartridge guide for collector-format questions.',
    ],
    paragraphLinks:[
     {before:'Read the ',label:'panel, pocket and HEPA filter guide',href:'/resources/panel-pocket-hepa-air-filters',after:' for the separate HVAC product families.'},
     {before:'See ',label:'bag vs. cartridge filters for industrial dust collection',href:'/resources/bag-vs-cartridge-dust-collection',after:' for collector-format questions.'},
    ],
   },
   {
    title:'What PARK lists for industrial bag filters',
    paragraphs:[
     'PARK’s product range includes Industrial Bag Filters for industrial dust collection. The product information lists PET (polyester), PPS, PTFE, glass fibre, aramid, polypropylene (PP), homopolymer acrylic (HPA) and P84 as media options. These are catalogue-listed materials, not a claim that every material suits every dust stream or collector.',
     'The current product information also lists standard and special sizes, with metal or plastic ring/frame options. The exact assembly still needs to match the collector. Confirm the required media and construction with the system information before requesting a quotation. The table below separates what PARK lists from details that need a product-specific confirmation.',
    ],
    table:{
     caption:'PARK industrial bag filter information and confirmation points',
     headers:['Specification area','What PARK lists','What to confirm for your collector'],
     rows:[
      ['Media options','PET/polyester, PPS, PTFE, glass fibre, aramid, PP, HPA and P84.','Which listed medium is specified for the actual dust and operating conditions.'],
      ['Size','Standard and special sizes.','Bag dimensions, drawing, and collector or replacement reference.'],
      ['Ring/frame','Metal or plastic options are listed.','The exact top, support and mounting interface for the assembly.'],
      ['Performance evidence','The catalogue lists class labels for the range.','The grade, test basis and report for the exact product configuration.'],
      ['Operating limits','No model-specific pressure-drop or temperature figures are given here.','Written limits and test data for the selected bag before approval.'],
     ],
    },
    paragraphLinks:[
     {before:'View the ',label:'Industrial Bag Filters product page',href:'/products/dust-collector-bag-filters',after:' for the listed product details.'},
     {before:'Explore the wider ',label:'PARK product range',href:'/products',after:' when you are comparing other filtration families.'},
     {before:'For media used across the range, see ',label:'PARK filtration media',href:'/filtration-media',after:'.'},
    ],
   },
   {
    title:'Build the specification from collector and process information',
    paragraphs:[
     'A useful filter-bag request connects the replacement part to the system that uses it. Share the collector make and model where available, the existing bag reference, the number of bags required and a clear drawing or photograph. Add the application and the process description so the team can check whether the request matches the industrial bag-filter family.',
     'For process review, provide the operating information your plant engineer already uses: dust type, relevant moisture or chemical exposure, normal and peak temperature, and the collector cleaning arrangement. These details are buyer inputs, not published performance limits for PARK bags. Ask the supplier to confirm which information is needed for the selected medium and assembly. Do not substitute a general material name for approval against a specific process.',
     'If the old filter failed early, describe the observed condition and send a photograph of the bag, top connection and wear. Keep the collector specification, reference bag and new quotation together so the review uses the same assembly throughout.',
    ],
    checks:[
     'Collector make, model and current filter reference',
     'Bag dimensions, mounting details, drawing or clear photographs',
     'Application, dust description and relevant operating conditions',
     'Requested material, quantity and any required test documentation',
    ],
    paragraphLinks:[
     {before:'Use the broader ',label:'industrial filter selection guide',href:'/resources/filter-selection',after:' to organize the information for an enquiry.'},
    ],
   },
   {
    title:'Read filter grades and test claims in context',
    paragraphs:[
     'A grade label is useful only when the test method, product configuration and intended application are clear. The product presentation supplied for this project includes class references for the industrial bag-filter range, but it does not map each class to a specific bag construction or include a report for an individual item. Ask for the technical document tied to the exact medium and assembly you are considering.',
     'For cleanable filter media used in dry-gas cleaning, ISO 11057 describes a comparative characterization test method. A standard’s existence does not show that a specific bag has been tested to it. Request the report, sample configuration and conditions behind any quoted efficiency, pressure-drop or durability result, then compare suppliers on the same basis.',
     'Treat HVAC class labels as separate from a dust-collector test result. If your plant specification names EN 779, ISO 16890, MERV or another class, quote it exactly and request evidence for the selected industrial bag. Compare pressure drop, temperature and particle performance only when the test report identifies the same configuration.',
    ],
    paragraphLinks:[
     {before:'See the scope of ',label:'ISO 11057:2011',href:'https://www.iso.org/standard/50020.html',after:' when reviewing cleanable-media test reports.',external:true},
    ],
   },
   {
    title:'Specify dimensions and construction without guessing',
    paragraphs:[
     'PARK lists standard and special sizes for industrial bag filters. The supplied product information does not give a universal dust-collector bag dimension or a roll-width schedule. Send the actual dimensions or drawing for the collector under review. Do not copy a size from a pocket-filter or HVAC specification into a dust-collection enquiry unless the equipment documentation confirms that it is the required assembly.',
     'Metal or plastic ring/frame options are listed. Confirm the opening, support and mounting against the collector drawing or current part. The available catalogue does not provide a complete cuff, seam, gasket or finish schedule, so request details for your specific assembly.',
    ],
    table:{
     caption:'Buyer-side checklist for a comparable filter-bag quotation',
     headers:['Information to send','Why it helps','Confirmation to request'],
     rows:[
      ['Collector model and filter reference','Connects the request to the equipment and current assembly.','Confirm compatibility with the collector and mounting.'],
      ['Drawing, dimensions and photographs','Clarifies the requested size and visible connection details.','Confirm the final dimensions and frame/ring configuration.'],
      ['Application and dust description','Gives context for reviewing the catalogue-listed media.','Confirm the proposed material against the process.'],
      ['Operating data and cleaning arrangement','Provides the plant’s current technical requirements.','Request product-specific operating limits and supporting evidence.'],
      ['Quantity and required documentation','Helps define the commercial request and approval records.','Confirm availability, quotation scope and documents with the supplier.'],
     ],
    },
   },
   {
    title:'Match the product to PARK’s listed applications',
    paragraphs:[
     'PARK’s industrial bag-filter information names applications across cement and construction, steel and metals, power plants, chemical and pharmaceutical processing, mining and minerals, food processing, wood and furniture, automotive and general manufacturing, and paint and coating. These are the catalogue’s stated application areas. A listed industry is a starting point for an enquiry, not proof that one material or bag construction fits every process within it.',
     'Include the operation inside the plant, dust description and collector details; an industry name alone cannot determine material, dimensions or performance. For an application outside the listed examples, send the process details and request a suitability review.',
    ],
   },
   {
    title:'What to confirm with a dust collector filter bags manufacturer',
    paragraphs:[
     'Compare quotations against the same dimensions, mounting, material designation and requested documents. A price comparison is useful when the proposed assemblies address the same collector and specification. Ask suppliers to identify and explain any change in material or construction.',
     'Keep the source of each performance value in your approval record. Confirm whether a test result applies to the exact medium and finished bag or only to a media specimen. Get tolerances, frame details and approval documents in writing before releasing a purchase order.',
     'Start with PARK’s listed Industrial Bag Filters and include the collector information. The team can review the available options and identify specifications needing confirmation. Product-specific service life, efficiency, minimum-order and sample terms require separate confirmation.',
    ],
    paragraphLinks:[
     {before:'Start with the ',label:'Industrial Bag Filters product page',href:'/products/dust-collector-bag-filters',after:' and share your project details through the enquiry section.'},
    ],
   },
  ],
  products:['bag-filter'],
  question:'What should I send to a dust collector filter bags manufacturer for a quotation?',
  answer:'Send the collector make and model, current bag reference, dimensions or drawing, application and dust description, relevant operating information, requested material, quantity and any required technical documents. Ask the supplier to confirm fit and product-specific limits in writing.',
  faqs:[
   {question:'Which materials are listed for PARK industrial bag filters?',answer:'PARK lists PET (polyester), PPS, PTFE, glass fibre, aramid, polypropylene (PP), homopolymer acrylic (HPA) and P84. Confirm the material for your collector and process before ordering.'},
   {question:'Can I request a special size for a dust collector bag?',answer:'PARK’s product information lists standard and special sizes. Send the collector reference, dimensions or drawing so the requested size and assembly can be reviewed.'},
   {question:'Which frame options are listed for PARK bag filters?',answer:'The product information lists metal or plastic ring/frame options. Confirm the exact mounting and support arrangement against your dust collector.'},
   {question:'Which industries are listed for PARK industrial bag filters?',answer:'The catalogue lists cement and construction, steel and metals, power plants, chemical and pharmaceutical processing, mining and minerals, food processing, wood and furniture, automotive and general manufacturing, and paint and coating.'},
   {question:'What should I send to a dust collector filter bags manufacturer for a quotation?',answer:'Include the collector make and model, current filter reference, dimensions or drawing, application, dust description, relevant operating conditions, requested media, quantity and any technical-document requirements. Ask for written confirmation of fit and performance data for the selected assembly.'},
  ],
  callToAction:{
   title:'Discuss an industrial bag-filter requirement',
   description:'Share your collector reference, current bag dimensions, application and requested material. PARK can review the listed Industrial Bag Filter options and identify the product details that need confirmation.',
   label:'Send your dust-collection enquiry',href:'/#contact',
  },
 },
 {
  slug:'liquid-bag-filter-selection',title:'How to Specify a Liquid Bag Filter for Your Process',
  description:'Choose a liquid bag filter by fluid, micron rating, flow, housing dimensions and sealing ring. Prepare an enquiry for process water, coolant or particle removal.',
  kicker:'LIQUID & PROCESS FILTRATION',readTime:'4 min read',
  intro:'A micron value is only one part of a liquid-filter specification. The fluid, operating temperature, flow, housing and sealing arrangement also matter. PARK offers polypropylene liquid bag filters with customer-specific formats and sealing-ring options for particle-removal applications.',
  takeaways:['Identify the liquid and particles before choosing a rating.','Confirm the complete bag and ring fit in the housing.','Particle removal is different from dissolved-contaminant treatment.'],
  sections:[
   {title:'Define what needs to be removed',paragraphs:['Describe the suspended particles or contamination in the liquid and the downstream equipment you want to protect. Catalogue applications include process water, machine coolants, wastewater, and food or pharmaceutical processes.','A bag filter retains particles as the liquid passes through the media. It should not be described as removing every dissolved substance or replacing all other water-treatment stages. Share any specific quality requirement so the filtration role can be confirmed.']},
   {title:'Treat micron ratings as a specification to verify',paragraphs:['The supplied PARK liquid-filter entry lists 1.5, 2.5, 7.5, 10 and 34 micrometre options. Confirm the available selected rating, the test basis and the retention required by your process. These values describe catalogue options, not one fixed performance level.','A smaller listed number alone does not confirm the best filter. Discuss the contaminant load, required flow and pressure conditions, as well as the performance evidence for the selected medium.']},
   {title:'Match media to the actual fluid conditions',paragraphs:['PARK lists polypropylene media for liquid bag filters. Confirm compatibility with the liquid identity, concentration where relevant, temperature and any chemical exposure. Do not infer compatibility from a broad industry category.','For food, pharmaceutical or another controlled process, include the application-specific documentation requirements in the enquiry. A listed application is not a substitute for confirming the selected product and the evidence your process requires.']},
   {title:'Check the bag, ring and housing together',paragraphs:['The catalogue includes polypropylene or stainless-steel sealing-ring options and customer-specific bag sizes. Record the housing make or model, bag diameter and length, ring dimensions and the installation arrangement.','Include an existing drawing or part reference if you have one. The seal needs to suit the housing; bypass around an incorrectly fitted bag can undermine the intended particle-removal function.']},
   {title:'Send the details that move a quotation forward',paragraphs:['A useful enquiry combines fluid conditions with the exact assembly. If some information is not known, say which details are available and which need confirmation.','Replacement planning depends on the process and operating evidence. Ask for the selected product information and follow the equipment guidance rather than assuming a fixed replacement interval.'],checks:['Liquid identity, temperature and relevant concentration','Contaminant description and required particle rating','Flow and pressure information','Housing reference, bag dimensions and ring arrangement','Quantity and process documentation requirements']},
  ],products:['liquid-filter'],question:'Does a liquid bag filter remove dissolved chemicals?',answer:'The catalogue liquid bags are described for suspended-particle removal. Do not assume removal of dissolved chemicals or all microbial contaminants. Specify the contaminant and required treatment result so the filtration role can be confirmed.'
 },
];
export const resourceForProduct=(slug:string)=>buyerResources.find(resource=>resource.products.includes(slug));
