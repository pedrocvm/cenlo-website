import { AcquisitionClient, CONFIG, API, verifyPublished, attributionFrom, consentControls, storageGet, storageSet } from './food-acquisition-core.js';
// Food-only adapter of the existing acquisition consent client. Beauty stays unchanged.
const product='food'; // This entry point belongs only to the Food funnel.
let testJourney=false;try{testJourney=JSON.parse(sessionStorage.getItem('cenlo-food-autonomous:v1')||'null')?.isTest===true;}catch{}
const preview=!['cenlofood.cenlo.pt','cenlo.pt','www.cenlo.pt'].includes(location.hostname)||new URLSearchParams(location.search).get('test')==='1'||testJourney;
const params=new URLSearchParams(location.search),code=params.get('acq');
if(code){params.delete('acq');history.replaceState(null,'',location.pathname+(params.size?'?'+params:'')+location.hash);}
const runtime={};
let config=null;
try{if(preview)throw new Error();const response=await fetch(runtime.configUrl||CONFIG,{referrerPolicy:'no-referrer',signal:AbortSignal.timeout(5000)});const pub=await response.json();if(response.ok&&await verifyPublished(pub)){config=pub.config;storageSet(`cenlo-${product}-acquisition-config`,pub);}}catch{}
if(!config&&!preview){try{const cached=storageGet(`cenlo-${product}-acquisition-config`);if(await verifyPublished(cached))config=cached.config;}catch{}}
const stored=storageGet('cenlo-food-autonomous:v1',sessionStorage)||storageGet('cenlo_food_diag_v2')||{};
const campaign=Object.fromEntries(Object.entries({...stored.attribution,...attributionFrom(location.search)}).filter(([k,v])=>['source','medium','campaign','content','term','id'].includes(k)&&typeof v==='string'&&/^[a-zA-Z0-9_.-]{1,80}$/.test(v)));
const client=new AcquisitionClient({surface:'diagnostic',product,entryProduct:params.get('produto')===product?product:null,attribution:campaign,api:runtime.api||API,policyVersion:config?.analytics.policyVersion,disabled:preview||!config?.analytics.enabled,preview,onChange:()=>window.dispatchEvent(new Event('cenlo-acquisition-change'))});
if(location.pathname.startsWith('/configurar')){const context=client.context.bind(client);client.context=()=>({...context(),experience:'food_offer'});}
let observed=false;const observe=()=>{if(!observed&&!preview)observed=client.event('food_funnel_viewed');};window.addEventListener('cenlo-acquisition-change',observe);
if(code&&!preview)await client.exchange(code);void client.prepare();observe();
window.CenloAcquisition={
 contactReceived:(eventId)=>{try{if(/^food-contact:[a-f0-9-]{36}$/.test(eventId))void client.mirrorMeta('Lead',eventId).catch(()=>{});}catch{}},
 event:(name,props={})=>client.event(name,props),
 consentToken:()=>!client.disabled&&client.receipt&&Date.parse(client.receipt.expiresAt)>Date.now()?client.receipt.consentToken:undefined,
 diagnosticEndpoint:runtime.diagnosticEndpoint||'https://api-crm.cenlo.pt/crm/public/diagnostics',
 demoEnabled:()=>!!config?.demo.enabled,
 plainDemoUrl:()=>runtime.demoUrl||config?.demo.url||'https://food.cenlo.pt/demo/food',
 demoUrl:()=>client.destination(runtime.demoUrl||config?.demo.url||'https://food.cenlo.pt/demo/food','demo'),
 reference:()=>client.reference,
 prepare:()=>client.prepare(),
 // The saved diagnostic is the Lead; its id matches the one the CRM sends to Meta.
 // Never throws: a Meta hiccup must not turn a saved diagnostic into "failed" on screen.
 diagnosticSaved:(submissionId)=>{try{if(submissionId)Promise.resolve(client.mirrorMeta('Lead',`diagnostic-${submissionId}`)).catch(()=>{});}catch{}},
};
const box=document.createElement('div');box.id=`${product}-privacy`;box.style.cssText='position:fixed;bottom:calc(96px + env(safe-area-inset-bottom));right:10px;z-index:100;max-width:min(390px,calc(100vw - 20px));background:#171920;color:#c4c6cc;border:1px solid #444854;border-radius:12px;padding:6px 14px;font:12px/1.5 system-ui';if(!location.pathname.startsWith('/configurar'))box.style.bottom='12px';document.body.append(box);
const style=document.createElement('style');const id=`#${product}-privacy`,accent=product==='beauty'?'#f472b6':'#f0966a';style.textContent=`${id} button{background:#272a33;color:#f7f5f1;border:1px solid #5a5e6a;border-radius:7px;padding:9px;min-height:40px;cursor:pointer}${id} .consent-choices{display:flex;gap:8px;margin:10px 0}${id} .privacy-toggle{background:none;border:0}${id} .consent-meta{display:flex;gap:8px;align-items:flex-start;margin:8px 0;color:#e6e7ea}${id} .consent-meta input{margin-top:3px;accent-color:${accent}}${id} a{color:${accent}}`;document.head.append(style);consentControls(client,box,{enabled:!!config?.analytics.enabled,privacyUrl:config?.analytics.privacyUrl});
window.dispatchEvent(new Event('cenlo-acquisition-change'));
