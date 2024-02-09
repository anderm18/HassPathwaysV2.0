import { SemesterTable } from "@/app/components/course/OfferTable";
import BreadCrumb from "@/app/components/navigation/Breadcrumb";
import { ICourseDescriptionSchema } from "@/public/data/dataInterface";
import React, { Fragment } from "react";

type ICourseCode = {
  params: {
    courseCode: string;
  };
};

const CoursePage: React.FC<ICourseCode> = async (data) => {
  const { courseCode } = data.params;

  // TODO: Fetch data from backend with courseCode
  // Temporary Data
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
      {
        year: "2022",
        spring: {
          instructor: ["Will Powe"],
          seats: "22/20 Seat",
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
        <SemesterTable term={term} />
      </section>
    </Fragment>
  );
};

export default CoursePage;
