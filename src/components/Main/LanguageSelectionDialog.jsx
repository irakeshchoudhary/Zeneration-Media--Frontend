import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { X } from 'lucide-react';

const LanguageSelectionDialog = ({ isOpen, onClose, onLanguageSelect }) => {
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
                        onClick={onClose}
                    />

                    <motion.div
                        className="relative rounded-xl p-6 sm:p-8 max-w-sm text-center z-[100] font-['F3']"
                        variants={dialogVariants}
                    >
                        <Button
                            onClick={onClose}
                            className="absolute top-3 right-3 p-2 cursor-pointer rounded-full bg-zinc-950 hover:bg-zinc-900 text-white"
                            size="icon"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                        {/* <h2 className="text-xl font-bold text-white mb-6">Select Language</h2> */}
                        <div className="flex">
                            <Button
                                onClick={() => onLanguageSelect('english')}
                                className="rounded-none rounded-l-md border-r-1 border-zinc-950 cursor-pointer hover:bg-zinc-400"
                            >
                                English
                            </Button>
                            <Button
                                onClick={() => onLanguageSelect('hindi')}
                                className="rounded-none rounded-r-md cursor-pointer hover:bg-zinc-400"
                            >
                                Hindi
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LanguageSelectionDialog; 