export const mediaLayers = [
  {name:'Materials',label:'Choose the foundation',items:[
    {name:'Polyester (PET)',short:'PET / Polyester',text:'A synthetic fibre option for nonwoven filtration media. Match the finished construction, thickness and grade to the system and operating conditions.'},
    {name:'Polypropylene (PP)',short:'PP / Polypropylene',text:'A polymer option for air-filtration media and liquid bag filters. For liquid applications, specify the fluid, concentration, temperature and required particle rating.'},
    {name:'Glass fibre',short:'Glass fibre',text:'Fine-filtration options use borosilicate micro glass fibres with synthetic components. Select the required grade, assembly and sealing arrangement.'},
    {name:'Activated carbon',short:'Activated carbon',text:'An adsorption option for certain gases and odours, combined with particle filtration where required. Capacity depends on the contaminant, medium and operating conditions.'},
  ]},
  {name:'Technologies',label:'Build the media structure',items:[
    {name:'Needle punch',short:'Needle punch',text:'Mechanical bonding entangles fibres to form a nonwoven structure. Discuss the thickness, density and finished-media requirements for your application.'},
    {name:'Spunlaid',short:'Spunlaid',text:'A web-forming route using extruded polymer filaments. The finished construction and any additional layers are selected for the filtration task.'},
    {name:'Meltblown',short:'Meltblown',text:'A web-forming process used to produce fine-fibre nonwoven media. Specify the selected grade and required airflow rather than assuming one efficiency for every medium.'},
    {name:'Thermo bonding',short:'Thermo bonding',text:'Thermal bonding uses heat to consolidate a nonwoven web. The resulting structure is chosen around the required strength, handling and filtration function.'},
  ]},
  {name:'Enhancements',label:'Refine the filtration function',items:[
    {name:'Electret',short:'Electret',text:'A media enhancement option involving electrostatic charge. Ask whether the selected medium uses this treatment and request its product-specific performance information.'},
    {name:'Antimicrobial',short:'Antimicrobial',text:'An optional treatment for the selected medium. Confirm the treatment, intended function and supporting evidence for your application.'},
    {name:'Bio-functional',short:'Bio-functional',text:'Specialised media options address functions such as allergen control in cabin filtration. Discuss the chosen variant and its supporting performance information.'},
    {name:'Lamination',short:'Lamination',text:'Combines layers into a finished media construction. Discuss the layer combination, mechanical requirements and intended filtration function.'},
    {name:'Impregnation',short:'Impregnation',text:'A treatment option for the selected media. Specify the intended function and compatibility requirements when discussing the formulation.'},
    {name:'Colouring',short:'Colouring',text:'A finishing option for the medium. Discuss the required appearance and available finishes alongside the technical specification.'},
  ]},
] as const;

export const mediaPriorities = [
  {name:'Filtration efficiency',label:'Capture',text:'Designed to capture dust, particles, allergens and other contaminants, supporting cleaner air and helping protect people, processes and equipment.'},
  {name:'Low pressure drop',label:'Airflow',text:'An optimised media structure balances particle capture with low airflow resistance, helping manage energy demand at the required flow rate.'},
  {name:'Dust-holding capacity',label:'Retention',text:'Contaminant retention supports filter service life, consistent operation and maintenance planning. Actual replacement intervals depend on the application.'},
] as const;
