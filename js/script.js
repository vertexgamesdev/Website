document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".header"), menu = document.querySelector(".menubtn"), nav = document.querySelector(".navlinks"), top = document.querySelector(".top");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scrollUI = () => { header?.classList.toggle("scrolled", scrollY > 8); top?.classList.toggle("show", scrollY > 450) };
    addEventListener("scroll", scrollUI, { passive: true }); scrollUI();
    menu?.addEventListener("click", () => { let open = nav.classList.toggle("open"); menu.setAttribute("aria-expanded", open) });
    document.addEventListener("click", e => { if (nav?.classList.contains("open") && !nav.contains(e.target) && !menu.contains(e.target)) { nav.classList.remove("open"); menu.setAttribute("aria-expanded", "false") } });
    nav?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => { nav.classList.remove("open"); menu.setAttribute("aria-expanded", "false") }));
    document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener("click", e => { let el = document.querySelector(a.getAttribute("href")); if (el) { e.preventDefault(); el.scrollIntoView({ behavior: reduced ? "auto" : "smooth" }) } }));
    const current = location.pathname.split("/").pop() || "index.html"; document.querySelectorAll("[data-page]").forEach(a => { if (a.dataset.page === current) a.classList.add("active") });
    const io = new IntersectionObserver(entries => entries.forEach(x => { if (x.isIntersecting) { x.target.classList.add("show"); io.unobserve(x.target) } }), { threshold: .08 }); document.querySelectorAll(".reveal").forEach(x => io.observe(x));
    top?.addEventListener("click", () => scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" }));
    document.querySelectorAll("[data-year]").forEach(x => x.textContent = new Date().getFullYear());
    const form = document.querySelector("#contactForm"); if (form) { form.addEventListener("submit", e => { e.preventDefault(); let ok = true; form.querySelectorAll("[required]").forEach(i => { let valid = i.value.trim() !== ""; if (i.type === "email") valid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(i.value.trim()); let er = i.parentElement.querySelector(".err"); if (!valid) { ok = false; if (er) er.style.display = "block" } else if (er) er.style.display = "none" }); if (ok) { form.reset(); document.querySelector(".success").style.display = "block" } }); form.querySelectorAll("input,textarea").forEach(i => i.addEventListener("input", () => { let er = i.parentElement.querySelector(".err"); if (er) er.style.display = "none" })) }
});
