
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <div className="h-[100vh]">
        Home Page
        <Image src="/wallpaper.png" width={100} height={100}></Image>
      </div>
    </div>
  )
}
