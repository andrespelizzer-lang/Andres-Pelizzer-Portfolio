/* ════════════════════════════════════════════
   1. UPTIME COUNTER
   Conta da quando la pagina è stata aperta.
   Mostra ore:minuti:secondi nel pannello live system.
══════════════════════════════════════════════ */

/* Date.now() = momento attuale in millisecondi.
   Lo salviamo all'apertura della pagina come riferimento. */
const startTime = Date.now();
const uptimeEl = document.getElementById("uptime");

setInterval(() => {
  /* differenza tra adesso e l'apertura, in secondi totali */
  const s = Math.floor((Date.now() - startTime) / 1000);

  /* da secondi totali ricaviamo h, m, s.
     padStart(2, "0"): se il numero è < 10 lo riempie con uno 0
     così "5" diventa "05" — formato leggibile 00:00:05 */
  const h = String(Math.floor(s / 3600)).padStart(2, "0");
  const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const sec = String(s % 60).padStart(2, "0");

  uptimeEl.textContent = `${h}:${m}:${sec}`;
}, 1000); /* ogni 1000ms = 1 secondo */

/* ════════════════════════════════════════════
   2. STACK CYCLE
   Cicla un array di tecnologie nel pannello live system.
   Ogni 1.8s: nasconde → cambia testo → mostra
══════════════════════════════════════════════ */

const stacks = [
  "HTML",
  "CSS",
  "JavaScript",
  "Node.js",
  "Express",
  "MySQL",
  "Python",
];
const stackEl = document.getElementById("stackCycle");
let si = 0; /* indice corrente nell'array */

setInterval(() => {
  /* fase 1: nasconde con piccola animazione */
  stackEl.style.opacity = "0";
  stackEl.style.transform = "translateY(6px)";
  stackEl.style.transition = "opacity 0.2s, transform 0.2s";

  /* dopo 220ms (quanto basta perché sparisca)... */
  setTimeout(() => {
    /* fase 2: aggiorna il testo.
       % stacks.length: dopo l'ultimo elemento ricomincia da 0
       invece di andare fuori range */
    si = (si + 1) % stacks.length;
    stackEl.textContent = stacks[si];

    /* fase 3: torna visibile */
    stackEl.style.opacity = "1";
    stackEl.style.transform = "translateY(0)";
  }, 220);
}, 1800);

/* ════════════════════════════════════════════
   3. NAV HIDE ON SCROLL
   Nasconde la nav scrollando giù, la mostra scrollando su.
══════════════════════════════════════════════ */

const nav = document.querySelector("nav");
let lastY = 0; /* ultima posizione di scroll */

window.addEventListener(
  "scroll",
  () => {
    const y = window.scrollY; /* posizione attuale */

    /* se la posizione attuale > ultima salvata → andiamo giù */
    if (y > lastY && y > 80) {
      nav.classList.add("hidden");
    } else {
      nav.classList.remove("hidden");
    }

    lastY = y; /* aggiorna per il prossimo confronto */
  },
  { passive: true },
); /* { passive: true }: dice al browser che non bloccheremo
                          mai lo scroll dentro questo listener — permette
                          ottimizzazioni di performance */

/* ════════════════════════════════════════════
   4. PARALLAX + MOUSE MOVEMENT SUL NOME
   Due effetti combinati:
   - mouse: il nome segue leggermente il cursore
   - scroll: il nome si sposta verso l'alto mentre scrolli

   heroFirst (ANDRES) si muove più lento.
   heroLast (PELIZZER) si muove più veloce.
   La differenza crea sensazione di profondità.
══════════════════════════════════════════════ */

const heroFirst = document.querySelector(".hero-first");
const heroLast = document.querySelector(".hero-last");

let scrollY = 0;

/* teniamo aggiornato scrollY (lo serve la funzione mousemove) */
window.addEventListener(
  "scroll",
  () => {
    scrollY = window.scrollY;
  },
  { passive: true },
);

document.addEventListener("mousemove", (e) => {
  /* posizione del mouse normalizzata tra -0.5 e +0.5
     (0 al centro dello schermo).
     Moltiplichiamo per dare l'intensità del movimento. */
  const x = (e.clientX / window.innerWidth - 0.5) * 14;
  const y = (e.clientY / window.innerHeight - 0.5) * 8;

  /* heroFirst: mouse leggero + parallax scroll lento */
  heroFirst.style.transform = `translate(
    ${x * 0.5}px,
    ${y * 0.5 - scrollY * 0.04}px
  )`;

  /* heroLast: mouse più accentuato + parallax più veloce */
  heroLast.style.transform = `translate(
    ${x * 1.1}px,
    ${y * 1.1 - scrollY * 0.09}px
  )`;
});

/* ════════════════════════════════════════════
   5. HAMBURGER MENU
   Apertura/chiusura del menu mobile.
══════════════════════════════════════════════ */

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const backdrop = document.getElementById("mobileBackdrop");

function openMenu() {
  hamburger.classList.add("open");
  mobileMenu.classList.add("open");
  backdrop.classList.add("show");
  document.body.style.overflow = "hidden"; /* blocca lo scroll dietro */
}

function closeMenu() {
  hamburger.classList.remove("open");
  mobileMenu.classList.remove("open");
  backdrop.classList.remove("show");
  document.body.style.overflow = ""; /* ripristina lo scroll */
}

/* click sull'hamburger: toggle */
hamburger.addEventListener("click", () => {
  mobileMenu.classList.contains("open") ? closeMenu() : openMenu();
});

/* click fuori dal menu (sul backdrop scuro) → chiude */
backdrop.addEventListener("click", closeMenu);

/* click su un link del menu → chiude */
document.querySelectorAll(".mobile-link").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

/* ════════════════════════════════════════════
   6. REVEAL ON SCROLL — IntersectionObserver

   IntersectionObserver è un'API del browser che
   "osserva" elementi e ti avvisa quando entrano
   o escono dal viewport.

   Più efficiente di window.addEventListener("scroll")
   perché il browser lo gestisce internamente —
   ti chiama solo quando lo stato cambia.
══════════════════════════════════════════════ */

/* prendiamo TUTTI gli elementi con la classe .reveal */
const revealElements = document.querySelectorAll(".reveal");

/* creiamo l'osservatore.
   La funzione passata viene chiamata ogni volta che lo stato
   di visibilità di uno degli elementi osservati cambia. */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      /* isIntersecting = true → l'elemento è dentro il viewport */
      if (entry.isIntersecting) {
        /* aggiungi la classe .revealed → il CSS fa l'animazione */
        entry.target.classList.add("revealed");

        /* smetti di osservarlo: una volta apparso non serve più
           continuare a controllarlo — risparmiamo risorse */
        observer.unobserve(entry.target);
      }
    });
  },
  {
    /* threshold: percentuale di visibilità necessaria per scattare.
       0.15 = quando il 15% dell'elemento è visibile, parte. */
    threshold: 0.15,

    /* rootMargin: "spinge" virtualmente i bordi del viewport.
       -50px in basso = scatta solo quando l'elemento è 50px
       DENTRO lo schermo, non appena tocca il bordo. */
    rootMargin: "0px 0px -50px 0px",
  },
);

/* diciamo all'observer di osservare ogni elemento .reveal */
revealElements.forEach((el) => observer.observe(el));

/* ════════════════════════════════════════════
   7. PROJECTS — sticky frame switching

   Quando un .project entra nel viewport, leggiamo
   i suoi data-attributes (data-image, data-url) e
   aggiorniamo il browser frame sticky con quei valori.

   Risultato: scrollando il contenuto a destra,
   l'immagine e l'URL del browser a sinistra cambiano
   in modo sincronizzato.
══════════════════════════════════════════════ */

/* riferimenti agli elementi del browser frame */
const projectImage = document.getElementById("projectImage");
const browserUrl = document.getElementById("browserUrl");

/* tutti i progetti nella colonna destra */
const projects = document.querySelectorAll(".project");

/* nuovo IntersectionObserver dedicato ai progetti.
   Diverso da quello del reveal — questo NON smette di osservare
   dopo il primo trigger, perché vogliamo che continui a reagire
   ogni volta che cambia il progetto in vista. */
const projectObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      /* scatta solo se il progetto è in vista E sufficientemente al centro */
      if (entry.isIntersecting) {
        /* leggiamo i data-attributes dall'elemento entrato in vista.
           dataset è un oggetto JS che contiene tutti i data-* dell'elemento. */
        const newImage = entry.target.dataset.image;
        const newUrl = entry.target.dataset.url;

        /* se la nuova immagine è già quella mostrata, non facciamo nulla.
           Evita transizioni inutili. */
        if (projectImage.src === newImage) return;

        /* TRANSIZIONE FADE:
           1. abbassiamo l'opacità dell'immagine attuale
           2. dopo 200ms (tempo della fade out) cambiamo src
           3. l'immagine rifa fade-in automaticamente via CSS transition */
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
    /* threshold: 0.5 → scatta quando il 50% del progetto è in vista.
       Più alto del reveal (0.15) perché qui vogliamo essere "sicuri"
       che l'utente stia davvero guardando quel progetto, non che ci
       sia appena entrato col bordo. */
    threshold: 0.5,

    /* rootMargin: stringe il viewport virtuale.
       -20% top e bottom → la "zona attiva" è solo il 60% centrale dello schermo.
       Così il cambio scatta quando il progetto è al centro, non in alto o in basso. */
    rootMargin: "-20% 0px -20% 0px",
  },
);

/* osserviamo tutti i progetti */
projects.forEach((project) => projectObserver.observe(project));
