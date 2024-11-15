'use client'


import React, { useState, useRef, MouseEvent, useEffect } from "react";

interface VolumeSliderProps {
    onVolumeChange: (newVolume: number) => void;
    currentVolume: number;
}

const VolumeSlider: React.FC<VolumeSliderProps> = ({ onVolumeChange, currentVolume }) => {
    const [volume, setVolume] = useState<number>(currentVolume); 
    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setVolume(currentVolume);
    }, [currentVolume]);

    // Updated click handler with bounds checking
    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        if (!sliderRef.current) return;
        const rect = sliderRef.current.getBoundingClientRect();
        const width = rect.width;
        const clickX = Math.max(0, Math.min(e.clientX - rect.left, width));
        const newVolume = Math.min(10, Math.max(0, Math.round((clickX / width) * 10)));
        setVolume(newVolume);
        onVolumeChange(newVolume);
    };

     // Updated mouse move handler with the same fixes
     const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (e.buttons === 1) {
            if (!sliderRef.current) return;
            const rect = sliderRef.current.getBoundingClientRect();
            const width = rect.width;
            const clickX = Math.max(0, Math.min(e.clientX - rect.left, width));
            const newVolume = Math.min(10, Math.max(0, Math.round((clickX / width) * 10)));
            setVolume(newVolume);
            onVolumeChange(newVolume);
        }
    };

     // Updated bar color logic
     const getBarColor = (index: number): string => {
        return index < volume ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.3)';
    };

    return (
        <div
            ref={sliderRef}
            style={sliderStyle}
            onClick={handleClick}
            onMouseMove={handleMouseMove}
        >
            {[...Array(10)].map((_, index) => (
                <div
                    key={index}
                    style={{
                        ...barStyle,
                        backgroundColor: getBarColor(index),
                        width: `${100 / 10}%`,  // Equal width for all bars
                    }}
                />
            ))}
        </div>
    );
};

const sliderStyle: React.CSSProperties = {
    display: 'flex',
    width: '100%',
    height: '20px',
    cursor: 'pointer',
    alignItems: 'center',
    gap: '5px',
};

const barStyle: React.CSSProperties = {
    height: '15px',
    width: '4px',
    marginRight: '0',
};

export default VolumeSlider;