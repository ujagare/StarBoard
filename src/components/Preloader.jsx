import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const PREFERS_REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/**
 * @param {{ logoSrc: string; onComplete: () => void }} props
 */
export default function Preloader({ logoSrc, onComplete }) {
  const rootRef = useRef(null);
  const logoRef = useRef(null);
  const shineRef = useRef(null);
  const lineRef = useRef(null);
  const progressRef = useRef({ value: 0 });
  const rafRef = useRef(0);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    const logo = logoRef.current;
    const shine = shineRef.current;
    const line = lineRef.current;
    const previousOverflow = document.body.style.overflow;
    const reducedMotion = window.matchMedia(PREFERS_REDUCED_MOTION).matches;

    document.body.style.overflow = "hidden";

    const updatePercent = () => {
      setPercent(Math.min(100, Math.round(progressRef.current.value)));
      rafRef.current = requestAnimationFrame(updatePercent);
    };

    rafRef.current = requestAnimationFrame(updatePercent);

    const tl = gsap.timeline({
      defaults: { ease: "power4.inOut" },
      onComplete: () => {
        cancelAnimationFrame(rafRef.current);
        setPercent(100);
        document.body.style.overflow = previousOverflow;
        onComplete();
      },
    });

    if (reducedMotion) {
      tl.set(progressRef.current, { value: 100 })
        .set(line, { scaleX: 1 })
        .to(root, { opacity: 0, duration: 0.35 });
      return () => {
        cancelAnimationFrame(rafRef.current);
        document.body.style.overflow = previousOverflow;
        tl.kill();
      };
    }

    gsap.set(line, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(shine, { xPercent: -160, rotate: 12 });

    tl.fromTo(
      logo,
      { autoAlpha: 0, y: 10, scale: 0.86, rotate: -4, filter: "brightness(0.62) blur(3px)" },
      { autoAlpha: 1, y: 0, scale: 1, rotate: 0, filter: "brightness(1) blur(0px)", duration: 0.96 },
    )
      .to(shine, { xPercent: 168, duration: 1.28 }, "-=0.34")
      .to(
        progressRef.current,
        {
          value: 100,
          duration: 2.05,
          ease: "power4.inOut",
        },
        "-=0.55",
      )
      .to(line, { scaleX: 1, duration: 2.05 }, "<")
      .to(logo, { scale: 1.085, rotate: 2, filter: "brightness(1.08)", duration: 0.62 }, "-=0.12")
      .to(root, { yPercent: -100, duration: 0.92 }, "-=0.08");

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.body.style.overflow = previousOverflow;
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div ref={rootRef} className="preloader fixed inset-0 z-[999] grid place-items-center">
      <div className="preloader-panel" aria-live="polite" aria-label={`Loading ${percent}%`}>
        <div className="preloader-logo-wrap">
          <img ref={logoRef} src={logoSrc} alt="Starboard Realtors" className="preloader-logo" />
          <span ref={shineRef} className="preloader-shine" />
        </div>
        <div className="preloader-line-shell">
          <span ref={lineRef} className="preloader-line" />
        </div>
        <div className="preloader-percent">{percent}%</div>
      </div>
    </div>
  );
}
