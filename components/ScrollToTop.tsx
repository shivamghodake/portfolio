"use client";

import { useEffect, useState, useCallback } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Show button after scrolling 400px
    setVisible(scrollY > 400);

    // Calculate scroll progress (0 to 1)
    if (docHeight > 0) {
      setProgress(Math.min(scrollY / docHeight, 1));
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // SVG progress ring parameters
  const size = 52;
  const strokeWidth = 2.5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <>
      <style>{`
        .scroll-top-btn {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 90;
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(8, 8, 8, 0.85);
          backdrop-filter: blur(16px) saturate(1.4);
          box-shadow:
            0 4px 24px rgba(0, 0, 0, 0.5),
            0 0 0 1px rgba(99, 210, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
          opacity: 0;
          visibility: hidden;
          transform: translateY(16px) scale(0.85);
          transition:
            opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1),
            visibility 0.35s,
            transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 0.3s ease,
            background 0.3s ease;
          -webkit-tap-highlight-color: transparent;
        }

        .scroll-top-btn.visible {
          opacity: 1;
          visibility: visible;
          transform: translateY(0) scale(1);
        }

        .scroll-top-btn:hover {
          background: rgba(59, 130, 246, 0.15);
          box-shadow:
            0 8px 32px rgba(0, 0, 0, 0.55),
            0 0 0 1px rgba(59, 130, 246, 0.3),
            0 0 24px rgba(59, 130, 246, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
          transform: translateY(-3px) scale(1);
        }

        .scroll-top-btn:active {
          transform: translateY(-1px) scale(0.96);
          transition-duration: 0.1s;
        }

        .scroll-top-btn:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 3px;
        }

        /* Arrow icon */
        .scroll-top-arrow {
          position: relative;
          z-index: 2;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .scroll-top-btn:hover .scroll-top-arrow {
          transform: translateY(-2px);
        }

        /* Progress ring */
        .scroll-top-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          z-index: 1;
        }

        .scroll-top-ring-track {
          fill: none;
          stroke: rgba(255, 255, 255, 0.06);
          stroke-width: ${strokeWidth};
        }

        .scroll-top-ring-progress {
          fill: none;
          stroke-width: ${strokeWidth};
          stroke-linecap: round;
          transition: stroke-dashoffset 0.15s ease-out;
          transform: rotate(-90deg);
          transform-origin: center;
          filter: drop-shadow(0 0 4px rgba(59, 130, 246, 0.35));
        }

        /* Responsive — smaller on mobile */
        @media (max-width: 640px) {
          .scroll-top-btn {
            bottom: 20px;
            right: 16px;
            width: 46px;
            height: 46px;
          }
        }
      `}</style>

      <button
        onClick={scrollToTop}
        className={`scroll-top-btn${visible ? " visible" : ""}`}
        aria-label="Scroll to top"
        title="Back to top"
      >
        {/* SVG Progress Ring */}
        <svg
          className="scroll-top-ring"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Track */}
          <circle
            className="scroll-top-ring-track"
            cx={size / 2}
            cy={size / 2}
            r={radius}
          />
          {/* Progress */}
          <circle
            className="scroll-top-ring-progress"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#scrollGradient)"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
          <defs>
            <linearGradient id="scrollGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>

        {/* Arrow Icon */}
        <svg
          className="scroll-top-arrow"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#93c5fd"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 19V5" />
          <path d="M5 12l7-7 7 7" />
        </svg>
      </button>
    </>
  );
}
