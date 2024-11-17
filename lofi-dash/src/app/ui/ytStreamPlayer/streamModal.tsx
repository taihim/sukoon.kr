import { STREAMS } from '@/app/config/streams';
import Image from 'next/image';

interface StreamModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectStream: (index: number) => void;
    currentStreamIndex: number;
}

export default function StreamModal({ isOpen, onClose, onSelectStream, currentStreamIndex }: StreamModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-zinc-900 rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-white font-vt323 text-xl">Select Stream</h2>
                    <button onClick={onClose} className="text-white hover:text-gray-300">
                        ✕
                    </button>
                </div>
                <div className="space-y-2">
                    {STREAMS.map((stream, index) => (
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
            </div>
        </div>
    );
}