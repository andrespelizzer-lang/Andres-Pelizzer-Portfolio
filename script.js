/* ══════════════════════════════════════════════════════════════════
   SCRIPT.JS — Tutto il JavaScript del portfolio

   Blocchi:
   1. Uptime counter
   2. Stack cycle
   3. Nav (sempre visibile)
   4. Parallax + mouse
   5. Hamburger menu (FIXATO: usa #mmClose)
   6. Reveal on scroll
   7. Project switching + carousel
   8. Stat cards toggle
══════════════════════════════════════════════════════════════════ */

/* ════════════════════════════════════════════════════════════════
   1. UPTIME COUNTER
═══════════════════════════════════════════════════════════════════ */
const startTime = Date.now();
const uptimeEl = document.getElementById("uptime");

setInterval(() => {
  const s = Math.floor((Date.now() - startTime) / 1000);
  const h = String(Math.floor(s / 3600)).padStart(2, "0");
  const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const sec = String(s % 60).padStart(2, "0");
  uptimeEl.textContent = `${h}:${m}:${sec}`;
}, 1000);

/* ════════════════════════════════════════════════════════════════
   2. STACK CYCLE
═══════════════════════════════════════════════════════════════════ */
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
let si = 0;

setInterval(() => {
  stackEl.style.opacity = "0";
  stackEl.style.transform = "translateY(6px)";
  stackEl.style.transition = "opacity 0.2s, transform 0.2s";

  setTimeout(() => {
    si = (si + 1) % stacks.length;
    stackEl.textContent = stacks[si];
    stackEl.style.opacity = "1";
    stackEl.style.transform = "translateY(0)";
  }, 220);
}, 1800);

/* ════════════════════════════════════════════════════════════════
   3. NAV — sempre visibile, niente hide on scroll
═══════════════════════════════════════════════════════════════════ */

/* ════════════════════════════════════════════════════════════════
   4. PARALLAX + MOUSE MOVEMENT
═══════════════════════════════════════════════════════════════════ */
const heroFirst = document.querySelector(".hero-first");
const heroLast = document.querySelector(".hero-last");
let scrollY = 0;

window.addEventListener(
  "scroll",
  () => {
    scrollY = window.scrollY;
  },
  { passive: true },
);

document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 14;
  const y = (e.clientY / window.innerHeight - 0.5) * 8;

  heroFirst.style.transform = `translate(${x * 0.5}px, ${y * 0.5 - scrollY * 0.04}px)`;
  heroLast.style.transform = `translate(${x * 1.1}px, ${y * 1.1 - scrollY * 0.09}px)`;
});

/* ════════════════════════════════════════════════════════════════
   5. HAMBURGER MENU
   FIXATO: il pulsante × usa id="mmClose" con addEventListener.
   Body overflow bloccato quando il menu è aperto.
═══════════════════════════════════════════════════════════════════ */
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const mmLogoLink = document.getElementById("mmLogoLink");
const mmClose = document.getElementById("mmClose");

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

hamburger.addEventListener("click", () => {
  mobileMenu.classList.contains("open") ? closeMenu() : openMenu();
});

if (mmClose) {
  mmClose.addEventListener("click", closeMenu);
}

if (mmLogoLink) {
  mmLogoLink.addEventListener("click", closeMenu);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && mobileMenu.classList.contains("open")) closeMenu();
});

document.querySelectorAll(".mm-link").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

/* ════════════════════════════════════════════════════════════════
   6. REVEAL ON SCROLL
═══════════════════════════════════════════════════════════════════ */
const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
);

revealElements.forEach((el) => observer.observe(el));

/* ════════════════════════════════════════════════════════════════
   7. PROJECTS — sticky frame switching + carousel

   Ogni progetto ha data-images (JSON array di URL).
   Quando un progetto entra nel viewport, il browser frame
   mostra le sue immagini. Se ha più di una immagine,
   appaiono le frecce e i dots per navigare.
═══════════════════════════════════════════════════════════════════ */
const projectImage = document.getElementById("projectImage");
const browserUrl = document.getElementById("browserUrl");
const carouselPrev = document.getElementById("carouselPrev");
const carouselNext = document.getElementById("carouselNext");
const carouselDots = document.getElementById("carouselDots");
const projects = document.querySelectorAll(".project");

let currentImages = [];
let currentImageIndex = 0;

/* aggiorna le frecce e i dots in base al numero di immagini */
function updateCarouselUI() {
  if (currentImages.length <= 1) {
    carouselPrev.style.display = "none";
    carouselNext.style.display = "none";
    carouselDots.style.display = "none";
    return;
  }

  carouselPrev.style.display = "flex";
  carouselNext.style.display = "flex";
  carouselDots.style.display = "flex";

  /* genera dots */
  carouselDots.innerHTML = "";
  currentImages.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "carousel-dot" + (i === currentImageIndex ? " active" : "");
    dot.addEventListener("click", () => goToImage(i));
    carouselDots.appendChild(dot);
  });
}

function goToImage(index) {
  currentImageIndex = index;
  projectImage.style.opacity = "0";
  setTimeout(() => {
    projectImage.src = currentImages[currentImageIndex];
    projectImage.style.opacity = "1";
    updateCarouselUI();
  }, 200);
}

if (carouselPrev) {
  carouselPrev.addEventListener("click", () => {
    const prev =
      (currentImageIndex - 1 + currentImages.length) % currentImages.length;
    goToImage(prev);
  });
}

if (carouselNext) {
  carouselNext.addEventListener("click", () => {
    const next = (currentImageIndex + 1) % currentImages.length;
    goToImage(next);
  });
}

if (projectImage && browserUrl && projects.length > 0) {
  const projectObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          /* leggi data-images come JSON array */
          let images = [];
          try {
            images = JSON.parse(entry.target.dataset.images || "[]");
          } catch (e) {
            images = [];
          }

          const newUrl = entry.target.dataset.url || "";

          /* se sono le stesse immagini, salta */
          if (JSON.stringify(images) === JSON.stringify(currentImages)) return;

          currentImages = images;
          currentImageIndex = 0;

          projectImage.style.opacity = "0";
          setTimeout(() => {
            if (currentImages.length > 0) {
              projectImage.src = currentImages[0];
            }
            browserUrl.textContent = newUrl;
            projectImage.style.opacity = "1";
            updateCarouselUI();
          }, 200);
        }
      });
    },
    { threshold: 0.5, rootMargin: "-20% 0px -20% 0px" },
  );

  projects.forEach((project) => projectObserver.observe(project));
}

/* ════════════════════════════════════════════════════════════════
   8. STAT CARDS TOGGLE
═══════════════════════════════════════════════════════════════════ */
const statCards = document.querySelectorAll(".stat-card");

statCards.forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("open");
  });
});
