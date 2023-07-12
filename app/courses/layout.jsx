import NavButton from "@/app/components/navigation/NavButton";
import barChart from "@/public/assets/svg/bar-chart-square-02.svg?svgr";
import homeLine from "@/public/assets/svg/home-line.svg?svgr";
import { SiDiscord, SiGithub } from "react-icons/si";
import Link from "next/link";
import CatalogDropdown from "/app/components/navigation/CatalogDropdown";

export default function CourseLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="navigation-bar">
        <header className="text-xl font-semibold">
          <span className="text-primary-900">Hass</span> Pathways
        </header>
        <div className="flex gap-5 items-center">
          <ul className="flex items-start gap-4 px-4 self-stretch">
            <NavButton
              link="/courses"
              text="My Courses"
              Icon={homeLine}
              selected
            />
            <NavButton link="/pathways" text="My Pathways" Icon={barChart} />
          </ul>
          <CatalogDropdown />
        </div>
      </nav>
      <main className="grow p-8">{children}</main>
      <footer className="footer bg-gray-50">
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
