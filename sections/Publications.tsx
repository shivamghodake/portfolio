"use client";
import React, { useEffect, useRef, useState } from "react";

type Publication = {
  title: string;
  venue: string;
  year: number;
  link: string;
  tags?: string[];
};

type Patent = {
  title: string;
  country: string;
  status: string;
  grant: string;
  date: string;
};

const Publications = () => {
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

  const publications: Publication[] = [
    {
      title: "Medi-Compass: Symptom-Based Ayurvedic Recommendation System",
      venue: "IEEE",
      year: 2025,
      link: "https://ieeexplore.ieee.org/document/10994125/",
    },
    {
      title: "Enhancing Disaster Resilience Through ML-Based Preparedness and Awareness Strategies",
      venue: "Springer (Scopus Indexed)",
      year: 2024,
      link: "https://link.springer.com/chapter/10.1007/978-981-96-8799-2_35",
    },
    {
      title: "Single Smart Card for Identity and Authentication Using Data Analytics",
      venue: "Springer (Scopus Indexed)",
      year: 2024,
      link: "https://link.springer.com/chapter/10.1007/978-981-97-2089-7_11",
    },
    {
      title: "IoT-Based Real-Time Environment Monitoring and Safety for Factory Workplace",
      venue: "IEEE",
      year: 2024,
      link: "https://ieeexplore.ieee.org/document/10530721",
    },
  ];

  const patents: Patent[] = [
    {
      title: "CyberSentinel: A Secure Web-Based Platform for Live Network Monitoring and Threat Detection",
      country: "India",
      status: "Published",
      grant: "Patent Grant",
      date: "Dec 2025",
    },
  ];

  const venueIcon = (venue: string) => {
    // if (venue.includes("IEEE")) return ;
    // if (venue.includes("Springer")) return "📘";
    return "";
  };

  const venueColor = (venue: string) => {
    if (venue.includes("IEEE")) return { bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.25)", text: "#60a5fa" };
    if (venue.includes("Springer")) return { bg: "rgba(139,92,246,0.1)", border: "rgba(139,92,246,0.25)", text: "#a78bfa" };
    return { bg: "rgba(99,210,255,0.1)", border: "rgba(99,210,255,0.2)", text: "#63d2ff" };
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap');
        #publications, #publications * { font-family: 'Montserrat', sans-serif; }

        .pub-fade { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .pub-fade.show { opacity: 1; transform: translateY(0); }

        .pub-card {
          --mouse-x: 50%; --mouse-y: 50%;
          transition: box-shadow 0.35s ease, border-color 0.35s ease, transform 0.35s ease;
        }
        .pub-card::before {
          content: ''; position: absolute; inset: 0; border-radius: inherit;
          background: radial-gradient(220px circle at var(--mouse-x) var(--mouse-y), rgba(99,210,255,0.08), transparent 70%);
          opacity: 0; transition: opacity 0.35s ease; pointer-events: none; z-index: 0;
        }
        .pub-card:hover::before { opacity: 1; }
        .pub-card:hover {
          border-color: rgba(99,210,255,0.22) !important;
          box-shadow: 0 0 0 1px rgba(99,210,255,0.08), 0 16px 50px rgba(0,0,0,0.65), 0 0 60px rgba(59,130,246,0.1);
          transform: translateY(-3px);
        }
        .pub-card-top-line {
          position: absolute; top: 0; left: 1.5rem; right: 1.5rem; height: 1px; border-radius: 99px;
          background: linear-gradient(90deg, transparent, rgba(99,210,255,0.5), transparent);
          opacity: 0; transition: opacity 0.5s ease;
        }
        .pub-card:hover .pub-card-top-line { opacity: 1; }

        .patent-card::before {
          background: radial-gradient(220px circle at var(--mouse-x) var(--mouse-y), rgba(168,85,247,0.08), transparent 70%) !important;
        }
        .patent-card:hover {
          border-color: rgba(168,85,247,0.25) !important;
          box-shadow: 0 0 0 1px rgba(168,85,247,0.08), 0 16px 50px rgba(0,0,0,0.65), 0 0 60px rgba(139,92,246,0.12) !important;
        }
        .patent-card-top-line {
          background: linear-gradient(90deg, transparent, rgba(168,85,247,0.5), transparent) !important;
        }

        .pub-left-bar {
          position: absolute; left: 0; top: 0; bottom: 0; width: 2px;
          border-radius: 2px 0 0 2px;
          background: linear-gradient(to bottom, rgba(59,130,246,0.9), rgba(99,210,255,0.4), transparent);
          transition: opacity 0.3s ease;
        }
        .patent-left-bar {
          background: linear-gradient(to bottom, rgba(139,92,246,0.9), rgba(168,85,247,0.4), transparent) !important;
        }

        .pub-tag {
          display: inline-flex; align-items: center; gap: 6px;
          height: 26px; padding: 0 10px;
          font-size: 10px; font-weight: 600; letter-spacing: 0.05em;
          border-radius: 99px; border: 1px solid; white-space: nowrap;
          backdrop-filter: blur(8px);
          transition: transform 0.25s ease, opacity 0.25s ease;
        }
        .pub-tag:hover { transform: scale(1.06); }
        .pub-tag-dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; opacity: 0.75; }

        .pub-link {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 12px; font-weight: 600; color: rgba(99,210,255,0.7);
          transition: color 0.25s ease, gap 0.25s ease;
          text-decoration: none;
        }
        .pub-link:hover { color: rgba(99,210,255,1); gap: 9px; }
        .pub-link-arrow { transition: transform 0.25s ease; }
        .pub-link:hover .pub-link-arrow { transform: translateX(3px); }

        .pub-index {
          font-size: 11px; font-weight: 700; letter-spacing: 0.12em;
          color: rgba(255,255,255,0.12);
          transition: color 0.3s ease;
        }
        .pub-card:hover .pub-index { color: rgba(99,210,255,0.3); }

        .pub-divider-line { background: rgba(255,255,255,0.07); }
        .pub-divider-label { color: rgba(99,210,255,0.5); font-size: 0.7rem; font-weight: 600; letter-spacing: 0.15em; }
        .pub-underline { height: 2px; background: linear-gradient(90deg, #3b82f6, #06b6d4, transparent); border-radius: 99px; width: 0; transition: width 0.6s ease; }
        .pub-underline.open { width: 3.5rem; }

        .pub-venue-badge {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 4px 10px; border-radius: 8px; border: 1px solid;
          font-size: 11px; font-weight: 600;
          transition: opacity 0.3s ease;
        }
      `}</style>

      <section
        ref={sectionRef}
        id="publications"
        className="relative py-14 sm:py-16 overflow-hidden text-white scroll-mt-20"
        style={{ background: "#080808", fontFamily: "'Montserrat', sans-serif" }}
      >
        {/* Background effects matching ClubsCommittees */}
        <div className="port-dot-bg absolute inset-0 opacity-60 pointer-events-none" />
        <div className="port-scan absolute inset-0" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(59,130,246,0.05) 0%, transparent 70%)", filter: "blur(40px)" }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at bottom right, rgba(139,92,246,0.04) 0%, transparent 70%)", filter: "blur(60px)" }} />

        <div className="relative max-w-6xl mx-auto px-5 sm:px-8">

          {/* Heading */}
          <div className={`mb-10 pub-fade ${visible ? "show" : ""}`}>
            <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-3"
              style={{ color: "rgba(99,210,255,0.75)" }}>
              Research & Innovation
            </p>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Publications & Patents
            </h2>
            <div className={`pub-underline ${visible ? "open" : ""}`} />
            <p className="mt-4 max-w-lg text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>
              Peer-reviewed research across AI, IoT, and cybersecurity — published in IEEE and Springer.
            </p>
          </div>

          {/* Publications Divider */}
          <div className={`flex items-center gap-4 mb-8 pub-fade ${visible ? "show" : ""}`}
            style={{ transitionDelay: "80ms" }}>
            <div className="pub-divider-line h-px flex-1" />
            <span className="pub-divider-label">Publications</span>
            <div className="pub-divider-line h-px flex-1" />
          </div>

          {/* Publications List */}
          <div className="space-y-4">
            {publications.map((p, i) => {
              const cardRef = React.createRef<HTMLDivElement>();
              const vc = venueColor(p.venue);
              return (
                <div
                  key={p.title}
                  ref={cardRef}
                  onMouseMove={(e) => cardRef.current && handleMove(e, cardRef.current)}
                  className={`pub-card pub-fade relative rounded-2xl p-5 sm:p-6 ${visible ? "show" : ""}`}
                  style={{
                    background: "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    backdropFilter: "blur(12px)",
                    transitionDelay: `${150 + i * 90}ms`,
                  }}
                >
                  <div className="pub-card-top-line" />
                  <div className="pub-left-bar" />

                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-start gap-4">

                    {/* Index number */}
                    <div className="pub-index shrink-0 sm:w-8 sm:pt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold leading-snug tracking-wide mb-2"
                        style={{ color: "rgba(255,255,255,0.88)" }}>
                        {p.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        {/* Venue badge */}
                        <span className="pub-venue-badge"
                          style={{ background: vc.bg, borderColor: vc.border, color: vc.text }}>
                          <span style={{ fontSize: "13px" }}>{venueIcon(p.venue)}</span>
                          {p.venue}
                        </span>

                        {/* Year */}
                        <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.3)" }}>
                          · {p.year}
                        </span>
                      </div>

                      {/* Tags row */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="pub-tag"
                          style={{ background: "rgba(34,197,94,0.08)", borderColor: "rgba(34,197,94,0.22)", color: "#4ade80" }}>
                          <span className="pub-tag-dot" />Published
                        </span>
                        {p.venue.includes("Springer") && (
                          <span className="pub-tag"
                            style={{ background: "rgba(139,92,246,0.08)", borderColor: "rgba(139,92,246,0.22)", color: "#a78bfa" }}>
                            <span className="pub-tag-dot" />Scopus Indexed
                          </span>
                        )}
                        {p.venue.includes("IEEE") && (
                          <span className="pub-tag"
                            style={{ background: "rgba(59,130,246,0.08)", borderColor: "rgba(59,130,246,0.22)", color: "#60a5fa" }}>
                            <span className="pub-tag-dot" />IEEE Xplore
                          </span>
                        )}
                      </div>

                      <a href={p.link} target="_blank" rel="noopener noreferrer" className="pub-link">
                        View Publication
                        <span className="pub-link-arrow">→</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Patent Divider */}
          <div className={`flex items-center gap-4 mt-12 mb-8 pub-fade ${visible ? "show" : ""}`}
            style={{ transitionDelay: "550ms" }}>
            <div className="pub-divider-line h-px flex-1" />
            <span className="pub-divider-label" style={{ color: "rgba(168,85,247,0.5)" }}>Patent</span>
            <div className="pub-divider-line h-px flex-1" />
          </div>

          {/* Patents */}
          <div className="space-y-4">
            {patents.map((patent, i) => {
              const cardRef = React.createRef<HTMLDivElement>();
              return (
                <div
                  key={patent.title}
                  ref={cardRef}
                  onMouseMove={(e) => cardRef.current && handleMove(e, cardRef.current)}
                  className={`pub-card patent-card pub-fade relative rounded-2xl p-5 sm:p-6 ${visible ? "show" : ""}`}
                  style={{
                    background: "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(139,92,246,0.02) 100%)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    backdropFilter: "blur(12px)",
                    transitionDelay: `${600 + i * 90}ms`,
                  }}
                >
                  <div className="pub-card-top-line patent-card-top-line" />
                  <div className="pub-left-bar patent-left-bar" />

                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1 min-w-0">

                      {/* Icon + title */}
                      <div className="flex items-start gap-3 mb-3">
                        <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-base"
                          style={{ background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.25)" }}>
                          🛡️
                        </div>
                        <h3 className="text-sm font-bold leading-snug tracking-wide"
                          style={{ color: "rgba(255,255,255,0.88)" }}>
                          {patent.title}
                        </h3>
                      </div>

                      <p className="text-xs mb-3 ml-13" style={{ color: "rgba(255,255,255,0.35)", marginLeft: "3.25rem" }}>
                        {patent.country} · {patent.date}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 shrink-0">
                      <span className="pub-tag"
                        style={{ background: "rgba(234,179,8,0.08)", borderColor: "rgba(234,179,8,0.22)", color: "#fbbf24" }}>
                        <span className="pub-tag-dot" />{patent.status}
                      </span>
                      <span className="pub-tag"
                        style={{ background: "rgba(34,197,94,0.08)", borderColor: "rgba(34,197,94,0.22)", color: "#4ade80" }}>
                        <span className="pub-tag-dot" />{patent.grant}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
};

export default Publications;