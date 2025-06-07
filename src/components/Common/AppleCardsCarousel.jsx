"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AppleCardsCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef(null);

    const cards = [
        {
            title: "Citizen of Nowhere",
            subtitle: "Shinjuku Nights",
            author: "Matt Perry",
            tags: ["Layout", "Animation"],
            video: "/Videos/Video1.mp4",
            thumbnail: "/Photos/Thumbnail1.jpg",
            color: "from-red-500/20 to-red-500/5"
        },
        {
            title: "Chair Collection",
            subtitle: "Shop Now",
            author: "Austin Malerba",
            tags: ["Motion", "Component"],
            video: "/Videos/Video2.mp4",
            thumbnail: "/Photos/Thumbnail2.jpg",
            color: "from-blue-500/20 to-blue-500/5"
        },
        {
            title: "Max Barvian",
            subtitle: "-3.2K",
            author: "Max Barvian",
            tags: ["AnimateNumber"],
            video: "/Videos/Video3.mp4",
            thumbnail: "/Photos/Thumbnail3.jpg",
            color: "from-green-500/20 to-green-500/5"
        },
        {
            title: "Brand Success",
            subtitle: "Growth Story",
            author: "Nisha Patel",
            tags: ["Brand", "Growth"],
            video: "/Videos/Video4.mp4",
            thumbnail: "/Photos/Thumbnail4.jpg",
            color: "from-yellow-500/20 to-yellow-500/5"
        }
    ];

    const nextCard = () => {
        setCurrentIndex((prev) => (prev + 1) % cards.length);
    };

    const prevCard = () => {
        setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    };

    // Auto-advance cards every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isHovered) {
                nextCard();
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [isHovered]);

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Navigation Buttons */}
            <button
                onClick={prevCard}
                className="absolute cursor-pointer left-4 z-30 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all duration-300"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button
                onClick={nextCard}
                className="absolute cursor-pointer right-4 z-30 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all duration-300"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Cards Container */}
            <div className="relative w-full h-full flex items-center justify-center">
                <AnimatePresence mode="wait">
                    {cards.map((card, index) => {
                        if (index === currentIndex) {
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8, x: 100 }}
                                    animate={{ opacity: 1, scale: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.8, x: -100 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    className="relative w-[85vw] max-w-[420px] h-[700px] rounded-3xl overflow-hidden"
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                >
                                    {/* Card Background */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${card.color} backdrop-blur-xl`} />

                                    {/* Video/Image Container */}
                                    <div className="absolute inset-0">
                                        <img
                                            src={card.thumbnail}
                                            alt={card.title}
                                            className={`w-full h-full object-cover transition-all duration-500 ${isHovered ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
                                                }`}
                                        />
                                        {isHovered && (
                                            <video
                                                src={card.video}
                                                className="absolute inset-0 w-full h-full object-cover scale-110"
                                                autoPlay
                                                muted
                                                loop
                                                playsInline
                                            />
                                        )}
                                    </div>

                                    {/* Content Overlay */}
                                    <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            <h3 className="text-2xl font-bold text-white mb-2">{card.title}</h3>
                                            <p className="text-zinc-300 mb-4">{card.subtitle}</p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-zinc-400">{card.author}</span>
                                                <div className="flex gap-2">
                                                    {card.tags.map((tag, i) => (
                                                        <span
                                                            key={i}
                                                            className="px-3 py-1 bg-white/10 text-white text-xs rounded-full backdrop-blur-sm"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            );
                        }
                        return null;
                    })}
                </AnimatePresence>
            </div>

            {/* Pagination Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {cards.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-white scale-125' : 'bg-white/50'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default AppleCardsCarousel;
