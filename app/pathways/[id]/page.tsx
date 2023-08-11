"use client";
import CourseCard from "@/app/components/course/CourseCard";
import BreadCrumb from "@/app/components/navigation/Breadcrumb";
import React, { FC, MouseEventHandler, useState } from "react";
import {
  ICourseClusterSchema,
  ICourseSchema,
  IPathwayDescriptionSchema,
} from "@/public/data/dataInterface";

const pathwayTempData: IPathwayDescriptionSchema = {
  description: `This course embraces the science of psychology. The aim is for
  students to learn how using the scientific method provides important
  insights about mind, brain, and behavior. This course integrates
  research on neuroscience throughout all the standard topics in an
  introductory course in psychology. The course presents advances across
  all subfields of psychology. In addition to standard exams, there are
  online assignments for each chapter and online laboratory experiences.`,
  compatibleMinor: ["1234", "123435", "52", "General Psychological Minor"],
  courses: [
    {
      title: "Introduction to abc",
      courseCode: "ACBD-1234",
      tag: ["Fall", "Spring"],
    },
    {
      title: "Introduction to React",
      courseCode: "ract-1234",
      tag: ["Fall", "Spring"],
    },
  ],
};

// const pathwayTempData: IPathwayDescriptionSchema = {
//   description: `This course embraces the science of psychology. The aim is for
//   students to learn how using the scientific method provides important
//   insights about mind, brain, and behavior. This course integrates
//   research on neuroscience throughout all the standard topics in an
//   introductory course in psychology. The course presents advances across
//   all subfields of psychology. In addition to standard exams, there are
//   online assignments for each chapter and online laboratory experiences.`,
//   compatibleMinor: ["1234", "123435", "52", "General Psychological Minor"],
//   courses: [
//     {
//       name: "Art1",
//       description: "this is art",
//       courses: [
//         {
//           title: "art",
//           courseCode: "arts-4937",
//           tag: ["Fall"],
//         },
//         {
//           title: "art",
//           courseCode: "arts-1957",
//           tag: ["Fall"],
//         },
//       ],
//     },
//     {
//       name: "Elec",
//       description: "this is art",
//       courses: [
//         {
//           title: "ele",
//           courseCode: "arts-8294",
//           tag: ["Fall"],
//         },
//         {
//           title: "ele2",
//           courseCode: "arts-9854",
//           tag: ["Fall"],
//         },
//       ],
//     },
//   ],
// };

const PathwayDescriptionPage: FC = () => {
  const pathwayData: IPathwayDescriptionSchema = pathwayTempData;

  return (
    <>
      <header className="mb-4 md:mb-8">
        <BreadCrumb
          path={[
            {
              display: "Pathway",
              link: "/",
            },
            {
              display: "Extent and Limits of Rationality",
              link: "/",
            },
          ]}
        />
        <h1 className="mt-5 text-display-xs md:text-display-sm font-semibold">
          Extent and Limits of Rationality
        </h1>
      </header>
      <section className="mb-4 md:mb-8">
        <header className="mb-2">
          <h3 className="text-xl md:text-display-xs font-semibold">
            Pathway Description
          </h3>
        </header>
        <p className="p-text">{pathwayData.description}</p>
      </section>
      <section className="mb-4 md:mb-8">
        <header className="mb-2">
          <h3 className="text-xl md:text-display-xs font-semibold">
            Compatible Minor
          </h3>
        </header>
        <ul className="p-text">
          {pathwayData.compatibleMinor.map((minor, i) => {
            return <li key={i}>- {minor}</li>;
          })}
        </ul>
      </section>
      <section className="mb-4 md:mb-8">
        <header className="mb-2">
          <h3 className="text-xl md:text-display-xs font-semibold">
            Requirement
          </h3>
        </header>
        <p className="p-text">
          Students must choose a minimum of 12 credits as from the course list
          below.
        </p>
      </section>
      <section className="mb-4 md:mb-8">
        <header className="mb-2">
          <h3 className="text-xl md:text-display-xs font-semibold">
            Available Courses
          </h3>
        </header>
        <CourseSection courses={pathwayData.courses} />
      </section>
    </>
  );
};

interface CourseSectionProps {
  courses: Array<ICourseSchema> | Array<ICourseClusterSchema>;
}

const CourseSection: FC<CourseSectionProps> = ({ courses }) => {
  const [clusterIndex, setClusterIndex] = useState(0);

  if (courses.length === 0) return <></>;

  function instanceOfCluster(object: any): object is ICourseClusterSchema {
    return "name" in object;
  }

  const haveCluster = instanceOfCluster(courses[0]);
  const cluster: ICourseClusterSchema = courses[
    clusterIndex
  ] as ICourseClusterSchema;

  return (
    <>
      {haveCluster && (
        <>
          <ul className="rounded-lg flex flex-col sm:flex-row gap-2 p-1 bg-gray-50 border border-1 border-gray-200 list-none">
            {courses.map((cluster: any, i: number) => {
              return (
                <CourseClusterSelection
                  key={cluster.name}
                  title={cluster.name}
                  tag={cluster.courses.length}
                  selected={clusterIndex === i}
                  onClickEvent={() => {
                    setClusterIndex(i);
                  }}
                />
              );
            })}
          </ul>
          <div className="my-3 grid grid-flow-row gap-y-3">
            <CourseList courses={cluster.courses} />
          </div>
        </>
      )}
      {!haveCluster && <CourseList courses={courses as Array<ICourseSchema>} />}
    </>
  );
};

interface CourseClusterProps {
  title: string;
  selected: boolean;
  onClickEvent: MouseEventHandler;
  tag: string | number;
}

const CourseClusterSelection: FC<CourseClusterProps> = ({
  title,
  selected,
  onClickEvent,
  tag,
}) => {
  return (
    <li
      className={`flex items-center text-xs md:text-sm cursor-pointer justify-center gap-x-2 px-3 py-[7px] rounded-[6px] font-semibold ${
        selected ? "text-gray-700 bg-white ut-shadow-lg" : "text-gray-500"
      }`}
      onClick={onClickEvent}
    >
      {title}
      <p className="tag tag-gray">{tag}</p>
    </li>
  );
};

interface CourseListProps {
  courses: Array<ICourseSchema>;
}

const CourseList: FC<CourseListProps> = ({ courses }) => {
  return (
    <div className="my-3 grid grid-flow-row gap-y-3">
      {courses.map((course) => {
        return <CourseCard key={course.courseCode} {...course} />;
      })}
    </div>
  );
};

export default PathwayDescriptionPage;
