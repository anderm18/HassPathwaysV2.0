import { IcourseStatus, IpathwayData } from "@/public/data/staticInterface";

type MyCourse = {
  title: string,
  courseCode: string, 
  state: IcourseStatus
}

type ApplicationContextTemplate = {
  catalog_year: number;
  myCourses: MyCourse[];

  // Methods
  setCatalog: (...arg: any) => any;
};

type ApplicationConstant = {
  courseState: IcourseStatus[];
  pathwaysCategories: IpathwayData[];
};

export type ApplicationContext = ApplicationContextTemplate &
  ApplicationConstant;

export type ApplicationDispatch = {
  type: string;
  payload: any;
};
