"use client";

import React, {
  useState,
  useReducer,
  useDeferredValue,
  useEffect,
} from "react";
import PathwayCard from "@/app/components/pathway/PathwayCard";
import { useAppContext } from "@/app/contexts/appContext/AppProvider";
import {
  SearchInput,
  FilterCheckBox,
} from "@/app/components/pathway/FilterComponent";
import { IpathwayData } from "@/public/data/staticInterface";
import { IPathwaySchema } from "@/public/data/dataInterface";

const getFilterList: (
  pathwayCategory: IpathwayData[],
  filterMask: number
) => string = (pathwayCategory, filterMask) => {
  const filterList = pathwayCategory
    .filter((_, i) => {
      return (1 << i) & filterMask;
    })
    .reduce((acc, pathwayCategory) => {
      if (acc === "") return pathwayCategory.value;
      return acc + "," + pathwayCategory.value;
    }, "");
  return filterList === null ? "" : filterList;
};

const SearchCourse = () => {
  const { pathwaysCategories, catalog_year } = useAppContext();

  const MAX_FILTER = (1 << pathwaysCategories.length) - 1;
  // Determine the filter
  const [filterState, dispatchFilter] = useReducer(
    (
      state: number,
      action: {
        payload: number;
      }
    ) => {
      const rep = 1 << action.payload;
      if (action.payload === MAX_FILTER) {
        if (state === action.payload) return 0;
        else return MAX_FILTER;
      }
      if (state & rep) state -= rep;
      else state += rep;
      return state;
    },
    0
  );
  const activeFilter: (state: number, index: number) => boolean = (
    state,
    index
  ) => (state & (1 << index)) !== 0;

  const [searchString, setSearchString] = useState("");
  const [resultPathway, setResultPathway] = useState<IPathwaySchema[]>([
    {
      title: "Visual and Media Arts",
      department: "Arts",
      courses: [
        {
          title: "abc",
          courseCode: "ARTS-1050",
          tag: [],
        },
        {
          title: "jir",
          courseCode: "ARTS-1200",
          tag: [],
        },
        {
          title: "kri",
          courseCode: "ARTS-2200",
          tag: [],
        },
        {
          title: ",o",
          courseCode: "ARTS-2090",
          tag: [],
        },
        {
          title: "inu",
          courseCode: "ARTS-2210",
          tag: [],
        },
      ],
    },
  ]);

  const deferSearchString = useDeferredValue(searchString);
  const deferFilterState = useDeferredValue(filterState);
  useEffect(() => {
    const apiController = new AbortController();

    // console.log(getFilterList(pathwaysCategories, deferFilterState));
    // console.log(
    //   `http://localhost:3000/api/pathway/search?${new URLSearchParams({
    //     searchString: deferSearchString,
    //     department: getFilterList(pathwaysCategories, deferFilterState),
    //     catalogYear: catalog_year == -1 ? "2023" : catalog_year.toString(),
    //   })}`
    // );

    fetch(
      `http://localhost:3000/api/pathway/search?${new URLSearchParams({
        searchString: deferSearchString,
        department: getFilterList(pathwaysCategories, deferFilterState),
        // this is a temporary fix, maybe use a spinner instead when waiting for catalog_year (default value is -1, invalid in API)
        catalogYear: catalog_year == -1 ? "2023" : catalog_year.toString(),
      })}`,
      {
        signal: apiController.signal,
        cache: "no-store",
        next: {
          revalidate: false,
        },
      }
    )
      .then((data) => data.json())
      .then((data) => {
        setResultPathway(data);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        console.error("Fetching Error: ", err);
      });

    return () => apiController.abort("Cancelled");
  }, [deferFilterState, deferSearchString]);

  return (
    <>
      <header>
        <h1 className="title mb-3">Find Pathways</h1>
      </header>
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
        <div className="w-full fold:w-[320px]">
          <SearchInput
            setSearchString={setSearchString}
            searchString={searchString}
          />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold lg:hidden">Department</h3>
          <div className="flex button-group flex-wrap">
            <FilterCheckBox
              clickCallback={() => dispatchFilter({ payload: MAX_FILTER })}
              label="All"
              checked={filterState === MAX_FILTER}
            />
            {pathwaysCategories.map((pathway, i) => {
              return (
                <FilterCheckBox
                  checked={activeFilter(filterState, i)}
                  key={pathway.value}
                  label={pathway.display}
                  clickCallback={() => dispatchFilter({ payload: i })}
                />
              );
            })}
          </div>
        </div>
      </div>
      <section className="py-8 flex flex-wrap gap-x-10 gap-y-4 justify-around md:justify-start">
        {resultPathway.map((pathway, i) => {
          return <PathwayCard {...pathway} key={i} />;
        })}
      </section>
    </>
  );
};

export default SearchCourse;
