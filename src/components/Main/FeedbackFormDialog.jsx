import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { ArrowRight, Loader2, X } from 'lucide-react';
import PartyEffect from '../Common/PartyEffect';
import { submitFeedback as callSubmitFeedbackAPI } from '../../APIs/Api'; // Import the actual API function

const FeedbackFormDialog = ({ isOpen, onClose }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedEmoji, setSelectedEmoji] = useState(null);
    const [feedbackText, setFeedbackText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const emojis = [
        { id: 1, name: 'Bad', src: '/Photos/Emojis/Sad.png' }, // Placeholder for very bad emoji
        { id: 2, name: 'Okay', src: '/Photos/Emojis/NormalSad.png' }, // Placeholder for neutral emoji
        { id: 3, name: 'Good', src: '/Photos/Emojis/Neutral.png' }, // Placeholder for good emoji
        { id: 4, name: 'Great', src: '/Photos/Emojis/NormalSmile.png' }, // Placeholder for great emoji
        { id: 5, name: 'Excellent', src: '/Photos/Emojis/FullSmile.png' }, // Placeholder for excellent emoji
    ];

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setCurrentStep(2);
    };

    const handleSubmitFeedback = async () => {
        setError('');
        setLoading(true);
        try {
            const userEmailFromStorage = localStorage.getItem('userEmail') || 'unknown'; // Get email from localStorage

            await callSubmitFeedbackAPI({
                category: selectedCategory,
                emojiRating: selectedEmoji,
                feedbackText: feedbackText,
                userEmail: userEmailFromStorage, // Pass the email to the backend
            });
            setShowSuccess(true);
            setLoading(false);
            // Reset form after success
            setTimeout(() => {
                setShowSuccess(false);
                onClose(); // Close the dialog
                setCurrentStep(1); // Reset to first step for next time
                setSelectedCategory('');
                setSelectedEmoji(null);
                setFeedbackText('');
            }, 3000); // Show success for 3 seconds
        } catch (err) {
            setError(err.message || "Failed to submit feedback.");
            setLoading(false);
        }
    };

    const dialogVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 50 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
        exit: { opacity: 0, scale: 0.8, y: 50, transition: { duration: 0.2, ease: 'easeIn' } },
    };

    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
        exit: { opacity: 0, transition: { duration: 0.2 } },
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[99] flex items-center justify-center p-4"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <motion.div
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
                        variants={overlayVariants}
                        onClick={onClose} // Allow clicking outside to close
                    />

                    <motion.div
                        className="relative bg-zinc-950 rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-sm z-[100] font-['F3']"
                        variants={dialogVariants}
                    >
                        <Button
                            onClick={onClose} // Close button functionality
                            className="absolute top-3 right-3 p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white"
                            size="icon"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                        {showSuccess ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col items-center justify-center text-center"
                            >
                                <PartyEffect />
                                <div className="text-2xl font-bold text-white mt-4">Thank you!</div>
                                <p className="text-sm text-zinc-300 mt-2">Your feedback helps us grow.</p>
                                <Button onClick={onClose} className="mt-6 bg-blue-600 hover:bg-blue-700">Close</Button>
                            </motion.div>
                        ) : (
                            <>
                                {currentStep === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 50 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <h2 className="text-xl font-bold text-white mb-2 text-center">Share Your Feedback</h2>
                                        <p className="text-sm text-zinc-400 mb-6 text-center">What would you like to give feedback on?</p>
                                        <div className="grid grid-cols-2 gap-4">
                                            <Button onClick={() => handleCategorySelect('Website')} className="bg-zinc-900 cursor-pointer hover:bg-zinc-800 text-white">Website</Button>
                                            <Button onClick={() => handleCategorySelect('Services')} className="bg-zinc-900 cursor-pointer hover:bg-zinc-800 text-white">Services</Button>
                                            <Button onClick={() => handleCategorySelect('Social Media')} className="bg-zinc-900 cursor-pointer hover:bg-zinc-800 text-white">Social Media</Button>
                                            <Button onClick={() => handleCategorySelect('Others')} className="bg-zinc-900 cursor-pointer hover:bg-zinc-800 text-white">Others</Button>
                                        </div>
                                    </motion.div>
                                )}

                                {currentStep === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <h2 className="text-xl font-['F3'] text-white mb-2 text-center">Rate Your Experience</h2>
                                        <p className="text-sm text-zinc-400 mb-6 text-center">Category: <span className="font-semibold text-blue-500">{selectedCategory}</span></p>
                                        <div className="flex justify-around items-center mb-6">
                                            {emojis.map((emoji) => (
                                                <motion.img
                                                    key={emoji.id}
                                                    src={emoji.src}
                                                    alt={emoji.name}
                                                    className={`w-16 h-16 object-contain cursor-pointer transition-all duration-200
                                                                ${selectedEmoji === emoji.id ? 'scale-90 ring-2 ring-blue-500 rounded-full' : ''}
                                                                hover:scale-100 hover:shadow-lg`}
                                                    onClick={() => setSelectedEmoji(emoji.id)}
                                                // whileHover={{ scale: 1.15 }} // Framer motion hover effect
                                                // whileTap={{ scale: 0.95 }} // Framer motion tap effect
                                                />
                                            ))}
                                        </div>
                                        <textarea
                                            className="w-full p-3 rounded-md bg-zinc-800 text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 resize-y min-h-[80px] mb-4"
                                            placeholder="Share your thoughts (optional)"
                                            value={feedbackText}
                                            onChange={(e) => setFeedbackText(e.target.value)}
                                        />
                                        {error && <p className="text-red-500 text-xs mb-2 text-center">{error}</p>}
                                        <div className="flex justify-between gap-2">
                                            <Button onClick={() => setCurrentStep(1)} className="bg-zinc-800 hover:bg-zinc-900 text-white cursor-pointer">Back</Button>
                                            <Button onClick={handleSubmitFeedback} disabled={loading || !selectedEmoji} className="cursor-pointer">
                                                {loading ? <Loader2 className="animate-spin mr-2" size={16} /> : 'Submit'}
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}
                            </>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FeedbackFormDialog; 