const $ = (selector) => document.querySelector(selector);
$('#year').textContent = new Date().getFullYear();
// Section-based navigation remains progressive: without JS the full page is readable.
if (!document.body.classList.contains('project-page')) {
  const sections = {
    home: document.querySelector('.hero'),
    work: document.querySelector('#work'),
    capabilities: document.querySelector('#capabilities'),
    process: document.querySelector('#process'),
    about: document.querySelector('#about'),
    contact: document.querySelector('#contact')
  };
  const main = document.querySelector('main');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let active = null;
  let navigationSequence = 0;
  const extras = [document.querySelector('.discipline-strip'), document.querySelector('.business-value')];
  document.body.classList.add('section-navigation');
  const nav = document.querySelector('header nav');
  let menuToggle = document.querySelector('.mobile-menu-toggle');
  if (!menuToggle && nav) {
    menuToggle = document.createElement('button'); menuToggle.className = 'mobile-menu-toggle'; menuToggle.type = 'button'; menuToggle.setAttribute('aria-expanded', 'false'); menuToggle.setAttribute('aria-controls', 'main-navigation');
    menuToggle.innerHTML = '<span class="menu-icon" aria-hidden="true"><i></i><i></i><i></i></span><span class="sr-only">Open menu</span>'; nav.parentElement.insertBefore(menuToggle, nav);
  }
  nav.innerHTML = '<a href="#home">Home</a><a href="projects.html">Projects ↗</a><a href="#capabilities">Capabilities</a><a href="#process">How I work</a><a href="#about">About</a><a href="#contact">Contact</a>';
  const closeMobileMenu = () => { nav.classList.remove('is-open'); menuToggle?.setAttribute('aria-expanded', 'false'); menuToggle?.querySelector('.sr-only').replaceChildren(document.createTextNode('Open menu')); };
  menuToggle?.addEventListener('click', () => { const isOpen = nav.classList.toggle('is-open'); menuToggle.setAttribute('aria-expanded', String(isOpen)); menuToggle.querySelector('.sr-only').replaceChildren(document.createTextNode(isOpen ? 'Close menu' : 'Open menu')); });
  nav.addEventListener('click', (event) => { if (event.target.closest('a')) closeMobileMenu(); });
  function keyFromHash() { const key = location.hash.slice(1) || 'home'; return sections[key] ? key : 'home'; }
  async function showSection(key, animate = true) {
    if (key === active) return;
    const sequence = ++navigationSequence;
    if (animate && active && !reduced.matches) {
      const fade = main.animate([{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(5px)' }], { duration: 260, easing: 'ease-in', fill: 'forwards' });
      await fade.finished.catch(() => {});
      fade.cancel();
      if (sequence !== navigationSequence) return;
    }
    Object.entries(sections).forEach(([name, section]) => { if (section) section.hidden = name !== key; });
    extras.forEach(element => { if (element) element.hidden = key !== 'home'; });
    active = key;
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.querySelectorAll('header a[href^="#"]').forEach(link => {
      if (link.getAttribute('href') === '#' + key) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    if (animate && !reduced.matches) {
      main.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 390, easing: 'ease-out' });
    }
    if (animate) {
      const heading = sections[key]?.querySelector('h1,h2');
      if (heading) { heading.setAttribute('tabindex', '-1'); heading.focus({ preventScroll: true }); }
    }
  }
  document.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target === '_blank') return;
    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin || url.pathname !== location.pathname) return;
    const key = url.hash.slice(1) || 'home';
    if (!sections[key]) return;
    event.preventDefault();
    if (key !== active) { history.pushState(null, '', '#' + key); showSection(key); }
  });
  window.addEventListener('popstate', () => showSection(keyFromHash()));
  window.addEventListener('hashchange', () => showSection(keyFromHash()));
  showSection(keyFromHash(), false);
}
const projects = {
  capital: {
    category: 'PYTHON · STREAMLIT · SQLITE · MARKET DATA', title: 'Digital Asset Reporting Dashboard',
    intro: 'A personal investment arrangement needed a clearer picture of contributions, withdrawals, asset holdings, and changing trading performance.',
    sections: [
      ['The problem', 'Irregular capital movements and fast-changing cryptocurrency prices made ad hoc manual reporting difficult. The investor needed direct visibility into what was recorded and how the account was performing.'],
      ['My contribution', 'Identified the reporting need, defined the information the dashboard should expose, and developed the application with AI coding assistance through iterative requirements, review, and corrections.'],
      ['What was built', 'A Python application with a SQLite transaction ledger, weighted-average cost calculations, separate realized and unrealized profit/loss, capital movement tracking, and traceable corrections. Public market quotes refresh approximately once a minute while the view is open. Read-only wallet previews are separate from accounting entries.'],
      ['Delivery & scope', 'Project records document deployment and accounting checks for fees, oversells, and the separation of withdrawals from trading losses. Transaction recording remains manual; price quotes and wallet previews do not automatically import trades.'],
      ['Future direction', 'Reconciled transaction imports and, later, experiments with model-assisted trading. Automated trading and independently trained models are not presented as completed features.']
    ]
  },
  retail: {
    category: 'JAVASCRIPT · NODE.JS · EXPRESS · POSTGRESQL', title: 'Retail & Consignment Management App',
    intro: 'A phone-first record book designed around the everyday financial workflow of a small consignment retail business.',
    sections: [
      ['The problem', 'Sales, expenses, supplier obligations, borrowed money, and repayments needed distinct records. Mixing them together made balances difficult to interpret.'],
      ['My contribution', 'Translated the business workflow into application requirements and developed the tool with AI coding assistance. Iterations addressed real feedback, including independent supplier payments, lender records, and edit controls.'],
      ['What was built', 'Sales and expenses, consignment bales, supplier balances and payments, lender balances and repayments, daily cash checks, monthly summaries, CSV exports, and JSON backups. The application includes owner sign-in and cloud database storage.'],
      ['Delivery & scope', 'Deployed on Railway and refined through business-user feedback, including supplier balance corrections and separate lender records. Screenshots show the local preview with anonymous branding.']
    ]
  },
  workshop: {
    category: 'PYTHON · STREAMLIT · SQLITE · PDF REPORTING', title: 'Vehicle Workshop Management Prototype',
    intro: 'A connected prototype exploring how a vehicle workshop could track a service journey from inspection to repair closeout.',
    sections: [
      ['The problem', 'Vehicle information, inspection findings, approved repair work, parts movements, and customer documents can become disconnected across a workshop.'],
      ['My contribution', 'Shaped the proposed workflow and developed the prototype with AI coding assistance, connecting operational records with customer-facing reports and a presentation walkthrough.'],
      ['What was built', 'Vehicle profiles, inspection reports, repair jobs and approval records, parts issue/return workflows, invoices, manually recorded payments, service history, and downloadable PDFs. A read-only presentation version demonstrates the connected journey with fictional data.'],
      ['Delivery & scope', 'This is a prototype, not an operational workshop deployment. Scanner support processes exported files rather than a live scanner connection. Payment processing and messaging integrations are not connected. The local prototype and session-based trial have different storage and access limits.']
    ]
  }
};
Object.assign(projects, {
  intake: {
    category: 'APPLICATION BUILT · PYTHON · FLASK · SQLITE', title: 'CAC Business Registration Portal',
    intro: 'A registration intake and staff-review application, designed as a foundation for a connected workflow with the official CAC portal.',
    sections: [
      ['What was built', 'Responsive multi-step intake, document uploads with extension and size validation, private file storage, staff authentication, application and payment status tracking, internal notes, and editable fee quotes.'],
      ['Development contribution', 'Developed with AI coding assistance around the intake and staff-review workflow. The implementation includes Flask routes, SQLite records, HTML templates, CSRF protection, and authenticated document downloads.'],
      ['CAC API Integration — In Development', 'The integration is being designed to connect this application with the official CAC portal, allowing supported registration information and status updates to flow between both systems. The goal is to reduce duplicate entry, manual checks, and repeated switching between websites.'],
      ['Why the connection matters', 'Where supported, this could reduce repeated data entry, switching between websites, manual status checks, and avoidable transcription errors. Staff would still handle review, exceptions, and any approvals required by the official registration process.'],
      ['Integration stage', 'Integration design is in progress. Implementation depends on authorized API access and confirmation of supported submission, document, and status operations. Automatic filing and status synchronization are not connected yet.'],
      ['Current stage', 'Implemented application with email support available through provider configuration. Payment references and proof support manual verification; no online payment processor is connected.']
    ]
  },
  creator: {
    category: 'WEBSITE DRAFT BUILT · HTML · CSS · JAVASCRIPT', title: 'Content Creator Portfolio Website',
    intro: 'A developed website draft for presenting a creator’s services, work, and brand collaborations.',
    sections: [
      ['What was built', 'A homepage and collaborators page with a visual presentation of services, creative work, and contact opportunities. A structured intake brief gathers approved personal details, project links, assets, and verified results.'],
      ['Development contribution', 'Developed the website draft with AI coding assistance, shaping its page structure, visual storytelling, and service presentation.'],
      ['Current stage', 'The local website draft is implemented. Personalization is pending approved content. Placeholder audience figures and campaign examples are not client achievements or verified results.']
    ]
  },
  organizer: {
    category: 'TOOL BUILT · PYTHON · FILE AUTOMATION', title: 'Document Organization Tool',
    intro: 'A Python utility for organizing files by type, with both command-line and button-based interfaces.',
    sections: [
      ['What was built', 'File classification, planned-move previews, confirmation before applying changes, destination name handling, and an activity receipt. The project includes a command-line utility and a desktop interface.'],
      ['Development contribution', 'Developed with AI coding assistance as a practical automation project, emphasizing reviewable actions and understandable output.'],
      ['Current stage', 'Working local Python utility with a refined File Studio interface, reviewable file-move previews, and confirmation before changes. Files are moved rather than deleted.']
    ]
  }
});
Object.assign(projects, {
  customer: {
    category: 'IN DEVELOPMENT · BLUEPRINT STAGE · CUSTOMER APP', title: 'Customer Vehicle Care App',
    intro: 'A customer-facing extension in development at the blueprint stage, building on the existing workshop prototype. No customer app or automatic notification service has been implemented yet.',
    sections: [
      ['Proposed customer experience', 'See completed, current, and remaining work; parts used; repairs performed; itemized estimates and recorded spending; and progress against agreed job milestones.'],
      ['Updates and notifications', 'The intended design pushes updates when staff record job events. Real-time delivery depends on the chosen infrastructure and timely staff entries; the app cannot know unrecorded workshop activity. Notification channels and customer access controls remain to be selected.'],
      ['Progress and money', 'Use a defined milestone or task-weighting method for progress percentages, rather than treating elapsed time as completion. Distinguish quoted, approved, incurred, invoiced, and paid amounts so customers can understand the financial picture.'],
      ['Intended outcome and stage', 'Reduce repeated status calls and explanations. This is an intended benefit, not a measured result. Scope recorded on 31 October 2026; implementation follows the workshop workflow design.']
    ]
  },
  store: {
    category: 'IN DEVELOPMENT · BLUEPRINT STAGE · E-COMMERCE', title: 'Imported Goods Online Store',
    intro: 'An online store in development at the blueprint stage for an independent imported-goods retailer. No storefront, checkout, or payment integration has been built yet.',
    sections: [
      ['Proposed shopping journey', 'Browse products and stock availability, view item details, select quantities, add items to a cart, check out, place an order, and make payment through a chosen provider.'],
      ['Proposed operations', 'Product and inventory management, stock checks during checkout, order and payment status, confirmations, fulfilment, delivery updates, and a process for cancellations, returns, or refunds.'],
      ['Decisions before implementation', 'Confirm product variants, selling currency, sales region, shipping rules, payment provider, stock reservation behavior, and the retailer’s fulfilment process.'],
      ['Stage', 'Blueprint-stage scope recorded on 31 October 2026. This entry will be refined with actual implementation, screenshots, and verified results as the project progresses.']
    ]
  }
});
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  const project = projects[button.dataset.project];
  $('#case-category').textContent = project.category; $('#case-title').textContent = project.title; $('#case-intro').textContent = project.intro;
  $('#case-body').replaceChildren(...project.sections.map(([title, text]) => { const section = document.createElement('section'); const h = document.createElement('h3'); h.textContent = title; const p = document.createElement('p'); p.textContent = text; section.append(h, p); return section; }));
  const captures = {
    capital: [['capital-overview.png', 'Actual Python dashboard, isolated demo with fictional trades and valuations.']],
    retail: [['retail-overview.png', 'Actual retail application in local preview mode, anonymous branding and empty records.']],
    workshop: [['workshop-overview.png', 'Actual read-only workshop presentation demo with fictional records and anonymous branding.'], ['workshop-repair.png', 'Repair closeout and invoice view from the fictional presentation demo.']],
    intake: [['cac-intake.png', 'Actual Flask intake application with anonymous branding and a fresh local database.']],
    organizer: [['organizer-desktop.png', 'File Studio desktop interface previewing three fictional files.']],
    creator: [['creator-home.png', 'Actual creator website draft; placeholder identity and stock imagery are part of the draft.']]
  };
  const gallery = document.createElement('div'); gallery.className = 'capture-gallery';
  (captures[button.dataset.project] || []).forEach(([file,caption]) => {
    const figure = document.createElement('figure'); const image = document.createElement('img');
    image.src = 'assets/' + file; image.alt = caption; image.loading = 'lazy';
    const label = document.createElement('figcaption'); label.textContent = caption;
    const link = document.createElement('a'); link.href = image.src; link.target = '_blank'; link.rel = 'noopener'; link.setAttribute('aria-label', 'Open full-size screenshot'); link.append(image);
    figure.append(link,label); gallery.append(figure);
  });
  $('#case-body').prepend(gallery);
  $('.case-disclosure').textContent = captures[button.dataset.project] ? 'Actual application screenshots with demonstration records and anonymous branding. Select an image to open the full-size view.' : 'This entry describes the recorded project stage. No screenshot or working implementation is implied for blueprint-stage projects.';
  $('#case-dialog').showModal(); $('#case-dialog').scrollTop = 0;
}));
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
});
$('#inquiry-open').addEventListener('click', () => $('#inquiry-dialog').showModal());
$('#inquiry-form').addEventListener('submit', event => {
  event.preventDefault(); const data = new FormData(event.currentTarget);
  const content = `MARVEL FORGE — PROJECT BRIEF\n\nName: ${data.get('name')}\nService: ${data.get('service')}\n\nProject description\n${data.get('description')}\n\nPrepared locally. This brief has not been sent.\n`;
  if (event.submitter?.value === 'email') {
    location.href = 'mailto:igwenze_marvel@outlook.com?subject=' + encodeURIComponent('Project inquiry — ' + data.get('service')) + '&body=' + encodeURIComponent(content.replace('Prepared locally. This brief has not been sent.', ''));
    $('#inquiry-status').textContent = 'Your email app will open with the brief. Review it and send when ready. If it does not open, email igwenze_marvel@outlook.com directly.';
    return;
  }
  if (event.submitter?.value === 'whatsapp') {
    window.open('https://wa.me/15806438179?text=' + encodeURIComponent(content.replace('Prepared locally. This brief has not been sent.', '')), '_blank', 'noopener,noreferrer');
    $('#inquiry-status').textContent = 'WhatsApp opens with your brief. Review the message and send it when ready.';
    return;
  }
  const url = URL.createObjectURL(new Blob([content], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a'); link.href = url; link.download = 'marvel-forge-project-brief.txt'; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  $('#inquiry-status').textContent = 'Your brief has been downloaded. You can share it by email or WhatsApp when ready.';
});
if (!document.body.classList.contains("project-page")) {
// Optional, gesture-initiated sound. No audio network requests or autoplay.
let audioContext; let soundOn = false;
try { soundOn = localStorage.getItem('marvel-forge-sound') === 'on'; } catch {}
function updateSoundButton() { $('#sound').setAttribute('aria-pressed', String(soundOn)); $('#sound').innerHTML = `<span class="sound-icon">≋</span> SOUND ${soundOn ? 'ON' : 'OFF'}`; }
updateSoundButton();
async function welcomeTone() {
  const Audio = window.AudioContext || window.webkitAudioContext; if (!Audio) return;
  audioContext ||= new Audio(); await audioContext.resume();
  const now = audioContext.currentTime;
  [174.61, 261.63, 349.23, 523.25].forEach((frequency, index) => {
    const oscillator = audioContext.createOscillator(); const gain = audioContext.createGain();
    oscillator.type = 'sine'; oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0, now); gain.gain.linearRampToValueAtTime(.018 / (index + 1), now + .15 + index * .08); gain.gain.exponentialRampToValueAtTime(.0001, now + 2.2);
    oscillator.connect(gain); gain.connect(audioContext.destination); oscillator.start(now); oscillator.stop(now + 2.3);
  });
}
$('#sound').addEventListener('click', () => {
  soundOn = !soundOn; updateSoundButton(); try { localStorage.setItem('marvel-forge-sound', soundOn ? 'on' : 'off'); } catch {}
  if (soundOn) { welcomeTone().catch(() => { soundOn = false; updateSoundButton(); }); }
  else if (audioContext) audioContext.suspend();
});

}

// Public source for visitors who want to explore how this portfolio was built.
const portfolioFooter = document.querySelector('footer');
if (portfolioFooter) {
  const sourceLink = document.createElement('a');
  sourceLink.href = 'https://github.com/igwenze-marvel/marvel-forge-portfolio';
  sourceLink.textContent = 'Explore the source on GitHub ↗';
  sourceLink.target = '_blank';
  sourceLink.rel = 'noopener noreferrer';
  portfolioFooter.append(sourceLink);
}
