"use client";

import React, { useState } from "react";
import Image from "next/image";
import ChevronUp from "/public/assets/svg/chevron-up.svg";
import ChevronDown from "/public/assets/svg/chevron-down.svg";

const CatalogDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div
      className="dropdown flex items-center gap-2 w-[320px] bg-white border-solid border border-gray-300 text-gray-500 py-[10px] px-[14px] rounded-lg"
      onClick={() => {
        setDropdownOpen((open) => !open);
      }}
    >
      <div className="grow">2022 - 2023 Catalog</div>
      <div>
        <Image
          src={dropdownOpen ? ChevronUp.src : ChevronDown.src}
          alt="dropdown icon"
          width={20}
          height={20}
        ></Image>
      </div>

      {dropdownOpen && (
        <div className="dropdown-choices ut-shadow-lg">
          <div className="dropdown-choice">2022 - 2023 Catalog</div>
          <div className="dropdown-choice">2021 - 2022 Catalog</div>
          <div className="dropdown-choice">2020 - 2021 Catalog</div>
          <div className="dropdown-choice">2019 - 2020 Catalog</div>
          <div className="dropdown-choice">2018 - 2019 Catalog</div>
        </div>
      )}
    </div>
  );
};

export default CatalogDropdown;
