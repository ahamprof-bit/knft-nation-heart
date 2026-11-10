
import { useEffect, useRef, useState } from "react";

type KNFTIntroProps = {
  onComplete: () => void;
};

const TOTAL_DURATION = 15000;
const EXIT_DURATION = 500;

const LOGO_URL = "/knft-logo.png.webp";

const videos = [
  {
    id: "S575c64PrgY",
    title: "Tindivanam Lake Restoration",
    description: "1 Lakh Seeds Sowed",
    ratio: "portrait",
  },
  {
    id: "58kVDVE7sp0",
    title: "Water Conservation",
    description: "Tindivanam Neeramaipu Kulu",
    ratio: "portrait",
  },
  {
    id: "0iqAtAs2A_E",
    title: "Murukkeri Lake",
    description: "Lake Restoration Initiative",
    ratio: "portrait",
  },
  {
    id: "W7SJdIkyYZU",
    title: "Koliyanur Lake",
    description: "Thamarai Seed Sowing",
    ratio: "portrait",
  },
  {
    id: "n4q-bRpc4I8",
    title: "Ariyalur Lake",
    description: "Before & After Restoration",
    ratio: "portrait",
  },
  {
    id: "j1yKZckLzFQ",
    title: "KNFT Collaboration",
    description: "Infosys Partners With KNFT",
    ratio: "portrait",
  },
  {
    id: "2PEoDIPVOuE",
    title: "Community Together",
    description: "Villupuram District Initiative",
    ratio: "portrait",
  },
];

export default function KNFTIntro({ onComplete }: KNFTIntroProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const completedRef = useRef(false);
  const startTimeRef = useRef(Date.now());
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const finishIntro = () => {
    if (completedRef.current) return;

    completedRef.current = true;
    setIsExiting(true);

    exitTimerRef.current = setTimeout(() => {
      onComplete();
    }, EXIT_DURATION);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    setReducedMotion(mediaQuery.matches);

    const handleMotionChange = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleMotionChange);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    startTimeRef.current = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const percentage = Math.min((elapsed / TOTAL_DURATION) * 100, 100);

      setProgress(percentage);

      if (elapsed >= TOTAL_DURATION) {
        finishIntro();
      }
    }, 50);

    return () => {
      clearInterval(interval);
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);

      document.body.style.overflow = previousOverflow;
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  const repeatedVideos = [...videos, ...videos];

  return (
    <div
      className={`knft-intro ${isExiting ? "knft-intro-exiting" : ""}`}
      role="dialog"
      aria-label="KNFT introduction"
      aria-modal="true"
    >
      <style>{`
        .knft-intro {
          position: fixed;
          inset: 0;
          z-index: 99999;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background:
            radial-gradient(ellipse at 50% 45%, rgba(67, 103, 57, 0.22), transparent 65%),
            #07100b;
          color: #fff;
          opacity: 1;
          transition: opacity 500ms ease, transform 500ms ease;
          isolation: isolate;
        }

        .knft-intro-exiting {
          opacity: 0;
          transform: scale(1.025);
          pointer-events: none;
        }

        .knft-intro-header {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 5;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 22px clamp(20px, 5vw, 76px);
          background: linear-gradient(to bottom, rgba(0,0,0,.48), transparent);
        }

        .knft-brand {
          display: flex;
          align-items: center;
          gap: 13px;
        }

        .knft-logo-wrap {
          width: 54px;
          height: 54px;
          display: grid;
          place-items: center;
          border-radius: 14px;
          overflow: hidden;
          background: rgba(255,255,255,.96);
          border: 1px solid rgba(255,255,255,.3);
          box-shadow: 0 0 30px rgba(157, 194, 110, .16);
        }

        .knft-logo {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 4px;
        }

        .knft-brand-name {
          font-size: 15px;
          font-weight: 800;
          letter-spacing: .16em;
          line-height: 1.4;
        }

        .knft-brand-subtitle {
          display: block;
          margin-top: 3px;
          font-size: 9px;
          letter-spacing: .17em;
          color: #a8bba3;
          font-weight: 500;
        }

        .knft-skip {
          border: 1px solid rgba(255,255,255,.24);
          color: #fff;
          background: rgba(255,255,255,.07);
          padding: 11px 19px;
          border-radius: 30px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .12em;
          cursor: pointer;
          transition: background .25s ease, border-color .25s ease;
          backdrop-filter: blur(12px);
        }

        .knft-skip:hover {
          background: rgba(255,255,255,.18);
          border-color: rgba(255,255,255,.55);
        }

        .knft-intro-content {
          width: 100%;
          padding-top: 65px;
          padding-bottom: 55px;
        }

        .knft-intro-heading {
          text-align: center;
          padding: 0 20px;
          margin-bottom: 36px;
        }

        .knft-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          color: #b6cc9c;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .27em;
          text-transform: uppercase;
          margin-bottom: 15px;
        }

        .knft-eyebrow::before,
        .knft-eyebrow::after {
          content: "";
          height: 1px;
          width: 23px;
          background: #819c65;
        }

        .knft-intro-heading h1 {
          font-size: clamp(28px, 4.3vw, 55px);
          line-height: 1.08;
          letter-spacing: -.045em;
          font-weight: 750;
          margin: 0;
        }

        .knft-intro-heading h1 span {
          color: #a9c889;
        }

        .knft-intro-heading p {
          margin: 13px 0 0;
          color: rgba(255,255,255,.58);
          font-size: 13px;
          letter-spacing: .025em;
        }

        .knft-video-window {
          width: 100%;
          overflow: hidden;
          position: relative;
          padding: 12px 0;
          mask-image: linear-gradient(
            to right,
            transparent,
            black 7%,
            black 93%,
            transparent
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 7%,
            black 93%,
            transparent
          );
        }

        .knft-video-track {
          display: flex;
          align-items: center;
          gap: 18px;
          width: max-content;
          animation: knftMarquee 30s linear infinite;
          will-change: transform;
        }

        .knft-video-item {
          position: relative;
          flex: 0 0 auto;
          width: clamp(190px, 18vw, 255px);
          aspect-ratio: 9 / 16;
          border-radius: 18px;
          overflow: hidden;
          background: #17251b;
          border: 1px solid rgba(207, 230, 185, .18);
          box-shadow: 0 18px 55px rgba(0,0,0,.35);
          isolation: isolate;
        }

        .knft-video-item.landscape {
          width: clamp(290px, 31vw, 440px);
          aspect-ratio: 16 / 9;
        }

        .knft-video-item iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: 0;
          object-fit: cover;
        }

        .knft-video-overlay {
          position: absolute;
          z-index: 2;
          inset: 35% 0 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 19px;
          pointer-events: none;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(0,0,0,.1) 25%,
            rgba(0,0,0,.88) 100%
          );
        }

        .knft-video-label {
          font-size: 9px;
          letter-spacing: .17em;
          text-transform: uppercase;
          color: #c6dfa9;
          font-weight: 700;
          margin-bottom: 7px;
        }

        .knft-video-title {
          font-size: clamp(14px, 1.4vw, 18px);
          font-weight: 750;
          line-height: 1.25;
          color: #fff;
        }

        .knft-video-description {
          font-size: 10px;
          color: rgba(255,255,255,.68);
          margin-top: 5px;
        }

        .knft-intro-footer {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 19px clamp(20px, 5vw, 76px) 23px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          background: linear-gradient(to top, rgba(0,0,0,.5), transparent);
        }

        .knft-footer-message {
          font-size: 10px;
          color: rgba(255,255,255,.56);
          letter-spacing: .12em;
          text-transform: uppercase;
        }

        .knft-progress-area {
          display: flex;
          align-items: center;
          gap: 12px;
          width: min(260px, 40vw);
        }

        .knft-progress-track {
          height: 3px;
          background: rgba(255,255,255,.15);
          border-radius: 20px;
          flex: 1;
          overflow: hidden;
        }

        .knft-progress-fill {
          height: 100%;
          background: #b2d18c;
          border-radius: inherit;
          transition: width 80ms linear;
        }

        .knft-progress-text {
          color: rgba(255,255,255,.65);
          font-size: 10px;
          font-variant-numeric: tabular-nums;
          min-width: 30px;
          text-align: right;
        }

        @keyframes knftMarquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @media (max-width: 640px) {
          .knft-intro-header {
            padding: 17px 17px;
          }

          .knft-logo-wrap {
            width: 43px;
            height: 43px;
          }

          .knft-brand-name {
            font-size: 12px;
          }

          .knft-brand-subtitle {
            font-size: 7px;
          }

          .knft-skip {
            padding: 9px 13px;
            font-size: 9px;
          }

          .knft-intro-heading {
            margin-bottom: 26px;
          }

          .knft-intro-heading h1 {
            font-size: clamp(27px, 8vw, 39px);
          }

          .knft-intro-heading p {
            font-size: 11px;
          }

          .knft-video-track {
            gap: 13px;
          }

          .knft-video-item {
            width: 190px;
            border-radius: 14px;
          }

          .knft-video-item.landscape {
            width: 275px;
          }

          .knft-video-overlay {
            padding: 14px;
          }

          .knft-intro-footer {
            padding: 16px 18px 20px;
          }

          .knft-footer-message {
            font-size: 8px;
            max-width: 130px;
            line-height: 1.5;
          }

          .knft-progress-area {
            width: 125px;
            gap: 8px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .knft-video-track {
            animation: none !important;
            transform: translateX(0);
          }

          .knft-intro,
          .knft-progress-fill {
            transition: none;
          }
        }
      `}</style>

      <header className="knft-intro-header">
        <div className="knft-brand">
          <div className="knft-logo-wrap">
            <img
              src={LOGO_URL}
              alt="KNFT logo"
              className="knft-logo"
              onLoad={() => setLogoLoaded(true)}
              onError={() => setLogoLoaded(false)}
            />
          </div>

          <div>
            <div className="knft-brand-name">KNFT</div>
            <span className="knft-brand-subtitle">
              KALAM NATION FIRST TRUST
            </span>
          </div>
        </div>

        <button
          type="button"
          className="knft-skip"
          onClick={finishIntro}
          aria-label="Skip introduction and visit homepage"
        >
          SKIP INTRO <span aria-hidden="true">→</span>
        </button>
      </header>

      <main className="knft-intro-content">
        <div className="knft-intro-heading">
          <div className="knft-eyebrow">Our Journey · Our Impact</div>

          <h1>
            Together, We Create
            <br />
            <span>A Better Tomorrow.</span>
          </h1>

          <p>
            Every action creates change. Every volunteer makes a difference.
          </p>
        </div>

        <div className="knft-video-window">
          <div
            className="knft-video-track"
            style={{
              animationPlayState: reducedMotion ? "paused" : "running",
            }}
          >
            {repeatedVideos.map((video, index) => (
              <article
                className={`knft-video-item ${
                  video.ratio === "landscape" ? "landscape" : ""
                }`}
                key={`${video.id}-${index}`}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${video.id}&playsinline=1&rel=0&modestbranding=1`}
                  title={video.title}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  referrerPolicy="strict-origin-when-cross-origin"
                  loading={index < 4 ? "eager" : "lazy"}
                />

                <div className="knft-video-overlay">
                  <span className="knft-video-label">KNFT INITIATIVE</span>
                  <div className="knft-video-title">{video.title}</div>
                  <div className="knft-video-description">
                    {video.description}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <footer className="knft-intro-footer">
        <div className="knft-footer-message">
          Building a sustainable future, together.
        </div>

        <div
          className="knft-progress-area"
          aria-label={`Introduction progress ${Math.floor(progress)} percent`}
        >
          <div className="knft-progress-track">
            <div
              className="knft-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <span className="knft-progress-text">
            {Math.floor(progress)}%
          </span>
        </div>
      </footer>
    </div>
  );
}
