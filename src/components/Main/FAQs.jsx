import React, { useRef, useEffect, useState } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
// Import Helmet
import { Helmet } from 'react-helmet-async';

const faqs = [
    {
        question: 'What services does Zeneration Media offer?',
        answer: (
            <>
                We provide end-to-end performance marketing solutions including brand strategy, paid advertising (Google, Meta), lead generation, funnel optimization, content creation, and business automation — tailored to your niche and goals.
            </>
        ),
    },
    {
        question: 'How is Zeneration Media different from other agencies?',
        answer: `We don't just run ads. We build a full business growth system. Our strategies focus on trust-building, high ROI, and long-term client retention — not just temporary spikes.`,
    },
    {
        question: "What's the process to get started?",
        answer: `Simple. Fill out our contact form or WhatsApp us.
- We schedule a 15–20 min discovery call.
- We create a custom growth plan.
- You get 10 days of trial performance.
- If satisfied, we move forward with a full plan.`,
    },
    {
        question: 'What does the 10-day testing phase include?',
        answer: `It includes a mini growth campaign to show results — like leads, engagement, or walk-ins — depending on your business type. We charge a small advance (20%) to filter serious businesses only.`,
    },
    {
        question: 'Do you guarantee results?',
        answer: `We don't sell fake promises. But yes — if our process is followed properly and there's genuine product-market fit, we usually help our clients achieve 2x to 10x growth in sales and visibility.`,
    },
];

const FAQs = () => {
    const [open, setOpen] = useState(null);
    const contentRefs = useRef([]);

    const handleToggle = (idx) => {
        setOpen((prev) => (prev === idx ? null : idx));
    };

    return (
        <section className="min-h-screen flex flex-col items-center justify-center px-4 py-12 md:py-20 relative z-[10]">
            <Helmet>
                <title>FAQs | Marketing Agency in Kalyan - Zeneration Media</title>
                <meta name="description" content="Frequently Asked Questions about Zeneration Media: your marketing agency in Kalyan. Get answers on digital marketing, performance marketing, and our services." />
            </Helmet>
            <div className="mb-4 text-xs tracking-widest text-green-200 bg-[#1a2321] px-4 py-1 rounded-full font-mono">FAQ</div>
            <h2 className="text-3xl md:text-5xl font-Gilroy-SemiBold text-white text-center mb-10 leading-tight">
                Frequently<br />asked questions
            </h2>

            <Accordion type="single" collapsible className="w-full max-w-2xl space-y-3">
                {faqs.map((faq, idx) => {
                    const isOpen = open === idx;

                    return (
                        <AccordionItem
                            key={idx}
                            value={`item-${idx}`}
                            className={`bg-[#181c1b] rounded-md border-none overflow-hidden transition-shadow duration-300 ${isOpen ? 'shadow-lg' : ''}`}
                        >
                            <AccordionTrigger
                                className="flex cursor-pointer items-center justify-between px-4 py-4 md:px-6 md:py-5 text-sm md:text-base font-['F3'] text-white focus:outline-none transition-colors"
                                onClick={() => handleToggle(idx)}
                            >
                                <span>{faq.question}</span>
                            </AccordionTrigger>

                            {/* Answer */}
                            <div
                                ref={(el) => (contentRefs.current[idx] = el)}
                                className="px-4 text-sm md:text-base font-['F3'] text-[#b3bdb8] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                                style={{
                                    maxHeight: isOpen
                                        ? `${contentRefs.current[idx]?.scrollHeight}px`
                                        : "0px",
                                    paddingTop: isOpen ? "4px" : "0px",
                                    paddingBottom: isOpen ? "16px" : "0px",
                                    // borderTop: isOpen ? "1px solid #232927" : "none",
                                }}
                            >
                                <p className="mb-4">{faq.answer}</p>
                            </div>
                        </AccordionItem>
                    );
                })}
            </Accordion>

            <div className="mt-4 text-center text-xs md:text-sm text-[#b3bdb8]">
                Still have questions? Email us at{" "}
                <a
                    href="mailto:hi@zeneration.com"
                    className="text-green-300 underline font-medium"
                >
                    hi@zeneration.com
                </a>
            </div>
        </section>
    );
};

export default FAQs;
