import React, { useRef, useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Loader2, VolumeOff, Volume2, PlayCircle, Globe } from "lucide-react";
import LeadFormDialog from "./LeadFormDialog";
import { Helmet } from 'react-helmet-async';
import LanguageSelectionDialog from './LanguageSelectionDialog';

function MainPage() {
    // --- State ---
    const [isPlaying, setIsPlaying] = useState(false);
    const [videoMuted, setVideoMuted] = useState(true);
    const [videoDuration, setVideoDuration] = useState(0);
    const [videoCurrent, setVideoCurrent] = useState(0);
    const [showControls, setShowControls] = useState(false);
    const [activeVideoSrc, setActiveVideoSrc] = useState(null);
    const [showLanguageSelectionDialog, setShowLanguageSelectionDialog] = useState(false);
    const [currentVideoLanguage, setCurrentVideoLanguage] = useState(null);
    const [touchTimeout, setTouchTimeout] = useState(null);

    const videoRef = useRef(null);
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    // Language-specific video paths
    const videoPaths = {
        english: "/Videos/HeroVideo_English.mp4",
        hindi: "/Videos/HeroVideo_Hindi.mp4"
    };
    const thumbnailSrc = "https://i.pinimg.com/736x/69/bc/e4/69bce4f9e488bf4538f7dcd309260b55.jpg";

    // --- Video controls ---
    const handleVideoToggle = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
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
            if (isPlaying) {
                videoRef.current.play();
            }
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
        // This function will now be removed from the outer div's onClick
        // if (isMobile) setShowControls((prev) => !prev);
    };

    // --- New Language Selection Logic ---
    const handlePlayButtonClick = () => {
        console.log("Play button clicked! Opening language dialog."); // Debugging log
        setShowLanguageSelectionDialog(true);
    };

    const handleLanguageSelect = (language) => {
        const selectedPath = videoPaths[language];
        if (selectedPath) {
            setActiveVideoSrc(selectedPath);
            setCurrentVideoLanguage(language);
            setShowLanguageSelectionDialog(false);
            setVideoMuted(false); // Set video to unmuted
            setIsPlaying(true); // Automatically play after selection
        }
    };

    // --- Language Switch Logic ---
    const handleLanguageSwitch = () => {
        const newLanguage = currentVideoLanguage === 'english' ? 'hindi' : 'english';
        const newPath = videoPaths[newLanguage];
        if (newPath) {
            setActiveVideoSrc(newPath);
            setCurrentVideoLanguage(newLanguage);
            setIsPlaying(true); // Ensure it plays after switch
            if (videoRef.current) {
                videoRef.current.currentTime = 0; // Start from beginning on language switch
            }
        }
    };

    // Effect to play video once src is set
    useEffect(() => {
        if (activeVideoSrc && videoRef.current && isPlaying) {
            videoRef.current.load(); // Reload video with new src
            videoRef.current.play().catch(error => {
                console.error("Error attempting to play video:", error);
                // Handle autoplay restrictions if needed (e.g., show a play button again)
            });
        }
    }, [activeVideoSrc, isPlaying]);

    // Add touch event handlers
    const handleTouchStart = () => {
        if (touchTimeout) {
            clearTimeout(touchTimeout);
        }
        setShowControls(true);
    };

    const handleTouchEnd = () => {
        const timeout = setTimeout(() => {
            setShowControls(false);
        }, 3000);
        setTouchTimeout(timeout);
    };

    // --- Main Render ---
    return (
        <>
            <Helmet>
                <title>Zeneration Media - Best Marketing Agency in Kalyan</title>
                <meta name="description" content="Zeneration Media: Your go-to marketing agency in Kalyan. We provide full funnel marketing services and drive local business leads for small businesses. Achieve transformative results." />
            </Helmet>
            <section className="relative flex flex-col items-center justify-center w-full mt-8 mb-16 sm:mt-10 md:mt-6">
                <h1
                    className="text-center text-white text-nowrap"
                    style={{ fontFamily: 'Gilroy-Black', fontSize: 'clamp(1.5rem, 5vw, 3.8rem)', lineHeight: 1.08 }}
                >
                    Grow your Business & Revenue
                </h1>
                <div
                    className="text-center text-white mt-3"
                    style={{ fontFamily: 'Gilroy-SemiBold', fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)', maxWidth: 800 }}
                >
                    From leads to Sales we are here to deliver the transformative Results.
                </div>
                <div className="w-full flex justify-center mt-8 mb-6 sm:mt-10 sm:mb-8">
                    <div
                        className="relative w-full max-w-[850px] h-[50vw] max-h-[450px] min-h-[220px] rounded-xl overflow-hidden bg-[#181818] shadow-2xl flex flex-col justify-end"
                        onMouseEnter={() => !isMobile && setShowControls(true)}
                        onMouseLeave={() => !isMobile && setShowControls(false)}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        {!activeVideoSrc ? (
                            // Thumbnail and Play Button
                            <div
                                className="absolute inset-0 flex items-center justify-center z-20"
                                style={{ backgroundImage: `url(${thumbnailSrc})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                            >
                                <button
                                    onClick={handlePlayButtonClick}
                                    className="bg-transparent border-none p-0 cursor-pointer focus:outline-none z-30"
                                >
                                    <PlayCircle className="w-20 h-20 text-white opacity-80 hover:opacity-100 transition-opacity" />
                                </button>
                            </div>
                        ) : (
                            // Video Player
                            <video
                                ref={videoRef}
                                src={activeVideoSrc}
                                className="object-cover w-full h-full"
                                muted={videoMuted}
                                onLoadedMetadata={handleLoadedMetadata}
                                onTimeUpdate={handleTimeUpdate}
                            />
                        )}

                        {activeVideoSrc && (showControls || !isMobile) && (
                            <>
                                <div className="absolute bottom-4 left-4 flex items-center gap-2 z-10">
                                    <button
                                        onClick={handleVideoToggle}
                                        className="bg-transparent cursor-pointer text-white rounded-full px-3 py-1 text-sm font-semibold shadow-lg hover:bg-black/90 transition sm:px-4 sm:py-2"
                                        style={{ fontFamily: 'Gilroy-SemiBold' }}
                                    >
                                        {isPlaying ? 'Pause' : 'Play'}
                                    </button>
                                    <button
                                        onClick={handleMuteToggle}
                                        className="bg-transparent cursor-pointer text-white rounded-full p-1 shadow-lg hover:bg-black/90 transition flex items-center justify-center sm:p-2"
                                        style={{ fontFamily: 'Gilroy-SemiBold' }}
                                        aria-label="Toggle sound"
                                    >
                                        {videoMuted ? <span role="img" aria-label="Muted"><VolumeOff size={18} sm:size={20} /></span> : <span role="img" aria-label="Unmuted"><Volume2 size={18} sm:size={20} /></span>}
                                    </button>
                                </div>
                                <div className="absolute bottom-4 right-4 z-10">
                                    <button
                                        onClick={handleLanguageSwitch}
                                        className="bg-transparent cursor-pointer text-white rounded-full p-1 shadow-lg hover:bg-black/90 transition flex items-center justify-center sm:p-2"
                                        style={{ fontFamily: 'Gilroy-SemiBold' }}
                                        aria-label="Switch language"
                                    >
                                        <Globe size={18} sm:size={20} />
                                    </button>
                                </div>
                                <input
                                    type="range"
                                    min={0}
                                    max={videoDuration}
                                    step={0.1}
                                    value={videoCurrent}
                                    onChange={handleSeek}
                                    className="absolute bottom-2 left-2 right-2 w-[calc(100%-1rem)] h-1 accent-[#243eff] bg-black/20 rounded-lg cursor-pointer z-10 sm:left-4 sm:right-4 sm:w-[calc(100%-2rem)]"
                                    style={{ accentColor: '#243eff' }}
                                />
                            </>
                        )}
                    </div>
                </div>
                <div className="flex flex-row items-center justify-center gap-2 mt-2 mb-8 text-center px-4">
                    <span
                        className="text-white text-sm sm:text-base whitespace-nowrap"
                        style={{ fontFamily: 'F3' }}
                    >
                        We don't create ads,
                    </span>
                    <span
                        className="text-white text-sm sm:text-base whitespace-nowrap"
                        style={{ fontFamily: 'F1' }}
                    >
                        *we create brands
                    </span>
                </div>
                <LeadFormDialog triggerButtonText="Book Free Strategy Call" />
            </section>
            <LanguageSelectionDialog
                isOpen={showLanguageSelectionDialog}
                onClose={() => setShowLanguageSelectionDialog(false)}
                onLanguageSelect={handleLanguageSelect}
            />
        </>
    );
}

export default MainPage; 