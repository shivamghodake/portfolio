"use client";
import React, { useEffect, useRef, useState } from "react";
import { FiMail, FiGithub, FiLinkedin, FiFileText } from "react-icons/fi";

const Contact = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>, el: HTMLDivElement) => {
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--mouse-y", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  const email = "shivam.ghodake22@gmail.com";
  const github = "https://github.com/shivamghodake";
  const linkedIn = "https://www.linkedin.com/in/shivamghodake";
  const resumeUrl = "https://drive.google.com/file/d/1HJPS0oSPGPD4uB_neHOHpuaYmasBEXJd/view?usp=sharing";

  const links = [
    {
      label: "Email",
      value: email,
      href: `mailto:${email}`,
      icon: <FiMail size={17} />,
      accent: { bg: "rgba(99,210,255,0.08)", border: "rgba(99,210,255,0.2)", icon: "rgba(99,210,255,0.8)", glow: "rgba(59,130,246,0.1)" },
    },
    {
      label: "GitHub",
      value: "shivamghodake",
      href: github,
      icon: <FiGithub size={17} />,
      external: true,
      accent: { bg: "rgba(255,255,255,0.07)", border: "rgba(255,255,255,0.15)", icon: "rgba(255,255,255,0.7)", glow: "rgba(255,255,255,0.04)" },
    },
    {
      label: "LinkedIn",
      value: "shivamghodake",
      href: linkedIn,
      icon: <FiLinkedin size={17} />,
      external: true,
      accent: { bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.25)", icon: "#60a5fa", glow: "rgba(59,130,246,0.1)" },
    },
    {
      label: "Resume",
      value: "View / Download",
      href: resumeUrl,
      icon: <FiFileText size={17} />,
      external: true,
      accent: { bg: "rgba(34,197,94,0.08)", border: "rgba(34,197,94,0.22)", icon: "#4ade80", glow: "rgba(34,197,94,0.07)" },
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap');
        #contact, #contact * { font-family: 'Montserrat', sans-serif; }

        .contact-fade { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .contact-fade.show { opacity: 1; transform: translateY(0); }

        .contact-card {
          --mouse-x: 50%; --mouse-y: 50%;
          text-decoration: none;
          display: block;
          transition: box-shadow 0.35s ease, border-color 0.35s ease, transform 0.35s ease;
        }
        .contact-card::before {
          content: ''; position: absolute; inset: 0; border-radius: inherit;
          background: radial-gradient(160px circle at var(--mouse-x) var(--mouse-y), var(--card-glow, rgba(99,210,255,0.09)), transparent 70%);
          opacity: 0; transition: opacity 0.35s ease; pointer-events: none; z-index: 0;
        }
        .contact-card:hover::before { opacity: 1; }
        .contact-card:hover {
          transform: translateY(-4px) scale(1.012);
          box-shadow: 0 0 0 1px rgba(99,210,255,0.08), 0 20px 60px rgba(0,0,0,0.7), 0 0 60px var(--card-glow, rgba(59,130,246,0.08));
        }
        .contact-card-top-line {
          position: absolute; top: 0; left: 1.25rem; right: 1.25rem; height: 1px; border-radius: 99px;
          background: var(--card-top-line, linear-gradient(90deg, transparent, rgba(99,210,255,0.45), transparent));
          opacity: 0; transition: opacity 0.5s ease;
        }
        .contact-card:hover .contact-card-top-line { opacity: 1; }
        .contact-card:hover .contact-card-border { border-color: var(--card-border-hover, rgba(99,210,255,0.22)) !important; }

        .contact-icon-wrap {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .contact-card:hover .contact-icon-wrap {
          transform: scale(1.1);
          box-shadow: 0 0 20px var(--card-glow, rgba(99,210,255,0.2));
        }

        .contact-arrow {
          transition: transform 0.3s ease, color 0.3s ease;
          color: rgba(255,255,255,0.2);
        }
        .contact-card:hover .contact-arrow {
          transform: translateX(4px);
          color: rgba(255,255,255,0.5);
        }

        .contact-label { color: rgba(255,255,255,0.3); font-size: 10px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; }
        .contact-value { color: rgba(255,255,255,0.75); font-size: 13px; font-weight: 600; transition: color 0.3s ease; }
        .contact-card:hover .contact-value { color: rgba(255,255,255,0.95); }

        .contact-underline { height: 2px; background: linear-gradient(90deg, #3b82f6, #06b6d4, transparent); border-radius: 99px; width: 0; transition: width 0.6s ease; }
        .contact-underline.open { width: 3.5rem; }

        .contact-availability {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 14px; border-radius: 99px;
          background: rgba(34,197,94,0.07); border: 1px solid rgba(34,197,94,0.2);
          font-size: 11px; font-weight: 600; color: #4ade80; letter-spacing: 0.06em;
        }
        .contact-availability-dot {
          width: 7px; height: 7px; border-radius: 50%; background: #4ade80;
          box-shadow: 0 0 6px rgba(74,222,128,0.6);
          animation: pulse-dot 2s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { box-shadow: 0 0 6px rgba(74,222,128,0.6); transform: scale(1); }
          50% { box-shadow: 0 0 12px rgba(74,222,128,0.9); transform: scale(1.15); }
        }
      `}</style>

      <section
        ref={sectionRef}
        id="contact"
        className="relative py-14 sm:py-16 overflow-hidden text-white scroll-mt-20"
        style={{ background: "#080808", fontFamily: "'Montserrat', sans-serif" }}
      >
        {/* Background effects */}
        <div className="port-dot-bg absolute inset-0 opacity-60 pointer-events-none" />
        <div className="port-scan absolute inset-0" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(59,130,246,0.05) 0%, transparent 70%)", filter: "blur(40px)" }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at bottom, rgba(99,210,255,0.03) 0%, transparent 70%)", filter: "blur(50px)" }} />

        <div className="relative max-w-6xl mx-auto px-5 sm:px-8">

          {/* Heading */}
          <div className={`mb-10 contact-fade ${visible ? "show" : ""}`}>
            <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-3"
              style={{ color: "rgba(99,210,255,0.75)" }}>
              Get In Touch
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Let's Connect</h2>
              {/* <span className="contact-availability">
                <span className="contact-availability-dot" />
                Open to Opportunities
              </span> */}
            </div>
            <div className={`contact-underline ${visible ? "open" : ""}`} />
            {/* <p className="mt-4 max-w-lg text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>
              Whether it's a collaboration, opportunity, or just a tech discussion — feel free to reach out.
            </p> */}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {links.map((item, i) => {
              const cardRef = React.createRef<HTMLDivElement>();
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                  className={`contact-card contact-fade relative rounded-2xl ${visible ? "show" : ""}`}
                  style={{
                    transitionDelay: `${100 + i * 80}ms`,
                    "--card-glow": item.accent.glow,
                    "--card-border-hover": item.accent.border,
                    "--card-top-line": `linear-gradient(90deg, transparent, ${item.accent.icon}55, transparent)`,
                  } as React.CSSProperties}
                >
                  <div
                    ref={cardRef}
                    onMouseMove={(e) => cardRef.current && handleMove(e, cardRef.current)}
                    className="contact-card-border relative rounded-2xl p-5 sm:p-6 h-full"
                    style={{
                      background: "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    <div className="contact-card-top-line" />

                    <div className="relative z-10 flex items-center gap-4">

                      {/* Icon */}
                      <div
                        className="contact-icon-wrap shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                        style={{
                          background: item.accent.bg,
                          border: `1px solid ${item.accent.border}`,
                          color: item.accent.icon,
                        }}
                      >
                        {item.icon}
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <p className="contact-label">{item.label}</p>
                        <p className="contact-value truncate mt-0.5">{item.value}</p>
                      </div>

                      {/* Arrow */}
                      <span className="contact-arrow text-lg leading-none">→</span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
};

export default Contact;