import React from "react";
import Link from "next/link";
import Image from "next/image";

const NavButton = ({ link, text, icon }) => {
  return (
    <Link href={link}>
      <button className="flex py-2 px-3 gap-2">
        <Image
          className="w-6 h-6"
          src={icon.src}
          alt={text}
          width={icon.width}
          height={icon.height}
        />
        <span className="text-md font-semibold text-gray-700">{text}</span>
      </button>
    </Link>
  );
};

export default NavButton;
