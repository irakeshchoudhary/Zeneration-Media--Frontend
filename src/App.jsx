import React, { useEffect, useState, Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./index.css";
import Navbar from "./components/Common/Navbar";
import Preloader from "./components/Common/Preloader";
import GrainyFilter from "./components/Common/GrainyFilter";
import Footer from "./components/Main/Footer";
import FeedBack from "./components/Common/FeedBack";
import { AnimatePresence, motion } from "framer-motion";

// Lazy load pages
const MainPage = lazy(() => import("./components/Main/MainPage"));
const Services = lazy(() => import("./components/Main/Services"));
const Clients = lazy(() => import("./components/Main/Clients"));
const FAQs = lazy(() => import("./components/Main/FAQs"));
const About = lazy(() => import("./components/Main/About"));
const Contact = lazy(() => import("./components/Main/Contact"));
const WhyZenmedia = lazy(() => import("./components/Main/WhyZenmedia"));
const FeedbackPage = lazy(() => import("./components/Main/FeedbackPage"));

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } },
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const isServices = location.pathname === '/services';

  useEffect(() => {
    document.title = "Zeneration Media | Best Marketing Agency in Kalyan";
  }, []);

  // WhatsApp floating icon
  useEffect(() => {
    const interval = setInterval(() => {
      const el = document.getElementById('whatsapp-float');
      if (el) {
        el.animate([
          { transform: 'translate(0, 0)' },
          { transform: 'translate(-8px, 0)' },
          { transform: 'translate(8px, 0)' },
          { transform: 'translate(0, 0)' },
          { transform: 'translate(0, -8px)' },
          { transform: 'translate(0, 8px)' },
          { transform: 'translate(0, 0)' },
        ], {
          duration: 900,
        });
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden">
      {/* Grainy background - z-0 */}
      {!isServices && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <GrainyFilter />
        </div>
      )}
      {/* Feedback Button - z-50 */}
      <FeedBack />
      {/* WhatsApp floating icon - z-60 */}
      <a
        href="https://wa.link/suk1hv"
        target="_blank"
        rel="noopener noreferrer"
        id="whatsapp-float"
        className="fixed bottom-4 right-4 z-60"
        style={{ width: 60, height: 60 }}
      >
        <img src="/Logo/Whatsapplogo.png" alt="WhatsApp" className="w-full h-full object-contain" />
      </a>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen w-full">
          <div className="w-12 h-12 border-[0.1px] border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      }>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Home Route */}
            <Route
              path="/"
              element={
                <>
                  <div className="fixed top-0 left-0 w-full z-[100]">
                    <Navbar />
                  </div>
                  <motion.div {...pageTransition}>
                    {loading && <Preloader onFinish={() => setLoading(false)} />}
                    <div className="Hero relative overflow-hidden pt-24 md:pt-32 p-4 md:p-6 h-auto z-10">
                      <div
                        className="absolute inset-0 w-full h-full pointer-events-none z-10"
                        style={{
                          backgroundImage: "url('/Photos/HalfCircleBlue.png')",
                          backgroundPosition: "center 60%",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          mixBlendMode: "luminosity",
                          transform: "rotate(180deg)",
                          opacity: 0.15,
                        }}
                      ></div>
                      <div className="relative z-20">
                        <MainPage />
                      </div>
                    </div>
                  </motion.div>
                  <div className="relative z-10">
                    <Footer />
                  </div>
                </>
              }
            />
            {/* Services Route */}
            <Route
              path="/services"
              element={
                <>
                  <div className="fixed top-0 left-0 w-full z-[100]">
                    <Navbar />
                  </div>
                  <motion.div {...pageTransition}>
                    <Services />
                  </motion.div>
                  <div className="relative z-10">
                    <Footer />
                  </div>
                </>
              }
            />
            {/* Clients Route */}
            <Route
              path="/clients"
              element={
                <>
                  <div className="fixed top-0 left-0 w-full z-[100]">
                    <Navbar />
                  </div>
                  <motion.div {...pageTransition} className="pt-24 px-4">
                    <Clients />
                  </motion.div>
                  <div className="relative z-10">
                    <Footer />
                  </div>
                </>
              }
            />
            {/* Why Zenmedia Route */}
            <Route
              path="/why-zenmedia"
              element={
                <>
                  <div className="fixed top-0 left-0 w-full z-[100]">
                    <Navbar />
                  </div>
                  <motion.div {...pageTransition} className="pt-24 px-4">
                    <WhyZenmedia />
                  </motion.div>
                  <div className="relative z-10">
                    <Footer />
                  </div>
                </>
              }
            />
            {/* FAQs Route */}
            <Route
              path="/faqs"
              element={
                <>
                  <div className="fixed top-0 left-0 w-full z-[100]">
                    <Navbar />
                  </div>
                  <motion.div {...pageTransition} className="pt-24 px-4">
                    <FAQs />
                  </motion.div>
                  <div className="relative z-10">
                    <Footer />
                  </div>
                </>
              }
            />
            {/* About Route */}
            <Route
              path="/about"
              element={
                <>
                  <div className="fixed top-0 left-0 w-full z-[100]">
                    <Navbar />
                  </div>
                  <motion.div {...pageTransition} className="pt-24 px-4">
                    <About />
                  </motion.div>
                  <div className="relative z-10">
                    <Footer />
                  </div>
                </>
              }
            />
            {/* Contact Route */}
            <Route
              path="/contact"
              element={
                <>
                  <div className="fixed top-0 left-0 w-full z-[100]">
                    <Navbar />
                  </div>
                  <motion.div {...pageTransition} className="pt-24 px-4">
                    <Contact />
                  </motion.div>
                  <div className="relative z-10">
                    <Footer />
                  </div>
                </>
              }
            />
            {/* Feedback Route */}
            <Route
              path="/feedback"
              element={
                <>
                  <div className="fixed top-0 left-0 w-full z-[100]">
                    <Navbar />
                  </div>
                  <motion.div {...pageTransition}>
                    <FeedbackPage />
                  </motion.div>
                  <div className="relative z-10">
                    <Footer />
                  </div>
                </>
              }
            />
            {/* 404 fallback */}
            <Route
              path="*"
              element={
                <>
                  <div className="fixed top-0 left-0 w-full z-[100]">
                    <Navbar />
                  </div>
                  <motion.div {...pageTransition} className="pt-24 px-4 text-center text-white min-h-[calc(100vh-var(--navbar-height)-var(--footer-height))] flex flex-col items-center justify-center">
                    <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
                    <p className="text-lg text-zinc-500">Sorry, the page you are looking for does not exist.</p>
                  </motion.div>
                  <div className="relative z-10">
                    <Footer />
                  </div>
                </>
              }
            />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </div>
  );
};

export default App;
