"use client";

import { WobbleCard } from "../ui/wobble-card";
import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from "../ui/button";
import LeadFormDialog from "./LeadFormDialog";
import {
    ChartNoAxesCombined,
    Ghost,
    HeartHandshake,
    Ribbon,
    Zap,
} from "lucide-react";
import { AnimatePresence } from 'motion/react';
import FAQs from "./FAQs";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// Animation variants for fade-in effect
// Yeh elements ko smoothly dikhane aur hide karne ke liye use hoga (jaise text change hone par)
const fadeIn = {
    initial: { opacity: 0, y: 20 }, // Shuru mein thoda neeche aur hidden
    animate: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.77, 0, 0.175, 1] } }, // Animate hokar dikhe aur sahi jagah aaye
    exit: { opacity: 0, y: -20, transition: { duration: 0.5, ease: "easeOut" } }, // Fade out aur thoda upar jaate hue hide ho
};

// Text fade-in/out variants (AnimatePresence ke andar single element ke liye)
// Yeh AnimatePresence ke andar रैप किए गए div par lagayenge for H2 and P tag
const textFadeIn = {
    initial: { opacity: 0 }, // Shuru mein hidden
    animate: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }, // Dikhne ke liye animate
    exit: { opacity: 0, transition: { duration: 0.3, ease: "easeOut" } }, // Hide hone ke liye animate
};

// Highlight items data (Yeh har highlight point aur uski image hai)
const highlightItems = [
    {
        h2: "Full Funnel Performance Marketing Approach",
        p: "From ads to automation to conversion, we build the entire funnel for you.\nWe study your business, audience & goals before doing any marketing.",
        img: "https://i.pinimg.com/736x/c5/dc/1b/c5dc1b552a84bac03acf7746f8581901.jpg"
    },
    {
        h2: "Meta Ads That Work",
        p: "Run targeted Instagram & Facebook ads for leads, reach & growth.",
        img: "https://i.pinimg.com/736x/e2/a4/4e/e2a44ef9bdd5dcbab71b0b7135f30dae.jpg"
    },
    {
        h2: "Organic Content Boost",
        p: "Engaging posts that build trust & brand image naturally.",
        img: "https://i.pinimg.com/736x/df/f0/3e/dff03e91dadb83ec297d85e9321bb435.jpg"
    },
    {
        h2: "Creatives That Convert",
        p: "Scroll-stopping designs & videos crafted for your ideal customer.",
        img: "https://i.pinimg.com/736x/d5/42/47/d542478f6a96f3ad4a457a29af4bb92d.jpg"
    },
    {
        h2: "Smart Landing Pages",
        p: "Different pages for different lead stages to boost conversions.",
        img: "https://i.pinimg.com/736x/53/f5/ac/53f5ac8480ff26744d62daf46327f96c.jpg"
    },
    {
        h2: "AI-Powered Design & Copy",
        p: "Save time with modern, fast & effective creative development using AI.",
        img: "https://i.pinimg.com/736x/28/35/77/2835772b4161e52e9cc2553fb703f7e3.jpg"
    },
    {
        h2: "Clear Reports, Real Growth",
        p: "Understand exactly how your business grows with our monthly reports.",
        img: "https://i.pinimg.com/736x/9e/9e/02/9e9e02771a32706f93e1e027b8d9a485.jpg"
    },
    {
        h2: "Custom Strategy, No Templates",
        p: "We do what works — not what's trendy. Pure results, no fluff.",
        img: "https://i.pinimg.com/736x/58/bf/03/58bf039cae701af3e44489ca310e07c2.jpg"
    },
];

export default function Services() {
    // Refs to target elements for Framer Motion and GSAP
    const containerRef = useRef(null); // Main container div for scroll tracking
    const leftRef = useRef(null); // Left column div for pinning
    const rightRef = useRef(null); // Right column div for scroll height calculation

    // Framer Motion hook to track scroll progress of the container
    // Isse pata chalega container kitna scroll hua hai (0 se 1 tak)
    const { scrollYProgress } = useScroll({
        target: containerRef, // Is element ke scroll ko track karo
        offset: ["start center", "end center"], // Tracking start jab container ka 'start' viewport ke 'center' mein aaye, end jab container ka 'end' viewport ke 'center' mein aaye.
    });

    // State to manage the currently visible highlight item based on scroll
    const [currentItem, setCurrentItem] = useState(highlightItems[0]); // Default pehla item dikhega

    // Update the current item when scroll progress changes
    // Jab scroll ho raha hai aur scrollYProgress badalta hai, uske hisab se kaunsa item dikhana hai yeh decide hoga
    useEffect(() => {
        // scrollYProgress ki value 0 se 1 tak hoti hai
        // is value ko highlightItems array ke index (0 se highlightItems.length - 1) mein map kar rahe hain
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            // latest value scrollYProgress ki hai (e.g., 0.1, 0.5, 0.9)
            // isko total items se multiply karke current item ka rough index nikal rahe hain
            const itemProgress = latest * highlightItems.length;
            // Index ko nearest whole number mein round off kar rahe hain
            const roundedIndex = Math.round(itemProgress);
            // Yeh ensure kar rahe hain ki index array bounds ke andar hi rahe (0 se max index tak)
            const safeIndex = Math.max(0, Math.min(roundedIndex, highlightItems.length - 1));

            // Agar safeIndex current item ke index se alag hai, toh state update karo
            // Yeh check zaruri hai taaki same index par bar bar state update na ho
            if (safeIndex !== highlightItems.indexOf(currentItem)) {
                // Find the item object based on the safeIndex
                const newItem = highlightItems[safeIndex];
                // Agar new item current item se alag hai, toh state update karo
                // Yeh comparison object level par ho raha hai
                if (newItem !== currentItem) {
                    setCurrentItem(newItem);
                }
            }
        });

        // Cleanup function: component unmount hone par scroll listener ko remove karo
        return () => unsubscribe();
    }, [scrollYProgress, highlightItems, currentItem]); // Dependencies: scrollYProgress, highlightItems, aur currentItem

    // GSAP ScrollTrigger setup for pinning the left column
    // Yeh useEffect tab chalega jab component mount ho ya containerRef/leftRef/rightRef mein change aaye (although refs usually don't change)
    useEffect(() => {
        let ctx = gsap.context(() => {
            // Pinning logic sirf desktop/tablet viewports ke liye (> 768px) enabled hai
            if (window.innerWidth >= 768) {
                ScrollTrigger.create({
                    trigger: containerRef.current, // Is element ko scroll trigger ke liye use karo
                    start: 'top 10%', // Jab container ka top viewport ke top se mile tab pinning start karo
                    // Pinning ka end point: trigger ke start point se lekar right column ki total scroll height tak
                    // Iska matlab left column tab tak sticky rahega jab tak right column ka sara content scroll na ho jaye
                    end: () => '+=' + (rightRef.current?.scrollHeight || containerRef.current?.scrollHeight || 0), // Fallback added in case rightRef is null initially
                    pin: leftRef.current, // Is element ko sticky (pin) karo
                    pinSpacing: false, // Sticky hone par extra space add na kare
                    scrub: true, // Scroll position ke sath animation sync karo smoothly
                    anticipatePin: 1, // Thoda pehle se pin hone ke liye prepare kare (smoothness ke liye)
                    markers: true // Debugging ke liye markers dikhaye (can be removed in production)
                });
            }
        }, containerRef); // GSAP context ko containerRef se bound karo

        // Cleanup function: component unmount hone par GSAP instances ko revert karo
        return () => ctx.revert();
    }, [containerRef, leftRef, rightRef]); // Dependencies: Refs (taaki agar refs kabhi change ho toh effect re-run ho, though unlikely)

    useEffect(() => {
        document.title = "Zeneration Media | Services";
    }, []);

    return (
        // Main Section: Full width, background color, padding top/bottom
        // Responsive padding: mobile par kam, desktop par zyada
        <section
            className="relative w-full flex flex-col items-center px-4 pt-32 pb-16 md:pt-48 md:pb-24"
            style={{ backgroundColor: "#0C1012" }}
        >
            {/* Background Image: Purely decorative, low opacity */}
            {/* Responsive height: mobile par kam height, desktop par full screen height */}
            <img
                src="/Photos/ServicesBg.png"
                alt="Services Background" // Alt text for accessibility
                className="absolute w-full top-0 h-[40vh] md:h-screen object-cover opacity-10 pointer-events-none select-none"
                style={{ zIndex: 1 }} // Ensure it's behind content
            />

            {/* Content Wrapper: Max width, centered, responsive padding */}
            {/* Mobile par full width, desktop par 65% width (adjust as needed) */}
            <div className="relative z-10 w-full md:max-w-[65%] mx-auto px-4 md:px-0 font-['F3']">
                {/* Title & Subtitle: Animated fade-in */}
                {/* Responsive font sizes and margins */}
                <motion.h1
                    variants={fadeIn} // Animation variants apply
                    initial="initial"
                    animate="animate"
                    className="text-3xl md:text-5xl mt-10 md:mt-34 font-bold mb-2 md:mb-4 text-white text-left"
                >
                    Solutions We Offer
                </motion.h1>
                <motion.p
                    variants={fadeIn} // Animation variants apply
                    initial="initial"
                    animate="animate"
                    className="text-sm md:text-md text-zinc-300 max-w-2xl mb-4 md:mb-6 text-left"
                >
                    Every service we offer is focused on one thing — business growth. Whether you want more leads, sales, or visibility — we've got you covered.
                </motion.p>

                {/* CTA Button: Responsive width */}
                <div className="w-full flex justify-left mb-16 md:mb-24">
                    {/* LeadFormDialog component ka button */}
                    <LeadFormDialog triggerButtonText="Get Free Consultation" buttonClassName="w-full md:w-44 text-sm font-['Gilroy-SemiBold']" />
                </div>

                {/* Benefits Tags: Responsive gap */}
                <div className="mt-8 flex flex-wrap justify-left gap-2 md:gap-4 text-xs font-['F3'] text-zinc-300">
                    {/* Har tag ek flex item hai icon aur text ke sath */}
                    <p className="flex items-center gap-1"><Ghost size={16} /> Visibility</p> {/* Icon size responsive kiya */}
                    <p className="flex items-center gap-1"><Ribbon size={16} /> Branding</p> {/* Icon size responsive kiya */}
                    <p className="flex items-center gap-1"><ChartNoAxesCombined size={16} /> Conversion</p> {/* Icon size responsive kiya */}
                    <p className="flex items-center gap-1"><Zap size={16} /> Automation</p> {/* Icon size responsive kiya */}
                    <p className="flex items-center gap-1"><HeartHandshake size={16} /> Trust</p> {/* Icon size responsive kiya */}
                </div>

                {/* Highlight Box Container: Flex layout for columns, scroll tracking enabled by ref */}
                {/* min-h-screen added on MD and above for pinning to work correctly */}
                <div ref={containerRef} className="mt-16 md:mt-20 flex flex-col md:flex-row items-start gap-8 md:gap-10 relative md:min-h-screen">
                    {/* Sticky Left Column (Text): Pinned on desktop/tablet */}
                    {/* Note: CSS sticky removed, GSAP handles pinning */}
                    {/* md:self-start ensures it aligns to the top in the flex container on desktop */}
                    <div ref={leftRef} className="w-full md:w-1/2 flex flex-col gap-4 md:gap-6 pt-6 md:pt-10 md:self-start" style={{ zIndex: 2 }}>
                        <p className="px-3 py-1 bg-[#131D1D] text-[#5B9983] text-xs rounded-full w-fit">
                            The Zeneration Media™
                        </p>
                        {/* AnimatePresence: Animates content changes (h2/p) */}
                        {/* mode="wait": Purana element hide hone ke baad naya dikhega */}
                        {/* motion.div isliye use kiya taaki AnimatePresence ek single child dekhe */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentItem.h2} // Key changing content ke liye
                                variants={textFadeIn} // Fade animation apply
                                initial="initial"
                                animate="animate"
                                exit="exit"
                            >
                                {/* H2 Tag for Highlight Title */}
                                <h2 className="text-xl md:text-4xl font-bold text-white">
                                    {currentItem.h2}
                                </h2>
                                {/* P Tag for Highlight Description */}
                                <p className="text-xs md:text-sm text-zinc-400 leading-relaxed mt-2">
                                    {currentItem.p}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Scrollable Right Column (Images): Contains images that scroll behind the sticky left column */}
                    {/* mt-10 added for mobile spacing */}
                    <div ref={rightRef} className="w-full md:w-1/2 flex flex-col gap-4 mt-10 md:mt-0" style={{ height: `${highlightItems.length * 80}vh` }}> {/* Height adjusted for more scroll range */}
                        {/* Map through highlight items to display images */}
                        {highlightItems.map((item, index) => {
                            const isLastItem = index === highlightItems.length - 1;

                            // Image Y position animation based on scroll progress within the container
                            // 0 se 1 ka scroll range highlight items ki total length mein divided hai
                            // Har image apne respective scroll section mein 100% (neeche) se 0% (center) fir -100% (upar) move hogi
                            const itemY = useTransform(
                                scrollYProgress,
                                [index / highlightItems.length, (index + 0.5) / highlightItems.length, (index + 1) / highlightItems.length],
                                ["100%", "0%", "-100%"] // Animation range: comes from below, settles, goes up
                            );

                            // Image Opacity animation based on scroll progress
                            // Jab image center mein hogi (0.5 mark), tab full opacity (1), otherwise hidden (0)
                            const itemOpacity = useTransform(
                                scrollYProgress,
                                [index / highlightItems.length, (index + 0.5) / highlightItems.length, (index + 1) / highlightItems.length],
                                [0, 1, 0] // Animation range: fades in, stays visible, fades out
                            );

                            return (
                                // motion.div wraps each image for animation
                                // position: absolute stacking images, pointerEvents: none to allow interaction behind them
                                // minHeight: '40vw' ensures some height on mobile even if image is hidden
                                <motion.div
                                    key={index} // Unique key for list item
                                    className="flex items-center justify-center w-full"
                                    style={{
                                        height: '100vh', // Each image container takes full viewport height for spacing
                                        opacity: itemOpacity,
                                        y: itemY,
                                        zIndex: isLastItem ? 10 : 5, // Last image on top if needed
                                        position: 'absolute', // Images stack on top of each other
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        pointerEvents: 'none', // Clicks will go through to elements below
                                    }}
                                >
                                    {/* Highlight Image */}
                                    {/* Responsive max-width for the image itself */}
                                    <img
                                        className="w-full max-w-xs md:max-w-sm object-cover rounded-xl"
                                        src={item.img} // Image source from data
                                        alt={item.h2} // Alt text from data for accessibility
                                    />
                                </motion.div>
                            );
                        })}
                        {/* Spacer div to make right column scrollable relative to the height required by absolute images */}
                        {/* Iski height right column ke images ki total animated height ke barabar honi chahiye */}
                        <div style={{ height: `${highlightItems.length * 80}vh` }}></div> {/* Height matched with image containers */}
                    </div>
                </div>

                {/* Cards Section: Grid layout */}
                {/* Responsive grid columns and margin top */}
                <div
                    className="grid grid-cols-1 lg:grid-cols-3 mt-24 md:mt-50 gap-4 max-w-full md:max-w-7xl mx-auto w-full">
                    {/* WobbleCard component: Responsive container height and hidden image on mobile */}
                    <WobbleCard
                        containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[300px] md:min-h-[500px] lg:min-h-[300px]"
                        className="">
                        <div className="max-w-xs">
                            {/* Card Title and Description */}
                            {/* Responsive font sizes */}
                            <h2
                                className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                                Helping businesses grow, one step at a time.
                            </h2>
                            <p className="mt-4 text-left  text-base/6 text-neutral-200">
                                At The Zeneration Media, we work closely with local brands and real estate businesses to create simple, effective marketing strategies that bring real results.
                            </p>
                        </div>
                        {/* Decorative Image: Hidden on mobile (`hidden sm:block`) */}
                        <img
                            src="https://i.pinimg.com/736x/07/b7/c3/07b7c359510766ea8cf93e1af0f3956b.jpg"
                            width={500} // Set width/height for image aspect ratio/placeholder
                            height={500}
                            alt="Abstract growth chart" // Alt text
                            className="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl hidden md:block" /> {/* Changed to hidden md:block */}
                    </WobbleCard>
                    {/* WobbleCard component: Responsive container height */}
                    <WobbleCard containerClassName="col-span-1 min-h-[200px] md:min-h-[300px]">
                        {/* Card Title and Description */}
                        {/* Responsive font sizes */}
                        <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                            10 Days. No Pressure. Just Results.
                        </h2>
                        <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
                            Try us out. See the difference. Pay only if you're happy.
                        </p>
                    </WobbleCard>

                    {/* WobbleCard component: Larger card, responsive height, hidden image on mobile */}
                    <WobbleCard
                        containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[300px] md:min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
                        <div className="max-w-sm">
                            {/* Card Title and Description */}
                            {/* Responsive font sizes */}
                            <h2 className="max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                                Let's build something meaningful together.
                            </h2>
                            <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
                                Experience how our personalized and performance-driven marketing can truly support your business — no pressure, no commitment. Start with a 10-day free trial, and let's grow at your pace.
                            </p>
                        </div>

                        {/* Decorative Image: Hidden on mobile (`hidden sm:block`) */}
                        <img
                            src="https://i.pinimg.com/736C/a5/30/9a/a5309afa310fef0146bdf01ef2acfd0c.jpg"
                            width={500} // Set width/height
                            height={500}
                            alt="Team discussing ideas" // Alt text
                            className="absolute -right-10 md:-right-[40%] lg:-right-[20%] lg: top-0 mt-20 -bottom-10 object-contain rounded-2xl hidden md:block" /> {/* Changed to hidden md:block */}
                    </WobbleCard>
                </div>
                {/* Final CTA Button and text: Responsive width and text size */}
                <div className="my-16 md:my-24 w-full mx-auto text-center">
                    {/* Button: Responsive width */}
                    <Button className="w-full md:w-auto cursor-pointer">
                        Start 10-Day Testing Phase
                    </Button>
                    {/* Contact text: Responsive font size */}
                    <p className="mt-2 text-xs md:text-sm text-neutral-400">
                        <a
                            href="tel:+91XXXXXXXXXX"
                            className="relative inline-block text-zinc-300 font-['F3'] after:block after:h-[1px] after:w-0 after:bg-zinc-300 after:transition-all after:duration-300 hover:after:w-full"
                        >
                            Make a free call
                        </a>
                        &nbsp;to our team to know more.
                    </p>
                </div>

                {/* FAQs Section Component */}
                <FAQs />
            </div>
        </section>
    );
}
