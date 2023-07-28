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
import React, { useState, Fragment, Suspense, useEffect } from "react";
import CourseCard from "@/app/components/course/CourseCard";

const SearchCourse = () => {
  return (
    <>
      <header className="mb-4 md:mb-8">
        <h1 className="text-display-xs sm:text-display-sm md:text-display-md font-semibold mb-3">
          Find Courses
        </h1>
        <FilterSection />
      </header>
      <Suspense fallback={<div>Loading</div>}>
        <CourseList />
      </Suspense>
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
            placeholder="Search"
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
          <div className="rounded-lg shadow-lg p-6 dropdown-choices w-max max-w-xs sm:max-w-sm md:max-w-md grid grid-flow-row gap-2">
            {courseFilters.map((section) => {
              return (
                <section>
                  <header className="text-md font-medium text-gray-900">
                    {section.displayName}
                  </header>
                  <div className="flex flex-wrap">
                    {section.options.map((choice) => {
                      return (
                        <div className="px-3 py-2 flex gap-2 items-center basis-auto shrink-0">
                          <CheckBoxUnChecked />
                          <label className="text-xs shrink-0">
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

const flattenFilter = (filter) => {
  // TODO: Talk with Will about the format
  return {};
};

const CourseList = ({ name, filter }) => {
  // const [courseData, setCourseDate] = useState([]);

  // useEffect(() => {
  //   const courseAPICall = setTimeout(async () => {
  //     const res = await fetch(
  //       `http://localhost:3000/api/course/search?${new URLSearchParams({
  //         searchString: name,
  //         ...flattenFilter(filter),
  //       })}`,
  //       {
  //         cache: "no-store",
  //         next: {
  //           revalidate: false,
  //         },
  //       }
  //     ).then((data) => data.json());
  //     console.log(res);
  //   }, 500);

  //   return () => clearTimeout(courseAPICall);
  // });

  const courseData = [
    {
      title: "Introduction to Cognitive Science",
      courseCode: "COGS-2120",
      tag: [],
    },
    {
      title: "Introduction to Linguistics",
      courseCode: "COGS-2340",
      tag: [],
    },
    {
      title: "Introduction to Cognitive Neuroscience",
      courseCode: "COGS-4330",
      tag: [],
    },
    {
      title: "Introduction to Graphic Design",
      courseCode: "COMM-2660",
      tag: ["Communication Intensive"],
    },
    {
      title: "Introductory Economics",
      courseCode: "ECON-1200",
      tag: ["Introductory Level Course"],
    },
    {
      title: "Introduction to Game Design",
      courseCode: "GSAS-2510",
      tag: [],
    },
    {
      title: "Introduction to Game Storytelling",
      courseCode: "GSAS-2520",
      tag: ["Communication Intensive"],
    },
    {
      title: "Introduction to Game Programming",
      courseCode: "GSAS-2540",
      tag: [],
    },
    {
      title: "Introduction to Information Technology and Web Science",
      courseCode: "ITWS-1100",
      tag: ["Communication Intensive"],
    },
  ];

  return (
    <section className="grid grid-flow-row gap-3">
      {courseData.map((course) => {
        return <CourseCard {...course} />;
      })}
    </section>
  );
};
export default SearchCourse;
