"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { sendCallRequest, getLastCallRequestTime } from '../../APIs/Api';
import { Button } from '../ui/button';
import { Helmet } from 'react-helmet-async';

const Contact = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [form, setForm] = useState({ name: '', number: '' });
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastRequestTime, setLastRequestTime] = useState(null);
  const [timer, setTimer] = useState(0);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  // Timer logic
  useEffect(() => {
    let interval;
    if (lastRequestTime) {
      interval = setInterval(() => {
        const now = Date.now();
        const diff = 5 * 60 * 1000 - (now - new Date(lastRequestTime).getTime());
        setTimer(diff > 0 ? diff : 0);
      }, 1000);
    } else {
      setTimer(0);
    }
    return () => clearInterval(interval);
  }, [lastRequestTime]);

  // When popup opens, check last request time
  useEffect(() => {
    if (showPopup) {
      if (form.number) {
        getLastCallRequestTime(form.number).then(res => {
          setLastRequestTime(res.lastRequestTime);
        }).catch(() => {
          setLastRequestTime(null);
        });
      } else {
        setLastRequestTime(null);
      }
    }
  }, [showPopup, form.number]);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value.replace(/\s/g, '') });
    setFormError('');
  };

  const handleWhatsappClick = () => {
    window.open('https://wa.me/6377581769', '_blank');
  };

  const handleEmailClick = () => {
    window.open('mailto:zenerationmedia@gmail.com', '_blank');
  };

  const handlePhoneClick = () => {
    setShowPopup(true);
    setFormError('');
    setFormSuccess('');
    setShowSuccessMsg(false);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setForm({ name: '', number: '' });
    setFormError('');
    setFormSuccess('');
    setShowSuccessMsg(false);
    setLastRequestTime(null);
  };

  const validateForm = () => {
    if (!form.name.trim() || !form.number) {
      setFormError('Name and number are required.');
      return false;
    }
    // Name: allow spaces, just check not blank
    // Number: only digits, 10 digits, no spaces, no chars
    if (!/^\d{10}$/.test(form.number)) {
      setFormError('Number must be exactly 10 digits.');
      return false;
    }
    return true;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await sendCallRequest(form);
      setFormSuccess('Thank you! We have received your request.');
      setShowSuccessMsg(true);
      setLastRequestTime(Date.now());
      setForm({ name: '', number: '' });
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'An unexpected error occurred.';
      setFormError(errorMessage);
      setShowSuccessMsg(false);
      if (form.number && errorMessage.includes('request already sent')) {
        getLastCallRequestTime(form.number).then(res => {
          setLastRequestTime(res.lastRequestTime);
        }).catch(() => {
          setLastRequestTime(null);
        });
      } else {
        setLastRequestTime(null);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Timer formatting
  const formatTimer = useCallback((ms) => {
    if (ms <= 0) return '00:00';
    const min = Math.floor(ms / 60000);
    const sec = Math.floor((ms % 60000) / 1000);
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  }, []);

  return (
    <section className="min-h-[100vh] font-['F3'] text-white flex flex-col items-center justify-center px-4">

      <Helmet>
        <title>Zeneration Media | Contact Us</title>
        <meta name="description" content="Get in touch with Zeneration Media for performance marketing services. Contact us via WhatsApp, Email, or request a callback." />
        <meta name="keywords" content="contact marketing agency, WhatsApp contact, email marketing agency, request callback" />
        <meta name="author" content="Zeneration Media Team" />
        <link rel="canonical" href="https://zenerationmedia.in/contact" />
      </Helmet>

      <img src="/Public/Logo/EyeLogo.jpg" alt="Zeneration Media Logo" className="mb-6 h-12 z-[50]" />

      <h1 className="text-3xl md:text-5xl font-bold text-center mb-3 z-[50]">
        Let's Connect!!
      </h1>

      <p className="text-zinc-400 text-center text-sm md:text-md mb-8 max-w-xl z-[50]">
        Choose how you want to reach us or let us get in touch with you.
      </p>

      <div className='flex flex-wrap items-center justify-center gap-4 md:gap-2 z-[50]'>
        <div
          className='px-5 py-1 bg-zinc-900 grainy-filter rounded-md flex items-center justify-center gap-2 cursor-pointer transform transition-all ease-in-out duration-300 hover:bg-zinc-800 hover:-translate-y-[0.5] hover:scale-[1.03] hover:-translate-x-[0.5] hover:rotate-4 border-[0.5px] border-zinc-900 w-full sm:w-auto'
          onClick={handleWhatsappClick}
          aria-label="Contact via WhatsApp"
        >
          <img className='h-8' src="/Public/Logo/WhatsappLogo.png" alt="WhatsApp Logo" />
          <span className="text-white">Whatsapp</span>
          <i className="ri-arrow-right-s-line"></i>
        </div>

        <div
          className='px-5 py-1 bg-zinc-900 grainy-filter rounded-md flex items-center justify-center gap-2 cursor-pointer transform transition-all ease-in-out duration-300 hover:bg-zinc-800 hover:-translate-y-[0.5] hover:scale-[1.03] hover:-translate-x-[0.5] hover:rotate-4 border-[0.5px] border-zinc-900 w-full sm:w-auto'
          onClick={handleEmailClick}
          aria-label="Contact via Email"
        >
          <img className='h-8' src='/public/Photos/remove/EmailLogo.png' alt="Email Logo" />
          <span className="text-white">Email</span>
          <i className="ri-arrow-right-s-line"></i>
        </div>

        <div
          className='px-5 py-1 bg-zinc-900 grainy-filter rounded-md flex items-center justify-center gap-2 cursor-pointer transform transition-all ease-in-out duration-300 hover:bg-zinc-800 hover:-translate-y-[0.5] hover:scale-[1.03] hover:-translate-x-[0.5] hover:rotate-4 border-[0.5px] border-zinc-900 w-full sm:w-auto'
          onClick={handlePhoneClick}
          aria-label="Request a callback"
        >
          <img className='h-8' src="/public/Photos/remove/PhoneLogo.png" alt="Phone Icon" />
          <span className="text-white">Call Request</span>
          <i className="ri-arrow-right-s-line"></i>
        </div>
      </div>

      <p className='text-zinc-600 font-["F3"] text-center text-xs md:text-xs mt-4 max-w-xl z-[50]'>
        Tip: If you are a student, please use the email option to contact us.
      </p>

      {showPopup && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/50 bg-opacity-90 backdrop-blur-xs"
            onClick={handleClosePopup}
          />

          <div className="fixed inset-0 z-50 flex font-['F3'] items-center justify-center px-4">
            <div className="relative bg-zinc-950 rounded-xl shadow-2xl w-full max-w-sm md:max-w-md p-6 md:p-8 backdrop-blur-lg">
              <button
                className="absolute top-3 cursor-pointer right-3 text-zinc-500 hover:text-white text-2xl font-bold transition"
                onClick={handleClosePopup}
                aria-label="Close"
              >
                &times;
              </button>

              {!showSuccessMsg ? (
                <>
                  <h2 className="text-xl md:text-2xl font-['F3'] mb-4 text-center">
                    Request a Callback
                  </h2>

                  <form className="space-y-4" onSubmit={handleFormSubmit}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Full Name"
                      className="w-full px-4 py-2 rounded-md bg-zinc-900 outline-none transition-all placeholder:text-xs placeholder:text-zinc-700"
                      value={form.name}
                      onChange={handleInputChange}
                      autoComplete="off"
                    />

                    <input
                      type="text"
                      name="number"
                      placeholder="10-digit Mobile Number"
                      className="w-full px-4 py-2 rounded-md bg-zinc-900 outline-none transition-all placeholder:text-xs placeholder:text-zinc-700"
                      value={form.number}
                      onChange={e => {
                        // Only allow digits
                        const val = e.target.value.replace(/\D/g, '');
                        setForm({ ...form, number: val });
                        setFormError('');
                      }}
                      autoComplete="off"
                      maxLength={10}
                    />

                    {formError && <p className="text-red-400 text-xs mt-1">{formError}</p>}
                    {formSuccess && <p className="text-zinc-200 text-sm mt-1">{formSuccess}</p>}

                    <Button
                      type="submit"
                      className="w-full font-['Gilroy-SemiBold'] cursor-pointer transition-all ease-in-out hover:bg-zinc-400"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Request'}
                    </Button>

                    {timer > 0 && !showSuccessMsg && (
                      <p className="text-zinc-400 text-center text-xs mt-2">
                        You can send another request in {formatTimer(timer)}.
                      </p>
                    )}
                  </form>
                </>
              ) : (
                <div className="text-center">
                  <h2 className="text-xl font-bold text-yellow-400 mb-2">Thank you!</h2>
                  <p className="text-white text-base mb-1">We have received your request.</p>
                </div>
              )}
            </div>
          </div>

        </>
      )}

    </section>
  );
};

export default Contact;
