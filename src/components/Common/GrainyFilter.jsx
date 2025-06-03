import React from "react";

const GrainyFilter = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full z-0">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute inset-0 bg-[url('/Svg/GrainyFilter.svg')] bg-cover bg-center opacity-30"></div>
        </div>
    );
};

export default GrainyFilter;
