import { SiDiscord, SiGithub } from "react-icons/si";
import Link from "next/link";
import Image from "next/image";
import NavigationBar from "./components/navigation/NavigationBar";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <NavigationBar />
      <main className="flex-1 flex px-8 justify-between gap-12 items-center">
        <section className="grow-[1.5] basis-0">
          <h1 className="text-display-md font-semibold">
            Welcome to HASS Pathways!
          </h1>
          <h3 className="text-lg">
            Here you can explore the different pathways RPI has to offer. To get
            started choose from on of the options below and start exploring your
            options!
          </h3>
        </section>
        <div className="block grow basis-0">
          <Image
            src="/../public/assets/png/home.png"
            alt="home"
            width={480}
            height={412}
          ></Image>
        </div>
      </main>
      <footer className="footer">
        <div className="flex gap-4">
          <SiDiscord className="icon" />
          <SiGithub className="icon" />
        </div>
        <div className="flex gap-12 text-md">
          <Link href="/faq">FAQ</Link>
          <Link href="/courses">My Courses</Link>
          <Link href="/pathways">My Pathways</Link>
        </div>
        <div className="text-md">&copy; 2023 Hass Pathways</div>
      </footer>
    </div>
  );
}
