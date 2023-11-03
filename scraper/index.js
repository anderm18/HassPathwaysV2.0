
const { XMLParser } = require("fast-xml-parser");

// Catalog API makes certain information an attribute, but don't 
// want to include all attributes b/c of a lot of useless data
const options = {
    isArray: (name, jpath, isLeafNode, isAttribute) => {
        if (name == "core") return true;
    }
};
const parser = new XMLParser(options);


const BASE_URL = "http://rpi.apis.acalog.com/v1/"
const DEFAULT_QUERY_PARAMS = "?key=3eef8a28f26fb2bcc514e6f1938929a1f9317628&format=xml"
const CHUNK_SIZE = 100

// Public url for catalog 
const url = "http://rpi.apis.acalog.com/v1/content?key=3eef8a28f26fb2bcc514e6f1938929a1f9317628&format=xml&method=getItems&options[full]=1&catalog=26&type=programs&ids[]=8168&ids[]=7583&ids[]=7584&ids[]=7590&ids[]=8171&ids[]=7594&ids[]=8164&ids[]=8165&ids[]=7597&ids[]=7598&ids[]=7604&ids[]=8163&ids[]=8166&ids[]=8170&ids[]=7645&ids[]=8169&ids[]=7610&ids[]=7611&ids[]=8167&ids[]=7613&ids[]=7615&ids[]=7616&ids[]=8162&ids[]=7619"

// Recursively gets all children of an object that are strings
function getAllChildren(key, root) {
    var collected = [];

    if (root == undefined || typeof root == 'string') {
        return [];
    }

    for (const [k, v] of Object.entries(root)) {
        if (k == key) {
            collected.push(v);
            continue;
        }
        let recursed = getAllChildren(key, root[k])
        if (recursed.length != 0) {
            recursed.forEach(e => {
                collected.push(e)
            })
        }
    }
    return collected;
}

// Finds the courses from the result of getAllChildren
function findCourses(key, root, prereqs) {
    var arrayed = getAllChildren(key, root);
    var objected = [];
    arrayed.forEach(element => {
        let splited = element.split("&#xA0;-&#xA0;")
        if (splited[1] != undefined) {
            var code = splited[0].replace(' ', '-');
            // Find tags
            tags = [];
            if (prereqs[code] != undefined) {
                tags = prereqs[code]["attributes"];
            }

            objected.push({
                title: splited[1],
                courseCode: code,
                tag: tags
            });
        }
    })
    return objected;
}

function getCatalog() {

}

function getAllStrings(arg) {
    if (typeof arg === "string") {
        return [arg];
    }

    // handle wrong types and null
    if (typeof arg !== "object" || !arg) {
        return [];
    }

    return Object.keys(arg).reduce((acc, key) => {
        return [...acc, ...getAllStrings(arg[key])];
    }, []);
};

// Main function that cleans up the data
function clean(parsed, prereqs) {
    let raw = parsed.catalog.programs.program;
    let pathways = {};
    for (var i = 0; i < raw.length; i++) {

        let pathway = {};
        // Make sure it's a pathway and not a minor

        if (raw[i]["type"][0]["xi:include"]["xi:fallback"] != "Integrative Pathway") {
            continue;
        }

        pathway.department = "";
        pathway.name = (raw[i]["a:title"]).replace("Pathway", "").trim();
        //pathway.college = (raw[i]["parent"]["xi:include"]["xi:fallback"])


        var desc = raw[i]["a:content"]["h:p"];
        if (typeof desc != 'string') {
            desc = getAllStrings(desc).reduce(
                function (a, b) {
                    return a.length > b.length ? a : b;
                }
            );
            ; 

        }

        pathway.description = desc;
        pathway.clusters = [];
        pathway.compatibleMinor = [];
        // Getting courses needed
        if (raw[i].cores.length != 0) {
            for (var j = 0; j < raw[i].cores.core.length; j++) {
                var core = raw[i].cores.core[j];

                // What type of course?
                var coursesCategory = core["a:title"]


                if (core["a:title"].toLowerCase().includes("requirements")) {
                    delete core["a:title"]
                    let cluster = { name: coursesCategory, description: core["a:content"], courses: findCourses("a:title", core, prereqs) }
                    if (Object.keys(cluster.courses).length > 0) pathway.clusters.push(cluster);
                }
                else if (core["a:title"].toLowerCase().includes("one of")) {
                    delete core["a:title"]
                    let cluster = { name: coursesCategory, description: core["a:content"], courses: findCourses("a:title", core, prereqs) }
                    if (Object.keys(cluster.courses).length != 0) pathway.clusters.push(cluster);
                }
                else if (core["a:title"].toLowerCase().includes("required")) {
                    delete core["a:title"]
                    let cluster = { name: coursesCategory, description: core["a:content"], courses: findCourses("a:title", core, prereqs) }
                    if (Object.keys(cluster.courses).length != 0) pathway.clusters.push(cluster);
                }
                else if (core["a:title"].toLowerCase().includes("minor")) {
                    delete core["a:title"]
                    pathway.compatibleMinor = (getAllChildren("a:title", core))
                }
                else if (core["a:title"].toLowerCase().includes("choose")) {
                    delete core["a:title"]
                    let cluster = { name: coursesCategory, description: core["a:content"], courses: findCourses("a:title", core, prereqs) }
                    if (Object.keys(cluster.courses).length != 0) pathway.clusters.push(cluster);
                }
                else {
                    delete core["a:title"]
                    let cluster = { name: coursesCategory, description: core["a:content"], courses: findCourses("a:title", core, prereqs) }
                    if (Object.keys(cluster.courses).length != 0) pathway.clusters.push(cluster);
                }


            }
        }
        pathways[pathway.name] = (pathway);
    }
    return pathways;
}

// Gets the data and creates the file
async function data() {
    const response = await fetch(url);
    const xml = await response.text();
    const file = Bun.file("prerequisites.json");
    const prereqs = await file.json();

    let parsed = clean(parser.parse(xml), prereqs);
    //console.log(parsed);
    await Bun.write("./pathways.json", JSON.stringify(parsed));
    var deps = Object.keys(parsed);
    var ans = {};
    console.log(deps)
    for (const name of deps) {
        ans[name] = "";
    }
    //await Bun.write("./departments.json", JSON.stringify(ans));
    format();
}

// Changes the file into the v2.0 format 
async function format() {
    const file = Bun.file("pathways.json");
    const file2 = Bun.file("departments.json");
    const data = await file.json();
    const deps = await file2.json(); 
    var formated = {};
    for (const key in data) {
        var dep = deps[key]; 
        if (!(dep in formated)) formated[dep] = [];
        delete data[key]["department"]
        formated[dep].push(data[key])
    }
    var arrayed = [];
    for (const key in formated) {
        arrayed.push({
            department: key,
            pathways: formated[key]
        })
    }
    await Bun.write("./formatted.json", JSON.stringify(arrayed))
}

// RUN IT
async function main() {

    await data();
    //await format();
}
main();