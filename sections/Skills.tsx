"use client";

import { useEffect, useRef, useState } from "react";
import { Code2, Database, Wrench, BookOpen } from "lucide-react";

const Skills = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
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
    el.style.transform = `perspective(800px) rotateX(${-(y / r.height - 0.5) * 8}deg) rotateY(${(x / r.width - 0.5) * 8}deg) scale(1.03)`;
  };
  const handleLeave = (el: HTMLDivElement | null) => {
    if (!el) return;
    el.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale(1)";
  };

  const groups = [
    { title: "Programming Languages", icon: <Code2 size={18} />, skills: [{ name: "C", level: 85 }, { name: "C++", level: 80 }, { name: "Java", level: 90 }] },
    { title: "Backend & Tools", icon: <Wrench size={18} />, skills: [{ name: "Spring Boot", level: 80 }, { name: "Git & GitHub", level: 85 }, { name: "Postman", level: 80 }] },
    { title: "Databases", icon: <Database size={18} />, skills: [{ name: "MySQL", level: 85 }, { name: "Postgres SQL", level: 80 }, { name: "MongoDB", level: 70 }] },
    { title: "Coursework", icon: <BookOpen size={18} />, skills: [{ name: "Object Oriented Programming", level: 90 }, { name: "Database Management Systems", level: 90 }, { name: "Linux Operating System", level: 75 }, { name: "Computer Networks", level: 70 }] },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap');
        #skills, #skills * { font-family: 'Montserrat', sans-serif; }

        .sk-fade { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .sk-fade.show { opacity: 1; transform: translateY(0); }

        .sk-card {
          --mouse-x: 50%; --mouse-y: 50%;
          transition: transform 0.25s ease, box-shadow 0.3s ease;
        }
        .sk-card::before {
          content: ''; position: absolute; inset: 0; border-radius: inherit;
          background: radial-gradient(180px circle at var(--mouse-x) var(--mouse-y), rgba(99,210,255,0.11), transparent 70%);
          opacity: 0; transition: opacity 0.35s ease; pointer-events: none; z-index: 1;
        }
        .sk-card:hover::before { opacity: 1; }
        .sk-card:hover {
          box-shadow: 0 0 0 1px rgba(99,210,255,0.18), 0 20px 60px rgba(0,0,0,0.7), 0 0 80px rgba(59,130,246,0.12);
        }
        .sk-top-line {
          position: absolute; top: 0; left: 1.5rem; right: 1.5rem; height: 1px; border-radius: 99px;
          background: linear-gradient(90deg, transparent, rgba(99,210,255,0.5), transparent);
          opacity: 0; transition: opacity 0.5s ease;
        }
        .sk-card:hover .sk-top-line { opacity: 1; }
        .sk-icon-wrap { position: relative; transition: transform 0.3s ease; }
        .sk-card:hover .sk-icon-wrap { transform: scale(1.1); }
        .sk-icon-wrap::after {
          content: ''; position: absolute; inset: -5px; border-radius: 14px;
          border: 1px solid rgba(99,210,255,0.25); opacity: 0; transform: scale(0.85);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .sk-card:hover .sk-icon-wrap::after { opacity: 1; transform: scale(1); }
        .sk-row { padding: 0.45rem 0.55rem; margin: 0 -0.55rem; border-radius: 8px; transition: background 0.2s ease; }
        .sk-row:hover { background: rgba(59,130,246,0.06); }
        .sk-track { width: 100%; height: 5px; border-radius: 99px; background: rgba(255,255,255,0.06); position: relative; overflow: visible; }
        .sk-fill {
          height: 100%; border-radius: 99px; position: relative; overflow: hidden;
          background: linear-gradient(90deg, #1d4ed8, #3b82f6, #60a5fa, #93c5fd);
          background-size: 200% 100%; animation: sk-flow 3s linear infinite;
          transition: width 1.1s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes sk-flow { 0% { background-position: 100% 0; } 100% { background-position: -100% 0; } }
        .sk-fill::before {
          content: ''; position: absolute; inset: 0; border-radius: inherit;
          background: linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.25) 50%, transparent 80%);
          animation: sk-shine 2.6s ease-in-out infinite;
        }
        @keyframes sk-shine { 0% { transform: translateX(-120%); } 60% { transform: translateX(120%); } 100% { transform: translateX(120%); } }
        .sk-tip {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 7px; height: 7px; border-radius: 50%;
          background: #93c5fd; box-shadow: 0 0 5px 2px rgba(147,197,253,0.3);
          opacity: 0; transition: opacity 0.4s ease;
        }
        .sk-tip.show { opacity: 1; }
        .sk-underline { height: 2px; background: linear-gradient(90deg, #3b82f6, #06b6d4, transparent); border-radius: 99px; width: 0; transition: width 0.6s ease; }
        .sk-underline.open { width: 3.5rem; }
      `}</style>

      <section ref={sectionRef} id="skills" className="relative py-14 sm:py-16 overflow-hidden text-white scroll-mt-20"
        style={{ background: "#080808", fontFamily: "'Montserrat', sans-serif" }}>
        <div className="port-dot-bg absolute inset-0 opacity-60 pointer-events-none" />
        <div className="port-scan absolute inset-0" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(59,130,246,0.05) 0%, transparent 70%)", filter: "blur(40px)" }} />

        <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
          <div className={`mb-10 sk-fade ${visible ? "show" : ""}`}>
            <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-3" style={{ color: "rgba(99,210,255,0.75)" }}>Technical Stack</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">Skills & Expertise</h2>
            <div className={`sk-underline ${visible ? "open" : ""}`} />
            <p className="mt-4 max-w-lg text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>
              A focused toolkit built through rigorous academics and hands-on engineering projects.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {groups.map((group, i) => (
              <div key={group.title}
                ref={(el): void => { cardsRef.current[i] = el; }}
                onMouseMove={(e) => handleMove(e, cardsRef.current[i])}
                onMouseLeave={() => handleLeave(cardsRef.current[i])}
                className={`sk-card sk-fade relative rounded-2xl p-6 flex flex-col ${visible ? "show" : ""}`}
                style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(12px)", transitionDelay: `${i * 80}ms`, willChange: "transform" }}>
                <div className="sk-top-line" />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-7">
                    <div className="sk-icon-wrap w-10 h-10 flex items-center justify-center rounded-xl"
                      style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.22)", color: "#60a5fa" }}>
                      {group.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold tracking-wide" style={{ color: "rgba(255,255,255,0.88)" }}>{group.title}</h3>
                      <p className="text-xs mt-0.5" style={{ color: "rgba(99,210,255,0.45)" }}>{group.skills.length} skill{group.skills.length > 1 ? "s" : ""}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {group.skills.map((skill, si) => (
                      <div key={skill.name} className="sk-row">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>{skill.name}</span>
                          <span className="text-xs font-bold tabular-nums" style={{ color: "#60a5fa" }}>{skill.level}%</span>
                        </div>
                        <div className="sk-track">
                          <div className="sk-fill" style={{ width: visible ? `${skill.level}%` : "0%", transitionDelay: `${si * 130 + i * 90}ms` }} />
                          <div className={`sk-tip ${visible ? "show" : ""}`} style={{ left: visible ? `calc(${skill.level}% - 3px)` : "0%", transitionDelay: `${si * 130 + i * 90 + 900}ms` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Skills;