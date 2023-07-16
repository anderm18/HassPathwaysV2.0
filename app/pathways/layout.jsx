import NavButton from "@/app/components/navigation/NavButton";
import barChart from "@/public/assets/svg/bar-chart-square-02.svg?svgr";
import homeLine from "@/public/assets/svg/home-line.svg?svgr";
import { SiDiscord, SiGithub } from "react-icons/si";
import Link from "next/link";
import CatalogDropdown from "/app/components/navigation/CatalogDropdown";
import NavigationBar from "../components/navigation/NavigationBar";

export default function CourseLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar />
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
