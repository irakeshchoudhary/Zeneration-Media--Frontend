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
import { Helmet } from 'react-helmet-async';

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
    const containerRef = useRef(null);
    const leftRef = useRef(null);
    const rightRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentIndexRef = useRef(0);

    const safeCurrentItem = highlightItems[currentIndex] || highlightItems[0] || { h2: '', p: '' };


    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"],
    });

    // Map scroll progress to the index of the highlight items
    const itemIndex = useTransform(scrollYProgress, [0, 1], [0, highlightItems.length - 1]);
    const [currentItem, setCurrentItem] = useState(highlightItems[0]);

    // Update state when the scroll index changes
    useEffect(() => {
        const unsubscribe = itemIndex.on("change", (latest) => {
            const roundedIndex = Math.round(latest);
            // Ensure index is within bounds
            const safeIndex = Math.max(0, Math.min(roundedIndex, highlightItems.length - 1));
            setCurrentItem(highlightItems[safeIndex]);
        });
        return () => unsubscribe();
    }, [itemIndex, highlightItems]);


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

    return (
        <>
            <Helmet>
                <title>Full Funnel Marketing Services | Zeneration Media Kalyan</title>
                <meta name="description" content="Boost your business with expert full funnel marketing, performance marketing, real estate marketing, digital solutions for salons, and WhatsApp sales funnel setup." />
            </Helmet>
            <section
                className="relative w-full flex flex-col items-center px-4 pt-32 pb-16 md:pt-48 md:pb-24"
                style={{ backgroundColor: "#0C1012" }}
            >
                {/* Background Image (still decorative) */}
                <img
                    src="/Photos/ServicesBg.png"
                    alt="Services Background"
                    className="absolute w-full top-0 h-screen object-cover opacity-10 pointer-events-none select-none"
                    style={{ zIndex: 1 }}
                />

                {/* Content Wrapper with fixed width/padding */}
                <div className="relative z-10 w-full md:max-w-[90%] lg:max-w-[80%] xl:max-w-[65%] mx-auto md:px-0 font-['F3']">

                    {/* Title & Subtitle (Animated) */}
                    <motion.h1
                        variants={fadeIn}
                        initial="initial"
                        animate="animate"
                        className="text-4xl mt-24 sm:text-5xl md:text-6xl font-bold mb-4 text-white text-left"
                    >
                        Solutions We Offer
                    </motion.h1>
                    <motion.p
                        variants={fadeIn}
                        initial="initial"
                        animate="animate"
                        className="text-sm sm:text-base text-zinc-300 max-w-2xl mb-6 text-left"
                    >
                        Every service we offer is focused on one thing — business growth. Whether you want more leads, sales, or visibility — we've got you covered.
                    </motion.p>

                    {/* CTA Button */}
                    <div className="w-full flex justify-left mb-16 md:mb-24">
                        <LeadFormDialog triggerButtonText="Get Free Consultation" buttonClassName="w-44 text-sm font-['Gilroy-SemiBold']" />
                    </div>

                    {/* Benefits Tags */}
                    <div className="mt-8 flex flex-wrap justify-left gap-3 sm:gap-4 text-xs sm:text-sm font-['F3'] text-zinc-300">
                        <p className="flex items-center gap-1"><Ghost className="h-4 w-4" /> Visibility</p>
                        <p className="flex items-center gap-1"><Ribbon className="h-4 w-4" /> Branding</p>
                        <p className="flex items-center gap-1"><ChartNoAxesCombined className="h-4 w-4" /> Conversion</p>
                        <p className="flex items-center gap-1"><Zap className="h-4 w-4" /> Automation</p>
                        <p className="flex items-center gap-1"><HeartHandshake className="h-4 w-4" /> Trust</p>
                    </div>

                    {/* Highlight Box Container (for scroll tracking) */}
                    <div
                        ref={containerRef}
                        className="mt-16 md:mt-20 flex flex-col md:flex-row items-start gap-10 relative"
                    >
                        {/* Sticky Left Column (Text) */}
                        <div
                            ref={leftRef}
                            className="w-full md:w-1/2 flex flex-col gap-4 md:gap-6 pt-0 md:pt-10 sticky top-24"
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
                                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                                        {safeCurrentItem.h2}
                                    </h2>
                                    <p className="text-sm md:text-base text-zinc-400 leading-relaxed mt-2">
                                        {safeCurrentItem.p}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Scrollable Right Column (Images) */}
                        <div className="w-full md:w-1/2 flex flex-col gap-4" style={{ height: `${highlightItems.length * 60}vh` }}>
                            {highlightItems.map((item, index) => {
                                const isLastItem = index === highlightItems.length - 1;

                                const itemY = useTransform(
                                    itemIndex,
                                    [index - 1, index, isLastItem ? highlightItems.length : index + 1], // Input range
                                    [-50, 0, isLastItem ? 0 : 50] // Output range: if last item, output is 0 from index onwards
                                );

                                const itemOpacity = useTransform(
                                    itemIndex,
                                    [index - 0.5, index, isLastItem ? highlightItems.length : index + 0.5], // Input range
                                    [0, 1, isLastItem ? 1 : 0] // Output range: if last item, output is 1 from index onwards
                                );

                                return (
                                    <motion.div
                                        key={index}
                                        className="flex items-center justify-center w-full"
                                        style={{
                                            height: '100vh',
                                            opacity: itemOpacity,
                                            y: itemY,
                                            zIndex: isLastItem ? 10 : 5,
                                        }}
                                    >
                                        <img
                                            className="w-full max-w-xs object-cover rounded-xl"
                                            src={item.img}
                                            alt={item.h2}
                                        />
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    <div
                        className="grid grid-cols-1 lg:grid-cols-3 mt-32 md:mt-50 gap-4 max-w-7xl mx-auto w-full">
                        <WobbleCard
                            containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[400px] lg:min-h-[500px] lg:min-h-[300px]"
                            className="">
                            <div className="max-w-xs sm:max-w-sm">
                                <h2
                                    className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                                    Helping businesses grow, one step at a time.
                                </h2>
                                <p className="mt-4 text-left text-sm md:text-base/6 text-neutral-200">
                                    At The Zeneration Media, we work closely with local brands and real estate businesses to create simple, effective marketing strategies that bring real results.
                                </p>
                            </div>
                            <img
                                src="https://i.pinimg.com/736x/07/b7/c3/07b7c359510766ea8cf93e1af0f3956b.jpg"
                                width={500}
                                height={500}
                                alt="linear demo image"
                                className="absolute -right-20 md:-right-40 lg:-right-[40%] xl:-right-[20%] grayscale filter -bottom-10 object-contain rounded-2xl" />
                        </WobbleCard>
                        <WobbleCard containerClassName="col-span-1 min-h-[300px]">
                            <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                                10 Days. No Pressure. Just Results.
                            </h2>
                            <p className="mt-4 max-w-[26rem] text-left text-sm md:text-base/6 text-neutral-200">
                                Try us out. See the difference. Pay only if you're happy.
                            </p>
                        </WobbleCard>

                        <WobbleCard
                            containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[400px] lg:min-h-[500px] xl:min-h-[300px]">
                            <div className="max-w-sm sm:max-w-md">
                                <h2 className="max-w-lg md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                                    Let's build something meaningful together.
                                </h2>
                                <p className="mt-4 max-w-[26rem] text-left text-sm md:text-base/6 text-neutral-200">
                                    Experience how our personalized and performance-driven marketing can truly support your business — no pressure, no commitment. Start with a 10-day free trial, and let's grow at your pace.
                                </p>
                            </div>

                            <img
                                src="https://i.pinimg.com/736x/a5/30/9a/a5309afa310fef0146bdf01ef2acfd0c.jpg"
                                width={500}
                                height={500}
                                alt="linear demo image"
                                className="absolute -right-20 md:-right-40 lg:-right-[40%] xl:-right-[20%] lg:top-0 top-90 object-contain rounded-2xl" />
                        </WobbleCard>
                    </div>
                    <div className="my-16 md:my-24 w-fit mx-auto text-center">
                        <Button className="cursor-pointer">
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
        </>
    );
}
