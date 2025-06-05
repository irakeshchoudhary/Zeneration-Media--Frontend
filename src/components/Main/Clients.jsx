import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const clients = [
    {
        title: 'Citizen of Nowhere',
        subtitle: 'Shinjuku Nights',
        author: 'Matt Perry',
        tags: ['Layout', 'Animation'],
        video: '/Videos/Video1.mp4',
        thumbnail: '/Photos/Thumbnail1.jpg',
    },
    {
        title: 'Chair Collection',
        subtitle: 'Shop Now',
        author: 'Austin Malerba',
        tags: ['Motion', 'Component'],
        video: '/Videos/Video2.mp4',
        thumbnail: '/Photos/Thumbnail2.jpg',
    },
    {
        title: 'Max Barvian',
        subtitle: '-3.2K',
        author: 'Max Barvian',
        tags: ['AnimateNumber'],
        video: '/Videos/Video3.mp4',
        thumbnail: '/Photos/Thumbnail3.jpg',
    },
    {
        title: 'Brand Success',
        subtitle: 'Growth Story',
        author: 'Nisha Patel',
        tags: ['Brand', 'Growth'],
        video: '/Videos/Video4.mp4',
        thumbnail: '/Photos/Thumbnail4.jpg',
    },
];

const BORDER_COLORS = [
    'border-red-400',
    'border-blue-400',
    'border-green-400',
    'border-yellow-400',
];

const REPEAT = 3; // Repeat cards for seamless loop
const TOTAL_CARDS = clients.length * REPEAT;

const Clients = () => {
    const [paused, setPaused] = useState(false);
    const [hovered, setHovered] = useState(null);
    const controls = useAnimation();
    const containerRef = useRef();
    const cardRef = useRef(); // Add ref for a single card to measure
    const [containerWidth, setContainerWidth] = useState(0);
    const [centerIdx, setCenterIdx] = useState(0);
    const [currentX, setCurrentX] = useState(0);
    const [loopWidth, setLoopWidth] = useState(0); // State to store the dynamic loop width

    useEffect(() => {
        document.title = "Zeneration Media | Clients";
    }, []);

    // Calculate dimensions dynamically on mount and resize
    useEffect(() => {
        const calculateDimensions = () => {
            if (containerRef.current && cardRef.current) {
                const cardElement = cardRef.current;
                const containerElement = containerRef.current;

                // Measure actual card width
                const actualCardWidth = cardElement.getBoundingClientRect().width;

                // Measure actual gap between cards using getComputedStyle
                const computedStyle = window.getComputedStyle(containerElement);
                // Use the gap property from the flex container
                const actualGap = parseFloat(computedStyle.gap) || 0;

                const totalVisibleCardWidth = (actualCardWidth + actualGap) * clients.length;
                const totalContainerWidth = totalVisibleCardWidth * REPEAT;
                const calculatedLoopWidth = totalVisibleCardWidth;

                setContainerWidth(totalContainerWidth);
                setLoopWidth(calculatedLoopWidth);

                // Restart animation with new dimensions if not paused
                if (!paused) {
                    controls.stop();
                    // Recalculate currentX based on the new loopWidth to maintain visual position
                    const newCurrentX = (currentX % loopWidth) || 0; // Use modulo to keep it within new loop bounds
                    setCurrentX(newCurrentX);
                    animateScroll(newCurrentX, calculatedLoopWidth);
                }
            }
        };

        calculateDimensions(); // Calculate on mount

        // Recalculate on window resize
        window.addEventListener('resize', calculateDimensions);

        // Cleanup resize listener
        return () => {
            window.removeEventListener('resize', calculateDimensions);
            controls.stop(); // Stop animation on unmount
        };
    }, [clients.length, paused, controls]); // Removed currentX from dependencies to prevent infinite loop

    // Animation logic with resume from currentX
    // Extracted animation logic into a function
    const animateScroll = useCallback(async (fromX, width) => {
        const targetWidth = width; // Use provided width
        let startX = fromX;
        // Ensure startX is within the loop bounds
        while (startX <= -targetWidth) startX += targetWidth;
        while (startX > 0) startX -= targetWidth;

        // Calculate the new duration based on the distance to cover and the targetWidth (which represents one loop)
        // We want the speed to be constant regardless of screen size, so the duration should be proportional to the targetWidth
        // Let's assume a base speed such that one full loop (targetWidth) takes baseDuration seconds.
        const baseDuration = 45; // Adjust this value to control the speed (seconds for one full loop)

        // Calculate the duration for the current segment based on the remaining distance
        // If startX is 0, duration is baseDuration. If startX is -targetWidth, duration is also baseDuration.
        // For a value in between, the duration is (distance_to_cover / targetWidth) * baseDuration
        // The distance to cover from startX to -targetWidth is Math.abs(-targetWidth - startX)
        const distanceToCover = Math.abs(-targetWidth - startX);

        // Prevent division by zero if targetWidth is 0 (e.g., on initial render before measurements)
        const duration = targetWidth > 0 ? (distanceToCover / targetWidth) * baseDuration : baseDuration;


        await controls.start({
            x: [startX, -targetWidth],
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: 'loop',
                    duration: duration,
                    ease: 'linear',
                },
            },
            onUpdate: (latest) => setCurrentX(latest.x), // Update currentX during animation
        });
    }, [controls]); // Depend on controls

    useEffect(() => {
        // Start animation when containerWidth and loopWidth are calculated and not paused
        if (containerWidth > 0 && loopWidth > 0 && !paused) {
            animateScroll(currentX, loopWidth); // Start animation from currentX
        }
        // Cleanup function to stop animation when component unmounts or dependencies change
        return () => controls.stop();
    }, [containerWidth, loopWidth, paused, controls, animateScroll, currentX]); // Added currentX as dependency here to correctly restart animation if it changes externally

    // Fix: Resume animation after tab switch/visibility change
    useEffect(() => {
        const handleVisibility = () => {
            // Only restart animation if the tab becomes visible AND it was not explicitly paused by the user
            if (!document.hidden && !paused && containerWidth > 0 && loopWidth > 0) {
                controls.stop();
                controls.set({ x: currentX }); // Set to current X position
                animateScroll(currentX, loopWidth); // Restart animation from current X
            } else if (document.hidden) {
                controls.stop(); // Stop animation when tab is not visible
            }
        };
        // Add event listener to the document for visibility changes
        document.addEventListener('visibilitychange', handleVisibility);
        // Cleanup function to remove the event listener
        return () => document.removeEventListener('visibilitychange', handleVisibility);
    }, [paused, containerWidth, controls, currentX, loopWidth, animateScroll]); // Added currentX, loopWidth, animateScroll to dependencies

    // Pause on hover
    const handleMouseEnter = () => setPaused(true);
    const handleMouseLeave = () => setPaused(false);

    // Track which card is visually at the center (for border color cycling)
    useEffect(() => {
        const updateCenter = () => {
            if (!containerRef.current || !cardRef.current) return;

            const containerRect = containerRef.current.getBoundingClientRect();
            const cardWidth = cardRef.current.getBoundingClientRect().width;
            const computedStyle = window.getComputedStyle(containerRef.current);
            const actualGap = parseFloat(computedStyle.gap) || 0;
            const cardAndGap = cardWidth + actualGap;

            if (cardAndGap <= 0) return; // Prevent division by zero

            let minDist = Infinity;
            let idx = 0;

            // Calculate the center of the viewport
            const viewportCenter = window.innerWidth / 2;

            for (let i = 0; i < TOTAL_CARDS; i++) {
                // Calculate the center of each card relative to the viewport
                const cardLeftRelativeToViewport = containerRect.left + i * cardAndGap;
                const cardCenterRelativeToViewport = cardLeftRelativeToViewport + cardWidth / 2;

                const dist = Math.abs(cardCenterRelativeToViewport - viewportCenter);

                if (dist < minDist) {
                    minDist = dist;
                    idx = i;
                }
            }
            setCenterIdx(idx);
        };

        // Update center index more frequently for smoother effect
        const interval = setInterval(updateCenter, 50); // Increased frequency

        return () => clearInterval(interval);
    }, [containerWidth, loopWidth, currentX, clients.length]); // Added dependencies that affect positioning

    // Center card's border color cycles through BORDER_COLORS
    const borderColor = BORDER_COLORS[centerIdx % BORDER_COLORS.length];

    return (
        <section className="relative min-h-[600px] flex flex-col items-center justify-center px-4 py-20 overflow-x-hidden">
            <Helmet>
                <title>Client Success Stories | Zeneration Media Kalyan</title>
                <meta name="description" content="See how Zeneration Media, the best marketing agency in Kalyan, helped clients achieve remarkable growth. Real success stories from a top ad agency." />
            </Helmet>
            <div className="mb-2 text-xs tracking-widest text-zinc-400 bg-[#1a2321] px-3 py-1 rounded-full font-['F3']">SUCCESS STORIES</div>
            <h2 className="md:text-5xl text-4xl text-nowrap font-['F3'] text-white text-center mb-2">Our Trusted Clients</h2>
            <p className="text-zinc-400 text-center text-sm md:max-w-2xl mx-auto mb-12 font-['F3'] md:text-base">
                We've helped brands grow, convert, and thrive.<br />
                From local businesses to growing startups — here are some of our success stories and the amazing clients who trust Zeneration Media to fuel their growth journey.
            </p>
            <div className="relative w-full flex items-center justify-center mt-4" style={{ height: 350 }}>
                {/* Left Blur - Adjust visibility or size for mobile */}
                {/* Adjusted blur width and position for better responsiveness */}
                <div className="absolute left-0 w-1/4 md:w-32 top-0 h-full z-30 pointer-events-none" style={{ filter: 'blur(18px)', background: 'linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0))' }} />
                {/* Right Blur - Adjust visibility or size for mobile */}
                {/* Adjusted blur width and position for better responsiveness */}
                <div className="absolute right-0 w-1/4 md:w-32 top-0 h-full z-30 pointer-events-none" style={{ filter: 'blur(18px)', background: 'linear-gradient(to left, rgba(0,0,0,0.9), rgba(0,0,0,0))' }} />

                <div
                    className="relative flex items-center justify-center w-full max-w-7xl overflow-hidden z-20"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <motion.div
                        ref={containerRef}
                        // Use responsive gap and flexible width for cards
                        className="flex gap-4 md:gap-8 items-center flex-nowrap"
                        animate={controls}
                        initial={{ x: 0 }}
                        style={{ minWidth: containerWidth }} // Use dynamically calculated containerWidth
                        onUpdate={(latest) => setCurrentX(latest.x)} // Update currentX during animation
                    >
                        {Array(REPEAT).fill(0).flatMap((_, repIdx) =>
                            clients.map((client, idx) => {
                                const isCenter = (repIdx * clients.length + idx) === centerIdx;
                                const isHovered = hovered === repIdx * clients.length + idx;
                                return (
                                    <motion.div
                                        key={`${repIdx}-${idx}`}
                                        // Assign ref to the first card to measure
                                        ref={repIdx === 0 && idx === 0 ? cardRef : null}
                                        // Use responsive width for cards
                                        className={`relative flex flex-col justify-between items-start bg-[#181c1b] rounded-xl shadow-lg transition-all ease-in duration-300 ${isCenter ? borderColor + ' scale-100 border-[0.01px] z-10' : 'border-transparent scale-90 border-[0.01px] z-0'} w-[85vw] max-w-[420px] h-[340px] p-0 cursor-pointer overflow-hidden flex-shrink-0`}
                                        style={{ fontFamily: 'F3', height: 340 }} // Keep height fixed or make responsive if needed
                                        onMouseEnter={() => setHovered(repIdx * clients.length + idx)}
                                        onMouseLeave={() => setHovered(null)}
                                    >
                                        {/* Video/Thumbnail fills card */}
                                        <div className="absolute inset-0 w-full h-full rounded-xl overflow-hidden">
                                            <img
                                                src={client.thumbnail}
                                                alt={client.title}
                                                className={`w-full h-full object-cover transition-all duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
                                                draggable={false}
                                            />
                                            {isHovered && (
                                                <video
                                                    src={client.video}
                                                    className="absolute inset-0 w-full h-full object-cover"
                                                    autoPlay
                                                    muted
                                                    loop
                                                    playsInline
                                                />
                                            )}
                                        </div>
                                        {/* Content appears on hover */}
                                        <AnimatePresence>
                                            {isHovered && (
                                                <motion.div
                                                    className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20"
                                                    initial={{ opacity: 0, y: 30 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 30 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <div className="flex-1 w-full">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <span className="font-bold text-white text-base">{client.title}</span>
                                                        </div>
                                                        <div className="text-xs text-white mb-2">{client.subtitle}</div>
                                                    </div>
                                                    <div className="flex items-center justify-between w-full mt-4">
                                                        <span className="text-xs text-white/80 font-semibold">{client.author}</span>
                                                        <div className="flex gap-2">
                                                            {client.tags.map((tag, i) => (
                                                                <span key={i} className="bg-zinc-800 text-zinc-200 text-xs px-2 py-1 rounded font-mono tracking-wide">
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                );
                            })
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Clients;