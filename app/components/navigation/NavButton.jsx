"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavButton = ({ link, text, Icon, keyword }) => {
  const pathname = usePathname();
  const selected = pathname.match(keyword);

  return (
    <Link href={link}>
      <div
        className={`flex items-center py-2 px-3 gap-2 ${
          selected && "text-primary-800 bg-gray-100 rounded-md"
        }`}
      >
        <Icon.type
          {...Icon.props}
          className={`${selected && "nav-button--selected"} hidden md:block`}
        />
        <span
          className={`text-sm lg:text-md font-semibold ${
            !selected && "text-gray-700"
          }`}
        >
          {text}
        </span>
      </div>
    </Link>
  );
};

export default NavButton;
