import test from 'node:test';
import assert from 'node:assert/strict';
import { webcrypto } from 'node:crypto';
const calls=[];
const storage=new Map();
globalThis.location=new URL('http://localhost/site-pizzaria');
globalThis.sessionStorage={getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)};
globalThis.localStorage=globalThis.sessionStorage;
globalThis.fbq=(...args)=>calls.push(args);
const {landingView,confirmedLandingLead,trackingAllowed}=await import('../../public/shared/site-pizzaria-pixel.js');
const {AcquisitionClient}=await import('../../public/shared/food-acquisition-core.js');
function reset(url='https://cenlofood.cenlo.pt/site-pizzaria?utm_source=meta'){
 globalThis.location=new URL(url);calls.length=0;storage.clear();delete globalThis.__cenloSitePizzariaView;delete globalThis.__cenloFoodPixelInitialized;delete globalThis.__cenloSitePizzariaLeads;
}
test('PageView preserves the landing URL and shares its UUID with CAPI after consent',async()=>{
 reset(); const view=landingView();landingView();
 const client=new AcquisitionClient({surface:'diagnostic'});
 const sent=[];client.request=async(path,body)=>{sent.push({path,body});return {}};
 assert.equal(client.event('food_funnel_viewed'),false);
 client.receipt={sessionId:webcrypto.randomUUID(),consentToken:'fixture',expiresAt:new Date(Date.now()+60000).toISOString()};
 client.context=()=>({sessionId:client.receipt.sessionId,product:'food',experience:'site_offer',environment:'production',trafficClass:'public'});
 assert.equal(client.event('food_funnel_viewed'),true);
 const pv=calls.filter(c=>c[2]==='PageView');assert.equal(pv.length,1);
 assert.equal(pv[0][4].eventID,view.id);assert.equal(sent[0].body.events[0].eventId,view.id);
 assert.equal(view.url,'https://cenlofood.cenlo.pt/site-pizzaria?utm_source=meta');
 assert.equal(sent[0].body.events[0].context.experience,'site_offer');
 assert.equal(calls.filter(c=>c[2]==='Lead').length,0);
});
test('no Pixel in localhost, preview, explicit test or marked test journey',()=>{
 for(const url of ['http://localhost/site-pizzaria','http://127.0.0.1/site-pizzaria','https://preview.vercel.app/site-pizzaria','https://cenlofood.cenlo.pt/site-pizzaria?test=1']){
 reset(url);assert.equal(trackingAllowed(),false);assert.equal(landingView(),null);confirmedLandingLead('food-contact:'+webcrypto.randomUUID());assert.equal(calls.length,0);
 }
 reset();storage.set('cenlo-food-autonomous:v1',JSON.stringify({isTest:true}));assert.equal(landingView(),null);assert.equal(calls.length,0);
});
test('confirmed Lead uses the CRM id once per tab, and ignores invalid receipts',()=>{
 reset();const id='food-contact:'+webcrypto.randomUUID();confirmedLandingLead('');confirmedLandingLead('SPZ-RECEBIDO');assert.equal(calls.length,0);
 confirmedLandingLead(id);confirmedLandingLead(id);delete globalThis.__cenloSitePizzariaLeads;confirmedLandingLead(id);
 const leads=calls.filter(c=>c[2]==='Lead');assert.equal(leads.length,1);assert.equal(leads[0][4].eventID,id);
});
test('a different visit has a different UUID; hash navigation does not duplicate',()=>{
 reset();const first=landingView();location.hash='pedido';assert.equal(landingView().id,first.id);
 delete globalThis.__cenloSitePizzariaView;assert.notEqual(landingView().id,first.id);
});
