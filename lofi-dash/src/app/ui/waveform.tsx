// @ts-expect-error
function WaveformVisualizer({isPlaying}) {
    const bars = 4; // Number of bars in the visualizer

    return (
        <div className="flex items-end gap-0.5 h-5 w-6">
            {[...Array(bars)].map((_, i) => (
                <div
                    key={i}
                    className={`w-1 bg-white transition-all duration-200 ${
                        isPlaying ? 'h-3' : 'h-0'
                    }`}
                    style={{
                        animationName: isPlaying ? 'wave' : 'none',
                        animationDuration: `${0.8 + Math.random() * 0.8}s`,  // Shorter duration for quicker movement
                        animationTimingFunction: 'steps(4, end)',  // "Steps" for discrete jumps
                        animationIterationCount: 'infinite',
                        animationDelay: `${i * 0.1}s`, // Stagger the delays for each bar
                        transformOrigin: 'bottom', // Ensures scaling happens upwards

                    }}
                />
            ))}
        </div>
    );
}

export default WaveformVisualizer