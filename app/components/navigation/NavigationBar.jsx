import React from "react";
import Link from "next/link";
import NavButton from "./NavButton";
import CatalogDropdown from "./CatalogDropdown";
import { BarChart, HomeLine } from "../utils/Icon";

const NavigationBar = (props) => {
  return (
    <nav className={`navigation-bar ${props.className}`}>
      <Link href="/">
        <header className="text-xl font-semibold">
          <span className="text-primary-900">Hass</span> Pathways
        </header>
      </Link>
      <div className="flex gap-5 items-center">
        <ul className="flex items-start gap-4 px-4 self-stretch">
          <NavButton
            link="/courses"
            text="My Courses"
            Icon={<HomeLine />}
            keyword="course"
          />
          <NavButton
            link="/pathways"
            text="My Pathways"
            Icon={<BarChart />}
            keyword="pathway"
          />
        </ul>
        <CatalogDropdown />
      </div>
    </nav>
  );
};

export default NavigationBar;
