'use client'

import React, { useEffect, useState } from 'react';
import WaveformVisualizer from "@/app/ui/waveform";
import VolumeSlider from './volumeSlider';
import Image from 'next/image'

declare global {
    interface Window {
        YT: any;
    }
}

interface YouTubeLivestreamPlayerProps {
    videoId: string;
}

const YouTubeLivestreamPlayer: React.FC<YouTubeLivestreamPlayerProps> = ({ videoId }) => {
    const [player, setPlayer] = useState<any>(null); // Player instance, 'any' because YT.Player type is not included in TypeScript by default
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [volume, setVolume] = useState<number>(80);

    const onPlayerReady = () => {
        console.log('Player is ready');
        player.setVolume(volume);
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        script.onload = () => {
            window.YT.ready(() => {
                const playerInstance = new window.YT.Player('youtube-player', {
                    videoId: videoId,
                    events: {
                        onReady: onPlayerReady,
                        onStateChange: onPlayerStateChange,
                    },
                    playerVars: {
                        controls: 0,
                        showinfo: 0,
                        rel: 0,
                        autohide: 1,
                    },
                });
                setPlayer(playerInstance);
            });
        };
        document.body.appendChild(script);
    }, [videoId, onPlayerReady]);

    const onPlayerStateChange = (event: any) => {
        if (event.data === window.YT.PlayerState.PLAYING) {
            setIsPlaying(true);
        } else if (event.data === window.YT.PlayerState.PAUSED) {
            setIsPlaying(false);
        }
    };

    const togglePlayPause = () => {
        if (player) {
            if (isPlaying) {
                player.pauseVideo();
            } else {
                player.playVideo();
            }
        }
    };

    const handleVolumeChange = (newVolume: number) => {
        const scaledVolume = newVolume * 10;
        setVolume(scaledVolume);
        if (player) {
            player.setVolume(scaledVolume);
        }
    };

    return (
        <div className="grid gap-y-2">
            <div className="flex items-center gap-8">
                <div className="cursor-pointer" onClick={togglePlayPause}>
                    {isPlaying ? <Image src="./pause.svg" width={30} height={30} alt="Play button"/> :
                        <Image src="./play.svg" width={30} height={30} alt="Play button"/>}
                </div>
                <div className="w-24">
                    <VolumeSlider onVolumeChange={handleVolumeChange} currentVolume={volume / 10} />
                </div>
            </div>
            <div className="flex items-center gap-4">
                <WaveformVisualizer isPlaying={isPlaying}/>
                <h1 className="text-white font-vt323 text-xl">lofi hip hop radio 📚 beats to relax/study to</h1>
                <div id="youtube-player" style={{display: 'none'}}></div>
            </div>
        </div>
    );
};

export default YouTubeLivestreamPlayer;