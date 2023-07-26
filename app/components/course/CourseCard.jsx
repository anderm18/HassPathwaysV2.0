import React from "react";

const CourseCard = () => {
  return (
    <section className="course-card">
      <header className="course-title">
        <h3 className="text-md font-semibold">
          Introduction to Psychological Science
        </h3>
        <p className="text-sm text-gray-600">PSYC-1200</p>
        <div className="flex gap-x-1">
          <p className="tag tag-primary">Spring</p>
        </div>
      </header>
      <div className="text-sm font-semibold text-gray-25 bg-primary-700 px-4 py-2.5 border border-solid border-gray-300 rounded-lg">
        Placeholder
      </div>
    </section>
  );
};

export default CourseCard;
