import { SiDiscord, SiGithub } from "react-icons/si";
import Link from "next/link";
import Image from "next/image";
import NavigationBar from "./components/navigation/NavigationBar";
import Footer from "./components/navigation/Footer";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <NavigationBar />
      <main className="flex-1 flex flex-col-reverse md:flex-row px-8 justify-between gap-12 items-center">
        <section className="grow-[1.5] basis-0">
          <h1 className="text-display-xs sm:text-display-sm md:text-display-md font-semibold">
            Welcome to HASS Pathways!
          </h1>
          <h3 className="text-sm sm:text-md md:text-lg">
            Here you can explore the different pathways RPI has to offer. To get
            started choose from on of the options below and start exploring your
            options!
          </h3>
        </section>
        <div className="block grow basis-0 max-w-lg">
          <Image
            src="/../public/assets/png/home.png"
            alt="home"
            width={480}
            height={412}
          ></Image>
        </div>
      </main>
      <Footer />
    </div>
  );
}
