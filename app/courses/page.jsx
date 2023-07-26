import CourseCard from "../components/course/CourseCard";

const MyCourses = () => {
  return (
    <>
      <header className="mb-4 md:mb-8">
        <h1 className="text-display-xs sm:text-display-sm md:text-display-md font-semibold">
          My Courses
        </h1>
      </header>
      <section>
        <div className="course-button-group flex flex-col sm:flex-row gap-x-2">
          <ModeRadioButton checked={true} label="All" tag={3} />
          <ModeRadioButton checked={false} label="Completed" tag={3} />
          <ModeRadioButton checked={false} label="In Progress" tag={3} />
          <ModeRadioButton checked={false} label="Planned" tag={3} />
        </div>
      </section>
      <section className="my-4 grid grid-flow-row gap-y-3">
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </section>
    </>
  );
};

const ModeRadioButton = ({ checked, label, tag, clickCallback }) => {
  const tagStyle = checked ? "tag-primary" : "tag-gray";

  const fontStyle = checked ? "text-primary-700" : "text-gray-500";

  return (
    <button
      className={`flex gap-2 items-center !rounded-md hover:!bg-gray-100 ${
        checked ? " !bg-gray-50" : ""
      }`}
      onClick={clickCallback}
    >
      <span className={`text-sm md:text-lg font-semibold ${fontStyle}`}>
        {label}
      </span>
      <p className={`tag ${tagStyle}`}>{tag}</p>
    </button>
  );
};

export default MyCourses;
