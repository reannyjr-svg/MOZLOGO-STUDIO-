// scripts.js - English version, modular
const CONFIG = {
  WHATSAPP_NUMBER: '+258844152039',
  RECIPIENT_EMAIL: document.getElementById('recipientEmail')?.value || 'reannyjr@gmail.com'
};

const DOM = {
  year: document.getElementById('year'),
  orderForm: document.getElementById('orderForm'),
  response: document.getElementById('response'),
  thankyou: document.getElementById('thankyou'),
  waBtn: document.getElementById('waBtn'),
  waQuick: document.getElementById('waQuick'),
  langEn: document.getElementById('langEn'),
  langPt: document.getElementById('langPt'),
  siteTitle: document.getElementById('siteTitle'),
  siteLead: document.getElementById('siteLead'),
  orderHeading: document.getElementById('orderHeading')
};

DOM.year.textContent = new Date().getFullYear();

const translations = {
  en: {siteTitle:'MozLogo Studio — Professional Logos', siteLead:'Modern visual identities, delivered fast. Starting at $20.', orderHeading:'Place an order'},
  pt: {siteTitle:'MozLogo Studio — Logotipos Profissionais', siteLead:'Identidades visuais modernas, entregues rápido. A partir de $20.', orderHeading:'Fazer pedido'}
};

function applyLanguage(lang){ if(!translations[lang]) return; DOM.siteTitle.textContent = translations[lang].siteTitle; DOM.siteLead.textContent = translations[lang].siteLead; if(DOM.orderHeading) DOM.orderHeading.textContent = translations[lang].orderHeading; }
DOM.langEn?.addEventListener('click', ()=>applyLanguage('en'));
DOM.langPt?.addEventListener('click', ()=>applyLanguage('pt'));

function openWhatsAppMessage(text){ const phone = CONFIG.WHATSAPP_NUMBER.replace(/\D/g,''); const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`; window.open(url, '_blank'); }

function buildOrderMessage(data){ return `Order from: ${data.name}\nE-mail: ${data.email}\nWhatsApp: ${data.phone}\nPackage: ${data.pkg}\nService: ${data.service}\nBrief: ${data.brief}`; }

function validateOrder(data){ if(!data.name || !data.email || !data.phone || !data.brief) return false; return true; }

function sendOrder(data){ if(!validateOrder(data)){ DOM.response.textContent = 'Please fill all required fields.'; return; } const message = buildOrderMessage(data); window.location.href = `mailto:${CONFIG.RECIPIENT_EMAIL}?subject=${encodeURIComponent('New order - MozLogo Studio')}&body=${encodeURIComponent(message)}`; openWhatsAppMessage(`Hello, I just placed an order: ${message}`); DOM.response.textContent = 'Order sent. Check your email and WhatsApp.'; DOM.thankyou.style.display = 'block'; }

DOM.orderForm?.addEventListener('submit', function(e){ e.preventDefault(); const data = { name: document.getElementById('name').value.trim(), email: document.getElementById('email').value.trim(), phone: document.getElementById('phone').value.trim(), pkg: document.getElementById('package').value, service: document.getElementById('service').value, brief: document.getElementById('brief').value.trim(), payment: document.getElementById('payment')?document.getElementById('payment').value:'' }; sendOrder(data); this.reset(); });

DOM.waQuick?.addEventListener('click', ()=>{ const quickText = 'Hello! I would like information about logo design starting at $20.'; openWhatsAppMessage(quickText); });

DOM.waBtn?.addEventListener('click', ()=>{ openWhatsAppMessage('Hello! I would like information about design services.'); });
