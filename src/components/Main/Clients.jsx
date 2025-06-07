import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import AppleCardsCarousel from '../Common/AppleCardsCarousel';

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

const clientDetails = [
    {
        title: "Digital Transformation Success",
        subtitle: "How we helped a traditional business go digital",
        description: "We transformed their online presence with a modern website, social media strategy, and digital marketing campaigns. The result? A 300% increase in online leads and 150% growth in social media engagement.",
        image: "/Photos/Thumbnail1.jpg",
        stats: [
            { label: "Increase in Online Leads", value: "300%" },
            { label: "Social Media Growth", value: "150%" },
            { label: "Customer Engagement", value: "200%" }
        ]
    },
    {
        title: "E-commerce Revolution",
        subtitle: "Building a successful online store",
        description: "Our comprehensive e-commerce solution helped them launch their online store with seamless payment integration, inventory management, and marketing automation. The store now generates 40% of their total revenue.",
        image: "/Photos/Thumbnail2.jpg",
        stats: [
            { label: "Revenue from Online Store", value: "40%" },
            { label: "Customer Retention", value: "85%" },
            { label: "Average Order Value", value: "₹2,500" }
        ]
    },
    {
        title: "Brand Identity Makeover",
        subtitle: "Creating a memorable brand presence",
        description: "We redesigned their brand identity, including logo, color scheme, and marketing materials. The new brand identity helped them stand out in a crowded market and increased brand recognition by 200%.",
        image: "/Photos/Thumbnail3.jpg",
        stats: [
            { label: "Brand Recognition", value: "200%" },
            { label: "Market Share Growth", value: "45%" },
            { label: "Customer Loyalty", value: "90%" }
        ]
    },
    {
        title: "Social Media Dominance",
        subtitle: "Mastering the digital landscape",
        description: "Our social media strategy helped them build a strong online community and engage with their audience effectively. They now have over 100K followers and generate 500+ leads monthly through social media.",
        image: "/Photos/Thumbnail4.jpg",
        stats: [
            { label: "Social Media Followers", value: "100K+" },
            { label: "Monthly Leads", value: "500+" },
            { label: "Engagement Rate", value: "8.5%" }
        ]
    }
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
    const [showDetails, setShowDetails] = useState(false);

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
        <section className="relative min-h-[1200px] flex flex-col items-center justify-center px-4 py-12">
            <Helmet>
                <title>Client Success Stories | Zeneration Media Kalyan</title>
                <meta name="description" content="See how Zeneration Media, the best marketing agency in Kalyan, helped clients achieve remarkable growth. Real success stories from a top ad agency." />
            </Helmet>
            <div className="mb-2 text-xs tracking-widest text-zinc-400 bg-zinc-900 px-3 py-1 rounded-full">SUCCESS STORIES</div>
            <h2 className="md:text-3xl text-2xl text-nowrap text-white text-center mb-2">Our Trusted Clients</h2>
            <p className="text-zinc-400 text-center text-sm md:max-w-xl mx-auto mb-8 md:text-sm">
                We've helped brands grow, convert, and thrive.<br />
                From local businesses to growing startups — here are some of our success stories.
            </p>
            <div className="relative w-full max-w-5xl flex items-center justify-center mt-4" style={{ height: 800 }}>
                {/* Left Blur */}
                <div className="absolute left-0 w-1/4 md:w-32 top-0 h-full z-30 pointer-events-none" style={{ filter: 'blur(18px)', background: 'linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0))' }} />
                {/* Right Blur */}
                <div className="absolute right-0 w-1/4 md:w-32 top-0 h-full z-30 pointer-events-none" style={{ filter: 'blur(18px)', background: 'linear-gradient(to left, rgba(0,0,0,0.9), rgba(0,0,0,0))' }} />

                <div
                    className="relative flex items-center justify-center w-full z-20"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <motion.div
                        ref={containerRef}
                        className="flex gap-4 md:gap-8 items-center flex-nowrap"
                        animate={controls}
                        initial={{ x: 0 }}
                        style={{ minWidth: containerWidth }}
                        onUpdate={(latest) => setCurrentX(latest.x)}
                    >
                        <AppleCardsCarousel />
                    </motion.div>
                </div>
            </div>

            {/* View More Details Button */}
            <motion.button
                onClick={() => setShowDetails(!showDetails)}
                className="mt-8 px-5 py-2 bg-zinc-900 text-white rounded-full flex items-center gap-2 hover:bg-zinc-800 transition-all duration-300 text-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                {showDetails ? "Hide Details" : "View More Details"}
                <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${showDetails ? 'rotate-180' : ''}`} />
            </motion.button>

            {/* Client Details Section */}
            <AnimatePresence>
                {showDetails && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="w-full max-w-5xl mx-auto mt-12 space-y-12"
                    >
                        {clientDetails.map((detail, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.2 }}
                                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 items-center bg-zinc-900/50 p-6 rounded-xl backdrop-blur-sm`}
                            >
                                {/* Image Section */}
                                <div className="w-full md:w-1/2">
                                    <motion.img
                                        src={detail.image}
                                        alt={detail.title}
                                        className="w-full h-[300px] object-cover rounded-lg shadow-lg"
                                        whileHover={{ scale: 1.01 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </div>

                                {/* Content Section */}
                                <div className="w-full md:w-1/2 space-y-4">
                                    <div>
                                        <h3 className="text-xl font-medium text-white mb-1">{detail.title}</h3>
                                        <p className="text-sm text-zinc-400 mb-3">{detail.subtitle}</p>
                                        <p className="text-sm text-zinc-500">{detail.description}</p>
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-3 gap-3">
                                        {detail.stats.map((stat, i) => (
                                            <div key={i} className="bg-zinc-800/50 p-3 rounded-lg">
                                                <p className="text-lg font-medium text-white">{stat.value}</p>
                                                <p className="text-xs text-zinc-500">{stat.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Clients;