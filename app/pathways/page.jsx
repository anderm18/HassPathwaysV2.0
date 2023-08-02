"use client";
import React, { useState, useReducer } from "react";
import pathwaysCategories from "@/public/data/pathwaysCategories";
import { CheckBoxChecked, CheckBoxUnChecked } from "../components/utils/Icon";
import PathwayCard from "../components/pathway/PathwayCard";
import Link from "next/link";
import ChevronRight from "@/public/assets/svg/chevron-right.svg?svgr";

const pathwaysLists = [
  pathwaysCategories.ART,
  pathwaysCategories.COGSCI,
  pathwaysCategories.COMM,
  pathwaysCategories.ECON,
  pathwaysCategories.STS,
  pathwaysCategories.INTER,
];

const pathwayList = [
  {
    pathwayName: "Gender, Race, Sexuality, Ethnicity, and Social Change",
    category: "Inter",
    tooltip: "",
    bookmark: true,
    courses: [
      {
        status: "none",
        name: "None",
      },
      {
        status: "none",
        name: "None",
      },
      {
        status: "none",
        name: "None",
      },
    ],
  },
  {
    pathwayName: "Gender, Race, Sexuality, Ethnicity, and Social Change",
    category: "Major Restricted",
    tooltip: "",
    bookmark: false,
    courses: [
      {
        status: "none",
        name: "None",
      },
      {
        status: "none",
        name: "None",
      },
      {
        status: "none",
        name: "None",
      },
    ],
  },
];

const MyPathways = () => {
  // Determine the mode of pathway card
  const [bookmarkedState, setbookmarkedState] = useState(true);

  const MAX_FILTER = (1 << pathwaysLists.length) - 1;
  // Determine the filter
  const [filterState, dispatchFilter] = useReducer((state, action) => {
    const rep = 1 << action.payload;
    if (action.payload === MAX_FILTER) {
      if (state === action.payload) return 0;
      else return MAX_FILTER;
    }
    if (state & rep) state -= rep;
    else state += rep;
    return state;
  }, 0);
  const activeFilter = (state, index) => state & (1 << index);

  return (
    <>
      <header className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-8">
          <h1 className="title">My Pathways</h1>
          <Link href={"/pathways/search"}>
            <span className="flex text-primary-700 gap-2 text-sm font-semibold">
              Explore Pathways <ChevronRight />
            </span>
          </Link>
        </div>
        <section className="flex flex-col lg:flex-row gap-4">
          <div className="flex button-group">
            <ModeRadioButton
              label="Bookmarked"
              checked={bookmarkedState}
              clickCallback={() => setbookmarkedState(true)}
            />
            <ModeRadioButton
              label="Matched"
              checked={!bookmarkedState}
              clickCallback={() => setbookmarkedState(false)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold md:hidden">Department</h3>
            <div className="flex button-group flex-wrap">
              <FilterCheckBox
                clickCallback={() => dispatchFilter({ payload: MAX_FILTER })}
                label="All"
                checked={filterState === MAX_FILTER}
              />
              {pathwaysLists.map((pathway, i) => {
                return (
                  <FilterCheckBox
                    checked={activeFilter(filterState, i)}
                    key={pathway}
                    label={pathway}
                    clickCallback={() => dispatchFilter({ payload: i })}
                  />
                );
              })}
            </div>
          </div>
        </section>
      </header>
      <section className="py-8 flex flex-wrap gap-x-10 gap-y-4 justify-around md:justify-start">
        {pathwayList.map((pathway, i) => {
          return <PathwayCard {...pathway} key={pathway.pathwayName + i} />;
        })}
      </section>
    </>
  );
};

const FilterCheckBox = ({ checked, label, clickCallback }) => {
  return (
    <button
      className={`checkbox-group ${checked ? "checked" : ""}`}
      onClick={clickCallback}
    >
      {checked ? <CheckBoxChecked /> : <CheckBoxUnChecked />}
      <label>{label}</label>
    </button>
  );
};

const ModeRadioButton = ({ checked, label, clickCallback }) => {
  return (
    <button
      className={`checkbox-group !border-solid ${
        checked ? "checked !bg-primary-50" : ""
      }`}
      onClick={clickCallback}
    >
      {label}
    </button>
  );
};
export default MyPathways;
