"use client";

import React, { useEffect, useRef, useState } from "react";
import { FiGithub, FiArrowUpRight } from "react-icons/fi";

const Projects = () => {
  const projects = [
    {
      title: "Customised Virtual File System",
      desc: "Unix-like virtual file system built in C with core file operations, metadata handling, and memory management.",
      tech: ["C", "DSA", "File System"],
      github: "https://github.com/shivamghodake/CVFS",
      number: "01",
    },
    {
      title: "Mutual Funds Recommendation",
      desc: "Personalized investment platform using portfolio optimization and risk-return balancing.",
      tech: ["Python", "Flask", "Streamlit"],
      github: "https://github.com/shivamghodake/-Personalized-Mutual-Funds-Recommendation-and-Portfolio-Management",
      number: "02",
    },
    {
      title: "Surplus Food Redistribution",
      desc: "System to manage and distribute surplus food efficiently using Java-based GUI.",
      tech: ["Java", "Swing", "MySQL"],
      github: "https://github.com/shivamghodake/Leftover-Food-Management-System",
      number: "03",
    },
    {
      title: "Spell Checker & Corrector",
      desc: "C++ program to detect and correct spelling using string manipulation algorithms.",
      tech: ["C++", "Algorithms"],
      github: "https://github.com/shivamghodake/Spell_Checker_Using_CPP",
      number: "04",
    },
    {
      title: "Timetable Management System",
      desc: "Automated scheduling platform with conflict resolution and role-based access.",
      tech: ["Python", "Flask", "MySQL"],
      github: "https://github.com/shivamghodake/unique-school-timetable-system",
      number: "05",
    },
  ];

  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("show");
        });
      },
      { threshold: 0.12 }
    );
    cardsRef.current.forEach((card) => { if (card) observer.observe(card); });
    return () => observer.disconnect();
  }, []);

  const handleMove = (e: React.MouseEvent, ref: HTMLDivElement | null) => {
    if (!ref) return;
    const rect = ref.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ref.style.transform = `perspective(800px) rotateX(${-(y / rect.height - 0.5) * 10}deg) rotateY(${(x / rect.width - 0.5) * 10}deg) scale(1.03)`;
    ref.style.setProperty("--mouse-x", `${(x / rect.width) * 100}%`);
    ref.style.setProperty("--mouse-y", `${(y / rect.height) * 100}%`);
  };

  const reset = (ref: HTMLDivElement | null) => {
    if (!ref) return;
    ref.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale(1)";
  };

  const tagColors: Record<number, string> = {
    0: "text-cyan-300 border-cyan-400/30 bg-cyan-500/10",
    1: "text-violet-300 border-violet-400/30 bg-violet-500/10",
    2: "text-emerald-300 border-emerald-400/30 bg-emerald-500/10",
    3: "text-rose-300 border-rose-400/30 bg-rose-500/10",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap');
        #projects, #projects * { font-family: 'Montserrat', sans-serif; }

        .portfolio-section {
          background: #080808;
        }
        .port-dot-bg {
          background-image: radial-gradient(circle, rgba(255,255,255,0.045) 1px, transparent 1px);
          background-size: 28px 28px;
        }
        .port-scan {
          background: linear-gradient(to bottom, transparent 0%, rgba(99,210,255,0.035) 50%, transparent 100%);
          background-size: 100% 4px;
          animation: port-scan 8s linear infinite;
          pointer-events: none;
        }
        @keyframes port-scan { 0% { background-position: 0 0; } 100% { background-position: 0 100%; } }

        .port-heading-label { color: rgba(99,210,255,0.75); }
        .port-heading-line {
          height: 2px;
          background: linear-gradient(90deg, #3b82f6, #06b6d4, transparent);
          border-radius: 99px; width: 0; transition: width 0.6s ease;
        }
        .port-heading-line.open { width: 3.5rem; }

        .fade-up { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .fade-up.show { opacity: 1; transform: translateY(0); }

        .port-card {
          --mouse-x: 50%; --mouse-y: 50%;
          transition: transform 0.25s ease, box-shadow 0.3s ease;
        }
        .port-card::before {
          content: ''; position: absolute; inset: 0; border-radius: inherit;
          background: radial-gradient(180px circle at var(--mouse-x) var(--mouse-y), rgba(99,210,255,0.11), transparent 70%);
          opacity: 0; transition: opacity 0.35s ease; pointer-events: none; z-index: 1;
        }
        .port-card:hover::before { opacity: 1; }
        .port-card:hover {
          box-shadow: 0 0 0 1px rgba(99,210,255,0.18), 0 20px 60px rgba(0,0,0,0.7), 0 0 80px rgba(59,130,246,0.12);
        }
        .port-card-top-line {
          position: absolute; top: 0; left: 1.5rem; right: 1.5rem; height: 1px; border-radius: 99px;
          background: linear-gradient(90deg, transparent, rgba(99,210,255,0.5), transparent);
          opacity: 0; transition: opacity 0.5s ease;
        }
        .port-card:hover .port-card-top-line { opacity: 1; }

        .number-badge {
          font-weight: 800; font-size: 3rem; line-height: 1; letter-spacing: -0.05em;
          background: linear-gradient(135deg, rgba(255,255,255,0.055), rgba(255,255,255,0.01));
          -webkit-background-clip: text; background-clip: text; color: transparent;
          position: absolute; top: 1rem; right: 1.25rem; pointer-events: none; user-select: none;
        }
        .tech-tag {
          font-size: 0.7rem; font-weight: 500; letter-spacing: 0.04em;
          padding: 0.2rem 0.65rem; border-radius: 999px; border-width: 1px; border-style: solid;
        }
        .github-btn {
          display: flex; align-items: center; gap: 0.4rem;
          font-size: 0.8rem; font-weight: 500; letter-spacing: 0.02em;
          color: rgba(255,255,255,0.5); padding: 0.45rem 0.9rem; border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.07);
          transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
          background: rgba(255,255,255,0.03);
        }
        .github-btn:hover { color: #fff; border-color: rgba(99,210,255,0.3); background: rgba(99,210,255,0.07); }
      `}</style>

      <section id="projects" className="portfolio-section relative py-14 sm:py-16 overflow-hidden text-white scroll-mt-20">
        <div className="port-dot-bg absolute inset-0 opacity-60 pointer-events-none" />
        <div className="port-scan absolute inset-0" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(59,130,246,0.05) 0%, transparent 70%)", filter: "blur(40px)" }} />

        <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
          <div className="mb-10 fade-up show">
            <p className="port-heading-label text-xs font-semibold tracking-[0.25em] uppercase mb-3">Selected Work</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">Projects</h2>
            <div className="port-heading-line open" />
            <p className="mt-4 max-w-lg text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>
              Engineering projects that tackle real-world constraints — from systems programming to intelligent web platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((p, i) => (
              <div
                key={p.title}
                ref={(el): void => { cardsRef.current[i] = el; }}
                onMouseMove={(e) => handleMove(e, cardsRef.current[i])}
                onMouseLeave={() => { reset(cardsRef.current[i]); setActiveIndex(null); }}
                onMouseEnter={() => setActiveIndex(i)}
                className="fade-up port-card group relative rounded-2xl p-6 flex flex-col"
                style={{
                  background: "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  backdropFilter: "blur(12px)",
                  transitionDelay: `${i * 80}ms`,
                  willChange: "transform",
                }}
              >
                <div className="port-card-top-line" />
                <span className="number-badge">{p.number}</span>
                <div className="relative z-10 flex flex-col h-full">
                  <h3 className="text-base font-bold mb-2 pr-10 leading-snug transition-colors duration-200 group-hover:text-white"
                    style={{ color: "rgba(255,255,255,0.85)" }}>
                    {p.title}
                  </h3>
                  <p className="text-sm mb-5 flex-grow leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
                    {p.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.tech.map((t, idx) => (
                      <span key={t} className={`tech-tag ${tagColors[idx % 4]}`}>{t}</span>
                    ))}
                  </div>
                  <a href={p.github} target="_blank" rel="noreferrer" className="github-btn mt-auto self-start">
                    <FiGithub size={13} />
                    View on GitHub
                    <FiArrowUpRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;