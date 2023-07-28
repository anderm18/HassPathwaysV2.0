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
];
