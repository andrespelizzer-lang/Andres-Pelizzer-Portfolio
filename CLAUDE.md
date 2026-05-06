# Portfolio — Andres Pelizzer

## Contesto del progetto

Questo è il portfolio personale di Andres Pelizzer, studente del primo anno
del percorso ITS Web Stack Full Developer presso ITS Digital Academy Mario Volpato
(San Donà di Piave). Nato il 25/11/2006, abita a Monastier di Treviso (TV).

Stage in arrivo a **Stealth S.R.L.** di Villorba a **inizio giugno 2026**.

Il sito serve a presentarsi per lo stage e per opportunità future.
**Deadline interna: metà maggio 2026.**

## Stack tecnologico

- **Frontend puro**: HTML5, CSS3, JavaScript vanilla
- **Nessun framework**: niente React, Vue, Tailwind, Bootstrap, jQuery
- **Nessun build step**: niente Webpack, Vite, npm install
- **Font**: Syne (titoli) + DM Mono (body) da Google Fonts
- **Deploy**: GitHub + (in futuro) GitHub Pages o Vercel

## File del progetto

- `index.html` — struttura completa, single page
- `style.css` — tutti gli stili
- `script.js` — tutto il JS in 7 blocchi numerati
- `CLAUDE.md` — questo file
- `.git/` — repository
- `README.md` — descrizione pubblica

### Bio / Presentazione

> Studente del primo anno del percorso ITS Web Stack Full Developer presso ITS Digital
> Academy Mario Volpato. Appassionato di sviluppo full-stack: front-end con HTML, CSS e
> JavaScript (attenzione al design e UX), back-end con Node.js, Express e MySQL.
> Interesse per l'integrazione dell'AI nelle applicazioni web.
>
> Punti di forza: curiosità tecnica, cura del dettaglio nel design e nel codice,
> capacità di apprendimento autonomo.

### Progetti da mostrare nel portfolio

| Progetto                 | Periodo         | Descrizione                                                                                                             |
| ------------------------ | --------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Mini JSONPlaceholder** | apr 2026 – oggi | REST API completa in Node.js/Express. CRUD con Express Router, route annidate, test con Thunder Client.                 |
| **Portfolio personale**  | mar 2026 – oggi | Sito in vanilla HTML/CSS/JS. Dark minimal, accento lime, Syne + DM Mono, CSS keyframes, responsive, Git/GitHub.         |
| **Sito "Diventa"**       | feb–mar 2026    | Sito istituzionale multi-pagina da design Figma. Flexbox + Grid, media queries.                                         |
| **GameHub**              | dic 2025 – oggi | App desktop Java (Swing) per gestione tornei e-sports. Architettura a livelli (UI / logica / dati). Progetto di gruppo. |

### Skills tecniche (verificate dal corso)

**Front-end**

- HTML5 semantico
- CSS3: Flexbox, Grid, responsive design, media queries, animazioni keyframes
- JavaScript: DOM manipulation, eventi, async/await, fetch API
- Vue.js (base)

**Back-end**

- Node.js
- Express.js: routing, middleware, REST API design, autenticazione JWT

**Database**

- MySQL: schema, foreign key, relazioni, normalizzazione (1NF–3NF)
- SQLite

**Altri linguaggi / paradigmi**

- Python: OOP, Standard Library, gestione file
- Java: OOP, Swing, architettura a livelli

**Strumenti**

- Git / GitHub
- Docker / Docker Compose
- VS Code, Thunder Client
- Figma
- Power BI

**Lingue**

- Italiano (madrelingua)
- Inglese (B2)

### Interessi (da usare nella sezione About)

- Tennis (pratica regolare + analisi statistica)
- Intelligenza artificiale e funzionamento "dietro le quinte" di hardware e software

---

## Convenzioni

### Lingua

- **Commenti nel codice**: italiano
- **Contenuto del sito**: inglese
- **Comunicazione con Andres**: italiano

### Stile codice

- **Indentazione**: 2 spazi
- **CSS**: variabili `--nome` in `:root`, mai colori hardcodati
- **CSS**: BEM-like ma rilassato (`.about-quote`, `.project-card`, `.skill-dot`)
- **JS**: `const` di default, `let` solo se la variabile cambia, mai `var`
- **JS**: arrow function `() => {}` preferite quando non serve `this`
- **HTML**: semantico (`<section>`, `<article>`, `<button>`, `<nav>`, non `<div>` ovunque)

### Pattern già stabiliti

Fai come meglio credi tu

### Palette

- `--bg: #080808`
- `--text: #ebebeb`
- `--muted: #4a4a4a`
- `--dim: #1e1e1e`
- `--accent: #c8ff00`

---

## Cose da NON fare

- Non aggiungere dipendenze (no npm, no librerie esterne)
- Non riscrivere file esistenti senza prima mostrarmi il piano
- Non cambiare la palette o i font senza chiedere
- Non usare `localStorage` o `sessionStorage`
- Non rimuovere commenti italiani esistenti — sono lì per studio

---

## Modalità di lavoro con Andres

### Livello di autonomia

Andres mi ha dato livello "professionista junior":

- Posso scrivere codice direttamente — non devo dargli solo hint
- Devo SEMPRE spiegare il piano PRIMA di scrivere
- Devo SEMPRE spiegare le scelte tecniche fatte DOPO aver scritto
- Lui rivede tutto e può chiedere modifiche

### Workflow per ogni task

1. **Riformulo** il task con parole mie per essere sicuro di aver capito
2. **Espongo il piano** in 2-5 punti numerati
3. **Aspetto OK** prima di scrivere codice (o "procedi" se è banale)
4. **Scrivo** il codice
5. **Spiego le scelte** — perché ho scelto X invece di Y, eventuali trade-off

### Spiegazioni tecniche

Andres sta imparando, quindi:

- Quando uso una proprietà CSS o un metodo JS che non gli ho ancora spiegato,
  aggiungo un commento inline che lo spiega
- Se faccio qualcosa di "intermedio/avanzato" (es: IntersectionObserver,
  cubic-bezier, regex), do una mini-lezione di 3-4 righe nel commento
- Italiano sempre. Se non sa una parola tecnica, la spiego.

### Stile dei commenti

Stile usato finora — da mantenere:

```css
/* ════════════════════════════════════════════
   NOME SEZIONE — descrizione breve di cosa fa.
   Eventuali note tecniche su trucchi o pattern usati.
   ════════════════════════════════════════════ */

.classe {
  proprietà: valore; /* spiegazione del perché */
}
```

```javascript
/* ════════════════════════════════════════════
   N. NOME BLOCCO

   Cosa fa visivamente:
   ...

   Perché serve:
   ...

   Tecnica usata:
   ...
   ════════════════════════════════════════════ */

const x = ...; // commento inline che spiega il perché
```

---

## Comandi utili

```bash
# vedere lo stato del repo
git status

# vedere le modifiche fatte
git diff

# salvare e pushare
git add .
git commit -m "descrizione"
git push

# scaricare modifiche da altro PC
git pull
```

---

Appena io ti dico pusha, tu pushi sul mio git hub.

## Stato attuale del progetto

### Sezioni completate

- [x] 001 — Hero (con live system, parallax, curtain reveal). Questa sezione va bene cosi. Forse la cambieremo in futuro con un leitmotiv personale. Però è la migliore per me . Rendila responsiva mi raccomando. Ovviamente tipo se provi a renderla responsiva e si bugga, cambia te qualcosa , ti lascio il permesso basta che venga bene bene e bello da vedere.
- [x] 002 — About (in revisione: tooltip C, Now card, stat cards cliccabili). Questo qua devi gestire un po meglio dato che c'è un riquadro sticky come la terza sezione quindi magari cambia qualcosa. Mi racocomando cambia bene e se è necessario cambia anche altre cose basta che si distingua dalla terza sezione manetendo comunque il filo logico.
- [x] 003 — Projects . ovviamente da migliorare e da mettere i progetti veri . Però la struttura non è male, forse cambia qualcosa, ma vedi tu cosa ritieni necessario.
- [x] 004 — Skills (3 marquee infiniti). Questa invece proprio non mi piace è da cambgiare tutta e falla te a tuo piacimento.
- [ ] 005 — Contact (da fare), fai come vuoi .

### Bug noti / da rivedere

- Responsività generale da verificare su tutti i breakpoint
- Le immagini dei progetti sono placeholder Unsplash, da sostituire con screenshot reali
- Manca sezione Contact
- Contenuto About ancora generico — aggiornare con testi reali dal CV

### Cose che vorrei in futuro

- Un "leitmotiv personale" tipo il reattore di Christian Colonna —
  qualcosa che mi rappresenti e torni in tutto il sito
  (da decidere alla fine)

---

## Risorse

- Design reference: Elan 42 (livello qualità da puntare)
- Sito compagno per confronto: christiancolonna.com
- Repository GitHub: [https://github.com/andrespelizzer-lang/Andres-Pelizzer-Portfolio.git](https://github.com/andrespelizzer-lang/Andres-Pelizzer-Portfolio.git)
