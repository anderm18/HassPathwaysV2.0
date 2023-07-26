"use client";
import React, { useState, useReducer } from "react";
import pathwaysCategories from "@/public/data/pathwaysCategories";
import { CheckBoxChecked, CheckBoxUnChecked } from "../components/utils/Icon";
import PathwayCard from "../components/pathway/PathwayCard";

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

  // Determine the filter
  const [filterState, dispatchFilter] = useReducer((state, action) => {
    const rep = 1 << action.payload;
    if (action.payload === 255) {
      if (state === action.payload) return 0;
      else return 255;
    }
    if (state & rep) state -= rep;
    else state += rep;
    return state;
  }, 0);
  const activeFilter = (state, index) => state & (1 << index);

  return (
    <>
      <header className="flex flex-col gap-3">
        <h1 className="text-display-md font-semibold">My Pathways</h1>
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
          <div className="flex button-group flex-wrap">
            <FilterCheckBox
              clickCallback={() => dispatchFilter({ payload: 255 })}
              label="All"
              checked={filterState === 255}
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
      className={`checkbox-group ${checked ? "checked !bg-primary-50" : ""}`}
      onClick={clickCallback}
    >
      {label}
    </button>
  );
};
export default MyPathways;
