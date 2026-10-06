export type ProductDetails = {
  definition: string;
  operation: string;
  benefits: { title: string; text: string }[];
  selection: string[];
  variants?: { name: string; image?: string; explanation: string }[];
  question: string;
  answer: string;
};

export const productDetails: Record<string, ProductDetails> = {
 'panel-filter': {
  definition: 'A panel filter is a framed air filter made with pleated synthetic nonwoven media. Also known as pleated filter, cassette filter, frame filter, minipleat filter and filter cell. These describe catalogue formats; the exact assembly should be checked against your installation.',
  operation: 'Air passes through the media while airborne particles are retained. Pleats place more media into a compact framed area. In an HVAC or railway ventilation system, the frame and fit help direct the airflow through the filter rather than around it.',
  benefits: [{title:'Ventilation protection',text:'Captures airborne particles before they continue through the ventilation system.'},{title:'A frame for your installation',text:'Metal and plastic options, together with standard or special sizes, support different housing requirements.'},{title:'A range of media grades',text:'The catalogue lists multiple coarse and fine-particle options so the filter can be specified around the application.'}],
  selection:['Measure the overall frame dimensions and depth, not only the visible media.','Share the required airflow, filter class and acceptable pressure drop.','Confirm operating temperature against the catalogue value of 70°C.','Confirm the frame, seal and minipleat or other construction required by the housing.'],
  question:'Is a panel filter only for railway coaches?',answer:'No. Our range includes panel filters in railway, manufacturing, heavy industry and living ranges. It lists HVAC, cleanrooms, offices, schools, hospitals and other indoor ventilation applications.'
 },
 'pocket-filter': {
  definition:'A pocket filter uses an extended-surface bag or pocket arrangement in an air-handling system. It is an HVAC filter, distinct from the industrial dust-collection bag filters also offered in the catalogue.',
  operation:'Air travels through the pocket media, where dust and particulate matter are retained. The extended surface provides space for filtration and contaminant collection while the selected media and system airflow determine resistance.',
  benefits:[{title:'Extended filtration surface',text:'The pocket format provides media area for HVAC and air-handling filtration.'},{title:'Application flexibility',text:'Catalogue applications include hospitals, laboratories, public institutions, shopping centres and paint booths.'},{title:'Service planning',text:'These filters provide durable media, dust retention and easy maintenance; actual replacement intervals depend on site conditions.'}],
  selection:['Provide the frame dimensions, pocket depth and required pocket arrangement.','Specify the airflow and media grade for the air-handling unit.','Confirm metal or plastic frame compatibility.','Plan inspection and replacement around pressure drop and the actual dust load.'],
  question:'How is a pocket filter different from an industrial bag filter?',answer:'The pocket filter here is part of HVAC and air handling. The industrial bag filter is listed for continuous industrial dust collection in facilities such as cement and power plants. Select by the system being filtered, not by the similar name.'
 },
 'hepa-filter': {
  definition:'These filters provide high-efficiency air filters made from a mixture of borosilicate micro glass fibres and synthetic components. The listed catalogue range covers E10, E11, E12, H13, H14 and U15 options; these are different grades, not one common performance level.',
  operation:'Air passes through fine filtration media that retain airborne particles. The catalogue describes capture of fine dust, pollen, allergens and other particulate contaminants, including particles below 1 µm. Installation sealing and the selected grade matter alongside the media itself.',
  benefits:[{title:'Controlled air environments',text:'Listed for cleanrooms, laboratories, pharmacy, medical equipment, data centres and food industry applications.'},{title:'Grade selection',text:'EN 1822 and ISO 29463 catalogue options allow discussion of the particle-retention requirement.'},{title:'Seal flexibility',text:'Different seal types are listed for installation-specific requirements.'}],
  selection:['Specify the exact grade and request the matching test report.','Provide filter dimensions, airflow and pressure-drop requirements.','Confirm the seal and housing fit to address bypass around the filter.','Do not treat particle filtration as gas adsorption or a guarantee of infection prevention.'],
  question:'Does every filter in the catalogue range have the same efficiency?',answer:'No. The listed classes are distinct options. Confirm the selected grade, filtration efficiency and supporting test report. Request evidence for the selected filter rather than applying that figure to the entire range.'
 },
 'cabin-air-filter': {
  definition:'A cabin air filter treats the air entering a vehicle passenger compartment. The catalogue offers five approaches: particulate, activated carbon, fine-dust PM2.5, bio-functional and HEPA filtration.',
  operation:'Particulate media retain dust and pollen. Activated carbon adds an adsorption layer for certain gases and odours. Fine-fibre and high-efficiency variants address finer airborne particles; bio-functional media combine particle retention with the catalogue’s allergen-control approach.',
  benefits:[{title:'Passenger-focused filtration',text:'Targets contaminants entering the passenger cabin through the ventilation system.'},{title:'A choice of filtration functions',text:'Select particulate capture, carbon adsorption or a combined approach around the requirement.'},{title:'Vehicle-specific fit',text:'Filter dimensions, installation fit and airflow should be confirmed for the vehicle ventilation system.'}],
  selection:['Provide the vehicle model, filter housing dimensions and existing part reference if available.','Clarify whether the priority is dust, fine particles, odours, gases or a combination.','Confirm airflow resistance and compatibility with the cabin ventilation system.','Request variant-specific evidence for allergen, gas and efficiency claims.'],
  variants:[
   {name:'Particle filter',image:'image20',explanation:'These filters provide capture of PM10-sized particles, dust and pollen. It also describes resistance to moisture and temperature variations. Confirm the operating range for the selected vehicle filter.'},
   {name:'Activated carbon filter',image:'image16',explanation:'Combines particle filtration with an activated-carbon layer for odour and gas adsorption. Adsorption options address gases including SO₂, nitrogen oxides and hydrocarbons. Capacity and effectiveness depend on the pollutant, media and operating conditions.'},
   {name:'Fine dust PM2.5 filter',image:'image17',explanation:'Uses a durable carrier layer with ultra-fine polymer fibres. These filters provide fine and ultra-fine particle capture; ask for the specific particle-efficiency and airflow data.'},
   {name:'Bio-functional filter',image:'image18',explanation:'Combines particle filtration, activated-carbon gas and odour adsorption, and specialised media described as binding allergens. Confirm the selected media and evidence for the stated function.'},
   {name:'HEPA filter',image:'image19',explanation:'The presentation describes this cabin variant for ultra-fine particle capture and states an H14 efficiency above 99.995%. Request the selected filter test report to confirm its performance.'}
  ],
  question:'Which cabin variant should I enquire about?',answer:'Start with the vehicle fit and the main contaminant. A particle filter addresses dust and pollen; carbon options add an adsorption function; fine-dust and high-efficiency variants address smaller particles. Share the operating requirement so the team can confirm a suitable variant.'
 },
 'engine-air-filter': {
  definition:'An engine air filter removes airborne contaminants from intake air before it reaches the engine. Available options include synthetic nonwoven engine filters and cellulose engine filters, including two-wheeler and four-wheeler formats.',
  operation:'Intake air passes through the selected media, which retain dust, dirt, sand and other particles. The assembly must balance contaminant capture with the airflow needed by the engine.',
  benefits:[{title:'Intake-air protection',text:'Helps keep abrasive airborne contaminants out of the engine intake.'},{title:'Media choices',text:'Synthetic nonwoven and cellulose formats are both available in the range.'},{title:'Fit around the vehicle',text:'Standard sizes and special sizes on request are listed for different assemblies.'}],
  selection:['Share the vehicle or engine model and existing filter reference.','Confirm the required synthetic or cellulose construction.','Specify the housing dimensions, seal and airflow requirement.','Discuss dust exposure and service conditions rather than choosing on appearance alone.'],
  variants:[{name:'Synthetic nonwoven engine filters',image:'image21',explanation:'Described for dust, dirt, sand and airborne contaminant removal with good airflow under changing riding and road conditions. Available formats include two-wheeler and four-wheeler formats.'},{name:'Cellulose engine filters',image:'image23',explanation:'Described for passenger cars and removal of dust, dirt, sand, pollen and other airborne contaminants from engine intake air. Standard and special-size options are listed.'}],
  question:'Can a cabin filter replace an engine air filter?',answer:'These catalogue products serve different systems. Cabin filters treat passenger ventilation air; engine filters protect engine intake air. Confirm the required assembly and engine reference when enquiring.'
 },
 'battery-air-filter': {
  definition:'A hybrid EV battery air filter is designed for systems that use filtered air for battery cooling. It addresses dust and debris in that cooling-air path, rather than replacing the complete thermal-management system.',
  operation:'Cooling air passes through synthetic filter media before continuing toward the battery cooling system. The selected filter should meet the airflow, media and fit requirements of that specific battery assembly.',
  benefits:[{title:'Cleaner cooling air',text:'Helps keep dust and debris out of the battery cooling-air path.'},{title:'Application-specific media',text:'Our range includes several coarse and fine-particle media classes.'},{title:'Custom assembly discussion',text:'Standard and special sizes, with PET fabric frame options, are listed.'}],
  selection:['Confirm that the battery system uses an air-filtered cooling path.','Provide the vehicle model, cooling-system dimensions and existing filter reference.','Share airflow, pressure-drop and selected media-grade requirements.','Confirm PET fabric frame compatibility and the replacement procedure.'],
  question:'Is this filter suitable for every electric vehicle?',answer:'The catalogue describes hybrid and electric vehicle battery-cooling applications. Suitability depends on whether the vehicle has the relevant air-cooling filtration system and on its assembly requirements. The vehicle and thermal-management design must be confirmed.'
 },
 'car-purifier-filter': {
  definition:'A console or car air-purifier filter is a compact filter assembly for in-car air purifiers. It treats circulating cabin air in the purifier, rather than necessarily replacing the vehicle’s main cabin ventilation filter.',
  operation:'The purifier moves cabin air through the filter. These filters provide particulate media combined with activated carbon to address fine particles, dust, pollen, allergens, odours and gaseous pollutants.',
  benefits:[{title:'Compact cabin-air treatment',text:'Designed around the format of an in-car purifier.'},{title:'Combined media options',text:'High-efficiency particle media and carbon functions are available.'},{title:'Installation fit',text:'PET fabric frame options and application-specific sizes are listed.'}],
  selection:['Provide the purifier model, dimensions and existing filter assembly.','Specify the particle grade and whether an activated-carbon function is required.','Confirm pressure drop against the purifier airflow requirement.','Request the selected EN 1822 or ISO 29463 grade and its test information.'],
  question:'What should I specify for a replacement purifier filter?',answer:'Start with the purifier make or assembly drawing, outer dimensions and required media. The catalogue lists several filtration grades, so confirm which one the device is designed to use.'
 },
 'filter-mats': {
  definition:'Filter mats are synthetic PET/PES nonwoven media supplied as rolls or customer-specific cuts. They capture dust, pollen and larger airborne particles, including in pre-filtration applications that protect downstream fine filters.',
  operation:'Air passes through the nonwoven structure, where larger particles are retained. The catalogue specifies a mechanically compressed clean-air side; grade, thickness and cut size can be discussed for the installation.',
  benefits:[{title:'Flexible supply format',text:'Roll goods and customer-specific cuts support different filter holders and equipment.'},{title:'Pre-filtration role',text:'Retains larger contaminants before finer downstream filters.'},{title:'Broad equipment applications',text:'Listed for ventilation, fans, air purifiers, control cabinets, surface technology and paint systems.'}],
  selection:['Provide the roll or cut dimensions and required thickness.','Specify the media grade and airflow requirement.','Confirm installation orientation, including the compressed clean-air side.','Describe the dust exposure and any downstream fine filter that needs protection.'],
  question:'Where are filter mats used beyond railway ventilation?',answer:'Our range includes air-conditioning devices, fans, air purifiers, forced ventilation for low-energy applications with or without heat recovery, control cabinets, engine protection covers, surface technology, painting, paint spraying and drying systems.'
 },
 'ceiling-filter': {
  definition:'Ceiling filters are synthetic PET/PES nonwoven filters described for final-stage air filtration in paint booths, spray booths, cleanrooms and ventilation systems.',
  operation:'Air entering through the filter media is treated for fine dust, paint particles and other airborne contaminants. The catalogue lists a mechanically compressed clean-air side and supply as rolled goods or custom cuts.',
  benefits:[{title:'Paint-area air control',text:'Helps maintain a cleaner working environment for painting, spraying and drying applications.'},{title:'Cut to the installation',text:'Roll and customer-specific formats allow discussion of booth dimensions.'},{title:'Defined media options',text:'ISO Coarse/ePM10 and legacy catalogue grades are listed for selection.'}],
  selection:['Provide the booth or ventilation-system filter dimensions.','Describe the coating process, airflow direction and dust-control requirement.','Specify the required media grade and confirm pressure drop.','Confirm the clean-air-side orientation and replacement arrangement.'],
  question:'Is a ceiling filter the same as any filter mat?',answer:'Both catalogue products use PET/PES nonwoven materials, but the ceiling-filter description is focused on final-stage paint and spray-booth air filtration. Match the selected grade and construction to the stage of filtration in your system.'
 },
 'bag-filter': {
  definition:'Industrial bag filters are dust-collection filters described for continuous processes with high particle loads. They are a separate product family from HVAC pocket filters.',
  operation:'Dust-laden process air passes through the selected filter medium, which retains particulate matter. The appropriate material and assembly depend on process conditions and the dust collector. Our range includes several polymer, glass-fibre and aramid media options.',
  benefits:[{title:'Continuous dust collection',text:'These filters support continuous and high-dust-load applications.'},{title:'Material selection',text:'PET, PPS, PTFE, glass fibre, aramid, PP, HPA and P84 options are listed.'},{title:'Industry coverage',text:'Applications include cement, metals, power, chemicals, minerals, woodworking and material handling.'}],
  selection:['Provide the dust-collector design, bag dimensions and ring or attachment requirements.','Describe the dust, process temperature, moisture and chemical exposure.','Confirm the selected medium and any cleaning-system compatibility.','Request dust-collection performance data; confirm which classifications apply to the selected assembly.'],
  question:'How should I choose between the listed materials?',answer:'Share the process conditions rather than treating the catalogue material list as interchangeable options. The selected medium must be checked for the actual dust, temperature, chemical exposure and collector assembly. P84 naming and the repeated catalogue classification ranges require clarification.'
 },
 'cartridge-filter': {
  definition:'A cartridge filter is a cartridge-format product for industrial dust collection and process-air filtration. It is available in the heavy duty range alongside bag, panel and pocket filters.',
  operation:'Dust-bearing air passes through the cartridge media and particles are retained. The cartridge construction, dimensions, seals and selected medium should be matched to the dust-collection equipment.',
  benefits:[{title:'Cartridge assembly',text:'Offers a distinct dust-collection filter format for equipment designed to use cartridges.'},{title:'Process-air applications',text:'Available options include industrial sectors with high airborne particle loads.'},{title:'Specification discussion',text:'Standard and custom sizes and a range of media are listed, subject to cartridge-format confirmation.'}],
  selection:['Share the collector model or drawing, cartridge dimensions and attachment method.','Describe the dust, airflow, temperature and chemical exposure.','Confirm the cartridge medium and cleaning-system compatibility.','Request cartridge-specific construction, media and performance specifications.'],
  question:'Can I use all the bag-filter specifications for a cartridge?',answer:'Bag and cartridge formats are not interchangeable. Confirm the cartridge-specific construction, medium, fit and performance with the team.'
 },
 'liquid-filter': {
  definition:'Liquid bag filters use polypropylene media to remove suspended solids, dirt, particles and other contaminants from liquids. The catalogue lists customer-specific sizes and polypropylene or stainless-steel sealing rings.',
  operation:'Liquid flows through the bag medium while particles are retained. Selecting the micron rating, bag dimensions and ring fit helps define the required filtration assembly; fluid and operating compatibility must also be checked.',
  benefits:[{title:'Downstream equipment protection',text:'These filters provide protection of pumps, valves, pipelines and processing equipment from suspended contamination.'},{title:'Several particle ratings',text:'Listed catalogue options are 1.5, 2.5, 7.5, 10 and 34 µm.'},{title:'Process-specific fit',text:'Customer-specific sizes and two sealing-ring materials are listed.'}],
  selection:['Identify the liquid, concentration, operating temperature and any chemical exposure.','Provide the flow rate, pressure conditions, housing dimensions and bag size.','Specify the required particle rating and confirm how that rating is tested.','Confirm the sealing ring, material compatibility and replacement arrangement.'],
  question:'Does a listed application guarantee compatibility with my liquid?',answer:'No. Our range includes broad applications such as acids, bases, coolants, amines, solvents and water-treatment processes. The actual liquid, concentration, temperature, flow and housing requirements determine suitability; confirm them before ordering.'
 },
 'swimming-pool-filter': {
  definition:'Swimming pool filters are included in the PARK living range. Share your filtration-system details to discuss the product format and specifications available for your installation.',
  operation:'Discuss the filtration requirement and existing equipment with PARK. The product-specific media, construction and operating details need to be confirmed for your pool system.',
  benefits:[{title:'Pool circulation filtration',text:'An option for specifying filtration within your pool circulation system.'},{title:'Assembly matching',text:'Drawings and measurements help our team discuss the product fit for your system.'},{title:'Technical confirmation',text:'Request media, dimensions and operating information before purchase.'}],
  selection:['Provide the pool filtration-system or housing model.','Share the existing filter dimensions and installation details.','Confirm flow, water operating conditions and required filtration rating.','Request water-filtration performance and compatibility information for the selected assembly.'],
  question:'What details help match a replacement pool filter?',answer:'Share the system or housing model, existing filter dimensions, installation details and filtration requirement. Our team can discuss the available product and confirm its specifications before you order.'

 }
};
