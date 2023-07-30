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
import React, {
  useState,
  Fragment,
  Suspense,
  useEffect,
  useReducer,
} from "react";
import CourseCard from "@/app/components/course/CourseCard";

const FilterAction = {
  ADD: "add",
  REM: "remove",
};

const SearchCourse = () => {
  const [filterState, filterDispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case FilterAction.ADD:
          console.log(action.payload.group);
          console.log(action.payload.value);

          return {
            ...state,
            [action.payload.group]: [
              ...state[action.payload.group],
              action.payload.value,
            ],
          };
        case FilterAction.REM:
          return {
            ...state,
            [action.payload.group]: state[action.payload.group].filter(
              (e) => e !== action.payload.value
            ),
          };
        default:
          return state;
      }
    },
    {
      filter: [],
      level: [],
      prefix: [],
      semester: [],
      prereq: [],
    }
  );

  const [searchString, setSearchString] = useState("");

  return (
    <>
      <header className="mb-4 md:mb-8">
        <h1 className="text-display-xs sm:text-display-sm md:text-display-md font-semibold mb-3">
          Find Courses
        </h1>
        <FilterSection
          filterState={filterState}
          filterDispatch={filterDispatch}
          setSearchString={setSearchString}
        />
      </header>
      <Suspense fallback={<div>Loading</div>}>
        <CourseList searchString={searchString} filterState={filterState} />
      </Suspense>
    </>
  );
};

const FilterSection = ({ filterState, filterDispatch, setSearchString }) => {
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
            onChange={(e) => setSearchString(e.target.value)}
          />
        </div>
      </label>
      <FilterDropdown
        filterState={filterState}
        filterDispatch={filterDispatch}
      />
    </div>
  );
};

const FilterDropdown = ({ filterState, filterDispatch }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <Fragment>
      <div className="dropdown">
        <div
          className={`w-11 h-11 flex justify-center items-center gap-2 cursor-pointer border-gray-300 border border-solid rounded-lg ${
            dropdownOpen && "bg-gray-100"
          }`}
          onClick={() => setDropdownOpen((open) => !open)}
        >
          <Filter className={dropdownOpen && "path-gray-700"} />
        </div>
        {dropdownOpen && (
          <div className="rounded-lg shadow-lg p-6 dropdown-choices w-max max-w-xs sm:max-w-sm md:max-w-md grid grid-flow-row gap-2">
            {courseFilters.map((section) => {
              return (
                <section key={section.apiName}>
                  <header className="text-md font-medium text-gray-900">
                    {section.displayName}
                  </header>
                  <div className="flex flex-wrap">
                    {section.options.map((choice) => {
                      const selected = filterState[section.apiName].includes(
                        choice.value
                      );
                      const actionType = selected
                        ? FilterAction.REM
                        : FilterAction.ADD;
                      return (
                        <div
                          className="px-3 py-2 basis-auto shrink-0"
                          key={choice.value}
                        >
                          <div
                            className="cursor-pointer flex gap-2 items-center"
                            onClick={() => {
                              filterDispatch({
                                type: actionType,
                                payload: {
                                  group: section.apiName,
                                  value: choice.value,
                                },
                              });
                            }}
                          >
                            {selected ? (
                              <CheckBoxChecked />
                            ) : (
                              <CheckBoxUnChecked />
                            )}
                            <label
                              className={`text-sm shrink-0 cursor-pointer ${
                                selected && "font-medium"
                              }`}
                            >
                              {choice.displayName}
                            </label>
                          </div>
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

const CourseList = ({ searchString, filterState }) => {
  const [courseData, setCourseData] = useState([]);
  useEffect(() => {
    const courseAPICall = setTimeout(async () => {
      console.log(
        `http://localhost:3000/api/course/search?${new URLSearchParams({
          searchString,
          ...filterState,
        })}`
      );
      const data = await fetch(
        `http://localhost:3000/api/course/search?${new URLSearchParams({
          searchString,
          ...filterState,
        })}`,
        {
          cache: "no-store",
          next: {
            revalidate: false,
          },
        }
      ).then((data) => data.json());
      setCourseData(data.res);
    }, 150);

    return () => clearTimeout(courseAPICall);
  }, [searchString, filterState]);

  return (
    <section className="grid grid-flow-row gap-3">
      {courseData.map((course) => {
        return (
          <CourseCard {...course} key={course.title + course.courseCode} />
        );
      })}
    </section>
  );
};
export default SearchCourse;
