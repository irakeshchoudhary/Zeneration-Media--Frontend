import React from 'react';
import { MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FeedBack = () => {
    const navigate = useNavigate();

    const handleFeedbackClick = () => {
        navigate('/feedback');
    };

    return (
        <button
            onClick={handleFeedbackClick}
            aria-label="Feedback"
            className="cursor-pointer items-center fixed left-0 top-1/2 -translate-y-1/2 z-50 bg-gradient-to-b from-[#243eff] to-[#1b34ff] text-white px-2 py-3 rounded-r-md shadow-md hover:shadow-xl transition-all duration-300 ease-in-out group hover:translate-x-0 -translate-x-[calc(100%-5px)] hidden md:flex"
            style={{
                writingMode: 'horizontal-rl',
                textOrientation: 'mixed',
                fontFamily: 'F3',
                letterSpacing: '1px'
            }}
        >
            <div className="flex items-center justify-center gap-1">
                <MessageSquare className="w-4 h-4 mb-1 transition-transform group-hover:rotate-12" />
                <span className="text-xs tracking-wide">Feedback</span>
            </div>
        </button>
    );
};

export default FeedBack;
