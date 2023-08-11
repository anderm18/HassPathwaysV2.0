export interface ICourseSchema {
  title: string;
  courseCode: string;
  tag: Array<string>;
}

export interface IPathwaySchema {
  title: string;
  department: string;
  courses: Array<ICourseSchema>;
}

interface IPrereqSchema {
  type: "course" | "and" | "or";
  nested?: Array<IPrereqSchema>;
  course?: string;
}

interface ISemesterData {
  instructor: Array<string>;
  seats: string;
}

interface ITerm {
  year: string;
  spring?: ISemesterData;
  fall?: ISemesterData;
  summer?: ISemesterData;
}

export interface ICourseDescriptionSchema {
  description: string;
  prereqs: IPrereqSchema;
  term: Array<ITerm>;
}

export interface ICourseClusterSchema {
  name: string;
  description: string;
  courses: Array<ICourseSchema>;
}

export interface IPathwayDescriptionSchema {
  description: string;
  compatibleMinor: Array<string>;
  courses: Array<ICourseSchema> | Array<ICourseClusterSchema>;
}
