export function PartnerGlobeAnimation() {
  return (
    <div className="partner-globe relative aspect-square w-full opacity-80">
      <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle_at_42%_34%,rgba(255,255,255,0.13),rgba(198,184,146,0.075)_32%,transparent_68%)] blur-3xl" />
      <div className="absolute inset-[20%] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(198,184,146,0.10),transparent_68%)] blur-2xl" />

      <svg
        aria-hidden="true"
        className="relative h-full w-full overflow-visible"
        viewBox="0 0 420 420"
        fill="none"
      >
        <defs>
          <radialGradient id="partnerGlobeCore" cx="46%" cy="38%" r="58%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
            <stop offset="42%" stopColor="rgba(198,184,146,0.075)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          <linearGradient
            id="partnerGlobeStroke"
            x1="92"
            y1="68"
            x2="328"
            y2="344"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="rgba(255,255,255,0.52)" />
            <stop offset="0.46" stopColor="rgba(198,184,146,0.46)" />
            <stop offset="1" stopColor="rgba(255,255,255,0.12)" />
          </linearGradient>
          <linearGradient
            id="partnerOrbitGold"
            x1="76"
            y1="120"
            x2="348"
            y2="300"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="rgba(255,255,255,0.02)" />
            <stop offset="0.48" stopColor="rgba(198,184,146,0.34)" />
            <stop offset="1" stopColor="rgba(255,255,255,0.18)" />
          </linearGradient>
          <linearGradient
            id="partnerGrowthStroke"
            x1="210"
            y1="190"
            x2="362"
            y2="86"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="rgba(255,255,255,0)" />
            <stop offset="0.46" stopColor="rgba(198,184,146,0.48)" />
            <stop offset="1" stopColor="rgba(255,255,255,0.56)" />
          </linearGradient>
        </defs>

        <circle cx="210" cy="210" r="144" fill="url(#partnerGlobeCore)" />
        <circle
          cx="210"
          cy="210"
          r="144"
          stroke="url(#partnerGlobeStroke)"
          strokeOpacity="0.34"
          strokeWidth="1"
        />

        <g className="partner-globe__halo">
          <circle
            cx="210"
            cy="210"
            r="168"
            stroke="rgba(255,255,255,0.045)"
            strokeWidth="1"
          />
          <circle
            cx="210"
            cy="210"
            r="124"
            stroke="rgba(198,184,146,0.055)"
            strokeWidth="1"
          />
        </g>

        <g className="partner-globe__sphere" strokeLinecap="round">
          <ellipse
            cx="210"
            cy="210"
            rx="144"
            ry="42"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="0.7"
          />
          <ellipse
            cx="210"
            cy="210"
            rx="144"
            ry="86"
            stroke="rgba(198,184,146,0.16)"
            strokeWidth="0.7"
          />
          <ellipse
            cx="210"
            cy="210"
            rx="46"
            ry="144"
            stroke="rgba(255,255,255,0.16)"
            strokeWidth="0.7"
          />
          <ellipse
            cx="210"
            cy="210"
            rx="92"
            ry="144"
            stroke="rgba(255,255,255,0.095)"
            strokeWidth="0.65"
          />
        </g>

        <g className="partner-globe__orbits" strokeLinecap="round">
          <ellipse
            cx="210"
            cy="210"
            rx="154"
            ry="72"
            stroke="url(#partnerOrbitGold)"
            strokeWidth="0.95"
            transform="rotate(-18 210 210)"
          />
          <ellipse
            cx="210"
            cy="210"
            rx="154"
            ry="72"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="0.8"
            transform="rotate(34 210 210)"
          />
          <ellipse
            cx="210"
            cy="210"
            rx="154"
            ry="72"
            stroke="rgba(198,184,146,0.12)"
            strokeWidth="0.8"
            transform="rotate(72 210 210)"
          />
        </g>

        <g stroke="rgba(255,255,255,0.15)" strokeWidth="0.75" strokeLinecap="round">
          <path d="M142 186L194 150L254 176L286 236L224 276L162 246Z" />
          <path d="M194 150L210 216L286 236" />
          <path d="M142 186L210 216L224 276" />
          <path d="M254 176L210 216L162 246" />
        </g>

        <path
          className="partner-globe__growth"
          d="M222 180C272 164 318 128 366 82"
          stroke="url(#partnerGrowthStroke)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="22 120"
        />

        <g className="partner-globe__nodes">
          {[
            [142, 186, 2.1],
            [194, 150, 2.2],
            [254, 176, 2.1],
            [286, 236, 2.4],
            [224, 276, 2.1],
            [162, 246, 2.1],
            [210, 216, 3.4],
            [366, 82, 3.0],
          ].map(([cx, cy, r], index) => (
            <circle
              key={`${cx}-${cy}`}
              className={index === 6 ? "partner-globe__node--core" : ""}
              cx={cx}
              cy={cy}
              r={r}
              fill={index > 6 ? "rgba(198,184,146,0.74)" : "rgba(255,255,255,0.58)"}
            />
          ))}
        </g>

        <g className="partner-globe__partner-link">
          <line
            x1="174"
            y1="206"
            x2="246"
            y2="198"
            stroke="rgba(198,184,146,0.34)"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          <circle className="partner-globe__partner-dot partner-globe__partner-dot--a" cx="174" cy="206" r="3" />
          <circle className="partner-globe__partner-dot partner-globe__partner-dot--b" cx="246" cy="198" r="3" />
        </g>
      </svg>

      <style>{`
        .partner-globe {
          filter: drop-shadow(0 28px 90px rgba(0, 0, 0, 0.32));
          mix-blend-mode: screen;
        }

        .partner-globe__halo {
          animation: partnerHaloBreathe 10s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }

        .partner-globe__sphere {
          animation: partnerGlobeRotate 42s linear infinite;
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }

        .partner-globe__orbits {
          animation: partnerOrbitDrift 34s linear infinite;
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }

        .partner-globe__growth {
          animation: partnerGrowthFlow 7.8s ease-in-out infinite;
        }

        .partner-globe__nodes circle {
          animation: partnerNodePulse 6.6s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }

        .partner-globe__nodes circle:nth-child(3n) {
          animation-delay: 1.3s;
        }

        .partner-globe__nodes circle:nth-child(4n) {
          animation-delay: 2.4s;
        }

        .partner-globe__node--core {
          filter: drop-shadow(0 0 12px rgba(198, 184, 146, 0.26));
        }

        .partner-globe__partner-link {
          animation: partnerLinkPulse 7.2s ease-in-out infinite;
        }

        .partner-globe__partner-dot {
          fill: rgba(255, 255, 255, 0.72);
          filter: drop-shadow(0 0 8px rgba(198, 184, 146, 0.28));
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }

        .partner-globe__partner-dot--a {
          animation: partnerDotApproachA 7.2s ease-in-out infinite;
        }

        .partner-globe__partner-dot--b {
          animation: partnerDotApproachB 7.2s ease-in-out infinite;
        }

        @keyframes partnerHaloBreathe {
          0%, 100% {
            opacity: 0.52;
            transform: scale(0.98);
          }
          50% {
            opacity: 0.82;
            transform: scale(1.02);
          }
        }

        @keyframes partnerGlobeRotate {
          from {
            transform: rotate(0deg) scaleX(1);
          }
          50% {
            transform: rotate(180deg) scaleX(0.97);
          }
          to {
            transform: rotate(360deg) scaleX(1);
          }
        }

        @keyframes partnerOrbitDrift {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }

        @keyframes partnerGrowthFlow {
          0%, 100% {
            opacity: 0.16;
            stroke-dashoffset: 120;
          }
          52% {
            opacity: 0.62;
            stroke-dashoffset: -38;
          }
        }

        @keyframes partnerNodePulse {
          0%, 100% {
            opacity: 0.36;
            transform: scale(0.94);
          }
          45% {
            opacity: 0.74;
            transform: scale(1.08);
          }
        }

        @keyframes partnerLinkPulse {
          0%, 100% {
            opacity: 0.16;
          }
          52% {
            opacity: 0.58;
          }
        }

        @keyframes partnerDotApproachA {
          0%, 100% {
            opacity: 0.42;
            transform: translate3d(-8px, 2px, 0) scale(0.9);
          }
          52% {
            opacity: 0.86;
            transform: translate3d(0, 0, 0) scale(1.04);
          }
        }

        @keyframes partnerDotApproachB {
          0%, 100% {
            opacity: 0.42;
            transform: translate3d(8px, -2px, 0) scale(0.9);
          }
          52% {
            opacity: 0.86;
            transform: translate3d(0, 0, 0) scale(1.04);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .partner-globe *,
          .partner-globe {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
