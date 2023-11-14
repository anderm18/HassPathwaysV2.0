"use client";
import CourseCard from "@/app/components/course/CourseCard";
import BreadCrumb from "@/app/components/navigation/Breadcrumb";
import React, { FC, MouseEventHandler, useState, useEffect } from "react";
import {
  ICourseClusterSchema,
  ICourseSchema,
  IPathwayDescriptionSchema,
} from "@/public/data/dataInterface";

// Get the pathway name from the parameters
type IPathwayID = {
  params: {
    id: string;
  };
};

const PathwayDescriptionPage: FC<IPathwayID> = (data: IPathwayID) => {
  // Convert pathname to pathwayName, replace special charaters such as " ", ",", and ":"
  const pathwayName: string = data.params.id.replaceAll("%20", " ").replaceAll("%2C", ",").replaceAll("%3A", ":");

  // Intialize pathway information to PathwayDescriptionSchema
  const [Pathway, setPathway] = useState<IPathwayDescriptionSchema>({
      description: "Discover Cognitive Science: a young but fast-growing field focused on the study of the mind from the perspectives of philosophy, psychology, neuroscience, linguistics, and artificial intelligence. This pathway will introduce students to the major ideas and theories from these areas, as they relate to the study of the mind and intelligence.",
      requirements: "To complete this integrative pathway, students must choose a minimum of 12 credits as described below. Only four (4) credits can be applied from the HASS Inquiry (INQR) courses listed below to this pathway.",
      courses: [
        {
          name: "Required:",
          description: "",
          courses: [
            {
              title: "Introduction to Cognitive Science",
              courseCode: "COGS 2120",
              tag: []
            }
          ]
        },
        {
          name: "Choose remaining credits from the following:",
          description: "",
          courses: [
              {
                  title: "Introduction to Linguistics",
                  courseCode: "COGS-2340",
                  tag: []
              },
              {
                  title: "Cognitive Modeling",
                  courseCode: "COGS-4210",
                  tag: []
              },
              {
                  title: "Animal Cognition and Interaction with Humans",
                  courseCode: "COGS-4220",
                  tag: []
              },
              {
                  title: "Introduction to Cognitive Neuroscience",
                  courseCode: "COGS-4330",
                  tag: []
              },
              {
                  title: "The Linguistics of Computational Linguistics",
                  courseCode: "COGS-4340",
                  tag: [
                      "Communication Intensive"
                  ]
              },
              {
                  title: "Behavioral Neuroscience",
                  courseCode: "COGS-4360",
                  tag: []
              },
              {
                  title: "Programming for Cognitive Science and Artificial Intelligence",
                  courseCode: "COGS-4410",
                  tag: []
              },
              {
                  title: "Learning and Advanced Game AI",
                  courseCode: "COGS-4430",
                  tag: []
              },
              {
                  title: "Game AI",
                  courseCode: "COGS-4420",
                  tag: []
              },
              {
                  title: "Sensibilities",
                  courseCode: "COGS-4440",
                  tag: [
                      "Communication Intensive"
                  ]
              },
              {
                  title: "Cross-linguistic Perspectives",
                  courseCode: "COGS-4560",
                  tag: [
                      "Communication Intensive"
                  ]
              },
              {
                  title: "Cognition and the Brain",
                  courseCode: "COGS-4600",
                  tag: []
              },
              {
                  title: "Stress and the Brain",
                  courseCode: "COGS-4610",
                  tag: []
              },
              {
                  title: "Intelligent Virtual Agents",
                  courseCode: "COGS-4640",
                  tag: []
              },
              {
                  title: "Hormones, Brain, and Behavior",
                  courseCode: "COGS-4700",
                  tag: []
              },
              {
                  title: "Advanced Topics in Linguistics",
                  courseCode: "COGS-4780",
                  tag: [
                      "Communication Intensive"
                  ]
              },
              {
                  title: "Language-Endowed Intelligent Agents",
                  courseCode: "COGS-4880",
                  tag: []
              },
              {
                  title: "Minds and Machines",
                  courseCode: "INQR-1140",
                  tag: [
                      "Communication Intensive",
                      "HASS Inquiry"
                  ]
              },
              {
                  title: "Are Humans Rational?",
                  courseCode: "INQR-1235",
                  tag: []
              },
              {
                  title: "Cognitive Psychology",
                  courseCode: "PSYC-4370",
                  tag: []
              },
              {
                  title: "Sensation and Perception",
                  courseCode: "PSYC-4410",
                  tag: []
              }
          ]
      }],
      compatibleMinor: [
        "Cognitive Science Minor",
        "Cognitive Science of Artificial Intelligence Minor"
      ],
      concentrations: [
        {
          name: "Artificial Intelligence (AI):",
          description: "Students who are specifically interested in artificial intellegence (AI) may wish to choose their free course selections from the following list:",
          courses: [
              {
                  title: "Cognitive Modeling",
                  courseCode: "COGS-4210",
                  tag: []
              },
              {
                  title: "Programming for Cognitive Science and Artificial Intelligence",
                  courseCode: "COGS-4410",
                  tag: []
              },
              {
                  title: "Game AI",
                  courseCode: "COGS-4420",
                  tag: []
              },
              {
                  title: "Learning and Advanced Game AI",
                  courseCode: "COGS-4430",
                  tag: []
              },
              {
                  title: "Intelligent Virtual Agents",
                  courseCode: "COGS-4640",
                  tag: []
              },
              {
                  title: "Language-Endowed Intelligent Agents",
                  courseCode: "COGS-4880",
                  tag: []
              },
              {
                  title: "Minds and Machines",
                  courseCode: "INQR-1140",
                  tag: [
                      "Communication Intensive",
                      "HASS Inquiry"
                  ]
              },
              {
                  title: "Are Humans Rational?",
                  courseCode: "INQR-1235",
                  tag: []
              }
          ]
      }
      ],
    });
  
  
  // Get the pathway data from the api using the Pathway Name
  // useEffect(() => {
  //   const apiController = new AbortController();
  
  //   fetch(
  //     // Fetch data
  //     `http://localhost:3000/api/pathway/${pathwayName}`,
  //     {
  //       signal: apiController.signal,
  //       cache: "no-store",
  //       next: {
  //         revalidate: false,
  //       },
  //     }
  //   ).then((data) => {
  //     // Make sure data is valid
  //     if(data.ok) {
  //       return data.json();
  //     } else {
  //       throw new Error('AbortError');
  //     }
  //   })
  //   .then((data) => {
  //       // Set pathway to data (Data is returned as an array, in this case we only
  //       //  care about the first element)
  //       setPathway(data[0]);
  //     })
  //     .catch((err) => {
  //       if (err.name === "AbortError") return;
  //       console.error("Fetching Error: ", err);
  //     });
  //   return () => apiController.abort("Cancelled");

  // }, [pathwayName, Pathway]);

  const pathwayData: IPathwayDescriptionSchema = Pathway;
  
  // TODO: check if pathway exists, or return something empty

  // Check if we need to display a minor as plural or not
  let minor_string: string = pathwayData.compatibleMinor.length == 1 ? "Compatible Minor" : "Compatible Minors" ;

  // If no compatible minor exists, display none, which makes more sense than not displaying anything
  if(pathwayData.compatibleMinor.length == 0){
    pathwayData.compatibleMinor = ["None"];
  }

  if(pathwayData.requirements == ""){
    pathwayData.requirements = "To complete this integrative pathway, students must choose a minimum of 12 credits as from the course list below.";
  }

  // Display the page
  return (
    <>
      <header className="mb-4 md:mb-8">
        <BreadCrumb
          path={[
            {
              display: "Pathways",
              link: "/pathways/search",
            },
            {
              display: pathwayName,
              link: "",
            },
          ]}
        />
        <h1 className="mt-5 text-display-xs md:text-display-sm font-semibold">
          {pathwayName}
        </h1>
      </header>
      <section className="description-section">
        <header>
          <h3>Pathway Description</h3>
        </header>
        <p>{pathwayData.description}</p>
      </section>
      <section className="description-section">
      <header>
      <h3>{minor_string}</h3>
      </header>
      <ul>
        {pathwayData.compatibleMinor.map((minor, i) => {
          return <li key={i}>• {minor}</li>;
        })}
      </ul>
      </section>
      <section className="description-section">
        <header>
          <h3>Requirements</h3>
        </header>
        <p>
          {pathwayData.requirements}
        </p>
      </section>
      {pathwayData.courses.length > 0 && <section className="description-section">
        <header>
          <h3>Available Courses</h3>
        </header>
        <CourseSection courses={pathwayData.courses} />
      </section>}
      {pathwayData.concentrations.length > 0 && <section className="description-section">
        <header>
          <h3>Optional Concentrations</h3>
        </header>
          <p>Courses listed here are suggested, optional concentrations a student may take within a pathway</p>
        <CourseSection courses={pathwayData.concentrations} />
      </section>}
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
          <ul
            className="rounded-lg flex flex-col sm:flex-row flex-wrap
          gap-2 p-1 bg-gray-50 border border-1 border-gray-200 list-none 
          w-full sm:w-[500px] md:w-[723px] lg:w-full lg:max-w-[723px]"
          >
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
