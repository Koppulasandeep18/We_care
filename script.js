// ====== EDIT YOUR DETAILS HERE (only place you need to change) ======
const CONFIG = {
  whatsapp: "919876543210",        // country code + number, no + or spaces
  phone: "919876543210",
  phoneDisplay: "+91 98765 43210",
  email: "info@yourdomain.com",
  coverage: "Serving Across India",
  waMessage: "Hello Save Water, I would like to enquire about your water solutions."
};
// =====================================================================

const $ = s => document.querySelector(s), $$ = s => document.querySelectorAll(s);

// contact links
$$("[data-wa]").forEach(a => a.href = "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(CONFIG.waMessage));
$$("[data-mail]").forEach(a => a.href = "mailto:" + CONFIG.email);
$$("[data-phone]").forEach(a => a.href = "tel:+" + CONFIG.phone);
$$("[data-phone-text]").forEach(s => s.textContent = CONFIG.phoneDisplay);
$$("[data-city]").forEach(s => s.textContent = CONFIG.coverage);
$("#year").textContent = new Date().getFullYear();

// mobile menu
const toggle = $(".menu-toggle"), nav = $(".nav");
const closeMenu = () => { nav.classList.remove("open"); toggle.setAttribute("aria-expanded","false"); toggle.textContent = "☰"; };
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  toggle.textContent = open ? "×" : "☰";
});
$$(".nav a").forEach(a => a.addEventListener("click", closeMenu));

// active nav link on scroll
const links = [...$$(".nav>a[href^='#']")];
const map = links.map(l => ({ l, s: $(l.getAttribute("href")) })).filter(x => x.s);
const onScroll = () => {
  const y = window.scrollY + 120; let cur = map[0];
  map.forEach(x => { if (x.s.offsetTop <= y) cur = x; });
  links.forEach(l => l.classList.toggle("active", cur && l === cur.l));
};
window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

// testimonial arrows
const track = $("#t-track");
const step = () => (track.querySelector(".t-card").offsetWidth + 20);
$("#t-prev").addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
$("#t-next").addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));

// scroll reveal
const items = $$(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 });
  items.forEach(el => io.observe(el));
} else items.forEach(el => el.classList.add("in"));
