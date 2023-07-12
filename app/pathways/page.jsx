"use client";
import React, { useReducer } from "react";
import pathwaysCategories from "@/public/data/pathwaysCategories";
import CheckBoxBase from "@/public/assets/svg/checkbox_base.svg?svgr";

const pathwaysLists = [
  pathwaysCategories.ART,
  pathwaysCategories.COGSCI,
  pathwaysCategories.COMM,
  pathwaysCategories.ECON,
  pathwaysCategories.INTER,
  pathwaysCategories.LANG,
  pathwaysCategories.MAJOR,
  pathwaysCategories.STS,
];

const MyPathways = () => {
  const [filterState, dispatchFilter] = useReducer((state, action) => {
    const rep = 1 << action.payload;
    console.log(action.payload);
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
        <section className="flex gap-4">
          <div className="flex button-group">
            <div>Bookmarked</div>
            <div>Matched</div>
          </div>
          <div className="flex button-group">
            <div
              className={`checkbox-group ${
                filterState === 255 ? "checked" : ""
              }`}
              onClick={() => dispatchFilter({ payload: 255 })}
            >
              {/* <input type="checkbox" name="course-filter" /> */}
              {/* <Image src={checkBoxBase} /> */}
              <CheckBoxBase />
              <label>All</label>
            </div>
            {pathwaysLists.map((pathway, i) => {
              return (
                <div
                  className={`checkbox-group ${
                    activeFilter(filterState, i) ? "checked" : ""
                  }`}
                  key={pathway}
                  onClick={() => dispatchFilter({ payload: i })}
                >
                  {/* <input type="checkbox" name="course-filter" /> */}
                  <label>{pathway}</label>
                </div>
              );
            })}
          </div>
        </section>
      </header>
    </>
  );
};

export default MyPathways;
