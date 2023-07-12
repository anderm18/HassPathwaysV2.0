import React from "react";
import Link from "next/link";

const NavButton = ({ link, text, Icon, selected }) => {
  return (
    <Link href={link}>
      <button
        className={`flex py-2 px-3 gap-2 ${
          selected && "text-primary-800 bg-gray-100 rounded-md"
        }`}
      >
        <Icon className={`w-6 h-6${selected && " nav-button--selected"}`} />
        <span
          className={`text-md font-semibold ${!selected && "text-gray-700"}`}
        >
          {text}
        </span>
      </button>
    </Link>
  );
};

export default NavButton;
