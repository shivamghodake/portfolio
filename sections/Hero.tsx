"use client";

import { useEffect, useRef, useState } from "react";

const ROLES = ["BTech Student", "Problem Solver", "Learner", "Software Engineer"];

const Hero = () => {
  const [roleIdx,    setRoleIdx]    = useState(0);
  const [displayed,  setDisplayed]  = useState("");
  const [deleting,   setDeleting]   = useState(false);
  const [visible,    setVisible]    = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* mount fade */
  useEffect(() => { const t = setTimeout(() => setVisible(true), 80); return () => clearTimeout(t); }, []);

  /* typewriter */
  useEffect(() => {
    const current = ROLES[roleIdx];
    if (!deleting && displayed.length < current.length) {
      timeoutRef.current = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === current.length) {
      timeoutRef.current = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeoutRef.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % ROLES.length);
    }
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [displayed, deleting, roleIdx]);

  return (
    <>
      <style>{`
        #hero, #hero * { font-family: 'Montserrat', sans-serif; }

        .hero-fade { opacity: 0; transform: translateY(24px); transition: opacity 0.8s ease, transform 0.8s ease; }
        .hero-fade.show { opacity: 1; transform: translateY(0); }

        /* Primary button — matches About "Let's Connect" */
        .hero-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 26px; border-radius: 12px;
          background: rgba(59,130,246,0.18);
          border: 1px solid rgba(59,130,246,0.4);
          color: #93c5fd;
          font-size: 13px; font-weight: 700; letter-spacing: 0.04em;
          text-decoration: none; cursor: pointer;
          transition: background 0.25s, border-color 0.25s, color 0.25s, transform 0.25s, box-shadow 0.25s;
          font-family: 'Montserrat', sans-serif;
          white-space: nowrap;
        }
        .hero-btn-primary:hover {
          background: rgba(59,130,246,0.3);
          border-color: rgba(59,130,246,0.6);
          color: #bfdbfe;
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(0,0,0,0.45), 0 0 30px rgba(59,130,246,0.2);
        }

        /* Ghost button — matches About social buttons */
        .hero-btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 22px; border-radius: 12px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.65);
          font-size: 13px; font-weight: 700; letter-spacing: 0.04em;
          text-decoration: none; cursor: pointer;
          transition: background 0.25s, border-color 0.25s, color 0.25s, transform 0.25s, box-shadow 0.25s;
          font-family: 'Montserrat', sans-serif;
          white-space: nowrap;
          backdrop-filter: blur(8px);
        }
        .hero-btn-ghost:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(99,210,255,0.28);
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(0,0,0,0.4);
        }

        /* Skill tag — matches About tags */
        .hero-tag {
          display: inline-flex; align-items: center;
          padding: 5px 12px; border-radius: 99px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          color: rgba(255,255,255,0.55);
          font-size: 11px; font-weight: 600; letter-spacing: 0.04em;
          transition: border-color 0.25s, color 0.25s;
          white-space: nowrap;
        }
        .hero-tag:hover {
          border-color: rgba(99,210,255,0.25);
          color: rgba(255,255,255,0.8);
        }

        /* Typewriter cursor */
        .cursor {
          display: inline-block; width: 2px; height: 1em;
          background: #60a5fa; border-radius: 1px;
          margin-left: 2px; vertical-align: text-bottom;
          animation: cur-blink 1s step-end infinite;
        }
        @keyframes cur-blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }

        /* Scroll cue */
        .scroll-cue-arrow {
          animation: scroll-bounce 2s ease-in-out infinite;
        }
        @keyframes scroll-bounce {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50%       { transform: translateY(6px); opacity: 1; }
        }

        /* Mobile responsive */
        @media (max-width: 640px) {
          .hero-title     { font-size: 36px !important; }
          .hero-role      { font-size: 18px !important; }
          .hero-btn-row   { flex-direction: column !important; align-items: stretch !important; }
          .hero-btn-row a,
          .hero-btn-row button { justify-content: center !important; }
          .hero-tags-row  { gap: 6px !important; }
        }
      `}</style>

      <section
        id="hero"
        style={{
          /* ★ KEY FIX: #080808 — exactly matches About/Education */
          background: "#080808",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          padding: "80px 20px 60px",
        }}
      >
        {/* Section-level ambient glow — same as About/Education */}
        <div aria-hidden="true" style={{
          position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
          width: "700px", height: "300px", pointerEvents: "none",
          background: "radial-gradient(ellipse at center, rgba(59,130,246,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
        }} />

        {/* Side glows */}
        <div aria-hidden="true" style={{
          position: "absolute", top: "30%", left: "-10%",
          width: "400px", height: "400px", pointerEvents: "none",
          background: "radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
        }} />
        <div aria-hidden="true" style={{
          position: "absolute", top: "40%", right: "-10%",
          width: "350px", height: "350px", pointerEvents: "none",
          background: "radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
        }} />

        {/* ── Content ── */}
        <div style={{ maxWidth: "800px", width: "100%", textAlign: "center", position: "relative", zIndex: 1 }}>

          {/* Eyebrow — matches Education/About eyebrow style */}
          {/* <div className={`hero-fade ${visible ? "show" : ""}`} style={{ marginBottom: "20px" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "5px 14px", borderRadius: "99px",
              background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.22)",
              fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase",
              color: "rgba(99,210,255,0.8)",
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px rgba(74,222,128,0.7)", animation: "about-pulse 2s ease-in-out infinite" }} />
              Available for opportunities
            </span>
          </div> */}

          {/* Name */}
          <h1
            className={`hero-title hero-fade ${visible ? "show" : ""}`}
            style={{
              fontSize: "clamp(40px, 8vw, 72px)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "#ffffff",
              marginBottom: "16px",
              transitionDelay: "80ms",
            }}
          >
            Hi, I&apos;m{" "}
            <span style={{
              background: "linear-gradient(135deg, #60a5fa 0%, #06b6d4 50%, #3b82f6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Shivam Ghodake
            </span>
          </h1>

          {/* Typewriter role */}
          <div
            className={`hero-role hero-fade ${visible ? "show" : ""}`}
            style={{
              fontSize: "clamp(18px, 3.5vw, 26px)",
              fontWeight: 600,
              color: "rgba(255,255,255,0.6)",
              marginBottom: "24px",
              minHeight: "1.5em",
              transitionDelay: "140ms",
            }}
          >
            <span style={{ color: "rgba(99,210,255,0.65)" }}>{"// "}</span>
            {displayed}
            <span className="cursor" />
          </div>

          {/* Description */}
          <p
            className={`hero-fade ${visible ? "show" : ""}`}
            style={{
              fontSize: "clamp(14px, 2vw, 16px)",
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.45)",
              maxWidth: "580px",
              margin: "0 auto 36px",
              transitionDelay: "200ms",
            }}
          >
            I am a full-stack software developer focused on building scalable systems and solving real-world problems through efficient, production-ready applications with strong emphasis on system design, backend engineering, and performance optimization.
          </p>

          {/* CTA Buttons */}
          <div
            className={`hero-btn-row hero-fade ${visible ? "show" : ""}`}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              flexWrap: "wrap",
              marginBottom: "40px",
              transitionDelay: "270ms",
            }}
          >
            <a href="#projects" className="hero-btn-primary"
              onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}>
              View Projects →
            </a>
            <a
              href="https://drive.google.com/file/d/1HJPS0oSPGPD4uB_neHOHpuaYmasBEXJd/view?usp=sharing"
              target="_blank" rel="noreferrer"
              className="hero-btn-ghost"
            >
              Download Resume ↗
            </a>
            <a href="#contact" className="hero-btn-ghost"
              onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}>
              Contact
            </a>
          </div>

          {/* Skill tags — same style as About tags */}
          <div
            className={`hero-tags-row hero-fade ${visible ? "show" : ""}`}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "8px",
              marginBottom: "60px",
              transitionDelay: "350ms",
            }}
          >
            {/* {["DSA", "OOP", "System Design", "Java", "Python", "C", "Spring Boot"].map((tag) => (
              <span key={tag} className="hero-tag">{tag}</span>
            ))} */}
          </div>

          {/* Scroll cue */}
          <div
            className={`hero-fade ${visible ? "show" : ""}`}
            style={{ transitionDelay: "450ms" }}
          >
            <div
              style={{ cursor: "pointer" }}
              onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
            >
              <p style={{
                fontSize: "9px", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.18)", marginBottom: "8px",
              }}>
                SCROLL
              </p>
              <div className="scroll-cue-arrow" style={{ display: "flex", justifyContent: "center" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2v12M3 9l5 5 5-5" stroke="rgba(99,210,255,0.45)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default Hero;