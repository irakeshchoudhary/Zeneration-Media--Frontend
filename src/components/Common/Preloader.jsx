import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Preloader = ({ onFinish }) => {
  const preloaderRef = useRef();
  const blueScreenRef = useRef();
  const zenerationRef = useRef();
  const theRef = useRef();
  const mediaRef = useRef();
  const dotcomRef = useRef();

  useEffect(() => {
    // Prevent scroll on body
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    document.body.style.width = '100vw';

    const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });

    tl.fromTo(
      zenerationRef.current,
      { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
      { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 1.2 }
    )
      .fromTo(
        [theRef.current, mediaRef.current, dotcomRef.current],
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        { clipPath: 'inset(0 0% 0 0)', opacity: 1, stagger: 0.2, duration: 0.7 },
        '-=0.7'
      )
      .to(preloaderRef.current, {
        y: '-100%',
        duration: 1,
        delay: 0.7,
      })
      .to(
        blueScreenRef.current,
        {
          y: '-100vh',
          duration: 1,
          delay: 0.2,
          onStart: () => {
            blueScreenRef.current.style.display = 'block';
          },
          onComplete: () => {
            // Restore scroll on body
            document.body.style.overflow = originalOverflow;
            document.body.style.height = '';
            document.body.style.width = '';
            if (onFinish) onFinish();
          },
        },
        '-=1'
      );

    return () => {
      // Restore scroll on body if unmounts early
      document.body.style.overflow = originalOverflow;
      document.body.style.height = '';
      document.body.style.width = '';
    };
  }, [onFinish]);

  return (
    <>
      <div
        ref={blueScreenRef}
        className="fixed overflow-hidden top-0 left-0 w-screen h-screen bg-black z-[9998]"
        style={{ display: 'none' }}
      />
      <div
        ref={preloaderRef}
        className="fixed top-0 left-0 w-screen h-screen bg-black z-[9999] flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Top static text */}
        <div className="absolute top-[2.5vh] left-1/2 transform -translate-x-1/2 text-white text-[1rem] tracking-[0.03em] font-[Gilroy-SemiBold] pointer-events-none z-20 text-center sm:text-[1rem] sm:text-zinc-400 sm:top-[2.2vh] w-full">
          Best Marketing Agency in Kalyan
        </div>

        {/* Content */}
        <div className="flex flex-col mb-20 items-center justify-center w-screen h-screen relative">
          <span
            ref={theRef}
            className="text-white text-[3.5vw] leading-[0.95] tracking-[0.05em] font-[Gilroy-SemiBold] self-start ml-[8vw] sm:text-[2.2rem] sm:ml-[14vw]"
          >
            The
          </span>
          <span
            ref={zenerationRef}
            className="text-white font-[Gilroy-Black] font-black text-[14vw] leading-[0.90] tracking-[0.02em] whitespace-nowrap sm:text-[12vw]"
          >
            ZENERATION
          </span>
          <span className="flex items-end relative left-[36vw] sm:left-[32.4vw]">
            <span
              ref={mediaRef}
              className="text-white leading-[0.95] font-[Gilroy-SemiBold] text-[3.5vw] mr-[0.1vw] sm:text-[2.2vw]"
            >
              Media
            </span>
            <span
              ref={dotcomRef}
              className="text-white font-[Gilroy-Medium] text-[1.7vw] mb-[0.4vw] sm:text-[1vw]"
            >
            </span>
          </span>
        </div>

        {/* Bottom static text */}
        <div className="absolute bottom-[12vh] w-full left-1/2 transform -translate-x-1/2 text-white opacity-70 text-[0.85rem] tracking-[0.02em] font-[Gilroy-SemiBold] pointer-events-none z-20 text-center sm:text-[0.85rem] sm:bottom-[2vh]">
          We Make It Simple But Significant
        </div>
      </div>
    </>
  );
};

export default Preloader;
