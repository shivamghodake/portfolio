"use client";

import { useEffect, useRef, useState } from "react";

type EducationItem = {
  institution: string;
  degree: string;
  dates: string;
  score: string;
  scoreLabel: string;
  icon: string;
  current?: boolean;
};

const Education = () => {
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

  const items: EducationItem[] = [
    {
      institution: "Vishwakarma Institute of Technology, Pune",
      degree: "BTech — Information Technology",
      dates: "Nov 2022 – Jun 2026",
      score: "8.88",
      scoreLabel: "CGPA",
      icon: "🎓",
      // current: true,
    },
    {
      institution: "Trimurti Secondary & Higher Secondary School, Ghogargaon",
      degree: "HSC — Science",
      dates: "Mar 2022",
      score: "86.33%",
      scoreLabel: "Score",
      icon: "📘",
    },
    {
      institution: "Kai Sau Badambai D. Gandhi Vidya Mandir, Newasa",
      degree: "SSC",
      dates: "Mar 2020",
      score: "94.60%",
      scoreLabel: "Score",
      icon: "📗",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap');
        #education, #education * { font-family: 'Montserrat', sans-serif; }

        .edu-fade { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .edu-fade.show { opacity: 1; transform: translateY(0); }

        .edu-card {
          --mouse-x: 50%; --mouse-y: 50%;
          transition: box-shadow 0.35s ease, border-color 0.35s ease, transform 0.35s ease;
        }
        .edu-card::before {
          content: ''; position: absolute; inset: 0; border-radius: inherit;
          background: radial-gradient(200px circle at var(--mouse-x) var(--mouse-y), rgba(99,210,255,0.08), transparent 70%);
          opacity: 0; transition: opacity 0.35s ease; pointer-events: none; z-index: 0;
        }
        .edu-card:hover::before { opacity: 1; }
        .edu-card:hover {
          border-color: rgba(99,210,255,0.2) !important;
          box-shadow: 0 0 0 1px rgba(99,210,255,0.08), 0 16px 50px rgba(0,0,0,0.65), 0 0 60px rgba(59,130,246,0.09);
          transform: translateY(-3px);
        }
        .edu-card-top-line {
          position: absolute; top: 0; left: 1.5rem; right: 1.5rem; height: 1px; border-radius: 99px;
          background: linear-gradient(90deg, transparent, rgba(99,210,255,0.45), transparent);
          opacity: 0; transition: opacity 0.5s ease;
        }
        .edu-card:hover .edu-card-top-line { opacity: 1; }

        .edu-timeline-line {
          background: linear-gradient(to bottom, rgba(59,130,246,0.7), rgba(59,130,246,0.15), transparent);
        }
        .edu-dot {
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .edu-group:hover .edu-dot {
          box-shadow: 0 0 0 6px rgba(59,130,246,0.2), 0 0 14px rgba(59,130,246,0.35) !important;
          transform: scale(1.2);
        }

        .edu-score-bar-track {
          height: 3px; border-radius: 99px;
          background: rgba(255,255,255,0.07);
          overflow: hidden;
          margin-top: 10px;
        }
        .edu-score-bar-fill {
          height: 100%; border-radius: 99px;
          background: linear-gradient(90deg, #3b82f6, #06b6d4);
          width: 0;
          transition: width 1s cubic-bezier(0.16,1,0.3,1);
        }
        .edu-score-bar-fill.animate { width: var(--bar-width); }

        .edu-current-badge {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 3px 10px; border-radius: 99px;
          background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.25);
          font-size: 10px; font-weight: 600; color: #60a5fa; letter-spacing: 0.08em;
        }
        .edu-current-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #60a5fa;
          animation: edu-pulse 2s ease-in-out infinite;
        }
        @keyframes edu-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(96,165,250,0.4); }
          50% { box-shadow: 0 0 0 4px rgba(96,165,250,0); }
        }

        .edu-underline { height: 2px; background: linear-gradient(90deg, #3b82f6, #06b6d4, transparent); border-radius: 99px; width: 0; transition: width 0.6s ease; }
        .edu-underline.open { width: 3.5rem; }

        .edu-score-value {
          font-size: 22px; font-weight: 800; letter-spacing: -0.02em;
          background: linear-gradient(135deg, #63d2ff, #3b82f6);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
      `}</style>

      <section
        ref={sectionRef}
        id="education"
        className="relative py-14 sm:py-16 overflow-hidden text-white scroll-mt-20"
        style={{ background: "#080808", fontFamily: "'Montserrat', sans-serif" }}
      >
        {/* Background */}
        <div className="port-dot-bg absolute inset-0 opacity-60 pointer-events-none" />
        <div className="port-scan absolute inset-0" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(59,130,246,0.05) 0%, transparent 70%)", filter: "blur(40px)" }} />

        <div className="relative max-w-6xl mx-auto px-5 sm:px-8">

          {/* Heading */}
          <div className={`mb-10 edu-fade ${visible ? "show" : ""}`}>
            <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-3"
              style={{ color: "rgba(99,210,255,0.75)" }}>
              Academic Background
            </p>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">Education</h2>
            <div className={`edu-underline ${visible ? "open" : ""}`} />
            <p className="mt-4 max-w-lg text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>
              A strong academic foundation across engineering, science, and foundational schooling.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative pl-5 sm:pl-12">
            <div className="edu-timeline-line absolute left-2 sm:left-5 top-2 bottom-0 w-[2px]" />
            <div className="space-y-5">
              {items.map((item, idx) => {
                const cardRef = useRef<HTMLDivElement | null>(null);
                const barRef = useRef<HTMLDivElement | null>(null);
                const barWidth = item.score.includes("%")
                  ? item.score.replace("%", "") + "%"
                  : `${Math.min((parseFloat(item.score) / 10) * 100, 100)}%`;

                useEffect(() => {
                  if (!visible || !barRef.current) return;
                  const t = setTimeout(() => {
                    if (barRef.current) barRef.current.classList.add("animate");
                  }, 400 + idx * 120);
                  return () => clearTimeout(t);
                }, [visible]);

                return (
                  <div key={idx} className="edu-group relative group">
                    {/* Timeline dot */}
                    <span
                      className="edu-dot absolute left-[-6px] sm:left-[-7px] top-6 h-3 w-3 rounded-full border-2 border-[#080808] z-10"
                      style={{ background: "#3b82f6", boxShadow: "0 0 0 4px rgba(59,130,246,0.15)" }}
                    />

                    <div className="ml-4 sm:ml-6">
                      <div
                        ref={cardRef}
                        onMouseMove={(e) => cardRef.current && handleMove(e, cardRef.current)}
                        className={`edu-card edu-fade relative rounded-2xl p-5 sm:p-6 ${visible ? "show" : ""}`}
                        style={{
                          background: "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)",
                          border: "1px solid rgba(255,255,255,0.07)",
                          backdropFilter: "blur(12px)",
                          transitionDelay: `${100 + idx * 100}ms`,
                        }}
                      >
                        <div className="edu-card-top-line" />

                        <div className="relative z-10 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

                          {/* Left: icon + info */}
                          <div className="flex items-start gap-4">
                            <div
                              className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-xl"
                              style={{
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid rgba(255,255,255,0.09)",
                              }}
                            >
                              {item.icon}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <h3 className="text-sm font-bold tracking-wide leading-snug"
                                  style={{ color: "rgba(255,255,255,0.88)" }}>
                                  {item.institution}
                                </h3>
                                {item.current && (
                                  <span className="edu-current-badge">
                                    <span className="edu-current-dot" />
                                    Current
                                  </span>
                                )}
                              </div>
                              <p className="text-xs font-semibold mt-0.5"
                                style={{ color: "rgba(99,210,255,0.65)" }}>
                                {item.degree}
                              </p>
                              <p className="text-xs mt-1"
                                style={{ color: "rgba(255,255,255,0.3)" }}>
                                {item.dates}
                              </p>
                            </div>
                          </div>

                          {/* Right: score */}
                          <div className="shrink-0 sm:text-right pl-15 sm:pl-0" style={{ paddingLeft: "3.75rem" }}>
                            <p className="text-xs font-semibold uppercase tracking-widest mb-0.5"
                              style={{ color: "rgba(255,255,255,0.25)" }}>
                              {item.scoreLabel}
                            </p>
                            <span className="edu-score-value">{item.score}</span>
                          </div>
                        </div>

                        {/* Score bar */}
                        <div className="edu-score-bar-track relative z-10 mx-0 mt-3">
                          <div
                            ref={barRef}
                            className="edu-score-bar-fill"
                            style={{ "--bar-width": barWidth } as React.CSSProperties}
                          />
                        </div>

                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default Education;