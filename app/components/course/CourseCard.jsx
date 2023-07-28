import React from "react";

const CourseCard = ({ title, courseCode, tag }) => {
  return (
    <section className="course-card">
      <div className="flex justify-between items-start w-full">
        <header className="course-title">
          <h3 className="text-md font-semibold">{title}</h3>
          <p className="text-sm text-gray-600">{courseCode}</p>
        </header>
        <div className="text-sm font-semibold text-gray-25 bg-primary-700 px-4 py-2.5 border border-solid border-gray-300 rounded-lg">
          Placeholder
        </div>
      </div>
      <div className="flex gap-x-1 flex-wrap">
        {tag?.map((t) => {
          return <p className="tag tag-primary">{t}</p>;
        })}
      </div>
    </section>
  );
};

export default CourseCard;
