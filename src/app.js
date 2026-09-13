'use strict';
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
toggle?.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open); });
nav?.addEventListener('click', e => { if (e.target.closest('a')) { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); } });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav?.classList.contains('open')) { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.focus(); } });
const consentKey = 'buffalo-privacy-v1';
const banner = document.querySelector('#cookie-banner');
let consent = null;
try { const saved = JSON.parse(localStorage.getItem(consentKey)); if (saved && saved.expires > Date.now() && ['necessary','analytics'].includes(saved.choice)) consent = saved.choice; } catch {}
let analyticsLoaded = false;
const analyticsId = window.LODGE_CONFIG?.ga4MeasurementId || '';
function startAnalytics() {
 if (consent !== 'analytics' || analyticsLoaded || !/^G-[A-Z0-9]+$/.test(analyticsId)) return;
 analyticsLoaded = true;
 window['ga-disable-' + analyticsId] = false;
 window.dataLayer = window.dataLayer || [];
 window.gtag = function(){window.dataLayer.push(arguments);};
 window.gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
 window.gtag('js',new Date());
 window.gtag('config',analyticsId,{send_page_view:true,allow_google_signals:false,allow_ad_personalization_signals:false});
 const script = document.createElement('script');script.async = true;script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(analyticsId);document.head.appendChild(script);
}
function revokeAnalytics() {
 window['ga-disable-' + analyticsId] = true;
 if (window.gtag) window.gtag('consent','update',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
 for(const part of document.cookie.split(';')){
  const name=part.split('=')[0].trim();if(!/^_ga($|_)/.test(name))continue;
  document.cookie=name+'=; Max-Age=0; Path=/; SameSite=Lax';
  const labels=location.hostname.split('.');for(let i=0;i<labels.length-1;i++)document.cookie=name+'=; Max-Age=0; Path=/; Domain='+labels.slice(i).join('.')+'; SameSite=Lax';
 }
}
if (banner) banner.hidden = Boolean(consent);
startAnalytics();
document.querySelectorAll('[data-consent]').forEach(button=>button.addEventListener('click',()=>{
 const wasAnalytics = consent === 'analytics';consent=button.dataset.consent;
 try{localStorage.setItem(consentKey,JSON.stringify({choice:consent,expires:Date.now()+180*86400000}));}catch{}
 if(consent==='analytics'){if(window.gtag){window['ga-disable-'+analyticsId]=false;window.gtag('consent','update',{analytics_storage:'granted'});}startAnalytics();}else revokeAnalytics();
 banner.hidden=true;
 if(wasAnalytics && consent==='necessary' && analyticsLoaded)location.reload();
}));
document.querySelectorAll('[data-cookie-settings]').forEach(button=>button.addEventListener('click',()=>{banner.hidden=false;banner.querySelector('button').focus();}));
function track(name,params={}){if(consent==='analytics' && analyticsLoaded && window.gtag)window.gtag('event',name,params);}
document.addEventListener('click',e=>{const a=e.target.closest('a');if(!a)return;const href=a.getAttribute('href')||'';if(href.includes('/enquire/'))track('enquiry_click');if(href.startsWith('tel:'))track('phone_click');if(href.startsWith('https://www.google.com/maps'))track('directions_click');});
const form=document.querySelector('#enquiry-form');
if(form){
 const fields=form.elements;const status=document.querySelector('#form-status');const opened=Date.now();let lastPrepared=0;
 const localDate=new Date();const today=[localDate.getFullYear(),String(localDate.getMonth()+1).padStart(2,'0'),String(localDate.getDate()).padStart(2,'0')].join('-');
 fields.arrival.min=today;fields.departure.min=today;
 const query=new URLSearchParams(location.search);
 if(['Single','Double','Family'].includes(query.get('room')))fields.room.value=query.get('room');
 if(query.get('purpose')==='Conference')fields.purpose.value='Conference';
 function nextDay(value){const d=new Date(value+'T12:00:00');d.setDate(d.getDate()+1);return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');}
 function updateDates(){const conference=fields.purpose.value==='Conference';fields.departure.required=!conference;fields.departure.disabled=conference;fields.departure.closest('label').hidden=conference;fields.room.disabled=conference;fields.room.closest('label').hidden=conference;fields.departure.min=fields.arrival.value?nextDay(fields.arrival.value):today;fields.departure.setCustomValidity('');}
 fields.arrival.addEventListener('change',updateDates);fields.departure.addEventListener('input',()=>fields.departure.setCustomValidity(''));fields.purpose.addEventListener('change',updateDates);updateDates();
 fields.name.addEventListener('input',()=>fields.name.setCustomValidity(''));
 form.addEventListener('submit',e=>{
  e.preventDefault();status.textContent='';
  if(fields.website.value || Date.now()-opened<2000){status.textContent='Please review your details and try again.';return;}
  if(Date.now()-lastPrepared<10000){status.textContent='Your enquiry is already prepared below. You can try again in a few seconds.';return;}
  fields.name.setCustomValidity(fields.name.value.trim().length<2?'Please enter your name.':'');
  if(!form.reportValidity())return;
  if(fields.arrival.value<today){status.textContent='Choose today or a future arrival date.';fields.arrival.focus();return;}
  if(fields.purpose.value!=='Conference' && fields.departure.value<=fields.arrival.value){fields.departure.setCustomValidity('Departure must be after arrival.');fields.departure.reportValidity();return;}
  const body=['Hello Buffalo Park Lodge,','',`I would like to enquire about ${fields.purpose.value.toLowerCase()}.`,'',`Name: ${fields.name.value.trim()}`,`Email: ${fields.email.value.trim()}`,fields.phone.value.trim()?`Phone: ${fields.phone.value.trim()}`:'',`Arrival / event date: ${fields.arrival.value}`,fields.purpose.value!=='Conference'?`Departure: ${fields.departure.value}`:'',fields.purpose.value!=='Conference'?`Room preference: ${fields.room.value}`:'',`Guests / delegates: ${fields.guests.value}`,'',fields.message.value.trim(),'','Please confirm availability, current rates and booking conditions.','Thank you.'].filter((v,i,a)=>v||a[i-1]).join('\n');
  document.querySelector('#email-copy').value=body;document.querySelector('#email-fallback').hidden=false;
  status.textContent='Enquiry prepared. Please review and send it in your email app.';
  lastPrepared=Date.now();track('enquiry_prepared',{enquiry_type:fields.purpose.value});
  location.href='mailto:buffalopark@gmail.com?subject='+encodeURIComponent('Buffalo Park Lodge — '+fields.purpose.value+' enquiry')+'&body='+encodeURIComponent(body);
 });
 document.querySelector('#copy-enquiry').addEventListener('click',async()=>{
  const copy=document.querySelector('#email-copy');try{await navigator.clipboard.writeText(copy.value);document.querySelector('#copy-status').textContent='Copied. Paste it into your email app.';}catch{copy.focus();copy.select();document.querySelector('#copy-status').textContent='Select and copy the enquiry above.';}
 });
}
