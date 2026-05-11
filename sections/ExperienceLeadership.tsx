"use client";

import React, { useEffect, useRef, useState } from "react";
import { ExternalLink, Briefcase, Code2 } from "lucide-react";

const ExperienceLeadership = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMove = (e: React.MouseEvent, el: HTMLDivElement | null) => {
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--mouse-x", `${(x / r.width) * 100}%`);
    el.style.setProperty("--mouse-y", `${(y / r.height) * 100}%`);
  };

  const roles = [
    {
      title: "Software Engineer Intern",
      org: "SKS Enterprises",
      dates: "Jan 2026 – May 2026",
      highlights: [
        "Developing and improving features for production systems with a focus on reliability.",
        "Collaborating with the team to ship clean, maintainable engineering work.",
      ],
      label: "Engineering Internship",
      type: "engineering",
      certificate: "https://drive.google.com/file/d/1a3mep_UqJyamkATtbPP3cGJeW5PxQ5ve/view?usp=sharing",
    },
    {
      title: "Project Intern",
      org: "Sumago Infotech Pvt. Ltd.",
      dates: "Jul 2025 – Nov 2025",
      highlights: [
        "Built CyberSentinel: Secure platform for live network monitoring.",
        "Worked on alert pipelines and real-time threat detection flows.",
      ],
      label: "Sponsored Project",
      type: "project",
      certificate: "https://drive.google.com/file/d/1WN5RqWGhIWWdGDVLnqaanAIeNUZuk1fu/view?usp=sharing",
    },
    {
      title: "Project Intern",
      org: "Unique School App LLP",
      dates: "Jan 2025 – May 2025",
      highlights: [
        "Worked on Timetable Management System.",
        "Improved scheduling workflows and usability.",
      ],
      label: "Sponsored Project",
      type: "project",
      certificate: null,
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap');
        #experience, #experience * { font-family: 'Montserrat', sans-serif; }

        .exp-fade { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .exp-fade.show { opacity: 1; transform: translateY(0); }

        .exp-card {
          --mouse-x: 50%; --mouse-y: 50%;
          transition: box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .exp-card::before {
          content: ''; position: absolute; inset: 0; border-radius: inherit;
          background: radial-gradient(200px circle at var(--mouse-x) var(--mouse-y), rgba(99,210,255,0.08), transparent 70%);
          opacity: 0; transition: opacity 0.35s ease; pointer-events: none; z-index: 0;
        }
        .exp-card:hover::before { opacity: 1; }
        .exp-card:hover {
          border-color: rgba(99,210,255,0.2) !important;
          box-shadow: 0 0 0 1px rgba(99,210,255,0.12), 0 16px 48px rgba(0,0,0,0.6), 0 0 60px rgba(59,130,246,0.1);
        }
        .exp-card-top-line {
          position: absolute; top: 0; left: 1.5rem; right: 1.5rem; height: 1px; border-radius: 99px;
          background: linear-gradient(90deg, transparent, rgba(99,210,255,0.45), transparent);
          opacity: 0; transition: opacity 0.5s ease;
        }
        .exp-card:hover .exp-card-top-line { opacity: 1; }

        .exp-timeline-line {
          background: linear-gradient(to bottom, rgba(59,130,246,0.8), rgba(59,130,246,0.15), transparent);
        }
        .exp-dot {
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .exp-article:hover .exp-dot {
          box-shadow: 0 0 0 6px rgba(59,130,246,0.2), 0 0 16px rgba(59,130,246,0.4);
          transform: scale(1.2);
        }

        .exp-cert-btn {
          display: inline-flex; align-items: center; gap: 0.5rem;
          font-size: 0.75rem; font-weight: 600; letter-spacing: 0.03em;
          padding: 0.4rem 0.9rem; border-radius: 8px;
          border: 1px solid rgba(59,130,246,0.25);
          color: rgba(99,210,255,0.85); background: rgba(59,130,246,0.08);
          transition: all 0.2s ease;
        }
        .exp-cert-btn:hover { background: rgba(59,130,246,0.18); color: #fff; border-color: rgba(99,210,255,0.4); }

        .exp-underline { height: 2px; background: linear-gradient(90deg, #3b82f6, #06b6d4, transparent); border-radius: 99px; width: 0; transition: width 0.6s ease; }
        .exp-underline.open { width: 3.5rem; }

        .exp-badge-eng { background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.25); color: rgba(147,210,255,0.9); }
        .exp-badge-proj { background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.22); color: rgba(110,231,183,0.9); }
        .exp-dot-eng { background: #3b82f6; box-shadow: 0 0 0 4px rgba(59,130,246,0.15); }
        .exp-dot-proj { background: #10b981; box-shadow: 0 0 0 4px rgba(16,185,129,0.15); }
      `}</style>

      <section ref={sectionRef} id="experience"
        className="relative py-14 sm:py-16 overflow-hidden text-white scroll-mt-20"
        style={{ background: "#080808", fontFamily: "'Montserrat', sans-serif" }}>

        <div className="port-dot-bg absolute inset-0 opacity-60 pointer-events-none" />
        <div className="port-scan absolute inset-0" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(59,130,246,0.05) 0%, transparent 70%)", filter: "blur(40px)" }} />

        <div className="relative max-w-6xl mx-auto px-5 sm:px-8">

          {/* Heading */}
          <div className={`mb-10 exp-fade ${visible ? "show" : ""}`}>
            <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-3" style={{ color: "rgba(99,210,255,0.75)" }}>
              Professional Journey
            </p>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">Experience</h2>
            <div className={`exp-underline ${visible ? "open" : ""}`} />
            <p className="mt-4 max-w-lg text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>
              Hands-on engineering roles across internships and sponsored industry projects.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative pl-5 sm:pl-12">
            <div className="exp-timeline-line absolute left-2 sm:left-5 top-2 bottom-0 w-[2px]" />

            <div className="space-y-6">
              {roles.map((r, i) => (
                <article
                  key={`${r.title}-${r.org}`}
                  className="exp-article relative group"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  {/* Dot */}
                  <div className={`exp-dot absolute left-[-6px] sm:left-[-7px] top-6 h-3 w-3 rounded-full border-2 border-[#080808] z-10 ${r.type === "engineering" ? "exp-dot-eng" : "exp-dot-proj"}`} />

                  {/* Card */}
                  <div
                    ref={(el): void => { cardsRef.current[i] = el; }}
                    onMouseMove={(e) => handleMove(e, cardsRef.current[i])}
                    className={`exp-card exp-fade relative rounded-2xl p-5 sm:p-6 ml-4 sm:ml-6 ${visible ? "show" : ""}`}
                    style={{
                      background: "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      backdropFilter: "blur(12px)",
                      transitionDelay: `${i * 100}ms`,
                    }}
                  >
                    <div className="exp-card-top-line" />
                    <div className="relative z-10">

                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 w-9 h-9 shrink-0 rounded-xl flex items-center justify-center"
                            style={{ background: r.type === "engineering" ? "rgba(59,130,246,0.1)" : "rgba(16,185,129,0.08)", border: `1px solid ${r.type === "engineering" ? "rgba(59,130,246,0.22)" : "rgba(16,185,129,0.2)"}`, color: r.type === "engineering" ? "#60a5fa" : "#34d399" }}>
                            {r.type === "engineering" ? <Briefcase size={15} /> : <Code2 size={15} />}
                          </div>
                          <div>
                            <h3 className="text-base font-bold tracking-wide transition-colors duration-200 group-hover:text-white"
                              style={{ color: "rgba(255,255,255,0.88)" }}>{r.title}</h3>
                            <p className="text-sm font-medium mt-0.5" style={{ color: "rgba(99,210,255,0.8)" }}>{r.org}</p>
                            <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.32)" }}>{r.dates}</p>
                          </div>
                        </div>
                        <span className={`self-start text-xs font-semibold px-3 py-1 rounded-full shrink-0 ${r.type === "engineering" ? "exp-badge-eng" : "exp-badge-proj"}`}>
                          {r.label}
                        </span>
                      </div>

                      {/* Highlights */}
                      <ul className="space-y-2 mb-4">
                        {r.highlights.map((h) => (
                          <li key={h} className="flex gap-2.5 items-start text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.52)" }}>
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: r.type === "engineering" ? "#3b82f6" : "#10b981" }} />
                            {h}
                          </li>
                        ))}
                      </ul>

                      {/* Certificate */}
                      {r.certificate && (
                        <a href={r.certificate} target="_blank" rel="noopener noreferrer" className="exp-cert-btn">
                          <ExternalLink size={12} />
                          View Certificate
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ExperienceLeadership;