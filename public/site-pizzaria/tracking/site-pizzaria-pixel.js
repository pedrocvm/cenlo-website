/** One browser fact per landing visit; the CRM receives this same UUID for CAPI. */
export const PIXEL_ID = '1010704101993887';
export function isSitePizzaria() { return /^\/site-pizzaria\/?$/.test(globalThis.location?.pathname || ''); }
export function trackingAllowed() {
  const location = globalThis.location;
  if (!location || location.protocol !== 'https:' || !['cenlofood.cenlo.pt', 'cenlo.pt', 'www.cenlo.pt'].includes(location.hostname)) return false;
  if (new URLSearchParams(location.search).get('test') === '1') return false;
  try { if (JSON.parse(sessionStorage.getItem('cenlo-food-autonomous:v1') || 'null')?.isTest === true) return false; } catch {}
  return true;
}
function pixel() {
  if (!globalThis.fbq) {
    const queue = function () { queue.callMethod ? queue.callMethod.apply(queue, arguments) : queue.queue.push(arguments); };
    queue.queue = []; queue.push = queue; queue.loaded = true; queue.version = '2.0';
    globalThis.fbq = queue; globalThis._fbq ||= queue;
    const script = document.createElement('script'); script.async = true; script.src = 'https://connect.facebook.net/en_US/fbevents.js'; document.head.append(script);
  }
  if (!globalThis.__cenloFoodPixelInitialized) {
    globalThis.fbq('set', 'autoConfig', false, PIXEL_ID);
    globalThis.fbq('init', PIXEL_ID);
    globalThis.__cenloFoodPixelInitialized = true;
  }
}
export function landingView() {
  if (!isSitePizzaria() || !trackingAllowed()) return null;
  // Keep the actual browser URL (including campaign attribution); never use location.origin alone.
  const url = location.href.split('#')[0];
  let view = globalThis.__cenloSitePizzariaView;
  if (!view || view.url !== url) view = globalThis.__cenloSitePizzariaView = { id: crypto.randomUUID(), url, browserSent: false };
  if (!view.browserSent) {
    pixel();
    globalThis.fbq('trackSingle', PIXEL_ID, 'PageView', { content_category: 'food', content_name: 'site_pizzaria' }, { eventID: view.id });
    view.browserSent = true;
  }
  return view;
}
export function confirmedLandingLead(eventId) {
  if (!isSitePizzaria() || !trackingAllowed() || !/^food-contact:[a-f0-9-]{36}$/.test(eventId)) return;
  const key = `cenlo-site-pizzaria-lead:${eventId}`;
  const sent = globalThis.__cenloSitePizzariaLeads ||= new Set();
  if (sent.has(eventId)) return;
  try { if (sessionStorage.getItem(key)) return; } catch {}
  pixel();
  globalThis.fbq('trackSingle', PIXEL_ID, 'Lead', { content_category: 'food', content_name: 'site_pizzaria', contact_intent: 'site_offer' }, { eventID: eventId });
  sent.add(eventId);
  try { sessionStorage.setItem(key, '1'); } catch {}
}

if (typeof window !== 'undefined') {
  window.addEventListener('cenlo-site-pizzaria-leave', () => { delete globalThis.__cenloSitePizzariaView; });
  window.addEventListener('cenlo-food-navigation', () => {
    if (isSitePizzaria()) landingView();
    else delete globalThis.__cenloSitePizzariaView;
  });
  landingView();
}
