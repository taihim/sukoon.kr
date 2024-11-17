import styles from './Page.module.css'
import YouTubeLivestreamPlayer from "@/app/ui/ytPlayer";
import StickyNote from '@/app/ui/stickyNote';


export default function Home() {
    return (
    <div className={styles.bg}>
        <div className={styles.show}>
            <div className={styles.darkOverlay}></div> 
            <div className={styles.vignette}></div>
            <div className={styles.scanlines}></div>
            <div className={styles.staticOverlay}></div>
        </div>
        <a href={"counter"}>Counter</a>
        <div className={`${styles.playerContainer} absolute top-0 left-4 flex box-border h-32 w-auto p-6 gap-4`}>
            <YouTubeLivestreamPlayer videoId="jfKfPfyJRdk"/>
        </div>
    </div>
    )
}
