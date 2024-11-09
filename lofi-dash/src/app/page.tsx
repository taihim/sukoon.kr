import styles from './Page.module.css'
import WaveformVisualizer from "@/app/ui/waveform";

export default function Home() {
    return (
      <div className={styles.bg}>
          <div className={styles.vignette}>
              <div className={styles.scanlines}>
                  <h1 className="text-blue-500">yo</h1>
                  <a href={"counter"}>Lets go</a>
                  <div className="absolute bottom-0 left-4 flex box-border border-4 h-16 w-auto p-4 gap-4">
                      <div>
                          <WaveformVisualizer isPlaying={true}/>
                      </div>
                      <h1 className="text-white text-xl font-vt323">Mujik is the way</h1>
                  </div>
              </div>
          </div>
      </div>
  )
}
