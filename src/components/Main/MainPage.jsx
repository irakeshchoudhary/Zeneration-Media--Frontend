import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Loader2, VolumeOff, Volume2 } from "lucide-react";
import LeadFormDialog from "./LeadFormDialog";
import { Helmet } from 'react-helmet-async';

function MainPage() {
    // --- State ---
    const [videoPlaying, setVideoPlaying] = useState(true);
    const [videoMuted, setVideoMuted] = useState(true);
    const [videoDuration, setVideoDuration] = useState(0);
    const [videoCurrent, setVideoCurrent] = useState(0);
    const [showControls, setShowControls] = useState(false);
    const videoRef = useRef(null);
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    // Video controls
    const handleVideoToggle = () => {
        if (videoRef.current) {
            if (videoPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setVideoPlaying(!videoPlaying);
        }
    };
    const handleMuteToggle = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoMuted;
            setVideoMuted(!videoMuted);
        }
    };
    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setVideoDuration(videoRef.current.duration);
        }
    };
    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setVideoCurrent(videoRef.current.currentTime);
        }
    };
    const handleSeek = (e) => {
        const value = parseFloat(e.target.value);
        if (videoRef.current) {
            videoRef.current.currentTime = value;
            setVideoCurrent(value);
        }
    };
    const handleVideoContainerClick = () => {
        if (isMobile) setShowControls((prev) => !prev);
    };

    // --- Main Render ---
    return (
        <>
            <Helmet>
                <title>Zeneration Media - Best Marketing Agency in Kalyan</title>
                <meta name="description" content="Zeneration Media: Your go-to marketing agency in Kalyan. We provide full funnel marketing services and drive local business leads for small businesses. Achieve transformative results." />
            </Helmet>
            <section className="relative flex flex-col items-center justify-center w-full mt-20 mb-16 transition-colors duration-300">
                <h1
                    className="text-center text-zinc-900 dark:text-white transition-colors duration-300"
                    style={{ fontFamily: 'Gilroy-Black', fontSize: 'clamp(1.5vw,6vw,3.2rem)', lineHeight: 1.08 }}
                >
                    Grow your Business & Revenue
                </h1>
                <div
                    className="text-center text-zinc-600 dark:text-white mt-3 transition-colors duration-300"
                    style={{ fontFamily: 'Gilroy-SemiBold', fontSize: 'clamp(0.9rem,1.2vw,1.5rem)', maxWidth: 800 }}
                >
                    From leads to Sales we are here to deliver the transformative Results.
                </div>
                <div className="w-full flex justify-center mt-10 mb-8">
                    <div
                        className="relative w-full max-w-[850px] h-[45vw] max-h-[450px] min-h-[220px] rounded-xl overflow-hidden bg-[#f3f3f3] dark:bg-[#181818] shadow-2xl flex flex-col justify-end transition-colors duration-300"
                        onMouseEnter={() => !isMobile && setShowControls(true)}
                        onMouseLeave={() => !isMobile && setShowControls(false)}
                        onClick={handleVideoContainerClick}
                    >
                        <video
                            ref={videoRef}
                            src="/public/Videos/HeroVideo.mp4"
                            className="object-cover w-full h-full"
                            autoPlay
                            loop
                            muted={videoMuted}
                            onLoadedMetadata={handleLoadedMetadata}
                            onTimeUpdate={handleTimeUpdate}
                        />
                        {(showControls || !isMobile) && (
                            <>
                                <div className="absolute bottom-4 left-4 flex items-center gap-2 z-10">
                                    <button
                                        onClick={handleVideoToggle}
                                        className="bg-transparent cursor-pointer text-white rounded-full px-4 py-2 text-sm font-semibold shadow-lg hover:bg-black/90 transition"
                                        style={{ fontFamily: 'Gilroy-SemiBold' }}
                                    >
                                        {videoPlaying ? 'Pause' : 'Play'}
                                    </button>
                                    <button
                                        onClick={handleMuteToggle}
                                        className="bg-transparent cursor-pointer text-white rounded-full p-2 shadow-lg hover:bg-black/90 transition flex items-center justify-center"
                                        style={{ fontFamily: 'Gilroy-SemiBold' }}
                                        aria-label="Toggle sound"
                                    >
                                        {videoMuted ? <span role="img" aria-label="Muted"><VolumeOff /></span> : <span role="img" aria-label="Unmuted"><Volume2 /></span>}
                                    </button>
                                </div>
                                <input
                                    type="range"
                                    min={0}
                                    max={videoDuration}
                                    step={0.1}
                                    value={videoCurrent}
                                    onChange={handleSeek}
                                    className="absolute bottom-2 left-4 right-4 w-[95%] h-1 accent-[#243eff] bg-white/20 dark:bg-black/20 rounded-lg cursor-pointer z-10"
                                    style={{ accentColor: '#243eff' }}
                                />
                            </>
                        )}
                    </div>
                </div>
                <div className="flex flex-row items-center justify-center gap-2 mt-2 mb-8 flex-wrap">
                    <span
                        className="text-zinc-900 dark:text-white transition-colors duration-300"
                        style={{ fontFamily: 'F3', fontSize: 16 }}
                    >
                        We don't create ads,
                    </span>
                    <span
                        className="text-zinc-700 dark:text-white transition-colors duration-300"
                        style={{ fontFamily: 'F1', fontSize: 16 }}
                    >
                        *we create brands
                    </span>
                </div>
                <LeadFormDialog triggerButtonText="Book Free Strategy Call" />
            </section>
        </>
    );
}

export default MainPage; 