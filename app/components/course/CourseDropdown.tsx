
import React, { useEffect, useRef, useState } from "react";
import ChevronDown from "@/public/assets/svg/chevron-down-white.svg?svgr";
import { useAppContext } from "@/app/contexts/appContext/AppProvider";
import { courseState } from "@/public/data/staticData";



const CourseDropdown = () => {
   

export default CourseDropdown;

    const { course_value , setCourseState } = useAppContext();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);


    // Find the displaying text for course
    const courseText: string | undefined = courseState
  .filter((co) => co.value === course_value)[0]?.display;

    useEffect(() => {
    if (!dropdownOpen || courseText === undefined) return;

    // Rest of your code here
    }, [dropdownOpen, courseText]);

    useEffect(() => {
        if (!dropdownOpen) return;
    
        const outsideDropdown = (e: MouseEvent) => {
          if (
            dropdownRef.current &&
            !dropdownRef.current.contains(e.target as Node)
          )
            setDropdownOpen(false);
        };
        document.addEventListener("click", outsideDropdown);
    
        return () => document.removeEventListener("click", outsideDropdown);
      }, [dropdownOpen]);
    
      return (
        <div
          className="dropdown cursor-pointer flex items-center gap-2 w-[200px] md:w-[320px] bg-white border-solid border border-gray-300 text-gray-500 py-[10px] px-[14px] rounded-lg prevent-select text-xs md:text-sm lg:text-md"
          ref={dropdownRef}
          onClick={() => {
            setDropdownOpen((open) => !open);
          }}
        >
          <div className="grow">{courseText}</div>
          <div>
            {!dropdownOpen && <ChevronDown />}
            
          </div>
    
          {dropdownOpen && (
            <div className="dropdown-choices z-10 ut-shadow-lg">
              {courseState.map((choice) => {
                return (
                  <div
                    className="dropdown-choice"
                    key={choice.value}
                    data-value={choice.value}
                    onClick={() => {
                      setCourseState(choice.value);
                    }}
                  >
                    {choice.display}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );
    };




export default CourseDropdown;
