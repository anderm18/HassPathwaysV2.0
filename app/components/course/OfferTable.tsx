"use client";

import { ISemesterData, ITerm } from "@/public/data/dataInterface";
import { FC, Fragment, useState } from "react";
import { isMobileOnly } from "react-device-detect";
import ArrowLeft from "@/public/assets/svg/arrow-left.svg?svgr";
import ArrowRight from "@/public/assets/svg/arrow-right.svg?svgr";

const TableData = async ({ data }: { data?: ISemesterData }) => {
  if (!data) return <div className="!text-gray-600">No Class</div>;

  const { instructor, seats } = data;
  return (
    <div>
      <div>
        {instructor.reduce((acc, inst) => {
          if (acc === "") return inst;
          return acc + ", " + inst;
        }, "")}
      </div>
      <div className="!text-gray-600">{seats}</div>
    </div>
  );
};

type ISemesterTableData = {
  term: Array<ITerm>;
};
export const SemesterTable: FC<ISemesterTableData> = async ({ term }) => {
  return (
    <Fragment>
      {!isMobileOnly && (
        <section className="hidden sm:grid grid-table grid-cols-4 max-w-[960px] overflow-clip rounded-xl border-solid border border-gray-200 bg-white ut-shadow-sm">
          <div className="table-header">Year</div>
          <div className="table-header">Spring</div>
          <div className="table-header">Summer</div>
          <div className="table-header">Fall</div>
          {term.map((t) => {
            return (
              <Fragment key={t.year}>
                <header className="font-medium">{t.year}</header>
                <TableData data={t.spring} />
                <TableData data={t.summer} />
                <TableData data={t.fall} />
              </Fragment>
            );
          })}
        </section>
      )}
      <MobileTable term={term} />
    </Fragment>
  );
};

const MobileTable: FC<ISemesterTableData> = async ({ term }) => {
  const [yearIndex, setYearIndex] = useState(0);
  const t: ITerm | undefined = term.at(yearIndex);
  if (!t) return <></>;
  return (
    <section className="block sm:hidden w-52">
      <header className="px-[8.7px] py-[6.53px] flex justify-between">
        <div className="p-[4.35px]">
          <ArrowLeft />
        </div>
        <span>{t.year}</span>
        <div className="p-[4.35px]">
          <ArrowRight />
        </div>
      </header>
    </section>
  );
};
