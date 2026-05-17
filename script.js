/* ══════════════════════════════════════════════════════════════════
   SCRIPT.JS — Tutto il JavaScript del portfolio

   Questo file contiene 8 blocchi indipendenti, uno per ogni
   "comportamento dinamico" del sito. Ogni blocco è autonomo —
   se ne togli uno, gli altri continuano a funzionare.

   I 8 blocchi:
   1. Uptime counter      → conta da quanto è aperta la pagina
   2. Stack cycle         → cicla tecnologie nel pannello live system
   3. Nav hide on scroll  → nasconde la nav scrollando giù
   4. Parallax + mouse    → fa muovere il nome ANDRES PELIZZER
   5. Hamburger menu      → apertura/chiusura menu mobile
   6. Reveal on scroll    → fa apparire elementi mentre scrolli
   7. Project switching   → cambia immagine browser nei projects
   8. Stat cards toggle   → espande/chiude le 3 card About al click

   Lo script è caricato in fondo al <body>, NON nell'<head>.
   Importante: se fosse nell'<head> verrebbe eseguito PRIMA che
   gli elementi HTML esistano, e tutti i getElementById sarebbero null.
══════════════════════════════════════════════════════════════════ */

/* ════════════════════════════════════════════════════════════════
   1. UPTIME COUNTER
   Mostra ore:minuti:secondi nel pannello live system dell'hero.
═══════════════════════════════════════════════════════════════════ */

/* Date.now() = timestamp attuale in millisecondi.
   Lo salviamo all'apertura come riferimento "tempo zero". */
const startTime = Date.now();
const uptimeEl = document.getElementById("uptime");

setInterval(() => {
  /* secondi totali trascorsi dall'apertura */
  const s = Math.floor((Date.now() - startTime) / 1000);

  /* da secondi totali ricaviamo h, m, s.
     padStart(2, "0"): se la stringa è < 2 caratteri, la riempie
     con uno "0" all'inizio. Così "5" diventa "05". */
  const h = String(Math.floor(s / 3600)).padStart(2, "0");
  const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const sec = String(s % 60).padStart(2, "0");

  /* Aggiorna il testo del <span id="uptime">.
     I backtick ` ` (template literals) permettono di inserire
     variabili nella stringa con la sintassi ${variabile}. */
  uptimeEl.textContent = `${h}:${m}:${sec}`;
}, 1000); /* ogni 1 secondo */

/* ════════════════════════════════════════════════════════════════
   2. STACK CYCLE
   Cicla un array di tecnologie nel pannello live system.
   Ogni 1.8s: nasconde → cambia testo → mostra
═══════════════════════════════════════════════════════════════════ */

/* Due array paralleli: nomi lunghi su desktop, abbreviati su mobile.
   Su schermi stretti "JavaScript" allarga la riga della status bar e
   spinge fuori gli altri item: usiamo "JS"/"Node" sotto i 720px.
   matchMedia + listener: se l'utente ruota o ridimensiona, l'array
   attivo si aggiorna senza dover ricaricare la pagina. */
const stacksDesktop = [
  "HTML",
  "CSS",
  "JavaScript",
  "Node.js",
  "Express",
  "MySQL",
  "Python",
];
const stacksMobile = [
  "HTML",
  "CSS",
  "JS",
  "Node",
  "Express",
  "MySQL",
  "Python",
];

const mqMobile = window.matchMedia("(max-width: 720px)");
let stacks = mqMobile.matches ? stacksMobile : stacksDesktop;
mqMobile.addEventListener("change", (e) => {
  stacks = e.matches ? stacksMobile : stacksDesktop;
});

const stackEl = document.getElementById("stackCycle");
let si = 0; /* "stack index" — l'indice corrente nell'array */

setInterval(() => {
  /* fase 1: nascondi con animazione "scendi e dissolvi" */
  stackEl.style.opacity = "0";
  stackEl.style.transform = "translateY(6px)";
  stackEl.style.transition = "opacity 0.2s, transform 0.2s";

  /* fase 2: dopo 220ms (quando l'elemento è ormai trasparente)... */
  setTimeout(() => {
    /* incrementa l'indice. L'operatore % (modulo) fa ricominciare
       da 0 dopo l'ultimo elemento — così cicliamo all'infinito. */
    si = (si + 1) % stacks.length;
    stackEl.textContent = stacks[si];

    /* fase 3: torna visibile (animato grazie alla transition) */
    stackEl.style.opacity = "1";
    stackEl.style.transform = "translateY(0)";
  }, 220);
}, 1800);

/* ════════════════════════════════════════════════════════════════
   3. RIFERIMENTO ALLA NAV
   La nav è sempre visibile: sfondo solido, non si nasconde mai.
═══════════════════════════════════════════════════════════════════ */

/* ════════════════════════════════════════════════════════════════
   4. PARALLAX + MOUSE MOVEMENT SUL NOME

   Due effetti combinati su ANDRES PELIZZER:
   - MOUSE: il nome segue leggermente il cursore
   - SCROLL: il nome sale verso l'alto a velocità diverse

   ANDRES (heroFirst) si muove più lento → sembra "più lontano".
   PELIZZER (heroLast) si muove più veloce → sembra "più vicino".
   La differenza crea sensazione di profondità (effetto parallax).
═══════════════════════════════════════════════════════════════════ */

const heroFirst = document.querySelector(".hero-first");
const heroLast = document.querySelector(".hero-last");

let scrollY = 0;

/* Listener scroll che aggiorna scrollY (la usa mousemove) */
window.addEventListener(
  "scroll",
  () => {
    scrollY = window.scrollY;
  },
  { passive: true },
);

document.addEventListener("mousemove", (e) => {
  /* Posizione X del mouse normalizzata tra -7 e +7
     0 al centro dello schermo, segno per direzione.
     Il *14 è "l'intensità" del movimento — provato a sentimento. */
  const x = (e.clientX / window.innerWidth - 0.5) * 14;

  /* Y meno intenso (*8) perché c'è già il parallax di scroll */
  const y = (e.clientY / window.innerHeight - 0.5) * 8;

  /* ANDRES: mouse leggero (×0.5) + parallax scroll lento (×0.04).
     Il segno meno davanti a scrollY: il nome SALE mentre scrolli. */
  heroFirst.style.transform = `translate(
    ${x * 0.5}px,
    ${y * 0.5 - scrollY * 0.04}px
  )`;

  /* PELIZZER: mouse accentuato (×1.1) + parallax veloce (×0.09) */
  heroLast.style.transform = `translate(
    ${x * 1.1}px,
    ${y * 1.1 - scrollY * 0.09}px
  )`;
});

/* ════════════════════════════════════════════════════════════════
   5. HAMBURGER MENU — overlay fullscreen
   L'overlay ha z-index: 200 e copre completamente la nav (z-index: 100).
   Il pulsante × nell'overlay chiude il menu.
═══════════════════════════════════════════════════════════════════ */

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const mmLogoLink = document.getElementById("mmLogoLink");

function openMenu() {
  hamburger.classList.add("open");
  mobileMenu.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  hamburger.classList.remove("open");
  mobileMenu.classList.remove("open");
  document.body.style.overflow = "";
}

/* hamburger: toggle apri/chiudi */
hamburger.addEventListener("click", () => {
  mobileMenu.classList.contains("open") ? closeMenu() : openMenu();
});

/* funzione globale chiamata dall'onclick inline del nuovo pulsante × */
function closeMobileMenu() {
  closeMenu();
}

/* click sul logo nell'overlay → torna all'hero e chiude */
mmLogoLink.addEventListener("click", closeMenu);

/* Escape → chiude il menu se aperto */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && mobileMenu.classList.contains("open")) closeMenu();
});

/* click su un link di navigazione → naviga e chiude l'overlay */
document.querySelectorAll(".mm-link").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

/* ════════════════════════════════════════════════════════════════
   6. REVEAL ON SCROLL — IntersectionObserver

   IntersectionObserver è un'API moderna del browser:
   "osserva" elementi e ti notifica quando entrano/escono dal viewport.

   Più efficiente del vecchio addEventListener("scroll") perché
   il browser lo gestisce internamente — niente calcoli a ogni pixel.
═══════════════════════════════════════════════════════════════════ */

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      /* isIntersecting = true → l'elemento è dentro il viewport */
      if (entry.isIntersecting) {
        /* Aggiunge .revealed → CSS fa l'animazione fade-up */
        entry.target.classList.add("revealed");

        /* unobserve: smetti di osservarlo. Una volta apparso, non
           ci serve più sapere se entra/esce. Risparmia risorse. */
        observer.unobserve(entry.target);
      }
    });
  },
  {
    /* threshold: percentuale di visibilità per scattare.
       0.15 = parte quando il 15% è visibile. */
    threshold: 0.15,
    /* rootMargin: spinge virtualmente i bordi del viewport.
       -50px in basso = scatta quando l'elemento è 50px DENTRO lo schermo. */
    rootMargin: "0px 0px -50px 0px",
  },
);

revealElements.forEach((el) => observer.observe(el));

/* ════════════════════════════════════════════════════════════════
   7. PROJECTS — sticky frame switching

   Quando un .project entra nel viewport, leggiamo i suoi
   data-attributes (data-image, data-url) e aggiorniamo
   l'immagine + URL del browser sticky.

   Risultato: scrollando il contenuto a destra, l'immagine
   nel browser di sinistra cambia in modo sincronizzato.
═══════════════════════════════════════════════════════════════════ */

const projectImage = document.getElementById("projectImage");
const browserUrl = document.getElementById("browserUrl");
const projects = document.querySelectorAll(".project");

/* Verifichiamo che gli elementi esistano — su mobile il browser
   sticky è nascosto via CSS, ma gli elementi sono ancora nel DOM.
   Se per qualche motivo mancano, il listener viene saltato. */
if (projectImage && browserUrl && projects.length > 0) {
  const projectObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          /* dataset = oggetto JS contenente tutti i data-* dell'elemento.
             data-image (HTML) → dataset.image (JS). */
          const newImage = entry.target.dataset.image;
          const newUrl = entry.target.dataset.url;

          /* Se l'immagine è già quella mostrata, salta — evita
             transizioni inutili. */
          if (projectImage.src === newImage) return;

          /* TRANSIZIONE FADE in 3 fasi:
             1. abbassa opacity → fade-out 0.4s (CSS transition)
             2. dopo 200ms cambia src e URL
             3. opacity = 1 → fade-in automatico */
          projectImage.style.opacity = "0";
          setTimeout(() => {
            projectImage.src = newImage;
            browserUrl.textContent = newUrl;
            projectImage.style.opacity = "1";
          }, 200);
        }
      });
    },
    {
      /* threshold più alto del reveal (0.5 invece di 0.15):
         vogliamo essere sicuri che l'utente stia GUARDANDO il progetto. */
      threshold: 0.5,
      /* rootMargin: zona attiva = solo il 60% centrale dello schermo.
         Cambio scatta quando il progetto è AL CENTRO. */
      rootMargin: "-20% 0px -20% 0px",
    },
  );

  projects.forEach((project) => projectObserver.observe(project));
}

/* ════════════════════════════════════════════════════════════════
   8. STAT CARDS TOGGLE — sezione About

   Le 3 card (Timeline / Focus / Internship) si espandono al click
   mostrando un dettaglio aggiuntivo. Il + ruota e diventa ×.
   Tutto via classe .open: il CSS fa l'animazione, il JS fa il toggle.
═══════════════════════════════════════════════════════════════════ */

const statCards = document.querySelectorAll(".stat-card");

statCards.forEach((card) => {
  card.addEventListener("click", () => {
    /* classList.toggle: se la classe c'è la rimuove, se non c'è la aggiunge.
       È esattamente il comportamento "apri se chiusa, chiudi se aperta". */
    card.classList.toggle("open");
  });
});

/* ══════════════════════════════════════════════════════════════════
   FINE DEL FILE

   Concetti JavaScript usati:
   - const / let
   - Arrow functions   → () => {}
   - getElementById, querySelector, querySelectorAll
   - addEventListener
   - classList.add/remove/contains/toggle
   - element.style.X
   - element.textContent
   - element.dataset
   - setInterval / setTimeout
   - Math.floor, padStart, modulo (%)
   - Template literals → `${}`
   - Operatore ternario
   - forEach
   - IntersectionObserver
   - { passive: true }
══════════════════════════════════════════════════════════════════ */
