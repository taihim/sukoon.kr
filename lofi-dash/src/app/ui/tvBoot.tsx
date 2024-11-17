'use client'

import { useState, useEffect } from 'react';
import styles from './TVBoot.module.css';

interface TVBootProps {
    onBootComplete: () => void;
}

const TVBoot: React.FC<TVBootProps> = ({ onBootComplete }) => {
    const [bootPhase, setBootPhase] = useState(0);

    useEffect(() => {
        const bootSequence = async () => {
            // Initial black screen
            await new Promise(resolve => setTimeout(resolve, 500));
            setBootPhase(1);
            
            // White line and content expand
            await new Promise(resolve => setTimeout(resolve, 1200));
            onBootComplete();
        };

        bootSequence();
    }, [onBootComplete]);

    return (
        <div className={`${styles.tvBoot} ${styles[`phase${bootPhase}`]}`}>
            <div className={styles.whiteLine} />
        </div>
    );
};

export default TVBoot;