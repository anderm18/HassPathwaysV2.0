import React from "react";
import { Bookmark, BookmarkChecked, HelpIcon } from "../utils/Icon";

const PathwayCard = ({ pathwayName, category, tooltip, bookmark, courses }) => {
  return (
    <section className="pathway-card">
      <header className="flex justify-between w-full items-start">
        <div className="w-[367px] mb-2">
          <div className="flex flex-col md:flex-row gap-2 items-start py-1">
            <h3 className="pathway-title">{pathwayName}</h3>
            <p className="tag">{category}</p>
          </div>
          <div className="progress-bar">
            <div className="flex gap-1">
              <div className="indicator bg-status-bar-active"></div>
              <div className="indicator bg-status-bar-in-progress"></div>
              <div className="indicator bg-status-bar-inactive"></div>
            </div>
            <HelpIcon />
          </div>
        </div>
        <div className="p-2">
          {bookmark ? <BookmarkChecked /> : <Bookmark />}
        </div>
      </header>
      <div className="flex gap-3 flex-col">
        {courses.map((course) => {
          return (
            <div className="courselist" key={course.name}>
              <StatusIndicator {...course} />
              <span>{course.name}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const StatusIndicator = (status) => {
  return (
    <div className="w-4 h-4 basis-4 grow-0 shrink-0 rounded-lg bg-gray-100 border border-solid border-gray-300"></div>
  );
};

export default PathwayCard;
