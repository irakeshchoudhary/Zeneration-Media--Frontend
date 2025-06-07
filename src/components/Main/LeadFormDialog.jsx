import React, { useState } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { submitLeadForm } from "../../APIs/Api";
import { motion, AnimatePresence } from "framer-motion";
import PartyEffect from "../Common/PartyEffect";

export default function LeadFormDialog({ triggerButtonText = "Book Free Strategy Call", buttonClassName = "" }) {
    const [open, setOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [form, setForm] = useState({ name: '', business: '', phone: '', email: '', goal: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [fieldErrors, setFieldErrors] = useState({});

    // Form input change
    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setFieldErrors({ ...fieldErrors, [e.target.name]: undefined });
        setError("");
    };

    // Form validation (frontend)
    const validateForm = () => {
        const errors = {};
        if (!form.name.trim()) errors.name = "Name is required.";
        if (!form.business.trim()) errors.business = "Business/Brand Name is required.";
        if (!form.phone.trim()) errors.phone = "Mobile Number is required.";
        else if (!/^[6-9]\d{9}$/.test(form.phone.trim())) errors.phone = "Enter valid Indian mobile number.";
        if (!form.email.trim()) errors.email = "Email is required.";
        else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) errors.email = "Enter valid email address.";
        return errors;
    };

    // Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setFieldErrors({});
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }
        setLoading(true);
        try {
            await submitLeadForm(form);
            setShowSuccess(true);
            setOpen(false);
            setForm({ name: '', business: '', phone: '', email: '', goal: '' });
            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    // Overlay for background dull + image
    const Overlay = () => (
        <div className="fixed inset-0 z-[50] flex items-center justify-center" style={{ pointerEvents: 'none' }}>
            {/* Overlay with background image and dull effect */}
            <div
                className="fixed inset-0 bg-black/80 bg-opacity-95 backdrop-blur-sm"
            />
        </div>
    );

    // Animation variants
    const dialogVariants = {
        hidden: { opacity: 0, scale: 0.92 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] } },
        exit: { opacity: 0, scale: 0.92, transition: { duration: 0.18, ease: [0.4, 0, 0.2, 1] } },
    };

    return (
        <>
            <Button
                className={buttonClassName + " bg-white text-black hover:bg-zinc-200 cursor-pointer transition-all ease-in-out duration-200"}
                style={{ fontFamily: 'Gilroy-Bold' }}
                onClick={() => setOpen(true)}
            >
                {triggerButtonText}
            </Button>
            {/* Overlay when dialog is open */}
            {open && <Overlay />}
            {/* Success Dialog with PartyEffect and animation */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        className="fixed inset-0 z-[100] flex items-center justify-center"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={dialogVariants}
                    >
                        <div className="fixed inset-0 bg-black/60" />
                        <motion.div
                            className="flex flex-col items-center justify-center bg-[#181818] max-w-[300px] sm:max-w-[350px] rounded-xl shadow-xl p-6 sm:p-8 z-[101]"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={dialogVariants}
                        >
                            <PartyEffect />
                            <div className="text-center mt-2 text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: 'Gilroy-SemiBold' }}>Thank you!</div>
                            <div className="text-center mt-2 text-sm text-white">Our team will contact you soon.</div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* Main Form Dialog with animation */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="fixed inset-0 z-[100] flex items-center justify-center px-4"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={dialogVariants}
                    >
                        <div className="fixed inset-0" style={{ pointerEvents: 'none' }} />
                        <motion.div
                            className="w-full max-w-sm md:max-w-md lg:max-w-lg bg-zinc-950 rounded-xl shadow-xl px-4 py-1 z-[101]"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={dialogVariants}
                        >
                            <div className="mb-2 text-white text-center mt-4 text-md sm:text-lg font-bold" style={{ fontFamily: 'Gilroy-SemiBold' }}>
                                We're here to answer any question you may have.
                            </div>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-2 px-4 pb-4 pt-2 sm:px-6 sm:pb-6">
                                {/* Name */}
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="name" className="text-xs font-['F3'] text-zinc-300">Your Name</label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={form.name}
                                        onChange={handleInputChange}
                                        className={`rounded px-3 py-2 text-sm bg-zinc-900 text-white focus:outline-none ${fieldErrors.name ? 'border border-red-500' : ''}`}
                                        required
                                    />
                                    {fieldErrors.name && <span className="text-xs text-red-500 mt-1">{fieldErrors.name}</span>}
                                </div>
                                {/* Business Name */}
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="business" className="text-xs font-['F3'] text-zinc-300">Business / Brand Name</label>
                                    <input
                                        id="business"
                                        name="business"
                                        type="text"
                                        value={form.business}
                                        onChange={handleInputChange}
                                        className={`rounded px-3 py-2 text-sm bg-zinc-900 text-white focus:outline-none ${fieldErrors.business ? 'border border-red-500' : ''}`}
                                        required
                                    />
                                    {fieldErrors.business && <span className="text-xs text-red-500 mt-1">{fieldErrors.business}</span>}
                                </div>
                                {/* Contact Number */}
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="phone" className="text-xs font-['F3'] text-zinc-300">Mobile Number</label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={form.phone}
                                        onChange={handleInputChange}
                                        className={`rounded px-3 py-2 text-sm bg-zinc-900 text-white focus:outline-none ${fieldErrors.phone ? 'border border-red-500' : ''}`}
                                        required
                                    />
                                    {fieldErrors.phone && <span className="text-xs text-red-500 mt-1">{fieldErrors.phone}</span>}
                                </div>
                                {/* Email ID */}
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="email" className="text-xs font-['F3'] text-zinc-300">Email Address</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleInputChange}
                                        className={`rounded px-3 py-2 text-sm bg-zinc-900 text-white focus:outline-none ${fieldErrors.email ? 'border border-red-500' : ''}`}
                                        required
                                    />
                                    {fieldErrors.email && <span className="text-xs text-red-500 mt-1">{fieldErrors.email}</span>}
                                </div>
                                {/* Brief Business Goal or Website */}
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="goal" className="text-xs font-['F3'] text-zinc-300">
                                        What's your goal or business website? <span className="text-[10px] text-zinc-400">(optional)</span>
                                    </label>
                                    <input
                                        id="goal"
                                        name="goal"
                                        type="text"
                                        value={form.goal}
                                        onChange={handleInputChange}
                                        className="rounded px-3 py-2 text-sm bg-zinc-900 text-white focus:outline-none"
                                    />
                                </div>
                                {/* Error message (global) */}
                                {error && <div className="text-red-500 text-sm mt-2 text-center">{error}</div>}
                                {/* Buttons */}
                                <div className="flex w-full justify-between mt-2 gap-2">
                                    <Button
                                        type="button"
                                        className="bg-zinc-800 text-white hover:bg-zinc-700 cursor-pointer"
                                        onClick={() => setOpen(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="bg-white text-black hover:bg-zinc-200"
                                        disabled={loading}
                                    >
                                        {loading ? <Loader2 className="animate-spin mr-2" size={16} /> : 'Submit'}
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
} 