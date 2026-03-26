"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type ClubItem = {
  title: string;
  org: string;
  dates: string;
  image?: string;
};

const ClubsCommittees = () => {
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

  const abhivriddhi: ClubItem[] = [
    { title: "Chairperson", org: "Abhivriddhi – Student Training & Development Committee, VIT Pune", dates: "Aug 2025 – Present", image: "/abhivriddhi.png" },
    { title: "Management Executive", org: "Abhivriddhi – Student Training & Development Committee, VIT Pune", dates: "Jul 2024 – Jul 2025", image: "/abhivriddhi.png" },
    { title: "Operations and Management Head", org: "Abhivriddhi – Student Training & Development Committee, VIT Pune", dates: "Jun 2023 – Jul 2024", image: "/abhivriddhi.png" },
  ];

  const swd: ClubItem[] = [
    { title: "Social Media Secretary", org: "Social Welfare & Development Committee NSS UNIT – A65, VIT Pune", dates: "Jul 2024 – Jul 2025", image: "/swd.png" },
    { title: "BloodD'25 – Branding Head", org: "Social Welfare & Development Committee NSS UNIT – A65, VIT Pune", dates: "Feb 2025 – Apr 2025", image: "/swd.png" },
    { title: "Social Media Coordinator", org: "Social Welfare & Development Committee NSS UNIT – A65, VIT Pune", dates: "Jul 2023 – Jul 2024", image: "/swd.png" },
  ];

  const RoleCard = ({ item, delay }: { item: ClubItem; delay: number }) => {
    const cardRef = useRef<HTMLDivElement | null>(null);
    return (
      <div
        ref={cardRef}
        onMouseMove={(e) => cardRef.current && handleMove(e, cardRef.current)}
        className={`club-card club-fade relative rounded-2xl p-5 ${visible ? "show" : ""}`}
        style={{
          background: "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)",
          border: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(12px)",
          transitionDelay: `${delay}ms`,
        }}
      >
        <div className="club-card-top-line" />
        <div className="relative z-10 flex items-start gap-4">
          {item.image ? (
            <div className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="relative w-7 h-7">
                <Image src={item.image} alt={item.org} fill className="object-contain" />
              </div>
            </div>
          ) : (
            <div className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.22)" }}>
              <span className="text-base font-bold" style={{ color: "#60a5fa" }}>{item.org.charAt(0)}</span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold tracking-wide leading-snug" style={{ color: "rgba(255,255,255,0.88)" }}>{item.title}</h3>
            <p className="text-xs font-medium mt-1 leading-relaxed" style={{ color: "rgba(99,210,255,0.7)" }}>{item.org}</p>
            <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.32)" }}>{item.dates}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderTimeline = (items: ClubItem[], baseDelay: number) => (
    <div className="relative pl-5 sm:pl-12">
      <div className="club-timeline-line absolute left-2 sm:left-5 top-2 bottom-0 w-[2px]" />
      <div className="space-y-5">
        {items.map((item, idx) => (
          <div key={idx} className="relative group">
            <span className="club-dot absolute left-[-6px] sm:left-[-7px] top-5 h-3 w-3 rounded-full border-2 border-[#080808] z-10"
              style={{ background: "#3b82f6", boxShadow: "0 0 0 4px rgba(59,130,246,0.15)" }} />
            <div className="ml-4 sm:ml-6">
              <RoleCard item={item} delay={baseDelay + idx * 80} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap');
        #community, #community * { font-family: 'Montserrat', sans-serif; }

        .club-fade { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .club-fade.show { opacity: 1; transform: translateY(0); }

        .club-card {
          --mouse-x: 50%; --mouse-y: 50%;
          transition: box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .club-card::before {
          content: ''; position: absolute; inset: 0; border-radius: inherit;
          background: radial-gradient(180px circle at var(--mouse-x) var(--mouse-y), rgba(99,210,255,0.09), transparent 70%);
          opacity: 0; transition: opacity 0.35s ease; pointer-events: none; z-index: 0;
        }
        .club-card:hover::before { opacity: 1; }
        .club-card:hover {
          border-color: rgba(99,210,255,0.18) !important;
          box-shadow: 0 0 0 1px rgba(99,210,255,0.1), 0 12px 40px rgba(0,0,0,0.6), 0 0 50px rgba(59,130,246,0.08);
        }
        .club-card-top-line {
          position: absolute; top: 0; left: 1.25rem; right: 1.25rem; height: 1px; border-radius: 99px;
          background: linear-gradient(90deg, transparent, rgba(99,210,255,0.45), transparent);
          opacity: 0; transition: opacity 0.5s ease;
        }
        .club-card:hover .club-card-top-line { opacity: 1; }

        .club-timeline-line { background: linear-gradient(to bottom, rgba(59,130,246,0.7), rgba(59,130,246,0.1), transparent); }
        .club-dot { transition: box-shadow 0.3s ease, transform 0.3s ease; }
        .group:hover .club-dot {
          box-shadow: 0 0 0 6px rgba(59,130,246,0.2), 0 0 14px rgba(59,130,246,0.35) !important;
          transform: scale(1.2);
        }

        .club-divider-line { background: rgba(255,255,255,0.07); }
        .club-divider-label { color: rgba(99,210,255,0.5); font-size: 0.7rem; font-weight: 600; letter-spacing: 0.15em; text-transform:; }
        .club-underline { height: 2px; background: linear-gradient(90deg, #3b82f6, #06b6d4, transparent); border-radius: 99px; width: 0; transition: width 0.6s ease; }
        .club-underline.open { width: 3.5rem; }
      `}</style>

      <section ref={sectionRef} id="community"
        className="relative py-14 sm:py-16 overflow-hidden text-white scroll-mt-20"
        style={{ background: "#080808", fontFamily: "'Montserrat', sans-serif" }}>

        <div className="port-dot-bg absolute inset-0 opacity-60 pointer-events-none" />
        <div className="port-scan absolute inset-0" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(59,130,246,0.05) 0%, transparent 70%)", filter: "blur(40px)" }} />

        <div className="relative max-w-6xl mx-auto px-5 sm:px-8">

          {/* Heading */}
          <div className={`mb-10 club-fade ${visible ? "show" : ""}`}>
            <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-3" style={{ color: "rgba(99,210,255,0.75)" }}>
              Leadership & Community
            </p>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">Clubs & Committees</h2>
            <div className={`club-underline ${visible ? "open" : ""}`} />
            <p className="mt-4 max-w-lg text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>
              Leadership roles and community-building initiatives across VIT Pune committees.
            </p>
          </div>

          {/* Abhivriddhi */}
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-7">
              <div className="club-divider-line h-px flex-1" />
              <span className="club-divider-label">Abhivriddhi</span>
              <div className="club-divider-line h-px flex-1" />
            </div>
            {renderTimeline(abhivriddhi, 100)}
          </div>

          {/* SWD */}
          <div>
            <div className="flex items-center gap-4 mb-7">
              <div className="club-divider-line h-px flex-1" />
              <span className="club-divider-label">SW&D Committee</span>
              <div className="club-divider-line h-px flex-1" />
            </div>
            {renderTimeline(swd, 300)}
          </div>
        </div>
      </section>
    </>
  );
};

export default ClubsCommittees;