/* ============ PyMossFit landing — interactions ============ */
(() => {
  'use strict';

  /* ---------------- i18n ---------------- */
  const EN = {
    'nav.features':'Features','nav.pipeline':'Workflow','nav.params':'Parameters','nav.start':'Get started','nav.cite':'Cite',
    'hero.eyebrow':'Open source · Google Colab · lmfit',
    'hero.h1a':'Mössbauer spectrum fitting','hero.h1b':'in the cloud, zero setup.',
    'hero.lead':'PyMossFit is a Python notebook to fold, normalize and fit transmission and CEMS Mössbauer spectra. It runs in Google Colab, lets you share results across devices and teams, and identifies phases with KNN over a hyperfine-interaction database.',
    'hero.cta1':'Open in Colab','hero.cta2':'Download (Zenodo)','hero.cta3':'How to cite',
    'hero.badge2':'Python ≥ 3.10','hero.badge3':'ES · EN','hero.live':'live fit',
    'p.is':'isomer shift','p.qs':'quadrupole spl.','p.bhf':'hyperfine field','p.gamma':'linewidth','p.area':'relative area','p.chi':'goodness of fit',
    'feat.kicker':'Features',
    'feat.h2':'A single environment for all your Mössbauer analysis.',
    'feat.sub':'Folding, fitting and phase identification in one notebook — reproducible and ready to discuss with your group.',
    'feat.1t':'FFT folding',
    'feat.1p':'Raw data folding with the discrete Fourier transform (numpy.fft): the folding channel is found at the central min/max of the spectrum, per Nyquist–Shannon.',
    'feat.2t':'Fitting with lmfit',
    'feat.2p':'Lorentzian profiles for singlets, doublets and sextets, plus sextet distributions for disordered environments. Sextets include the <b>quadrupole shift</b> (ΔE<sub>Q</sub>), which makes the line pairs asymmetric. Least-squares with bounds and parameter errors (stderr).',
    'feat.3t':'Savitzky–Golay smoothing',
    'feat.3p':'Optional smoothing for low-statistics spectra (typical in calibration runs), without distorting the line shape.',
    'feat.4t':'Phase identification (KNN)',
    'feat.4p':'Compares the fitted hyperfine parameters against a local database of ~50 Fe (⁵⁷Fe) compounds using a k-Nearest Neighbors classifier (scikit-learn).',
    'feat.5t':'Transmission & CEMS',
    'feat.5p':'Components are subtracted from the background in transmission and summed for CEMS: the same model serves both experimental modes.',
    'feat.6t':'Reports & plots',
    'feat.6p':'Publication-ready CSV outputs: <span class="mono">-plot.csv</span> (data + subspectra + model) and <span class="mono">-report.csv</span> (δ, ΔE<sub>Q</sub>, B<sub>hf</sub>, Γ, area %), plus the fit and residual plot.',
    'feat.7t':'Collaborative & cross-platform',
    'feat.7p':'Built for Google Colab: work from any device and OS, and share the fit live with colleagues.',
    'feat.8t':'Open & citable',
    'feat.8p':'Published with a DOI on Zenodo and in Spectroscopy Journal (MDPI). Ships with example spectra (magnetite, hematite, metallic iron) to try in minutes.',
    'pipe.kicker':'Workflow','pipe.h2':'From raw data to report in four steps.',
    'pipe.1t':'Raw data','pipe.1p':'Load the spectrometer file (single channel or two columns). Set <span class="mono">Vmax</span> and channel count to fix the mm/s scale.',
    'pipe.2t':'Folding + normalization','pipe.2p':'FFT folding writes <span class="mono">calib.txt</span> and a <span class="mono">.csv</span> with columns V (mm/s) and the folded/normalized spectrum.',
    'pipe.3t':'Fitting','pipe.3p':'Declare how many singlets, doublets and sextets (and distributions) to use, plus initial values. lmfit solves and reports every parameter.',
    'pipe.4t':'Phases + report','pipe.4p':'KNN suggests candidate phases from the reference database; the plot and parameter CSVs are exported.',
    'par.kicker':'Hyperfine parameters','par.h2':'Everything the fit can report.',
    'par.sub':'Results are written with their uncertainties and the relative area of each subspectrum, computed by integrating with <span class="mono">scipy.integrate.trapz</span>. Every sextet fits its own <b>quadrupole shift</b> and reports it in <span class="mono">Quad Splitting (mm/s)</span>.',
    'par.is':'isomer shift (IS) — oxidation state and chemical environment.',
    'par.qs':'quadrupole splitting (QS) in doublets — local symmetry.',
    'par.qshift':'sextet quadrupole shift — displaces the line pairs and gives the sextet asymmetry.',
    'par.bhf':'magnetic hyperfine field (T).',
    'par.gamma':'Lorentzian linewidth (mm/s).',
    'par.area':'relative area of each component (%).',
    'par.panel':'Results panel','par.th1':'Component',
    'par.row1':'Sextet 1 (hematite)','par.row2':'Sextet 2 (magnetite)','par.row3':'Doublet 1 (Fe³⁺)',
    'par.fine':'Illustrative example. Actual values and their errors come from fitting each real spectrum.',
    'start.kicker':'Get started','start.h2':'Five minutes and you are fitting.',
    'start.sub':'No local install: open the notebook in Colab, mount your Drive with the data and run the cells in order.',
    'start.open':'Open notebook','start.copy':'Copy',
    'start.vlabel':'Model variants:',
    'start.var1':'General · V7','start.var1d':'Singlets · doublets · sextets (with quadrupole shift)',
    'start.var2':'2Q · 2 doublets','start.var2d':'Dedicated model for two quadrupole doublets',
    'start.fine':'Requirements: Python ≥ 3.10 · numpy · scipy · pandas · matplotlib · lmfit · scikit-learn.',
    'cite.kicker':'Citation','cite.h2':'How to cite PyMossFit',
    'cite.sub':'If PyMossFit helped your work, cite the paper and/or the software. The Zenodo DOI always resolves to the latest published version.',
    'cite.tag1':'Paper','cite.tag2':'Software','cite.copy':'Copy BibTeX',
    'foot.made':'Developed by Fabio D. Saccone — Departamento de Física, Facultad de Ingeniería (UBA) · YPF Tecnología S.A. · CONICET.',
    'foot.copy':'Paper CC BY 4.0 · See the software license in its Zenodo record.'
  };

  const nodes = Array.from(document.querySelectorAll('[data-i18n]'));
  const ES = new Map(nodes.map(n => [n.getAttribute('data-i18n'), n.innerHTML]));

  function applyColabLinks(lang){
    const key = lang === 'en' ? 'colabEn' : 'colabEs';
    document.querySelectorAll('.colab-link').forEach(a => {
      if (a.dataset[key]) a.href = a.dataset[key];
    });
  }

  function setLang(lang){
    nodes.forEach(n => {
      const key = n.getAttribute('data-i18n');
      if (lang === 'en' && EN[key] != null) n.innerHTML = EN[key];
      else if (ES.has(key)) n.innerHTML = ES.get(key);
    });
    document.documentElement.lang = lang;
    document.querySelectorAll('.lang-btn').forEach(b =>
      b.classList.toggle('is-active', b.dataset.lang === lang));
    applyColabLinks(lang);
    try { localStorage.setItem('pmf-lang', lang); } catch(e){}
  }
  document.querySelectorAll('.lang-btn').forEach(b =>
    b.addEventListener('click', () => setLang(b.dataset.lang)));

  let saved = 'es';
  try { saved = localStorage.getItem('pmf-lang') || 'es'; } catch(e){}
  setLang(saved);

  /* ---------------- copy buttons ---------------- */
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      let text = btn.dataset.copy || '';
      if (btn.dataset.copyTarget){
        const el = document.querySelector(btn.dataset.copyTarget);
        if (el) text = el.textContent;
      }
      try {
        await navigator.clipboard.writeText(text.trim());
        const old = btn.textContent;
        btn.textContent = document.documentElement.lang === 'en' ? 'Copied ✓' : 'Copiado ✓';
        setTimeout(() => btn.textContent = old, 1600);
      } catch(e){ /* clipboard may be blocked */ }
    });
  });

  /* ---------------- reveal (IO + robust fallback) ---------------- */
  const revealEls = Array.from(document.querySelectorAll('.reveal'));
  function revealInView(){
    const vh = window.innerHeight || 800;
    revealEls.forEach(el => {
      if (el.classList.contains('in')) return;
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.94 && r.bottom > 0) el.classList.add('in');
    });
  }
  try {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealEls.forEach(el => io.observe(el));
  } catch (e) {
    revealEls.forEach(el => el.classList.add('in'));
  }
  window.addEventListener('load', revealInView);
  window.addEventListener('scroll', revealInView, { passive: true });
  window.addEventListener('resize', revealInView);
  revealInView();
  setTimeout(revealInView, 400);

  /* ---------------- year ---------------- */
  const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();

  /* ---------------- parameter chips count-up ---------------- */
  const chips = document.querySelectorAll('#paramStrip .pv');
  const startT = performance.now();
  function ease(t){ return 1 - Math.pow(1 - t, 3); }
  function tickChips(now){
    const t = Math.min(1, (now - startT) / 1100);
    const k = ease(t);
    chips.forEach(c => {
      const target = parseFloat(c.dataset.val);
      const suffix = c.dataset.suffix || '';
      const val = target * k;
      const decimals = (target % 1 === 0) ? 0 : (Math.abs(target) < 10 ? 2 : 1);
      c.textContent = val.toFixed(decimals) + suffix;
    });
    if (t < 1) requestAnimationFrame(tickChips);
  }
  requestAnimationFrame(tickChips);

  /* ---------------- spectrum canvas ---------------- */
  const canvas = document.getElementById('spectrum');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W = 640, H = 420, dpr = 1;

  // component definitions (velocity mm/s, illustrative hematite + magnetite + doublet)
  const SExtetPos = [-1, -0.66, -0.22, 0.22, 0.66, 1];
  const SExtetIn  = [3, 2, 1, 1, 2, 3];

  function lorentz(x, amp, c, w){
    return amp * (2 * w / (Math.PI * ((x - c) ** 2 + w ** 2)));
  }
  function sextet(x, delta, halfW, gamma, amp){
    let y = 0;
    for (let i = 0; i < 6; i++) y += lorentz(x, amp * SExtetIn[i], delta + SExtetPos[i] * halfW, gamma);
    return y;
  }
  function doublet(x, delta, quad, gamma, amp){
    return lorentz(x, amp, delta - quad / 2, gamma) + lorentz(x, amp, delta + quad / 2, gamma);
  }

  const comps = [
    { f: x => sextet(x, 0.00, 5.30, 0.30, 0.028), color: '#ffb703', lw: 1.4 },  // hematite sextet
    { f: x => sextet(x, 0.05, 4.05, 0.36, 0.011), color: '#4cc9f0', lw: 1.4 },  // magnetite-ish
    { f: x => doublet(x, -0.10, 0.70, 0.34, 0.010), color: '#9b8cff', lw: 1.4 } // paramagnetic doublet
  ];

  const noise = [];
  const X0 = -9, X1 = 9, NPTS = 260;
  let seed = 7;
  function rnd(){ seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; }
  for (let i = 0; i < NPTS; i++) noise.push((rnd() - 0.5));

  function resize(){
    const cssW = canvas.clientWidth || 640;
    dpr = Math.min(2.5, window.devicePixelRatio || 1);
    W = cssW; H = Math.round(cssW * 0.66);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  const PAD = { l: 44, r: 14, t: 16, b: 34 };
  function mapX(v){ return PAD.l + (v - X0) / (X1 - X0) * (W - PAD.l - PAD.r); }
  function mapY(t){ return PAD.t + (1 - t) * (H - PAD.t - PAD.b); } // t: 0..1 transmission

  function drawAxes(){
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = 'rgba(37,49,79,.9)';
    ctx.lineWidth = 1;
    ctx.font = '11px "JetBrains Mono", monospace';
    ctx.fillStyle = '#6f7fa8';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    for (let t = 0; t <= 1.0001; t += 0.25){
      const yy = mapY(t);
      ctx.beginPath(); ctx.moveTo(PAD.l, yy); ctx.lineTo(W - PAD.r, yy); ctx.stroke();
      ctx.fillText((t * 100).toFixed(0) + '%', PAD.l - 8, yy);
    }
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    for (let v = X0; v <= X1; v += 3){
      const xx = mapX(v);
      ctx.beginPath(); ctx.moveTo(xx, PAD.t); ctx.lineTo(xx, H - PAD.b); ctx.stroke();
      ctx.fillText(v.toFixed(0), xx, H - PAD.b + 8);
    }
    ctx.fillStyle = '#8fa0c8';
    ctx.textAlign = 'center';
    ctx.fillText('Velocity (mm/s)', (PAD.l + W - PAD.r) / 2, H - 16);
    ctx.save();
    ctx.translate(14, (PAD.t + H - PAD.b) / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Relative transmission', 0, 0);
    ctx.restore();
  }

  function modelAt(x, key){
    switch(key){
      case 'total': return comps.reduce((s, c) => s + c.f(x), 0);
      case 'c0': return comps[0].f(x);
      case 'c1': return comps[1].f(x);
      case 'c2': return comps[2].f(x);
    }
  }

  function line(key, color, lw, dash){
    ctx.beginPath();
    for (let i = 0; i <= NPTS; i++){
      const v = X0 + (X1 - X0) * i / NPTS;
      const t = 1 - modelAt(v, key);
      const xx = mapX(v), yy = mapY(t);
      i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy);
    }
    ctx.strokeStyle = color; ctx.lineWidth = lw;
    ctx.setLineDash(dash || []);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  let t0 = performance.now();
  function frame(now){
    const el = (now - t0) / 1000;
    drawAxes();

    // component subspectra (dashed)
    comps.forEach(c => {
      ctx.beginPath();
      for (let i = 0; i <= NPTS; i++){
        const v = X0 + (X1 - X0) * i / NPTS;
        const xx = mapX(v), yy = mapY(1 - c.f(v));
        i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy);
      }
      ctx.strokeStyle = c.color + '99'; ctx.lineWidth = 1.2; ctx.setLineDash([4, 4]);
      ctx.stroke(); ctx.setLineDash([]);
    });

    // raw data (points) with noise
    ctx.fillStyle = 'rgba(200,212,240,.55)';
    for (let i = 0; i <= NPTS; i++){
      const v = X0 + (X1 - X0) * i / NPTS;
      const t = 1 - modelAt(v, 'total') + noise[i] * 0.012;
      const xx = mapX(v), yy = mapY(t);
      ctx.fillRect(xx - 1.1, yy - 1.1, 2.2, 2.2);
    }

    // animated sweep for the total fit
    const sweep = (Math.sin(el * 0.8) * 0.5 + 0.5); // slow breathing reveal
    const cut = PAD.l + sweep * (W - PAD.l - PAD.r);
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, cut, H);
    ctx.clip();
    line('total', '#ff5d73', 2.2);
    ctx.restore();

    // full total fit in a faint tone so the shape always reads
    ctx.save();
    ctx.globalAlpha = 0.22;
    line('total', '#ff5d73', 1.2);
    ctx.restore();

    requestAnimationFrame(frame);
  }

  function boot(){ resize(); t0 = performance.now(); requestAnimationFrame(frame); }
  window.addEventListener('resize', resize);
  boot();
})();
