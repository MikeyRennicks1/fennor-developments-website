// Service/content route inventory; legal routes are separate.
export const pageGroups = [
  {label:'Solar',path:'/solar',pages:[['','Solar overview'],['domestic','Domestic solar'],['commercial','Commercial solar'],['farm','Farm solar'],['ground-mounted','Ground-mounted solar'],['battery-storage','Battery storage'],['accessories','Accessories'],['accessories/eddi','EDDI hot-water diversion'],['accessories/backup-power','Backup & changeover'],['accessories/ev-charging','EV charging'],['calculator','Solar calculator'],['grants-funding','Grants & funding'],['projects-case-studies','Solar projects'],['faq-advice','Solar FAQ & advice']]},
  {label:'Electrical',path:'/electrical',pages:[['','Electrical overview'],['domestic','Domestic electrical'],['commercial','Commercial electrical'],['industrial-maintenance','Industrial electrical maintenance']]},
  {label:'Renovations',path:'/renovations',pages:[['','Renovations overview'],['full-home','Full-home renovations'],['kitchens','Kitchen renovations'],['bathrooms','Bathroom renovations'],['older-homes','Older homes'],['projects-case-studies','Renovation projects']]},
  {label:'Retrofitting',path:'/retrofitting',pages:[['','Retrofitting overview'],['whole-home','Whole-home retrofit'],['insulation','Insulation'],['windows-doors','Windows & doors'],['ventilation','Ventilation'],['grants-funding','Retrofit grants'],['projects-case-studies','Retrofit projects']]},
  {label:'Heat pumps',path:'/heat-pumps',pages:[['','Heat pumps overview'],['air-to-water','Air-to-water heat pumps'],['suitability','Is my home suitable?'],['with-solar','Heat pumps with solar'],['grants','Heat-pump grants'],['faq','Heat-pump FAQ']]},
  {label:'Building',path:'/building',pages:[['','Building overview'],['extensions','Extensions'],['new-builds','New builds'],['attic-conversions','Attic conversions']]},
  {label:'About',path:'/about',pages:[['','Our story'],['your-project','Your project journey'],['reviews','Reviews & feedback'],['areas','Areas we serve']]},
  {label:'Advice',path:'/advice',pages:[['','Homeowner guides'],['grant-updates','Grants & funding'],['news','News & insights']]},
  {label:'Contact',path:'/contact',pages:[['','Discuss your project'],['assessment','Request an assessment']]},
] as const;
export const allPages=[{path:'/',label:'Home',group:'Home'},...pageGroups.flatMap(group=>group.pages.map(([slug,label])=>({path:group.path+(slug?`/${slug}`:''),label,group:group.label})))];
