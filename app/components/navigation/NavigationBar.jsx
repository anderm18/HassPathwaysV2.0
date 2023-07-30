import React from "react";
import Link from "next/link";
import NavButton from "./NavButton";
import CatalogDropdown from "./CatalogDropdown";
import { BarChart, HomeLine } from "../utils/Icon";

const NavigationBar = (props) => {
  return (
    <nav
      className={`navigation-bar flex flex-col gap-y-3 sm:flex-row items-start md:items-center justify-between ${props.className}`}
    >
      <Link href="/">
        <header className="text-md lg:text-xl font-semibold">
          <span className="text-primary-900">Hass</span> Pathways
        </header>
      </Link>
      <div className="flex flex-col md:flex-row gap-y-3 gap-x-5 items-start sm:items-end md:items-center">
        <ul className="flex items-start gap-4 md:px-4 self-stretch">
          <NavButton
            link="/courses"
            text="My Courses"
            Icon={<HomeLine />}
            keyword="courses"
          />
          <NavButton
            link="/pathways"
            text="My Pathways"
            Icon={<BarChart />}
            keyword="pathways"
          />
        </ul>
        <CatalogDropdown />
      </div>
    </nav>
  );
};

export default NavigationBar;
