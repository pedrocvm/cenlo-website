/** Acquisition wire v1. Canonical contract: Cenlo-CRM/packages/contracts/src/acquisition. */
export const POLICY = '2026-09-25-v1';
export const API = 'https://api-crm.cenlo.pt/public/acquisition';
export const CONFIG = 'https://api-crm.cenlo.pt/acquisition/current.json';
const safeKey = /^[a-zA-Z0-9_.-]{1,80}$/;
export function attributionFrom(search) {
  const params = new URLSearchParams(search), out = {};
  for (const key of ['source', 'medium', 'campaign', 'content', 'term', 'id']) {
    const value = params.get(`utm_${key}`); if (value && safeKey.test(value)) out[key] = value;
  }
  const distribution = params.get('distribution'); if (distribution && safeKey.test(distribution)) out.distribution = distribution;
  return out;
}
export function canonical(value) {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`;
  return `{${Object.entries(value).filter(([,v]) => v !== undefined).sort(([a],[b]) => a < b ? -1 : a > b ? 1 : 0).map(([k,v]) => `${JSON.stringify(k)}:${canonical(v)}`).join(',')}}`;
}
export function safeUrl(value) { try { const u = new URL(value); const localPage=['localhost','127.0.0.1'].includes(globalThis.location?.hostname);return (u.protocol === 'https:' || (localPage && u.protocol === 'http:' && ['localhost','127.0.0.1'].includes(u.hostname))) && !u.username && !u.password; } catch { return false; } }
export function validConfig(config) {
  if (!config || config.schemaVersion !== 1 || !config.profile || !config.demo || !config.analytics || !Array.isArray(config.links) || config.links.length > 20) return false;
  const strings = [[config.profile.name,80],[config.profile.headline,160],[config.profile.description,320],[config.demo.title,120],[config.demo.description,300],[config.demo.disclaimer,240]];
  if (strings.some(([v,n]) => typeof v !== 'string' || v.length > n)) return false;
  if (!safeUrl(config.demo.url) || !safeUrl(config.analytics.privacyUrl) || !/^\d{8,15}$/.test(config.demo.whatsappNumber)) return false;
  if (config.profile.photoUrl && !safeUrl(config.profile.photoUrl)) return false;
  if (new Set(config.links.map(l=>l.id)).size !== config.links.length) return false;
  if (!config.links.every(l=>safeKey.test(l.id) && ['food','beauty'].includes(l.product) && ['demo','diagnostic','contact','external'].includes(l.kind) && safeUrl(l.url) && typeof l.label === 'string' && l.label.length <= 80 && typeof l.description === 'string' && l.description.length <= 200 && typeof l.visible === 'boolean' && typeof l.featured === 'boolean' && Number.isInteger(l.order))) return false;
  return ['food','beauty'].every(p=>config.links.some(l=>l.product===p && l.kind==='contact' && l.visible));
}
export async function verifyPublished(value) {
  if (!value || value.schemaVersion !== 1 || !/^[a-zA-Z0-9_-]{8,100}$/.test(value.revisionId) || !validConfig(value.config) || !/^[a-f0-9]{64}$/.test(value.checksum)) return false;
  const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(canonical(value.config)));
  return Array.from(new Uint8Array(hash), b=>b.toString(16).padStart(2,'0')).join('') === value.checksum;
}
export function storageGet(key, storage) { try { return JSON.parse((storage || globalThis.localStorage).getItem(key)); } catch { return null; } }
export function storageSet(key, value, storage) { try { (storage || globalThis.localStorage).setItem(key,JSON.stringify(value)); } catch {} }
export const MARKETING = 'https://api-crm.cenlo.pt/public/acquisition/marketing';
// Same table as the CRM: one Meta name and one eventID per fact, so Meta counts it once.
const META_EVENTS={food_funnel_viewed:'PageView',bio_view_observed:'PageView',demo_entry_viewed:'ViewContent',contact_cta_clicked:'Contact',diagnostic_result_viewed:'DiagnosticCompleted'};
const META_STANDARD=new Set(['PageView','ViewContent','Contact','Lead']);
const FBP=/^fb\.\d\.\d{10,13}\.\d{1,20}$/, FBC=/^fb\.\d\.\d{10,13}\.[A-Za-z0-9_-]{1,500}$/;
// Cookies can be blocked or absent; neither may break the page or the withdrawal.
function readCookie(name){try{return globalThis.document?.cookie.split('; ').find(c=>c.startsWith(name+'='))?.slice(name.length+1)||'';}catch{return '';}}
function writeCookie(name,value,days){try{if(!globalThis.document)return;const host=globalThis.location?.hostname??'';const shared=host==='cenlo.pt'||host.endsWith('.cenlo.pt');document.cookie=`${name}=${value};path=/;max-age=${Math.round(days*86400)};SameSite=Lax${shared?';domain=.cenlo.pt;Secure':''}`;}catch{}}
/** Meta's own identifiers, created here so they exist before the Pixel loads.
 * Shared on .cenlo.pt: the bio, the demo and the diagnostic are the same visitor. */
export function metaIdentifiers(search=globalThis.location?.search??''){
  let fbp=readCookie('_fbp');if(!FBP.test(fbp)){fbp=`fb.1.${Date.now()}.${Math.floor(Math.random()*1e10)}`;writeCookie('_fbp',fbp,90);}
  let fbc=readCookie('_fbc');const clid=new URLSearchParams(search).get('fbclid');
  if(clid&&/^[A-Za-z0-9_-]{1,500}$/.test(clid)){fbc=`fb.1.${Date.now()}.${clid}`;writeCookie('_fbc',fbc,90);}
  return {fbp,...(FBC.test(fbc)?{fbc}:{})};
}
export function forgetMeta(){writeCookie('_fbp','',0);writeCookie('_fbc','',0);}
async function pixelFor(client,product){try{client.marketingConfig??=fetch(client.marketingUrl,{credentials:'omit',referrerPolicy:'no-referrer',signal:AbortSignal.timeout(5000)}).then(r=>r.ok?r.json():{});const id=(await client.marketingConfig)?.[product]?.pixelId;return typeof id==='string'&&/^\d{8,20}$/.test(id)?id:null;}catch{return null;}}
const initialised=new Set();
function loadPixel(id){
  if(!globalThis.fbq){!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(globalThis,document,'script','https://connect.facebook.net/en_US/fbevents.js');}
  // No automatic events: only the facts the visitor allowed, with our eventID.
  if(!initialised.has(id)){globalThis.fbq('set','autoConfig',false,id);globalThis.fbq('init',id);initialised.add(id);}
}
const PROOFS_KEY='cenlo-acquisition-revocations-v1', WITHDRAWALS_KEY='cenlo-acquisition-withdrawals-v1';
const DAY=86400000, MAX_PROOFS=128;
function proofOf(receipt) {
  if (!receipt || typeof receipt.consentToken!=='string' || !receipt.consentToken || receipt.consentToken.length>200) return null;
  // Consent lasts 24h; keep its deletion proof for the 90-day retention window.
  const expires=Date.parse(receipt.expiresAt);
  const revokeUntil=Number.isFinite(receipt.revokeUntil)?receipt.revokeUntil:Number.isFinite(expires)?expires+89*DAY:Date.now()+90*DAY;
  if(revokeUntil<=Date.now())return null;
  return {consentToken:receipt.consentToken,sessionId:receipt.sessionId,expiresAt:receipt.expiresAt,policyVersion:receipt.policyVersion,revokeUntil};
}
function mergeProofs(...lists) {
  const unique=new Map();
  for(const value of lists.flat()){const proof=proofOf(value);if(proof)unique.set(proof.sessionId||proof.consentToken,proof);}
  return [...unique.values()];
}
function storedProofs(key){const values=storageGet(key);return Array.isArray(values)?values.filter(v=>v&&typeof v==='object'):[];}
export class AcquisitionClient {
  constructor({ surface, product = 'food', entryProduct = null, attribution = {}, revision, api = API, marketingUrl = MARKETING, policyVersion = POLICY, disabled = false, preview = false, onChange = () => {} }) {
    Object.assign(this,{surface,product,entryProduct,attribution,revision,api,marketingUrl,policyVersion,disabled,preview,onChange});this.handoffs={};this.reference=null;this.pixels={};
    const storedReceipt=preview?null:storageGet('cenlo-acquisition-receipt-v1');
    this.revocationProofs=preview?[]:mergeProofs(storedProofs(PROOFS_KEY),[storedReceipt]);
    this.withdrawalQueue=preview?[]:mergeProofs(storedProofs(WITHDRAWALS_KEY));
    const legacy=preview?null:storageGet('cenlo-acquisition-withdrawal-v1');
    if(typeof legacy==='string')this.withdrawalQueue=mergeProofs(this.withdrawalQueue,[{consentToken:legacy}]);
    this.receipt=storedReceipt;
    if(!this.receipt||!Number.isFinite(Date.parse(this.receipt.expiresAt))||Date.parse(this.receipt.expiresAt)<=Date.now()||this.receipt.policyVersion!==this.policyVersion)this.receipt=null;
    if(!preview){this.persistProofs();this.persistWithdrawals();storageSet('cenlo-acquisition-withdrawal-v1',null);}
    if(this.pendingWithdrawal){this.receipt=null;void this.retryWithdrawal();}
    this.marketing=!!this.receipt&&!preview&&storageGet('cenlo-acquisition-marketing-v1')===true;
  }
  get pendingWithdrawal(){return this.withdrawalQueue.length?true:null;}
  get revocationReceipt(){return this.revocationProofs[0]??null;}
  persistProofs(){if(!this.preview)storageSet(PROOFS_KEY,this.revocationProofs);}
  persistWithdrawals(){if(!this.preview)storageSet(WITHDRAWALS_KEY,this.withdrawalQueue);}
  remember(receipt){this.revocationProofs=mergeProofs(storedProofs(PROOFS_KEY),this.revocationProofs,[receipt]);this.persistProofs();}
  queueWithdrawal(receipts){this.withdrawalQueue=mergeProofs(storedProofs(WITHDRAWALS_KEY),this.withdrawalQueue,receipts);this.persistWithdrawals();}
  async request(path, body) {
    const response=await fetch(this.api+path,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),credentials:'omit',referrerPolicy:'no-referrer',signal:AbortSignal.timeout(6000),keepalive:true});
    if(!response.ok)throw new Error(`acquisition_${response.status}`);return response.json();
  }
  async accept(marketing=false) {
    if(this.disabled||this.pendingWithdrawal||this.revocationProofs.length>=MAX_PROOFS)return false;
    const generation=this.generation=(this.generation||0)+1;
    try{
      const receipt=await this.request('/consent',{policyVersion:this.policyVersion,accepted:true,surface:this.surface,product:this.product,entryProduct:this.entryProduct,attribution:this.attribution,...(marketing?{marketing:true,meta:metaIdentifiers()}:{})});
      if(generation!==this.generation){this.queueWithdrawal([receipt]);await this.retryWithdrawal();return false;}
      this.remember(this.receipt);this.remember(receipt);this.receipt=receipt;
      storageSet('cenlo-acquisition-receipt-v1',receipt);storageSet('cenlo-acquisition-choice-v1','accepted');this.marketing=marketing;storageSet('cenlo-acquisition-marketing-v1',marketing);this.onChange();void this.prepare();return true;
    }catch{return false;}
  }
  async decline() {
    this.generation=(this.generation||0)+1;
    const proofs=mergeProofs(storedProofs(PROOFS_KEY),this.revocationProofs,[this.receipt]);
    this.revocationProofs=[];this.receipt=null;this.handoffs={};this.reference=null;
    storageSet('cenlo-acquisition-receipt-v1',null);storageSet('cenlo-acquisition-choice-v1','essential');this.marketing=false;storageSet('cenlo-acquisition-marketing-v1',false);forgetMeta();
    this.persistProofs();this.queueWithdrawal(proofs);this.onChange();await this.retryWithdrawal();return !this.pendingWithdrawal;
  }
  async retryWithdrawal() {
    if(this.retrying)return this.retrying;
    this.retrying=(async()=>{
      const attempted=new Set();
      while(true){
        const proof=this.withdrawalQueue.find(p=>!attempted.has(p.consentToken));if(!proof)break;attempted.add(proof.consentToken);
        try{const receipt=await this.request('/withdraw',{consentToken:proof.consentToken});if(receipt?.withdrawn!==true)continue;
          this.withdrawalQueue=mergeProofs(storedProofs(WITHDRAWALS_KEY),this.withdrawalQueue).filter(p=>p.consentToken!==proof.consentToken);this.persistWithdrawals();
        }catch{/* Persist the proof and retry on the next visit or explicit withdrawal. */}
      }
      this.onChange();
    })();
    try{await this.retrying;}finally{this.retrying=null;}
  }
  async exchange(code) {
    if(this.disabled||!code||!/^[a-zA-Z0-9_-]{8,200}$/.test(code)||this.pendingWithdrawal||this.revocationProofs.length>=MAX_PROOFS)return false;
    const generation=this.generation=(this.generation||0)+1;
    try{
      const r=await this.request('/handoffs/exchange',{code,destination:this.surface});
      if(generation!==this.generation){this.queueWithdrawal([r]);await this.retryWithdrawal();return false;}
      this.remember(r);if(r.policyVersion!==this.policyVersion)return false;
      this.remember(this.receipt);this.receipt={consentToken:r.consentToken,sessionId:r.sessionId,expiresAt:r.expiresAt,policyVersion:r.policyVersion};
      this.entryProduct=r.context?.entryProduct===null?null:['food','beauty'].includes(r.context?.entryProduct)?r.context.entryProduct:this.entryProduct;this.attribution=r.context?.attribution??this.attribution;
      // The Meta choice was made where the visitor started; the CRM says which it was.
      this.marketing=r.context?.marketing===true;storageSet('cenlo-acquisition-marketing-v1',this.marketing);
      storageSet('cenlo-acquisition-receipt-v1',this.receipt);storageSet('cenlo-acquisition-choice-v1','accepted');this.onChange();void this.prepare();return true;
    }catch{return false;}
  }
  context() { return {sessionId:this.receipt.sessionId,product:this.product,entryProduct:this.entryProduct,environment:'production',trafficClass:'public',experience:this.surface,...(this.revision?{bioRevision:this.revision}:{}),attribution:this.attribution}; }
  event(name, properties={}) {
    if (!this.receipt || this.disabled || Date.parse(this.receipt.expiresAt)<=Date.now()) return false;
    const consentToken=this.receipt.consentToken;
    const event={schemaVersion:1,eventId:crypto.randomUUID(),name,occurredAt:new Date().toISOString(),context:this.context(),properties};
    // No pre-consent queue, no PII, no replay after withdrawal. Transport failure never blocks use.
    void this.request('/events',{consentToken,events:[event]}).catch(()=>{});void this.mirror(name,event.eventId);return true;
  }
  /** The Pixel sees the same fact with the same eventID, and only after the Meta choice. */
  async mirror(name,eventId){const metaName=META_EVENTS[name];if(metaName)await this.mirrorMeta(metaName,eventId);}
  /** For facts the CRM confirms (a saved diagnostic is the Lead): the page passes the
   * id the CRM uses, so the Pixel and the Conversions API describe one event. */
  async mirrorMeta(metaName,eventId,properties={}){
    if(!this.marketing||this.disabled||this.preview||!this.receipt||Date.parse(this.receipt.expiresAt)<=Date.now())return;
    const product=this.product;const id=this.pixels[product]??=await pixelFor(this,product);
    if(!id||!this.marketing)return;loadPixel(id);
    try{globalThis.fbq(META_STANDARD.has(metaName)?'trackSingle':'trackSingleCustom',id,metaName,{content_category:product,...properties},{eventID:eventId});}catch{}
  }
  async prepare() {
    if (!this.receipt || this.disabled || Date.parse(this.receipt.expiresAt)<=Date.now()) return;
    const receipt=this.receipt, product=this.product;
    await Promise.allSettled(['demo','diagnostic','bio'].filter(d=>d!==this.surface).map(async destination=>{try { const h=await this.request('/handoffs',{consentToken:receipt.consentToken,destination,product});if(this.receipt===receipt&&product===this.product)this.handoffs[destination]=h; } catch {} }));
    try {const r=await this.request('/references',{product,stage:this.surface==='diagnostic'?'diagnostic':'direct',consentToken:receipt.consentToken,shareSummary:false});if(this.receipt===receipt&&product===this.product){this.reference=r.reference;this.onChange();}} catch {}
  }
  destination(url, destination) {
    const out=new URL(url);out.searchParams.delete('acq');const h=this.handoffs[destination];
    if(this.receipt&&Date.parse(this.receipt.expiresAt)>Date.now()&&!this.disabled&&h&&Date.parse(h.expiresAt)>Date.now()){out.searchParams.set('acq',h.code);delete this.handoffs[destination];}
    return out.href;
  }
}
export function consentControls(client, mount, { privacyUrl='https://pedro.cenlo.pt/privacidade.html', enabled=true }={}) {
  const box=document.createElement('div');box.className='consent-controls';mount.append(box);const choice=storageGet('cenlo-acquisition-choice-v1');let expanded=enabled&&(!choice||(choice==='accepted'&&!client.receipt)),feedback='',metaChecked=false;
  const draw=()=>{
    box.replaceChildren();const toggle=document.createElement('button');toggle.type='button';toggle.className='privacy-toggle';toggle.textContent='Privacidade';toggle.addEventListener('click',()=>{expanded=!expanded;draw();});box.append(toggle);
    if (!expanded) return;
    const p=document.createElement('p');p.textContent=feedback||(!enabled&&!client.receipt?'A medição está desativada nesta experiência. Pode usar a bio, o teste, o diagnóstico e o contacto normalmente.':'Pode usar tudo sem medição. Se permitir, o Cenlo acompanha cliques e etapas entre a bio, o teste e o diagnóstico por até 90 dias. Pode retirar aqui a qualquer momento.'+(client.receipt?(client.marketing?' Também autorizou a Meta a usar estes dados para anúncios.':' A Meta não recebe nada.'):''));box.append(p);
    if(enabled&&!client.receipt){const label=document.createElement('label');label.className='consent-meta';const cb=document.createElement('input');cb.type='checkbox';cb.checked=metaChecked;cb.addEventListener('change',()=>{metaChecked=cb.checked;});label.append(cb,document.createTextNode(' Também deixar a Meta usar estes dados para mostrar anúncios do Cenlo no Instagram e no Facebook.'));box.append(label);}
    const choices=document.createElement('div');choices.className='consent-choices';box.append(choices);
    for(const [label,action] of [[(client.receipt||client.revocationReceipt)?'Retirar permissão':'Continuar sem medição',()=>client.decline()],...(enabled&&!client.receipt?[['Permitir medição',()=>client.accept(metaChecked)]]:[])]){
      const b=document.createElement('button');b.type='button';b.textContent=label;b.addEventListener('click',async()=>{b.disabled=true;const ok=await action();expanded=ok===false;if(ok===false)feedback=client.pendingWithdrawal?'A medição parou neste navegador. A retirada dos dados será concluída quando a conexão voltar.':'A medição não está disponível agora. Pode continuar normalmente.';else feedback='';draw();});choices.append(b);
    }
    const a=document.createElement('a');a.href=privacyUrl;a.textContent='Como usamos os dados';a.target='_blank';a.rel='noopener noreferrer';box.append(a);
  };draw();return draw;
}
