'use client'

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

const WaveformVisualizer = ({ isPlaying }) => {
    const bars = 5; // Number of bars in the visualizer

    return (
        <div className="flex items-end gap-0.5 h-6 w-12">
            {[...Array(bars)].map((_, i) => (
                <div
                    key={i}
                    className={`w-1.5 bg-gray-600/50 rounded-t ${
                        isPlaying ? 'animate-[wave_1s_ease-in-out_infinite]' : 'h-1'
                    }`}
                    style={{
                        animation: isPlaying ? `wave ${0.5 + Math.random() * 0.5}s ease-in-out infinite` : '',
                        height: isPlaying ? '24px' : '4px',
                        animationDelay: `${i * 0.1}s`
                    }}
                />
            ))}
        </div>
    );
};

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const audioRef = useRef(null);

    const tracks = [
        {
            title: "Track 1",
            src: "/track1.mp3"
        },
        {
            title: "Track 2",
            src: "/track2.mp3"
        },
        {
            title: "Track 3",
            src: "/track3.mp3"
        }
    ];

    useEffect(() => {
        const handleLoadedMetadata = () => {
            setDuration(audioRef.current.duration);
        };

        const handleTimeUpdate = () => {
            setCurrentTime(audioRef.current.currentTime);
        };

        const audio = audioRef.current;
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, []);

    useEffect(() => {
        // Add the wave animation keyframes dynamically
        const style = document.createElement('style');
        style.textContent = `
      @keyframes wave {
        0%, 100% { height: 8px; }
        50% { height: 24px; }
      }
    `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleProgress = (e) => {
        const clickPosition = (e.clientX - e.target.getBoundingClientRect().left) / e.target.offsetWidth;
        const newTime = clickPosition * duration;
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const playPreviousTrack = () => {
        setCurrentTrackIndex((prevIndex) =>
            prevIndex === 0 ? tracks.length - 1 : prevIndex - 1
        );
        setIsPlaying(true);
    };

    const playNextTrack = () => {
        setCurrentTrackIndex((prevIndex) =>
            prevIndex === tracks.length - 1 ? 0 : prevIndex + 1
        );
        setIsPlaying(true);
    };

    return (
        <div className="w-96 p-6 rounded-xl bg-gray-500/20 backdrop-blur-lg shadow-lg border border-gray-200/20">
            <div className="flex justify-between items-start mb-4">
                <WaveformVisualizer isPlaying={isPlaying} />
                <h2 className="text-lg font-semibold text-gray-800/90">
                    {tracks[currentTrackIndex].title}
                </h2>
                <div className="w-12" /> {/* Spacer for alignment */}
            </div>

            {/* Audio element */}
            <audio
                ref={audioRef}
                src={tracks[currentTrackIndex].src}
                onEnded={playNextTrack}
            />

            {/* Progress bar */}
            <div
                className="h-1 mb-4 bg-gray-300/30 rounded-full cursor-pointer group"
                onClick={handleProgress}
            >
                <div
                    className="h-full bg-gray-600/50 rounded-full transition-all group-hover:bg-gray-700/50"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                />
            </div>

            {/* Time */}
            <div className="flex justify-between text-sm text-gray-600/80 mb-4">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6">
                <button
                    onClick={playPreviousTrack}
                    className="p-2 hover:bg-gray-400/20 rounded-full transition-colors"
                >
                    <SkipBack className="w-6 h-6 text-gray-700/80" />
                </button>

                <button
                    onClick={togglePlay}
                    className="p-4 bg-gray-600/50 rounded-full hover:bg-gray-700/50 transition-colors"
                >
                    {isPlaying ? (
                        <Pause className="w-8 h-8 text-white/90" />
                    ) : (
                        <Play className="w-8 h-8 text-white/90" />
                    )}
                </button>

                <button
                    onClick={playNextTrack}
                    className="p-2 hover:bg-gray-400/20 rounded-full transition-colors"
                >
                    <SkipForward className="w-6 h-6 text-gray-700/80" />
                </button>
            </div>
        </div>
    );
};

export default MusicPlayer;