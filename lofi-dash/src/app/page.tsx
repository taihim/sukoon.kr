import styles from './Page.module.css'
import YouTubeLivestreamPlayer from "@/app/ui/ytStreamPlayer/ytPlayer";

export default function Home() {
    return (
    <div className={styles.bg}>
        <div className={styles.darkOverlay}></div> 
        <div className={styles.vignette}></div>
        <div className={styles.scanlines}></div>
        <div className={styles.staticOverlay}></div>
        <div className={`${styles.playerContainer} absolute top-0 left-4 flex box-border h-32 w-auto p-6 gap-4`}>
            <YouTubeLivestreamPlayer/>
        </div>
    </div>
    )
}
