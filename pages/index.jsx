
import home_image from "../public/home_image.jpg"
import Image from 'next/image'
export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <div className="md:h-[80vh] overflow-hidden">
        <Image src={home_image}/>
      </div>
      <div className="flex flex-col p-4 gap-2 items-center justify-center">
        <h1 className="text-2xl font-bold">About us</h1>
        <p className="md:px-32 px-4">
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
        </p>
        <h1 className="text-2xl font-bold">Our vision</h1>
        <p className="md:px-32 px-4">
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
        </p>
      </div>
      
    </div>
  )
}