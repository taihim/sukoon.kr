import { useState, useEffect } from 'react';
import { STREAMS, type Stream } from '@/app/config/streams';
import Image from 'next/image';

interface StreamModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectStream: (index: number) => void;
    currentStreamIndex: number;
}

export default function StreamModal({ isOpen, onClose, onSelectStream, currentStreamIndex }: StreamModalProps) {
    const [showAddForm, setShowAddForm] = useState(false);
    const [newStreamUrl, setNewStreamUrl] = useState('');
    const [newStreamName, setNewStreamName] = useState('');
    const [error, setError] = useState('');
    const [customStreams, setCustomStreams] = useState<Stream[]>([]);

    // Use useEffect to access localStorage after component mounts
    useEffect(() => {
        const stored = localStorage.getItem('customStreams');
        setCustomStreams(stored ? JSON.parse(stored) : []);
    }, []);

    const allStreams = [...STREAMS, ...customStreams];


    const extractYouTubeId = (url: string) => {
        const regex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regex);
        return match?.[2];
    };

    const handleAddStream = () => {
        const videoId = extractYouTubeId(newStreamUrl);
        
        if (!videoId) {
            setError('Invalid YouTube URL');
            return;
        }

        if (!newStreamName.trim()) {
            setError('Please enter a stream name');
            return;
        }

        const newStream: Stream = {
            id: videoId,
            title: newStreamName.trim(),
        };

        const updatedStreams = [...customStreams, newStream];
        localStorage.setItem('customStreams', JSON.stringify(updatedStreams));
        setCustomStreams(updatedStreams);
        
        setNewStreamUrl('');
        setNewStreamName('');
        setShowAddForm(false);
        setError('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-zinc-900 rounded-lg p-6 max-w-md w-full max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-800">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-white font-vt323 text-xl">Select Stream</h2>
                    <button onClick={onClose} className="text-white hover:text-gray-300">
                        ✕
                    </button>
                </div>

                {!showAddForm ? (
                    <>
                        <div className="space-y-2 mb-4">
                            {allStreams.map((stream, index) => (
                                <div 
                                    key={stream.id}
                                    onClick={() => {
                                        onSelectStream(index);
                                        onClose();
                                    }}
                                    className={`flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-zinc-800 ${
                                        currentStreamIndex === index ? 'bg-zinc-800' : ''
                                    }`}
                                >
                                    <div className="relative w-16 h-16 rounded overflow-hidden bg-black">
                                        <Image 
                                            src={`https://img.youtube.com/vi/${stream.id}/mqdefault.jpg`}
                                            alt={stream.title}
                                            fill
                                            className="object-cover object-center scale-150"
                                            sizes="64px"
                                        />
                                    </div>
                                    <span className="text-white font-vt323">{stream.title}</span>
                                </div>
                            ))}
                        </div>
                        <button 
                            onClick={() => setShowAddForm(true)}
                            className="w-full py-2 px-4 bg-zinc-800 text-white rounded hover:bg-zinc-700 transition-colors font-vt323"
                        >
                            + Add New Stream
                        </button>
                    </>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-white font-vt323 mb-2">Stream Name</label>
                            <input
                                type="text"
                                value={newStreamName}
                                onChange={(e) => setNewStreamName(e.target.value)}
                                className="w-full p-2 bg-zinc-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-zinc-600"
                                placeholder="Enter stream name"
                            />
                        </div>
                        <div>
                            <label className="block text-white font-vt323 mb-2">YouTube URL</label>
                            <input
                                type="text"
                                value={newStreamUrl}
                                onChange={(e) => setNewStreamUrl(e.target.value)}
                                className="w-full p-2 bg-zinc-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-zinc-600"
                                placeholder="https://youtube.com/watch?v=..."
                            />
                        </div>
                        {error && <p className="text-red-500 font-vt323">{error}</p>}
                        <div className="flex gap-2">
                            <button 
                                onClick={handleAddStream}
                                className="flex-1 py-2 px-4 bg-zinc-800 text-white rounded hover:bg-zinc-700 transition-colors font-vt323"
                            >
                                Add Stream
                            </button>
                            <button 
                                onClick={() => {
                                    setShowAddForm(false);
                                    setError('');
                                    setNewStreamUrl('');
                                    setNewStreamName('');
                                }}
                                className="flex-1 py-2 px-4 bg-zinc-700 text-white rounded hover:bg-zinc-600 transition-colors font-vt323"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}