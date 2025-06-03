import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { subscribe } from '../../APIs/Api';
import { Helmet } from 'react-helmet-async';

const About = () => {
    const [showCard, setShowCard] = useState(false);
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);
    const [error, setError] = useState("");

    // Prevent scroll when card is open
    React.useEffect(() => {
        if (showCard) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [showCard]);

    const handleSubscribe = async (e) => {
        e.preventDefault();
        setError("");
        if (!email.trim()) {
            setError("Email is required");
            return;
        }
        if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
            setError("Enter a valid email address");
            return;
        }
        try {
            await subscribe(email);
            setSubscribed(true);
            setTimeout(() => {
                setShowCard(false);
                setSubscribed(false);
                setEmail("");
            }, 4000);
        } catch (err) {
            setError(err.message);
        }
    };


    return (
        <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
            <Helmet>
                <title>About Zeneration Media | Marketing Agency in Kalyan</title>
                <meta name="description" content="Learn about Zeneration Media, a passionate marketing agency in Kalyan helping local businesses and real estate projects shine with effective, human-centric growth strategies." />
            </Helmet>
            <div className="relative flex items-center w-full max-w-xl mx-auto">
                <img
                    src="/Logo/EyeLogo.jpg"
                    alt="Rakesh Choudhary"
                    className="absolute md:top-24 top-18 right-[110] md:w-20 md:h-20 w-12 h-12 rounded-full object-cover border-2 border-[#232927] mb-6 shadow-md"
                />
                <div>
                    <h1 className="text-4xl md:text-5xl text-white text-center mb-8">About</h1>
                    <div className="text-[#e5e5e5] md:ml-24 ml-14 text-sm md:text-sm font-['F3'] text-left space-y-4">
                        <p>Hello! I'm <span className="text-blue-400 font-Gilroy-SemiBold">Rakesh Choudhary</span>, the founder of Zeneration Media.</p>
                        <p>We're a young, passionate team based in Kalyan with one mission:<br />To help real estate and local businesses not just grow — but truly shine.</p>
                        <p>The idea for Zeneration Media was born out of a simple observation.<br />I saw how countless amazing local businesses were struggling — not because their products or services were lacking, but because they weren't being seen, heard, or understood online.</p>
                        <p>That hurt to watch.</p>
                        <p>So, with just a laptop, a dream, and a lot of curiosity, I started learning everything I could about full-funnel marketing, storytelling, and conversion-driven branding.<br />I didn't want to build just another marketing agency — I wanted to build a growth partner that businesses could trust like family.</p>
                        <p>With Zeneration, we focus on results, retention, and reputation.<br />We believe in creating marketing that feels human — not loud or pushy.<br />Marketing that understands people, builds connection, and gently guides them to take action.</p>
                        <p>Whether it's helping a small salon get discovered by hundreds of new clients or supporting a real estate brand in selling its next big project — we do it with care, creativity, and commitment.</p>
                        <p>This is just the beginning.<br />One day, Zeneration Media will stand tall as Kalyan's #1 marketing agency — and eventually, a powerhouse that empowers businesses across India to grow with confidence and clarity.</p>
                        <p>We're not in a rush.<br />We're here for the long run, to build trust, spark transformation, and leave behind a legacy of success stories.</p>
                    </div>
                </div>
            </div>
            <div className="mt-16 text-sm text-white text-center font-['F3']">
                Zeneration Media is made possible thanks to our amazing team.
                <button
                    onClick={() => setShowCard(true)}
                    className="group text-sm cursor-pointer inline-flex text-white items-center gap-1 px-1 py-1 transition-all duration-300 hover:text-zinc-300 focus:outline-none"
                >
                    Become a part of our journey
                    <span className="inline-block transition-all duration-300 group-hover:translate-x-[0.3rem] group-hover:scale-[0.95]">
                        →
                    </span>
                </button>

                <div className="flex flex-wrap items-center justify-center gap-8 mt-6">
                    {[
                        {
                            name: "Aryan Mehta",
                            role: "Sales Manager",
                            img: "https://randomuser.me/api/portraits/men/32.jpg",
                        },
                        {
                            name: "Nisha Patel",
                            role: "Creative Director",
                            img: "https://randomuser.me/api/portraits/women/44.jpg",
                        },
                        {
                            name: "Rahul Verma",
                            role: "Performance Marketer",
                            img: "https://randomuser.me/api/portraits/men/58.jpg",
                        },
                        {
                            name: "Sanya Kapoor",
                            role: "Client Success Manager",
                            img: "https://randomuser.me/api/portraits/women/68.jpg",
                        },
                    ].map((member, index) => (
                        <div key={index} className="flex items-center justify-center text-center">
                            <img
                                src={member.img}
                                alt={member.name}
                                className="w-8 h-8 rounded-full shadow-md"
                            />
                            <div className='text-left ml-2'>
                                <h4 className="mt-2 text-sm font-['F3'] text-white">{member.name}</h4>
                                <p className="text-xs text-gray-400">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Animated Subscribe Card */}
            <AnimatePresence>
                {showCard && (
                    <motion.div
                        className="fixed inset-0 z-[50] flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.22 }}
                    >
                        {/* Overlay with background image and dull effect */}
                        <div
                            className="fixed inset-0 bg-black/50 bg-opacity-90 backdrop-blur-xs"
                        />
                        <motion.div
                            className="relative bg-white dark:bg-zinc-950 rounded-xl shadow-2xl p-8 max-w-xs w-full flex flex-col items-center z-10"
                            initial={{ scale: 0.92, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.92, opacity: 0 }}
                            transition={{ duration: 0.22 }}
                        >
                            <button
                                className="absolute top-2 right-2 cursor-pointer text-zinc-400 hover:text-zinc-700 dark:hover:text-white text-xl font-bold focus:outline-none"
                                onClick={() => setShowCard(false)}
                                aria-label="Close"
                            >
                                ×
                            </button>
                            <div className="text-md font-['F3'] text-zinc-900 dark:text-white mb-2 text-center">Currently no vacancy is available</div>
                            <div className="text-xs text-zinc-400 dark:text-zinc-300 mb-4 text-center">Subscribe to get notified when we are hiring. We'll email you as soon as a vacancy opens up!</div>
                            <form onSubmit={handleSubscribe} className="w-full flex flex-col gap-2 items-center">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="Your email address"
                                    className="w-full px-3 py-2 rounded placeholder:text-xs placeholder:font-['F3'] focus:outline-none text-sm bg-zinc-900"
                                />
                                {error && <div className="text-xs text-red-500 text-center">{error}</div>}

                                <button
                                    type="submit"
                                    className={`w-full mt-1 text-white rounded py-2 font-semibold transition-all cursor-pointer ${subscribed
                                        ? "bg-green-500 hover:bg-green-600"
                                        : "bg-blue-500 hover:bg-blue-700"
                                        }`}
                                >
                                    {subscribed ? "Subscribed!!" : "Subscribe"}
                                </button>
                            </form>

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

export default About