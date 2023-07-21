## API Specification

Specification of all API routes used in this project.

### searchCourses

`GET /course/search`
Returns a list of course that match search criteria.

##### Parameters

| Parameter    | In    |                      Type                       | Required | Description                                          |
| :----------- | :---- | :---------------------------------------------: | :------: | :--------------------------------------------------- |
| searchString | query |                     String                      |  false   | string you want to search                            |
| prefix       | query |   [[coursePrefixObject](#courseprefixobject)]   |  false   | course prefix                                        |
| level        | query |    [[courseLevelObject](#courselevelobject)]    |  false   | course level                                         |
| filter       | query |      [[courseTagObject](#coursetagobject)]      |  false   | tag included in course (eg. Communication Intensive) |
| semester     | query | [[courseSemesterObject](#coursesemesterobject)] |  false   | semester filter                                      |

##### Responses

| Status | Meaning   | Description       |                          Schema |
| :----- | :-------- | :---------------- | ------------------------------: |
| 200    | OK        | successful search | [[CourseSchema](#courseschema)] |
| 404    | Not Found | No course matched |                            None |

### searchPathway

`GET /pathway/search`
Returns a list of pathway that match search criteria.

##### Parameters

| Parameter    | In    |                         Type                          | Required | Description               |
| :----------- | :---- | :---------------------------------------------------: | :------: | :------------------------ |
| searchString | query |                        String                         |  false   | string you want to search |
| department   | query | [[pathwayDepartmentObject](#pathwaydepartmentobject)] |  false   | list of department filter |

##### Responses

| Status | Meaning   | Description        |                            Schema |
| :----- | :-------- | :----------------- | --------------------------------: |
| 200    | OK        | successful search  | [[PathwaySchema](#pathwayschema)] |
| 404    | Not Found | No pathway matched |                              None |

### getCourseByCourseCode

`GET /course/{:courseCode}`
Returns course's description.

##### Parameters

| Parameter   | In   |  Type  | Required | Description                                      |
| :---------- | :--- | :----: | :------: | :----------------------------------------------- |
| course code | path | String |   true   | course's code separated by `-` (eg. `INQR-1100`) |

##### Responses

| Status | Meaning     | Description           |                                                Schema |
| :----- | :---------- | :-------------------- | ----------------------------------------------------: |
| 200    | OK          | successful search     | [[CourseDescriptionSchema](#coursedescriptionschema)] |
| 400    | Bad Request | Malformed course code |                                                  None |
| 404    | Not Found   | No course found       |                                                  None |

### getPathwayByName

`GET /pathway/{:pathwayName}`
Returns pathway's description.

##### Parameters

| Parameter    | In   |  Type  | Required | Description       |
| :----------- | :--- | :----: | :------: | :---------------- |
| pathway name | path | String |   true   | full pathway name |

##### Responses

| Status | Meaning   | Description       |                                                  Schema |
| :----- | :-------- | :---------------- | ------------------------------------------------------: |
| 200    | OK        | successful search | [[PathwayDescriptionSchema](#pathwaydescriptionschema)] |
| 404    | Not Found | No pathway found  |                                                    None |

---

## Custom Type

#### Custom Query

##### coursePrefixObject

```js
"ARTS" ||
  "COGS" ||
  "COMM" ||
  "ECON" ||
  "GSAS" ||
  "INQR" ||
  "ITWS" ||
  "LANG" ||
  "LITR" ||
  "PHIL" ||
  "PSYC" ||
  "STSO" ||
  "WRIT";
```

##### courseLevelObject

```js
"1" || "2" || "4";
```

##### courseTagObject

```js
"CI" || "PDII" || "HInq";
```

##### courseSemesterObject

```js
"F" || "S" || "U";
```

##### pathwayDepartmentObject

a full valid name of pathway's department (eg. `Communication & Media`, `Arts`).
Note: Case sensitive.

#### Custom Schema

##### CourseSchema

```js
{
  title: String, // name of the course (without course code)
  courseCode: String, // only the course code (eg. INQR-1170)
  tag: [String] // course tag
}
```

##### PathwaySchema

```js
{
  title: String, // name of the pathway
  courses: [CourseSchema] // all course in the pathway
}
```

##### CourseDescriptionSchema

```js
{
  description: String, // course's description
  prereqs: PrereqSchema,
  term: [Term]
}
```

###### PrereqSchema

```js
{
  type: "course" || "and" || "or",
  nested: PrereqSchema || null,   // non-null if type is "and" or "or"
  course: String || null          // non-null if type is "course", in the format "[prefix] [code]", e.g. "COGS 4960"
}
```

###### Term

```js
{
  year: String,
  spring: SemesterData || null,
  fall: SemesterData || null,
  summer: SemesterData || null,
}
```

###### SemesterData

```js
{
  instructor: [String], // list of instructor's name
  seats: String // seats taken (format: 19/25 Seat)
}
```

##### PathwayDescriptionSchema

```js
{
  description: String, // pathway's description
  compatibleMinor: [String], // list of minor name
  courses: [CourseSchema] // all course in the pathway
}
```
