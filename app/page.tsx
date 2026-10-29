"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

/* ── DATA ── */

const HERO_SLIDES = [
  {
    src: "/images/hero-01.jpg",
    alt: "Bara Imambara & Asafi Mosque — Lucknow",
    caption: "Bara Imambara",
  },
  {
    src: "/images/hero-02.jpg",
    alt: "Rumi Darwaza — The Turkish Gate of Lucknow",
    caption: "Rumi Darwaza",
  },
  {
    src: "/images/hero-03.jpg",
    alt: "Dr. Ambedkar Memorial Park — Gomti Nagar, Lucknow",
    caption: "Ambedkar Memorial",
  },
  {
    src: "/images/hero-04.jpg",
    alt: "The British Residency — Historic Ruins of Lucknow",
    caption: "The British Residency",
  },
  {
    src: "/images/hero-05.jpg",
    alt: "Gomti Riverfront Promenade — Lucknow",
    caption: "Gomti Riverfront",
  },
  {
    src: "/images/hero-06.jpg",
    alt: "Chhota Imambara — Palace of Lights, Lucknow",
    caption: "Chhota Imambara",
  },
];

const NAV_LINKS = [
  { label: "Home",          href: "#",              active: true },
  { label: "Destinations",  href: "#destinations" },
  { label: "Heritage",      href: "#heritage" },
  { label: "Culture",       href: "#culture" },
  { label: "Plan Visit",    href: "#plan" },
];

const MARQUEE_ITEMS = [
  { num: "3",      label: "UNESCO Sites" },
  { num: "1000+",  label: "Years of History" },
  { num: "2,528",  label: "sq. km Area" },
  { num: "Oct–Mar",label: "Best Season" },
  { num: "100+",   label: "Heritage Monuments" },
  { num: "∞",      label: "Culinary Traditions" },
];

const COLLAGE = [
  {
    n: 1, name: "Bara Imambara", region: "Old Lucknow",
    desc: "A marvel of Mughal architecture — built without iron or wood.",
    src: "/images/collage-bara-imambara.jpg", ratio: "aspect-[4/5]",
  },
  {
    n: 2, name: "Rumi Darwaza", region: "Hussainabad",
    desc: "The iconic Ottoman-inspired gateway standing 60 feet tall.",
    src: "/images/collage-rumi-darwaza.jpg", ratio: "aspect-[3/4]",
  },
  {
    n: 3, name: "Chota Imambara", region: "Old Lucknow",
    desc: "Palace of Lights — adorned with thousands of chandeliers and Quranic verses.",
    src: "/images/collage-chota-imambara.jpg", ratio: "aspect-[4/5]",
  },
  {
    n: 4, name: "The Residency", region: "Residency Road",
    desc: "A haunting colonial ruin — witness to the 1857 siege.",
    src: "/images/collage-residency.jpg", ratio: "aspect-[3/4]",
  },
  {
    n: 5, name: "Hazratganj", region: "Central Lucknow",
    desc: "The heritage boulevard where Nawabi elegance meets modern life.",
    src: "/images/collage-hazratganj.jpg", ratio: "aspect-[4/5]",
  },
  {
    n: 6, name: "Gomti Riverfront", region: "Gomti Nagar",
    desc: "A luminous promenade along Lucknow's sacred river.",
    src: "/images/collage-gomti.jpg", ratio: "aspect-[16/9]",
  },
];

const STORIES = [
  {
    id: "nawabi",
    place: "Bara Imambara · Hussainabad · Residency",
    title: "The Nawabi Legacy",
    excerpt: "Wander through the labyrinths and courtyards that Nawab Asaf-ud-Daula built to feed the hungry and leave an eternal mark on Lucknow.",
    src: "/images/story-nawabi.jpg",
    body: "Lucknow's Nawabi era (1775–1856) produced some of the finest monuments in South Asia. The Bara Imambara, built in 1784, is an engineering wonder — its central hall remains the largest arched construction in the world built without iron girders. The adjacent Bhul Bhulaiya (labyrinth) has over 1,000 passages and only two exits. The Hussainabad Imambara dazzles with thousands of chandeliers and European clocks gifted by colonial-era merchants. Nearby, the bullet-scarred Residency stands as a solemn reminder of 1857.",
    facts: [
      { label: "Built",         value: "1784 AD" },
      { label: "Architect",     value: "Kifayat Ullah" },
      { label: "Patronage",     value: "Nawab Asaf-ud-Daula" },
      { label: "Entry",         value: "₹25 (Indian) · ₹500 (Foreign)" },
      { label: "Open",          value: "Sunrise to Sunset" },
    ],
  },
  {
    id: "chikankari",
    place: "Aminabad · Chowk · Artisan Workshops",
    title: "The Art of Chikankari",
    excerpt: "Delicate hand-embroidered muslin cloth — a craft tradition with roots in the Mughal court and the hands of Lucknow's skilled artisans.",
    src: "/images/story-chikankari.jpg",
    body: "Chikankari is Lucknow's most celebrated craft — a form of intricate hand-embroidery traditionally done on white muslin, now on a variety of fabrics. Legend credits Mughal Empress Nur Jehan with introducing the craft to the region. Today, thousands of artisans in the old city neighbourhoods of Chowk, Aminabad, and Kaisergunj carry on this 400-year tradition. The delicate stitches — over 32 varieties — create floral and geometric patterns of extraordinary fineness. A single garment can take weeks to complete.",
    facts: [
      { label: "Origin",        value: "Mughal Era (~17th century)" },
      { label: "Stitches",      value: "32+ distinct varieties" },
      { label: "Best Buy",      value: "Chowk, Aminabad, Hazratganj" },
      { label: "GI Tag",        value: "Geographical Indication certified" },
      { label: "Best Season",   value: "October–March" },
    ],
  },
  {
    id: "kebabs",
    place: "Tunday Kababi · Wahid Biryani · Chowk",
    title: "Kebabs & Culinary Trail",
    excerpt: "The Nawabs of Awadh turned cooking into high art. Follow the scent of saffron, mace, and charcoal to Lucknow's legendary food lanes.",
    src: "/images/story-kebabs.jpg",
    body: "Lucknow's cuisine — Awadhi cuisine — is distinguished by the dum (slow-cooking) method that seals spices and meat together under a sealed pot. The result: impossibly tender kebabs, fragrant biryanis, and rich gravies. Tunday Kababi (est. 1905) at Aminabad is legendary for its galouti kebab — so tender it was created for a toothless Nawab. Wahid Biryani, the Sheermal at Ram Asrey, and the Nihari at Idris Biryani are pilgrimages every serious food lover must make.",
    facts: [
      { label: "Signature Dish", value: "Galouti Kebab" },
      { label: "Must Try",       value: "Tunday Kababi, Wahid Biryani" },
      { label: "Street Food Hub",value: "Chowk, Aminabad" },
      { label: "Cooking Style",  value: "Dum (slow-cooked)" },
      { label: "Best Time",      value: "Evening (6pm–11pm)" },
    ],
  },
  {
    id: "gomti",
    place: "Gomti Nagar · Ambedkar Park · Riverfront",
    title: "Gomti Riverfront Walk",
    excerpt: "Lucknow's luminous promenade along the Gomti river — boating, gardens, and the magnificent Dr. Ambedkar Memorial at sunset.",
    src: "/images/story-gomti.jpg",
    body: "The Gomti Riverfront project transformed Lucknow's ancient river banks into a world-class promenade. Stretching over 8 km, the landscaped walkway offers panoramic views, boat rides, and open-air performances. The nearby Dr. B.R. Ambedkar Samajik Parivartan Prateek Sthal — colloquially Ambedkar Park — is one of India's most striking modern monuments: massive sandstone elephants and towering pillars set against manicured gardens. At sunset, the whole stretch glows gold — a perfect metaphor for the city itself.",
    facts: [
      { label: "Length",         value: "8+ km promenade" },
      { label: "Highlight",      value: "Ambedkar Sthal (Elephant Park)" },
      { label: "Boat Rides",     value: "Available (Gomti Barrage)" },
      { label: "Best Time",      value: "Sunset (5pm–7pm)" },
      { label: "Nearest Metro",  value: "Transport Nagar Station" },
    ],
  },
];

const SEASONS = [
  {
    id: "winter",
    name: "Winter",
    months: "October — February",
    lede: "The peak tourist season. Cool, clear days make exploring monuments a pleasure. The International Lucknow Festival (Nov) fills the city with craft, music, and food.",
    src: "/images/season-winter.jpg",
    facts: [
      "Temperature: 8°C – 20°C",
      "Perfect for: All monuments, heritage walks, markets",
      "Key events: Lucknow Festival (Nov), Mahotsav",
      "Light layers needed in the evening",
      "Book accommodation well in advance",
    ],
  },
  {
    id: "spring",
    name: "Spring",
    months: "March — April",
    lede: "A brief, beautiful shoulder season. Gardens bloom, the air is warm but not oppressive, and crowds thin after winter peak. Perfect for Chikankari shopping.",
    src: "/images/season-spring.jpg",
    facts: [
      "Temperature: 22°C – 34°C",
      "Perfect for: Shopping, day trips, garden visits",
      "Key events: Holi celebrations, spring festivals",
      "Mild mornings, warm afternoons",
      "Fewer tourists than winter season",
    ],
  },
  {
    id: "monsoon",
    name: "Monsoon",
    months: "July — September",
    lede: "The city turns vivid green. While outdoor monuments are best visited in breaks between showers, the cuisine, museums, and bazaars are year-round pleasures.",
    src: "/images/season-monsoon.jpg",
    facts: [
      "Temperature: 26°C – 36°C",
      "Rainfall: 830mm annually, mostly Jul–Sep",
      "Perfect for: Museums, covered bazaars, cuisine",
      "Lowest hotel rates of the year",
      "Carry an umbrella, enjoy the green city",
    ],
  },
  {
    id: "summer",
    name: "Summer",
    months: "May — June",
    lede: "Hot and dry — the off-peak season. An excellent time for budget travellers. The afternoon quiet reveals Lucknow's indoor cultural richness.",
    src: "/images/season-summer.jpg",
    facts: [
      "Temperature: 30°C – 44°C",
      "Perfect for: Indoor heritage, Imambaras at dawn",
      "Budget travel — lowest prices",
      "Start sightseeing before 9am",
      "Lucknow's legendary nimbu pani & sharbat",
    ],
  },
];

const FOOD_ITEMS = [
  { tag: "Meat", name: "Galouti Kebab", desc: "The melt-in-your-mouth minced meat kebab of Tunday Kababi — 160 spices, perfected for a toothless Nawab.", src: "/images/food-kebabs.jpg" },
  { tag: "Rice", name: "Awadhi Biryani", desc: "Dum-cooked basmati with saffron, whole spices, and tender meat — the definitive Lucknow biryani experience.", src: "/images/food-biryani.jpg" },
  { tag: "Bread", name: "Sheermal", desc: "A saffron-laced flat bread baked in a tandoor — sweet, soft, and best eaten warm from the Chowk bakeries.", src: "/images/food-sheermal.jpg" },
  { tag: "Slow-Cooked", name: "Nihari", desc: "A rich slow-braised meat stew eaten at dawn — the quintessential Lucknow winter breakfast since the Nawabi era.", src: "/images/food-nihari.jpg" },
  { tag: "Dessert", name: "Kulfi Faluda", desc: "Thick, dense frozen cream studded with pistachios and served on a bed of rose-water faluda noodles.", src: "/images/food-kulfi.jpg" },
  { tag: "Dessert", name: "Zarda", desc: "Saffron-stained sweet rice garnished with nuts and silver leaf — a Nawabi celebration dish.", src: "/images/food-zarda.jpg" },
];

const ROUTES = [
  {
    title: "Old Lucknow Heritage Walk",
    days: "1 Day",
    note: "The essential half-day circuit through the monumental heart of Hussainabad — walk-able from the Rumi Darwaza.",
    stops: [
      { day: "Morning", name: "Rumi Darwaza", desc: "Begin at the iconic Turkish Gate — the symbol of Lucknow.", src: "/images/route-rumi.jpg" },
      { day: "Morning", name: "Bara Imambara", desc: "Explore the Great Imambara and brave the Bhul Bhulaiya labyrinth.", src: "/images/route-bara.jpg" },
      { day: "Afternoon", name: "Chota Imambara", desc: "The gilded Palace of Lights — a riot of chandeliers and Belgian glass.", src: "/images/route-chota.jpg" },
      { day: "Afternoon", name: "Hussainabad Clock Tower", desc: "India's tallest clock tower looms above the old city skyline.", src: "/images/route-clocktower.jpg" },
    ],
  },
  {
    title: "Complete Lucknow Experience",
    days: "3 Days",
    note: "Three days spanning Old City grandeur, colonial echoes, and modern Lucknow's riverside beauty.",
    stops: [
      { day: "Day 1", name: "Bara Imambara & Rumi Darwaza", desc: "Full immersion in Nawabi architecture — allow 4 hours.", src: "/images/route-bara.jpg" },
      { day: "Day 2", name: "The Residency", desc: "The haunting colonial ruin — frozen in 1857.", src: "/images/route-residency.jpg" },
      { day: "Day 2", name: "La Martinière College", desc: "A French general's palatial school — an architectural fever dream.", src: "/images/route-lamartiniere.jpg" },
      { day: "Day 3", name: "Hazratganj Promenade", desc: "Lucknow's heritage boulevard — boutiques, cafés, and colonial facades.", src: "/images/route-hazratganj.jpg" },
      { day: "Day 3", name: "Gomti Riverfront Sunset", desc: "End with a boat ride as the city turns gold at dusk.", src: "/images/route-gomti.jpg" },
    ],
  },
];

/* ── HELPERS ── */

function useScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ── PAGE ── */

export default function HomePage() {
  const [preloaded, setPreloaded]       = useState(false);
  const [progress,  setProgress]        = useState(0);
  const [navSolid,  setNavSolid]        = useState(false);
  const [drawerOpen,setDrawerOpen]      = useState(false);
  const [lightMode, setLightMode]       = useState(true);
  const [slide,     setSlide]           = useState(0);
  const [activeSeason, setActiveSeason] = useState(0);
  const [openStory, setOpenStory]       = useState<number | null>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  /* Preloader */
  useEffect(() => {
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 20 + 8;
      if (p >= 100) { p = 100; clearInterval(iv); }
      setProgress(Math.min(p, 100));
      if (fillRef.current) fillRef.current.style.transform = `scaleX(${Math.min(p, 100) / 100})`;
    }, 80);

    // Sync hero entrance precisely with column sweep (1.95s delay + .82s animation)
    const runTimer = setTimeout(() => {
      document.body.classList.add("hero-run");
    }, 1900);

    const doneTimer = setTimeout(() => {
      setPreloaded(true);
    }, 2850);

    return () => {
      clearInterval(iv);
      clearTimeout(runTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  /* Nav scroll */
  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Hero auto-advance */
  useEffect(() => {
    if (!preloaded) return;
    const t = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 6000);
    return () => clearInterval(t);
  }, [preloaded]);

  /* Light/dark mode */
  useEffect(() => {
    const html = document.documentElement;
    if (lightMode) html.classList.add("page-light");
    else           html.classList.remove("page-light");
  }, [lightMode]);

  /* Scroll reveal */
  useScrollReveal();

  /* Buttery Smooth Parallax via requestAnimationFrame */
  useEffect(() => {
    let rafId: number;
    let ticking = false;

    const updateParallax = () => {
      const vh = window.innerHeight;
      const images = document.querySelectorAll<HTMLElement>(".media--parallax img");
      images.forEach((img) => {
        const container = img.closest(".media--parallax");
        if (!container) return;
        const rect = container.getBoundingClientRect();
        if (rect.bottom >= 0 && rect.top <= vh) {
          const progress = (rect.top + rect.height / 2) / vh;
          const py = ((progress - 0.5) * 22).toFixed(2);
          img.style.setProperty("--py", `${py}%`);
        }
      });
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateParallax();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  /* Story close on backdrop */
  const closeStory = useCallback(() => setOpenStory(null), []);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>

      {/* ══════════════ PRELOADER ══════════════ */}
      {!preloaded && (
        <div className="preload" aria-hidden="true">
          <div className="preload__cols">
            {[0,1,2,3,4].map((i) => (
              <span key={i} style={{ "--i": i } as React.CSSProperties} />
            ))}
          </div>
          <div className="preload__intro">
            <div className="preload__word">
              {"LUCKNOW".split("").map((ch, i) => (
                <span key={i} style={{ "--i": i } as React.CSSProperties}>{ch}</span>
              ))}
            </div>
            <div className="preload__meter">
              <div className="preload__track">
                <div className="preload__fill" ref={fillRef} />
              </div>
              <span className="preload__pct">{Math.round(progress)}%</span>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════ NAV ══════════════ */}
      <nav className={`nav${navSolid ? " nav--solid" : ""}`} role="navigation" aria-label="Main navigation">
        <div className="nav__bar container">
          {/* Brand */}
          <a href="#" className="nav__brand" aria-label="Lucknow Tourism — home">
            <img src="/images/lda-logo-160.svg" alt="" className="nav__emblem" />
            <div className="nav__brand-text">
              <span className="nav__brand-eyebrow">Uttar Pradesh · India</span>
              <span className="nav__brand-name">
                <span className="nav__brand-name-line">Lucknow</span>{" "}
                <span className="nav__brand-name-line">Tourism</span>
              </span>
            </div>
          </a>

          {/* Desktop links */}
          <ul className="nav__links" role="list">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} className={`nav__link${l.active ? " is-active" : ""}`}>{l.label}</a>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="nav__actions">
            <button
              className="nav__theme"
              aria-label="Toggle light/dark mode"
              onClick={() => setLightMode(!lightMode)}
            >
              {lightMode ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <circle cx="12" cy="12" r="5"/><path d="M12 2v2m0 16v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M2 12h2m16 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
            <button
              className={`nav__burger${drawerOpen ? " is-open" : ""}`}
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(!drawerOpen)}
            >
              <span /><span />
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {drawerOpen && (
          <div className="nav__drawer" role="dialog" aria-modal="true" aria-label="Navigation menu">
            <ul className="nav__drawer-links" role="list">
              {NAV_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className={`nav__drawer-link${l.active ? " is-active" : ""}`}
                    onClick={() => setDrawerOpen(false)}
                  >
                    {l.label}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17 17 7M8 7h9v9"/>
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
            <div className="nav__drawer-foot">
              <p>A cinematic guide to <a href="#">Lucknow</a>, the City of Nawabs.</p>
              <p>Uttar Pradesh Tourism · India</p>
            </div>
          </div>
        )}
      </nav>

      {/* ══════════════ HERO ══════════════ */}
      <main id="main-content">
        <section className="hero" aria-label="Lucknow — City of Nawabs">
          {/* Slides */}
          <div className="hero__slides" aria-hidden="true">
            {HERO_SLIDES.map((s, i) => (
              <div key={i} className={`hero__slide${i === slide ? " is-active" : ""}`}>
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  className="object-cover"
                  priority={i === 0}
                  unoptimized
                />
              </div>
            ))}
          </div>

          {/* Shade */}
          <div className="hero__shade" aria-hidden="true" />

          {/* Content */}
          <div className="hero__inner">
            <div className="hero__stack">
              <h1 className="hero__title">
                <div className="hero__mask hero__mask--lead">
                  <span className="hero__title-lead">Visit<span className="hero__title-gap"> </span></span>
                </div>
                <div className="hero__mask hero__mask--main">
                  <span className="hero__title-main">Lucknow</span>
                </div>
              </h1>
              <p style={{ color: "rgba(255,255,255,.65)", fontSize: "clamp(.78rem,1.4vw,1.05rem)", letterSpacing: ".2em", textTransform: "uppercase", fontWeight: 300, opacity: preloaded ? 1 : 0, transition: "opacity 1s .9s" }}>
                City of Nawabs · Uttar Pradesh · India
              </p>
              <div className="hero__actions">
                <a href="#destinations" className="btn btn-primary">
                  Explore Destinations
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
                <a href="#plan" className="btn btn-ghost">Plan Your Visit</a>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="hero__dots" aria-label="Slide navigation" role="tablist">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                className={`hero__dot${i === slide ? " is-active" : ""}`}
                aria-label={`Slide ${i + 1}`}
                role="tab"
                aria-selected={i === slide}
                onClick={() => setSlide(i)}
              />
            ))}
          </div>
        </section>

        {/* ══════════════ MARQUEE ══════════════ */}
        <div className="marquee" aria-hidden="true">
          <div className="marquee__track">
            {[0, 1].map((g) => (
              <div key={g} className="marquee__group">
                {MARQUEE_ITEMS.map((item, i) => (
                  <React.Fragment key={i}>
                    <div className="marquee__item">
                      <span className="marquee__num">{item.num}</span>
                      <span className="marquee__label">{item.label}</span>
                    </div>
                    <span className="marquee__dot" />
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════ POPULAR / COLLAGE ══════════════ */}
        <section id="destinations" className="popular section" aria-label="Famous Destinations in Lucknow">
          <div className="container">
            <header className="section-head">
              <div className="section-head__text reveal">
                <span className="eyebrow">Destinations</span>
                <h2>Places Worth <em>Exploring</em></h2>
              </div>
              <div className="section-head__aside reveal" style={{ "--reveal-delay": "100ms" } as React.CSSProperties}>
                <p>From Nawabi monuments to Mughal gateways — Lucknow's landmarks span 500 years of layered history.</p>
              </div>
            </header>

            <div className="collage">
              {COLLAGE.map((item) => (
                <div key={item.n} className={`collage__item collage__item--${item.n} reveal`}>
                  <div className="collage__tilt">
                    <div className={`collage__media media media--parallax ${item.ratio}`}>
                      <Image
                        src={item.src}
                        alt={item.name}
                        fill
                        className="object-cover"
                        unoptimized
                        loading="lazy"
                      />
                    </div>
                    <span className="collage__index" aria-hidden="true">
                      {String(item.n).padStart(2, "0")}
                    </span>
                    <span className="collage__region">
                      {item.region}
                    </span>
                  </div>
                  <div className="collage__meta">
                    <h3>{item.name}</h3>
                    {[1, 6].includes(item.n) ? (
                      <>
                        <p>{item.desc}</p>
                      </>
                    ) : (
                      <p>{item.desc}</p>
                    )}
                    {[1, 6].includes(item.n) && (
                      <a href="#" className="section-link">
                        Explore
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ STORIES ══════════════ */}
        <section id="heritage" className="stories section" aria-label="Stories of Lucknow">
          <div className="container">
            <header className="section-head">
              <div className="section-head__text reveal">
                <span className="eyebrow">Discover</span>
                <h2>Stories of <em>Awadh</em></h2>
              </div>
              <div className="section-head__aside reveal" style={{ "--reveal-delay": "100ms" } as React.CSSProperties}>
                <p>Dive deeper into Lucknow's living heritage, craft, cuisine, and culture.</p>
              </div>
            </header>

            <ul role="list">
              {STORIES.map((s, i) => (
                <li
                  key={s.id}
                  className="story reveal"
                  style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
                  onClick={() => setOpenStory(i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setOpenStory(i)}
                  aria-label={`Read story: ${s.title}`}
                >
                  <div className="story__shot">
                    <Image src={s.src} alt={s.title} fill className="object-cover" unoptimized loading="lazy" />
                  </div>
                  <div className="story__body">
                    <p className="story__place">{s.place}</p>
                    <div className="story__text">
                      <h3>{s.title}</h3>
                      <p>{s.excerpt}</p>
                    </div>
                  </div>
                  <span className="story__open" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17 17 7M8 7h9v9"/>
                    </svg>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Story Zoom Panel */}
        <div
          className={`story-zoom${openStory !== null ? " is-open" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-label={openStory !== null ? STORIES[openStory].title : "Story"}
        >
          <div className="story-zoom__scrim" onClick={closeStory} />
          {openStory !== null && (
            <div className="story-zoom__panel">
              <div className="story-zoom__shot">
                <Image
                  src={STORIES[openStory].src}
                  alt={STORIES[openStory].title}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <button className="story-zoom__close" aria-label="Close" onClick={closeStory}>
                  <span /><span />
                </button>
              </div>
              <div className="story-zoom__body">
                <p className="story-zoom__place">{STORIES[openStory].place}</p>
                <h2 className="story-zoom__title">{STORIES[openStory].title}</h2>
                <p className="story-zoom__text">{STORIES[openStory].body}</p>
                <ul className="story-zoom__facts" role="list">
                  {STORIES[openStory].facts.map((f) => (
                    <li key={f.label}>
                      <strong>{f.label}</strong>
                      <span>{f.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* ══════════════ SEASONS ══════════════ */}
        <section id="plan" className="seasons section" aria-label="When to visit Lucknow">
          <div className="container">
            <header className="section-head">
              <div className="section-head__text reveal">
                <span className="eyebrow">When to Visit</span>
                <h2>Plan Around the <em>Seasons</em></h2>
              </div>
              <div className="section-head__aside reveal" style={{ "--reveal-delay": "100ms" } as React.CSSProperties}>
                <p>Lucknow is a year-round destination — each season brings its own magic.</p>
              </div>
            </header>

            <div className="season-tabs" role="tablist" aria-label="Seasons">
              {SEASONS.map((s, i) => (
                <button
                  key={s.id}
                  className={`season-tab${i === activeSeason ? " is-active" : ""}`}
                  role="tab"
                  aria-selected={i === activeSeason}
                  onClick={() => setActiveSeason(i)}
                >
                  {s.name}
                </button>
              ))}
            </div>

            <div className="season-stage" role="tabpanel">
              {SEASONS.map((s, i) => (
                <div key={s.id} className={`season-stage__slide${i === activeSeason ? " is-on" : ""}`}>
                  <div className="season">
                    <Image src={s.src} alt={s.name} fill className="season__img object-cover" unoptimized loading="lazy" />
                    <div className="season__copy">
                      <span className="season__name">{s.name}</span>
                      <p className="season__months">{s.months}</p>
                      <p className="season__lede">{s.lede}</p>
                      <a href="#" className="season__cta">
                        Plan this season
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </a>
                    </div>
                    <div className="season__details">
                      <p className="season__details-title">What to expect</p>
                      <ul className="season__facts" role="list">
                        {s.facts.map((f, fi) => (
                          <li key={fi}>{f}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ EXTRA / ATMOSPHERIC BANNER ══════════════ */}
        <section className="extra-section section" aria-label="The spirit of Lucknow">
          <div className="container">
            <div className="extra-wall reveal reveal--scale">
              <Image
                src="/images/extra-banner.jpg"
                alt="The spirit of Lucknow at dusk"
                fill
                className="object-cover"
                unoptimized
                loading="lazy"
              />
              <div className="extra-wall__overlay">
                <div className="extra-wall__text">
                  <span className="eyebrow">The City of Nawabs</span>
                  <h2>Where Every Lane Tells a Story</h2>
                  <p>
                    Lucknow is not merely a city of monuments — it is a living culture of refinement, hospitality,
                    and sensory pleasure. The Nawabi tradition of{" "}
                    <em>tehzeeb</em> (etiquette) infuses every aspect of life here,
                    from the food to the language to the way a merchant wraps your purchase.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════ FOOD ══════════════ */}
        <section id="culture" className="food-section section" aria-label="Lucknow food and cuisine">
          <div className="container">
            <header className="foods-head section-head" style={{ alignItems: "flex-start", textAlign: "left" }}>
              <div className="reveal">
                <span className="eyebrow">Awadhi Cuisine</span>
                <h2 style={{ marginTop: 12, fontSize: "clamp(2rem,4.6vw,3.8rem)", letterSpacing: "-.04em", fontWeight: 800 }}>
                  Food of the Nawabs
                </h2>
              </div>
              <p className="foods-head__line reveal" style={{ "--reveal-delay": "100ms" } as React.CSSProperties}>
                Lucknow's cuisine is a UNESCO-worthy culinary tradition — slow-cooked, subtly spiced,
                and steeped in centuries of royal patronage.
              </p>
            </header>
            <div className="food-wall">
              {FOOD_ITEMS.map((item, i) => (
                <div
                  key={i}
                  className="food-item reveal"
                  style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
                >
                  <div className="food-item__shot">
                    <Image src={item.src} alt={item.name} fill className="object-cover" unoptimized loading="lazy" />
                  </div>
                  <div className="food-item__body">
                    <p className="food-item__tag">{item.tag}</p>
                    <p className="food-item__name">{item.name}</p>
                    <p className="food-item__desc">{item.desc}</p>
                  </div>
                  <svg style={{ flexShrink: 0, color: "var(--accent)", opacity: .5, marginLeft: "auto" }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17 17 7M8 7h9v9"/>
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ WATCH ══════════════ */}
        <section className="watch-section section" aria-label="Lucknow in motion">
          <div className="container">
            <header className="section-head">
              <div className="section-head__text reveal">
                <span className="eyebrow">Lucknow in Motion</span>
                <h2>See the City <em>Come Alive</em></h2>
              </div>
            </header>
            <div className="watch-embed reveal reveal--scale">
              <Image
                src="/images/extra-banner.jpg"
                alt="Lucknow — cinematic night view preview"
                fill
                className="object-cover"
                unoptimized
                loading="lazy"
              />
              <div className="watch-embed__play">
                <a
                  href="https://www.youtube.com/results?search_query=lucknow+tourism"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="watch-embed__play-btn"
                  aria-label="Watch Lucknow Tourism video on YouTube"
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </a>
              </div>
            </div>
            <p className="watch-foot">
              Explore Lucknow through documentary films, heritage walks, and culinary journeys.
              Official tourism content produced in collaboration with UP Tourism.
            </p>
          </div>
        </section>

        {/* ══════════════ JOURNEY / ROUTES ══════════════ */}
        <section className="journey-page section" aria-label="Travel routes in Lucknow">
          <div className="container">
            <header className="section-head" style={{ alignItems: "flex-start", textAlign: "left", marginBottom: "clamp(28px,4vw,56px)" }}>
              <div className="reveal">
                <span className="eyebrow">Itineraries</span>
                <h2 style={{ marginTop: 12 }}>Curated <em>Routes</em></h2>
              </div>
              <div className="reveal" style={{ "--reveal-delay": "100ms" } as React.CSSProperties}>
                <p style={{ maxWidth: "52ch", color: "var(--muted)" }}>
                  Whether you have a day or a week — here are the best ways to experience Lucknow.
                </p>
              </div>
            </header>
            <div className="journey__routes">
              {ROUTES.map((route, ri) => (
                <div key={ri} className="route reveal" style={{ "--reveal-delay": `${ri * 120}ms` } as React.CSSProperties}>
                  <div className="route__head">
                    <h3>{route.title}</h3>
                    <span className="route__days">{route.days}</span>
                  </div>
                  <p className="route__note">{route.note}</p>
                  <ul className="route__stops" role="list">
                    {route.stops.map((stop, si) => (
                      <li key={si}>
                        <span className="route__day">{stop.day}</span>
                        <div className="route__shot">
                          <Image src={stop.src} alt={stop.name} fill className="object-cover" unoptimized loading="lazy" />
                        </div>
                        <div>
                          <h4>{stop.name}</h4>
                          <p>{stop.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ FOOTER ══════════════ */}
        <footer className="footer" aria-label="Site footer">
          <div className="container">
            <div className="footer__grid">
              {/* Brand */}
              <div className="footer__brand">
                <div className="footer__brand-row">
                  <img src="/images/lda-logo-160.svg" alt="" className="footer__emblem" />
                  <div className="footer__name">Lucknow Tourism</div>
                </div>
                <p className="footer__tag">
                  City of Nawabs · Uttar Pradesh · India<br />
                  The finest cultural destination in North India.
                </p>
                <div className="footer__social" aria-label="Social media">
                  {/* Instagram */}
                  <a href="#" aria-label="Instagram">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                  </a>
                  {/* Facebook */}
                  <a href="#" aria-label="Facebook">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  </a>
                  {/* Twitter/X */}
                  <a href="#" aria-label="X (Twitter)">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  {/* YouTube */}
                  <a href="#" aria-label="YouTube">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
                    </svg>
                  </a>
                </div>
                <p className="footer__disclaimer">
                  This is an independent concept design for Lucknow Tourism.
                  Official tourism information: <a href="https://www.uptourism.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-bright)" }}>uptourism.gov.in</a>
                </p>
              </div>

              {/* Explore */}
              <div className="footer__col">
                <h4>Explore</h4>
                <ul role="list">
                  {["Destinations", "Heritage Sites", "Imambaras", "The Residency", "Hazratganj", "Gomti Riverfront"].map((l) => (
                    <li key={l}><a href="#">{l}</a></li>
                  ))}
                </ul>
              </div>

              {/* Culture */}
              <div className="footer__col">
                <h4>Culture</h4>
                <ul role="list">
                  {["Chikankari Craft", "Awadhi Cuisine", "Lucknow Festival", "Zardozi Work", "Classical Music", "Nawabi Architecture"].map((l) => (
                    <li key={l}><a href="#">{l}</a></li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div className="footer__col footer__contact">
                <h4>Plan Your Visit</h4>
                <p>
                  Lucknow, Uttar Pradesh<br />
                  226001, India<br /><br />
                  <a href="https://www.uptourism.gov.in" target="_blank" rel="noopener noreferrer">UP Tourism Portal</a><br />
                  <a href="https://lucknow.nic.in" target="_blank" rel="noopener noreferrer">Lucknow District</a>
                </p>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="footer__bottom">
              <p>© 2026 Lucknow Tourism Concept · Uttar Pradesh · India</p>
              <div style={{ display: "flex", gap: "24px" }}>
                <a href="#">Privacy</a>
                <a href="#">Terms</a>
                <a href="#">Sitemap</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
