import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, StarHalf } from 'lucide-react';
import PartyEffect from '../Common/PartyEffect';

const feedbackTypes = [
    { id: 'website', title: 'Website Feedback', icon: '🌐' },
    { id: 'service', title: 'Service Feedback', icon: '🎯' },
    { id: 'support', title: 'Support Feedback', icon: '🤝' },
    { id: 'value', title: 'Value Feedback', icon: '💎' },
    { id: 'overall', title: 'Overall Feedback', icon: '⭐' }
];

const feedbackSuggestions = [
    "What aspects of our service did you find most valuable?",
    "How can we improve your experience with us?",
    "What features would you like to see in the future?",
    "What made you choose our services?",
    "Any specific areas where we exceeded or fell short of your expectations?"
];

const FeedbackPage = () => {
    const [selectedType, setSelectedType] = useState(null);
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the feedback to your backend
        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
            setSelectedType(null);
            setRating(0);
            setFeedback('');
        }, 3000);
    };

    const handleStarHover = (value) => {
        if (!isDragging) return;
        setRating(value);
    };

    const handleStarClick = (value) => {
        setRating(value);
    };

    return (
        <>
            <Helmet>
                <title>Feedback | Zeneration Media Kalyan</title>
                <meta name="description" content="Share your feedback with Zeneration Media. Help us improve our services and customer experience." />
            </Helmet>
            <div className="min-h-screen bg-black text-white pt-24 px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold mb-4"
                    >
                        Your Feedback is Important to Us
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-zinc-400 text-lg mb-12"
                    >
                        Your feedback provides the motivation we need to work harder and deliver exceptional results.
                        Please share your valuable thoughts to help us improve and make changes that will enable us to
                        deliver the best possible experience for you.
                    </motion.p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                        {feedbackTypes.map((type) => (
                            <motion.button
                                key={type.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setSelectedType(type.id)}
                                className={`p-4 rounded-lg border ${selectedType === type.id
                                    ? 'border-[#243eff] bg-[#243eff]/10'
                                    : 'border-zinc-800 hover:border-[#243eff]/50'
                                    } transition-all duration-300`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{type.icon}</span>
                                    <span className="font-medium">{type.title}</span>
                                </div>
                            </motion.button>
                        ))}
                    </div>

                    <AnimatePresence>
                        {selectedType && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800"
                            >
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="flex items-center gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <div
                                                key={star}
                                                className="relative cursor-pointer"
                                                onMouseDown={() => setIsDragging(true)}
                                                onMouseUp={() => setIsDragging(false)}
                                                onMouseLeave={() => setIsDragging(false)}
                                                onMouseMove={(e) => {
                                                    if (!isDragging) return;
                                                    const rect = e.currentTarget.getBoundingClientRect();
                                                    const x = e.clientX - rect.left;
                                                    const percentage = x / rect.width;
                                                    const value = star - 1 + percentage;
                                                    handleStarHover(Math.min(5, Math.max(0, value)));
                                                }}
                                                onClick={() => handleStarClick(star)}
                                            >
                                                <Star
                                                    className={`w-8 h-8 ${star <= Math.floor(rating)
                                                        ? 'text-yellow-400 fill-yellow-400'
                                                        : 'text-zinc-600'
                                                        }`}
                                                />
                                                {star - 0.5 <= rating && rating < star && (
                                                    <StarHalf
                                                        className="w-8 h-8 text-yellow-400 fill-yellow-400 absolute top-0 left-0"
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="relative">
                                        <textarea
                                            value={feedback}
                                            onChange={(e) => setFeedback(e.target.value)}
                                            placeholder="Share your thoughts..."
                                            className="w-full h-32 bg-zinc-800/50 border border-zinc-700 rounded-lg p-4 text-white placeholder-zinc-500 focus:outline-none focus:border-[#243eff]"
                                        />
                                        <div className="absolute -bottom-20 left-0 text-sm text-zinc-500">
                                            <p className="mb-2">Suggestions:</p>
                                            <ul className="list-disc list-inside space-y-1">
                                                {feedbackSuggestions.map((suggestion, index) => (
                                                    <li key={index}>{suggestion}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            className="px-6 py-2 bg-[#243eff] hover:bg-[#1b34ff] rounded-lg transition-colors duration-300"
                                        >
                                            Submit Feedback
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {showSuccess && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="fixed inset-0 z-50 flex items-center justify-center"
                            >
                                <div className="fixed inset-0 bg-black/60" />
                                <div className="relative bg-zinc-900 p-8 rounded-xl text-center">
                                    <PartyEffect />
                                    <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                                    <p className="text-zinc-400">Your feedback has been submitted successfully.</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </>
    );
};

export default FeedbackPage; 