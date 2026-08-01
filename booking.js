/* =========================================================================
   ORIELLA BOOKING  ·  embedded booking system (EN / DE)
   Plugs into the site's language switch (localStorage 'oriellaLang').
   ========================================================================= */
(function(){
if(!document.getElementById('ob-app')) return;   // only runs where the form exists

/* ---------- EMAIL (EmailJS) ---------- */
const EMAILJS = {
  enabled:true,
  publicKey:'CzNVVGWC6k48vM4N4',
  serviceId:'service_bdvaeeg',
  customerTemplate:'template_iieuonl',
  adminTemplate:'template_s7rq3cd',
  adminEmail:'info@oriella.ch'
};

/* ---------- Translations ---------- */
const OB_T = {
  en:{
    p_details:'Details', p_service:'Service', p_when:'Collection', p_confirm:'Confirm', p_date:'Date',
    book_now:'Book now',
    draft_saved:'We saved your progress on this device.', draft_clear:'Start over',
    step1:'Step 1', step2:'Step 2', step3:'Step 3', step4:'Step 4', step5:'Step 5', step6:'Step 6',
    details_title:'Your details', details_sub:'So we know where to collect from and how to reach you.',
    l_name:'Full name', l_email:'Email address', l_phone:'Phone number', l_address:'Full address', l_postcode:'Postcode', l_town:'Town / City',
    e_name:'Please enter your full name.', e_email:'Please enter a valid email.', e_phone:'Please enter your phone number.',
    e_address:'Please enter your address.', e_postcode:'Please enter your postcode.', e_town:'Please enter your town or city.',
    service_title:'Choose your service', service_sub:'Pick the option that suits your laundry.',
    l_garments:'Which garments should we iron?', optional:'(optional)', garments_ph:'e.g. 5 shirts, 2 pairs of trousers, 1 dress',
    e_service:'Please select a service.',
    express_title:'Need it faster?', express_name:'Express Service', express_desc:'Priority handling for a quicker turnaround.',
    when_title:'Collection date & time', when_sub:'We collect in the evening. Only available dates are shown.',
    choose_slot:'Choose a time slot', e_datetime:'Please choose a date and time slot.',
    notes_title:'Additional information', notes_sub:'Approximate amount of laundry, number of shirts, detergent preferences, access instructions, or anything else.',
    notes_ph:'e.g. About two loads, non-bio detergent, buzzer is flat 3B…',
    summary_title:'Booking summary',
    price_note:'The final price will be confirmed after collection, once the laundry has been sorted and weighed.',
    submit:'Request collection', submit_sending:'Sending…',
    thankyou:'Thank you!', confirm_msg:"Your Oriella collection request has been received. We'll confirm your booking shortly.",
    add_calendar:'Add to calendar', another:'Make another booking', staff_login:'Oriella staff login',
    ref_label:'Your reference:',
    s_name:'Name', s_contact:'Contact', s_address:'Address', s_service:'Service', s_garments:'Garments to iron',
    s_express:'Express service', s_date:'Collection date', s_slot:'Time slot', s_collection:'Collection',
    express_yes:'Yes (+20%)',
    summary_empty:'Fill in the form above and your booking summary will appear here.',
    no_dates:'No collection dates are currently available. Please check back soon.',
    no_slots:'No slots left on this date — please pick another.',
    t_incomplete:'Please complete the highlighted fields.',
    t_slot_taken:'Sorry, that time slot was just taken. Please choose another.',
    svc_wf:'Wash & Fold', svc_wfi:'Wash & Fold + Selected Ironing', svc_iron:'Ironing Only', svc_wi:'Wash & Iron',
    i_wash:'Washing', i_dry:'Drying', i_fold:'Folding', i_iron_sel:'Ironing selected garments', i_iron:'Ironing',
    n_wfi:'Ironing only selected garments (e.g. shirts, trousers or dresses).',
    n_iron:'You provide clean clothes that only need ironing.',
    n_wi:'Every garment is washed, dried and ironed.'
  },
  de:{
    p_details:'Angaben', p_service:'Service', p_when:'Abholung', p_confirm:'Bestätigen', p_date:'Datum',
    book_now:'Jetzt buchen',
    draft_saved:'Wir haben Ihren Fortschritt auf diesem Gerät gespeichert.', draft_clear:'Neu beginnen',
    step1:'Schritt 1', step2:'Schritt 2', step3:'Schritt 3', step4:'Schritt 4', step5:'Schritt 5', step6:'Schritt 6',
    details_title:'Ihre Angaben', details_sub:'Damit wir wissen, wo wir abholen und wie wir Sie erreichen.',
    l_name:'Vollständiger Name', l_email:'E-Mail-Adresse', l_phone:'Telefonnummer', l_address:'Vollständige Adresse', l_postcode:'PLZ', l_town:'Ort',
    e_name:'Bitte geben Sie Ihren vollständigen Namen ein.', e_email:'Bitte geben Sie eine gültige E-Mail ein.', e_phone:'Bitte geben Sie Ihre Telefonnummer ein.',
    e_address:'Bitte geben Sie Ihre Adresse ein.', e_postcode:'Bitte geben Sie Ihre PLZ ein.', e_town:'Bitte geben Sie Ihren Ort ein.',
    service_title:'Service wählen', service_sub:'Wählen Sie die passende Option für Ihre Wäsche.',
    l_garments:'Welche Teile sollen wir bügeln?', optional:'(optional)', garments_ph:'z. B. 5 Hemden, 2 Hosen, 1 Kleid',
    e_service:'Bitte wählen Sie einen Service.',
    express_title:'Schneller nötig?', express_name:'Express-Service', express_desc:'Bevorzugte Bearbeitung für eine schnellere Rückgabe.',
    when_title:'Abholdatum & Uhrzeit', when_sub:'Wir holen abends ab. Es werden nur verfügbare Termine angezeigt.',
    choose_slot:'Zeitfenster wählen', e_datetime:'Bitte wählen Sie Datum und Zeitfenster.',
    notes_title:'Zusätzliche Informationen', notes_sub:'Ungefähre Wäschemenge, Anzahl Hemden, Waschmittelwünsche, Zugangshinweise oder Sonstiges.',
    notes_ph:'z. B. etwa zwei Ladungen, Feinwaschmittel, Klingel bei Wohnung 3B…',
    summary_title:'Zusammenfassung',
    price_note:'Der Endpreis wird nach der Abholung bestätigt, sobald die Wäsche sortiert und gewogen wurde.',
    submit:'Abholung anfragen', submit_sending:'Senden…',
    thankyou:'Vielen Dank!', confirm_msg:'Ihre Abholanfrage bei Oriella ist eingegangen. Wir bestätigen Ihre Buchung in Kürze.',
    add_calendar:'Zum Kalender hinzufügen', another:'Weitere Buchung', staff_login:'Oriella Team-Login',
    ref_label:'Ihre Referenz:',
    s_name:'Name', s_contact:'Kontakt', s_address:'Adresse', s_service:'Service', s_garments:'Zu bügelnde Teile',
    s_express:'Express-Service', s_date:'Abholdatum', s_slot:'Zeitfenster', s_collection:'Abholung',
    express_yes:'Ja (+20%)',
    summary_empty:'Füllen Sie das Formular oben aus, dann erscheint hier Ihre Zusammenfassung.',
    no_dates:'Zurzeit sind keine Termine verfügbar. Bitte schauen Sie bald wieder vorbei.',
    no_slots:'Keine Zeitfenster mehr an diesem Tag — bitte wählen Sie einen anderen.',
    t_incomplete:'Bitte füllen Sie die markierten Felder aus.',
    t_slot_taken:'Dieses Zeitfenster wurde gerade vergeben. Bitte wählen Sie ein anderes.',
    svc_wf:'Waschen & Falten', svc_wfi:'Waschen & Falten + ausgewähltes Bügeln', svc_iron:'Nur Bügeln', svc_wi:'Waschen & Bügeln',
    i_wash:'Waschen', i_dry:'Trocknen', i_fold:'Falten', i_iron_sel:'Ausgewählte Teile bügeln', i_iron:'Bügeln',
    n_wfi:'Nur ausgewählte Teile bügeln (z. B. Hemden, Hosen oder Kleider).',
    n_iron:'Sie liefern saubere Kleidung, die nur gebügelt werden muss.',
    n_wi:'Jedes Teil wird gewaschen, getrocknet und gebügelt.'
  }
};
function curLang(){ return (localStorage.getItem('oriellaLang')==='de')?'de':'en'; }
function locale(){ return curLang()==='de'?'de-CH':'en-GB'; }
function L(k){ const d=OB_T[curLang()]; return (d&&d[k]!=null)?d[k]:(OB_T.en[k]!=null?OB_T.en[k]:k); }

/* ---------- Config ---------- */
const SERVICES=[
  {id:'wash-fold', nameKey:'svc_wf', incl:['i_wash','i_dry','i_fold']},
  {id:'wash-fold-iron', nameKey:'svc_wfi', incl:['i_wash','i_dry','i_fold','i_iron_sel'], noteKey:'n_wfi'},
  {id:'ironing', nameKey:'svc_iron', noteKey:'n_iron'},
  {id:'wash-iron', nameKey:'svc_wi', incl:['i_wash','i_dry','i_iron'], noteKey:'n_wi'}
];
const SLOTS=[
  {id:'17-18', start:'17:00', end:'18:00'},
  {id:'18-19', start:'18:00', end:'19:00'},
  {id:'19-20', start:'19:00', end:'20:00'}
];
const SLOT_LABELS={ en:{'17-18':'5:00 – 6:00 PM','18-19':'6:00 – 7:00 PM','19-20':'7:00 – 8:00 PM'},
                    de:{'17-18':'17:00 – 18:00 Uhr','18-19':'18:00 – 19:00 Uhr','19-20':'19:00 – 20:00 Uhr'} };
const STATUSES=['New Request','Confirmed','Collected','In Progress','Ready for Delivery','Delivered','Cancelled'];
const STATUS_COLORS={'New Request':['#eef1f0','#4a5652'],'Confirmed':['#e6f0fb','#2f5fa0'],'Collected':['#efe9fb','#5b3fa0'],
  'In Progress':['#fdf5e4','#8a6d1e'],'Ready for Delivery':['#e8f1ee','#2f6f63'],'Delivered':['#e6f4ec','#2f7d5b'],'Cancelled':['#fbecea','#c0483c']};
const DAYS_AHEAD=21, ADMIN_PASSCODE='oriellatest', DRAFT_KEY='oriella_draft';

const store={
  get bookings(){ try{return JSON.parse(localStorage.getItem('oriella_bookings')||'[]')}catch(e){return[]} },
  set bookings(v){ localStorage.setItem('oriella_bookings',JSON.stringify(v)) },
  get blocks(){ try{return JSON.parse(localStorage.getItem('oriella_blocks')||'{"dates":[],"slots":{}}')}catch(e){return{dates:[],slots:{}}} },
  set blocks(v){ localStorage.setItem('oriella_blocks',JSON.stringify(v)) }
};
const state={ service:null, date:null, slot:null, express:false };
let lastBooking=null, bookingsView='list', adminDayFilter=null, blockSelDate=null;
let bkCalMonth=startOfMonth(new Date()), blkCalMonth=startOfMonth(new Date()), custCalMonth=startOfMonth(new Date());
const TEXT_FIELDS=['fullName','email','phone','address','postcode','town','garments','notes'];
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));

/* ---------- helpers ---------- */
function dateKey(d){ const m=String(d.getMonth()+1).padStart(2,'0'),dd=String(d.getDate()).padStart(2,'0');return d.getFullYear()+'-'+m+'-'+dd; }
function fmtDay(d){ return d.toLocaleDateString(locale(),{weekday:'short'}); }
function fmtDate(d){ return d.toLocaleDateString(locale(),{day:'numeric',month:'short'}); }
function fmtFull(key,en){ return new Date(key+'T00:00:00').toLocaleDateString(en?'en-GB':locale(),{weekday:'long',day:'numeric',month:'long',year:'numeric'}); }
function slotLabel(id){ return (SLOT_LABELS[curLang()]||SLOT_LABELS.en)[id]||id; }
function enSlot(id){ return SLOT_LABELS.en[id]||id; }
function slotObj(id){ return SLOTS.find(x=>x.id===id); }
function svcName(id){ const s=SERVICES.find(x=>x.id===id); return s?L(s.nameKey):id; }
function enSvc(id){ const s=SERVICES.find(x=>x.id===id); return s?OB_T.en[s.nameKey]:id; }
function esc(s){ return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function val(id){ return ($('#'+id)?.value||'').trim(); }
function startOfMonth(d){ return new Date(d.getFullYear(),d.getMonth(),1); }
function addMonths(d,n){ return new Date(d.getFullYear(),d.getMonth()+n,1); }
function monthCells(ms){ const y=ms.getFullYear(),m=ms.getMonth();const sd=(new Date(y,m,1).getDay()+6)%7;const dim=new Date(y,m+1,0).getDate();const c=[];for(let i=0;i<sd;i++)c.push(null);for(let d=1;d<=dim;d++)c.push(new Date(y,m,d));while(c.length%7)c.push(null);return c; }
function toast(msg,type){ const t=document.createElement('div');t.className='toast'+(type?' '+type:'');t.textContent=msg;$('#ob-toasts').appendChild(t);setTimeout(()=>{t.style.opacity='0';t.style.transition='opacity .3s';setTimeout(()=>t.remove(),300)},3600); }

function isDateBlocked(k){ return store.blocks.dates.includes(k); }
function isSlotBlocked(k,s){ if(isDateBlocked(k))return true;return (store.blocks.slots[k]||[]).includes(s); }
function isSlotBooked(k,s){ return store.bookings.some(b=>b.date===k&&b.slot===s&&b.status!=='Cancelled'); }
function availableSlots(k){ return SLOTS.filter(s=>!isSlotBlocked(k,s.id)&&!isSlotBooked(k,s.id)); }
function availableDates(){ const out=[];const t=new Date();t.setHours(0,0,0,0);for(let i=1;i<=DAYS_AHEAD;i++){const d=new Date(t);d.setDate(d.getDate()+i);const k=dateKey(d);if(availableSlots(k).length)out.push({key:k,d});}return out; }

/* ---------- translate static labels ---------- */
function translateStatic(){
  $$('#ob-app [data-ob]').forEach(el=>{ const t=L(el.getAttribute('data-ob')); if(t!=null)el.textContent=t; });
  const n=$('#notes'); if(n)n.placeholder=L('notes_ph');
  const g=$('#garments'); if(g)g.placeholder=L('garments_ph');
}

/* ---------- render: services / dates / slots / summary ---------- */
function renderServices(){
  const wrap=$('#service-options'); wrap.innerHTML='';
  SERVICES.forEach(s=>{
    const incl=s.incl?`<ul class="incl">${s.incl.map(k=>`<li>${L(k)}</li>`).join('')}</ul>`:'';
    const note=s.noteKey?`<div class="note">${L(s.noteKey)}</div>`:'';
    const label=document.createElement('label'); label.className='option'+(state.service===s.id?' selected':'');
    label.innerHTML=`<input type="radio" name="service" value="${s.id}" ${state.service===s.id?'checked':''}/><div class="name">${L(s.nameKey)}</div>${incl}${note}`;
    label.querySelector('input').addEventListener('change',()=>{
      state.service=s.id;
      $$('#service-options .option').forEach(o=>o.classList.remove('selected')); label.classList.add('selected');
      $('#garments-field').classList.toggle('ob-hidden', s.id!=='wash-fold-iron');
      $('#service-err').style.display='none'; afterChange();
    });
    wrap.appendChild(label);
  });
}
function localizedDows(){ const base=new Date(2024,0,1);const out=[];for(let i=0;i<7;i++){const d=new Date(base);d.setDate(base.getDate()+i);out.push(d.toLocaleDateString(locale(),{weekday:'short'}));}return out; }
function renderDates(){
  const wrap=$('#ob-datecal'); if(!wrap)return;
  const dates=availableDates();
  if(!dates.length){ wrap.innerHTML=`<p class="empty-note">${L('no_dates')}</p>`;return; }
  const avail=new Set(dates.map(d=>d.key));
  const today=new Date();today.setHours(0,0,0,0);
  const minM=startOfMonth(dates[0].d), maxM=startOfMonth(dates[dates.length-1].d);
  if(custCalMonth<minM)custCalMonth=minM; if(custCalMonth>maxM)custCalMonth=maxM;
  const title=custCalMonth.toLocaleDateString(locale(),{month:'long',year:'numeric'});
  const canPrev=custCalMonth>minM, canNext=custCalMonth<maxM;
  let html=`<div class="cal-head"><span class="cal-title">${title}</span><div class="cal-nav">
      <button type="button" class="obtn tiny ghost" data-cust="-1" ${canPrev?'':'disabled'}>‹</button>
      <button type="button" class="obtn tiny ghost" data-cust="1" ${canNext?'':'disabled'}>›</button></div></div>
    <div class="cal-grid">${localizedDows().map(d=>`<div class="cal-dow">${d}</div>`).join('')}`;
  monthCells(custCalMonth).forEach(c=>{
    if(!c){ html+='<div class="cal-cell empty"></div>';return; }
    const k=dateKey(c), ok=avail.has(k);
    html+=`<div class="cal-cell ${ok?'':'unavail'}${state.date===k?' selected':''}" ${ok?`data-cd="${k}"`:''}><span class="cal-daynum">${c.getDate()}</span></div>`;
  });
  html+='</div>';
  wrap.innerHTML=html;
  $$('[data-cust]',wrap).forEach(b=>b.addEventListener('click',e=>{ custCalMonth=addMonths(custCalMonth,parseInt(e.currentTarget.getAttribute('data-cust')));renderDates(); }));
  $$('.cal-cell[data-cd]',wrap).forEach(c=>c.addEventListener('click',()=>{ state.date=c.getAttribute('data-cd');state.slot=null;renderDates();renderSlots();$('#datetime-err').style.display='none';afterChange();$('#slots-block').scrollIntoView({behavior:'smooth',block:'nearest'}); }));
}
function renderSlots(){
  const block=$('#slots-block'),wrap=$('#slot-chips');
  if(!state.date){ block.classList.add('ob-hidden');return; }
  block.classList.remove('ob-hidden'); wrap.innerHTML='';
  const slots=availableSlots(state.date);
  if(!slots.length){ wrap.innerHTML=`<p class="empty-note">${L('no_slots')}</p>`;return; }
  slots.forEach(s=>{
    const b=document.createElement('button'); b.type='button'; b.className='chip'+(state.slot===s.id?' selected':''); b.textContent=slotLabel(s.id);
    b.addEventListener('click',()=>{ state.slot=s.id;renderSlots();$('#datetime-err').style.display='none';afterChange(); });
    wrap.appendChild(b);
  });
}
function renderSummary(){
  const el=$('#summary'),rows=[];
  if(val('fullName'))rows.push([L('s_name'),val('fullName')]);
  const contact=[val('email'),val('phone')].filter(Boolean).join(' · '); if(contact)rows.push([L('s_contact'),contact]);
  const addr=[val('address'),val('town'),val('postcode')].filter(Boolean).join(', '); if(addr)rows.push([L('s_address'),addr]);
  if(state.service)rows.push([L('s_service'),svcName(state.service)]);
  if(state.service==='wash-fold-iron'&&val('garments'))rows.push([L('s_garments'),val('garments')]);
  if(state.express)rows.push([L('s_express'),L('express_yes')]);
  if(state.date)rows.push([L('s_date'),fmtFull(state.date)]);
  if(state.slot)rows.push([L('s_slot'),slotLabel(state.slot)]);
  el.innerHTML=rows.length?rows.map(([k,v])=>`<div class="summary-row"><span class="k">${k}</span><span class="v">${esc(v)}</span></div>`).join(''):`<p class="summary-empty">${L('summary_empty')}</p>`;
}
function detailsComplete(){ return ['fullName','phone','address','postcode','town'].every(id=>val(id))&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val('email')); }
function updateProgress(){ const done=[!!(state.date&&state.slot),!!state.service,detailsComplete(),false];$$('#ob-progress .ob-step').forEach((el,i)=>el.classList.toggle('done',done[i])); }
function afterChange(){ renderSummary();updateProgress();saveDraft(); }

/* ---------- validation ---------- */
function validateField(id){ const input=$('#'+id),f=input.closest('.field');let bad=!input.value.trim();if(id==='email'&&input.value.trim())bad=!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());f.classList.toggle('invalid',bad);f.classList.toggle('ok',!bad&&!!input.value.trim());return !bad; }
function validateAll(){ let ok=true;['fullName','email','phone','address','postcode','town'].forEach(id=>{if(!validateField(id))ok=false;});if(!state.service){$('#service-err').style.display='block';ok=false;}if(!state.date||!state.slot){$('#datetime-err').style.display='block';ok=false;}return ok; }

/* ---------- draft ---------- */
function saveDraft(){ const d={state:{...state}};TEXT_FIELDS.forEach(id=>d[id]=val(id));localStorage.setItem(DRAFT_KEY,JSON.stringify(d)); }
function restoreDraft(){ let d;try{d=JSON.parse(localStorage.getItem(DRAFT_KEY))}catch(e){return}if(!d)return;
  const has=TEXT_FIELDS.some(id=>d[id])||(d.state&&d.state.service);if(!has)return;
  TEXT_FIELDS.forEach(id=>{if(d[id])$('#'+id).value=d[id];});
  if(d.state){
    if(d.state.service){state.service=d.state.service;$('#garments-field').classList.toggle('ob-hidden',d.state.service!=='wash-fold-iron');renderServices();}
    if(d.state.express){state.express=true;$('#express').checked=true;$('#express-wrap').classList.add('selected');}
    if(d.state.date&&availableSlots(d.state.date).length){state.date=d.state.date;renderDates();renderSlots();
      if(d.state.slot&&availableSlots(d.state.date).some(s=>s.id===d.state.slot)){state.slot=d.state.slot;renderSlots();}}
  }
  $('#draft-banner').style.display='flex';
  $('#ob-reveal-wrap').classList.add('ob-hidden'); $('#ob-main').classList.remove('ob-hidden');  // auto-open with saved progress
  afterChange();
}
function clearDraft(){ localStorage.removeItem(DRAFT_KEY); }

/* ---------- submit ---------- */
function makeRef(){ return 'ORI-'+Date.now().toString(36).toUpperCase().slice(-5)+'-'+Math.floor(Math.random()*90+10); }
async function handleSubmit(e){
  e.preventDefault();
  if(!validateAll()){ toast(L('t_incomplete'),'err'); document.querySelector('#ob-app .field.invalid, #ob-app .err-msg[style*="block"]')?.scrollIntoView({behavior:'smooth',block:'center'}); return; }
  if(!availableSlots(state.date).some(s=>s.id===state.slot)){ toast(L('t_slot_taken'),'err');state.slot=null;renderDates();renderSlots();afterChange();return; }
  const btn=$('#submit-btn'); btn.disabled=true; $('#submit-text').textContent=L('submit_sending'); btn.insertAdjacentHTML('beforeend','<span class="spinner"></span>');
  const ref=makeRef();
  const b={ id:ref,createdAt:new Date().toISOString(),fullName:val('fullName'),email:val('email'),phone:val('phone'),
    address:val('address'),postcode:val('postcode'),town:val('town'),service:state.service,serviceLabel:enSvc(state.service),
    garments:val('garments'),express:state.express,date:state.date,slot:state.slot,slotLabel:enSlot(state.slot),notes:val('notes'),status:'New Request' };
  const all=store.bookings; all.push(b); store.bookings=all;
  submitToNetlify(b);
  try{ await sendEmails(b); }catch(err){}
  clearDraft(); showConfirmation(b);
}
function submitToNetlify(b){
  const data={'form-name':'oriella-booking',fullName:b.fullName,email:b.email,phone:b.phone,address:b.address,postcode:b.postcode,town:b.town,
    service:b.serviceLabel,garments:b.garments,express:b.express?'Yes (+20%)':'No',date:fmtFull(b.date,true),timeSlot:b.slotLabel,notes:b.notes,reference:b.id};
  const body=Object.keys(data).map(k=>encodeURIComponent(k)+'='+encodeURIComponent(data[k])).join('&');
  fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body}).catch(()=>{});
}
async function sendEmails(b){
  if(!EMAILJS.enabled||typeof emailjs==='undefined')return;
  const p={reference:b.id,fullName:b.fullName,email:b.email,phone:b.phone,address:`${b.address}, ${b.town}, ${b.postcode}`,
    service:b.serviceLabel,garments:b.garments||'—',express:b.express?'Yes (+20%)':'No',date:fmtFull(b.date,true),timeSlot:b.slotLabel,
    notes:b.notes||'—',to_email:b.email,admin_email:EMAILJS.adminEmail};
  await emailjs.send(EMAILJS.serviceId,EMAILJS.customerTemplate,p);
  await emailjs.send(EMAILJS.serviceId,EMAILJS.adminTemplate,p);
}
function showConfirmation(b){
  lastBooking=b;
  $('#form-view').classList.add('ob-hidden');
  $('#confirm-view').classList.remove('ob-hidden');
  renderConfirmation();
  document.getElementById('book').scrollIntoView({behavior:'smooth',block:'start'});
}
function renderConfirmation(){
  const b=lastBooking; if(!b)return;
  $('#confirm-ref').textContent=L('ref_label')+' '+b.id;
  const rows=[[L('s_service'),svcName(b.service)+(b.express?' + '+L('express_name')+' (+20%)':'')],
    [L('s_collection'),fmtFull(b.date)+', '+slotLabel(b.slot)],[L('s_address'),`${b.address}, ${b.town}, ${b.postcode}`]];
  if(b.garments)rows.splice(1,0,[L('s_garments'),b.garments]);
  $('#confirm-recap').innerHTML=rows.map(([k,v])=>`<div class="summary-row"><span class="k">${k}</span><span class="v">${esc(v)}</span></div>`).join('');
  $('#ics-btn').onclick=()=>downloadICS(b);
}
function downloadICS(b){
  const s=slotObj(b.slot),d=b.date.replace(/-/g,''),dt=t=>d+'T'+t.replace(':','')+'00';
  const ics=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Oriella//Booking//EN','BEGIN:VEVENT','UID:'+b.id+'@oriella',
    'DTSTAMP:'+dateKey(new Date()).replace(/-/g,'')+'T000000','DTSTART:'+dt(s.start),'DTEND:'+dt(s.end),
    'SUMMARY:Oriella laundry collection','DESCRIPTION:'+b.serviceLabel+' — ref '+b.id,'LOCATION:'+b.address+'\\, '+b.town+'\\, '+b.postcode,
    'END:VEVENT','END:VCALENDAR'].join('\r\n');
  const url=URL.createObjectURL(new Blob([ics],{type:'text/calendar'}));const a=document.createElement('a');a.href=url;a.download='oriella-collection.ics';a.click();URL.revokeObjectURL(url);
}

/* ---------- admin (English) ---------- */
function renderStats(){ const bk=store.bookings;const cards=[['Total',bk.length],['New',bk.filter(b=>b.status==='New Request').length],['Confirmed',bk.filter(b=>b.status==='Confirmed').length],['In progress',bk.filter(b=>['Collected','In Progress','Ready for Delivery'].includes(b.status)).length],['Delivered',bk.filter(b=>b.status==='Delivered').length]];$('#stat-row').innerHTML=cards.map(([l,n])=>`<div class="stat"><div class="n">${n}</div><div class="l">${l}</div></div>`).join(''); }
function currentAdminList(){ const q=$('#admin-search').value.trim().toLowerCase(),filter=$('#admin-filter').value,sort=$('#admin-sort').value;let list=store.bookings.slice();if(adminDayFilter)list=list.filter(b=>b.date===adminDayFilter);if(filter)list=list.filter(b=>b.status===filter);if(q)list=list.filter(b=>[b.fullName,b.email,b.phone,b.postcode,b.town,b.id].join(' ').toLowerCase().includes(q));if(sort==='new')list.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));else if(sort==='old')list.sort((a,b)=>new Date(a.createdAt)-new Date(b.createdAt));else if(sort==='coll')list.sort((a,b)=>(a.date+a.slot).localeCompare(b.date+b.slot));return list; }
function renderAdminList(){
  const list=currentAdminList(),wrap=$('#admin-list');
  if(!list.length){ wrap.innerHTML='<p class="empty-note">No bookings match.</p>';return; }
  wrap.innerHTML=list.map(b=>{
    const [bg,fg]=STATUS_COLORS[b.status]||['#eee','#333'];
    const created=new Date(b.createdAt).toLocaleString('en-GB',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'});
    const opts=STATUSES.map(s=>`<option ${s===b.status?'selected':''}>${s}</option>`).join('');
    return `<div class="booking"><div class="top"><div><div class="who">${esc(b.fullName)}</div><div class="meta">${b.id} · booked ${created}</div></div>
      <span class="pill" style="background:${bg};color:${fg}">${b.status}</span></div>
      <div class="detail">
        <div><span class="k">Service:</span> ${esc(b.serviceLabel)}${b.express?' + Express (+20%)':''}</div>
        <div><span class="k">Collection:</span> ${fmtFull(b.date,true)}, ${esc(enSlot(b.slot))}</div>
        <div><span class="k">Phone:</span> <a href="tel:${esc(b.phone)}">${esc(b.phone)}</a></div>
        <div><span class="k">Email:</span> <a href="mailto:${esc(b.email)}">${esc(b.email)}</a></div>
        <div style="grid-column:1/-1"><span class="k">Address:</span> ${esc(b.address)}, ${esc(b.town)}, ${esc(b.postcode)}</div>
        ${b.garments?`<div style="grid-column:1/-1"><span class="k">Garments to iron:</span> ${esc(b.garments)}</div>`:''}
        ${b.notes?`<div style="grid-column:1/-1"><span class="k">Notes:</span> ${esc(b.notes)}</div>`:''}</div>
      <div class="actions"><label style="font-size:13px;color:var(--muted)">Status:</label>
        <select data-id="${b.id}" class="status-select" style="width:auto">${opts}</select>
        ${b.status!=='Confirmed'&&b.status!=='Cancelled'?`<button class="obtn tiny" data-confirm="${b.id}">Confirm</button>`:''}
        ${b.status!=='Cancelled'?`<button class="obtn tiny danger" data-cancel="${b.id}">Cancel</button>`:''}
        <button class="obtn tiny ghost" data-del="${b.id}">Delete</button></div></div>`;
  }).join('');
  $$('.status-select',wrap).forEach(sel=>sel.addEventListener('change',e=>updateStatus(e.target.dataset.id,e.target.value)));
  $$('[data-confirm]',wrap).forEach(x=>x.addEventListener('click',e=>updateStatus(e.target.dataset.confirm,'Confirmed')));
  $$('[data-cancel]',wrap).forEach(x=>x.addEventListener('click',e=>{ if(confirm('Cancel this booking? The slot will be freed.'))updateStatus(e.target.dataset.cancel,'Cancelled'); }));
  $$('[data-del]',wrap).forEach(x=>x.addEventListener('click',e=>{ if(confirm('Permanently delete this booking?'))deleteBooking(e.target.dataset.del); }));
}
function updateStatus(id,s){ const all=store.bookings,b=all.find(x=>x.id===id);if(!b)return;b.status=s;store.bookings=all;renderStats();renderAdminList();toast('Status updated to “'+s+'”.','ok'); }
function deleteBooking(id){ store.bookings=store.bookings.filter(b=>b.id!==id);renderStats();renderAdminList();toast('Booking deleted.','ok'); }
function exportCSV(){ const list=currentAdminList();if(!list.length){toast('Nothing to export.','err');return;}const cols=['id','status','createdAt','fullName','email','phone','address','town','postcode','serviceLabel','garments','express','date','slotLabel','notes'];const q=v=>'"'+String(v==null?'':v).replace(/"/g,'""')+'"';const rows=[cols.join(',')].concat(list.map(b=>cols.map(c=>q(c==='express'?(b.express?'Yes':'No'):c==='date'?fmtFull(b.date,true):b[c])).join(',')));const url=URL.createObjectURL(new Blob([rows.join('\n')],{type:'text/csv'}));const a=document.createElement('a');a.href=url;a.download='oriella-bookings.csv';a.click();URL.revokeObjectURL(url); }

/* bookings calendar */
function applyBookingsView(){ const cal=bookingsView==='calendar';$('#bookings-calendar').classList.toggle('ob-hidden',!cal);$('#admin-list').classList.toggle('ob-hidden',cal);$('#ob-app .toolbar').classList.toggle('ob-hidden',cal);$$('#bookings-view-toggle .seg-btn').forEach(b=>b.classList.toggle('active',b.dataset.v===bookingsView));if(cal)renderBookingsCalendar();renderDayFilterChip(); }
function renderDayFilterChip(){ const el=$('#day-filter-chip');if(adminDayFilter&&bookingsView==='list'){el.classList.remove('ob-hidden');el.innerHTML=`<span class="block-tag">Showing ${fmtFull(adminDayFilter,true)} <button id="clear-day">✕</button></span>`;$('#clear-day').onclick=()=>{adminDayFilter=null;renderDayFilterChip();renderAdminList();};}else{el.classList.add('ob-hidden');el.innerHTML='';} }
function calShell(title,nav){ const dows=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];return `<div class="cal-head"><span class="cal-title">${title}</span><div class="cal-nav"><button class="obtn tiny ghost" ${nav}="-1">‹</button><button class="obtn tiny ghost" ${nav}="today">Today</button><button class="obtn tiny ghost" ${nav}="1">›</button></div></div><div class="cal-grid">${dows.map(d=>`<div class="cal-dow">${d}</div>`).join('')}`; }
function renderBookingsCalendar(){
  const wrap=$('#bookings-calendar'),title=bkCalMonth.toLocaleDateString('en-GB',{month:'long',year:'numeric'});
  let html=calShell(title,'data-bk');
  monthCells(bkCalMonth).forEach(c=>{ if(!c){html+='<div class="cal-cell empty"></div>';return;}const k=dateKey(c);const n=store.bookings.filter(b=>b.date===k&&b.status!=='Cancelled').length;html+=`<div class="cal-cell" data-day="${k}"><span class="cal-daynum">${c.getDate()}</span>${n?`<span class="cal-badge">${n} booking${n>1?'s':''}</span>`:''}</div>`; });
  html+='</div>'; wrap.innerHTML=html;
  $$('[data-bk]',wrap).forEach(b=>b.addEventListener('click',e=>{const v=e.currentTarget.getAttribute('data-bk');bkCalMonth=v==='today'?startOfMonth(new Date()):addMonths(bkCalMonth,parseInt(v));renderBookingsCalendar();}));
  $$('.cal-cell[data-day]',wrap).forEach(c=>c.addEventListener('click',()=>{adminDayFilter=c.getAttribute('data-day');bookingsView='list';applyBookingsView();renderAdminList();$('#admin-list').scrollIntoView({behavior:'smooth',block:'start'});}));
}
/* block calendar */
function addWholeBlock(d){ const b=store.blocks;if(!b.dates.includes(d))b.dates.push(d);store.blocks=b; }
function blockSlot(d,s){ const b=store.blocks;b.slots[d]=b.slots[d]||[];if(!b.slots[d].includes(s))b.slots[d].push(s);store.blocks=b; }
function refreshBlockUI(){ renderBlockCalendar();renderSlotManager();renderBlocks(); }
function renderBlockCalendar(){
  const wrap=$('#block-calendar');if(!wrap)return;const title=blkCalMonth.toLocaleDateString('en-GB',{month:'long',year:'numeric'});const today=new Date();today.setHours(0,0,0,0);
  let html=calShell(title,'data-blk');
  monthCells(blkCalMonth).forEach(c=>{ if(!c){html+='<div class="cal-cell empty"></div>';return;}const k=dateKey(c),past=c<today,whole=isDateBlocked(k),sb=(store.blocks.slots[k]||[]).length>0,booked=store.bookings.some(b=>b.date===k&&b.status!=='Cancelled');const dots=[];if(whole||sb)dots.push('<span class="dot-s dot-blocked"></span>');if(booked)dots.push('<span class="dot-s dot-booked"></span>');html+=`<div class="cal-cell${past?' past':''}${blockSelDate===k?' selected':''}" ${past?'':`data-blkday="${k}"`}><span class="cal-daynum">${c.getDate()}</span>${whole?'<span class="cal-badge" style="background:var(--danger)">Blocked</span>':''}<div class="cal-dots">${dots.join('')}</div></div>`; });
  html+='</div>'; wrap.innerHTML=html;
  $$('[data-blk]',wrap).forEach(b=>b.addEventListener('click',e=>{const v=e.currentTarget.getAttribute('data-blk');blkCalMonth=v==='today'?startOfMonth(new Date()):addMonths(blkCalMonth,parseInt(v));renderBlockCalendar();}));
  $$('.cal-cell[data-blkday]',wrap).forEach(c=>c.addEventListener('click',()=>{blockSelDate=c.getAttribute('data-blkday');renderBlockCalendar();renderSlotManager();}));
}
function renderSlotManager(){
  const el=$('#block-slot-manager');if(!el)return;
  if(!blockSelDate){ el.innerHTML='<p class="empty-note">Select a date above to manage its availability.</p>';return; }
  const k=blockSelDate,whole=isDateBlocked(k);
  let html=`<div class="slot-manage"><div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px"><h3 style="margin:0;font-size:17px">${fmtFull(k,true)}</h3><button class="obtn tiny ${whole?'ghost':'danger'}" id="toggle-whole">${whole?'Unblock whole day':'Block whole day'}</button></div>`;
  SLOTS.forEach(s=>{ const booked=isSlotBooked(k,s.id),blocked=whole||(store.blocks.slots[k]||[]).includes(s.id);let right,note;
    if(booked){right=`<span class="slot-status" style="background:#eef1f0;color:#4a5652">Booked</span>`;note=' — <strong>booked</strong>';}
    else if(blocked){right=`<button class="obtn tiny ghost" data-unblock="${s.id}" ${whole?'disabled':''}>Unblock</button>`;note=' — blocked';}
    else{right=`<button class="obtn tiny danger" data-block="${s.id}">Block</button>`;note=' — available';}
    html+=`<div class="slot-row"><span>${enSlot(s.id)}${note}</span>${right}</div>`; });
  html+='</div>'; el.innerHTML=html;
  const tw=$('#toggle-whole'); if(tw)tw.onclick=()=>{ if(whole)removeBlock(k,'ALL');else addWholeBlock(k);toast(whole?'Day unblocked.':'Day blocked.','ok');refreshBlockUI(); };
  $$('[data-block]',el).forEach(b=>b.addEventListener('click',e=>{blockSlot(k,e.target.dataset.block);toast('Slot blocked.','ok');refreshBlockUI();}));
  $$('[data-unblock]',el).forEach(b=>b.addEventListener('click',e=>{removeBlock(k,e.target.dataset.unblock);refreshBlockUI();}));
}
function renderBlocks(){
  const b=store.blocks,items=[];
  b.dates.slice().sort().forEach(d=>items.push({key:d,slot:'ALL',label:fmtFull(d,true)+' — whole day'}));
  Object.keys(b.slots).sort().forEach(d=>(b.slots[d]||[]).forEach(s=>items.push({key:d,slot:s,label:fmtFull(d,true)+' — '+enSlot(s)})));
  const wrap=$('#block-list');
  wrap.innerHTML=items.length?items.map(it=>`<span class="block-tag">${it.label}<button data-d="${it.key}" data-s="${it.slot}">✕</button></span>`).join(''):'<p class="empty-note" style="width:100%">No blocks set.</p>';
  $$('#block-list button').forEach(btn=>btn.addEventListener('click',e=>removeBlock(e.target.dataset.d,e.target.dataset.s)));
}
function removeBlock(date,slot){ const b=store.blocks;if(slot==='ALL')b.dates=b.dates.filter(d=>d!==date);else{b.slots[date]=(b.slots[date]||[]).filter(s=>s!==slot);if(!b.slots[date].length)delete b.slots[date];}store.blocks=b;renderBlocks();if($('#block-calendar')){renderBlockCalendar();renderSlotManager();} }

function openAdmin(){ const p=prompt('Enter Oriella staff passcode:');if(p===null)return;if(p!==ADMIN_PASSCODE){toast('Incorrect passcode.','err');return;}showAdmin(); }
function showAdmin(){ $('#ob-reveal-wrap')?.classList.add('ob-hidden');$('#ob-main')?.classList.remove('ob-hidden');$('#customer-app').classList.add('ob-hidden');$('#admin-app').classList.remove('ob-hidden');renderStats();applyBookingsView();renderAdminList();renderBlockCalendar();renderSlotManager();renderBlocks();document.getElementById('book').scrollIntoView({behavior:'smooth'}); }
function showCustomer(){ $('#admin-app').classList.add('ob-hidden');$('#customer-app').classList.remove('ob-hidden');$('#ob-main').classList.add('ob-hidden');$('#ob-reveal-wrap').classList.remove('ob-hidden'); }

/* ---------- re-render on language change ---------- */
function renderAllOB(){ translateStatic();renderServices();renderDates();renderSlots();renderSummary();if(!$('#confirm-view').classList.contains('ob-hidden'))renderConfirmation(); }

/* ---------- init ---------- */
if(EMAILJS.enabled){ const sc=document.createElement('script');sc.src='https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';sc.onload=()=>{try{emailjs.init({publicKey:EMAILJS.publicKey})}catch(e){}};document.head.appendChild(sc); }

const _ad=availableDates(); if(_ad.length)custCalMonth=startOfMonth(_ad[0].d);
const revealBtn=$('#ob-reveal');
if(revealBtn)revealBtn.addEventListener('click',()=>{ $('#ob-reveal-wrap').classList.add('ob-hidden');$('#ob-main').classList.remove('ob-hidden');$('#card-when').scrollIntoView({behavior:'smooth',block:'start'}); });
translateStatic(); renderServices(); renderDates(); renderSlots(); renderSummary(); updateProgress();

TEXT_FIELDS.forEach(id=>{ const el=$('#'+id);el.addEventListener('input',()=>{if(el.closest('.field').classList.contains('invalid'))validateField(id);afterChange();});if(['fullName','email','phone','address','postcode','town'].includes(id))el.addEventListener('blur',()=>validateField(id)); });
$('#express').addEventListener('change',e=>{ state.express=e.target.checked;$('#express-wrap').classList.toggle('selected',e.target.checked);afterChange(); });
$('#booking-form').addEventListener('submit',handleSubmit);
$('#new-booking-btn').addEventListener('click',()=>{ $('#confirm-view').classList.add('ob-hidden');$('#form-view').classList.remove('ob-hidden');state.service=state.date=state.slot=null;state.express=false;$('#booking-form').reset();$('#express-wrap').classList.remove('selected');$$('#ob-app .field').forEach(f=>f.classList.remove('ok','invalid'));renderServices();renderDates();renderSlots();renderSummary();updateProgress();document.getElementById('book').scrollIntoView({behavior:'smooth'}); });
$('#clear-draft').addEventListener('click',()=>{ clearDraft();state.service=state.date=state.slot=null;state.express=false;$('#booking-form').reset();$('#express-wrap').classList.remove('selected');$('#draft-banner').style.display='none';renderServices();renderDates();renderSlots();renderSummary();updateProgress(); });
$('#staff-link').addEventListener('click',openAdmin);
$('#admin-exit').addEventListener('click',showCustomer);
$('#admin-export').addEventListener('click',exportCSV);
$$('#ob-progress .ob-step').forEach(s=>s.addEventListener('click',()=>$('#'+s.dataset.go).scrollIntoView({behavior:'smooth',block:'start'})));
$('#admin-search').addEventListener('input',renderAdminList);
$('#admin-filter').addEventListener('change',renderAdminList);
$('#admin-sort').addEventListener('change',renderAdminList);
$$('#bookings-view-toggle .seg-btn').forEach(b=>b.addEventListener('click',()=>{bookingsView=b.dataset.v;if(bookingsView==='calendar')adminDayFilter=null;applyBookingsView();renderAdminList();}));
STATUSES.forEach(s=>$('#admin-filter').insertAdjacentHTML('beforeend',`<option value="${s}">${s}</option>`));
document.querySelectorAll('.lang-btn').forEach(b=>b.addEventListener('click',()=>setTimeout(renderAllOB,0)));

restoreDraft();
})();
