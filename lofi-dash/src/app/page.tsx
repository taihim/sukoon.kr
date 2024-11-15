import styles from './Page.module.css'
import YouTubeLivestreamPlayer from "@/app/ui/ytPlayer";


const STREAMS = [
    { id: 'jfKfPfyJRdk', title: 'lofi hip hop radio 📚 beats to relax/study to' },
    { id: '4xDzrJKXOOY', title: 'synthwave radio 🌊 - beats to chill/game to' },
    // Add more streams as needed
];

export default function Home() {

    // const [currentStreamIndex, setCurrentStreamIndex] = useState<number>(0);


    return (
      <div className={styles.bg}>
          <div className={styles.scanlines}>
              <div className={styles.vignette}>
                  <h1 className="text-blue-500">yo</h1>
                  <a href={"counter"}>Lets go</a>
                  <div className="absolute bottom-0 left-4 flex box-border border-4 h-32 w-auto p-6 gap-4">
                      <YouTubeLivestreamPlayer videoId="jfKfPfyJRdk"/>
                  </div>
              </div>
          </div>
      </div>
    )
}
