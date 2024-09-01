import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa6";
import { RiNotionFill } from "react-icons/ri";
import Image from "next/image";
import TeamCarousel from "@/components/custom/TeamCarousel";

export default function Home() {
  return (
    <>
      <main>
          <section id="hero" className="px-4 lg:px-20 py-[100px] lg:py-[140px] text-center space-y-4 lg:space-y-6">
            <h1 className="text-[24px] lg:text-[40px] font-bold">Weejet</h1>
            <p className="text-[16px] lg:text-[20px] lg:w-[400px] mx-auto">
              An open-source way of building and sharing Notion Widgets 
            </p>
            <div className="flex items-center justify-center space-x-4 lg:space-x-6">
              <Button className="lg:hidden">Let&apos;s Go</Button>
              <Button className="hidden lg:block" size={"lg"}><span className="lg:text-[18px]">Let&apos;s Go</span></Button>
              <a href="https://github.com/JohnsonChin1009/Weejet" target="_blank"><FaGithub className="text-[28px] lg:text-[32px] hover:text-gray-700"/></a>
            </div>
          </section>

          <section id="backstory" className="px-4 lg:px-20 py-10 lg:py-20">
            <h1 className="text-[20px] lg:text-[36px] font-bold">A little backstory...</h1>
            <div className="py-5 flex flex-col justify-center items-center lg:flex-row lg:justify-between">
              <div className="space-y-4 lg:space-y-10 mb-4 lg:w-[600px] lg:text-[20px]">
                <p>
                  We love using <a href="https://www.notion.so/" target="_blank"><RiNotionFill className="text-[28px] inline-block"/></a>. But the problem is that we&apos;re always limited by widgets that are available. If you want customized widgets you often have to opt for paid services.
                </p>
                <p>
                  Users also face issues in creating their own widgets. Hence the birth of Weejet, an open-source way of building and sharing Notion Widgets.
                </p>
              </div>
              <div className="h-[240px] w-[240px] lg:w-[400px] lg:h-[400px] relative">
                <Image 
                  src="https://notioly.com/wp-content/uploads/2024/03/364.Projecting.png"
                  alt="Globe with three people"
                  fill
                  objectFit="contain"
                  className="object-contain"
                />
              </div>
            </div>
          </section>

          <section id="about" className="px-4 lg:px-10 py-10 lg:py-20 flex flex-col text-center justify-center items-center">
            <h1 className="text-[20px] lg:text-[36px] font-bold">Hence Weejet!</h1>
            <p className="py-4 lg:py-6 lg:text-[20px]">A platform where people can build and request widgets, share them with friends and family! <span className="inline font-bold">FREE!</span></p>
            <div className="h-[240px] w-[240px] lg:h-[360px] lg:w-[360px] relative">
              <Image 
                src="https://notioly.com/wp-content/uploads/2023/09/290.Globalization.png"
                alt="Globe with three people"
                fill
                objectFit="contain"
                className="object-contain"
              />
            </div>
          </section>
          
          <section> {/* Marque from MagicUI to display widgets built */}

          </section>
          
          <section id="team" className="px-4 lg:px-10 lg:py-20 py-10 text-center">
            <h1 className="text-[20px] lg:text-[36px] font-bold">Peeps behind Weejet</h1>
            <p className="py-4 lg:py-6 lg:text-[20px]">Weejet wouldn&apos;t be possible without them!</p>
            <TeamCarousel />
          </section>
      </main>
    </>
  )
}