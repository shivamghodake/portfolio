"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const About = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.06 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>, el: HTMLDivElement) => {
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--mouse-y", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  const tags = [
    { label: "Final Year BTech IT · VIT Pune", accent: true },
    { label: "Former SWE Intern @ SKS Enterprises", accent: true },
    { label: "Former Chairperson @ Abhivriddhi", accent: true },
  ];

  const socialLinks = [
    {
      label: "GitHub",
      href: "https://github.com/shivamghodake",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/shivamghodake",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap');
        #about, #about * { font-family: 'Montserrat', sans-serif; }

        .about-fade { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .about-fade.show { opacity: 1; transform: translateY(0); }

        .about-photo-wrap {
          --mouse-x: 50%; --mouse-y: 50%;
          transition: box-shadow 0.4s ease, border-color 0.4s ease, transform 0.4s ease;
        }
        .about-photo-wrap::before {
          content: ''; position: absolute; inset: 0; border-radius: inherit;
          background: radial-gradient(250px circle at var(--mouse-x) var(--mouse-y), rgba(99,210,255,0.1), transparent 70%);
          opacity: 0; transition: opacity 0.4s ease; pointer-events: none; z-index: 2;
        }
        .about-photo-wrap:hover::before { opacity: 1; }
        .about-photo-wrap:hover {
          border-color: rgba(99,210,255,0.25) !important;
          box-shadow: 0 0 0 1px rgba(99,210,255,0.1), 0 20px 60px rgba(0,0,0,0.7), 0 0 80px rgba(59,130,246,0.12);
          transform: translateY(-4px);
        }

        .about-social-btn {
          transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
        }
        .about-social-btn:hover {
          background: rgba(255,255,255,0.09) !important;
          border-color: rgba(99,210,255,0.22) !important;
          color: white !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.4), 0 0 30px rgba(59,130,246,0.08);
        }

        .about-tag { transition: border-color 0.3s ease, background 0.3s ease; }
        .about-tag:hover { border-color: rgba(99,210,255,0.3) !important; }

        .about-para {
          opacity: 0; transform: translateY(14px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .about-para.show { opacity: 1; transform: translateY(0); }

        .about-underline { height: 2px; background: linear-gradient(90deg, #3b82f6, #06b6d4, transparent); border-radius: 99px; width: 0; transition: width 0.6s ease; }
        .about-underline.open { width: 3.5rem; }

        .about-photo-glow {
          position: absolute; inset: -1px; border-radius: inherit; z-index: 0; pointer-events: none;
          background: linear-gradient(135deg, rgba(59,130,246,0.15) 0%, transparent 50%, rgba(99,210,255,0.08) 100%);
          opacity: 0; transition: opacity 0.4s ease;
        }
        .about-photo-wrap:hover .about-photo-glow { opacity: 1; }

        .about-cta-btn {
          transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
        }
        .about-cta-btn:hover {
          background: rgba(59,130,246,0.28) !important;
          border-color: rgba(59,130,246,0.55) !important;
          color: #bfdbfe !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.4), 0 0 30px rgba(59,130,246,0.18);
        }
        .about-cta-arrow { display: inline-block; transition: transform 0.25s ease; }
        .about-cta-btn:hover .about-cta-arrow { transform: translateX(4px); }

        .about-availability-dot {
          width: 7px; height: 7px; border-radius: 50%; background: #4ade80;
          box-shadow: 0 0 6px rgba(74,222,128,0.6);
          animation: about-pulse 2s ease-in-out infinite;
        }
        @keyframes about-pulse {
          0%, 100% { box-shadow: 0 0 6px rgba(74,222,128,0.5); }
          50% { box-shadow: 0 0 12px rgba(74,222,128,0.9); }
        }
      `}</style>

      <section
        ref={sectionRef}
        id="about"
        className="relative py-14 sm:py-16 overflow-hidden text-white scroll-mt-20"
        style={{ background: "#080808", fontFamily: "'Montserrat', sans-serif" }}
      >
        <div className="port-dot-bg absolute inset-0 opacity-60 pointer-events-none" />
        <div className="port-scan absolute inset-0" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(59,130,246,0.05) 0%, transparent 70%)", filter: "blur(40px)" }}
        />

        <div className="relative max-w-6xl mx-auto px-5 sm:px-8">

          {/* Heading */}
          <div className={`mb-10 about-fade ${visible ? "show" : ""}`}>
            <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-3"
              style={{ color: "rgba(99,210,255,0.75)" }}>
              Who I Am
            </p>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">About Me</h2>
            <div className={`about-underline ${visible ? "open" : ""}`} />
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-12 gap-8 sm:gap-10 items-start">

            {/* Photo */}
            <div className={`md:col-span-4 about-fade ${visible ? "show" : ""}`}
              style={{ transitionDelay: "80ms" }}>
              <div
                className="about-photo-wrap relative rounded-2xl overflow-hidden cursor-default"
                style={{
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(59,130,246,0.04))",
                }}
                onMouseMove={(e) => handleMove(e, e.currentTarget as HTMLDivElement)}
              >
                <div className="about-photo-glow" />
                <div className="absolute top-0 left-6 right-6 h-px z-10 rounded-full"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(99,210,255,0.4), transparent)", opacity: 0.6 }} />
                <div className="relative aspect-[3/4] z-1">
                  <Image
                    src="/shivam.jpg"
                    alt="Shivam Ghodake"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 z-10"
                    style={{ background: "linear-gradient(to top, rgba(8,8,8,0.55) 0%, transparent 45%)" }} />
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="md:col-span-8 flex flex-col gap-5">

              {/* Tags */}
              <div className={`flex flex-wrap gap-2 about-fade ${visible ? "show" : ""}`}
                style={{ transitionDelay: "140ms" }}>
                {tags.map((t) => (
                  <span
                    key={t.label}
                    className="about-tag px-3 py-1 rounded-full text-xs font-semibold"
                    style={
                      t.accent
                        ? { background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)", color: "#93c5fd" }
                        : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }
                    }
                  >
                    {t.label}
                  </span>
                ))}
              </div>

              {/* Paragraph */}
              <p
                className={`about-para text-sm leading-7 ${visible ? "show" : ""}`}
                style={{ color: "rgba(255,255,255,0.68)", transitionDelay: "210ms" }}
              >
                Hello, I&apos;m a Software Engineer passionate about building scalable
                applications and solving real-world problems. My foundation is
                rooted in Data Structures, Object oriented programming, and System Design, with hands-on
                experience in Java, C++, and C.
              </p>

              {/* CTA card */}
              <div
                className={`about-para relative rounded-2xl p-5 ${visible ? "show" : ""}`}
                style={{
                  transitionDelay: "300ms",
                  background: "linear-gradient(135deg, rgba(59,130,246,0.07) 0%, rgba(99,210,255,0.03) 100%)",
                  border: "1px solid rgba(59,130,246,0.18)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="absolute top-0 left-6 right-6 h-px rounded-full"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(99,210,255,0.35), transparent)" }} />

                <div className="flex items-center gap-2 mb-2">
                  <span className="about-availability-dot" />
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase"
                    style={{ color: "rgba(99,210,255,0.6)" }}>
                    Open to opportunities
                  </p>
                </div>

                <p className="text-sm leading-relaxed mb-4"
                  style={{ color: "rgba(255,255,255,0.45)" }}>
                  Whether it&apos;s a collaboration, a challenging role, or just a good tech conversation, I&apos;d love to hear from you.
                </p>

                <a
                  href="#contact"
                  className="about-cta-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold"
                  style={{
                    background: "rgba(59,130,246,0.15)",
                    border: "1px solid rgba(59,130,246,0.3)",
                    color: "#93c5fd",
                  }}
                >
                  Let&apos;s Connect
                  <span className="about-cta-arrow">→</span>
                </a>
              </div>

              {/* Divider */}
              <div className={`about-fade h-px ${visible ? "show" : ""}`}
                style={{ background: "rgba(255,255,255,0.07)", transitionDelay: "390ms" }} />

              {/* Social links */}
              <div className={`flex flex-wrap gap-3 about-fade ${visible ? "show" : ""}`}
                style={{ transitionDelay: "440ms" }}>
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="about-social-btn inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.09)",
                      color: "rgba(255,255,255,0.65)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {link.icon}
                    {link.label}
                    <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "13px" }}>→</span>
                  </a>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;