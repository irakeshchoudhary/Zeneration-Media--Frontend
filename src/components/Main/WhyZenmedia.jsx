import React from 'react';
import { Helmet } from 'react-helmet-async';

const WhyZenmedia = () => (
    <section className="min-h-[60vh] flex flex-col items-center justify-center py-20 relative z-[50]">

        <div className="relative flex items-center w-full max-w-xl mx-auto">
            {/* <img
                src="/Logo/EyeLogo.jpg"
                alt="Rakesh Choudhary"
                className="absolute top-24 right-[110] w-20 h-20 rounded-full object-cover border-2 border-[#232927] mb-6 shadow-md"
            /> */}
            <div className="w-full max-w-5xl mx-auto px-4 py-16">
                <h1 className="text-4xl md:text-5xl text-white text-center mb-14 font-bold font-['F3']">
                    Why Choose Us?
                </h1>

                <div className="text-[#e5e5e5] text-sm md:text-base font-['F1'] space-y-10 leading-relaxed">

                    {/* STORY + STRATEGIC INTRO */}
                    <div>
                        <p>
                            Real experience beats theory — and the foundation of <span className="text-yellow-400 font-semibold">Zeneration Media</span> is built on that belief.
                            Let me share a personal story that shaped how we approach marketing, branding, and growth for every client we work with.
                        </p>
                        <div className="w-full h-52 md:h-64 bg-zinc-800/50 border border-zinc-700 rounded-lg mt-4 flex items-center justify-center text-zinc-400 text-sm italic">
                            Add a relevant image or illustration here
                        </div>
                    </div>

                    {/* ORIGIN */}
                    <div>
                        <p>
                            My father runs a small grocery shop in Kalyan.
                            I've seen him grow it from door-to-door sales on a bicycle to a known local store — all through persistence and community trust.
                            But when the pandemic hit in 2020, like many small businesses, we were hit hard.
                        </p>
                        <div className="w-full h-52 md:h-64 bg-zinc-800/50 border border-zinc-700 rounded-lg mt-4 flex items-center justify-center text-zinc-400 text-sm italic">
                            Add a photo of the shop or early days
                        </div>
                    </div>

                    {/* SPARK OF MARKETING */}
                    <div>
                        <p>
                            During lockdown, I started helping at the shop and noticed something: customers were shifting online.
                            Curious, I listed one of our products on Amazon. It didn't sell — and I realized something important:
                            <strong className="text-white">visibility</strong> matters. Simply having a product isn't enough.
                            That was my first real lesson in marketing.
                        </p>
                    </div>

                    {/* DROPSHIPPING + INSIGHT */}
                    <div>
                        <p>
                            I then tried dropshipping — small ad budgets, decent reach, but no conversions.
                            That failure taught me the biggest truth in business: <strong>people don't buy products — they buy trust.</strong>
                            They buy from brands they recognize, or those that consistently show up.
                        </p>
                    </div>

                    {/* BRANDING LESSON */}
                    <div>
                        <p>
                            So I shifted my focus from selling to <strong>branding</strong>.
                            I redesigned the store, listed it on Google Maps, improved customer interaction, and built real visibility.
                            Gradually, people started responding. Not because of a fancy product — but because of the <em>consistent presence</em>.
                        </p>
                        <div className="w-full h-52 md:h-64 bg-zinc-800/50 border border-zinc-700 rounded-lg mt-4 flex items-center justify-center text-zinc-400 text-sm italic">
                            Add before/after branding visuals
                        </div>
                    </div>

                    {/* RESULTS THAT MATTER */}
                    <div>
                        <p>
                            Today, our store is a local landmark.
                            People send grocery lists via WhatsApp, call us directly, and apps like Blinkit recognize our location.
                            Digital payments alone cross ₹1.5L/month — all because of strategic branding and trust-building.
                        </p>
                    </div>

                    {/* WHAT WE LEARNED */}
                    <div>
                        <p className="mb-2">
                            What I learned through this journey became the core of how we serve our clients today:
                        </p>
                        <ul className="pl-4 space-y-3 text-green-400">
                            <li className="flex items-start gap-2">
                                ✅ <span className="text-[#e5e5e5]">Marketing without trust is wasted budget.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                ✅ <span className="text-[#e5e5e5]">Branding is not decoration — it's a trust signal.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                ✅ <span className="text-[#e5e5e5]">Consistency builds credibility — and credibility converts.</span>
                            </li>
                        </ul>
                    </div>

                    {/* VALUE FOR CLIENTS */}
                    <div>
                        <p>
                            At <span className="text-yellow-400 font-semibold">Zeneration Media</span>, we apply these exact principles to help real estate brands, local stores, and B2B businesses:
                            by building a trustworthy digital presence, strong branding systems, and smart visibility strategies — backed by real, lived experience.
                        </p>
                    </div>

                    {/* FINAL PROMISE */}
                    <div>
                        <p>
                            You don't just get an agency — you get a partner who understands what it means to grow from scratch.
                            We don't guess. We execute what's proven to work.
                        </p>
                    </div>
                </div>
            </div>


        </div>
    </section >
);

export default WhyZenmedia; 