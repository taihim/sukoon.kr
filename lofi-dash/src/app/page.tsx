import MusicPlayer from "@/app/ui/musicPlayer";

export default function Home() {
  return (
      <div>
        <h1 className="text-blue-500">yo</h1>
        <a href={"counter"}>Lets go</a>
        <div
            className="relative w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-black"
        />
          <MusicPlayer />
      </div>
  )
}
