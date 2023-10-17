"use client";
import CourseCard from "@/app/components/course/CourseCard";
import BreadCrumb from "@/app/components/navigation/Breadcrumb";
import React, { FC, MouseEventHandler, useState, useEffect } from "react";
import {
  ICourseClusterSchema,
  ICourseSchema,
  IPathwayDescriptionSchema,
} from "@/public/data/dataInterface";

type IPathwayID = {
  params: {
    id: string;
  };
};

const PathwayDescriptionPage: FC<IPathwayID> = (data: IPathwayID) => {
  // Convert pathname to pathwayName
  const pathwayName: string = data.params.id.replaceAll("%20", " ");

  const [Pathway, setPathway] = useState<IPathwayDescriptionSchema>({
    description: `Empty Description`,
    compatibleMinor: ["General Minor"],
    courses: [{
      name: "NULL",
      description: "NULL",
      courses: [{
        title: "NULL",
        courseCode: "NULL-0000",
        tag: ["Fall"],
      }],
    }
    ],
  });
  
  

  useEffect(() => {
    const apiController = new AbortController();
  
    fetch(
      `http://localhost:3000/api/pathway/${pathwayName}`,
      {
        signal: apiController.signal,
        cache: "no-store",
        next: {
          revalidate: false,
        },
      }
    ).then((data) => {
      if(data.ok) {
        return data.json();
      } else {
        throw new Error('AbortError');
      }
    })
    .then((data) => {

        // for(let i = 0; i < data[0].courses.length; i++){
        //   for(let j = 0; j < data[0].courses[i].courses.length; j++){
        //     fetch(
        //       `http://localhost:3000/api/course/search?${new URLSearchParams({
        //         prefix: data[0].courses[i].courses[j],
        //         level: data[0].courses[i].courses[j],
        //       })}`,
        //       {
        //         signal: apiController.signal,
        //         cache: "no-store",
        //         next: {
        //           revalidate: false,
        //         },
        //       }
        //     )
        //       .then((res) => res.json())
        //       .then((res) => {
        //         for(let k = 0; k < res.length; k++){
        //           if(res[k].courseCode == data[0].courses[i].courses[j]){
        //             data[0].courses[i].courses[j] = res[k];
        //           }
        //         }
        //         return res;})
        //       .catch((err) => {
        //         if (err.name === "AbortError") return;
        //         console.error("Fetching Error: ", err);
        //       });
        //   }
        // }
        var obj = eval('(' + JSON.stringify(data[0].courses) + ')');
        var res = [];
          
        for(var i in obj)
            res.push(obj[i]);
        console.log(res);
        data[0].courses = res;

        setPathway(data[0]);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        console.error("Fetching Error: ", err);
      });
      
      

    return () => apiController.abort("Cancelled");
  }, [pathwayName, Pathway]);

  const pathwayData: IPathwayDescriptionSchema = Pathway;
  
  // TODO: check if pathway exists, or return something empty

  let minors;
  if(pathwayData.compatibleMinor.length == 1){
    minors = <>
      <header>
      <h3>Compatible Minor</h3>
      </header>
      <ul>
        {pathwayData.compatibleMinor.map((minor, i) => {
          return <li key={i}>- {minor}</li>;
        })}
      </ul>
    </>
  } else if(pathwayData.compatibleMinor.length){
    minors = <>
      <header>
      <h3>Compatible Minors</h3>
      </header>
      <ul>
        {pathwayData.compatibleMinor.map((minor, i) => {
          return <li key={i}>- {minor}</li>;
        })}
      </ul>
    </>
  } else {
    minors = <></>
  }

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
        {minors}
      </section>
      <section className="description-section">
        <header>
          <h3>Requirement</h3>
        </header>
        <p>
          Students must choose a minimum of 12 credits as from the course list
          below.
        </p>
      </section>
      <section className="description-section">
        <header>
          <h3>Available Courses</h3>
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
          <ul
            className="rounded-lg flex flex-col sm:flex-row gap-2 p-1 
          bg-gray-50 border border-1 border-gray-200 list-none 
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
  console.log(courses);
  return (
    <div className="my-3 grid grid-flow-row gap-y-3">
      {courses.map((course) => {
        return <CourseCard key={course.courseCode} {...course} />;
      })}
    </div>
  );
};

export default PathwayDescriptionPage;
