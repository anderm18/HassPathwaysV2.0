"use client";

import BreadCrumb from "@/app/components/navigation/Breadcrumb";
import {
  ICourseDescriptionSchema,
  ISemesterData,
} from "@/public/data/dataInterface";
import { TemplateContext } from "next/dist/shared/lib/app-router-context";
// import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";
import React, { Fragment, useDeferredValue, useEffect, useState } from "react";

/**
 * Interface for course code
 */
type ICourseCode = {
  params: {
    courseCode: string;
  };
};

// Empty course object template
const emptyCourse: ICourseDescriptionSchema = {
  title: "course not found",
  description: "des not found",
  prereqs: undefined,
  term: [{ year: "2023" }],
};

/**
 * React functional component for CoursePage.
 * Fetches and displays course information based on the courseCode from params.
 * 
 * @param data - Object containing course code in params.
 */
const CoursePage: React.FC<ICourseCode> = (data) => {
  const { courseCode } = data.params;

  // Here I use use state state to fetch data and repace the template data:
  const [courseDescription, setCourseDescription] =
    useState<ICourseDescriptionSchema>(emptyCourse);

  useEffect(() => {
    const apiController = new AbortController();

    fetch(
      `http://localhost:3000/api/course/search?${new URLSearchParams({
        searchString: courseCode,
        // maybe separate the course prefix from the course code for course prefix
      })}`,
      {
        signal: apiController.signal,
        cache: "no-store",
      }
    )
      .then((data) => data.json())
      .then((data) => data[0])
      .then((data) => {
        // Update state with fetched data
        console.log("Fetched data: ", data);
        console.log("Fetched data prereqs", data.prereqs);
        setCourseDescription((prev) => {
          return {
            ...prev,
            title: data.title,
            description: data.description,
            prereqs: data.prereqs,
          };
        });
      })
      .catch((error) => {
        // Handle fetch error
        console.error(error);
      });
    return () => {
      apiController.abort();
    };
  }, [courseCode]);

  // TODO: Still need the semester offered data being updated.
  // TODO: Need to Parse Prereqs for better display (nested, and, or)
  // Test the new route, see if it can fetch the new code: 


  useEffect(() => {
    console.log("Current courseDescription:", courseDescription);
  }, [courseDescription]);

  const term = courseDescription?.term ?? "Unfound Terms";
  const courseName = courseDescription?.title ?? "Unfound Course";
  const description =
    courseDescription?.description ?? "Unfound Course description";
  const prereqs = courseDescription?.prereqs ?? "Unfound Prereqs";

  return (
    <Fragment>
      <header className="description-header">
        <BreadCrumb
          path={[
            { display: "Courses", link: "/courses/search" },
            { display: courseCode, link: "" },
          ]}
        />
        <h1>
          {courseDescription.title} ({courseCode})
        </h1>
      </header>
      <section className="description-section">
        <header>
          <h3>Course Description</h3>
        </header>
        <p>{courseDescription.description}</p>
      </section>
      <section className="description-section">
        <header>
          <h3>Prerequisites</h3>
        </header>
        {!courseDescription.prereqs && <p>None</p>}
      </section>
      <section className="description-section">
        <header>
          <h3>Semester Offered</h3>
        </header>
        <section className="hidden sm:grid grid-table grid-cols-4 max-w-[960px] overflow-clip rounded-xl border-solid border border-gray-200 bg-white ut-shadow-sm">
          <div className="table-header">Year</div>
          <div className="table-header">Spring</div>
          <div className="table-header">Summer</div>
          <div className="table-header">Fall</div>
          {/* {term.map((t) => {
            return (
              <Fragment key={t.year}>
                <header className="font-medium">{t.year}</header>
                <TableData data={t.spring} />
                <TableData data={t.summer} />
                <TableData data={t.fall} />
              </Fragment>
            );
          })} */}
        </section>
      </section>
    </Fragment>
  );
};
/**
 * TableData component to display instructor and available seats.
 *
 * @param data - Object containing instructor and seats data.
 */
const TableData = ({ data }: { data?: ISemesterData }) => {
  if (!data) return <div className="!text-gray-600">No Class</div>;

  const { instructor, seats } = data;
  return (
    <div>
      <div>
        {instructor.reduce((acc, inst) => {
          if (acc === "") return inst;
          return acc + ", " + inst;
        }, "")}
      </div>
      <div className="!text-gray-600">{seats}</div>
    </div>
  );
};
// Export the CoursePage component
export default CoursePage;
