'use client'

import { useState, useRef, useEffect } from 'react';
import styles from './StickyNote.module.css';

interface StickyNoteProps {
    initialX?: number;
    initialY?: number;
    color?: string;
    content?: string;
}

const StickyNote: React.FC<StickyNoteProps> = ({
    initialX = 100,
    initialY = 100,
    color = '#feff9c',
    content = 'Write your note here...'
}) => {
    const [position, setPosition] = useState({ x: initialX, y: initialY });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [noteContent, setNoteContent] = useState(content);
    const noteRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (noteRef.current) {
            const rect = noteRef.current.getBoundingClientRect();
            setDragOffset({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
            setIsDragging(true);
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - dragOffset.x,
                y: e.clientY - dragOffset.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    return (
        <div
            ref={noteRef}
            className={styles.stickyNote}
            style={{
                backgroundColor: color,
                left: `${position.x}px`,
                top: `${position.y}px`,
                cursor: isDragging ? 'grabbing' : 'grab'
            }}
        >
            <div 
                className={styles.dragHandle}
                onMouseDown={handleMouseDown}
            />
            <textarea
                className={styles.noteContent}
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                spellCheck="false"
            />
        </div>
    );
};

export default StickyNote; 