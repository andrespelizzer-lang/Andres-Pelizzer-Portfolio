/* ══════════════════════════════════════════════════════════════════
   SCRIPT.JS — Tutto il JavaScript del portfolio

   Questo file contiene 7 blocchi indipendenti, uno per ogni
   "comportamento dinamico" del sito. Ogni blocco è autonomo —
   se ne togli uno, gli altri continuano a funzionare.

   I 7 blocchi:
   1. Uptime counter   → conta da quanto tempo è aperta la pagina
   2. Stack cycle      → cicla tecnologie nel pannello live system
   3. Nav hide on scroll → nasconde la nav quando scrolli giù
   4. Parallax + mouse → fa muovere il nome ANDRES PELIZZER
   5. Hamburger menu   → apertura/chiusura menu mobile
   6. Reveal on scroll → fa apparire elementi mentre scrolli
   7. Project switching → cambia immagine browser nei projects

   Lo script è caricato in fondo al <body>, NON nell'<head>.
   Questo è importante: se fosse nell'<head> verrebbe eseguito
   PRIMA che gli elementi HTML esistano, e tutti i getElementById
   restituirebbero null. In fondo al body invece la pagina è già
   stata costruita, e tutti gli elementi sono accessibili.
══════════════════════════════════════════════════════════════════ */

/* ════════════════════════════════════════════════════════════════
   1. UPTIME COUNTER

   Cosa fa visivamente:
   Nel pannello "live system" dell'hero c'è una voce "Uptime"
   con un contatore tipo 00:01:23 che si aggiorna ogni secondo.
   Mostra da quanto tempo l'utente ha aperto la pagina.

   Perché serve:
   È un dettaglio "techy" che dà credibilità al pannello live system.
   Non è informazione utile — è atmosfera. Fa percepire il sito
   come "sistema in funzione" invece che pagina statica.
═══════════════════════════════════════════════════════════════════ */

/* Date.now() è una funzione del JavaScript che restituisce
   il momento ATTUALE espresso in millisecondi dal 1° gennaio 1970.
   (Sì, i computer contano il tempo da quella data — è una convenzione.)

   Esempio: in questo momento Date.now() restituisce qualcosa come
   1730912345678 (un numero gigantesco di millisecondi).

   "const" significa: questa variabile non cambierà mai.
   Se provassimo a riassegnare startTime, JavaScript darebbe errore.
   Usiamo const per tutto quello che è "fisso", let per quello che cambia. */
const startTime = Date.now();

/* document.getElementById("uptime") cerca nell'HTML un elemento
   che abbia id="uptime" e ce lo restituisce.
   Nell'HTML c'è: <span class="sys-value" id="uptime">00:00:00</span>

   Lo salviamo in una variabile per non doverlo cercare di nuovo
   ogni secondo (sarebbe inutilmente costoso). */
const uptimeEl = document.getElementById("uptime");

/* setInterval è una funzione del browser che esegue codice
   IN MODO RIPETUTO a intervalli regolari.
   Sintassi: setInterval(funzione, millisecondi)

   Qui significa: "esegui questa funzione ogni 1000ms (= 1 secondo)".
   Continuerà all'infinito, finché la pagina è aperta.

   La funzione passata è una "arrow function": () => { ... }
   È la sintassi moderna per scrivere funzioni in JavaScript. */
setInterval(() => {
  /* Calcoliamo i secondi totali trascorsi dall'apertura della pagina.

     Date.now() - startTime → differenza in millisecondi
     (es: 5000ms se sono passati 5 secondi).

     Diviso 1000 → converte in secondi (5000ms / 1000 = 5s).

     Math.floor() → arrotonda PER DIFETTO al numero intero
     (es: 5.7 diventa 5). Senza, avremmo numeri con virgola
     tipo 5.234 secondi, che non vogliamo. */
  const s = Math.floor((Date.now() - startTime) / 1000);

  /* Adesso convertiamo i secondi totali in formato HH:MM:SS.
     Esempio: 3725 secondi → 1 ora, 2 minuti, 5 secondi → "01:02:05"

     ─ ORE ─
     s / 3600 → un'ora ha 3600 secondi, quindi dividiamo per ottenere
     il numero di ore complete. Math.floor arrotonda per difetto.

     String(...) → converte il numero in stringa di testo.
     Serve perché padStart funziona solo su stringhe.

     padStart(2, "0") → se la stringa è più corta di 2 caratteri,
     la riempie a sinistra con "0".
     Esempio: "5" diventa "05", "12" rimane "12".
     Risultato: il formato è sempre a 2 cifre, anche se l'ora è 0. */
  const h = String(Math.floor(s / 3600)).padStart(2, "0");

  /* ─ MINUTI ─
     s % 3600 → l'operatore % è il "modulo": resto della divisione.
     Esempio: 3725 % 3600 = 125 (i secondi rimasti dopo le ore complete).
     Diviso 60 → ottieni i minuti completi nei secondi rimasti.
     Math.floor + padStart come prima. */
  const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");

  /* ─ SECONDI ─
     s % 60 → resto della divisione per 60.
     Esempio: 3725 % 60 = 5 (i secondi rimasti dopo i minuti completi). */
  const sec = String(s % 60).padStart(2, "0");

  /* element.textContent = "..."  → cambia il testo VISIBILE dell'elemento.

     I backtick ` ` (template literals) permettono di inserire variabili
     dentro una stringa con la sintassi ${variabile}.
     È più leggibile di concatenare con + : "h" + ":" + "m" + ":" + "sec".

     Risultato: il <span id="uptime"> mostra qualcosa tipo "00:01:23". */
  uptimeEl.textContent = `${h}:${m}:${sec}`;
}, 1000); /* il "1000" alla fine è il secondo argomento di setInterval:
             ogni quanto deve ripetere la funzione. 1000ms = 1 secondo. */

/* ════════════════════════════════════════════════════════════════
   2. STACK CYCLE

   Cosa fa visivamente:
   Nel pannello "live system" c'è una voce "Stack" che mostra
   il nome di una tecnologia (HTML, CSS, JavaScript...). Ogni 1.8
   secondi questa cambia con una piccola animazione di transizione.

   Perché serve:
   Comunica in modo creativo "ecco le tecnologie che uso", senza
   doverle elencare. Aggiunge dinamismo al pannello, contribuisce
   alla sensazione "sistema in funzione".

   Tecnica usata:
   Un array (lista) di stringhe + un indice che si incrementa
   ogni 1.8s + un'animazione di fade per il cambio.
═══════════════════════════════════════════════════════════════════ */

/* Un array è una lista ordinata di valori.
   In JavaScript si scrive con le quadre [ ].
   Ogni elemento è separato da virgola.
   Per accedere a un elemento usiamo l'indice (parte da 0):
   stacks[0] → "HTML"
   stacks[1] → "CSS"
   stacks[6] → "Python" */
const stacks = [
  "HTML",
  "CSS",
  "JavaScript",
  "Node.js",
  "Express",
  "MySQL",
  "Python",
];

/* Riferimento all'elemento HTML che mostrerà il testo. */
const stackEl = document.getElementById("stackCycle");

/* "let" significa: questa variabile cambierà valore nel tempo.
   "si" è un nome breve per "stack index" — è l'indice corrente
   dell'array. Parte da 0 (= "HTML"). Lo incrementeremo ogni ciclo. */
let si = 0;

/* setInterval ogni 1800ms (1.8 secondi) */
setInterval(() => {
  /* ── FASE 1: nasconde l'elemento attuale ──

     element.style.proprietà = "valore"
     Questa sintassi cambia uno stile inline dell'elemento, esattamente
     come scrivere style="opacity: 0" nell'HTML.

     opacity: "0" → diventa completamente trasparente
     transform: translateY(6px) → si sposta giù di 6 pixel

     Usiamo entrambi insieme per dare un effetto "scende e dissolve". */
  stackEl.style.opacity = "0";
  stackEl.style.transform = "translateY(6px)";

  /* La transition dice: anima questi cambi in 0.2s, NON istantaneamente.
     Senza transition i cambi sarebbero a scatto. */
  stackEl.style.transition = "opacity 0.2s, transform 0.2s";

  /* ── FASE 2 e 3: cambia testo e mostra ──

     setTimeout esegue codice UNA SOLA volta dopo X millisecondi.
     Diverso da setInterval che lo ripete.

     Aspettiamo 220ms (un pelo più di 200ms = durata della transition).
     Quando arriviamo qui, l'elemento è ormai trasparente. */
  setTimeout(() => {
    /* Incrementiamo l'indice. L'operatore % (modulo) qui è fondamentale:
       (si + 1) % stacks.length

       Perché? stacks ha 7 elementi (indici 0-6). Se "si" arriva a 6
       e gli aggiungiamo 1, diventa 7 — ma stacks[7] non esiste, sarebbe
       undefined. Il modulo % 7 fa rientrare il valore: 7 % 7 = 0.

       Quindi quando arriviamo all'ultimo elemento, ricominciamo da 0.
       Questo è il pattern classico per "ciclare un array all'infinito". */
    si = (si + 1) % stacks.length;

    /* Aggiorniamo il testo dell'elemento col nuovo nome di tecnologia. */
    stackEl.textContent = stacks[si];

    /* Riportiamo l'elemento allo stato visibile.
       Grazie alla transition impostata prima, anche questi cambi
       sono animati per 0.2s — quindi l'elemento "torna su e appare". */
    stackEl.style.opacity = "1";
    stackEl.style.transform = "translateY(0)";
  }, 220);
}, 1800); /* il ciclo si ripete ogni 1.8 secondi all'infinito */

/* ════════════════════════════════════════════════════════════════
   3. NAV HIDE ON SCROLL

   Cosa fa visivamente:
   Quando scrolli verso il BASSO la pagina, la nav scompare
   scivolando verso l'alto. Quando scrolli verso l'ALTO, riappare.

   Perché serve:
   Migliora la lettura: mentre stai leggendo i contenuti, la nav
   non sta lì a coprire spazio. Quando vuoi tornare a navigare,
   basta scrollare un pelo verso l'alto e ricompare.
   È il pattern di Apple, Stripe, GitHub.

   Tecnica usata:
   Confrontiamo la posizione attuale dello scroll con quella
   precedente. Se è maggiore → andiamo giù. Se è minore → andiamo su.
═══════════════════════════════════════════════════════════════════ */

/* document.querySelector(...) è il fratello di getElementById,
   ma più potente: accetta QUALSIASI selettore CSS.
   "nav" → cerca il primo elemento <nav> (senza punto = tag, non classe).
   Restituisce il primo elemento trovato, o null se non c'è. */
const nav = document.querySelector("nav");

/* Variabile che ricorda l'ultima posizione di scroll.
   Parte da 0 perché all'inizio siamo in cima alla pagina. */
let lastY = 0;

/* window.addEventListener("scroll", ...)
   "Ascolta" l'evento "scroll" sulla window (la finestra del browser).
   Ogni volta che l'utente scrolla, esegue la funzione. */
window.addEventListener(
  "scroll",
  () => {
    /* window.scrollY = quanti pixel siamo già scrollati dall'inizio.
       0 = siamo in cima, 1500 = siamo a 1500px dall'alto della pagina. */
    const y = window.scrollY;

    /* Logica di confronto:

       y > lastY → la posizione attuale è MAGGIORE dell'ultima
                   salvata = stiamo andando GIÙ.
       y > 80    → siamo abbastanza lontani dall'inizio
                   (almeno 80px). Sennò la nav si nasconderebbe
                   anche solo per microscroll iniziali, fastidioso.

       Se entrambe le condizioni sono vere → nascondiamo la nav. */
    if (y > lastY && y > 80) {
      /* classList.add aggiunge la classe "hidden" al <nav>.
         Il CSS è programmato per applicare translateY(-100%)
         a nav.hidden → la nav scivola fuori in alto. */
      nav.classList.add("hidden");
    } else {
      /* Altrimenti (stiamo andando su o siamo in cima) → mostriamo.
         classList.remove toglie la classe se c'è, non fa niente se non c'è. */
      nav.classList.remove("hidden");
    }

    /* Aggiorniamo lastY per il prossimo confronto.
       Senza questa riga, useremmo sempre 0 e il confronto
       darebbe sempre "stiamo andando giù" — bug. */
    lastY = y;
  },

  /* { passive: true } è un'opzione importante per le performance.

     Cosa significa:
     Diciamo al browser "questo listener NON impedirà mai lo scroll
     (cioè non chiamerà event.preventDefault())".

     Perché serve:
     Senza passive, il browser deve aspettare che il nostro JS finisca
     PRIMA di aggiornare la pagina. Questo crea micro-lag durante lo scroll.
     Con passive, il browser ottimizza: scrolla subito e chiama il nostro
     listener "in parallelo". Lo scroll è fluido.

     Da usare SEMPRE sui listener di scroll/touchmove a meno che
     non vuoi davvero bloccare lo scroll dell'utente. */
  { passive: true },
);

/* ════════════════════════════════════════════════════════════════
   4. PARALLAX + MOUSE MOVEMENT SUL NOME

   Cosa fa visivamente:
   Due effetti combinati sul nome ANDRES PELIZZER del hero:

   - MOUSE: muovendo il cursore sullo schermo, il nome si sposta
     leggermente nella direzione opposta. Tipo "magnete invertito".
     ANDRES si muove poco, PELIZZER si muove di più.

   - SCROLL: scrollando giù, il nome sale verso l'alto a una velocità
     diversa dal normale scroll della pagina. ANDRES sale lento,
     PELIZZER sale più veloce.

   Perché serve:
   La differenza di velocità tra ANDRES e PELIZZER crea sensazione
   di profondità — sembra che siano su due "strati" diversi.
   È l'effetto parallax classico.

   Tecnica usata:
   Listener mousemove che legge la posizione del mouse,
   listener scroll che salva la posizione attuale,
   combiniamo i due in un singolo transform: translate().
═══════════════════════════════════════════════════════════════════ */

/* Riferimenti agli elementi che dobbiamo muovere */
const heroFirst = document.querySelector(".hero-first");
const heroLast = document.querySelector(".hero-last");

/* Variabile che tiene traccia di quanto siamo scrollati.
   Aggiornata dal listener scroll più sotto, letta dal listener
   mousemove. Le due informazioni vengono combinate insieme. */
let scrollY = 0;

/* Listener scroll: aggiorna scrollY ogni volta che scrolli. */
window.addEventListener(
  "scroll",
  () => {
    scrollY = window.scrollY;
  },
  { passive: true } /* sempre passive sui listener scroll */,
);

/* document.addEventListener("mousemove", ...)
   "Ascolta" il movimento del mouse sull'INTERA pagina.
   La funzione riceve un oggetto "e" (event) che contiene info
   sull'evento, in particolare la posizione del cursore. */
document.addEventListener("mousemove", (e) => {
  /* Calcolo della posizione X del mouse, normalizzata.

     e.clientX = posizione X del mouse rispetto al viewport, in pixel.
                 0 = mouse al bordo sinistro, larghezza_schermo = bordo destro.

     window.innerWidth = larghezza dello schermo in pixel.

     e.clientX / window.innerWidth → valore tra 0 e 1
       0   = mouse a sinistra
       0.5 = mouse al centro
       1   = mouse a destra

     ... - 0.5 → spostiamo lo zero al centro
       -0.5 = mouse a sinistra
       0    = mouse al centro
       +0.5 = mouse a destra

     ... * 14 → moltiplichiamo per 14 per ottenere un range più grande
       da -7 a +7. Questo è "l'intensità" del movimento.
       Più alto il numero, più il nome si muove con il mouse.
       Numero scelto a sentimento dopo aver provato. */
  const x = (e.clientX / window.innerWidth - 0.5) * 14;

  /* Stessa cosa per Y, ma moltiplichiamo solo per 8 invece di 14.
     L'asse Y dovrebbe muoversi meno di X perché abbiamo già
     il parallax di scroll che aggiunge movimento verticale. */
  const y = (e.clientY / window.innerHeight - 0.5) * 8;

  /* Applichiamo il transform a heroFirst (ANDRES).

     I template literals (backtick + ${}) ci permettono di costruire
     una stringa con valori dinamici dentro.

     Risultato finale: una stringa tipo "translate(2.5px, -45.2px)"

     - x * 0.5 → moltiplichiamo x per 0.5 → ANDRES si muove la METÀ
       rispetto a quanto si muove il mouse (movimento "leggero").
     - y * 0.5 - scrollY * 0.04 → componente Y, combinata.
       Il segno meno davanti a scrollY è importante: vogliamo che
       il nome SALGA mentre scrollY aumenta.
       Il moltiplicatore 0.04 è la "velocità di parallax": piccola.

     Quindi ANDRES si muove poco col mouse e sale lentamente con lo scroll. */
  heroFirst.style.transform = `translate(
    ${x * 0.5}px,
    ${y * 0.5 - scrollY * 0.04}px
  )`;

  /* Stessa logica per heroLast (PELIZZER), ma con moltiplicatori
     più alti. Si muove DI PIÙ col mouse (1.1) e sale PIÙ VELOCE
     con lo scroll (0.09).

     La differenza tra 0.04 e 0.09 è quello che crea la profondità:
     PELIZZER si muove più veloce → sembra "più vicino allo spettatore".
     ANDRES si muove più lento → sembra "più lontano".

     È esattamente come quando viaggi in macchina: i pali della luce
     vicini ti sfrecciano davanti, le montagne lontane si muovono lente. */
  heroLast.style.transform = `translate(
    ${x * 1.1}px,
    ${y * 1.1 - scrollY * 0.09}px
  )`;
});

/* ════════════════════════════════════════════════════════════════
   5. HAMBURGER MENU

   Cosa fa visivamente:
   Su mobile, l'hamburger (le tre lineette in alto a destra) apre
   un pannello che scivola da destra contenente i link del menu.
   Cliccando l'hamburger di nuovo, o cliccando fuori dal menu,
   o cliccando un link, si chiude.

   Tecnica usata:
   Due funzioni openMenu/closeMenu che aggiungono/tolgono classi
   CSS su tre elementi insieme. Tutto il movimento visivo è gestito
   dal CSS — il JS solo decide QUANDO le classi sono presenti.
═══════════════════════════════════════════════════════════════════ */

/* Riferimenti ai tre elementi coinvolti */
const hamburger = document.getElementById("hamburger"); /* il bottone */
const mobileMenu = document.getElementById("mobileMenu"); /* il pannello */
const backdrop =
  document.getElementById("mobileBackdrop"); /* lo sfondo scuro */

/* Funzione che apre il menu.
   "function nome(parametri) { ... }" è la sintassi classica per definire
   una funzione riutilizzabile. */
function openMenu() {
  /* Aggiunge la classe "open" su hamburger → CSS trasforma le lineette in X */
  hamburger.classList.add("open");

  /* Aggiunge la classe "open" sul pannello → CSS lo fa scivolare dentro */
  mobileMenu.classList.add("open");

  /* Aggiunge la classe "show" sul backdrop → CSS lo fa apparire scuro */
  backdrop.classList.add("show");

  /* document.body è l'elemento <body> della pagina.
     style.overflow = "hidden" → blocca lo scroll della pagina sotto.

     Perché serve: senza questo, l'utente potrebbe scrollare la pagina
     mentre il menu è aperto. Con questo, il menu è "modale" — devi
     prima chiuderlo per interagire col resto. UX standard. */
  document.body.style.overflow = "hidden";
}

/* Funzione che chiude il menu — fa l'opposto di openMenu. */
function closeMenu() {
  /* Toglie le tre classi → CSS riporta tutto allo stato chiuso */
  hamburger.classList.remove("open");
  mobileMenu.classList.remove("open");
  backdrop.classList.remove("show");

  /* "" (stringa vuota) ripristina il valore default di overflow,
     ovvero quello del CSS originale. Così la pagina scrolla di nuovo. */
  document.body.style.overflow = "";
}

/* Listener click sull'hamburger.
   classList.contains("open") restituisce true se ha la classe, false sennò.

   La sintassi "condizione ? azioneSeVero : azioneSeFalso" è
   l'operatore TERNARIO — un'abbreviazione di if/else in una riga.

   Equivalente a:
     if (mobileMenu.classList.contains("open")) {
       closeMenu();
     } else {
       openMenu();
     }

   Risultato: ogni click sull'hamburger fa il "toggle" — se è aperto
   chiude, se è chiuso apre. */
hamburger.addEventListener("click", () => {
  mobileMenu.classList.contains("open") ? closeMenu() : openMenu();
});

/* Listener click sul backdrop scuro → chiude il menu.
   Comportamento standard: cliccare fuori da un modale lo chiude. */
backdrop.addEventListener("click", closeMenu);

/* Listener click sui link del menu → chiudono il menu dopo aver navigato.
   document.querySelectorAll(".mobile-link") trova TUTTI gli elementi
   con classe "mobile-link", restituendo una lista (NodeList).

   .forEach(link => { ... }) → esegue la funzione per OGNI elemento.
   Il parametro "link" è il singolo link in ogni iterazione.

   Senza questo, cliccando un link la pagina scrolla alla sezione
   ma il menu rimane aperto sopra, brutto. */
document.querySelectorAll(".mobile-link").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

/* ════════════════════════════════════════════════════════════════
   6. REVEAL ON SCROLL — IntersectionObserver

   Cosa fa visivamente:
   Mentre scrolli, gli elementi delle sezioni "appaiono" con una
   piccola animazione di fade-up quando entrano nel viewport.
   Senza questa animazione, gli elementi sarebbero già visibili
   tutti insieme — più piatto.

   Tecnica usata:
   IntersectionObserver è un'API moderna del browser. È il modo
   "giusto" e moderno per fare animazioni scroll-based.

   Vecchio approccio (anni 2010):
   - addEventListener("scroll", ...) che si chiama centinaia di volte
   - dentro, calcolavi getBoundingClientRect() per ogni elemento
   - se l'elemento era nel viewport, attivavi l'animazione
   - performance disastrose con tanti elementi

   Approccio moderno (IntersectionObserver):
   - dichiari "voglio sapere quando questi elementi entrano in vista"
   - il browser lo gestisce internamente in modo ottimizzato
   - ti chiama SOLO quando lo stato cambia, non a ogni pixel di scroll
═══════════════════════════════════════════════════════════════════ */

/* querySelectorAll trova tutti gli elementi con classe "reveal".
   Restituisce una NodeList (simile a un array). */
const revealElements = document.querySelectorAll(".reveal");

/* Creiamo un IntersectionObserver passandogli due cose:
   1. Una funzione "callback" che viene chiamata quando lo stato cambia
   2. Un oggetto di "opzioni" che configura il comportamento */
const observer = new IntersectionObserver(
  /* CALLBACK — la funzione che il browser chiama. */
  (entries) => {
    /* "entries" è una lista di "voci" — una per ogni elemento il cui
       stato è cambiato. Ogni entry contiene info sull'elemento.

       Iteriamo su ogni entry con forEach. */
    entries.forEach((entry) => {
      /* entry.isIntersecting → true se l'elemento è entrato nel viewport,
                                false se è uscito.

         Vogliamo agire solo quando entra. */
      if (entry.isIntersecting) {
        /* entry.target → l'elemento HTML vero a cui si riferisce questa entry.

           Aggiungiamo la classe "revealed" → il CSS si occupa di tutto:
           c'è una regola CSS che dice "se ho .revealed, fai fade-up". */
        entry.target.classList.add("revealed");

        /* observer.unobserve(elemento) → smetti di osservare quell'elemento.

           Perché: una volta apparso, non ci serve più sapere se entra/esce
           dal viewport. È un pattern di ottimizzazione: liberiamo risorse. */
        observer.unobserve(entry.target);
      }
    });
  },

  /* OPZIONI dell'observer */
  {
    /* threshold → percentuale di visibilità necessaria per scattare.
       0.15 = il 15% dell'elemento deve essere visibile.
       0    = basta un pixel visibile.
       1    = deve essere completamente visibile.

       Scelto 0.15 perché vogliamo che l'animazione parta poco
       dopo che l'elemento entra in vista, non appena tocca il bordo. */
    threshold: 0.15,

    /* rootMargin → "spinge" virtualmente i bordi del viewport.
       La sintassi è come margin: "top right bottom left".

       "0px 0px -50px 0px" significa: il bordo INFERIORE del viewport
       virtuale è 50px PIÙ ALTO di quello reale.

       Effetto pratico: l'elemento è considerato "in vista" solo quando
       è 50px DENTRO lo schermo dal basso, non appena tocca il bordo
       inferiore. L'animazione scatta un po' più tardi → sembra più
       intenzionale. */
    rootMargin: "0px 0px -50px 0px",
  },
);

/* Diciamo all'observer "osserva ogni elemento .reveal".
   Senza questa riga, l'observer è creato ma non controlla nulla. */
revealElements.forEach((el) => observer.observe(el));

/* ════════════════════════════════════════════════════════════════
   7. PROJECTS — sticky frame switching

   Cosa fa visivamente:
   Nella sezione projects, il finto browser di sinistra è "sticky"
   (rimane fisso mentre scrolli). A destra ci sono le schede progetto.
   Quando scrolli e arrivi al SECONDO progetto, l'immagine nel browser
   di sinistra cambia (con un fade smooth) all'immagine del secondo
   progetto, e l'URL si aggiorna.

   Tecnica usata:
   Stesso strumento del blocco 6 (IntersectionObserver), ma usato
   diversamente. Qui non aggiungiamo solo una classe — leggiamo dei
   "data attributes" dall'HTML e li applichiamo al browser frame.

   Cosa sono i data-* attributes:
   Nel HTML hai scritto cose tipo:
     <article data-image="..." data-url="...">
   Sono attributi custom che NON hanno significato HTML, ma servono
   come "contenitori di informazione" che il JS può leggere.
   Si leggono in JS con element.dataset.nomeAttributo.
═══════════════════════════════════════════════════════════════════ */

/* Riferimenti agli elementi del browser frame (la parte sticky).
   Cambieremo l'immagine e l'URL di questi due. */
const projectImage = document.getElementById("projectImage"); /* l'<img> */
const browserUrl = document.getElementById("browserUrl"); /* il div URL */

/* Tutti i progetti nella colonna destra. */
const projects = document.querySelectorAll(".project");

/* IntersectionObserver dedicato ai progetti.
   IMPORTANTE — è un observer DIVERSO da quello del blocco 6:

   - Quello del blocco 6 osserva i .reveal e usa unobserve dopo.
     Comportamento "una volta sola".

   - Questo qui NON usa unobserve. Vogliamo che continui a osservare
     i progetti per sempre, perché l'utente potrebbe scrollare avanti
     e indietro tra i progetti. */
const projectObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      /* Se il progetto è in vista... */
      if (entry.isIntersecting) {
        /* Leggiamo i data-attributes dell'elemento.

           Nell'HTML:
             <article data-image="https://..." data-url="https://...">

           In JS si leggono così:
             element.dataset.image   → "https://..."
             element.dataset.url     → "https://..."

           Notare la conversione: data-image (HTML) → dataset.image (JS).
           Se fosse data-my-cool-thing, in JS sarebbe dataset.myCoolThing
           (camelCase). È una convenzione del browser. */
        const newImage = entry.target.dataset.image;
        const newUrl = entry.target.dataset.url;

        /* Ottimizzazione: se l'immagine attuale è già quella richiesta,
           non facciamo niente. Senza questo controllo, l'immagine
           rifarebbe il fade ogni volta che il progetto entra in vista,
           anche se è già la sua. Inutile e visivamente fastidioso.

           "return" esce dalla funzione corrente — saltiamo il resto. */
        if (projectImage.src === newImage) return;

        /* TRANSIZIONE FADE in 3 fasi:

           FASE 1 — abbassiamo l'opacità dell'immagine attuale.
           Grazie alla CSS transition definita su <img>, il cambio
           non è istantaneo: l'immagine fa un fade-out di 0.4s.
           (Vedi nel CSS: .browser-viewport img { transition: opacity 0.4s }) */
        projectImage.style.opacity = "0";

        /* FASE 2 e 3 — dopo 200ms (a metà del fade-out)... */
        setTimeout(() => {
          /* Cambiamo il src dell'<img> con la nuova URL → l'immagine cambia */
          projectImage.src = newImage;

          /* Cambiamo il testo dell'URL nella barra browser */
          browserUrl.textContent = newUrl;

          /* Riportiamo l'opacità a 1 → l'immagine fa fade-in */
          projectImage.style.opacity = "1";
        }, 200);
      }
    });
  },

  /* OPZIONI — diverse da quelle del blocco 6 */
  {
    /* threshold più alto del reveal (0.5 invece di 0.15).
       Vogliamo che il cambio scatti solo quando l'utente sta DAVVERO
       guardando quel progetto, non appena entra di sguincio.
       0.5 = il 50% del progetto deve essere visibile. */
    threshold: 0.5,

    /* rootMargin "stringe" il viewport virtuale del 20% top E 20% bottom.
       Effetto: la "zona attiva" è solo il 60% centrale dello schermo.
       Così il cambio scatta quando il progetto è AL CENTRO,
       non quando è in alto o in basso allo schermo. */
    rootMargin: "-20% 0px -20% 0px",
  },
);

/* Osserviamo tutti i progetti */
projects.forEach((project) => projectObserver.observe(project));

/* ════════════════════════════════════════════════════════════════
   8. STAT CARDS — espansione interattiva al click

   Cosa fa visivamente:
   Le 3 card Timeline / Focus / Internship nella sezione About
   sono cliccabili. Cliccando una card, si espande mostrando
   dettagli extra; il + ruota a diventare ×; il bordo diventa accent.
   Cliccando di nuovo, si richiude. Cliccando un'altra card,
   la precedente si chiude e quella nuova si apre.

   Tecnica:
   Toggle della classe "open" con chiusura automatica delle altre.
═══════════════════════════════════════════════════════════════════ */
document.querySelectorAll(".stat-card").forEach((card) => {
  card.addEventListener("click", () => {
    const isOpen = card.classList.contains("open");

    /* chiude tutte le card aperte prima di aprire quella cliccata */
    document.querySelectorAll(".stat-card.open").forEach((c) => {
      c.classList.remove("open");
    });

    /* se era chiusa, la apre; se era già aperta, rimane chiusa (toggle) */
    if (!isOpen) {
      card.classList.add("open");
    }
  });
});

/* ══════════════════════════════════════════════════════════════════
   FINE DEL FILE

   Riepilogo dei concetti JavaScript usati in questo script:

   - const / let           → dichiarazione variabili
   - Arrow functions        → () => { ... }
   - getElementById        → trovare 1 elemento per id
   - querySelector         → trovare 1 elemento per selettore CSS
   - querySelectorAll      → trovare TUTTI gli elementi per selettore
   - addEventListener      → ascoltare eventi (click, scroll, mousemove)
   - classList.add/remove  → aggiungere/togliere classi CSS
   - element.style.X       → modificare stili inline
   - element.textContent   → cambiare testo visibile
   - element.dataset       → leggere data-* attributes
   - setInterval           → ripetere codice ogni X ms
   - setTimeout            → eseguire codice UNA volta dopo X ms
   - Math.floor            → arrotondare per difetto
   - String.padStart       → riempire stringa con caratteri
   - Template literals     → `stringa con ${variabile}`
   - Operatore %           → modulo (resto della divisione)
   - Operatore ternario    → condizione ? a : b
   - forEach               → iterare array/NodeList
   - IntersectionObserver  → API moderna scroll-based
   - { passive: true }     → ottimizzazione performance scroll

   Questi sono i mattoni del JavaScript moderno per il frontend.
══════════════════════════════════════════════════════════════════ */
