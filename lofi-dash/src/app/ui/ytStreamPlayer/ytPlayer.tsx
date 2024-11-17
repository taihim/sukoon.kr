'use client'

import { STREAMS, type Stream } from '@/app/config/streams';
import React, { useEffect, useState } from 'react';
import WaveformVisualizer from "@/app/ui/waveform";
import VolumeSlider from '../volumeSlider';
import Image from 'next/image'

declare global {
    interface Window {
        YT: any;
    }
}

interface YouTubeLivestreamPlayerProps {
    initialStreamId?: string;
}

const YouTubeLivestreamPlayer: React.FC<YouTubeLivestreamPlayerProps> = ({ 
    initialStreamId = STREAMS[0].id 
}) => {

    const [currentStreamIndex, setCurrentStreamIndex] = useState(
        STREAMS.findIndex(s => s.id === initialStreamId)
    );
    const [player, setPlayer] = useState<any>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [volume, setVolume] = useState<number>(40);


    const currentStream = STREAMS[currentStreamIndex];

    const nextStream = () => {
        const nextIndex = (currentStreamIndex + 1) % STREAMS.length;
        setCurrentStreamIndex(nextIndex);
    };
    
    const previousStream = () => {
        const prevIndex = currentStreamIndex === 0 
            ? STREAMS.length - 1 
            : currentStreamIndex - 1;
        setCurrentStreamIndex(prevIndex);
    };

    // Initialize player
    useEffect(() => {
        if (!window.YT) return;

        window.YT.ready(() => {
            const playerInstance = new window.YT.Player('youtube-player', {
                videoId: currentStream.id,
                events: {
                    onReady: (event: YT.PlayerEvent) => {
                        event.target.setVolume(volume);
                    },
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

        return () => {
            if (player?.destroy) {
                player.destroy();
            }
        };
    }, []);

    useEffect(() => {
        if (player && player.loadVideoById) {
            player.loadVideoById(currentStream.id);
        }
    }, [currentStreamIndex]);

    const onPlayerStateChange = (event: any) => {
        setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
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
        <div className="grid gap-y-2 select-none">
            <div className="flex items-center gap-4">
                <WaveformVisualizer isPlaying={isPlaying}/>
                <h1 className="text-white font-vt323 text-xl">{currentStream.title}</h1>
                <div id="youtube-player" style={{display: 'none'}}></div>
            </div>
            <div className="flex items-center gap-3">
                <div className="cursor-pointer" onClick={togglePlayPause}>
                    {isPlaying ? <Image src="./pause2.svg" width={20} height={20} alt="Pause button"/> :
                        <Image src="./play.svg" width={20} height={20} alt="Play button"/>}
                </div>
                <div className="cursor-pointer" onClick={togglePlayPause}>
                    <Image src="./shuffle2.svg" width={20} height={20} alt="Shuffle button"/>
                </div>
                <div className="cursor-pointer" onClick={previousStream}>
                    <Image src="./previous2.svg" width={20} height={20} alt="Go to previous stream button"/>
                </div>
                <div className="cursor-pointer" onClick={nextStream}>
                    <Image src="./next2.svg" width={20} height={20} alt="Go to next stream button"/>
                </div>
                <div className="w-24">
                    <VolumeSlider onVolumeChange={handleVolumeChange} currentVolume={volume / 10} />
                </div>
            </div>
        </div>
    );
};

export default YouTubeLivestreamPlayer;