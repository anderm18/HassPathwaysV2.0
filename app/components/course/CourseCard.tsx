import React from "react";
import { CourseCardProps } from "@/app/model/CourseInterface";
import ChevronDown from "@/public/assets/svg/chevron-down-white.svg?svgr";

const CourseCard = ({ title, courseCode, tag }: CourseCardProps) => {
  
  return (
    <section className="course-card">
      <div className="flex flex-col fold:flex-row justify-between items-start">
        <header className="course-title flex-shrink-1">
          <h3 className="text-md font-semibold break-normal">{title}</h3>
          <p className="text-sm text-gray-600">{courseCode}</p>
        </header>
        <div className="w-[135px] h-10 px-4 py-2.5 bg-primary-700 rounded-lg shadow border border-gray-300 flex items-center justify-between gap-2">
          <div className="text-sm font-semibold text-gray-25">Select</div>
          <div className="w-5 h-5 relative">
            {<ChevronDown />}
          </div>
        </div>
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