import { projects } from './projects.js';

const imageMap = {
 'six-taxi': {icon:'https://play-lh.googleusercontent.com/vn4gXUdvUTEI9A-zemLgzDCydztQZZ7AnZKyRGGDHFNtfxujbp8PSZlbC7z2_0jOcq2YJ7NEXYVE4OMDvWjrgQ=w240-h480', shot:'https://play-lh.googleusercontent.com/zxQjEmv-33KwpXpPJJocYcRgug_Cgn9gFNvsobfCWs-iQxhkwbuJcIhRlf1YbxlFZSAjrv5oKiAwwVneMsXsWQ=w526-h296'},
 'triplly': {icon:'https://play-lh.googleusercontent.com/OFcSTFNvK7RceJ0A-WD2c3_I1XFKWPSpamFLmHvNcyE_MMtreZStC5_2aY1e4pxrswnWpnlSRBMd56bU_MA3_Q=w240-h480', shot:'https://play-lh.googleusercontent.com/bCv9s2TnB72hof1J_iDmEhAjjg7HVDCS121pUz69Driwvaf2164_N-9814iWDygkodPkC_tWuyDm_-FdEirPjg=w526-h296'},
 'advisorx': {icon:'https://play-lh.googleusercontent.com/GhC7xItRUJbYPK9chlYxbrkUHNVrKKAhwHHOi-oSbdeHaX5L7RUw68iWa6gJO46uQ1sjgTJs48ut2Na9J71bTQ=w240-h480', shot:'https://play-lh.googleusercontent.com/RDHKwdsgpXW4afn4Z81uAoN6Y_d0oIb2VkYekKjy71LsRmwp1mJJyCx05Pm1UnP4FR-ShyOdOaVs2Oqev-HhWA=w526-h296'},
 'hamper': {icon:'https://play-lh.googleusercontent.com/jKeNV35hcDtFKmQAAf7Bh1S7TxiKEDK46JsJac4Ig4tabwr7Mn_ssTit4nznMbZ_VzXbrPmm9GIVkGtmwT2N9Q=w240-h480', shot:'https://play-lh.googleusercontent.com/16KKypCEasoRTfxSrnu6UUJJ3vL0UIN2HTVzDfJMsucT-kd_UmSq60cGZrWCYp35kqWRBj95ItP8Uet6eIQG4w=w526-h296'},
 'multiplus': {icon:'https://play-lh.googleusercontent.com/CNzpzvqOjt5o6bmbHRL644N6-A4HKvGeytyuv9mca1-zFloeWuO54DD_rOAtGG3oiQkdM933srHi5a6EKJxoqnU=w240-h480', shot:'https://play-lh.googleusercontent.com/GW3wGOcS_AEFHgfgAJP3loP3_13-3l5_3Q9sQQhbaEaAhEjMEkX9YPY0k7aRXNeP1xdAPh1OEdsr1pBVyuR0JQ=w526-h296'},
 'blueera': {icon:'https://play-lh.googleusercontent.com/mUmSEPP_MDxERElqTq9H7Fi3TGlH3AcJTnXePawXsfmcsFiC609xsF8McVISbVHhehXIAgfDbEG2eHUl35pl_w=w240-h480', shot:'https://play-lh.googleusercontent.com/pHY1JSQeAC3A8AjhpeX_rKEk-BjwcafVwX0n2B6yCumsU-C5DbcUDuH8shk4ZK6gNcm9ecddW9boAOdnz0xn8g4=w526-h296'}
};

const grid = document.querySelector('#projectGrid');
const modal = document.querySelector('#projectModal');
const modalBody = document.querySelector('#modalBody');
let activeFilter = 'all';
let currentProject = 0;

function getVisual(project) {
 const data = imageMap[project.id];
 if (data?.shot) return `<img class="project-shot" src="${data.shot}" alt="${project.name} public app listing screenshot" loading="lazy">`;
 if (data?.icon) return `<img class="project-icon" src="${data.icon}" alt="${project.name} app icon" loading="lazy">`;
 const symbol = project.type === 'web' ? '↗' : project.type === 'platform' ? '◈' : '✳';
 return `<div class="visual-placeholder" style="--accent:${project.accent}"><span class="visual-glyph">${symbol}</span><span class="visual-word">${project.name}</span><span class="visual-caption">${project.category}</span></div>`;
}
function renderGrid() {
 const visible = projects.filter(p => activeFilter === 'all' || p.type === activeFilter);
 grid.innerHTML = visible.map(p => {
  const index = projects.findIndex(x => x.id === p.id);
  return `<article class="project-card" data-id="${p.id}" tabindex="0" role="button" aria-label="Explore ${p.name}">
   <div class="project-visual" style="--accent:${p.accent}">${getVisual(p)}<span class="card-open">↗</span><span class="project-number">${String(index+1).padStart(2,'0')}</span></div>
   <div class="project-meta"><div><span class="project-category">${p.category}</span><h3>${p.name}</h3></div><span class="project-arrow">↗</span></div>
  </article>`;
 }).join('');
 grid.querySelectorAll('.project-card').forEach(card => {
  const open = () => openProject(card.dataset.id);
  card.addEventListener('click', open);
  card.addEventListener('keydown', e => { if(e.key==='Enter' || e.key===' ') { e.preventDefault(); open(); } });
 });
}
function safeLink(url, label) { return url ? `<a class="external-link" href="${url}" target="_blank" rel="noopener noreferrer">${label} ↗</a>` : ''; }
function openProject(id) {
 currentProject = projects.findIndex(p => p.id === id);
 const p = projects[currentProject];
 const image = imageMap[p.id]?.shot;
 const isWeb = p.type !== 'app';
 const hasPreview = Boolean(p.url);
 modalBody.innerHTML = `
  <div class="project-detail-head"><div><div class="eyebrow">${String(currentProject+1).padStart(2,'0')} / ${p.category}</div><h2 id="modalTitle">${p.name}<span class="lime">.</span></h2><p>${p.description}</p></div><div class="detail-actions">${safeLink(p.url,'Visit website')}${safeLink(p.store,'Google Play')}</div></div>
  <div class="detail-preview ${isWeb?'browser-preview':'phone-preview'}">
   ${isWeb ? `<div class="browser-bar"><div class="browser-dots"><i></i><i></i><i></i></div><span>${p.url?.replace(/^https?:\/\//,'') || 'Live preview unavailable'}</span><a href="${p.url}" target="_blank" rel="noopener noreferrer">Open ↗</a></div><div class="device-switch"><span>PREVIEW SIZE</span><button class="device-btn active" data-device="desktop">Desktop</button><button class="device-btn" data-device="tablet">Tablet</button><button class="device-btn" data-device="mobile">Mobile</button></div><div class="browser-stage" data-device="desktop"><div class="browser-fallback"><div class="fallback-symbol">↗</div><h3>Experience the live product.</h3><p>This website may restrict embedded previews. Some websites block embedded browsing; the original link is always available.</p><button class="solid-link try-preview">Try embedded preview ↗</button></div><iframe title="${p.name} live website" src="${p.url}" loading="lazy" sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation"></iframe></div>` : `<div class="phone-frame"><div class="phone-island"></div>${image ? `<img src="${image}" alt="${p.name} public app screenshot">` : `<div class="phone-placeholder" style="--accent:${p.accent}"><b>${p.name}</b><span>Application preview</span><small>Original screenshots to be added</small></div>`}</div><div class="phone-caption"><span>PUBLIC APP LISTING</span><p>Preview uses available public listing imagery. More in-app screens can be added from approved project assets.</p></div></div>`}
  </div>
  <div class="detail-columns"><div><div class="eyebrow">ABOUT THE PROJECT</div><h3>What it is</h3><p>${p.description}</p></div><div><div class="eyebrow">VERIFIED NOTES</div><h3>What we can show</h3>${p.verified?.length ? `<ul>${p.verified.map(x=>`<li>${x}</li>`).join('')}</ul>` : `<p>Project-specific functionality and technical details need confirmation before being published as claims.</p>`}<p class="status-note">${p.status}</p></div></div>`;
 modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.classList.add('modal-open');
 modal.querySelector('.close-modal').focus();
 const stage=modalBody.querySelector('.browser-stage');
 if(stage){ modalBody.querySelector('.try-preview')?.addEventListener('click',()=>stage.classList.add('preview-active')); modalBody.querySelectorAll('.device-btn').forEach(btn=>btn.addEventListener('click',()=>{stage.dataset.device=btn.dataset.device;modalBody.querySelectorAll('.device-btn').forEach(b=>b.classList.toggle('active',b===btn));})); }
}
function closeProject(){ modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); document.body.classList.remove('modal-open'); }
function stepProject(dir){ const next=(currentProject+dir+projects.length)%projects.length; openProject(projects[next].id); }

document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{
 activeFilter=btn.dataset.filter; document.querySelectorAll('.filter').forEach(b=>b.classList.toggle('active',b===btn)); renderGrid();
}));
modal.querySelector('.close-modal').addEventListener('click',closeProject);
modal.querySelector('.modal-backdrop').addEventListener('click',closeProject);
document.querySelector('#prevProject').addEventListener('click',()=>stepProject(-1));
document.querySelector('#nextProject').addEventListener('click',()=>stepProject(1));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open'))closeProject(); if(modal.classList.contains('open')&&e.key==='ArrowRight')stepProject(1); if(modal.classList.contains('open')&&e.key==='ArrowLeft')stepProject(-1);});
document.querySelector('#year').textContent=new Date().getFullYear();
const menu=document.querySelector('.menu-toggle'); menu.addEventListener('click',()=>document.querySelector('.topbar nav').classList.toggle('nav-open'));
document.querySelectorAll('.topbar nav a').forEach(a=>a.addEventListener('click',()=>document.querySelector('.topbar nav').classList.remove('nav-open')));
renderGrid();
