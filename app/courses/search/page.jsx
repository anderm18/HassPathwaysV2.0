"use client";

import { SearchIcon } from "@/app/components/utils/Icon";
import ChevronUp from "@/public/assets/svg/chevron-up.svg?svgr";
import ChevronDown from "@/public/assets/svg/chevron-down.svg?svgr";
import {
  CheckBoxChecked,
  CheckBoxUnChecked,
} from "@/app/components/utils/Icon";
import Filter from "@/public/assets/svg/filter-funnel-02.svg?svgr";
import { courseFilters } from "@/public/data/courseFilter";
import React, { useState, Fragment } from "react";

const SearchCourse = () => {
  return (
    <>
      <header className="mb-4 md:mb-8">
        <h1 className="text-display-xs sm:text-display-sm md:text-display-md font-semibold mb-3">
          Find Courses
        </h1>
        <FilterSection />
      </header>
      <section className=""></section>
    </>
  );
};

const FilterSection = () => {
  return (
    <div className="filters flex justify-between gap-4">
      <label htmlFor="course-input" className="basis-0 grow">
        <div className="px-3.5 py-2.5 flex items-center gap-2 cursor-text border-gray-300 border border-solid rounded-lg input-wrapper">
          <SearchIcon />
          <input
            className="outline-none text-gray-500 text-md w-full basis-0 grow "
            type="text"
            name="course"
            id="course-input"
          />
        </div>
      </label>
      <FilterDropdown />
    </div>
  );
};

const FilterDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const filterState = {
    filter: {},
    level: {},
    prefix: {},
    semester: {},
  };

  return (
    <Fragment>
      <div className="dropdown">
        <div
          className="w-11 h-11 flex justify-center items-center gap-2 cursor-pointer border-gray-300 border border-solid rounded-lg"
          onClick={() => setDropdownOpen((open) => !open)}
        >
          <Filter />
        </div>
        {dropdownOpen && (
          <div className="rounded-lg shadow-lg p-3 dropdown-choices w-fit">
            {courseFilters.map((section) => {
              return (
                <section>
                  <header>{section.displayName}</header>
                  <div className="flex">
                    {section.options.map((choice) => {
                      return (
                        <div className="px-3 py-2 flex gap-2 items-center basis-auto">
                          <CheckBoxUnChecked />
                          <label className="text-xs">
                            {choice.displayName}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default SearchCourse;
