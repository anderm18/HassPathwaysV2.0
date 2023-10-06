import BreadCrumb from "@/app/components/navigation/Breadcrumb";
import {
  ICourseDescriptionSchema,
  ISemesterData,
} from "@/public/data/dataInterface";
import React, { Fragment, useEffect, useState } from "react";

type ICourseCode = {
  params: {
    courseCode: string;
  };
};

const CoursePage: React.FC<ICourseCode> = (data) => {
  const { courseCode } = data.params;

  // TODO: Fetch data from backend with courseCode
  const url = `/course/{:courseCode}`

  
  const tmpCourseDescription: ICourseDescriptionSchema = {
    title: "Introduction to Psychological Science (PSYC-1200)",
    description:
      "This course embraces the science of psychology. The aim is for students to learn how using the scientific method provides important insights about mind, brain, and behavior. This course integrates research on neuroscience throughout all the standard topics in an introductory course in psychology. The course presents advances across all subfields of psychology. In addition to standard exams, there are online assignments for each chapter and online laboratory experiences.",
    prereqs: undefined,
    term: [
      {
        year: "2023",
        fall: {
          instructor: ["Patiphon Loetsuthakun"],
          seats: "13/20 Seat",
        },
      },
    ],
  };
  const courseName = tmpCourseDescription.title;
  const { description, prereqs, term } = tmpCourseDescription;

  return (
    <Fragment>
      <header className="description-header">
        <BreadCrumb
          path={[
            { display: "Courses", link: "/courses/search" },
            { display: courseCode, link: "" },
          ]}
        />
        <h1>{courseName}</h1>
      </header>
      <section className="description-section">
        <header>
          <h3>Course Description</h3>
        </header>
        <p>{description}</p>
      </section>
      <section className="description-section">
        <header>
          <h3>Prerequisites</h3>
        </header>
        {!prereqs && <p>None</p>}
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
          {term.map((t) => {
            return (
              <Fragment key={t.year}>
                <header className="font-medium">{t.year}</header>
                <TableData data={t.spring} />
                <TableData data={t.summer} />
                <TableData data={t.fall} />
              </Fragment>
            );
          })}
        </section>
      </section>
    </Fragment>
  );
};

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
export default CoursePage;
