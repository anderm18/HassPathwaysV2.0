interface subCourseFilter {
  displayName: String;
  value: String;
}

interface courseFilter {
  displayName: String;
  apiName: String;
  options: Array<subCourseFilter>;
}

export const courseFilters: Array<courseFilter> = [
  {
    displayName: "Filter",
    apiName: "filter",
    options: [
      {
        displayName: "Communication Intensive",
        value: "CI",
      },
      {
        displayName: "Professional Development II",
        value: "PDII",
      },
      {
        displayName: "Hass Inquiry",
        value: "HInq",
      },
    ],
  },
  {
    displayName: "Level",
    apiName: "level",
    options: [
      {
        displayName: "1000",
        value: "1",
      },
      {
        displayName: "2000",
        value: "2",
      },
      {
        displayName: "4000",
        value: "4",
      },
    ],
  },
  {
    displayName: "Prefix",
    apiName: "prefix",
    options: [
      {
        displayName: "ARTS",
        value: "ARTS",
      },
      {
        displayName: "COGS",
        value: "COGS",
      },
      {
        displayName: "COMM",
        value: "COMM",
      },
      {
        displayName: "ECON",
        value: "ECON",
      },
      {
        displayName: "GSAS",
        value: "GSAS",
      },
      {
        displayName: "INQR",
        value: "INQR",
      },
      {
        displayName: "ITWS",
        value: "ITWS",
      },
      {
        displayName: "LANG",
        value: "LANG",
      },
      {
        displayName: "LITR",
        value: "LITR",
      },
      {
        displayName: "PHIL",
        value: "PHIL",
      },
      {
        displayName: "PSYC",
        value: "PSYC",
      },
      {
        displayName: "STSO",
        value: "STSO",
      },
      {
        displayName: "WRIT",
        value: "WRIT",
      },
    ],
  },
  {
    displayName: "Semester",
    apiName: "semester",
    options: [
      {
        displayName: "Fall",
        value: "F",
      },
      {
        displayName: "Spring",
        value: "S",
      },
      {
        displayName: "Summer",
        value: "U",
      },
    ],
  },
];
