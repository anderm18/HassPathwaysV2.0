import { IFilterState, filterType } from "@/app/model/CourseInterface";

export const flattenFilterParams = (
  params: IFilterState
): { [key: string]: string } => {
  return Object.keys(params).reduce((acc, key: filterType) => {
    return {
      ...acc,
      [key]: params[key].reduce((pacc, val) => {
        if (pacc === "") return val;
        return `${pacc},${val}`;
      }, ""),
    };
  }, {});
};
