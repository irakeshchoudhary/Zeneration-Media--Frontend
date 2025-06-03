"use client";

import { WobbleCard } from "../ui/wobble-card";
import React, { useRef, useEffect, useState, useCallback } from "react";
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
import { AnimatePresence } from 'framer-motion';
import FAQs from "./FAQs";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.77, 0, 0.175, 1] } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.5, ease: "easeOut" } },
};

const textFadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

const highlightItems = [
    {
        h2: "Full Funnel Performance Marketing Approach",
        p: "From ads to automation to conversion, we build the entire funnel for you. We study your business, audience & goals before doing any marketing.",
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
    const containerRef = useRef(null);
    const leftRef = useRef(null);
    const rightRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentIndexRef = useRef(0);

    // Safeguard against empty highlightItems
    const safeCurrentItem = highlightItems[currentIndex] || highlightItems[0] || { h2: '', p: '' };

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"],
    });

    // Fixed index calculation
    const updateCurrentIndex = useCallback((progress) => {
        if (!highlightItems.length) return;

        // Calculate index with bounds protection
        const newIndex = Math.min(
            Math.floor(progress * highlightItems.length),
            highlightItems.length - 1
        );

        if (newIndex !== currentIndexRef.current) {
            currentIndexRef.current = newIndex;
            setCurrentIndex(newIndex);
        }
    }, [highlightItems.length]);

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", updateCurrentIndex);
        return () => unsubscribe();
    }, [scrollYProgress, updateCurrentIndex]);

    // GSAP pinning effect with markers enabled
    useEffect(() => {
        if (!containerRef.current || !leftRef.current || !rightRef.current) return;
        if (highlightItems.length === 0) return;

        let ctx = gsap.context(() => {
            if (window.innerWidth >= 768) {
                ScrollTrigger.create({
                    trigger: containerRef.current,
                    start: 'top 10%',
                    end: () => `+=${window.innerHeight * highlightItems.length * 0.8}`,
                    pin: leftRef.current,
                    pinSpacing: false,
                    scrub: true,
                    anticipatePin: 1,
                    markers: true // ENABLED MARKERS FOR DEBUGGING
                });
            }
        }, containerRef);

        return () => ctx.revert();
    }, [highlightItems.length]);

    useEffect(() => {
        document.title = "Zeneration Media | Services";
    }, []);

    return (
        <section
            className="relative w-full flex flex-col items-center px-4 pt-32 pb-16 md:pt-48 md:pb-24"
            style={{ backgroundColor: "#0C1012" }}
        >
            <img
                src="/Photos/ServicesBg.png"
                alt="Services Background"
                className="absolute w-full top-0 h-[40vh] md:h-screen object-cover opacity-10 pointer-events-none select-none"
                style={{ zIndex: 1 }}
            />

            <div className="relative z-10 w-full md:max-w-[65%] mx-auto px-4 md:px-0 font-['F3']">
                <motion.h1
                    variants={fadeIn}
                    initial="initial"
                    animate="animate"
                    className="text-3xl md:text-5xl mt-10 md:mt-34 font-bold mb-2 md:mb-4 text-white text-left"
                >
                    Solutions We Offer
                </motion.h1>

                <motion.p
                    variants={fadeIn}
                    initial="initial"
                    animate="animate"
                    className="text-sm md:text-md text-zinc-300 max-w-2xl mb-4 md:mb-6 text-left"
                >
                    Every service we offer is focused on one thing — business growth. Whether you want more leads, sales, or visibility — we've got you covered.
                </motion.p>

                <div className="w-full flex justify-left mb-16 md:mb-24">
                    <LeadFormDialog triggerButtonText="Get Free Consultation" buttonClassName="w-full md:w-44 text-sm font-['Gilroy-SemiBold']" />
                </div>

                <div className="mt-8 flex flex-wrap justify-left gap-2 md:gap-4 text-xs font-['F3'] text-zinc-300">
                    <p className="flex items-center gap-1"><Ghost size={16} /> Visibility</p>
                    <p className="flex items-center gap-1"><Ribbon size={16} /> Branding</p>
                    <p className="flex items-center gap-1"><ChartNoAxesCombined size={16} /> Conversion</p>
                    <p className="flex items-center gap-1"><Zap size={16} /> Automation</p>
                    <p className="flex items-center gap-1"><HeartHandshake size={16} /> Trust</p>
                </div>

                {/* Enhanced scrolling section */}
                <div
                    ref={containerRef}
                    className="mt-16 md:mt-20 flex flex-col md:flex-row items-start gap-8 md:gap-10 relative"
                    style={{ minHeight: highlightItems.length ? `${highlightItems.length * 100}vh` : '100vh' }}
                >
                    {/* Sticky left column */}
                    <div
                        ref={leftRef}
                        className="w-full md:w-1/2 flex flex-col gap-4 md:gap-6 pt-6 md:pt-10 sticky top-20"
                        style={{ height: 'fit-content', zIndex: 20 }}
                    >
                        <p className="px-3 py-1 bg-[#131D1D] text-[#5B9983] text-xs rounded-full w-fit">
                            The Zeneration Media™
                        </p>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={safeCurrentItem.h2}
                                variants={textFadeIn}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                            >
                                <h2 className="text-xl md:text-4xl font-bold text-white">
                                    {safeCurrentItem.h2}
                                </h2>
                                <p className="text-xs md:text-sm text-zinc-400 leading-relaxed mt-2">
                                    {safeCurrentItem.p}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* SIMPLIFIED RIGHT COLUMN - FIXED IMAGES */}
                    <div
                        ref={rightRef}
                        className="w-full md:w-1/2 mt-10 md:mt-0 sticky top-20 h-screen"
                        style={{ zIndex: 10 }}
                    >
                        {highlightItems.map((item, index) => (
                            <motion.div
                                key={index}
                                className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ 
                                    opacity: index === currentIndex ? 1 : 0,
                                    y: index === currentIndex ? 0 : 100
                                }}
                                transition={{ duration: 0.7, ease: "easeInOut" }}
                            >
                                <img
                                    className="w-full max-w-xs md:max-w-md object-cover rounded-xl shadow-xl"
                                    src={item.img}
                                    alt={item.h2}
                                    loading={index > 2 ? "lazy" : "eager"}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Cards Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 mt-24 gap-4 max-w-full md:max-w-7xl mx-auto w-full">
                    <WobbleCard
                        containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[300px] md:min-h-[500px] lg:min-h-[300px]"
                        className="">
                        <div className="max-w-xs">
                            <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                                Helping businesses grow, one step at a time.
                            </h2>
                            <p className="mt-4 text-left  text-base/6 text-neutral-200">
                                At The Zeneration Media, we work closely with local brands and real estate businesses to create simple, effective marketing strategies that bring real results.
                            </p>
                        </div>
                        <img
                            src="https://i.pinimg.com/736x/07/b7/c3/07b7c359510766ea8cf93e1af0f3956b.jpg"
                            width={500}
                            height={500}
                            alt="Abstract growth chart"
                            className="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl hidden md:block"
                        />
                    </WobbleCard>

                    <WobbleCard containerClassName="col-span-1 min-h-[200px] md:min-h-[300px]">
                        <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                            10 Days. No Pressure. Just Results.
                        </h2>
                        <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
                            Try us out. See the difference. Pay only if you're happy.
                        </p>
                    </WobbleCard>

                    <WobbleCard
                        containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[300px] md:min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
                        <div className="max-w-sm">
                            <h2 className="max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                                Let's build something meaningful together.
                            </h2>
                            <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
                                Experience how our personalized and performance-driven marketing can truly support your business — no pressure, no commitment. Start with a 10-day free trial, and let's grow at your pace.
                            </p>
                        </div>
                        <img
                            src="https://i.pinimg.com/736C/a5/30/9a/a5309afa310fef0146bdf01ef2acfd0c.jpg"
                            width={500}
                            height={500}
                            alt="Team discussing ideas"
                            className="absolute -right-10 md:-right-[40%] lg:-right-[20%] lg: top-0 mt-20 -bottom-10 object-contain rounded-2xl hidden md:block"
                        />
                    </WobbleCard>
                </div>

                <div className="my-16 md:my-24 w-full mx-auto text-center">
                    <Button className="w-full md:w-auto cursor-pointer">
                        Start 10-Day Testing Phase
                    </Button>
                    <p className="mt-2 text-xs md:text-sm text-neutral-400">
                        <a
                            href="tel:+916377581769"
                            className="relative inline-block text-zinc-300 font-['F3'] after:block after:h-[1px] after:w-0 after:bg-zinc-300 after:transition-all after:duration-300 hover:after:w-full"
                        >
                            Make a free call
                        </a>
                        &nbsp;to our team to know more.
                    </p>
                </div>

                <FAQs />
            </div>
        </section>
    );
}