import React, { useState, useRef } from 'react';
import { Button } from '../ui/button';
import { subscribe } from '../../APIs/Api';
import { Link } from 'react-router-dom';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [touched, setTouched] = useState(false);
    const inputRef = useRef();

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleInputChange = (e) => {
        setEmail(e.target.value);
        setError('');
        setSuccess('');
        setTouched(true);
    };

    const handleSubscribe = async () => {
        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            await subscribe(email);
            setSubscribed(true);
            setSuccess('Thank you for subscribing!');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const isButtonDisabled = !validateEmail(email) || subscribed || loading;

    return (
        <>
            <div className={`h-auto min-h-[40rem] flex justify-center bg-black/20 relative`}>
                <div className="w-full md:max-w-[65%] mx-auto p-8 md:px-0">
                    {/* Top Section */}
                    <div className='pt-18 md:py-20 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0'>
                        <div className="flex flex-col gap-1 md:gap-0">
                            <h4 className='font-["F3"] text-sm text-white'>Stay in the loop</h4>
                            <p className='font-["F1"] text-xs text-zinc-300'>Subscribe for the latest news & updates.</p>
                        </div>
                        {/* Subscribe Section */}
                        <div className="relative w-full md:w-94 max-w-md grainy-filter flex flex-col md:block gap-2 md:gap-0 mt-4 md:mt-0">
                            <input
                                ref={inputRef}
                                type="email"
                                value={email}
                                onChange={handleInputChange}
                                placeholder="my@email.com"
                                className={`w-full grainy-filter px-4 py-3 bg-zinc-800 text-white rounded-md outline-none placeholder:text-xs placeholder:text-zinc-100 placeholder:font-['F3'] ${subscribed ? 'opacity-60 cursor-not-allowed' : ''}`}
                                disabled={subscribed}
                                onBlur={() => setTouched(true)}
                            />
                            <Button
                                className={`w-full md:w-auto mt-2 md:mt-0 md:absolute md:right-2 md:top-1/2 md:-translate-y-1/2 font-['F3'] font-bold px-6 py-2 bg-white select-none ${isButtonDisabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'} transition-all`}
                                onClick={isButtonDisabled ? undefined : handleSubscribe}
                                disabled={isButtonDisabled}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center w-full">
                                        <span className="w-3 h-3 border-[1.5px] border-black border-t-transparent rounded-full animate-spin"></span>
                                    </span>
                                ) : subscribed ? (
                                    <span className="text-black">Thank you!</span>
                                ) : (
                                    <span className="text-black">Subscribe</span>
                                )}
                            </Button>
                            {/* Error message */}
                            {error && (
                                <span className="absolute left-0 -bottom-6 text-xs text-red-400 font-['F3']">{error}</span>
                            )}
                        </div>
                    </div>
                    {/* Border line at bottom on mobile, at top on desktop */}
                    <div className="border-b border-zinc-700 my-8 md:my-12 md:mb-0 md:mt-12"></div>
                    {/* Bottom Section */}
                    <div className='flex flex-col md:flex-row items-center md:justify-between gap-8 md:gap-0 mb-8 md:my-42 md:mr-20'>
                        <div className="flex w-full flex-col items-left md:items-start gap-2">
                            <img src="/Logo/EyeLogo.jpg" alt="Eye Logo" className='w-10 h-10 md:w-12 md:h-12 mb-2' />
                            <p className='text-zinc-600 text-xs font-["F3"]'>©2025 Zeneration Media Ltd.</p>
                        </div>
                        {/* SITE & SOCIAL for mobile below logo, for desktop on right */}
                        <div className='flex md:flex-row items-center md:items-start gap-6 md:gap-18 w-full md:w-auto mt-6 md:mt-0'>
                            <div className='flex flex-col justify-center gap-1 items-left md:items-start'>
                                <h4 className='text-sm font-["Gilroy-SemiBold"] text-white mb-2'>SITE</h4>
                                <Link to="/services" className='text-xs font-["F3"] cursor-pointer hover:text-zinc-400 transition-all ease-in-out duration-300'>Services</Link>
                                <Link to="/contact" className='text-xs font-["F3"] cursor-pointer hover:text-zinc-400 transition-all ease-in-out duration-300'>Contact Us</Link>
                                <Link to="/about" className='text-xs font-["F3"] cursor-pointer hover:text-zinc-400 transition-all ease-in-out duration-300'>About</Link>
                                <Link to="/faqs" className='text-xs font-["F3"] cursor-pointer hover:text-zinc-400 transition-all ease-in-out duration-300'>FAQs</Link>
                            </div>
                            <div className='flex flex-col justify-center mb-5 gap-1 items-left md:items-start'>
                                <h4 className='text-sm font-["Gilroy-SemiBold"] text-white mb-2'>SOCIAL</h4>
                                <a href="https://instagram.com/zenerationmedia" target="_blank" rel="noopener noreferrer" className='text-xs font-["F3"] cursor-pointer hover:text-zinc-400 transition-all ease-in-out duration-300'>Instagram</a>
                                <a href="https://facebook.com/zenerationmedia" target="_blank" rel="noopener noreferrer" className='text-xs font-["F3"] cursor-pointer hover:text-zinc-400 transition-all ease-in-out duration-300'>Facebook</a>
                                <a href="https://youtube.com/@zenerationmedia" target="_blank" rel="noopener noreferrer" className='text-xs font-["F3"] cursor-pointer hover:text-zinc-400 transition-all ease-in-out duration-300'>Youtube</a>
                            </div>
                        </div>
                    </div>
                    <img
                        src="/public/Photos/Footer.avif"
                        alt="Services Background"
                        className="absolute w-[90vw] md:w-[50rem] top-110 md:top-90 md:left-[35rem] left-1/2 -translate-x-1/2 object-cover opacity-8 mix-blend-luminosity pointer-events-none select-none"
                        style={{ zIndex: 1 }}
                    />
                </div>
            </div>
        </>
    );
};

export default Footer;