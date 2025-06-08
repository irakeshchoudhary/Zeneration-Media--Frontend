import React, { useState, useRef, useEffect } from 'react';
import FeedbackImage from '../../../public/Photos/Feedbackpage.jpg';
import HalfCircleBlue from '../../../public/Photos/HalfCircleBlue.png';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const FeedbackPage = () => {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [showSpotlight, setShowSpotlight] = useState(false);
    const imageRef = useRef(null);
    const containerRef = useRef(null);
    const imageWrapperRef = useRef(null);
    const spotlightSize = 150; // Spotlight radius in pixels

    // Initialize position on component mount (center of the image wrapper)
    useEffect(() => {
        if (imageWrapperRef.current) {
            const rect = imageWrapperRef.current.getBoundingClientRect();
            setCursorPosition({
                x: rect.width / 2,
                y: rect.height / 2
            });
        }
    }, []);

    const handleMouseMove = (e) => {
        if (imageWrapperRef.current) {
            const rect = imageWrapperRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            setCursorPosition({ x, y });
        }
    };

    const handleMouseEnter = () => {
        setIsHovering(true);
        setTimeout(() => setShowSpotlight(true), 100);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        setShowSpotlight(false);
    };

    return (
        <div
            ref={containerRef}
            className="flex justify-center items-center min-h-screen p-5 box-border mx-auto w-[65%] relative overflow-hidden"
        >
            {/* Decorative background elements */}
            <motion.div
                className="absolute -top-40 -right-40 opacity-20"
                initial={{ scale: 0.8, rotate: -30 }}
                animate={{ rotate: [0, 5, 0] }}
                transition={{
                    repeat: Infinity,
                    duration: 8,
                    ease: "easeInOut"
                }}
            >
                <img
                    src={HalfCircleBlue}
                    alt="Decorative background"
                    className="w-[500px]"
                />
            </motion.div>

            <div className="flex flex-col font-['F3'] md:flex-row items-center justify-around w-full max-w-6xl z-[50]">
                <motion.div
                    className="flex-1 p-5 text-left md:text-left"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <motion.h1
                        className="text-4xl mb-5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Your Voice Matters to Us
                    </motion.h1>
                    <motion.p
                        className="text-sm leading-relaxed mb-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        We're constantly working to deliver the best results for your
                        business. Share your honest feedback—whether it's appreciation,
                        suggestions, or improvements. Your words help us grow, improve, and
                        serve you better.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <Button className="cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 group">
                            Get Started
                            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="flex-1 flex justify-center items-center p-5 relative"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                >
                    <div
                        ref={imageWrapperRef}
                        className="relative rounded-lg overflow-hidden w-full max-w-md h-[400px]"
                        onMouseMove={handleMouseMove}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <img
                            ref={imageRef}
                            src={FeedbackImage}
                            alt="Feedback"
                            className="w-full h-full object-cover rounded-lg"
                        />

                        {/* Dark overlay with spotlight */}
                        <div
                            className="absolute inset-0 bg-gray-900 rounded-lg transition-opacity duration-500"
                            style={{
                                opacity: isHovering ? 0.85 : 0,
                                maskImage: showSpotlight
                                    ? `radial-gradient(circle ${spotlightSize}px at ${cursorPosition.x}px ${cursorPosition.y}px, transparent 0%, black 100%)`
                                    : 'none',
                                WebkitMaskImage: showSpotlight
                                    ? `radial-gradient(circle ${spotlightSize}px at ${cursorPosition.x}px ${cursorPosition.y}px, transparent 0%, black 100%)`
                                    : 'none',
                                transition: 'opacity 0.5s ease, mask-image 0.1s linear, -webkit-mask-image 0.1s linear'
                            }}
                        />

                        {/* Spotlight glow effect */}
                        {showSpotlight && (
                            <motion.div
                                className="absolute rounded-full pointer-events-none"
                                style={{
                                    width: spotlightSize * 2,
                                    height: spotlightSize * 2,
                                    left: cursorPosition.x - spotlightSize,
                                    top: cursorPosition.y - spotlightSize,
                                    background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
                                    boxShadow: '0 0 80px 40px rgba(96, 165, 250, 0.3)'
                                }}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{
                                    scale: 1,
                                    opacity: 1
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 10
                                }}
                            />
                        )}

                        {/* Floating particles effect */}
                        {isHovering && (
                            <div className="absolute inset-0 pointer-events-none">
                                {[...Array(15)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute w-1 h-1 bg-blue-400 rounded-full"
                                        style={{
                                            left: `${Math.random() * 100}%`,
                                            top: `${Math.random() * 100}%`
                                        }}
                                        animate={{
                                            y: [0, -20, 0],
                                            opacity: [0.3, 1, 0.3]
                                        }}
                                        transition={{
                                            duration: 2 + Math.random() * 3,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: Math.random() * 2
                                        }}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Instructional text */}
                        <motion.div
                            className="absolute bottom-4 left-0 right-0 text-center text-white/80 text-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isHovering ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            Move cursor to explore
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default FeedbackPage;