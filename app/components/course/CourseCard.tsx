import React from "react";
import { CourseCardProps } from "@/app/model/CourseInterface";
import Dropdown from "@/app/components/Dropdown"; // Adjust the import path as needed

const CourseCard = ({ title, courseCode, tag }: CourseCardProps) => {
  return (
    <section className="course-card">
      <div className="flex flex-col fold:flex-row justify-between items-start">
        <header className="course-title flex-shrink-1">
          <h3 className="text-md font-semibold break-normal">{title}</h3>
          <p className="text-sm text-gray-600">{courseCode}</p>
        </header>
        <Dropdown /> {/* Use the Dropdown component here */}
      </div>
      <div className="flex gap-x-1 flex-wrap flex-grow-0 flex-shrink-0">
        {tag?.map((t) => {
          return (
            <p className="tag tag-primary" key={t}>
              {t}
            </p>
          );
        })}
      </div>
    </section>
  );
};

export default CourseCard;

