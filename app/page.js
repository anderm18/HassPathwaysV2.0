import NavButton from "./components/navigation/NavButton";
import barChart from "/public/assets/svg/bar-chart-square-02.svg";
import homeLine from "/public/assets/svg/home-line.svg";
import { SiDiscord, SiGithub } from "react-icons/si";
import Link from "next/link";
import Image from "next/image";
import CatalogDropdown from "./components/navigation/CatalogDropdown";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <nav className="navigation-bar">
        <header className="text-xl font-semibold">
          <span className="text-primary-900">Hass</span> Pathways
        </header>
        <div className="flex gap-5 items-center">
          <ul className="flex items-start gap-4 px-4 self-stretch">
            <NavButton link="/courses" text="My Courses" icon={homeLine} />
            <NavButton link="/pathways" text="My Pathways" icon={barChart} />
          </ul>
          <CatalogDropdown />
        </div>
      </nav>
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
