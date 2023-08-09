export interface IpathwayData {
  display: string;
  value: string;
}

export interface IcourseStatus {
  display: string;
  value: number;
}

interface IsubCourseFilter {
  displayName: string;
  value: string | number;
}

export interface IcourseFilter {
  displayName: string;
  apiName: string;
  options: Array<IsubCourseFilter>;
}
