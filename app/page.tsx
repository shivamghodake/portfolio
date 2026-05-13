"use client";

import { useEffect, useState } from "react";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Education from "@/sections/Education";
import Projects from "@/sections/Projects";
import Skills from "@/sections/Skills";
import ExperienceLeadership from "@/sections/ExperienceLeadership";
import ClubsCommittees from "@/sections/ClubsCommittees";
import Publications from "@/sections/Publications";
import Contact from "@/sections/Contact";
import { Roboto } from "next/font/google";
import ScrollToTop from "@/components/ScrollToTop";

/* ─────────────────────────────────────────────
   NAV ITEMS
───────────────────────────────────────────── */
const NAV_ITEMS = [
  { label: "About",      href: "#about" },
  { label: "Education",  href: "#education" },
  { label: "Projects",   href: "#projects" },
  { label: "Skills",     href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact" },
];

/* ─────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active,   setActive]   = useState("");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV_ITEMS.forEach(({ href }) => {
      const el = document.getElementById(href.slice(1));
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }), 40);
  };

  return (
    <>
      <style>{`
        .nav-root * { font-family: 'Montserrat', sans-serif; }

        /* Desktop link */
        .nav-lnk {
          position: relative;
          font-size: 11.5px; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          text-decoration: none; padding: 4px 0;
          transition: color 0.25s;
          white-space: nowrap;
        }
        .nav-lnk::after {
          content: ''; position: absolute; bottom: -2px; left: 0;
          width: 0; height: 1.5px; border-radius: 99px;
          background: linear-gradient(90deg, #3b82f6, #06b6d4);
          transition: width 0.3s ease;
        }
        .nav-lnk:hover        { color: rgba(255,255,255,0.92); }
        .nav-lnk:hover::after { width: 100%; }
        .nav-lnk.on           { color: #93c5fd; }
        .nav-lnk.on::after    { width: 100%; }

        /* Resume button */
        .nav-resume {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 7px 16px; border-radius: 10px;
          background: rgba(59,130,246,0.1);
          border: 1px solid rgba(59,130,246,0.28);
          color: #93c5fd;
          font-size: 11px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase;
          text-decoration: none; white-space: nowrap;
          transition: background 0.25s, border-color 0.25s, transform 0.25s, box-shadow 0.25s, color 0.25s;
        }
        .nav-resume:hover {
          background: rgba(59,130,246,0.22);
          border-color: rgba(59,130,246,0.55);
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(59,130,246,0.2);
          color: #bfdbfe;
        }

        /* Hamburger */
        .ham-bar {
          display: block; width: 20px; height: 1.5px; border-radius: 99px;
          background: rgba(255,255,255,0.75);
          transition: transform 0.3s, opacity 0.3s, width 0.3s;
          transform-origin: center;
        }
        .ham-open .ham-bar:nth-child(1) { transform: translateY(5.5px) rotate(45deg); }
        .ham-open .ham-bar:nth-child(2) { opacity: 0; width: 0; }
        .ham-open .ham-bar:nth-child(3) { transform: translateY(-5.5px) rotate(-45deg); }

        /* Mobile drawer */
        .mob-drawer {
          max-height: 0; overflow: hidden; opacity: 0;
          transition: max-height 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.3s;
        }
        .mob-drawer.open { max-height: 600px; opacity: 1; }

        /* Mobile link */
        .mob-lnk {
          display: flex; align-items: center; gap: 10px;
          padding: 13px 24px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.09em; text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          text-decoration: none;
          transition: color 0.2s, background 0.2s, padding-left 0.2s;
        }
        .mob-lnk:hover       { color: rgba(255,255,255,0.9); background: rgba(255,255,255,0.025); padding-left: 30px; }
        .mob-lnk.on          { color: #60a5fa; background: rgba(59,130,246,0.05); }

        /* Nav dot pulse */
        .nav-dot {
          width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0;
          background: #3b82f6; box-shadow: 0 0 8px rgba(59,130,246,0.65);
          animation: ndp 2.5s ease-in-out infinite;
        }
        @keyframes ndp {
          0%,100% { box-shadow: 0 0 8px rgba(59,130,246,0.55); }
          50%      { box-shadow: 0 0 18px rgba(59,130,246,0.95), 0 0 36px rgba(59,130,246,0.35); }
        }

        /* Responsive helpers */
        @media (max-width: 767px) {
          .nav-desktop { display: none !important; }
          .nav-ham     { display: flex !important; }
        }
        @media (min-width: 768px) {
          .nav-ham     { display: none !important; }
          .nav-desktop { display: flex !important; }
          .mob-drawer  { display: none !important; }
        }
      `}</style>

      <header
        className="nav-root"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          background: scrolled ? "rgba(8,8,8,0.92)" : "rgba(8,8,8,0.5)",
          borderBottom: scrolled ? "1px solid rgba(99,210,255,0.1)" : "1px solid transparent",
          boxShadow: scrolled ? "0 8px 40px rgba(0,0,0,0.5), 0 1px 0 rgba(99,210,255,0.05)" : "none",
          backdropFilter: "blur(20px) saturate(1.4)",
          transition: "background 0.4s, border-color 0.4s, box-shadow 0.4s",
        }}
      >
        <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "62px" }}>

            {/* Logo */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); setMenuOpen(false); }}
              style={{ display: "flex", alignItems: "center", gap: "9px", textDecoration: "none", flexShrink: 0 }}
            >
              <span className="nav-dot" />
              <span style={{ fontWeight: 800, fontSize: "15px", letterSpacing: "0.03em", color: "#ffffff" }}>
                Shivam Ghodake<span style={{ color: "#60a5fa" }}></span>
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="nav-desktop" style={{ alignItems: "center", gap: "26px" }}>
              {NAV_ITEMS.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => { e.preventDefault(); scrollTo(href); }}
                  className={`nav-lnk${active === href.slice(1) ? " on" : ""}`}
                >
                  {label}
                </a>
              ))}
            </nav>

            {/* Desktop Resume */}
            <a
              href="https://drive.google.com/file/d/1HJPS0oSPGPD4uB_neHOHpuaYmasBEXJd/view?usp=sharing"
              target="_blank" rel="noreferrer"
              className="nav-resume nav-desktop"
            >
              Resume ↗
            </a>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className={`nav-ham flex-col gap-[5px] items-center justify-center ${menuOpen ? "ham-open" : ""}`}
              style={{
                display: "none", /* overridden by CSS */
                width: "40px", height: "40px", borderRadius: "10px",
                background: menuOpen ? "rgba(59,130,246,0.1)" : "rgba(255,255,255,0.04)",
                border: menuOpen ? "1px solid rgba(59,130,246,0.28)" : "1px solid rgba(255,255,255,0.07)",
                cursor: "pointer", flexShrink: 0,
                transition: "background 0.2s, border-color 0.2s",
              }}
              aria-label="Toggle menu"
            >
              <span className="ham-bar" />
              <span className="ham-bar" />
              <span className="ham-bar" />
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <div
          className={`mob-drawer ${menuOpen ? "open" : ""}`}
          style={{ background: "rgba(8,8,8,0.97)", borderTop: "1px solid rgba(255,255,255,0.05)", backdropFilter: "blur(24px)" }}
        >
          <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.5), rgba(6,182,212,0.45), transparent)" }} />

          {NAV_ITEMS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => { e.preventDefault(); scrollTo(href); }}
              className={`mob-lnk${active === href.slice(1) ? " on" : ""}`}
            >
              <span style={{
                width: "5px", height: "5px", borderRadius: "50%", flexShrink: 0,
                background: active === href.slice(1) ? "#3b82f6" : "rgba(99,210,255,0.25)",
                boxShadow: active === href.slice(1) ? "0 0 8px rgba(59,130,246,0.6)" : "none",
                transition: "background 0.2s, box-shadow 0.2s",
              }} />
              {label}
            </a>
          ))}

          <div style={{ padding: "12px 20px 18px" }}>
            <a
              href="https://drive.google.com/file/d/1HJPS0oSPGPD4uB_neHOHpuaYmasBEXJd/view?usp=sharing"
              target="_blank" rel="noreferrer"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                padding: "11px", borderRadius: "12px",
                background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.28)",
                color: "#93c5fd", fontSize: "11px", fontWeight: 800,
                letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none",
              }}
            >
              View Resume ↗
            </a>
          </div>
        </div>
      </header>
    </>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background: "#080808", position: "relative", overflow: "hidden" }}>
      <div className="port-dot-bg absolute inset-0 pointer-events-none" style={{ opacity: 0.4 }} aria-hidden="true" />
      <div className="port-scan absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.45), rgba(6,182,212,0.4), transparent)" }} />
      <div aria-hidden="true" style={{
        position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "500px", height: "160px",
        background: "radial-gradient(ellipse at bottom, rgba(59,130,246,0.07) 0%, transparent 70%)",
        filter: "blur(32px)", pointerEvents: "none",
      }} />
      <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "32px 20px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px", textAlign: "center" }}>
          {/* <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#3b82f6", boxShadow: "0 0 8px rgba(59,130,246,0.6)", display: "inline-block" }} />
            <span style={{ fontWeight: 800, fontSize: "13px", letterSpacing: "0.04em", color: "rgba(255,255,255,0.55)" }}>
              Shivam<span style={{ color: "#60a5fa" }}>.</span>
            </span>
          </div> */}
          <div/>
          <div>
            <p style={{ fontSize: "11.5px", fontWeight: 600, color: "rgba(255,255,255,0.28)", letterSpacing: "0.04em", marginBottom: "3px" }}>
              © {new Date().getFullYear()} Shivam Ghodake. All rights reserved.
            </p>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.18)", letterSpacing: "0.03em" }}>
              Made with <span style={{ color: "#60a5fa" }}>💙</span> by Shivam
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function Home() {
  return (
    <main style={{ minHeight: "100vh", background: "#080808", color: "#ffffff", position: "relative" }}>

      {/* ═══════════════════════════════════════════
          GLOBAL BG LAYERS — fixed, behind everything
          These make Hero + About + all sections look
          like one continuous surface
      ═══════════════════════════════════════════ */}

      {/* Dot grid */}
      <div aria-hidden="true" className="port-dot-bg"
        style={{ position: "fixed", inset: 0, zIndex: 0, opacity: 0.5, pointerEvents: "none" }} />

      {/* Scan lines */}
      <div aria-hidden="true" className="port-scan"
        style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />

      {/* Top ambient glow */}
      <div aria-hidden="true" style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 1000px 450px at 50% 0%, rgba(59,130,246,0.06) 0%, transparent 70%)",
      }} />

      {/* ═══════════════════════════════════════════
          GRADIENT BRIDGE — blends Hero → About
          This sits over the Hero bottom edge and
          fades into the #080808 + dot grid below
      ═══════════════════════════════════════════ */}
      <div aria-hidden="true" style={{
        position: "absolute",
        /* Positioned at Hero bottom — 100vh from top */
        top: "calc(100vh - 120px)",
        left: 0, right: 0,
        height: "200px",
        zIndex: 2,
        pointerEvents: "none",
        background: "linear-gradient(to bottom, transparent 0%, rgba(8,8,8,0.6) 40%, #080808 100%)",
      }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />

        <div style={{ paddingTop: "62px" }}>
          <Hero />
          <About />
          <Education />
          <Projects />
          <Skills />
          <ExperienceLeadership />
          <ClubsCommittees />
          <Publications />
          <Contact />
        </div>

        <Footer />
        <ScrollToTop />
      </div>
    </main>
  );
}